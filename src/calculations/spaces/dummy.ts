import MainSpace from './main_space_class'
import { ISpace } from '../interfaces/space'
import { IConfig } from '../interfaces/config'
import { IVariable } from '../interfaces/variable'

export default class Dummy extends MainSpace {
  /**
   * Constructor for the dummy space class
   */
  constructor(variables: IVariable, config: IConfig) {
    const space: ISpace = {
      name: "dummy",
      className: "Dummy",
      result: {},
      constants: {
        seatPersonRoom: "person",
        areaPerRole: 0,
        personsPerType: 1,
        minimumPersons: 1,
        minimumSquareMeters: 0,
        shouldCalculateCompensation: false,
        countsTowardsWorkspaceArea: false,
        adhereToGovernmentMinimum: false
      }
    }
    super(variables, config)
    this.name = this.space.name
    this.space = space
    this.spaceConstants = space.constants
    this.variables = variables
    this.config = config
  }
}
