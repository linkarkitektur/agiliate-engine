import MainSpace from '../main_space_class'

export default class CoffeeStation extends MainSpace {
  /**
   * Calculates the area of the coffee station.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor() + this.addedPeakArea()
  }

  minAreaPerPersonExcludingCorridor(): number {
    return this.areaPerFunction() / this.spaceConstants.personsPerType * this.spaceConstants.unitsPerPerson!
  }
}
