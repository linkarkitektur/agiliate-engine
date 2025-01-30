import MainSpace from '../main_space_class'
import WorkTouchdown from './touchdown'
import WorkDockin from './dockin'
import Focusroom from './focusroom'
import Quietzone from './quietzone'
import SharedPersonalStorage from '../coworking/personalstorage'

export default class WorkPersonalStorage extends MainSpace {
  calculateAreaExclCompensation (): number {
    const workTouchdown = new WorkTouchdown(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const workDockin = new WorkDockin(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const focusroom = new Focusroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const quietzone = new Quietzone(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const sharedPersonalStorage = new SharedPersonalStorage(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const employeesPerWorkplaceTypeUnadjusted = workTouchdown.calculateEmployeesPerWorkplaceTypeUnadjusted() + workDockin.calculateEmployeesPerWorkplaceTypeUnadjusted() + focusroom.calculateEmployeesPerWorkplaceTypeUnadjusted() + quietzone.calculateEmployeesPerWorkplaceTypeUnadjusted()
    return employeesPerWorkplaceTypeUnadjusted * this.areaPerEmployee() - sharedPersonalStorage.calculateAreaExclCompensation()
  }

  calculateNumberOfRooms(): number {
    if (!this.spaceConstants.shouldCalculateNumberOfRooms) {
      return 0
    }
    if (this.areaPerFunction() > 0) {
      return 1
    }
    return 0
  }
}
