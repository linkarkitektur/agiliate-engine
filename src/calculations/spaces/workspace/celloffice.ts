import MainSpace from '../main_space_class'

export default class CellOffice extends MainSpace {
  sharePerWorkspaceType (): number {
    if (this.variables.accessToCellOffice) {
      return this.variables.cellOfficeShare
    }
    return 0
  }

  calculateEmployeesPerWorkplaceTypeAdjusted(): number {
    // return (this.nonAdjustedWorkstationCapacity() * this.sharePerWorkspaceType())
    // return Math.round((this.nonAdjustedWorkstationCapacity() * this.sharePerWorkspaceType()))
    return this.space.result.adjustmentForMissingSquareMeters || 1
  }

  calculateAreaExclCompensation (): number {
    if (!this.variables.accessToCellOffice) {
      return 0
    }
    // console.log(this.calculateEmployeesPerWorkplaceTypeAdjusted(), this.areaPerEmployee())
    return this.calculateEmployeesPerWorkplaceTypeAdjusted() * this.areaPerEmployee()
  }
}
