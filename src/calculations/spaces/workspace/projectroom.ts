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
    // =SUM(AI10*AN10)
    return this.calculateEmployeesPerWorkplaceTypeAdjusted() * this.areaPerEmployee()
  }

  /**
   * Calculates adjustment for missing square meters (AK6 in Excel)
   * Formula: IF (AK68!=0 AND AL6 == MAX(AL6:AL66)) THEN (AC6*AM6)+AK68 ELSE AC6*AM6
   * @todo Spørg Pontus om denne (fejler ved max pt... eller gør den?)
   */
  calculateAdjustmentForMissingSquareMeters(allEmployeesPerWorkplaceTypeUnadjusted: number[], totalEmployeesPerWorkplaceTypeUnadjusted: number): number {
    const myUnadjustedCount = this.calculateEmployeesPerWorkplaceTypeUnadjusted()
    const isMaxEmployee = myUnadjustedCount === Math.max(...allEmployeesPerWorkplaceTypeUnadjusted)
    const baseCount = this.nonAdjustedWorkstationCapacity() * this.sharePerWorkspaceType()

    if (isMaxEmployee) {
      const missingEmployees = this.nonAdjustedWorkstationCapacity() - totalEmployeesPerWorkplaceTypeUnadjusted
      return Math.round(baseCount + missingEmployees)
    }

    return Math.round(baseCount)
  }

  calculateNonAdjustedRestArea(): number {
    if (this.space.result.adjustedAreaInclCompensation === undefined || this.space.result.adjustedAreaInclCompensation <= 0 || this.space.result.numberOfRooms === undefined || this.space.result.numberOfRooms <= 0) {
      return 0
    }
    return this.space.result.adjustedAreaInclCompensation - this.areaPerRoom() * this.space.result.numberOfRooms
  }
}
