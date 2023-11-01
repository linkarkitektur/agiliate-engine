import MainSpace from '../main_space_class'
import WorkDockin from './dockin'
import CellOffice from '../work related area/celloffice'
import Landscape from '../work related area/landscape'
import Projectroom from '../work related area/projectroom'
import Focusroom from '../work related area/focusroom'
import Quietzone from '../work related area/quietzone'

export default class SharedLargeMeetingroom extends MainSpace {
  /**
   * Calculates the area per person for this space.
   * @returns {number}
   */
  areaPerPersonExcludingCorridor(): number {
    return this.spaceConstants.areaPerRole / this.spaceConstants.personsPerType * this.variables.largeMeetingroomShare
  }

  /**
   * Calculates the area of the meeting room.
   * @returns {number}
   */
  calculateAreaExclCompensation = (): number => {
    if (this.variables.accessToCoworking) {
      const workDockin = new WorkDockin(this.space, this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const cellOffice = new CellOffice(this.space, this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const landscape = new Landscape(this.space, this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const projectroom = new Projectroom(this.space, this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const focusroom = new Focusroom(this.space, this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const quietzone = new Quietzone(this.space, this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const addedPeakAreaSum = workDockin.calculateEmployeesPerWorkplaceTypeUnadjusted() + cellOffice.calculateEmployeesPerWorkplaceTypeUnadjusted() + landscape.calculateEmployeesPerWorkplaceTypeUnadjusted() + projectroom.calculateEmployeesPerWorkplaceTypeUnadjusted() + focusroom.calculateEmployeesPerWorkplaceTypeUnadjusted() + quietzone.calculateEmployeesPerWorkplaceTypeUnadjusted() 
      return addedPeakAreaSum * this.areaPerPersonExcludingCorridor() * this.variables.coworkingShare + this.addedPeakArea()
    }
    return 0
  }
}
