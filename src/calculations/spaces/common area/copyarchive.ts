import MainSpace from '../main_space_class'

export default class CommonCopykArchive extends MainSpace {
  /**
   * Calculates the area of copy/archive.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor()
  }
}
