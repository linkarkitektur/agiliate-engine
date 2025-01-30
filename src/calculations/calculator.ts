import { readFileSync } from 'fs'
import { join } from 'path'
import type { ISpace } from './interfaces/space'
import type { IConfig } from './interfaces/config'
import type { ISpaceCalculation } from './interfaces/space_calculation'
import type { ISpaceResult } from './interfaces/space_result'
import type { IVariable } from './interfaces/variable'
import type { IConstant } from './interfaces/constant'
import type { ICalculationResult } from './interfaces/calculationresult'
import type { TCustomSpaceConstants } from './types/custom_space_constant'
import getSpace from './spaces'
import Dummy from './spaces/dummy'

/**
 * This is the main class for the calculator.
 */
export default class Calculator {
  variables: IVariable
  customSpaceConstants?: TCustomSpaceConstants
  customConstants?: IConstant
  config: IConfig
  constants: IConstant
  totalWorkplaceArea = 0
  totalCompensationArea = 0
  totalUnadjustedAddonArea = 0
  totalEmployeesPerWorkplaceTypeUnadjusted = 0
  totalAdjustedAreaInclCompensationWithAdjustmentAndCompensation = 0
  allEmployeesPerWorkplaceTypeUnadjusted: number[] = []

  /**
   * Initialize the calculator with the context from Koa and the optional config file to use
   * @param {IVariable} variables – The variables to use
   * @param {ISpaceConstant} customSpaceConstants – Custom space constants
   * @param {IConstant} customConstants – Custom constants
   * @param {string} version – Version
   * @param {string} [configFile] – The config file to use
   */
  constructor(variables: IVariable, customSpaceConstants: TCustomSpaceConstants|undefined, customConstants: IConstant|undefined, version: string, configFile: string = 'default.json') {
    this.variables = variables
    this.customSpaceConstants = customSpaceConstants
    this.customConstants = customConstants
    this.config = JSON.parse(readFileSync(join(import.meta.dir, '..', `config/versions/${version}`,  configFile), 'utf-8'))
    // Merge custom constants with the default constants
    this.constants = {
      ...this.config.constants,
      ...customConstants
    }
  }

