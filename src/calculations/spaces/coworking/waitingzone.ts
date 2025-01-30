import MainSpace from '../main_space_class'

export default class SharedWaitingZone extends MainSpace {
  /**
   * Calculates the area of shared wating zone in reception. 0 if there is no desire.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
      if (this.variables.accessToCoworking && this.variables.accessToTenantReception) {
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
