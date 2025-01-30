import MainSpace from '../main_space_class'

export default class Kitchen extends MainSpace {
  /**
   * Calculates the area of the kitchen based on the number of employees and the area per role. It is 0 if there is no canteen.
   * @returns {number} The area of the kitchen
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToCanteen) {
      return this.dimensionedAttendance() * this.areaPerEmployee()
    }
    return 0
  }

  calculateNumberOfRooms(): number {
    if (!this.variables.accessToCanteen) {
      return 0
    }
    if (!this.spaceConstants.shouldCalculateNumberOfRooms) {
      return 0
    }
    if (this.areaPerFunction() > 0) {
      return 1
    }
    return 0
  }
}
