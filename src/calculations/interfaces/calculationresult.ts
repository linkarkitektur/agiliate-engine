import { ISpace } from './space'

export interface ICalculationResult {
  /**
   * Object containing various total values.
   */
  totals: {
    unadjustedArea: number // Total amount of unadjusted area
    workplaceArea: number // Total area dedicated to workplaces
    compensationArea: number // Total area used for compensation calculation
    employeesPerWorkplaceTypeUnadjusted: number // Total number of employees per unadjusted workplace type
    adjustedAreaInclCompensationWithAdjustmentAndCompensation: number // Total adjusted area including compensation with adjustment and compensation
    netArea: number // Total net area
    utilityFloorSpace: number // Total utility floor space
    grossArea: number // Total gross area
    utilityFloorSpacePerEmployee: number // Utility floor space per employee
    netAreaPerEmployee: number // Net area per employee
    grossAreaPerEmployee: number // Gross area per employee
    grossAreaPerDimensionedAttendance: number // Gross area per dimensioned attendance
    grossNetFactor: number // Gross net factor
    dimensionedAttendance: number // Dimensioned attendance
  }
  /**
   * Object containing all spaces and detailed calculation results
   */
  spaces: ISpace[]
}
