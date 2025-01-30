import MainSpace from '../main_space_class'

export default class Auditorium extends MainSpace {
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToAuditorium) {
      return this.areaPerEmployee() * this.variables.seatsInAuditorium
    }
    return 0
  }

  calculateNumberOfRooms(): number {
    if (!this.variables.accessToAuditorium) {
      return 0
    }
    if (!this.spaceConstants.shouldCalculateNumberOfRooms) {
      return 0
    }
    if (this.areaPerFunction() > 0) {
      return 1
    }
    return 0
  }
}
