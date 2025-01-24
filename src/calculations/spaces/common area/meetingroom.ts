import MainSpace from '../main_space_class'
import WorkTouchdown from '../workspace/touchdown'
import WorkDockin from '../workspace/dockin'
import CellOffice from '../workspace/celloffice'
import Landscape from '../workspace/landscape'
import Projectroom from '../workspace/projectroom'
import Focusroom from '../workspace/focusroom'
import Quietzone from '../workspace/quietzone'
import CommonSmallMeetingroom from './meetingroom_small'
import CommonMediumMeetingroom from './meetingroom_medium'
import CommonLargeMeetingroom from './meetingroom_large'

export default class CommonMeetingroom extends MainSpace {
  sharePerWorkspaceType (): number {
    if (this.variables.accessToCommonAreaProjectAndMeetingRooms) {
      return this.variables.accessToCommonAreaProjectAndMeetingRoomsShare
    }
    return 0
  }

  calculateAreaExclCompensation (): number {
    if (!this.variables.accessToCommonAreaProjectAndMeetingRooms) {
      return 0
    }
    // Sum of workspace areas
    const workTouchdown = new WorkTouchdown(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const workDockin = new WorkDockin(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const cellOffice = new CellOffice(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const landscape = new Landscape(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const projectroom = new Projectroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const focusroom = new Focusroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const quietzone = new Quietzone(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const commonSmallMeetingroom = new CommonSmallMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const commonMediumMeetingroom = new CommonMediumMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const commonLargeMeetingroom = new CommonLargeMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const employeesPerWorkplaceTypeUnadjusted = workTouchdown.calculateEmployeesPerWorkplaceTypeUnadjusted() +
      workDockin.calculateEmployeesPerWorkplaceTypeUnadjusted() +
      cellOffice.calculateEmployeesPerWorkplaceTypeUnadjusted() +
      landscape.calculateEmployeesPerWorkplaceTypeUnadjusted() +
      projectroom.calculateEmployeesPerWorkplaceTypeUnadjusted() +
      focusroom.calculateEmployeesPerWorkplaceTypeUnadjusted() +
      quietzone.calculateEmployeesPerWorkplaceTypeUnadjusted()
    const totalShare = this.variables.smallMeetingroomShare + this.variables.mediumMeetingroomShare + this.variables.largeMeetingroomShare
    const areaPerEmployee = commonSmallMeetingroom.minAreaPerPersonExcludingCorridor() * this.variables.smallMeetingroomShare / totalShare +
      commonMediumMeetingroom.minAreaPerPersonExcludingCorridor() * this.variables.mediumMeetingroomShare / totalShare +
      commonLargeMeetingroom.minAreaPerPersonExcludingCorridor() * this.variables.largeMeetingroomShare / totalShare
    const meetingRoomAreaTotal = employeesPerWorkplaceTypeUnadjusted *
      areaPerEmployee *
      this.sharePerWorkspaceType() +
      this.markupPeakArea(areaPerEmployee)
    return meetingRoomAreaTotal
  }
}
