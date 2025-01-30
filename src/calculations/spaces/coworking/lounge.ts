import MainSpace from '../main_space_class'

export default class SharedLounge extends MainSpace {
  calculateAreaExclCompensation (): number {
    // (AB6*AN31*AM31)+(T31*AM31)
    // AB6 = dimensionedAttendance
    // AN31 = areaPerEmployee
    // AM31 = sharePerWorkspaceType
    // T31 = markupPeakArea
    if (this.variables.accessToCoworking) {
      // return (this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor() * this.sharePerWorkspaceType()) + (this.addedPeakArea() * this.sharePerWorkspaceType())
      return (this.dimensionedAttendance() * this.areaPerEmployee() * this.variables.coworkingShare) +
      (this.markupPeakArea() * this.sharePerWorkspaceType())
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
    if (this.space.result.adjustedAreaInclCompensation === undefined) {
      return 0
    }
    if (this.space.result.adjustedAreaInclCompensation > 0) {
      return Math.round(this.space.result.adjustedAreaInclCompensation / this.areaPerRoom())
    }
    return this.spaceConstants.minimumPersons || 0
  }
}
