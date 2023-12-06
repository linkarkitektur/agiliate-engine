import MainSpace from '../main_space_class'

export default class CommonCleaning extends MainSpace {
  /**
   * Calculates the area of common cleaning.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor()
  }
}
