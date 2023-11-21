export interface IVariable {
  /**
   * Whether there is a need for access to a canteen.
   */
  accessToCanteen: boolean

  /**
   * Whether there is a need for access to an auditorium.
   */
  accessToAuditorium: boolean

  /**
   * The number of seats in the auditorium.
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
   */
  accessToCourseSpace: boolean

  /**
   * Whether there is a need for access to a gym.
   */
  accessToGym: boolean

  /**
   * Whether there is a need for access to a cell office.
   */
  accessToCellOffice: boolean

  /**
   * Whether there is a need for access to a coworking space.
   */
  accessToCoworking: boolean

  /**
   * Whether there is a need for access to a reception.
   */
  accessToReception: boolean

  /**
   * The area of the special office.
   */
  specialAreaOffice: number

  /**
   * The area of the special shared space.
   */
  specialAreaShared: number

  /**
   * The area of the special common space.
   */
  specialAreaCommon: number

  /**
   * Whether there is a need for access to an exercise area.
   */
  accessToExercise: boolean

  /**
   * The share of coworking space.
   * @minimum 0
   * @maximum 1
   */
  coworkingShare: number

  /**
   * The share of touchdown space.
   * @required
   * @minimum 0
   * @maximum 1
   */
  touchdownShare: number

  /**
   * The share of dock-in space.
   * @minimum 0
   * @maximum 1
   */
  dockinShare: number

  /**
   * The share of cell office space.
   * @minimum 0
   * @maximum 1
   */
  cellOfficeShare: number

  /**
   * The share of landscape space.
   * @minimum 0
   * @maximum 1
   */
  landscapeShare: number

  /**
   * The total number of employees.
   */
  numberOfEmployees: number

  /**
   * The share of concurrent attendance.
   * @minimum 0
   * @maximum 1
   */
  concurrencyAttendanceShare: number

  /**
   * The peak share of concurrent attendance.
   * @minimum 0
   * @maximum 1
   */
  peakConcurrencyAttendanceShare: number

  /**
   * The share of overcapacity.
   * @minimum 0
   * @maximum 1
   */
  overCapacityShare: number

  /**
   * The average share of home office.
   * @minimum 0
   * @maximum 1
   */
  homeOfficeAverageShare: number

  /**
   * The share of project room space.
   * @minimum 0
   * @maximum 1
   */
  projectroomShare: number

  /**
   * The share of focus room space.
   * @minimum 0
   * @maximum 1
   */
  focusroomShare: number

  /**
   * The share of quiet zone space.
   * @minimum 0
   * @maximum 1
   */
  quietzoneShare: number

  /**
   * The share of mini meeting room space.
   * @minimum 0
   * @maximum 1
   */
  miniMeetingroomShare: number

  /**
   * The share of small meeting room space.
   * @minimum 0
   * @maximum 1
   */
  smallMeetingroomShare: number

  /**
   * The share of medium meeting room space.
   * @minimum 0
   * @maximum 1
   */
  mediumMeetingroomShare: number

  /**
   * The share of large meeting room space.
   * @minimum 0
   * @maximum 1
   */
  largeMeetingroomShare: number
}