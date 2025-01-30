import MainSpace from '../main_space_class'

export default class SharedWardrobe extends MainSpace {
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCoworking) {
      return this.dimensionedAttendance() * this.areaPerEmployee() * this.variables.coworkingShare
    }
    return 0
  }

  calculateNumberOfRooms(): number {
    if (!this.variables.accessToCoworking) {
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
