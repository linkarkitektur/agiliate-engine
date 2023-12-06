import MainSpace from '../main_space_class'

export default class CommonWardrobe extends MainSpace {
  /**
   * Calculates the area of the common wardrobe
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor()
  }
}
