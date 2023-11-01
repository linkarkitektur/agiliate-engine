import MainSpace from '../main_space_class'
import WorkTouchdown from './touchdown'
import WorkDockin from './dockin'
import Focusroom from './focusroom'
import Quietzone from './quietzone'
import SharedPersonalStorage from '../shared area/personalstorage'

export default class WorkPersonalStorage extends MainSpace {
  /**
   * Calculates the area of the personal storage
   * @returns {number}
   */
  calculateAreaExclCompensation = (): number => {
    const workTouchdown = new WorkTouchdown(this.space, this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const workDockin = new WorkDockin(this.space, this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const focusroom = new Focusroom(this.space, this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const quietzone = new Quietzone(this.space, this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const sharedPersonalStorage = new SharedPersonalStorage(this.space, this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const addedPeakAreaSum = workTouchdown.calculateEmployeesPerWorkplaceTypeUnadjusted() + workDockin.calculateEmployeesPerWorkplaceTypeUnadjusted() + focusroom.calculateEmployeesPerWorkplaceTypeUnadjusted() + quietzone.calculateEmployeesPerWorkplaceTypeUnadjusted()
    return addedPeakAreaSum * this.areaPerPersonExcludingCorridor() - sharedPersonalStorage.calculateAreaExclCompensation()
  }
}
