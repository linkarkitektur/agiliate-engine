export interface IVariable {
  /**
   * Whether there is a need for access to a canteen.
   * @is_in_new_excel
   */
  accessToCanteen: boolean

  /**
   * Whether shared use of canteen is allowed.
   * @is_in_new_excel
   */
  sharedUseOfCanteen: boolean

  /**
   * Whether there is a need for access to an auditorium.
   * @is_in_new_excel
   */
  accessToAuditorium: boolean

  /**
   * The number of seats in the auditorium.
   * @is_in_new_excel
   */
  seatsInAuditorium: number

  /**
   * The share of employees in the auditorium.
   * @minimum 0
   * @maximum 1
   */
  shareOfEmployeesInAuditorium: number

  /**
   * Whether there is a need for access to a course space.
   * @is_in_new_excel
   */
  accessToCourseSpace: boolean

  /**
   * Number of seats needed in course space.
   * @is_in_new_excel
   */
  seatsInCourseSpace: number

  /**
   * Whether there is a need for access to a cell office.
   * @is_in_new_excel
   */
  accessToCellOffice: boolean

  /**
   * Whether there is a need for access to a coworking space.
   * @is_in_new_excel
   */
  accessToCoworking: boolean

  /**
   * Whether there is a need for access to a reception.
   * @deprecated Use accessToCommonAreaReception or accessToTenantReception instead
   */
  accessToReception: boolean

  /**
   * Whether there is a need for access to a common area reception.
   */
  accessToCommonAreaReception: boolean

  /**
   * Whether there is a need for access to a tenant reception.
   */
  accessToTenantReception: boolean

  /**
   * The area of the special office.
   * @is_in_new_excel
   */
  specialAreaOffice: number

  /**
   * The area of the special shared space.
   * @is_in_new_excel
   */
  specialAreaShared: number

  /**
   * The area of the special common space.
   * @is_in_new_excel
   */
  specialAreaCommon: number

  /**
   * Whether there is a need for access to an exercise area.
   */
  accessToFitness: boolean

  /**
   * The share of coworking space.
   * @minimum 0
   * @maximum 1
   * @is_in_new_excel
   */
  coworkingShare: number

  /**
   * The share of touchdown space.
   * @required
   * @minimum 0
   * @maximum 1
   * @is_in_new_excel
   */
  touchdownShare: number

  /**
   * The share of dock-in space.
   * @minimum 0
   * @maximum 1
   * @is_in_new_excel
   */
  dockinShare: number

  /**
   * The share of cell office space.
   * @minimum 0
   * @maximum 1
   * @is_in_new_excel
   */
  cellOfficeShare: number

  /**
   * The share of landscape space.
   * @minimum 0
   * @maximum 1
   * @is_in_new_excel
   */
  landscapeShare: number

  /**
   * The total number of employees.
   * @minimum 0
   * @maximum ?
   * @is_in_new_excel
   */
  numberOfEmployees: number

  /**
   * The share of concurrent attendance.
   * @minimum 0
   * @maximum 1
   * @is_in_new_excel as "occupancy share"
   */
  concurrencyAttendanceShare: number

  /**
   * The peak share of concurrent attendance.
   * @minimum 0
   * @maximum 1
   * @is_in_new_excel
   */
  peakConcurrencyAttendanceShare: number

  /**
   * The share of workstation capacity.
   * @minimum 0
   * @maximum 1
   * @is_in_new_excel
   */
  workstationCapacityShare: number

  /**
   * Whether to add peak markup to workstation capacity share.
   * @is_in_new_excel
   */
  addPeakMarkupToWorkstationCapacityShare: boolean

  /**
   * The share of overcapacity.
   * @minimum 0
   * @maximum 1
   * @is_in_new_excel
   */
  overCapacityShare: number

  /**
   * The average share of home office.
   * @minimum 0
   * @maximum 1
   * @is_in_new_excel
   */
  homeOfficeAverageShare: number

  /**
   * The share of project room space.
   * @minimum 0
   * @maximum 1
   * @is_in_new_excel
   */
  projectroomShare: number

  /**
   * The share of focus room space.
   * @minimum 0
   * @maximum 1
   * @is_in_new_excel
   */
  focusroomShare: number

  /**
   * The share of quiet zone space.
   * @minimum 0
   * @maximum 1
   * @is_in_new_excel
   */
  quietzoneShare: number

  /**
   * The share of mini or digital meeting room space.
   * @minimum 0
   * @maximum 1
   * @is_in_new_excel
   */
  miniMeetingroomShare: number

  /**
   * The share of small meeting room space.
   * @minimum 0
   * @maximum 1
   * @is_in_new_excel
   */
  smallMeetingroomShare: number

  /**
   * The share of medium meeting room space.
   * @minimum 0
   * @maximum 1
   * @is_in_new_excel
   */
  mediumMeetingroomShare: number

  /**
   * The share of large meeting room space.
   * @minimum 0
   * @maximum 1
   * @is_in_new_excel
   */
  largeMeetingroomShare: number

  /**
   * Whether to use compensation factor for workstations
   * @is_in_new_excel
   */
  useCompensationFactorForWorkstations: boolean

  /**
   * Shared project- & meeting rooms in Common area?
   * @is_in_new_excel
   */
  accessToCommonAreaProjectAndMeetingRooms: boolean

  /**
   * Share of access to project- & meeting rooms in Common area
   * @is_in_new_excel
   */
  accessToCommonAreaProjectAndMeetingRoomsShare: number

}
