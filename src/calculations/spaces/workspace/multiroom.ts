import MainSpace from '../main_space_class'
import WorkTouchdown from './touchdown'
import WorkDockin from './dockin'
import Landscape from './landscape'
import Focusroom from './focusroom'

export default class WorkMultiroom extends MainSpace {
  // =IF((AL6+AL7+AL9)/(15*2)*AN14>M11;SUM(((AL6+AL7+AL9)/15*2)*AN14)-(M11);SUM((AL6+AL7+AL9)/15*2)*AN14)
  calculateAreaExclCompensation (): number {
    const workDockin = new WorkDockin(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const landscape = new Landscape(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const workTouchdown = new WorkTouchdown(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const focusroom = new Focusroom(this.variables, this.config, this.customSpaceConstants, this.customConstants)

    const touchdownDockinLandscapeSum = workTouchdown.calculateEmployeesPerWorkplaceTypeUnadjusted() + workDockin.calculateEmployeesPerWorkplaceTypeUnadjusted() + landscape.calculateEmployeesPerWorkplaceTypeUnadjusted()

    if (touchdownDockinLandscapeSum / 15 * 2 * this.minAreaPerPersonExcludingCorridor() > focusroom.calculateAreaExclCompensation()) {
      return touchdownDockinLandscapeSum / 15 * 2 * this.minAreaPerPersonExcludingCorridor() - focusroom.calculateAreaExclCompensation()
    }
    return touchdownDockinLandscapeSum / 15 * 2 * this.minAreaPerPersonExcludingCorridor()
  }

  calculateNumberOfRooms(): number {
    // =IF(D13>0;ROUND(MAX(D13/I13;'ROM LISTE'!R11;0);0);0)
    if (!this.spaceConstants.shouldCalculateNumberOfRooms) {
      return 0
    }
    if (this.space.result.adjustedAreaInclCompensation === undefined) {
      return 0
    }
    // console.log(this.space.result.adjustedAreaInclCompensation)
    // D13 = adjustedareainclcompensation
    // I13 = areaperroom
    // R11 = minpersonsperunit = minimumPersons
    //
    if (this.space.result.adjustedAreaInclCompensation > 0) {
      return Math.round(this.space.result.adjustedAreaInclCompensation / this.areaPerRoom())
    }
    return this.spaceConstants.minimumPersons || 0
  }

  calculateNonAdjustedRestArea(): number {
    if (this.space.result.adjustedAreaInclCompensation === undefined || this.space.result.adjustedAreaInclCompensation <= 0 || this.space.result.numberOfRooms === undefined || this.space.result.numberOfRooms <= 0) {
      return 0
    }
    return this.space.result.adjustedAreaInclCompensation - this.areaPerRoom() * this.space.result.numberOfRooms
  }
}
