import MainSpace from '../main_space_class'
import SharedHwc from '../coworking/hwc'

export default class WorkHwc extends MainSpace {
  calculateAreaExclCompensation (): number {
    const sharedHwc = new SharedHwc(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor() - sharedHwc.calculateAreaExclCompensation()
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

  calculateNonAdjustedRestArea(): number {
    if (this.space.result.adjustedAreaInclCompensation === undefined || this.space.result.adjustedAreaInclCompensation <= 0 || this.space.result.numberOfRooms === undefined || this.space.result.numberOfRooms <= 0) {
      return 0
    }
    return this.space.result.adjustedAreaInclCompensation - this.areaPerRoom() * this.space.result.numberOfRooms
  }
}
