import MainSpace from '../main_space_class'
import SharedToilet from '../coworking/toilet'

export default class WorkToilet extends MainSpace {
  calculateAreaExclCompensation (): number {
    const sharedToilet = new SharedToilet(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor() - sharedToilet.calculateAreaExclCompensation()
  }

  minAreaPerPersonExcludingCorridor(): number {
    return this.areaPerFunction() / this.spaceConstants.personsPerType * (this.spaceConstants.unitsPerPerson || 1)
  }
}
