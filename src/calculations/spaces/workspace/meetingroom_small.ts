import MainSpace from '../main_space_class'
import WorkMeetingroom from './meetingroom'

export default class WorkSmallMeetingroom extends MainSpace {
  calculateAreaExclCompensation (): number {
    const workMeetingroom = new WorkMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants, this.space)
    return this.variables.smallMeetingroomShare * workMeetingroom.calculateAreaExclCompensation()
  }

  calculateNotAdjustedAddonPart (totalWorkplaceArea: number, totalCompensationArea: number): number {
    if (this.spaceConstants.shouldCalculateCompensation && totalWorkplaceArea < this.governmentRequiredArea()) {
      const workMeetingroom = new WorkMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants, this.space)
      return workMeetingroom.calculateNotAdjustedAddonPart(totalWorkplaceArea, totalCompensationArea)
    }
    return 0
  }

  calculateNumberOfRooms(): number {
    const workMeetingroom = new WorkMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants, this.space)
    return workMeetingroom.calculateNumberOfRooms()
  }
}
