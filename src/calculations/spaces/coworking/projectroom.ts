import MainSpace from '../main_space_class'

export default class SharedProjectroom extends MainSpace {
  sharePerWorkspaceType (): number {
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
}
