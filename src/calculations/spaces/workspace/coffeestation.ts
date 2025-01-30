import MainSpace from '../main_space_class'

export default class CoffeeStation extends MainSpace {
  minAreaPerPersonExcludingCorridor(): number {
    return this.areaPerFunction() / this.spaceConstants.personsPerType * (this.spaceConstants.unitsPerPerson || 1)
  }

  calculateAreaExclCompensation (): number {
    // return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor() + this.addedPeakArea()
   return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor()
  }

  calculateNumberOfRooms(): number {
    if (!this.spaceConstants.shouldCalculateNumberOfRooms) {
      return 0
    }
    if (this.space.result.adjustedAreaInclCompensation === undefined || this.space.result.adjustedAreaInclCompensation <= 0) {
      return 0
    }
    if (this.space.result.adjustedAreaInclCompensation >= this.areaPerRoom()) {
      return Math.round(this.space.result.adjustedAreaInclCompensation / this.areaPerRoom())
    }
    return Math.ceil(this.space.result.adjustedAreaInclCompensation / this.areaPerRoom())
  }
}
