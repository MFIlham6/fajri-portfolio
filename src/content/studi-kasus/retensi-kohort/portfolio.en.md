Case Study: Subscription Customer Retention Analysis

**New-Cohort Retention Appears to Collapse by 50 Points, and Most of the Drop Is an Artifact of the Observation Window**

Cohort and retention analysis, subscription software company, Spreadsheet, more than ten thousand users, 15 monthly cohorts, time spent: 24 hours

Mochamad Fajri Ilham Nurdin, completed October 2026, mfajriilhamn@gmail.com

*Data note: the figures below come from a dataset designed to mimic software subscription patterns. It is not real company data, and it is not presented as work experience at any company.*

## Context

A subscription software company for small and medium businesses, two years old with four plans from free to enterprise, is preparing its first fundraising round. The founder needs a retention matrix by sign-up cohort for the pitch material. A figure that collapses under questioning would damage trust in the whole deck, and the presentation is scheduled for the following week. The data only holds the last-active date, not an activity history. So "retained" means the gap from the sign-up date to the last-active date, and this definition tends to overstate.

## Question

"Build a retention matrix by cohort. Investors want to see whether new cohorts retain better than old ones."

## Approach

Cleaning rules were written in order before calculating, including checks that came back zero. When the data was pulled was inferred from the spread of activity dates, because the file doesn't record it. The matrix was built as-is first so the shape of its defect could be seen, then cells outside each cohort's observation window were emptied. Every difference between cohorts was tested by tightening the comparison conditions, the remaining gap was tested statistically, and every calculation was repeated in revenue terms.

Three approaches were rejected. The first: reading one matrix column from the oldest cohort to the youngest. It is the most natural reading, but the order follows how long each cohort has been observed, not its quality. The second: treating the last measured cell in each row as final. Users who are still active may not have been recorded as active again before the cut-off date. The third: using user count as the only measure. Free users and the biggest customers affect the survival of the business very differently.

## Findings

1. Almost 40% of users were last recorded as active in the same month. That month is when the data was pulled, not a wave of churn. Its count is double the month before, and there is no activity at all after it.
2. The as-is matrix holds 47% cells that were never measured but are written as zero. Those zeros form a perfectly neat staircase, a regularity that cannot come from customer behavior.
3. Most of the 50.2-point drop in month-3 retention between cohorts is an artifact. The range shrinks to 17.0, then 5.2, then 0.8 points as the comparison is limited to cohorts with an equivalent window, and the same pattern appears in month 1 and month 6. The remaining gap is real: among the six comparable cohorts, the May and June 2025 cohorts retained 87.7% at month 3, below the January to April cohorts (92.1%), and this gap is too large to be chance (z = 4.5). It lines up with a churn rate that rises by calendar month. In settled calendar months, the churn rates of old and young cohorts differ by only 4 points or less.
4. The oldest cohort keeps 52.2% of its users at month 12, but 76.0% of its revenue. The gap widens from 7.0 points at month 3 to 23.7 points at month 12, because 62% of the users who left came from the free plan. The month-12 figure is still provisional because it is only two months from the cut-off date. The settled month-9 figures are 71.1% of users and 90.8% of revenue.

**Figure 1. The as-is retention matrix, 15 cohorts × 15 age columns.**

![gambar 1](images/gambar-1.png)

*Note the staircase edge: each row down loses exactly one month of observation. Gray cells are time that hasn't passed yet, not zero percent retention.*

**Figure 2. Range of month-3 retention between cohorts at four levels of conditions.**

![gambar 2](images/gambar-2.png)

*Each bar is the gap between the highest and lowest cohort. Note how far the range shrinks at each stricter level, and the remaining 5.2 points under the six-month condition used in the answer.*

**Figure 3. User retention and revenue retention of the January 2025 cohort.**

![gambar 3](images/gambar-3.png)

*Only the denominator differs: number of people or number of rupiah. Note the gap widening from month 3 to month 12, as more free users leave.*

**Figure 4. Monthly churn rate of all cohorts combined, by calendar month.**

![gambar 4](images/gambar-4.png)

*The last three bars are mixed with users who haven't been recorded as active again yet. So the last three cells in every matrix row can't be read as final retention either.*

## Answer

It can't be answered yet with the available data, and the data that exists does not show new cohorts doing better. The six cohorts with an equivalent window retained 87% to 93% at month 3, and the May and June 2025 cohorts sit 4 to 5 points below the January to April cohorts. That gap can't yet be separated from the rise in churn by calendar month. A full comparison only becomes possible once the second-half cohorts reach a comparable age, about six months from now.

## Recommendation

Present both retention figures side by side, with the lower figure first, and mark the month-12 figure as provisional. State the comparison conditions in the pitch material before anyone asks. Don't claim retention is improving, and mention that the remaining gap between cohorts hasn't been separated from the calendar effect. Before the presentation, check the rise in churn over the last three months against subscription status data. Ask the recording team to explain the ten rows with negative MRR, six of them on the free plan.

## Limits

"Retained" is measured from the last-active date, not subscription status, so it tends to overstate. There is no plan-change history, so it can't be said how many free customers eventually paid, and the per-plan findings don't support a decision to end the free plan. Revenue retention here can't exceed 100%, unlike the measure commonly used in this industry. The data also can't separate users who truly left from those not yet recorded as active again before the cut-off date.

## Trace

| Conclusion | Robustness | What would overturn it |
|---|---|---|
| The data was cut off at the end of the last month | Robust | The export log names another date, or a re-export shows active dates after 31 March 2026 for the same users |
| Most of the drop between cohorts is an artifact | Robust | The July to December 2025 cohorts, once their window is equivalent in September 2026 data, still differ from the first-half cohorts by tens of points |
| Revenue retention is far above user retention | Robust | The recorded MRR is not the MRR at the time the user left, for example free users who left had previously paid |
| The May and June 2025 cohorts are lower because of a calendar effect | Fragile | In the same calendar months, the May and June cohorts still churn faster than the January to April cohorts |
| Retention is improving or worsening | Not supported | Subscription status data for late 2025 to early 2026, which could separate the calendar effect from cohort quality |

Available artifacts: a 12-sheet workbook with every formula visible, from raw data, cleaning, and the matrix to validation, comparison tests, the cut-off date, and window-edge checks. The cleaning log records eight rules in order, four checks that came back zero, and the basis for inferring the extraction date. The matrix is available in two versions, before and after the window limit, and all 18 validation checks pass. Everything can be shared on request, with absolute figures masked.