  /**
   * This is the main method responsible for calculating the results
   * @returns {ICalculationResult} The result of the calculation
   */
  result (): ICalculationResult {
    // Initialize the employee counts
    this.#initializeEmployeeCounts(this.config.spaces)

    // Is this used? @todo
    // this.#calculateTotalEmployeesPerWorkspaceTypeUnadjusted(this.config.spaces)

    // Calculate the results for pre run
    let spaceResults = this.#processSpacesPreRun(this.config.spaces)
    // Get the results for all spaces, first run
    this.#processSpacesFirst(spaceResults)
    // Get aggregate subspace results, first run
    for (const space of spaceResults) {
      space.result = this.#sumResults(space)
    }
    // Get some aggregate summed results
    this.#calculateTotalWorkplaceArea(spaceResults)
    this.#calculateTotalCompensationArea(spaceResults)
    // this.#calculateTotalEmployeesPerWorkspaceTypeUnadjusted(spaceResults)

    // Get aggregate subspace results, second run
    spaceResults = this.#processSpacesSecond(spaceResults)

    // Get some more sums
    this.#calculateTotalUnadjustedAddonArea(spaceResults)

    // Get aggregate subspace results, third run
    spaceResults = this.#processSpacesThird(spaceResults)

    // Now that we have all area calculations, process room calculations
    spaceResults = this.#processRoomCalculations(spaceResults)

    // Get aggregate subspace results, fourth run
    spaceResults = this.#processSpacesFourth(spaceResults)

    this.#calculateTotalAdjustedAreaInclCompensationAndAdjustment(spaceResults)

    // Get aggregate subspace results, second run (not checked yet! maybe another sumresults function only calculating the needed)
    for (const space of spaceResults) {
      space.result = this.#sumResults(space)
    }

    // Calculate the utility floor space and inner walls of the top level spaces
    const { utilityFloorSpace, innerwallsAreaSum, updatedSpaceResults } = this.#computeUtilityAndInnerWalls(spaceResults)
    spaceResults = updatedSpaceResults

    const netArea = utilityFloorSpace - innerwallsAreaSum
    const netAreaPerEmployee = netArea / this.variables.numberOfEmployees

    // Calculate the technical and communication areas
    const { technicalArea, communicationArea } = this.#computeTechnicalAndCommunicationArea(utilityFloorSpace)
    spaceResults = this.#addCustomArea(spaceResults, communicationArea, 'communication area')
    spaceResults = this.#addCustomArea(spaceResults, technicalArea, 'technical area')

    const grossArea = utilityFloorSpace + technicalArea + communicationArea

    const grossAreaPerEmployee = grossArea / this.variables.numberOfEmployees
    const utilityFloorSpacePerEmployee = utilityFloorSpace / this.variables.numberOfEmployees
    const grossAreaPerDimensionedAttendance = grossArea / this.#dimensionedAttendance()
    const grossNetFactor = grossArea / netArea

    return {
      totals: {
        grossArea: Math.ceil(grossArea),
        netArea: Math.ceil(netArea),
        utilityFloorSpace: Math.ceil(utilityFloorSpace),
        adjustedAreaInclCompensationWithAdjustmentAndCompensation: Math.ceil(this.totalAdjustedAreaInclCompensationWithAdjustmentAndCompensation),
        unadjustedAddonArea: Math.ceil(this.totalUnadjustedAddonArea),
        workplaceArea: Math.ceil(this.totalWorkplaceArea),
        compensationArea: Math.ceil(this.totalCompensationArea),
        employeesPerWorkplaceTypeUnadjusted: this.totalEmployeesPerWorkplaceTypeUnadjusted,
        netAreaPerEmployee: Math.round(netAreaPerEmployee * 100) / 100,
        grossAreaPerEmployee: Math.round(grossAreaPerEmployee * 100) / 100,
        utilityFloorSpacePerEmployee: Math.round(utilityFloorSpacePerEmployee * 100) / 100,
        grossAreaPerDimensionedAttendance: Math.round(grossAreaPerDimensionedAttendance * 100) / 100,
        grossNetFactor: Math.round(grossNetFactor * 100) / 100,
        dimensionedAttendance: this.#dimensionedAttendance(),
      },
      spaces: spaceResults
    }
  }

