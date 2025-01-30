import MainSpace from '../main_space_class'

export default class SharedProjectroom extends MainSpace {
  sharePerWorkspaceType (): number {
    if (!this.variables.accessToCoworking) {
      return 0
    }
    return this.variables.projectroomShare * this.variables.coworkingShare
  }

  /**
   * Calculates the area of the shred project room.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCoworking) {
      // AL27*AN27
      return this.calculateEmployeesPerWorkplaceTypeUnadjusted() * this.areaPerEmployee()
    }
    return 0
  }

  calculateNonAdjustedRestArea(): number {
    if (this.space.result.adjustedAreaInclCompensation === undefined || this.space.result.adjustedAreaInclCompensation <= 0 || this.space.result.numberOfRooms === undefined || this.space.result.numberOfRooms <= 0) {
      return 0
    }
    return this.space.result.adjustedAreaInclCompensation - this.areaPerRoom() * this.space.result.numberOfRooms
  }
}
