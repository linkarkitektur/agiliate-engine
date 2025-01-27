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
}
