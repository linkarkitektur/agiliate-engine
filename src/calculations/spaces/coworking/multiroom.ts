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
}
