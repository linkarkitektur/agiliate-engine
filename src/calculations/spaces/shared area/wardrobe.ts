import MainSpace from '../main_space_class'

export default class SharedWardrobe extends MainSpace {
  /**
   * Calculates the area of the wardrobe
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCoworking) {
      return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor() * this.variables.coworkingShare
    }
    return 0
  }
}
