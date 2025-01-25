import MainSpace from '../main_space_class'
import Auditorium from './auditorium'
import Course from './course'

export default class Anteroom extends MainSpace {
  markupPeakArea(): number {
    // =IF(AND(AF6>0;AS45="J");SUM(AF6*AN47);IF(AND(AF6>0;AS46="J");SUM(AF6*AN47);"0"))
    if (this.divergencePeakWorkstationCapacity() > 0) {
      return this.markupEmployeesAtPeak() * this.divergencePeakOccupancy()
    }
    return 0
  }
  /**
   * Calculates the anteroom area. 0 if there is no need.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToAuditorium || this.variables.accessToCourseSpace) {
      // =IF(OR(AS45="J";AS46="J");SUM(MAX(AH45;AH46)*'ROM LISTE'!W53)+T47;"0")
      // Get the area of the auditorium and the course space
      const auditorium = new Auditorium(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const course = new Course(this.variables, this.config, this.customSpaceConstants, this.customConstants)

      const x = auditorium.calculateAreaExclCompensation() / auditorium.minAreaPerPersonExcludingCorridor()
      const y = course.calculateAreaExclCompensation() / course.minAreaPerPersonExcludingCorridor()

      // Take the max of the two
      const max = Math.max(x, y)
      return max * this.minAreaPerPersonExcludingCorridor() + this.markupPeakArea()
    }
    return 0
  }
}
