import MainSpace from '../main_space_class'
import SharedDockin from '../coworking/dockin'

export default class WorkDockin extends MainSpace {
  /**
   * This method computes the share of this workspace type
   * @returns {number}
   */
  sharePerWorkspaceType (): number {
    // We need the shared dock in share for the calculation of the work dock in share
    if (!this.variables.accessToCoworking) {
      return this.variables.dockinShare
    }
    const sharedDockin = new SharedDockin(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    return this.variables.dockinShare - sharedDockin.sharePerWorkspaceType()
  }

  calculateEmployeesPerWorkplaceTypeAdjusted(): number {
    return this.markupEmployeesAtPeak() + (this.nonAdjustedWorkstationCapacity() * this.sharePerWorkspaceType())
  }

  /**
   * Calculates the area of touchdown. 0 if there is no need.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.addPeakMarkupToWorkstationCapacityShare) {
      return this.calculateEmployeesPerWorkplaceTypeAdjusted() * this.areaPerEmployee()
    }
    return this.nonAdjustedWorkstationCapacity() * this.sharePerWorkspaceType() * this.areaPerEmployee()
  }
}
