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
    return this.space.result.adjustmentForMissingSquareMeters || 1
  }

  calculateAreaExclCompensation (): number {
    return this.calculateEmployeesPerWorkplaceTypeAdjusted() * this.areaPerEmployee()
  }
}
