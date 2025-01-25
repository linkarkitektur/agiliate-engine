import MainSpace from '../main_space_class'

export default class SharedDockin extends MainSpace {
  sharePerWorkspaceType(): number {
    return this.variables.dockinShare * this.variables.coworkingShare
  }

  calculateEmployeesPerWorkplaceTypeAdjusted(): number {
    return this.markupEmployeesAtPeak() + (this.nonAdjustedWorkstationCapacity() * this.sharePerWorkspaceType())
  }

  calculateAreaExclCompensation(): number {
    if (!this.variables.accessToCoworking) {
      return 0
    }

    if (this.variables.addPeakMarkupToWorkstationCapacityShare) {
      return this.calculateEmployeesPerWorkplaceTypeAdjusted() * this.areaPerEmployee()
    }

    return this.calculateEmployeesPerWorkplaceTypeUnadjusted() * this.areaPerEmployee()
  }
}
