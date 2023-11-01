export interface ISpaceResult {
  areaExclCompensation?: number // The area excluding compensation
  notAdjustedAddonArea?: number // The not adjusted add-on area
  notAdjustedAddonPart?: number // The not adjusted add-on part
  adjustedAddonArea?: number // The adjusted add-on area
  adjustedAreaInclCompensation?: number // The adjusted area including compensation
  adjustedAreaInclCompensationWithAdjustmentAndCompensation?: number // The adjusted area including compensation with adjustment and compensation
  employeesPerWorkplaceTypeUnadjusted?: number // The unadjusted number of employees per workplace type
  employeesPerWorkplaceTypeAdjusted?: number // The adjusted number of employees per workplace type
  netArea?: number // The net area of the space
  utilityFloorSpace?: number // The utility floor space of the space
  numberOfRooms?: number // The number of rooms, if applicable
  numberOfSeats?: number // The number of seats, if applicable
}
