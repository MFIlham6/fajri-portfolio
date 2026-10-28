**The Retention Budget Was About to Be Split Between Two Departments, Yet All Seven Differ by Only 7.3 Points**

Employee retention analysis · mid-sized technology company · Spreadsheet · 1,980 clean employee records from 2,010 raw rows

Mochamad Fajri Ilham Nurdin · completed October 2026 · mfajriilhamn@gmail.com

*Data note: the figures below come from a simulated dataset that mimics the staffing patterns of a technology company. It is not real company data, and it is not presented as work experience at any company.*

**Summary.** A mid-sized technology company wanted to split its retention budget between two departments and asked for an analysis to decide which two. I did that analysis, and it shows all seven departments sit within a 7.3 percentage-point range, too close together to split a budget on. This work offers a replacement grouping that separates 7.6 to 9.4 times more sharply.

**Why this report exists.** Next quarter's retention budget only covers two departments, and the CEO will decide the split at the quarterly review. That decision will be made with or without an analysis. Without this one, the budget follows a ranking that could flip if just 22 people had a different status, and two departments get labeled "problem departments" in front of the whole organization.

**Data.** An HR system export: 2,010 rows, ten columns, seven departments, a snapshot as of 1 April 2026. After cleaning, 1,980 employees remain. There are no resignation dates, resignation reasons, or line-manager data, and the promotion-date column can't be used because 240 of its dates fall after the reference date.

**What I did.** I did the requested analysis first and in full, because without its numbers, saying "this can't be used" is only an opinion. I then tested four other groupings for comparison, crossed the two strongest to check whether they measure the same thing, and checked workload by department to rule out the idea that departments differ because of their workload. Rejected approach: dropping every row with an empty cell, which would remove 32.0% of employees, even though an empty promotion date means never promoted, not missing data. Also rejected: checking data quality only through empty cells and negative values. Both reported the data as clean, yet five employees were recorded as working 26 to 29 hours a day.

**Figure 1. Departments separate by 7.3 points; working hours and satisfaction by 7.6 and 9.4 times as much.**  
![figure 1](images/gambar-1.png)  
*Range of resignation rates across five ways of grouping the 1,980 clean employee records. Note how short the orange department bar and the two gray bars are next to the two blue ones.*

**Figure 2. Zero out of 263 people, then higher in every group, up to more than half.**  
![figure 2](images/gambar-2.png)  
*Resignation rate across five groups of daily working hours, from 1,980 clean records. Note the first bar, which has zero length, and the bar length rising in each following group.*

**Figure 3. Satisfaction still makes a difference once working hours are held equal.**  
![figure 3](images/gambar-3.png)  
*Resignation rate for six combinations of working hours and satisfaction, from 1,980 clean records. Note that in every row the blue bar (satisfaction below 3.0) is longer than the gray one, and the short-hours row has no blue bar because there are no such employees.*

**Findings.**

* All seven departments sit within a 7.3 percentage-point range (14.2% to 21.5%). For the top department, 22 people with a different status would be enough to move it to the bottom.  
* Working hours separate by 56.1 points and satisfaction by 69.0 points, 7.6 and 9.4 times the department range. Of the 263 employees working under eight hours a day, not one resigned.  
* The two strongest factors move together but don't replace each other: among employees working 11 hours or more, satisfaction below 3.0 goes with a resignation rate 48.1 points higher (68.1% vs 20.0%).  
* Two popular assumptions are not supported by the data: employees with a performance score above 4.0 resign at 17.2%, almost the same as the 17.8% average, and the lowest and highest salary groups resign at almost the same rate (19.0% and 18.0%).

**What changed in the decision.** Before the analysis, the budget would have been split between two departments based on their ranking. Afterwards, the target becomes the 360 employees working 11 hours or more: 18.2% of employees who account for 57.4% of resignations and who are found in every department (16.1% to 20.7% of each), so a split by department is no longer relevant. One program is enough, aimed at long hours and low satisfaction together, because both factors meet in the same group. In addition, the working-hours input now has a range check after five impossible records were found.

**Limits.** All the data is a single snapshot with no sequence of events, so there is no valid cause-and-effect conclusion, only association. A third, unrecorded factor could explain the same numbers. There are no exit interviews, no line-manager data, no job-level distinction, and the promotion-date column can't be used.

**Audit trail.** A nine-tab workbook with every formula visible, a cleaning log that also records decisions to keep data, a comparison table of the five groupings, and a decision log listing the assumptions and the impact of each cleaning decision.
