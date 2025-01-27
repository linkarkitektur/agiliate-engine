import MainSpace from '../main_space_class'
import TeamOffice from '../coworking/teamoffice'

export default class Landscape extends MainSpace {
  sharePerWorkspaceType (): number {
    const teamOffice = new TeamOffice(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    return this.variables.landscapeShare - teamOffice.sharePerWorkspaceType()
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
