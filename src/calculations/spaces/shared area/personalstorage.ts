import MainSpace from '../main_space_class'

export default class SharedPersonalStorage extends MainSpace {
  /**
   * Calculates the area of the personal storage
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCoworking) {
      return this.calculateEmployeesPerWorkplaceTypeUnadjusted() * this.sharePerWorkspaceType() * this.areaPerPersonExcludingCorridor()
    }
    return 0
  }
}
