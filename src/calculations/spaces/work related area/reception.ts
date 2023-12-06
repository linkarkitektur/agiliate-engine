import MainSpace from '../main_space_class'
import SharedReception from '../shared area/reception'

export default class WorkReception extends MainSpace {
  /**
   * Calculates the area of the reception.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToReception) {
      const sharedReception = new SharedReception(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor() - sharedReception.calculateAreaExclCompensation()
    }
    return 0
  }
}
