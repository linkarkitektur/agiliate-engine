import MainSpace from '../main_space_class'
import SharedWaitingZone from '../coworking/waitingzone'

export default class WorkWaitingZone extends MainSpace {
  /**
   * Calculates the area of the reception.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToTenantReception) {
      const sharedWaitingZone = new SharedWaitingZone(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      return this.dimensionedAttendance() * this.areaPerEmployee() - sharedWaitingZone.calculateAreaExclCompensation()
    }
    return 0
  }

  calculateNumberOfRooms(): number {
    if (!this.spaceConstants.shouldCalculateNumberOfRooms) {
      return 0
    }
    if (this.areaPerFunction() > 0) {
      return 1
    }
    return 0
  }
}
