import MainSpace from '../main_space_class'

export default class CommonProjectroom extends MainSpace {
  sharePerWorkspaceType (): number {
    if (this.variables.accessToCommonAreaProjectAndMeetingRooms) {
      return this.variables.projectroomShare * this.variables.accessToCommonAreaProjectAndMeetingRoomsShare
    }
    return 0
  }
}
