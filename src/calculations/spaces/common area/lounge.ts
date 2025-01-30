import MainSpace from '../main_space_class'
import SharedLounge from '../coworking/lounge'

export default class CommonLounge extends MainSpace {
  sharePerWorkspaceType (): number {
    return this.variables.commonAreaProjectAndMeetingRoomsShare
  }

  calculateAreaExclCompensation (): number {
    if (!this.variables.accessToCommonAreaProjectAndMeetingRooms) {
      return 0
    }
    const sharedLounge = new SharedLounge(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    return (this.dimensionedAttendance() * this.areaPerEmployee() * this.sharePerWorkspaceType()) +
    (sharedLounge.markupPeakArea() * this.sharePerWorkspaceType())
  }

  calculateNumberOfRooms(): number {
    if (!this.variables.accessToCommonAreaProjectAndMeetingRooms) {
      return 0
    }
    if (!this.spaceConstants.shouldCalculateNumberOfRooms) {
      return 0
    }
    if (this.space.result.adjustedAreaInclCompensation === undefined) {
      return 0
    }
    if (this.space.result.adjustedAreaInclCompensation > 0) {
      return Math.round(this.space.result.adjustedAreaInclCompensation / this.areaPerRoom())
    }
    return this.spaceConstants.minimumPersons || 0
  }
}
