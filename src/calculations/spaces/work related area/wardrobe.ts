import MainSpace from '../main_space_class'
import SharedWardrobe from '../shared area/wardrobe'

export default class WorkWardrobe extends MainSpace {
  /**
   * Calculates the area of the personal storage
   * @returns {number}
   */
  calculateAreaExclCompensation = (): number => {
    const sharedWardrobe = new SharedWardrobe(this.space, this.variables, this.config, this.customSpaceConstants, this.customConstants)
    return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor() - sharedWardrobe.calculateAreaExclCompensation()
  }
}
