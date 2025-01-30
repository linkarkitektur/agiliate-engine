import MainSpace from '../main_space_class'

export default class Course extends MainSpace {
  /**
   * Calculates the area of course room. 0 if there is no need.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCourseSpace) {
      return this.areaPerEmployee() * this.variables.seatsInCourseSpace
    }
    return 0
  }

  calculateNumberOfRooms(): number {
    if (!this.variables.accessToCourseSpace) {
      return 0
    }
    if (!this.spaceConstants.shouldCalculateNumberOfRooms) {
      return 0
    }
    if (this.space.result.adjustedAreaInclCompensation === undefined) {
      return 0
    }
    if (this.space.result.adjustedAreaInclCompensation > 0) {
      return Math.ceil(this.space.result.adjustedAreaInclCompensation / this.areaPerRoom())
    }
    return this.spaceConstants.minimumPersons || 0
  }
}
