import { ISpace } from '../interfaces/space'
import { IConfig } from '../interfaces/config'
import { ISpaceConstant } from '../interfaces/space_constant'
import { ISpaceCalculation } from '../interfaces/space_calculation'
import { IConstant } from '../interfaces/constant'
import { IVariable } from '../interfaces/variable'

type TCustomSpaceConstants = {[key:string]:ISpaceConstant}

/**
 * This is the main class for the spaces. It contains shared methods for all spaces.
 */
export default class MainSpace implements ISpaceCalculation {
  name: string
  constants: IConstant
  customConstants?: IConstant
  space: ISpace
  spaceConstants: ISpaceConstant
  variables: IVariable
  customSpaceConstants?: TCustomSpaceConstants
  config: IConfig

  /**
   * Constructor for the main space class.
   * @param {Ispace} space - The space to calculate
   * @param {IVariable} variables - The variables to use
   * @param {IConfig} config - The config to use
   * @param {TCustomSpaceConstants} [customSpaceConstants] - Custom space constants, optional
   * @param {IConstant} [customConstants] - Custom constants, optional
   */
  constructor(space: ISpace, variables: IVariable, config: IConfig, customSpaceConstants?: TCustomSpaceConstants, customConstants?: IConstant) {
    this.name = space.name
    this.space = space
    this.spaceConstants = space.constants
    this.variables = variables
    this.config = config
    this.customSpaceConstants = customSpaceConstants
    // Merge custom constants with the default constants
    this.constants = {
      ...config.constants,
      ...customConstants
    }
    // Merge custom space constants with the default space constants
    for (const spaceName in this.customSpaceConstants) {
      if (this.name === spaceName) {
        this.spaceConstants = {
          ...space.constants,
          ...this.customSpaceConstants[spaceName]
        }
      }
    }
  }

  /**
   * Calculates the area per person for this space.
   * @returns {number}
   */
  areaPerPersonExcludingCorridor(): number {
    return this.spaceConstants.areaPerRole / this.spaceConstants.personsPerType
  }

