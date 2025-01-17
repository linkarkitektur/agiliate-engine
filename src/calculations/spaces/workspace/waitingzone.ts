import MainSpace from '../main_space_class'
import SharedWaitingZone from '../coworking/waitingzone'

export default class WorkWaitingZone extends MainSpace {
  /**
   * Calculates the area of the reception.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToReception) {
      const sharedWaitingZone = new SharedWaitingZone(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor() - sharedWaitingZone.calculateAreaExclCompensation()
    }
    return 0
  }
}
