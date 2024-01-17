# Totals

The "Totals" output is a list of spacial metrics, including:
- grossArea
- netArea
- adjustedAreaInclCompensationWithAdjustmentAndCompensation
- unadjustedArea
- workplaceArea
- compensationArea
- employeesPerWorkplaceTypeUnadjusted
- netAreaPerEmployee
- grossAreaPerEmployee
- utilityFloorSpacePerEmployee
- grossAreaPerDimensionedAttendance
- grossNetFactor
- dimensionedAttendance

## Definition

**grossArea**:
Sum of utility floor space, technical area, and communication area, including adjusted workspace areas.

**netArea**:
Utility floor space minus the area of inner walls, showing usable space within.

**adjustedAreaInclCompensationWithAdjustmentAndCompensation**:
Workspace area after adding compensation and adjustments for extra space needs.

**unadjustedAddonArea**:
The sum of of the unadjusted addon area for all spaces with constant `shouldCalculateCompensation` set to `true`.

**workplaceArea**:
Initial total area for workspaces, before any compensation or adjustments.

**compensationArea**:
Total area for additional compensations, reflecting extra space for workspace standards.

**employeesPerWorkplaceTypeUnadjusted**:
Number of employees per workplace type, calculated before adjustments, based on dimensioned attendance and type share.

**netAreaPerEmployee**:
Usable workspace per employee, calculated by dividing net area by total employees, excluding structural elements.

**grossAreaPerEmployee**:
Average total space per employee, combining utility floor, technical, and communication areas.

**utilityFloorSpacePerEmployee**:
Average utility space per employee, calculated by dividing utility floor space by total employees.

**grossAreaPerDimensionedAttendance**:
Average total space per attendee, including workspaces, technical, and communication areas.

**grossNetFactor**:
Ratio of gross area to net area, comparing additional features to usable workspace.

**dimensionedAttendance**:
Estimated number of workspace users at a time, based on employee count, attendance pattern, and over-occupancy.
