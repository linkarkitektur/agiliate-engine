export interface IVariable {
  accessToCanteen: boolean // Whether there is a need for access to a canteen
  accessToAuditorium: boolean // Whether there is a need for access to an auditorium
  seatsInAuditorium: number // The number of seats in the auditorium
  shareOfEmployeesInAuditorium: number // The percentage of employees in the auditorium
  accessToCourseSpace: boolean // Whether there is a need for access to a course space
  accessToGym: boolean // Whether there is a need for access to a gym
  accessToCellOffice: boolean // Whether there is a need for access to a cell office
  accessToCoworking: boolean // Whether there is a need for access to a coworking space
  accessToReception: boolean // Whether there is a need for access to a reception
  specialAreaOffice: number // The area of the special office
  specialAreaShared: number // The area of the shared space
  specialAreaCommon: number // The area of the common space
  accessToExercise: boolean // Whether there is a need for access to an exercise area
  coworkingShare: number // The percentage of coworking space
  touchdownShare: number // The percentage of touchdown space
  dockinShare: number // The percentage of dock-in space
  cellOfficeShare: number // The percentage of cell office space
  landscapeShare: number // The percentage of landscape space
  numberOfEmployees: number // The total number of employees
  concurrencyAttendanceShare: number // The percentage of concurrent attendance
  peakConcurrencyAttendanceShare: number // The peak percentage of concurrent attendance
  overCapacityShare: number // The percentage of overcapacity
  homeOfficeAverageShare: number // The average percentage of home office
  projectroomShare: number // The percentage of project room space
  focusroomShare: number // The percentage of focus room space
  quietzoneShare: number // The percentage of quiet zone space
  miniMeetingroomShare: number // The percentage of mini meeting room space
  smallMeetingroomShare: number // The percentage of small meeting room space
  mediumMeetingroomShare: number // The percentage of medium meeting room space
  largeMeetingroomShare: number // The percentage of large meeting room space
}
