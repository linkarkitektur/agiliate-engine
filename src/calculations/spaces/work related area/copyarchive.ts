import MainSpace from '../main_space_class'

export default class CopyArchive extends MainSpace {
  /**
   * Calculates the area of the copy/archive
   * @returns {number}
   */
  calculateAreaExclCompensation = (): number => {
    return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor()
  }
}
