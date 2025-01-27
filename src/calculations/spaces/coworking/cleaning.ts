import MainSpace from '../main_space_class'

export default class SharedCleaning extends MainSpace {
  /**
   * Calculates the area of cleaning
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCoworking) {
      return this.dimensionedAttendance() * this.areaPerEmployee() * this.variables.coworkingShare
    }
    return 0
  }
}
