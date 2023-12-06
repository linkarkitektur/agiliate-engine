import MainSpace from '../main_space_class'
import WorkTouchdown from './touchdown'
import WorkDockin from './dockin'
import CellOffice from './celloffice'
import Landscape from './landscape'
import Projectroom from './projectroom'
import Focusroom from './focusroom'
import Quietzone from './quietzone'
import WorkSmallMeetingroom from './meetingroom_small'
import WorkMediumMeetingroom from './meetingroom_medium'
import WorkLargeMeetingroom from './meetingroom_large'

export default class WorkMiniMeetingroom extends MainSpace {
  /**
   * Calculates the area per person for this space.
   * @returns {number}
   */
  areaPerPersonExcludingCorridor(): number {
    return this.spaceConstants.areaPerRole / this.spaceConstants.personsPerType * this.variables.miniMeetingroomShare
  }

  /**
   * Calculates the area of the meeting room.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    const workTouchdown = new WorkTouchdown(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const workDockin = new WorkDockin(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const cellOffice = new CellOffice(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const landscape = new Landscape(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const projectroom = new Projectroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const focusroom = new Focusroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const quietzone = new Quietzone(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const addedPeakAreaSum = workTouchdown.calculateEmployeesPerWorkplaceTypeUnadjusted() + workDockin.calculateEmployeesPerWorkplaceTypeUnadjusted() + cellOffice.calculateEmployeesPerWorkplaceTypeUnadjusted() + landscape.calculateEmployeesPerWorkplaceTypeUnadjusted() + projectroom.calculateEmployeesPerWorkplaceTypeUnadjusted() + focusroom.calculateEmployeesPerWorkplaceTypeUnadjusted() + quietzone.calculateEmployeesPerWorkplaceTypeUnadjusted() 
    const workSmallMeetingroom = new WorkSmallMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const workMediumMeetingroom = new WorkMediumMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const workLargeMeetingroom = new WorkLargeMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const areaPerPersonExcludingCorridorSum = workSmallMeetingroom.areaPerPersonExcludingCorridor() + workMediumMeetingroom.areaPerPersonExcludingCorridor() + workLargeMeetingroom.areaPerPersonExcludingCorridor() + this.areaPerPersonExcludingCorridor()
    return this.variables.miniMeetingroomShare * addedPeakAreaSum * areaPerPersonExcludingCorridorSum + this.addedPeakArea()
  }
}
