import MainSpace from '../main_space_class'
import WorkMeetingroom from './meetingroom'

export default class WorkLargeMeetingroom extends MainSpace {
  /**
   * Calculates the area per person for this space.
   * @todo Bliver de her brugt?
   * @returns {number}
   */
  areaPerPersonExcludingCorridor(): number {
    return this.areaPerFunction() / this.spaceConstants.personsPerType * this.variables.largeMeetingroomShare
  }

  calculateAreaExclCompensation (): number {
    const workMeetingroom = new WorkMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants, this.space)
    return this.variables.largeMeetingroomShare * workMeetingroom.calculateAreaExclCompensation()
  }
}
