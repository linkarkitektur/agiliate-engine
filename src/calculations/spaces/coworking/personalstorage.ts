import MainSpace from '../main_space_class'
import SharedTouchdown from './touchdown'
import SharedDockin from './dockin'

export default class SharedPersonalStorage extends MainSpace {
  /**
   * Calculates the area of the personal storage
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCoworking) {
      const sharedTouchdown = new SharedTouchdown(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const sharedDockin = new SharedDockin(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      return (sharedTouchdown.calculateEmployeesPerWorkplaceTypeUnadjusted() + sharedDockin.calculateEmployeesPerWorkplaceTypeUnadjusted()) * this.areaPerEmployee()
    }
    return 0
  }

  calculateNumberOfRooms(): number {
    if (!this.variables.accessToCoworking) {
      return 0
    }
    if (!this.spaceConstants.shouldCalculateNumberOfRooms) {
      return 0
    }
    if (this.areaPerFunction() > 0) {
      return 1
    }
    return 0
  }
}
