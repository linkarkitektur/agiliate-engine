import MainSpace from '../main_space_class'
import SharedWardrobe from '../coworking/wardrobe'

export default class WorkWardrobe extends MainSpace {
  calculateAreaExclCompensation (): number {
    const sharedWardrobe = new SharedWardrobe(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    return this.dimensionedAttendance() * this.areaPerEmployee() - sharedWardrobe.calculateAreaExclCompensation()
  }

  calculateNumberOfRooms(): number {
    if (!this.spaceConstants.shouldCalculateNumberOfRooms) {
      return 0
    }
    if (this.areaPerFunction() > 0) {
      return 1
    }
    return 0
  }
}
