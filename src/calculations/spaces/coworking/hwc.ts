import MainSpace from '../main_space_class'

export default class SharedHwc extends MainSpace {
  /**
   * Area per person excluding corridor
   */
  minAreaPerPersonExcludingCorridor (): number {
    return this.areaPerFunction() / this.spaceConstants.personsPerType * (this.spaceConstants.unitsPerPerson || 1) * this.constants.usageRatioCommonArea
  }

  /**
   * Calculates the area of the shared toilet.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCoworking) {
      return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor() * this.variables.coworkingShare
    }
    return 0
  }

  calculateNumberOfRooms(): number {
    if (!this.variables.accessToCoworking) {
      return 0
    }
    if (!this.spaceConstants.shouldCalculateNumberOfRooms) {
      return 0
    }
    if (this.space.result.adjustedAreaInclCompensation === undefined || this.space.result.adjustedAreaInclCompensation <= 0 || this.areaPerRoom() <= 0) {
      return 0
    }
    if (this.space.result.adjustedAreaInclCompensation >= this.areaPerRoom()) {
      return Math.round(this.space.result.adjustedAreaInclCompensation / this.areaPerRoom())
    }
    return Math.ceil(this.space.result.adjustedAreaInclCompensation / this.areaPerRoom())
  }
}
