import MainSpace from '../main_space_class'
import SharedTouchdown from './touchdown'
import SharedDockin from './dockin'

export default class SharedMultiroom extends MainSpace {
  /**
   * Calculates the area of shared multiroom.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCoworking) {
      const sharedTouchdown = new SharedTouchdown(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const sharedDockin = new SharedDockin(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      // (AL24+AL25)/15*2)*AN28
      return (sharedTouchdown.calculateEmployeesPerWorkplaceTypeUnadjusted() + sharedDockin.calculateEmployeesPerWorkplaceTypeUnadjusted()) / 15 * 2 * this.areaPerEmployee()
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
    if (this.space.result.adjustedAreaInclCompensation === undefined) {
      return 0
    }
    if (this.space.result.adjustedAreaInclCompensation > 0) {
      return Math.round(this.space.result.adjustedAreaInclCompensation / this.areaPerRoom())
    }
    return this.spaceConstants.minimumPersons || 0
  }
}
