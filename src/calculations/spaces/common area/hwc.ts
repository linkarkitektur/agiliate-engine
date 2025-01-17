import MainSpace from '../main_space_class'

export default class CommonHwc extends MainSpace {
  /**
   * Area per person excluding corridor
   */
  areaPerPersonExcludingCorridor (): number {
    return this.areaPerFunction() / this.spaceConstants.personsPerType * this.spaceConstants.unitsPerPerson!
  }

  /**
   * Calculates the area of the common HWC
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor()
  }
}
