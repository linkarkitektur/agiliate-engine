import MainSpace from '../main_space_class'

export default class SharedFocusroom extends MainSpace {
  /**
   * This method computes the share of this workspace type
   * @returns {number}
   */
  sharePerWorkspaceType (): number {
    return this.variables.focusroomShare
  }

  /**
   * Calculates the area of the project room.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor() * this.sharePerWorkspaceType()
  }
}
