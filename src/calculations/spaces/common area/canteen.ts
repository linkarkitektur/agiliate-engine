import MainSpace from '../main_space_class'

export default class Canteen extends MainSpace {
  areaPerEmployee(): number {
    return this.minAreaPerPersonExcludingCorridor() * this.constants.seatingRatioCommonArea
  }

  /**
   * Calculates the area of the canteen. 0 if there is no canteen.
   * @returns
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCanteen) {
      // =IF(AS43="J";SUM(AB6*AN43)+(T43);"0")
      return this.dimensionedAttendance() * this.areaPerEmployee() + this.markupPeakArea()
    }
    return 0
  }
}
