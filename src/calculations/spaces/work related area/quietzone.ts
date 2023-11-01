import MainSpace from '../main_space_class'

export default class Quietzone extends MainSpace {
  /**
   * This method computes the share of this workspace type
   * @returns {number}
   */
  sharePerWorkspaceType = (): number => {
    return this.variables.quietzoneShare
  }

  /**
   * Calculates the area of the quiet zone.
   * @returns {number}
   */
  calculateAreaExclCompensation = (): number => {
    return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor() * this.sharePerWorkspaceType()
  }
}
