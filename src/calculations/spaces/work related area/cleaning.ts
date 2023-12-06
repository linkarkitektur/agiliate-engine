import MainSpace from '../main_space_class'

export default class Cleaning extends MainSpace {
  /**
   * Calculates the area of cleaning
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor()
  }
}
