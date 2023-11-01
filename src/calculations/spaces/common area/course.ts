import MainSpace from '../main_space_class'

export default class Course extends MainSpace {
  /**
   * Calculates the area of course room. 0 if there is no need.
   * @returns {number}
   */
  calculateAreaExclCompensation = (): number => {
    if (this.variables.accessToCourseSpace) {
      return this.dimensionedAttendance() * this.spaceConstants.areaPerRole / this.spaceConstants.personsPerType
    }
    return 0
  }
}
