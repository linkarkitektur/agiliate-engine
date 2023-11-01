import MainSpace from '../main_space_class'

export default class CommonStockArchive extends MainSpace {
  /**
   * Calculates the area of stock/archive.
   * @returns {number}
   */
  calculateAreaExclCompensation = (): number => {
    return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor()
  }
}
