import MainSpace from '../main_space_class'

export default class SharedCopyArchive extends MainSpace {
  /**
   * Calculates the area of the copy/archive
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    // AB6*AN33*AM33
    if (this.variables.accessToCoworking) {
      return this.dimensionedAttendance() * this.areaPerEmployee() * this.variables.coworkingShare
    }
    return 0
  }
}
