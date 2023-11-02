import MainSpace from '../main_space_class'
import WorkTouchdown from './touchdown'
import WorkDockin from './dockin'
import Landscape from './landscape'
import Focusroom from './focusroom'

export default class WorkMultiroom extends MainSpace {
  /**
   * Calculates the area of the multi room.
   * @returns {number}
   */
  calculateAreaExclCompensation = (): number => {
    const workDockin = new WorkDockin(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const landscape = new Landscape(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const workTouchdown = new WorkTouchdown(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const focusroom = new Focusroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)

    const touchdownDockinLandscapeSum = workTouchdown.calculateEmployeesPerWorkplaceTypeUnadjusted() + workDockin.calculateEmployeesPerWorkplaceTypeUnadjusted() + landscape.calculateEmployeesPerWorkplaceTypeUnadjusted()

    if (touchdownDockinLandscapeSum / 15 * 2 * this.areaPerPersonExcludingCorridor() > focusroom.calculateAreaExclCompensation()) {
      return touchdownDockinLandscapeSum / 15 * 2 * this.areaPerPersonExcludingCorridor() - focusroom.calculateAreaExclCompensation()
    } else {
      return touchdownDockinLandscapeSum / 15 * 2 * this.areaPerPersonExcludingCorridor()
    }
  }
}
