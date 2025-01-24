import MainSpace from '../main_space_class'
import SharedHwc from '../coworking/hwc'

export default class WorkHwc extends MainSpace {
  calculateAreaExclCompensation (): number {
    const sharedHwc = new SharedHwc(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor() - sharedHwc.calculateAreaExclCompensation()
  }

  minAreaPerPersonExcludingCorridor(): number {
    return this.areaPerFunction() / this.spaceConstants.personsPerType * (this.spaceConstants.unitsPerPerson || 1)
  }
}
