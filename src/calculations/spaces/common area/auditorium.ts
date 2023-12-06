import MainSpace from '../main_space_class'

export default class Auditorium extends MainSpace {
  /**
   * Calculates the area of the auditorum. 0 if there is no canteen.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToAuditorium) {
      return this.spaceConstants.areaPerRole / this.spaceConstants.personsPerType * this.variables.seatsInAuditorium
    }
    return 0
  }
}
