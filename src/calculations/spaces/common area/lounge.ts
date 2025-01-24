import MainSpace from '../main_space_class'
import SharedLounge from '../coworking/lounge'

export default class CommonLounge extends MainSpace {
  sharePerWorkspaceType (): number {
    return this.variables.accessToCommonAreaProjectAndMeetingRoomsShare
  }

  calculateAreaExclCompensation (): number {
    const sharedLounge = new SharedLounge(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    // if (this.variables.accessToCoworking && accessToCommonAreaProjectAndMeetingRooms) {
    if (this.variables.accessToCommonAreaProjectAndMeetingRooms) {
      return (this.dimensionedAttendance() * this.areaPerEmployee() * this.sharePerWorkspaceType()) +
      (sharedLounge.markupPeakArea() * this.sharePerWorkspaceType())
    }
    return 0
  }
}
