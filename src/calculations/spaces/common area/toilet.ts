import MainSpace from '../main_space_class'

export default class CommonToilet extends MainSpace {
  /**
   * Area per person excluding corridor
   */
  minAreaPerPersonExcludingCorridor (): number {
    return this.areaPerFunction() / this.spaceConstants.personsPerType * (this.spaceConstants.unitsPerPerson || 1) * this.constants.usageRatioCommonArea
  }

  /**
   * Calculates the area of the shared toilet.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor()
  }

}
