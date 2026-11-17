**The Retention Budget Was About to Be Split Between Two Departments, Yet All Seven Differ by Only 7.3 Points**

Employee retention analysis, mid-sized technology company, Spreadsheet, 1,980 clean employees from 2,010 raw rows, time spent: 24 hours

Mochamad Fajri Ilham Nurdin, completed October 2026, mfajriilhamn@gmail.com

*Data note: the figures below come from a simulated dataset that mimics the staffing patterns of a technology company. It is not real company data, and it is not presented as work experience at any company.*

## Summary

A mid-sized technology company planned to split its retention budget between two departments and asked for an analysis to decide which two. That analysis was done, and it shows all seven departments sit within a range of 7.3 percentage points, a gap that can still arise by chance. This work offers two replacement groupings, working hours and satisfaction, which separate attrition 7.6 and 9.4 times more sharply.

## Why this report exists

Next quarter's retention budget only covers two departments, and the CEO will decide the split at the quarterly review meeting. The decision will be made with or without an analysis. Without this one, the budget would follow a ranking that can flip if just 22 people had a different status, and two departments would carry a "problem" label without a solid basis.

## Data

HR system export: 2,010 rows, ten columns, seven departments, a snapshot as of 1 April 2026. After cleaning, 1,980 employees remain. There is no resignation date, resignation reason, or direct-manager data, and the promotion date column is unusable because 240 of its dates fall after the reference date.

## What was done

The requested analysis was done first and in full, because without its figures the statement "not usable" is only an opinion. The differences between departments were then tested with chi-square, to check whether the 7.3-point gap is larger than what can arise by chance. After that, four other groupings were tested for comparison, the two strongest were crossed to check whether they measure the same thing, and workload per department was checked to rule out the idea that departments differ because of their workload. Rejected approach: dropping every row with an empty cell, which would remove 32.0% of employees, when an empty promotion date is assumed to mean never promoted rather than missing data. Also rejected: checking data quality only through empty cells and negative values. Both report clean, even though five employees are recorded as working 26 to 29 hours a day.

**Figure 1. Range of resignation rates across five ways of grouping employees.**

![gambar 1](images/gambar-1.png)

*Range of resignation rates across five ways of grouping 1,980 clean employees. Note that the three gray bars are much shorter than the two blue bars.*

**Figure 2. Resignation rate by daily working-hours group.**

![gambar 2](images/gambar-2.png)

*Resignation rate in five groups of working hours per day, from 1,980 clean employees. Note the first bar at zero height, and the bar height rising in each following group.*

**Figure 3. Resignation rate by working hours and satisfaction combined.**

![gambar 3](images/gambar-3.png)

*Resignation rate for six combinations of working hours and satisfaction, from 1,980 clean employees. Note that in every row the orange bar (satisfaction below 3.0) is longer than the gray bar, and the short-hours row has no orange bar because there are no such employees.*

## Findings

1. All seven departments sit within a range of 7.3 percentage points (14.2% to 21.5%), and the chi-square test found no difference beyond chance (p = 0.30). If 22 of the 62 HR employees who resigned had stayed, HR would move from the top rank to the bottom.
2. Working hours separate attrition by 56.1 points and satisfaction by 69.0 points, 7.6 and 9.4 times the department range. Of the 263 employees working under eight hours, not one resigned.
3. The two strongest factors move together but don't replace each other: among employees working 11 hours or more, satisfaction below 3.0 goes with a resignation rate 48.1 points higher (68.1% versus 20.0%).
4. Two common assumptions are not supported by the data: employees with a performance score above 4.0 resigned at 17.2%, almost the same as the 17.8% average, and the lowest and highest salary groups resigned at almost the same rate (19.0% and 18.0%).

## Proposed decision

The original request split the budget between two departments by ranking. This analysis proposes targeting the 360 employees working 11 hours or more, 18.2% of staff who account for 57.4% of resignations and who are present in every department (16.1% to 20.7% of each). That group is smaller than HR and Marketing combined (592 employees), so it fits the same budget without choosing departments. One program is enough, prioritizing long-hours employees whose satisfaction is below 3.0, because the two factors meet in the same group. Working hours are used here to choose who to target. Whether reducing working hours lowers resignations needs to be tested in one group first. In addition, the working-hours input needs a range check after five impossible records were found.

## Limits

All the data is a snapshot of one point in time with no order of events, so no valid cause-and-effect conclusion can be drawn, only associations. A third, unrecorded factor could explain the same figures. There are no exit interviews, no direct-manager data, and no job-level distinction, and the promotion date column cannot be used.

## Trace

A ten-tab workbook (nine analysis tabs and one Dashboard) with every formula visible, a cleaning log that also records the decisions to keep data, a comparison table of the five groupings, and a decision log with the assumptions and the impact of each cleaning decision.
