export interface ISpaceConstant {
    seatPersonRoom?: string // Optional, defines the type of space: seat, person or room
    shouldCalculateNumberOfRooms?: boolean // Whether to calculate the number of rooms
    shouldCalculateNumberOfSeats?: boolean // Whether to calculate the number of seats
    areaPerRole: number // The area required per role
    personsPerType: number // The number of persons per type of space
    minimumPersons?: number // The minimum number of persons for this space
    minimumSquareMeters?: number // The minimum square meters required for this space
    shouldCalculateCompensation: boolean // Whether to calculate compensation for this space
    countsTowardsWorkspaceArea?: boolean // Whether this space counts towards the total workspace area
    seatAreaPerSpot?: number // The seat area per spot
    requiresAdditionalStorage?: boolean // Whether this space requires additional storage
    adhereToGovernmentMinimum: boolean // Whether to adhere to the government minimum for this space
    surchargeInternalCorridorShare?: number // The surcharge for the internal corridor share
    areaPerPersonExcludingCorridor?: number // The area per person excluding the corridor
    unitsPerPerson?: number // The units per person for this space
}
