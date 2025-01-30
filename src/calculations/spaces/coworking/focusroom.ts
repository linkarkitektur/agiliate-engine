import MainSpace from '../main_space_class'

export default class SharedFocusroom extends MainSpace {
  sharePerWorkspaceType(): number {
    if (!this.variables.accessToCoworking) {
      return 0
    }
    return this.variables.focusroomShare * this.variables.coworkingShare
  }

  calculateEmployeesPerWorkplaceTypeAdjusted(): number {
    return this.markupEmployeesAtPeak() + (this.nonAdjustedWorkstationCapacity() * this.sharePerWorkspaceType())
  }

  calculateAreaExclCompensation(): number {
    if (!this.variables.accessToCoworking) {
      return 0
    }

    return this.calculateEmployeesPerWorkplaceTypeUnadjusted() * this.areaPerEmployee()
  }

  calculateNonAdjustedRestArea(): number {
    if (this.space.result.adjustedAreaInclCompensation === undefined || this.space.result.adjustedAreaInclCompensation <= 0 || this.space.result.numberOfRooms === undefined || this.space.result.numberOfRooms <= 0) {
      return 0
    }
    return this.space.result.adjustedAreaInclCompensation - this.areaPerRoom() * this.space.result.numberOfRooms
  }
}
