export interface IConstant {
  /**
   * Minimum required square meters per workspace by regulation
   */
  governmentMinimumSquaremetersPerWorkSpace: number
  /**
   * Share of corridor area
   * @minimum 0
   * @maximum 1
   * @deprecated
   */
  corridorAddonShare: number
  /**
   * Share of inner walls area
   * @minimum 0
   * @maximum 1
   */
  innerwallsAddonShare: number
  /**
   * Usage ratio common area
   * @minimum 0
   * @maximum 1
   */
  usageRatioCommonArea: number
  /**
   * Seatings ratio common area
   * @minimum 0
   * @maximum ?
   */
  seatingRatioCommonArea: number
  /**
   * Share of workspace walkway
   * @minimum 0
   * @maximum 1
   */
  walkwayShareWorkspace: number
  /**
   * Share of coworking walkway
   * @minimum 0
   * @maximum 1
   */
  walkwayShareCoworking: number
  /**
   * Share of common area walkway
   * @minimum 0
   * @maximum 1
   */
  walkwayShareCommonArea: number
  /**
   * Share of communication area
   * @minimum 0
   * @maximum 1
   */
  communicationAreaShare: number
  /**
   * Share of technical area
   * @minimum 0
   * @maximum 1
   */
  technicalAreaShare: number
}
