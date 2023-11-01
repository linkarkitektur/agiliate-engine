import MainSpace from '../main_space_class'

export default class WorkHwc extends MainSpace {
  /**
   * Area per person excluding corridor
   */
  areaPerPersonExcludingCorridor = (): number => {
    return this.spaceConstants.areaPerRole / this.spaceConstants.personsPerType * this.spaceConstants.unitsPerPerson!
  }

  /**
   * Calculates the area of the work hwc.
   * @returns {number}
   */
  calculateAreaExclCompensation = (): number => {
    return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor()
  }
}
