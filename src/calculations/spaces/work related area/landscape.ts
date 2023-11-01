import MainSpace from '../main_space_class'

export default class Landscape extends MainSpace {
  /**
   * This method computes the share of this workspace type
   * @returns {number}
   */
  sharePerWorkspaceType = (): number => {
    if (this.variables.accessToCellOffice) {
      return this.variables.landscapeShare
    } else {
      return this.variables.landscapeShare + this.variables.cellOfficeShare
    }
    return 0
  }

  /**
   * Calculates the area of the landscape.
   * @returns {number}
   */
  calculateAreaExclCompensation = (): number => {
    return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor() * this.sharePerWorkspaceType()
  }
}
