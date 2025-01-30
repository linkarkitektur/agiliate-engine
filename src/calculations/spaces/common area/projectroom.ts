import MainSpace from '../main_space_class'

export default class CommonProjectroom extends MainSpace {
  sharePerWorkspaceType (): number {
    if (this.variables.accessToCommonAreaProjectAndMeetingRooms) {
      return this.variables.projectroomShare * this.variables.commonAreaProjectAndMeetingRoomsShare
    }
    return 0
  }

  calculateEmployeesPerWorkplaceTypeAdjusted(): number {
    return this.space.result.adjustmentForMissingSquareMeters || 1
  }

  calculateAreaExclCompensation (): number {
    // AI40*AN40
    return this.calculateEmployeesPerWorkplaceTypeAdjusted() * this.areaPerEmployee()
  }

  calculateNonAdjustedRestArea(): number {
    if (this.space.result.adjustedAreaInclCompensation === undefined || this.space.result.adjustedAreaInclCompensation <= 0 || this.space.result.numberOfRooms === undefined || this.space.result.numberOfRooms <= 0) {
      return 0
    }
    return this.space.result.adjustedAreaInclCompensation - this.areaPerRoom() * this.space.result.numberOfRooms
  }
}
