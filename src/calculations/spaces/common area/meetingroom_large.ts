import MainSpace from '../main_space_class'
import CommonMeetingroom from './meetingroom'

export default class CommonLargeMeetingroom extends MainSpace {
  sharePerWorkspaceType (): number {
    if (this.variables.accessToCommonAreaProjectAndMeetingRooms) {
      return this.variables.accessToCommonAreaProjectAndMeetingRoomsShare
    }
    return 0
  }
  calculateAreaExclCompensation (): number {
    const commonMeetingroom = new CommonMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants, this.space)
    const meetingRoomAreaTotal = commonMeetingroom.calculateAreaExclCompensation()
    const totalShare = this.variables.smallMeetingroomShare + this.variables.mediumMeetingroomShare + this.variables.largeMeetingroomShare
    return meetingRoomAreaTotal * this.variables.largeMeetingroomShare / totalShare
  }
}
