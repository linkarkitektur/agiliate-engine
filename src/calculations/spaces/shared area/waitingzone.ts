import MainSpace from '../main_space_class'

export default class SharedWaitingZone extends MainSpace {
  /**
   * Calculates the area of shared wating zone in reception. 0 if there is no desire.
   * @returns {number}
   */
  calculateAreaExclCompensation = (): number => {
    if (this.variables.accessToReception) {
      return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor() * this.variables.coworkingShare
    }
    return 0
  }
}
