import { IConstant } from './constant'
import { ISpace } from './space'

export interface IConfig {
  constants: IConstant // The constants used in the calculations
  spaces: ISpace[] // The array of spaces to be calculated
}
