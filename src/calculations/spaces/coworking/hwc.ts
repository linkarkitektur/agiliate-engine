import MainSpace from '../main_space_class'

export default class SharedHwc extends MainSpace {
  /**
   * Area per person excluding corridor
   */
  areaPerPersonExcludingCorridor (): number {
    return this.areaPerFunction() / this.spaceConstants.personsPerType * this.spaceConstants.unitsPerPerson!
  }

  /**
   * Calculates the area of the shared hwc.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCoworking) {
      return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor() * this.variables.coworkingShare
    }
    return 0
  }
}
