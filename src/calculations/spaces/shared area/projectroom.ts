import MainSpace from '../main_space_class'

export default class SharedProjectroom extends MainSpace {
  /**
   * Calculates the area of the shred project room.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToReception) {
      return this.calculateEmployeesPerWorkplaceTypeUnadjusted() * this.areaPerPersonExcludingCorridor()
    }
    return 0
  }
}
