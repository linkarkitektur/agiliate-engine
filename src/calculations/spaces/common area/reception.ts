import MainSpace from '../main_space_class'

export default class CommonReception extends MainSpace {
  /**
   * Calculates the area of common area reception.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCommonAreaReception) {
      return this.dimensionedAttendance() *  this.areaPerEmployee()
    }
    return 0
  }

  calculateNonAdjustedRestArea(): number {
    return (this.space.result.adjustedAreaInclCompensation || 0) - this.areaPerRoom() * (this.space.result.numberOfRooms || 0)
  }

  calculateNumberOfRooms(): number {
    if (!this.variables.accessToCommonAreaReception) {
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
