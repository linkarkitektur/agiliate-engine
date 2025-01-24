import MainSpace from '../main_space_class'

export default class CoffeeStation extends MainSpace {
  minAreaPerPersonExcludingCorridor(): number {
    return this.areaPerFunction() / this.spaceConstants.personsPerType * (this.spaceConstants.unitsPerPerson || 1)
  }

  calculateAreaExclCompensation (): number {
    // return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor() + this.addedPeakArea()
   return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor()
  }
}
