export interface ISpaceConstant {
    /**
     * Optional, defines the type of space: seat, person or room
     */
    seatPersonRoom?: string

    /**
     * Whether to calculate the number of rooms for this space
     */
    shouldCalculateNumberOfRooms?: boolean 

    /**
     * Whether to calculate the number of seats for this space
     */
    shouldCalculateNumberOfSeats?: boolean 

    /**
     * The area required per role
     */
    areaPerRole: number 

    /**
     * The number of persons per type of space
     */
    personsPerType: number 

    /**
     * The minimum number of persons for this space
     */
    minimumPersons?: number 

    /**
     * The minimum square meters required for this space
     */
    minimumSquareMeters?: number 

    /**
     * Whether to calculate compensation for this space
     */
    shouldCalculateCompensation: boolean 

    /**
     * Whether this space counts towards the total workspace area
     */
    countsTowardsWorkspaceArea?: boolean 

    /**
     * The seat area per spot
     */
    seatAreaPerSpot?: number 

    /**
     * Whether this space requires additional storage
     */
    requiresAdditionalStorage?: boolean 

    /**
     * Whether to adhere to the government minimum for this space
     */
    adhereToGovernmentMinimum: boolean 

    /**
     * The surcharge for the internal corridor share
     * @minimum 0
     * @maximum 1
     */
    surchargeInternalCorridorShare?: number 

    /**
     * The area per person excluding the corridor
     */
    areaPerPersonExcludingCorridor?: number 

    /**
     * The units per person for this space
     */
    unitsPerPerson?: number 
}
