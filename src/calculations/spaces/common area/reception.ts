import MainSpace from '../main_space_class'

export default class CommonReception extends MainSpace {
  /**
   * Calculates the area of common area reception.
   * @returns {number}
   */
  calculateAreaExclCompensation = (): number => {
    return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor()
  }
}
