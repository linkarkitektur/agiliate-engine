import MainSpace from '../main_space_class'

export default class SharedToilet extends MainSpace {
  /**
   * Area per person excluding corridor
   */
  areaPerPersonExcludingCorridor (): number {
    return this.spaceConstants.areaPerRole / this.spaceConstants.personsPerType * this.spaceConstants.unitsPerPerson!
  }

  /**
   * Calculates the area of the shared toilet.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCoworking) {
      return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor() * this.variables.coworkingShare
    }
    return 0
  }
}
