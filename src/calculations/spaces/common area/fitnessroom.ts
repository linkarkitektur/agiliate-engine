import MainSpace from '../main_space_class'

export default class CommonFitnessRoom extends MainSpace {
  minAreaPerPersonExcludingCorridor(): number {
    // O62/P62)*Q62
    return this.areaPerFunction() / this.spaceConstants.personsPerType * (this.spaceConstants.unitsPerPerson || 1)
  }

  calculateAreaExclCompensation (): number {
    return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor()
  }

  calculateNumberOfRooms(): number {
    if (!this.spaceConstants.shouldCalculateNumberOfRooms) {
      return 0
    }
    if (this.space.result.adjustedAreaInclCompensation === undefined || this.space.result.adjustedAreaInclCompensation <= 0) {
      return this.spaceConstants.minimumPersons || 0
    }
    return Math.round(this.space.result.adjustedAreaInclCompensation / this.areaPerRoom())
  }
}
