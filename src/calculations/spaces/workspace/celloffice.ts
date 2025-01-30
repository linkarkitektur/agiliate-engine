import MainSpace from '../main_space_class'

export default class CellOffice extends MainSpace {
  sharePerWorkspaceType (): number {
    if (this.variables.accessToCellOffice) {
      return this.variables.cellOfficeShare
    }
    return 0
  }

  calculateEmployeesPerWorkplaceTypeAdjusted(): number {
    // return (this.nonAdjustedWorkstationCapacity() * this.sharePerWorkspaceType())
    // return Math.round((this.nonAdjustedWorkstationCapacity() * this.sharePerWorkspaceType()))
    return this.space.result.adjustmentForMissingSquareMeters || 1
  }

  calculateAreaExclCompensation (): number {
    if (!this.variables.accessToCellOffice) {
      return 0
    }
    return this.calculateEmployeesPerWorkplaceTypeAdjusted() * this.areaPerEmployee()
  }

  calculateNumberOfSeats(allEmployeesPerWorkplaceTypeUnadjusted: number[], totalEmployeesPerWorkplaceTypeUnadjusted: number): number {
    if (!this.variables.accessToCellOffice) {
      return 0
    }
    return super.calculateNumberOfSeats(allEmployeesPerWorkplaceTypeUnadjusted, totalEmployeesPerWorkplaceTypeUnadjusted)
  }

  calculateNonAdjustedRestArea(): number {
    if (this.space.result.adjustedAreaInclCompensation === undefined || this.space.result.adjustedAreaInclCompensation <= 0 || this.space.result.numberOfRooms === undefined || this.space.result.numberOfRooms <= 0) {
      return 0
    }
    return this.space.result.adjustedAreaInclCompensation - this.areaPerRoom() * this.space.result.numberOfRooms
  }
}
