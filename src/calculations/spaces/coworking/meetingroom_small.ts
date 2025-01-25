import MainSpace from '../main_space_class'
import SharedMeetingroom from './meetingroom'

export default class SharedSmallMeetingroom extends MainSpace {
  /**
   * Calculates the area per person for this space.
   * @returns {number}
   */
  areaPerPersonExcludingCorridor(): number {
    return this.areaPerFunction() / this.spaceConstants.personsPerType * this.variables.smallMeetingroomShare
  }

  calculateAreaExclCompensation (): number {
    const sharedMeetingroom = new SharedMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants, this.space)
    return this.variables.smallMeetingroomShare * sharedMeetingroom.calculateAreaExclCompensation()
  }
}
