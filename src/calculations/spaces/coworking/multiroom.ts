import MainSpace from '../main_space_class'
import WorkDockin from '../workspace/dockin'
import CellOffice from '../workspace/celloffice'
import Landscape from '../workspace/landscape'
import Projectroom from '../workspace/projectroom'
import Focusroom from '../workspace/focusroom'
import Quietzone from '../workspace/quietzone'

export default class SharedMultiroom extends MainSpace {
  /**
   * Calculates the area of shared multiroom.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCoworking) {
      //=SUM((AP4:AP10)*AR26*AQ26)+(AB26)
      const workDockin = new WorkDockin(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const cellOffice = new CellOffice(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const landscape = new Landscape(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const projectroom = new Projectroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const focusroom = new Focusroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const quietzone = new Quietzone(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      const addedPeakAreaSum = workDockin.calculateEmployeesPerWorkplaceTypeUnadjusted() + cellOffice.calculateEmployeesPerWorkplaceTypeUnadjusted() + landscape.calculateEmployeesPerWorkplaceTypeUnadjusted() + projectroom.calculateEmployeesPerWorkplaceTypeUnadjusted() + focusroom.calculateEmployeesPerWorkplaceTypeUnadjusted() + quietzone.calculateEmployeesPerWorkplaceTypeUnadjusted()
      return addedPeakAreaSum * this.minAreaPerPersonExcludingCorridor() * this.sharePerWorkspaceType() + this.addedPeakArea()
    }
    return 0
  }
}
