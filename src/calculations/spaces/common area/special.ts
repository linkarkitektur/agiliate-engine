import MainSpace from '../main_space_class'

export default class CommonSpecial extends MainSpace {
  /**
   * Calculates the area of the special rooms.
   * @returns {number}
   */
  calculateAreaExclCompensation = (): number => {
    return this.variables.specialAreaCommon
  }
}
