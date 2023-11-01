import MainSpace from '../main_space_class'
import WorkTouchdown from './touchdown'
import WorkDockin from './dockin'
import CellOffice from './celloffice'
import Landscape from './landscape'
import Projectroom from './projectroom'
import Focusroom from './focusroom'
import Quietzone from './quietzone'
import SharedLargeMeetingroom from '../shared area/meetingroom_large'

export default class WorkLargeMeetingroom extends MainSpace {
  /**
   * Calculates the area per person for this space.
   * @returns {number}
   */
  areaPerPersonExcludingCorridor(): number {
    return this.spaceConstants.areaPerRole / this.spaceConstants.personsPerType * this.variables.largeMeetingroomShare
  }

  /**
   * Calculates the area of the meeting room.
   * @returns {number}
   */
  calculateAreaExclCompensation = (): number => {
    // =SUM((AP4:AP10)*AR13)+(AB13)-(K27)
    const workTouchdown = new WorkTouchdown(this.space, this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const workDockin = new WorkDockin(this.space, this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const cellOffice = new CellOffice(this.space, this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const landscape = new Landscape(this.space, this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const projectroom = new Projectroom(this.space, this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const focusroom = new Focusroom(this.space, this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const quietzone = new Quietzone(this.space, this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const addedPeakAreaSum = workTouchdown.calculateEmployeesPerWorkplaceTypeUnadjusted() + workDockin.calculateEmployeesPerWorkplaceTypeUnadjusted() + cellOffice.calculateEmployeesPerWorkplaceTypeUnadjusted() + landscape.calculateEmployeesPerWorkplaceTypeUnadjusted() + projectroom.calculateEmployeesPerWorkplaceTypeUnadjusted() + focusroom.calculateEmployeesPerWorkplaceTypeUnadjusted() + quietzone.calculateEmployeesPerWorkplaceTypeUnadjusted() 
    const sharedLargeMeetingRoom = new SharedLargeMeetingroom(this.space, this.variables, this.config, this.customSpaceConstants, this.customConstants)
    return addedPeakAreaSum * this.areaPerPersonExcludingCorridor() + this.addedPeakArea() - sharedLargeMeetingRoom.calculateAreaExclCompensation()
  }
}
