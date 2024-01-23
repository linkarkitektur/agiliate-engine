import { expect, test } from "bun:test"
import Calculator from '../src/calculations/calculator'

test("totals", async () => {
  const file = Bun.file('test/scenarios/1.json')
  const scenario = await file.json()
  const calculator = new Calculator(scenario.input.variables, scenario.input.customSpaceConstants, scenario.input.customConstants, 'v1')
  const result = calculator.result()
  expect(result.totals.grossArea).toBe(scenario.result.totals.grossArea)
})
