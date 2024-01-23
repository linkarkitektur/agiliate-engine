# Calculation
The [Calculator](../src/calculations/calculator.ts) class is the main class responsible for performing calculations. It is initialized with variables, custom space constants, custom constants, and an optional configuration file. The defaults are stored in [default.json](../src/config/default.json) file – this file is used if no configuration file is provided. So, there are two possible ways to change the default constants: In the configuration file or by providing custom constants in the request body.

```typescript
new Calculator(variables, customSpaceConstants, customConstants, version, config)
```

where the `variables`, `customSpaceConstants`, `customConstants` and `config` are in the JSON body of a POST request:

```json
{
  "variables": {
    "accessToCoworking": false,
    "accessToCanteen": true,
    "accessToCourseSpace": true,
    "accessToAuditorium": true,
    "accessToCellOffice": true,
    "accessToReception": false,
    "accessToExercise": true,
    "specialAreaOffice": 80,
    "specialAreaShared": 0,
    "specialAreaCommon": 100,
    "seatsInAuditorium": 50,
    "numberOfEmployees": 330,
    "concurrencyAttendanceShare": 1.0,
    "peakConcurrencyAttendanceShare": 1.0,
    "overCapacityShare": 0.0,
    "homeOfficeAverageShare": 0.0,
    "shareOfEmployeesInAuditorium": 0.30,
    "touchdownShare": 0.05,
    "dockinShare": 0.21,
    "coworkingShare": 0.00,
    "cellOfficeShare": 0.00,
    "landscapeShare": 0.36,
    "projectroomShare": 0.20,
    "focusroomShare": 0.11,
    "quietzoneShare": 0.07,
    "miniMeetingroomShare": 0.21,
    "smallMeetingroomShare": 0.30,
    "mediumMeetingroomShare": 0.36,
    "largeMeetingroomShare": 0.13
  },
  "customSpaceConstants": {
    "auditorium": {
      "minimumSquareMeters": 120
    }
  },
  "customConstants": {
    "governmentMinimumSquaremetersPerWorkSpace": 6
  }
}
```

There is also an example of a complete request in the [Postman collection](../postman_collection.json)

The config property is populated by reading the provided configuration file. The constants property is a merge of the default constants from the configuration file and the custom constants.

## Calculation Process

The main calculation process is performed by the `result` method. This method performs several steps to calculate the results:

1. *First Run*: The `#processSpacesFirst` method is called to calculate the initial results for all spaces. These results are needed in subsequent calculations.

2. *Aggregate Subspace Results*: The `#sumResults` method is called to aggregate the results of the subspaces.

3. *Calculate Total Workplace Area*: The `#calculateTotalWorkplaceArea` method is called to calculate the total workplace area.

4. *Calculate Total Compensation Area*: The `#calculateTotalCompensationArea` method is called to calculate the total area that needs compensation calculations.

5. *Calculate Total Employees Per Workspace Type Unadjusted*: The `#calculateTotalEmployeesPerWorkspaceTypeUnadjusted` method is called to calculate the total employees per workspace type (unadjusted).

6. *Second Run*: The `#processSpacesSecond` method is called to calculate the second run results for all spaces.

7. *Calculate Total Unadjusted Area*: The `#calculateTotalUnadjustedArea` method is called to calculate the total unadjusted area.

8. *Third Run*: The `#processSpacesThird` method is called to calculate the third run results for all spaces.

9. *Fourth Run*: The `#processSpacesFourth` method is called to calculate the fourth run results for all spaces.

10. *Calculate Total Adjusted Area Including Compensation and Adjustment*: The `#calculateTotalAdjustedAreaInclCompensationAndAdjustment` method is called to calculate the total area including compensation and adjustment.

11. *Compute Utility and Inner Walls*: The `#computeUtilityAndInnerWalls` method is called to calculate the utility floor space and inner walls of the top level spaces.

12. *Compute Technical and Communication Area*: The `#computeTechnicalAndCommunicationArea` method is called to calculate the technical and communication areas.

13. *Add Technical and Communication Area*: The `#addTechnicalAndCommunicationArea` method is called to add the technical and communication areas to the result.

14. *Calculate Final Results*: The final results are calculated and returned.

## Helper methods

The Calculator class also contains several private helper methods that are used to perform specific calculations. These include methods to calculate the corridor area, inner wall area, and to add custom spaces to the result.
