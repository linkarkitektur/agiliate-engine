import MainSpace from '../main_space_class'

export default class Auditorium extends MainSpace {
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToAuditorium) {
      return this.areaPerEmployee() * this.variables.seatsInAuditorium
    }
    return 0
  }
}
