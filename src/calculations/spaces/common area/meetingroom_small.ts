import MainSpace from '../main_space_class'
import CommonMeetingroom from './meetingroom'

export default class CommonSmallMeetingroom extends MainSpace {
  sharePerWorkspaceType (): number {
    if (this.variables.accessToCommonAreaProjectAndMeetingRooms) {
      return this.variables.commonAreaProjectAndMeetingRoomsShare
    }
    return 0
  }
  // Formula for alle meeting rooms together:
  // ((AL6:AL12)*AN41*AM41)+(T41))
  // AL6:AL12 = Non- adjusted employees per type of workstation
  // AN41 = areaperemployee = =SUM('ROM LISTE'!W45*AY7)+('ROM LISTE'!W46*AY8)+('ROM LISTE'!W47*AY9)
  // AM41 = sharePerWorkspaceType
  // T41 = Markuppeakarea
  calculateAreaExclCompensation (): number {
    const commonMeetingroom = new CommonMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants, this.space)
    const meetingRoomAreaTotal = commonMeetingroom.calculateAreaExclCompensation()
    const totalShare = this.variables.smallMeetingroomShare + this.variables.mediumMeetingroomShare + this.variables.largeMeetingroomShare
    return meetingRoomAreaTotal * this.variables.smallMeetingroomShare / totalShare
  }

  calculateNumberOfRooms(): number {
    const commonMeetingroom = new CommonMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants, this.space)
    return commonMeetingroom.calculateNumberOfRooms()
  }
}
