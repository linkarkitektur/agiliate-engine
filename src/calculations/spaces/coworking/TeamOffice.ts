import MainSpace from '../main_space_class'

export default class TeamOffice extends MainSpace {
  /**
   * Calculates the area of shared dockin. 0 if there is no desire.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCoworking) {
      return this.personsPerType() * this.minAreaPerPersonExcludingCorridor() + this.addedPeakArea()
    }
    return 0
  }
}
