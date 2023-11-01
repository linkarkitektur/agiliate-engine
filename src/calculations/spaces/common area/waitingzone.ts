import MainSpace from '../main_space_class'

export default class CommonWaitingZone extends MainSpace {
  /**
   * Calculates the area of common waiting zone.
   * @returns {number}
   */
  calculateAreaExclCompensation = (): number => {
    return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor()
  }
}
