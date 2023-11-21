import { IVariable } from './variable'
import { IConstant } from './constant'
import { TCustomSpaceConstants } from '../types/custom_space_constant'

export interface IRequest {
  variables: IVariable
  customConstants?: IConstant
  customSpaceConstants?: TCustomSpaceConstants
}
