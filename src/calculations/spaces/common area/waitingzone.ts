import MainSpace from '../main_space_class'

export default class CommonWaitingZone extends MainSpace {
  /**
   * Calculates the area of common waiting zone.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCommonAreaReception) {
      return this.dimensionedAttendance() *  this.areaPerEmployee()
    }
    return 0
  }

  calculateNumberOfRooms(): number {
    if (!this.variables.accessToCommonAreaReception) {
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
