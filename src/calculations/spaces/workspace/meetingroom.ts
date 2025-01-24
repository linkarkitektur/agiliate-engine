import MainSpace from '../main_space_class'
import WorkTouchdown from './touchdown'
import WorkDockin from './dockin'
import CellOffice from './celloffice'
import Landscape from './landscape'
import Projectroom from './projectroom'
import Focusroom from './focusroom'
import Quietzone from './quietzone'
import WorkMultiroom from './multiroom'
import WorkMiniMeetingroom from './meetingroom_mini'
import WorkSmallMeetingroom from './meetingroom_small'
import WorkMediumMeetingroom from './meetingroom_medium'
import WorkLargeMeetingroom from './meetingroom_large'
import CommonMeetingroom from '../common area/meetingroom'
import SharedMeetingroom from '../coworking/meetingroom'

export default class WorkMeetingroom extends MainSpace {
  calculateAreaExclCompensation (): number {
    const workTouchdown = new WorkTouchdown(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const workDockin = new WorkDockin(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const cellOffice = new CellOffice(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const landscape = new Landscape(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const projectroom = new Projectroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const focusroom = new Focusroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const quietzone = new Quietzone(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const workMultiroom = new WorkMultiroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const commonMeetingroom = new CommonMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants, this.space)
    const sharedMeetingroom = new SharedMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants, this.space)
    const workMiniMeetingroom = new WorkMiniMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const workSmallMeetingroom = new WorkSmallMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const workMediumMeetingroom = new WorkMediumMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const workLargeMeetingroom = new WorkLargeMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const employeesPerWorkplaceTypeUnadjusted = workTouchdown.calculateEmployeesPerWorkplaceTypeUnadjusted() +
      workDockin.calculateEmployeesPerWorkplaceTypeUnadjusted() +
      cellOffice.calculateEmployeesPerWorkplaceTypeUnadjusted() +
      landscape.calculateEmployeesPerWorkplaceTypeUnadjusted() +
      projectroom.calculateEmployeesPerWorkplaceTypeUnadjusted() +
      focusroom.calculateEmployeesPerWorkplaceTypeUnadjusted() +
      quietzone.calculateEmployeesPerWorkplaceTypeUnadjusted()
    const areaPerEmployee = workMiniMeetingroom.minAreaPerPersonExcludingCorridor() * this.variables.miniMeetingroomShare +
      workSmallMeetingroom.minAreaPerPersonExcludingCorridor() * this.variables.smallMeetingroomShare +
      workMediumMeetingroom.minAreaPerPersonExcludingCorridor() * this.variables.mediumMeetingroomShare +
      workLargeMeetingroom.minAreaPerPersonExcludingCorridor() * this.variables.largeMeetingroomShare
    const meetingRoomAreaTotal = employeesPerWorkplaceTypeUnadjusted *
      areaPerEmployee +
      this.markupPeakArea(areaPerEmployee) -
      workMultiroom.calculateAreaExclCompensation() -
      commonMeetingroom.calculateAreaExclCompensation() -
      sharedMeetingroom.calculateAreaExclCompensation()
    return meetingRoomAreaTotal
  }
}
