import MainSpace from '../main_space_class'
import SharedProjectroom from '../coworking/projectroom'
import CommonProjectroom from '../common area/projectroom'

export default class Projectroom extends MainSpace {
  sharePerWorkspaceType (): number {
    const coworkingProjectroom = new SharedProjectroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const commonProjectroom = new CommonProjectroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    return this.variables.projectroomShare - coworkingProjectroom.sharePerWorkspaceType() - commonProjectroom.sharePerWorkspaceType()
  }

  calculateEmployeesPerWorkplaceTypeAdjusted(): number {
    return this.space.result.adjustmentForMissingSquareMeters || 0
  }

  calculateAreaExclCompensation (): number {
    // =SUM(AI10*AN10)
    return this.calculateEmployeesPerWorkplaceTypeAdjusted() * this.areaPerEmployee()
  }

  calculateNonAdjustedRestArea(): number {
    if (this.space.result.adjustedAreaInclCompensation === undefined || this.space.result.adjustedAreaInclCompensation <= 0 || this.space.result.numberOfRooms === undefined || this.space.result.numberOfRooms <= 0) {
      return 0
    }
    return this.space.result.adjustedAreaInclCompensation - this.areaPerRoom() * this.space.result.numberOfRooms
  }
}
