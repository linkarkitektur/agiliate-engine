import MainSpace from '../main_space_class'

export default class MiniKitchenLounge extends MainSpace {
  /**
   * Area per person excluding corridor
   */
  areaPerPersonExcludingCorridor (): number {
    return this.spaceConstants.areaPerRole / this.spaceConstants.personsPerType
  }

  /**
   * Calculates the area of the zone.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor() + this.addedPeakArea()
  }
}
