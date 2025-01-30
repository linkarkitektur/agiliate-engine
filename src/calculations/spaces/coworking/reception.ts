import MainSpace from '../main_space_class'

export default class SharedReception extends MainSpace {
  /**
   * Calculates the area of shared reception. 0 if there is no desire.
   * @todo er det rigtigt med accessToTenantReception
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCoworking && this.variables.accessToTenantReception) {
      return this.dimensionedAttendance() * this.areaPerEmployee() * this.variables.coworkingShare
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
