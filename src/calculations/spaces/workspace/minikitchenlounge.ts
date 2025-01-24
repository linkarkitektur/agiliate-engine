import MainSpace from '../main_space_class'
import CoffeeStation from './coffeestation'
import SharedLounge from '../coworking/lounge'
import CommonLounge from '../common area/lounge'

export default class MiniKitchenLounge extends MainSpace {
  areaPerPersonExcludingCorridor (): number {
    // return this.areaPerFunction() / this.spaceConstants.personsPerType
    const coffeeStation = new CoffeeStation(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    return coffeeStation.minAreaPerPersonExcludingCorridor() + this.minAreaPerPersonExcludingCorridor()
  }

  calculateAreaExclCompensation (): number {
    // @todo add compensated area which is very different
    const coffeeStation = new CoffeeStation(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const sharedLounge = new SharedLounge(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    const commonLounge = new CommonLounge(this.variables, this.config, this.customSpaceConstants, this.customConstants)
    // return this.dimensionedAttendance() * this.minAreaPerPersonExcludingCorridor() + this.addedPeakArea()
    // Sum of area for mini kitchen lounge and coffee station
    // =SUM(AB6*AN13)+(T13)-(M31)-(M42)
    // AB6 = dimensionedAttendance
    // AN13 = areaPerPersonExcludingCorridor
    // T13 = markuppeakarea
    // M31 = coworking.loungeareaexclcomp
    // M42 = common area.loungeareaexclcomp
    //
    return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor() +
      this.markupPeakArea() -
      sharedLounge.calculateAreaExclCompensation() -
      commonLounge.calculateAreaExclCompensation() -
      coffeeStation.calculateAreaExclCompensation()
  }
}
