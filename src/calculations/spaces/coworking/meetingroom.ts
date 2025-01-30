import MainSpace from '../main_space_class'
import WorkTouchdown from '../workspace/touchdown'
import WorkDockin from '../workspace/dockin'
import CellOffice from '../workspace/celloffice'
import Landscape from '../workspace/landscape'
import Projectroom from '../workspace/projectroom'
import Focusroom from '../workspace/focusroom'
import Quietzone from '../workspace/quietzone'
import SharedMultiroom from './multiroom'
import SharedSmallMeetingroom from './meetingroom_small'
import SharedMediumMeetingroom from './meetingroom_medium'
import SharedLargeMeetingroom from './meetingroom_large'

export default class SharedMeetingroom extends MainSpace {
  calculateAreaExclCompensation (): number {
    if (!this.variables.accessToCoworking) {
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
    const sharedMultiroom = new SharedMultiroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const sharedSmallMeetingroom = new SharedSmallMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const sharedMediumMeetingroom = new SharedMediumMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const sharedLargeMeetingroom = new SharedLargeMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const employeesPerWorkplaceTypeUnadjusted = workTouchdown.calculateEmployeesPerWorkplaceTypeUnadjusted() +
      workDockin.calculateEmployeesPerWorkplaceTypeUnadjusted() +
      cellOffice.calculateEmployeesPerWorkplaceTypeUnadjusted() +
      landscape.calculateEmployeesPerWorkplaceTypeUnadjusted() +
      projectroom.calculateEmployeesPerWorkplaceTypeUnadjusted() +
      focusroom.calculateEmployeesPerWorkplaceTypeUnadjusted() +
      quietzone.calculateEmployeesPerWorkplaceTypeUnadjusted()
    const totalShare = this.variables.smallMeetingroomShare + this.variables.mediumMeetingroomShare + this.variables.largeMeetingroomShare
    const areaPerEmployee = sharedSmallMeetingroom.minAreaPerPersonExcludingCorridor() * this.variables.smallMeetingroomShare / totalShare +
      sharedMediumMeetingroom.minAreaPerPersonExcludingCorridor() * this.variables.mediumMeetingroomShare / totalShare +
      sharedLargeMeetingroom.minAreaPerPersonExcludingCorridor() * this.variables.largeMeetingroomShare / totalShare
    const meetingRoomAreaTotal = employeesPerWorkplaceTypeUnadjusted *
      areaPerEmployee *
      this.variables.coworkingShare +
      this.markupPeakArea(areaPerEmployee) -
      sharedMultiroom.calculateAreaExclCompensation()
    // SUM((AL6:AL12)*AN29*AM29)+(T29)-(M28);"0")
    return meetingRoomAreaTotal
  }

  calculateNumberOfRooms(): number {
    if (!this.variables.accessToCoworking) {
      return 0
    }
    if (!this.spaceConstants.shouldCalculateNumberOfRooms) {
      return 0
    }
    if (this.space.result.adjustedAreaInclCompensation === undefined || this.space.result.adjustedAreaInclCompensation <= 0 || this.areaPerRoom() <= 0) {
      return 0
    }
    if (this.space.result.adjustedAreaInclCompensation >= this.areaPerRoom()) {
      return Math.round(this.space.result.adjustedAreaInclCompensation / this.areaPerRoom())
    }
    return Math.ceil(this.space.result.adjustedAreaInclCompensation / this.areaPerRoom())
  }
}
