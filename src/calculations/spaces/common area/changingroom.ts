import MainSpace from '../main_space_class'

export default class CommonChangingRoom extends MainSpace {
  calculateAreaExclCompensation(): number {
    return this.dimensionedAttendance() * this.areaPerEmployee()
  }

  calculateNumberOfRooms(): number {
    // =IF(D67>0;ROUND(MAX(D67/I67;'ROM LISTE'!R61;0);0);0)
    if (!this.spaceConstants.shouldCalculateNumberOfRooms) {
      return 0
    }
    if (this.space.result.adjustedAreaInclCompensation === undefined || this.space.result.adjustedAreaInclCompensation <= 0) {
      return this.spaceConstants.minimumPersons || 0
    }
    return Math.round(this.space.result.adjustedAreaInclCompensation / this.areaPerRoom())
  }
}
