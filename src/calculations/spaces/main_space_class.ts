import type { ISpace } from '../interfaces/space'
import type { IConfig } from '../interfaces/config'
import type { ISpaceConstant } from '../interfaces/space_constant'
import type { ISpaceCalculation } from '../interfaces/space_calculation'
import type { IConstant } from '../interfaces/constant'
import type { IVariable } from '../interfaces/variable'
import { findSpace } from '../helpers'
import type { TCustomSpaceConstants } from '../types/custom_space_constant'
import { main } from 'bun'

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
   * @param {Ispace|string} space - The space to calculate
   * @param {IVariable} variables - The variables to use
   * @param {IConfig} config - The config to use
   * @param {TCustomSpaceConstants} [customSpaceConstants] - Custom space constants, optional
   * @param {IConstant} [customConstants] - Custom constants, optional
   */
  constructor(variables: IVariable, config: IConfig, customSpaceConstants?: TCustomSpaceConstants, customConstants?: IConstant, setSpace?: ISpace) {
    let space = setSpace
    if (!space) {
      space = findSpace(this.constructor.name, config.spaces)!
    }
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
   * Calculates the minimum area per person excluding corridor
   * @returns {number}
   */
  minAreaPerPersonExcludingCorridor(): number {
    return this.areaPerFunction() / this.spaceConstants.personsPerType
  }

  /**
   * Area per employee
   * AN6 in Main engine sheet
   * @returns {number}
   */
  areaPerEmployee(): number {
    return this.variables.useCompensationFactorForWorkstations ? this.minAreaPerPersonExcludingCorridor() : this.areaPerPersonWithoutCompensationFactor()
  }

  /**
   * Calculates the area per person not using compensation factor
   * @returns {number}
   */
  areaPerPersonWithoutCompensationFactor(): number {
    if (this.minAreaPerPersonExcludingCorridor() < this.constants.governmentMinimumSquaremetersPerWorkSpace) {
      return this.constants.governmentMinimumSquaremetersPerWorkSpace
    }
    return this.minAreaPerPersonExcludingCorridor()
  }

  /**
   * Calculates the area per function for the space.
   */
  areaPerFunction(): number {
    if (this.spaceConstants.areaPerFunction !== undefined) {
      return this.spaceConstants.areaPerFunction
    }
    const baseArea = (this.spaceConstants.lengthWidth || 0) * ((this.spaceConstants.lengthDepth || 0) + (this.spaceConstants.lengthBack || 0))
    return baseArea * (1 + (this.spaceConstants.markupInternalSpaceShare || 0))
  }

  /**
   * The minimum square meters required for this space
   */
  minimumSquareMeters(): number {
    if (this.spaceConstants.minimumSquareMeters !== undefined) {
      return this.spaceConstants.minimumSquareMeters
    }
    if (this.spaceConstants.minimumPersons !== undefined) {
      return this.spaceConstants.minimumPersons * this.areaPerFunction()
    }
    return 0
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
    return this.diffPeak() * this.minAreaPerPersonExcludingCorridor()
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
   * Implemented as AI6 in Excel: Adjusted employees per type of workstation
   * AI6 = AJ6 + AK6 where:
   * AJ6 = Markup employees per type at peak
   * AK6 = Adjustment if missing sqm
   * @returns {number}
   */
  personsPerTypeAdjusted (): number {
    // return this.markupEmployeesAtPeak() + this.adjustmentForMissingSquareMeters()
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
   * @is_in_new_excel
   */
  dimensionedAttendance (): number {
    return (this.variables.numberOfEmployees * this.variables.concurrencyAttendanceShare) +
      (this.variables.numberOfEmployees * this.variables.concurrencyAttendanceShare * this.variables.overCapacityShare) -
      (this.variables.numberOfEmployees * this.variables.homeOfficeAverageShare)
  }

  /**
   * This method calculates the non adjusted workstation capacity
   * @returns {number}
   */
  nonAdjustedWorkstationCapacity (): number {
    return (this.variables.numberOfEmployees * this.variables.workstationCapacityShare) +
      (this.variables.numberOfEmployees * this.variables.concurrencyAttendanceShare * this.variables.overCapacityShare) -
      (this.variables.numberOfEmployees * this.variables.homeOfficeAverageShare)
  }

  /**
   * This method calculates the difference between peak attendance and dimensioned attendance.
   * @returns {number}
   */
  diffPeak (): number {
    return this.#peakAttendance() - this.nonAdjustedWorkstationCapacity()
  }

  /**
   * This method calculates the government required area for this space.
   * @returns {number}
   */
  #governmentRequiredArea (): number {
    return this.dimensionedAttendance() * this.constants.governmentMinimumSquaremetersPerWorkSpace
  }

  /**
   * Calculates non-adjusted rest area
   * E4 = D4 - MAX(J4*L4;J4*M4)
   */
  calculateNonAdjustedRestArea(numberOfSeats: number): number {
    const nonAdjustedArea = this.space.result.areaExclCompensation || 0

    if (nonAdjustedArea <= 0) {
      return 0
    }

    const nonAdjustedAreaPerSeat = this.minAreaPerPersonExcludingCorridor()
    const minSeats = this.spaceConstants.minimumPersons || 0
    const adjustedNumberOfSeats = numberOfSeats > 0 ? Math.max(numberOfSeats, minSeats) : 0
    const areaNeeded = nonAdjustedAreaPerSeat * Math.max(numberOfSeats, adjustedNumberOfSeats)
    return nonAdjustedArea - areaNeeded
  }

  /**
   * Calculates missing adjustment
   * @todo is this used?
   * AK6 = IF (AK68!=0 AND AL6 == MAX(AL6:AL66)) THEN (AC6*AM6)+AK68 ELSE AC6*AM6
   */
  calculateMissingAdjustment(totalEmployeesPerWorkplaceTypeUnadjusted: number, allEmployeesPerWorkplaceTypeUnadjusted: number[]): number {
    // Check if this has max employees and needs adjustment
    const myUnadjustedCount = this.calculateEmployeesPerWorkplaceTypeUnadjusted()
    const isMaxEmployee = myUnadjustedCount === Math.max(...allEmployeesPerWorkplaceTypeUnadjusted)
    const missingEmployees = totalEmployeesPerWorkplaceTypeUnadjusted - this.dimensionedAttendance()
    let missingAdjustment = 0
    if (missingEmployees > 0 && isMaxEmployee) {
      missingAdjustment = missingEmployees
    }
    return missingAdjustment
  }

  /**
   * Calculate remainder area for space.
   * @returns {number}
   */
  #remainderArea (): number {
    if (this.space.result.adjustedAreaInclCompensation === undefined) {
      return 0
    }
    if (this.spaceConstants.personRoomWorkstation === 'person') {
      return 0
      // return this.space.result.adjustedAreaInclCompensation - (this.#areaPerSeatUnAdjusted() * this.calculateNumberOfSeats())
    }
    if (this.spaceConstants.personRoomWorkstation === 'room') {
      return this.space.result.adjustedAreaInclCompensation - (this.minimumSquareMeters() * this.calculateNumberOfRooms())
    }
    return 0
  }

  #areaPerSeatUnAdjusted (): number {
    /*
    if (this.space.result.adjustedAreaInclCompensation! > 0 && this.calculateNumberOfSeats() > 0) {
      return Math.round(this.space.result.adjustedAreaInclCompensation! / this.calculateNumberOfSeats() * 10) / 10
    }
    */
    return 0
  }

  /**
   * Calculates number of rooms
   * @returns {number}
   */
  calculateNumberOfRooms (): number {
    if (this.spaceConstants.shouldCalculateNumberOfRooms) {
      return Math.ceil((this.space.result.adjustedAreaInclCompensation || 0) / this.minimumSquareMeters())
    }
    return 0
  }

  /**
   * Calculates adjustment for missing square meters (AK6 in Excel)
   * Formula: IF (AK68!=0 AND AL6 == MAX(AL6:AL66)) THEN (AC6*AM6)+AK68 ELSE AC6*AM6
   * @todo Spørg Pontus om denne (fejler ved max pt... eller gør den?)
   */
  calculateAdjustmentForMissingSquareMeters(allEmployeesPerWorkplaceTypeUnadjusted: number[], totalEmployeesPerWorkplaceTypeUnadjusted: number): number {
    const myUnadjustedCount = this.calculateEmployeesPerWorkplaceTypeUnadjusted()
    const isMaxEmployee = myUnadjustedCount === Math.max(...allEmployeesPerWorkplaceTypeUnadjusted)
    const baseCount = this.nonAdjustedWorkstationCapacity() * this.sharePerWorkspaceType()

    if (isMaxEmployee) {
      // AK68 = Missing sqm = missingEmployees
      const missingEmployees = this.nonAdjustedWorkstationCapacity() - totalEmployeesPerWorkplaceTypeUnadjusted
      return Math.round(baseCount + missingEmployees)
    }

    return Math.round(baseCount)
  }

  /**
   * Calculates number of seats based on either:
   * - employeesPerWorkplaceTypeAdjusted if addPeakMarkupToWorkstationCapacityShare is true
   * - adjustmentForMissingSquareMeters if not
   * Always takes maximum between calculated value and minimumPersons
   * @returns {number}
   */
   calculateNumberOfSeats(allEmployeesPerWorkplaceTypeUnadjusted: number[], totalEmployeesPerWorkplaceTypeUnadjusted: number): number {
    if (!this.spaceConstants.shouldCalculateNumberOfSeats) {
      return 0
    }

    let seatCount: number
    if (this.variables.addPeakMarkupToWorkstationCapacityShare) {
      seatCount = this.space.result.employeesPerWorkplaceTypeAdjusted || 0
    } else {
      seatCount = this.calculateAdjustmentForMissingSquareMeters(
        allEmployeesPerWorkplaceTypeUnadjusted,
        totalEmployeesPerWorkplaceTypeUnadjusted
      )
    }

    return Math.round(Math.max(seatCount, this.spaceConstants.minimumPersons || 0))
  }

  /**
   * Calculates employees per seat type in peak as integer
   * @returns {number}
   */
  #employeesPerSeatTypeInPeak (): number {
    return Math.round(this.diffPeak() * this.sharePerWorkspaceType())
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
    return Math.round(this.nonAdjustedWorkstationCapacity() * this.sharePerWorkspaceType())
  }

  /**
   * Calculates employees per workplace type, adjusted
   * @todo wrong now? Does it need Math.ceil to be right?
   * @param {number} totalEmployeesPerWorkplaceTypeUnadjusted - The total number of employees per workplace type, unadjusted
   */
  calculateEmployeesPerWorkplaceTypeAdjusted (totalEmployeesPerWorkplaceTypeUnadjusted: number, allEmployeesPerWorkplaceTypeUnadjusted: number[]): number {
    if (totalEmployeesPerWorkplaceTypeUnadjusted > this.dimensionedAttendance() && this.calculateEmployeesPerWorkplaceTypeUnadjusted() === Math.max(...allEmployeesPerWorkplaceTypeUnadjusted)) {
      return this.calculateEmployeesPerWorkplaceTypeUnadjusted() - (totalEmployeesPerWorkplaceTypeUnadjusted - this.dimensionedAttendance())
    }
    if (totalEmployeesPerWorkplaceTypeUnadjusted < this.dimensionedAttendance() && this.calculateEmployeesPerWorkplaceTypeUnadjusted() === Math.max(...allEmployeesPerWorkplaceTypeUnadjusted)) {
      return this.calculateEmployeesPerWorkplaceTypeUnadjusted() + (this.dimensionedAttendance() - totalEmployeesPerWorkplaceTypeUnadjusted)
    }
    return this.calculateEmployeesPerWorkplaceTypeUnadjusted()
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
    return this.space.result.areaExclCompensation || 0
  }

  /**
   * Calculates the adjusted area including adjustment and compensation.
   */
  calculateAdjustedAreaInclCompensationWithAdjustmentAndCompensation(): number {
    return this.space.result.adjustedAreaInclCompensation! - this.#remainderArea()
  }

  /**
   * Calculates the area excluding compensation. Not implemented in this class.
   * @returns {number}
   */
  calculateAreaExclCompensation(): number {
    return 0
  }

  /**
   * Calculates the number of employees at peak
   * @returns {number}
   */
  markupEmployeesAtPeak(): number {
    return this.diffPeak() * this.sharePerWorkspaceType()
  }

  /**
   * Calculates Divergence Peak/ Workstation capacity
   * AE6-AC6
   * @returns {number}
   */
  divergencePeakWorkstationCapacity(): number {
    return this.#peakAttendance() - this.dimensionedAttendance()
  }

  /**
   * Calculates markup peak area
   * @param {number} areaPerEmployee - The area per employee, optional parameter
   */
  markupPeakArea(areaPerEmployee?: number): number {
    if (this.divergencePeakWorkstationCapacity() > 0) {
      return this.markupEmployeesAtPeak() * (areaPerEmployee || this.areaPerEmployee())
    }
    return 0
  }



}
