import MainSpace from '../main_space_class'

export default class SharedTouchdown extends MainSpace {
  sharePerWorkspaceType (): number {
    // return Math.round(this.variables.touchdownShare * this.variables.coworkingShare * 100) / 100
    return this.variables.touchdownShare * this.variables.coworkingShare
  }

  calculateEmployeesPerWorkplaceTypeAdjusted(): number {
    return this.markupEmployeesAtPeak() + (this.nonAdjustedWorkstationCapacity() * this.sharePerWorkspaceType())
  }

  /**
   * Calculates the area of shared touchdown. 0 if there is no desire.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCoworking && this.variables.addPeakMarkupToWorkstationCapacityShare) {
      // =IF(AND(AS24="J"; AT24="J"); SUM(AI24*AN24); IF(AS24="J"; SUM(AL24*AN24); 0))
      // AN24 = areaPerEmployee =
      // AI24 = adjustedEmployeesPerTypeOfWorkstation
      // AL24 = nonAdjustedEmployeesPerTypeOfWorkstation
      // AS24 = accessToCoworking
      // AT24 = addPeakMarkupToWorkstationCapacityShare
      // return this.personsPerType() * this.minAreaPerPersonExcludingCorridor() + this.addedPeakArea()
      return this.calculateEmployeesPerWorkplaceTypeAdjusted() * this.areaPerEmployee()
    }
    if (this.variables.accessToCoworking) {
      // return this.personsPerType() * this.minAreaPerPersonExcludingConsole.log(this.calculateEmployeesPerWorkplaceTypeUnadjusted(), this.areaPerEmployee())
      return this.calculateEmployeesPerWorkplaceTypeUnadjusted() * this.areaPerEmployee()
    }
    return 0
  }
}
