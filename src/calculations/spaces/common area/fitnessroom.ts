import MainSpace from '../main_space_class'

export default class CommonFitnessRoom extends MainSpace {
  minAreaPerPersonExcludingCorridor(): number {
    // O62/P62)*Q62
    return this.areaPerFunction() / this.spaceConstants.personsPerType * (this.spaceConstants.unitsPerPerson || 1)
  }

  calculateAreaExclCompensation (): number {
    return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor()
  }
}