  /**
   * This method is used to add a custom space to the result, for example corridors and inner walls, which are not really spaces
   * @param {string} name - The name of the space
   * @param {ISpaceResult} result - The result of the space
   * @returns {ISpace}
   */
  #addCustomSpace (name: string, result: ISpaceResult): ISpace {
    return {
      name,
      className: 'Dummy',
      result,
      constants: {
        personsPerType: 0,
        shouldCalculateCompensation: false,
        adhereToGovernmentMinimum: false,
      }
    }
  }

  /**
   * This method add the technical and communication areas to the result
   * @param {number} area - The area
   * @param {ISpace[]} spaceResults - The space results to add to
   * @returns {ISpace[]} The updated space results
   * @todo This function will be deprecated once we have a better way of handling technical and communication areas
   */
  #addCustomArea (spaceResults: ISpace[], area: number, spaceName: string): ISpace[] {
    const spaceResult: ISpaceResult = {
      areaExclCompensation: area,
      adjustedAreaInclCompensation: area,
      adjustedAreaInclCompensationWithAdjustmentAndCompensation: area,
    }
    spaceResults.push(this.#addCustomSpace(spaceName, spaceResult))
    return spaceResults
  }

  /**
   * This method computes the technical and communication areas
   * @param {number} utilityFloorSpace - The utility floor space
   * @returns {object}
   */
  #computeTechnicalAndCommunicationArea (utilityFloorSpace: number): {technicalArea: number, communicationArea: number} {
    // const pct = ((utilityFloorSpace / 0.74) - utilityFloorSpace) / (utilityFloorSpace * 2)
    const technicalArea = utilityFloorSpace * this.constants.technicalAreaShare
    const communicationArea = utilityFloorSpace * this.constants.communicationAreaShare
    return {
      technicalArea,
      communicationArea
    }
  }

  /**
   * Calculate the corridors and inner walls of the top level spaces
   * @param {ISpace[]} spaceResults - The space results to calculate
   * @returns {object}
   */
  #computeUtilityAndInnerWalls (spaceResults: ISpace[]): {utilityFloorSpace: number, innerwallsAreaSum: number, updatedSpaceResults: ISpace[]} {
    let utilityFloorSpace: number = this.totalAdjustedAreaInclCompensationWithAdjustmentAndCompensation // utilityFloorSpace is the total adjusted area incl. compensation and adjustment + corridors and inner walls
    let innerwallsAreaSum = 0
    for (const space of spaceResults) {
      if (space.shouldCalculateCorridor) {
        const corridorArea = this.#calculateCorridorArea(space.name, space.result.adjustedAreaInclCompensation || 0)
        const corridorResult: ISpaceResult = {
          areaExclCompensation: corridorArea,
          adjustedAreaInclCompensation: corridorArea,
          adjustedAreaInclCompensationWithAdjustmentAndCompensation: corridorArea,
        }
        space.spaces?.push(this.#addCustomSpace(`corridor – ${space.name}`, corridorResult))
        utilityFloorSpace += corridorArea
        // Update top level space results
        space.result.netArea = (space.result.adjustedAreaInclCompensationWithAdjustmentAndCompensation || 0) + corridorArea
        // Update all areas
        space.result.areaExclCompensation = (space.result.areaExclCompensation || 0) + corridorArea
        space.result.adjustedAreaInclCompensation = (space.result.adjustedAreaInclCompensation || 0) + corridorArea
      }
      if (space.shouldCalculateInnerwalls) {
        const innerwallsArea = this.#calculateInnerwallArea(space.result.areaExclCompensation || 0)
        const innerwallsResult: ISpaceResult = {
          areaExclCompensation: innerwallsArea,
          adjustedAreaInclCompensation: innerwallsArea,
          adjustedAreaInclCompensationWithAdjustmentAndCompensation: innerwallsArea,
        }
        space.spaces?.push(this.#addCustomSpace(`inner wall – ${space.name}`, innerwallsResult))
        utilityFloorSpace += innerwallsArea
        innerwallsAreaSum += innerwallsArea
        // Update top level space results
        space.result.utilityFloorSpace = (space.result.netArea || 0) + innerwallsArea
      }
    }
    return {
      utilityFloorSpace,
      innerwallsAreaSum,
      updatedSpaceResults: spaceResults
    }
  }

  /**
   * This method calculates the sum results for spaces
   * @param {ISpace} space - The space to calculate
   * @returns {ISpaceResult}
   */
  #sumResults(space: ISpace): ISpaceResult {
    // Sum up the results of the children, if they exist
    let childSum_areaExclCompensation = 0
    let childSum_adjustedAreaInclCompensation = 0
    let childSum_notAdjustedAddonArea = 0
    let childSum_adjustedAreaInclCompensationWithAdjustmentAndCompensation = 0
    let childSum_numberOfRooms = 0

    if (space.spaces) {
      for (const child of space.spaces) {
        const r = this.#sumResults(child)
        childSum_areaExclCompensation += r.areaExclCompensation || 0
        childSum_adjustedAreaInclCompensation += r.adjustedAreaInclCompensation || 0
        childSum_notAdjustedAddonArea += r.notAdjustedMarkupArea || 0
        childSum_adjustedAreaInclCompensationWithAdjustmentAndCompensation += r.adjustedAreaInclCompensationWithAdjustmentAndCompensation || 0
        childSum_numberOfRooms += r.numberOfRooms || 0
      }
    }

    // Use the sum if we don't already have a result
    space.result.areaExclCompensation = space.result.areaExclCompensation || childSum_areaExclCompensation
    space.result.adjustedAreaInclCompensation = space.result.adjustedAreaInclCompensation || childSum_adjustedAreaInclCompensation
    space.result.notAdjustedMarkupArea = space.result.notAdjustedMarkupArea || childSum_notAdjustedAddonArea
    space.result.adjustedAreaInclCompensationWithAdjustmentAndCompensation = space.result.adjustedAreaInclCompensationWithAdjustmentAndCompensation || childSum_adjustedAreaInclCompensationWithAdjustmentAndCompensation
    space.result.numberOfRooms = space.result.numberOfRooms || childSum_numberOfRooms

    // Return the total sum
    return {
      areaExclCompensation: space.result.areaExclCompensation,
      adjustedAreaInclCompensation: space.result.adjustedAreaInclCompensation,
      notAdjustedMarkupArea: space.result.notAdjustedMarkupArea,
      adjustedAreaInclCompensationWithAdjustmentAndCompensation: space.result.adjustedAreaInclCompensationWithAdjustmentAndCompensation,
      numberOfRooms: space.result.numberOfRooms,
    }
  }

  /**
   * Gets dimensioned attendance. We use a dummy because it's not space dependent.
   * @returns {number}
   */
  #dimensionedAttendance (): number {
    return new Dummy(this.variables, this.config).dimensionedAttendance()
  }

  /**
   * Loop through all spaces and calculate the first run
   * @param {ISpace[]} spaces
   * @returns {ISpace[]}
   */
  #processSpacesPreRun(spaces: ISpace[]): ISpace[] {
    for (const space of spaces) {
      // If this space has nested spaces, process those
      if (space.spaces) {
        this.#processSpacesPreRun(space.spaces)
      } else {
        space.result = this.#calculateSpacePreRun(space)
      }
    }
    return spaces
  }

  /**
   * Loop through all spaces and calculate the first run
   * @param {ISpace[]} spaces
   * @returns {ISpace[]}
   */
  #processSpacesFirst(spaces: ISpace[]): ISpace[] {
    for (const space of spaces) {
      // If this space has nested spaces, process those
      if (space.spaces) {
        this.#processSpacesFirst(space.spaces)
      } else {
        space.result = {
          ... space.result,
          ... this.#calculateSpaceFirstRun(space)
        }
      }
    }
    return spaces
  }

  /**
   * Loop through all spaces and calculate the second run
   * @param {ISpace[]} spaces
   * @returns {ISpace[]}
   */
  #processSpacesSecond(spaces: ISpace[]): ISpace[] {
    for (const space of spaces) {
      // If this space has nested spaces, process those
      if (space.spaces) {
        this.#processSpacesSecond(space.spaces)
      } else {
        space.result = {
          ... space.result,
          ... this.#calculateSpaceSecondRun(space)
        }
        this.allEmployeesPerWorkplaceTypeUnadjusted.push(space.result.employeesPerWorkplaceTypeUnadjusted || 0)
      }
    }
    return spaces
  }

  /**
   * Loop through all spaces and calculate the third run
   * @param {ISpace[]} spaces
   * @returns {ISpace[]}
   */
  #processSpacesThird(spaces: ISpace[]): ISpace[] {
    for (const space of spaces) {
      // If this space has nested spaces, process those
      if (space.spaces) {
        this.#processSpacesThird(space.spaces)
      } else {
        space.result = {
          ... space.result,
          ... this.#calculateSpaceThirdRun(space)
        }
      }
    }
    return spaces
  }

  /**
   * Loop through all spaces and calculate the fourth run
   * @param {ISpace[]} spaces
   * @returns {ISpace[]}
   */
  #processSpacesFourth(spaces: ISpace[]): ISpace[] {
    for (const space of spaces) {
      // If this space has nested spaces, process those
      if (space.spaces) {
        this.#processSpacesFourth(space.spaces)
      } else {
        // Calculate the space
        space.result = {
          ... space.result,
          ... this.#calculateSpaceFourthRun(space)
        }
      }
    }
    return spaces
  }

  /**
   * Calculates a space based on the pre run
   * @param {ISpace} space - The space to calculate
   * @returns {ISpaceResult} The calculated result object
   */
  #calculateSpacePreRun (space: ISpace): ISpaceResult {
    const Space = getSpace(space.name)
    const spaceCalculation: ISpaceCalculation = new Space(this.variables, this.config, this.customSpaceConstants, this.customConstants, space)
    return {
      employeesPerWorkplaceTypeUnadjusted: spaceCalculation.calculateEmployeesPerWorkplaceTypeUnadjusted(),
      // Is this needed?
      adjustmentForMissingSquareMeters: spaceCalculation.calculateAdjustmentForMissingSquareMeters(
        this.allEmployeesPerWorkplaceTypeUnadjusted,
        this.totalEmployeesPerWorkplaceTypeUnadjusted
      )
    }
  }

  /**
   * Calculates a space based on the first run
   * @param {ISpace} space - The space to calculate
   * @returns {ISpaceResult} The calculated result object
   */
  #calculateSpaceFirstRun (space: ISpace): ISpaceResult {
    const Space = getSpace(space.name)
    const spaceCalculation: ISpaceCalculation = new Space(this.variables, this.config, this.customSpaceConstants, this.customConstants, space)
    return {
      /*
      employeesPerWorkplaceTypeAdjusted: spaceCalculation.calculateEmployeesPerWorkplaceTypeAdjusted(
        this.totalEmployeesPerWorkplaceTypeUnadjusted,
        this.allEmployeesPerWorkplaceTypeUnadjusted
      ),
      */
      // areaExclCompensation: Math.round(spaceCalculation.calculateAreaExclCompensation()),
      areaExclCompensation: spaceCalculation.calculateAreaExclCompensation(),
      // employeesPerWorkplaceTypeUnadjusted: spaceCalculation.calculateEmployeesPerWorkplaceTypeUnadjusted(),
    }
  }

  /**
   * Calculates a space the second time
   * @param {ISpace} space - The space to calculate
   * @returns {ISpaceResult} The calculated space
   */
  #calculateSpaceSecondRun (space: ISpace): ISpaceResult {
    const Space = getSpace(space.name)
    const spaceCalculation: ISpaceCalculation = new Space(this.variables, this.config, this.customSpaceConstants, this.customConstants, space)
    const numberOfSeats = spaceCalculation.calculateNumberOfSeats(
      this.allEmployeesPerWorkplaceTypeUnadjusted,
      this.totalEmployeesPerWorkplaceTypeUnadjusted
    )
    /*
    const numberOfRooms = spaceCalculation.calculateNumberOfRooms(
      this.allEmployeesPerWorkplaceTypeUnadjusted,
      this.totalEmployeesPerWorkplaceTypeUnadjusted
    )
    */
    return {
      // nonAdjustedRestArea: spaceCalculation.calculateNonAdjustedRestArea(numberOfSeats, numberOfRooms),
      numberOfSeats: numberOfSeats,
      // numberOfRooms: numberOfRooms,
      notAdjustedMarkupArea: spaceCalculation.calculateNotAdjustedMarkupArea(this.totalWorkplaceArea, this.totalCompensationArea),
    }
  }

  /**
   * Calculates a space the third time
   * @param {ISpace} space - The space to calculate
   * @returns {ISpaceResult} The calculated space
   */
  #calculateSpaceThirdRun (space: ISpace): ISpaceResult {
    const Space = getSpace(space.name)
    const spaceCalculation: ISpaceCalculation = new Space(this.variables, this.config, this.customSpaceConstants, this.customConstants, space)
    return {
      notAdjustedAddonPart: spaceCalculation.calculateNotAdjustedAddonPart(this.totalWorkplaceArea, this.totalCompensationArea),
      adjustedMarkupArea: spaceCalculation.calculateAdjustedMarkupArea(this.totalWorkplaceArea, this.totalCompensationArea, this.totalUnadjustedAddonArea),
      adjustedAreaInclCompensation: spaceCalculation.calculateAdjustedAreaInclCompensation(this.totalWorkplaceArea, this.totalCompensationArea, this.totalUnadjustedAddonArea),
      employeesPerWorkplaceTypeAdjusted: spaceCalculation.calculateEmployeesPerWorkplaceTypeAdjusted(this.totalEmployeesPerWorkplaceTypeUnadjusted, this.allEmployeesPerWorkplaceTypeUnadjusted),
    }
  }

  /**
   * Calculates a space the fourth time
   * @param {ISpace} space - The space to calculate
   * @returns {ISpaceResult} The calculated space
   */
  #calculateSpaceFourthRun (space: ISpace): ISpaceResult {
    const Space = getSpace(space.name)
    const spaceCalculation: ISpaceCalculation = new Space(this.variables, this.config, this.customSpaceConstants, this.customConstants, space)
    return {
      adjustedAreaInclCompensationWithAdjustmentAndCompensation: spaceCalculation.calculateAdjustedAreaInclCompensationWithAdjustmentAndCompensation(),
      // numberOfRooms: spaceCalculation.calculateNumberOfRooms(),
    }
  }

  /**
   * Calculates the total work place area for all spaces
   * @param {ISpace[]} spaces - The spaces to calculate
   * @returns {number} The total work place area
   */
  #calculateTotalWorkplaceArea (spaces: ISpace[]): number {
    for (const space of spaces) {
      // If this space has nested spaces, process those
      if (space.spaces) {
        this.totalWorkplaceArea = this.#calculateTotalWorkplaceArea(space.spaces)
      } else {
        // Calculate the total area
        if (space.constants.countsTowardsWorkspaceArea) {
          this.totalWorkplaceArea += space.result.areaExclCompensation ?? 0
        }
      }
    }
    return this.totalWorkplaceArea
  }

  /**
   * Calculates the total area that needs compensation
   * @param {ISpace[]} spaces - The spaces to calculate
   * @returns {number} The total work place area
   * @todo Reimplement
   */
  #calculateTotalCompensationArea (spaces: ISpace[]): number {
    for (const space of spaces) {
      // If this space has nested spaces, process those
      if (space.spaces) {
        this.totalCompensationArea = this.#calculateTotalCompensationArea(space.spaces)
      } else {
        // Calculate the total area
        if (space.constants.shouldCalculateCompensation) {
          this.totalCompensationArea += space.result.areaExclCompensation ?? 0
        }
      }
    }
    return this.totalCompensationArea
  }

  /**
   * Calculates the total area including compensation and adjustment
   * @param {ISpace[]} spaces - The spaces to calculate
   * @returns {number} The total work place area
   */
  #calculateTotalAdjustedAreaInclCompensationAndAdjustment (spaces: ISpace[]): number {
    for (const space of spaces) {
      // If this space has nested spaces, process those
      if (space.spaces) {
        this.totalAdjustedAreaInclCompensationWithAdjustmentAndCompensation = this.#calculateTotalAdjustedAreaInclCompensationAndAdjustment(space.spaces)
      } else {
        // Calculate the total area
        this.totalAdjustedAreaInclCompensationWithAdjustmentAndCompensation += space.result.adjustedAreaInclCompensationWithAdjustmentAndCompensation ?? 0
      }
    }
    return this.totalAdjustedAreaInclCompensationWithAdjustmentAndCompensation
  }

  /**
   * This method gets the un-adjusted area sum
   * @param {ISpace[]} spaces - The spaces to calculate
   * @returns {number} The total un-adjusted area
   */
  #calculateTotalUnadjustedAddonArea (spaces: ISpace[]): number {
    for (const space of spaces) {
      // If this space has nested spaces, process those
      if (space.spaces) {
        this.totalUnadjustedAddonArea = this.#calculateTotalUnadjustedAddonArea(space.spaces)
      } else {
        // Calculate the total area
        if (space.constants.shouldCalculateCompensation) {
          this.totalUnadjustedAddonArea += space.result.notAdjustedMarkupArea ?? 0
        }
      }
    }
    // console.log(this.totalUnadjustedAddonArea)
    return this.totalUnadjustedAddonArea
  }

  /**
   * This method gets the employees per workplacetype (unadjusted) sum
   * @param {ISpace[]} spaces - The spaces to calculate
   * @returns {number} The total employees per workplace type (unadjusted)
   */
  #calculateTotalEmployeesPerWorkspaceTypeUnadjusted (spaces: ISpace[]): number {
    for (const space of spaces) {
      // If this space has nested spaces, process those
      if (space.spaces) {
        this.totalEmployeesPerWorkplaceTypeUnadjusted = this.#calculateTotalEmployeesPerWorkspaceTypeUnadjusted(space.spaces)
      } else {
        this.totalEmployeesPerWorkplaceTypeUnadjusted += space.result.employeesPerWorkplaceTypeUnadjusted ?? 0
      }
    }
    return this.totalEmployeesPerWorkplaceTypeUnadjusted
  }

  /**
   * Calculates the area of corridors.
   * @param {number} areaInclCompensation - The area including compensation
   * @param {string} spaceName - The name of the space
   * @returns {number}
   */
  #calculateCorridorArea (spaceName: string, areaInclCompensation: number): number {
    let share = 0
    if (spaceName === 'workspace') {
      share = this.constants.walkwayShareWorkspace
    } else if (spaceName === 'coworking') {
      share = this.constants.walkwayShareCoworking
    } else if (spaceName === 'common area') {
      share = this.constants.walkwayShareCommonArea
    }
    return areaInclCompensation * share
  }

  /**
   * Calculates the area of corridors.
   * @param {number} areaExclCompensation - The area excluding compensation
   * @returns {number}
   */
  #calculateInnerwallArea (areaExclCompensation: number): number {
    return areaExclCompensation * this.constants.innerwallsAddonShare
  }

  /**
   * Process room calculations after all area calculations are complete
   * @param {ISpace[]} spaces - The spaces to process
   * @todo rename
   * @returns {ISpace[]} The processed spaces
   */
  #processRoomCalculations(spaces: ISpace[]): ISpace[] {
    for (const space of spaces) {
      if (space.spaces) {
        this.#processRoomCalculations(space.spaces)
      } else if (space.constants.shouldCalculateNumberOfRooms) {
        const Space = getSpace(space.name)
        const spaceCalculation = new Space(this.variables, this.config, this.customSpaceConstants, this.customConstants, space)
        space.result.numberOfRooms = spaceCalculation.calculateNumberOfRooms(
          this.allEmployeesPerWorkplaceTypeUnadjusted,
          this.totalEmployeesPerWorkplaceTypeUnadjusted
        )
        space.result.nonAdjustedRestArea = spaceCalculation.calculateNonAdjustedRestArea()
      }
    }
    return spaces
  }

  #initializeEmployeeCounts(spaces: ISpace[]): void {
    for (const space of spaces) {
      if (space.spaces) {
        this.#initializeEmployeeCounts(space.spaces)
      } else {
        const Space = getSpace(space.name)
        if (space.constants.countsTowardsWorkspaceArea) {
          const spaceCalculation = new Space(this.variables, this.config, this.customSpaceConstants, this.customConstants, space)
          const count = spaceCalculation.calculateEmployeesPerWorkplaceTypeUnadjusted()
          space.result.employeesPerWorkplaceTypeUnadjusted = count
          this.totalEmployeesPerWorkplaceTypeUnadjusted += count
          this.allEmployeesPerWorkplaceTypeUnadjusted.push(count)
        }
      }
    }
  }
}
