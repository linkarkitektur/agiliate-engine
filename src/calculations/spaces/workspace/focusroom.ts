import MainSpace from '../main_space_class'
import SharedFocusroom from '../coworking/focusroom'

export default class Focusroom extends MainSpace {
  /**
   * This method computes the share of this workspace type
   * @returns {number}
   */
  sharePerWorkspaceType (): number {
    const coworkingFocusroom = new SharedFocusroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    return this.variables.focusroomShare - coworkingFocusroom.sharePerWorkspaceType()
  }

  calculateEmployeesPerWorkplaceTypeAdjusted(): number {
    return this.space.result.adjustmentForMissingSquareMeters || 1
  }

  calculateAreaExclCompensation (): number {
    return this.calculateEmployeesPerWorkplaceTypeAdjusted() * this.areaPerEmployee()
  }

  calculateNonAdjustedRestArea(): number {
    if (this.space.result.adjustedAreaInclCompensation === undefined || this.space.result.adjustedAreaInclCompensation <= 0 || this.space.result.numberOfRooms === undefined || this.space.result.numberOfRooms <= 0) {
      return 0
    }
    return this.space.result.adjustedAreaInclCompensation - this.areaPerRoom() * this.space.result.numberOfRooms
  }
}
