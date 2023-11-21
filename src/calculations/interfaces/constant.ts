export interface IConstant {
  /**
   * Minimum required square meters per workspace by regulation
   */
  governmentMinimumSquaremetersPerWorkSpace: number
  /**
   * Share of corridor area
   * @minimum 0
   * @maximum 1
   */
  corridorAddonShare: number
  /**
   * Share of inner walls area
   * @minimum 0
   * @maximum 1
   */
  innerwallsAddonShare: number 
}