  /**
   * Peak attendance is the number of employees times the peak concurrency attendance share.
   * @returns {number}
   */
  #peakAttendance (): number {
    return this.variables.numberOfEmployees * this.variables.peakConcurrencyAttendanceShare
  }
  
  /**
   * This method calculates the added peak area for this space.
   * @returns {number}
   */
  addedPeakArea (): number {
    return this.#diffPeak() * this.areaPerPersonExcludingCorridor()
  }

  /**
   * This method gets number of person per workspace type
   * @returns {number}
   */
  personsPerType (): number {
    return this.dimensionedAttendance() * this.sharePerWorkspaceType()
  }

  /**
   * This method gets number of person per workspace type, adjusted
   * @todo Missing implementation
   * @returns {number}
   */
  personsPerTypeAdjusted (): number {
    return 0
  }

  /**
   * This method computes the share of this workspace type.
   * @returns {number}
   */
  sharePerWorkspaceType (): number {
    return 0
  }
  
  /**
   * This method calculates the dimensioned attendance for this space.
   * @todo Write detailed description of this method
   * @returns {number}
   */
  dimensionedAttendance (): number {
    return (this.variables.numberOfEmployees * this.variables.concurrencyAttendanceShare) +
      (this.variables.numberOfEmployees * this.variables.concurrencyAttendanceShare * this.variables.overCapacityShare) -
      (this.variables.numberOfEmployees * this.variables.homeOfficeAverageShare)
  }
  
  /**
   * This method calculates the difference between peak attendance and dimensioned attendance.
   * @returns {number}
   */
  #diffPeak (): number {
    return this.#peakAttendance() - this.dimensionedAttendance()
  }

  /**
   * This method calculates the government required area for this space.
   * @returns {number}
   */
  #governmentRequiredArea (): number {
    return this.dimensionedAttendance() * this.constants.governmentMinimumSquaremetersPerWorkSpace
  }

  /**
   * Calculate remainder area for space.
   * @returns {number}
   */
  #remainderArea (): number {
    if (this.spaceConstants.seatPersonRoom === 'seat') {
      return this.space.result.adjustedAreaInclCompensation! - (this.#areaPerSeatUnAdjusted() * this.calculateNumberOfSeats())
    } else if (this.spaceConstants.seatPersonRoom === 'room') {
      return this.space.result.adjustedAreaInclCompensation! - (this.spaceConstants.minimumSquareMeters! * this.calculateNumberOfRooms())
    }
    return 0
  }

  #areaPerSeatUnAdjusted (): number {
    if (this.space.result.adjustedAreaInclCompensation! > 0 && this.calculateNumberOfSeats() > 0) {
      return Math.round(this.space.result.adjustedAreaInclCompensation! / this.calculateNumberOfSeats() * 10) / 10
    }
    return 0
  }

  /**
   * Calculates number of rooms
   * @returns {number}
   */
  calculateNumberOfRooms (): number {
    if (this.spaceConstants.shouldCalculateNumberOfRooms) {
      return Math.ceil(this.space.result.adjustedAreaInclCompensation! / this.spaceConstants.minimumSquareMeters!)
    }
    return 0
  }

  /**
   * Calculates number of seats.
   * @returns {number}
   */
  calculateNumberOfSeats (): number {
    if (this.spaceConstants.shouldCalculateNumberOfSeats) {
      return Math.round((this.space.result.employeesPerWorkplaceTypeAdjusted || 0) + this.#employeesPerSeatTypeInPeak())
    }
    return 0
  }

  /**
   * Calculates employees per seat type in peak as integer
   * @returns {number}
   */
  #employeesPerSeatTypeInPeak (): number {
    return Math.round(this.#diffPeak() * this.sharePerWorkspaceType())
  }

  /**
   * Calculates un-adjusted add on part.
   * @param {number} totalWorkplaceArea - The total area of all workspaces already calculated
   * @param {number} totalCompensationArea - The total area of all spaces requiring compensation
   * @returns {number}
   */
  calculateNotAdjustedAddonPart (totalWorkplaceArea: number, totalCompensationArea: number): number {
    if (this.spaceConstants.shouldCalculateCompensation && totalWorkplaceArea < this.#governmentRequiredArea()) {
      return (this.#governmentRequiredArea() / totalWorkplaceArea) * (this.space.result.areaExclCompensation! / totalCompensationArea)
    }
    return 0
  }

  /**
   * Calculates un-adjusted add on area.
   * @param {number} totalWorkplaceArea - The total area of all workspaces already calculated
   * @param {number} totalCompensationArea - The total area of all spaces requiring compensation
   * @returns {number}
   */
  calculateNotAdjustedAddonArea (totalWorkplaceArea: number, totalCompensationArea: number): number {
    if (this.spaceConstants.shouldCalculateCompensation && totalWorkplaceArea < this.#governmentRequiredArea()) {
      return this.calculateNotAdjustedAddonPart(totalWorkplaceArea, totalCompensationArea) * this.space.result.areaExclCompensation!
    }
    return 0
  }

  /**
   * Calculates the difference between the government required area and the total workplace area.
   * @param {number} totalWorkplaceArea - The total area of all workspaces already calculated
   * @returns {number}
   */
  #differenceGovernnmentRequiredAreaWorkplaceArea (totalWorkplaceArea: number): number {
    return this.#governmentRequiredArea() - totalWorkplaceArea
  }

  /**
   * Calculates employees per workplace type, unadjusted.
   * @returns {number}
   */
  calculateEmployeesPerWorkplaceTypeUnadjusted (): number {
    return Math.round(this.dimensionedAttendance() * this.sharePerWorkspaceType())
  }

  /**
   * Calculates employees per workplace type, adjusted
   * @param {number} totalEmployeesPerWorkplaceTypeUnadjusted - The total number of employees per workplace type, unadjusted
   */
  calculateEmployeesPerWorkplaceTypeAdjusted (totalEmployeesPerWorkplaceTypeUnadjusted: number, allEmployeesPerWorkplaceTypeUnadjusted: number[]): number {
    if (totalEmployeesPerWorkplaceTypeUnadjusted > this.dimensionedAttendance() && this.calculateEmployeesPerWorkplaceTypeUnadjusted() === Math.max(...allEmployeesPerWorkplaceTypeUnadjusted)) {
      return this.calculateEmployeesPerWorkplaceTypeUnadjusted() - (totalEmployeesPerWorkplaceTypeUnadjusted - this.dimensionedAttendance())
    } else if (totalEmployeesPerWorkplaceTypeUnadjusted < this.dimensionedAttendance() && this.calculateEmployeesPerWorkplaceTypeUnadjusted() === Math.max(...allEmployeesPerWorkplaceTypeUnadjusted)) {
      return this.calculateEmployeesPerWorkplaceTypeUnadjusted() + (this.dimensionedAttendance() - totalEmployeesPerWorkplaceTypeUnadjusted)
    } else {
      return this.calculateEmployeesPerWorkplaceTypeUnadjusted()
    }
  }

  /**
   * Calculates adjusted add on area.
   * @param {number} totalWorkplaceArea - The total area of all workspaces already calculated
   * @param {number} totalCompensationArea - The total area of all spaces requiring compensation
   * @param {number} totalUnadjustedArea - The total unadjusted area
   * @returns {number}
   */
  calculateAdjustedAddonArea (totalWorkplaceArea: number, totalCompensationArea: number, totalUnadjustedArea: number): number {
    if (this.spaceConstants.shouldCalculateCompensation && totalWorkplaceArea < this.#governmentRequiredArea()) {
      return this.calculateNotAdjustedAddonArea(totalWorkplaceArea, totalCompensationArea) / totalUnadjustedArea * this.#differenceGovernnmentRequiredAreaWorkplaceArea(totalWorkplaceArea)
    }
    return 0
  }

  /**
   * Default is returning the areaInclCompensation but is overridden in some spaces.
   * @param {number} totalWorkplaceArea - The total area of all workspaces already calculated
   * @param {number} totalCompensationArea - The total area of all spaces requiring compensation
   * @param {number} totalUnadjustedArea - The total unadjusted area
   * @returns {number}
   */
  calculateAdjustedAreaInclCompensation(totalWorkplaceArea: number, totalCompensationArea: number, totalUnadjustedArea: number): number {
    if (this.spaceConstants.shouldCalculateCompensation) {
      return this.calculateAdjustedAddonArea(totalWorkplaceArea, totalCompensationArea, totalUnadjustedArea) + this.space.result.areaExclCompensation!
    }
    return this.space.result.areaExclCompensation!
  }

  /**
   * Calculates the adjusted area including adjustment and compensation.
   */
  calculateAdjustedAreaInclCompensationWithAdjustmentAndCompensation (): number {
    return this.space.result.adjustedAreaInclCompensation! - this.#remainderArea()
  }

  /**
   * Calculates the area excluding compensation. Not implemented in this class.
   * @returns {number}
   */
  calculateAreaExclCompensation (): number {
    return 0
  }
}
