import { IConstant } from './calculations/interfaces/constant'
import { IVariable } from './calculations/interfaces/variable'
import { IRequest } from './calculations/interfaces/request'
import Calculator from './calculations/calculator'
import redis from 'redis'
import { RedisClientType } from '@redis/client'
import { TCustomSpaceConstants } from './calculations/types/custom_space_constant'

let redisClient: RedisClientType
if (process.env.USE_CACHE_REDIS === '1') {
  (async () => {
    redisClient = redis.createClient({
      url: 'redis://redis:6379',
    })
    redisClient.on("error", (error) => console.error(`Error : ${error}`))
    await redisClient.connect()
  })()
}

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const allowedVersions: string[] = ['v1']
let version: string = allowedVersions[allowedVersions.length - 1]

Bun.serve({
  port: process.env.PORT,
  async fetch(req) {
    if (req.method === 'OPTIONS') {
      const res = new Response('Ok', { headers })
      return res
    }
    const url = new URL(req.url)
    if (url.searchParams.get('version') !== null) { // We have a version parameter
      version = url.searchParams.get('version') as string
    }
    if (url.pathname === "/") return new Response("Agiliate is running", { headers })
    if (url.pathname === "/calculate") {
      const jsonReq: IRequest = await req.json() as IRequest
      if (process.env.CACHE === '1') {
        const cachedResult = await redisClient.get(JSON.stringify(jsonReq))
        if (cachedResult) {
          return Response.json(JSON.parse(cachedResult), { headers })
        }
      }
      const variables: IVariable = jsonReq.variables
      const customSpaceConstants: TCustomSpaceConstants|undefined = jsonReq?.customSpaceConstants
      const customConstants: IConstant|undefined = jsonReq?.customConstants
      const calculator = new Calculator(variables, customSpaceConstants, customConstants, version)
      const result = calculator.result()
      if (process.env.CACHE === '1')
        redisClient.set(JSON.stringify(jsonReq), JSON.stringify(result))
      return Response.json({
        ... result,
        version,
      }, { headers })
    }
    return new Response("404!", { headers })
  },
})
