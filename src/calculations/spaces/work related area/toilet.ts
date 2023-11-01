import MainSpace from '../main_space_class'

export default class WorkToilet extends MainSpace {
  /**
   * Area per person excluding corridor
   */
  areaPerPersonExcludingCorridor = (): number => {
    return this.spaceConstants.areaPerRole / this.spaceConstants.personsPerType * this.spaceConstants.unitsPerPerson!
  }

  /**
   * Calculates the area of the work toilet.
   * @returns {number}
   */
  calculateAreaExclCompensation = (): number => {
    return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor()
  }
}
