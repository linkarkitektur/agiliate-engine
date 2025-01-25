import MainSpace from '../main_space_class'

export default class CommonProjectroom extends MainSpace {
  sharePerWorkspaceType (): number {
    if (this.variables.accessToCommonAreaProjectAndMeetingRooms) {
      return this.variables.projectroomShare * this.variables.accessToCommonAreaProjectAndMeetingRoomsShare
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
}
