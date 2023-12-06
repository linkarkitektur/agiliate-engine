import MainSpace from '../main_space_class'

export default class CommonExerciseRoom extends MainSpace {
  /**
   * Area per person excluding corridor
   */
  areaPerPersonExcludingCorridor (): number {
    return this.spaceConstants.areaPerRole / this.spaceConstants.personsPerType * this.spaceConstants.unitsPerPerson!
  }

  /**
   * Calculates the area of the work toilet
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    if (this.variables.accessToExercise) {
      return this.dimensionedAttendance() * this.areaPerPersonExcludingCorridor()
    }
    return 0
  }
}
