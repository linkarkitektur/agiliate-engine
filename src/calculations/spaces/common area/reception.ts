import MainSpace from '../main_space_class'

export default class CommonReception extends MainSpace {
  /**
   * Calculates the area of common area reception.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCommonAreaReception) {
      return this.dimensionedAttendance() *  this.areaPerEmployee()
    }
    return 0
  }
}
