import MainSpace from '../main_space_class'

export default class SharedLounge extends MainSpace {
  /**
   * Calculates the area of shared dockin. 0 if there is no desire.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    // SUM((AJ4*AR24*AQ24)+(AB24*AQ24))
    if (this.variables.accessToCoworking) {
      return (this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor() * this.sharePerWorkspaceType()) + (this.addedPeakArea() * this.sharePerWorkspaceType())
    }
    return 0
  }
}
