import MainSpace from '../main_space_class'

export default class WorkHwc extends MainSpace {
  /**
   * Calculates the area of the work hwc.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor()
  }

  minAreaPerPersonExcludingCorridor(): number {
    return this.areaPerFunction() / this.spaceConstants.personsPerType * this.spaceConstants.unitsPerPerson!
  }
}
