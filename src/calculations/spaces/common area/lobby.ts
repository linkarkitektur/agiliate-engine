import MainSpace from '../main_space_class'
import Auditorium from './auditorium'
import Course from './course'

export default class Lobby extends MainSpace {
  /**
   * Calculates the lobby area. 0 if there is no need.
   * @returns {number}
   */
  calculateAreaExclCompensation = (): number => {
    if (this.variables.accessToAuditorium || this.variables.accessToCourseSpace) {
      // Get the area of the auditorium and the course space
      const auditorium = new Auditorium(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const course = new Course(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const areaPerPerson = this.spaceConstants.areaPerRole / this.spaceConstants.personsPerType

      const x = auditorium.calculateAreaExclCompensation() / areaPerPerson
      const y = course.calculateAreaExclCompensation() / this.spaceConstants.areaPerRole * (this.spaceConstants.seatAreaPerSpot ? this.spaceConstants.seatAreaPerSpot : 0)

      // Take the max of the two
      const max = Math.max(x, y)
      return max * areaPerPerson + this.addedPeakArea()
    }
    return 0
  }
}
