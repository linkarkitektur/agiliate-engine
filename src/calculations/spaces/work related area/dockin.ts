import MainSpace from '../main_space_class'
import SharedDockin from '../shared area/dockin'

export default class WorkDockin extends MainSpace {
  /**
   * This method computes the share of this workspace type
   * @returns {number}
   */
  sharePerWorkspaceType = (): number => {
    // We need the shared dock in share for the calculation of the work dock in share
    const sharedDockin = new SharedDockin(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    return this.variables.dockinShare - sharedDockin.sharePerWorkspaceType()
  }

  /**
   * Calculates the area of touchdown. 0 if there is no need.
   * @returns {number}
   */
  calculateAreaExclCompensation = (): number => {
    return (this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor()*this.sharePerWorkspaceType())+(this.addedPeakArea()*this.sharePerWorkspaceType())
  }
}
