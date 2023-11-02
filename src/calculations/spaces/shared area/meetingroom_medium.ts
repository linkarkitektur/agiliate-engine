import MainSpace from '../main_space_class'
import WorkDockin from './dockin'
import CellOffice from '../work related area/celloffice'
import Landscape from '../work related area/landscape'
import Projectroom from '../work related area/projectroom'
import Focusroom from '../work related area/focusroom'
import Quietzone from '../work related area/quietzone'
import SharedSmallMeetingroom from './meetingroom_small'
import SharedLargeMeetingroom from './meetingroom_large'

export default class SharedMediumMeetingroom extends MainSpace {
  /**
   * Calculates the area per person for this space.
   * @returns {number}
   */
  areaPerPersonExcludingCorridor(): number {
    return this.spaceConstants.areaPerRole / this.spaceConstants.personsPerType * this.variables.mediumMeetingroomShare
  }

  /**
   * Calculates the area of the meeting room.
   * @returns {number}
   */
  calculateAreaExclCompensation = (): number => {
    if (this.variables.accessToCoworking) {
      const workDockin = new WorkDockin(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const cellOffice = new CellOffice(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const landscape = new Landscape(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const projectroom = new Projectroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const focusroom = new Focusroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const quietzone = new Quietzone(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const addedPeakAreaSum = workDockin.calculateEmployeesPerWorkplaceTypeUnadjusted() + cellOffice.calculateEmployeesPerWorkplaceTypeUnadjusted() + landscape.calculateEmployeesPerWorkplaceTypeUnadjusted() + projectroom.calculateEmployeesPerWorkplaceTypeUnadjusted() + focusroom.calculateEmployeesPerWorkplaceTypeUnadjusted() + quietzone.calculateEmployeesPerWorkplaceTypeUnadjusted() 
      const sharedSmallMeetingroom = new SharedSmallMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const sharedLargeMeetingroom = new SharedLargeMeetingroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const areaPerPersonExcludingCorridorSum = sharedSmallMeetingroom.areaPerPersonExcludingCorridor() + sharedLargeMeetingroom.areaPerPersonExcludingCorridor() + this.areaPerPersonExcludingCorridor()
      return this.variables.mediumMeetingroomShare * addedPeakAreaSum * areaPerPersonExcludingCorridorSum * this.variables.coworkingShare + this.addedPeakArea()
    }
    return 0
  }
}
