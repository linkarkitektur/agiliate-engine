import MainSpace from '../main_space_class'

export default class SharedTouchdown extends MainSpace {
  /**
   * This method computes the share of this workspace type
   * @returns {number}
   */
  sharePerWorkspaceType = (): number => {
    if (this.variables.accessToCoworking) {
      return this.variables.touchdownShare * this.variables.coworkingShare
    }
    return 0
  }

  /**
   * Calculates the area of shared touchdown. 0 if there is no desire.
   * @returns {number}
   */
  calculateAreaExclCompensation = (): number => {
    if (this.variables.accessToCoworking) {
      return this.personsPerType() * this.areaPerPersonExcludingCorridor() + this.addedPeakArea()
    }
    return 0
  }
}
