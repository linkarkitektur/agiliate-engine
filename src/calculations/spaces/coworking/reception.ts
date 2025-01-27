import MainSpace from '../main_space_class'

export default class SharedReception extends MainSpace {
  /**
   * Calculates the area of shared reception. 0 if there is no desire.
   * @todo er det rigtigt med accessToTenantReception
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCoworking && this.variables.accessToTenantReception) {
      return this.dimensionedAttendance() * this.areaPerEmployee() * this.variables.coworkingShare
    }
    return 0
  }
}
