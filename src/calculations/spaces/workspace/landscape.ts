import MainSpace from '../main_space_class'

export default class Landscape extends MainSpace {
  sharePerWorkspaceType (): number {
    if (this.variables.accessToCellOffice) {
      return this.variables.landscapeShare
    }
    return this.variables.landscapeShare + this.variables.cellOfficeShare
  }

  calculateEmployeesPerWorkplaceTypeAdjusted(): number {
    // =IF(AND(AK68<>0; AL9=MAX(AL6:AL66)); ROUND((AC6*AM9)+AK68; 0); ROUND((AC6*AM9); 0))
    return this.space.result.adjustmentForMissingSquareMeters || 1
    // return (this.nonAdjustedWorkstationCapacity() * this.sharePerWorkspaceType())
  }

  calculateAreaExclCompensation (): number {
    // (AI9*AN9)
    // AI9 = employeesPerWorkplaceTypeAdjusted = AK9 = =IF(AND(AK68<>0; AL9=MAX(AL6:AL66)); ROUND((AC6*AM9)+AK68; 0); ROUND((AC6*AM9); 0))
    // return (this.space.result.employeesPerWorkplaceTypeAdjusted || 0) * this.areaPerEmployee()
    return this.calculateEmployeesPerWorkplaceTypeAdjusted() * this.areaPerEmployee()
  }
}
