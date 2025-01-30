import MainSpace from '../main_space_class'
import SharedToilet from '../coworking/toilet'

export default class WorkToilet extends MainSpace {
  calculateAreaExclCompensation (): number {
    const sharedToilet = new SharedToilet(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor() - sharedToilet.calculateAreaExclCompensation()
  }

  minAreaPerPersonExcludingCorridor(): number {
    return this.areaPerFunction() / this.spaceConstants.personsPerType * (this.spaceConstants.unitsPerPerson || 1)
  }

  calculateNumberOfRooms(): number {
    if (!this.spaceConstants.shouldCalculateNumberOfRooms) {
      return 0
    }
    if (this.space.result.adjustedAreaInclCompensation === undefined || this.space.result.adjustedAreaInclCompensation <= 0 || this.areaPerRoom() <= 0) {
      return 0
    }
    if (this.space.result.adjustedAreaInclCompensation >= this.areaPerRoom()) {
      return Math.round(this.space.result.adjustedAreaInclCompensation / this.areaPerRoom())
    }
    return Math.ceil(this.space.result.adjustedAreaInclCompensation / this.areaPerRoom())
  }
}
