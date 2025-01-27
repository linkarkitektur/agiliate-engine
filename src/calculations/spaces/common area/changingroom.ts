import MainSpace from '../main_space_class'

export default class CommonChangingRoom extends MainSpace {
  calculateAreaExclCompensation(): number {
    return this.dimensionedAttendance() * this.areaPerEmployee()
  }
}
