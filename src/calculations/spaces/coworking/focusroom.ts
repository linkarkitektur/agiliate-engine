import MainSpace from '../main_space_class'

export default class SharedFocusroom extends MainSpace {
  sharePerWorkspaceType (): number {
    return this.variables.focusroomShare * this.variables.coworkingShare
  }

  calculateEmployeesPerWorkplaceTypeAdjusted(): number {
    return (this.nonAdjustedWorkstationCapacity() * this.sharePerWorkspaceType())
  }

  calculateAreaExclCompensation (): number {
    return this.calculateEmployeesPerWorkplaceTypeAdjusted() * this.areaPerEmployee()
  }
}
