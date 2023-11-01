export interface ISpaceCalculation {
  calculateEmployeesPerWorkplaceTypeUnadjusted: () => number // Function to calculate the unadjusted number of employees per workplace type
  calculateAreaExclCompensation: () => number // Function to calculate the area excluding compensation
  calculateAdjustedAreaInclCompensation: (totalWorkplceArea: number, totalCompensationArea: number, totalUnadjustedArea: number) => number // Function to calculate the adjusted area including compensation
  calculateNotAdjustedAddonArea: (totalWorkplaceArea: number, totalCompensationArea: number) => number // Function to calculate the not adjusted add-on area
  calculateAdjustedAddonArea: (totalWorkplaceArea: number, totalCompensationArea: number, totalUnadjustedArea: number) => number // Function to calculate the adjusted add-on area
  calculateNotAdjustedAddonPart: (totalWorkplaceArea: number, totalCompensationArea: number) => number // Function to calculate the not adjusted add-on part
  calculateEmployeesPerWorkplaceTypeAdjusted: (totalEmployeesPerWorkplaceTypeUnadjusted: number, allEmployeesPerWorkplaceTypeUnadjusted: number[]) => number // Function to calculate the adjusted number of employees per workplace type
  calculateAdjustedAreaInclCompensationWithAdjustmentAndCompensation: () => number // Function to calculate the adjusted area including compensation with adjustment and compensation
  dimensionedAttendance: () => number // Function to calculate the dimensioned attendance
  calculateNumberOfRooms: () => number // Function to calculate the number of rooms, if applicable
  calculateNumberOfSeats: () => number // Function to calculate the number of seats, if applicable
}
