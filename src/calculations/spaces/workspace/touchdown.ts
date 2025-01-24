import MainSpace from '../main_space_class'
import SharedTouchdown from '../coworking/touchdown'

export default class WorkTouchdown extends MainSpace {
  sharePerWorkspaceType (): number {
    // We need the shared touchdown share for the calculation of the work touchdown share
    const sharedTouchdown = new SharedTouchdown(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    return this.variables.touchdownShare - sharedTouchdown.sharePerWorkspaceType()
  }

  calculateEmployeesPerWorkplaceTypeAdjusted(): number {
    return this.markupEmployeesAtPeak() + (this.nonAdjustedWorkstationCapacity() * this.sharePerWorkspaceType())
    // return this.markupEmployeesAtPeak() + (this.space.result.adjustmentForMissingSquareMeters || 0)
  }

  /**
   * Calculates the area of touchdown. 0 if there is no need.
   * @todo Implmenent if addPeakMarkupToWorkstationCapacityShare
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.addPeakMarkupToWorkstationCapacityShare) {
      // AI6*AN6
      // AI6 = adjustedemployeespertype = AJ6+AK6
      // AJ6 = Markup employees per type of workstation at peak = AG6 * AM6
      // AM6 = Share per type of workstation (%) = Touchdown share (TD) for Main engine sheet - Share per type of workstation (%)
      // AK6 = Some kind of adjustment if missing sqm = IF (AK68!=0 AND AL6 == MAX(AL6:AL66)) THEN (AC6*AM6)+AK68 ELSE AC6*AM6
      // AG6 = Divergence Peak/ Workstation capacity (No.) = AE6-AC6
      // AE6 = Peak employees (No.) = V6*Y6
      // V6 = Number of employees (No.) = Tenant profile sheet!V5
      // Y6 = Peak capacity share (%) = Tenant profile sheet!V10
      // return (this.space.result.employeesPerWorkplaceTypeAdjusted || 0) * this.areaPerEmployee()
      return this.calculateEmployeesPerWorkplaceTypeAdjusted() * this.areaPerEmployee()
    }
    // AL6*AN6
    // AL6 = Non- adjusted employees per type of workstation (No.) = AC6*AM6
    // AN6 = Area per employee = IF (useCompensationFactorForWorkstations) THEN #minAreaPerPersonExcludingCorridor ELSE areaPerPersonWithoutCompensationFactor
    // AC6 = nonAdjustedWorkstationCapacity
    return this.nonAdjustedWorkstationCapacity() * this.sharePerWorkspaceType() * this.areaPerEmployee()
    // return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor() * this.sharePerWorkspaceType() + this.addedPeakArea()
  }
}
