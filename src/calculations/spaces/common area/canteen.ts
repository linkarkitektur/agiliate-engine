import MainSpace from '../main_space_class'

export default class Canteen extends MainSpace {
  /**
   * Calculates the area of the canteen. 0 if there is no canteen.
   * @returns 
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCanteen) {
      return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor() + this.addedPeakArea()
    }
    return 0
  }
}
