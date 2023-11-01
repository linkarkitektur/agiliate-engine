import { ISpaceConstant } from './calculations/interfaces/space_constant'
import { IConstant } from './calculations/interfaces/constant'
import { IVariable } from './calculations/interfaces/variable'
import Calculator from './calculations/calculator'
import redis from 'redis'
import { RedisClientType } from '@redis/client'

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

Bun.serve({
  port: process.env.PORT,
  async fetch(req) {
    if (req.method === 'OPTIONS') {
      const res = new Response('Ok', { headers })
      return res
    }
    const url = new URL(req.url)
    if (url.pathname === "/") return new Response("Agiliate is running", { headers })
    if (url.pathname === "/calculate") {
      const jsonReq = await req.json()
      if (process.env.CACHE === '1') {
        const cachedResult = await redisClient.get(jsonReq)
        if (cachedResult) {
          return Response.json(JSON.parse(cachedResult), { headers })
        }
      }
      const variables: IVariable = {
        ...jsonReq.variables
      }
      const customSpaceConstants: ISpaceConstant = {
        ...jsonReq?.customSpaceConstants
      }
      const customConstants: IConstant = {
        ...jsonReq?.customConstants
      }
      const calculator = new Calculator(variables, customSpaceConstants, customConstants)
      const result = calculator.result()
      if (process.env.CACHE === '1')
        redisClient.set(JSON.stringify(jsonReq), JSON.stringify(result))
      return Response.json(result, { headers })
    }
    return new Response("404!", { headers })
  },
})
