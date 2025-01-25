import MainSpace from '../main_space_class'

export default class CommonWardrobe extends MainSpace {
  areaPerEmployee(): number {
    return this.minAreaPerPersonExcludingCorridor()
  }

  /**
   * Calculates the area of the common wardrobe
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    // AB6*AN50*AM50
    return this.dimensionedAttendance() * this.areaPerEmployee() * this.variables.coworkingShare
  }
}
