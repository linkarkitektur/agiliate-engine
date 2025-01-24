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
}
