import { ISpaceConstant } from './space_constant'
import { ISpaceResult } from './space_result'

export interface ISpace {
  name: string, // The name of the space
  constants: ISpaceConstant // The constants specific to this space
  spaces?: ISpace[] // Optional nested spaces within this space
  result: ISpaceResult // The result of the calculations for this space
  shouldCalculateCorridor?: boolean // Whether to calculate the corridor area needed for this space
  shouldCalculateInnerwalls?: boolean // Whether to calculate the inner walls area needed for this space
}
