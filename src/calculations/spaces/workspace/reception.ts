import MainSpace from '../main_space_class'
import SharedReception from '../coworking/reception' // TODO: Remmon area/reception'

export default class WorkReception extends MainSpace {
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToTenantReception) {
      const sharedReception = new SharedReception(this.variables, this.config, this.customSpaceConstants, this.customConstants)
      return this.dimensionedAttendance() * + this.areaPerEmployee() - sharedReception.calculateAreaExclCompensation()
    }
    return 0
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
    // =SUM(D18)-(I18*N18)
    if (this.space.result.adjustedAreaInclCompensation === undefined || this.space.result.adjustedAreaInclCompensation <= 0 || this.space.result.numberOfRooms === undefined || this.space.result.numberOfRooms <= 0) {
      return 0
    }
    return this.space.result.adjustedAreaInclCompensation - this.areaPerRoom() * this.space.result.numberOfRooms
  }
}
