Case Study, Subscription Customer Retention Analysis

# **New-Cohort Retention Appears to Collapse by 50 Points, and the Drop Turns Out to Be an Artifact of the Observation Window**

Cohort and retention analysis, subscription software company, Spreadsheet, scope of more than ten thousand users, 15 monthly cohorts

Mochamad Fajri Ilham Nurdin, completed October 2026, [mfajriilhamn@gmail.com](mailto:mfajriilhamn@gmail.com)

*Data note: the figures below come from a dataset designed to mimic software subscription patterns. It is not real company data, and it is not presented as work experience at any company.*

## **Context**

A two-year-old subscription software company for small and medium businesses, with four plan tiers from free to enterprise, was preparing its first funding round. The founder needed a retention matrix by sign-up cohort for the pitch deck. A number that collapses under questioning would damage trust in the whole deck, and the pitch was scheduled for the following week. The data only holds the last active date, not an activity history. So "retained" means the distance from sign-up date to last active date, and this definition tends to overstate.

## **The question**

"Build a retention matrix by cohort. Investors want to see whether newer cohorts retain better than older ones."

## **Approach**

I wrote the cleaning rules in order before calculating, including checks that came back zero. I inferred when the data was extracted from the spread of activity dates, because the file doesn't record it. The matrix was first built as-is so the shape of the flaw would be visible, then cells outside each cohort's observation window were blanked. Every difference between cohorts was tested by tightening the comparison conditions, and every calculation was repeated in revenue terms.

Three approaches were rejected. First, reading one matrix column from the oldest cohort to the youngest. It's the most natural way, but the order follows how long each cohort has been observed, not its quality. Second, treating the last measured cell in each row as final. Users who are still active may not have been recorded as active again before the cut-off date. Third, using user count as the only measure. Free users and the largest customers have very different effects on whether the business survives.

## **Findings**

1. **Almost 40% of users were last recorded as active in the same month.** That month is when the data was extracted, not a wave of churn. The count is double the previous month, and there is no activity at all after it.  
2. **The as-is matrix holds 47% of cells that were never measured but are written as zero.** Those zeros form a perfectly neat staircase, a regularity that can't come from customer behavior.  
3. **The 50.2-point drop in month-3 retention between cohorts turns out to be an artifact.** The range shrinks to 17.0, then 5.2, then 0.8 points when the comparison is limited to cohorts with equal windows. The same pattern appears in month 1 and month 6. Also, in the same calendar month, the churn rate is almost identical for old and young cohorts (difference ≤4 points). The numbers move with the calendar month.  
4. **The oldest cohort keeps 52.2% of its users at month 12, but 76.0% of its revenue.** That gap widens from 7.0 points in month 3 to 23.7 points in month 12, because 62% of the users who left were on the free tier.

**Figure 1. Zeros that form a neat staircase are cells that haven't been measured yet.**

![figure 1](images/gambar-1.png)

A matrix of 15 cohorts × 15 age columns. Note the edge of the staircase: each row down loses exactly one month of observation. Gray cells are time that hasn't passed yet, not zero percent retention.

**Figure 2. The range shrinks once the cohorts being compared have equal windows.**

![figure 2](images/gambar-2.png)

Month-3 retention range at four levels of condition strictness. Note that the range keeps shrinking at every stricter level, until it almost disappears.

**Figure 3. Two retention figures from the same cohort, and both are correct.**

![figure 3](images/gambar-3.png)

The only difference is the denominator: number of people or number of rupiah. The gap comes entirely from who left.

**Figure 4. Churn follows the calendar, not cohort age.**

![figure 4](images/gambar-4.png)

Combined monthly churn rate across all cohorts, by calendar month. The last three bars are mixed with users who haven't yet been recorded as active again. For the same reason, the last three cells in every matrix row can't be read as final retention yet.

## **Answer**

**It can't be answered with the data available yet.** The six cohorts with equal windows retain 87% to 93% at month 3. The range is 5.2 points, too narrow to state a direction. A full comparison becomes possible once the second-half cohorts reach a comparable age, in about six months.

## **Recommendation**

Present both retention figures side by side, with the lower one first. State the comparison conditions in the deck before anyone asks. Don't claim that retention is moving in any direction. Before the pitch, check the rise in churn over the last three months against subscription status data. Also fix the recording of negative revenue values on the free tier.

## **Limits**

"Retained" is measured from the last active date, not subscription status, so it tends to overstate. There is no plan-change history, so it can't be said how many free users eventually paid, and the per-plan findings don't support a decision to drop the free tier. Revenue retention here can't exceed 100%, unlike the measure commonly used in this industry. The data also can't separate users who truly left from those not yet recorded as active again before the cut-off date.

## **Audit trail**

| Conclusion | Robustness | What would overturn it |
| :---- | :---- | :---- |
| The data was cut at the end of the last month | Robust | Almost nothing: 38% of users pile up in one month, 2.1 times the previous month, with not a single date after it |
| The drop between cohorts is an artifact | Robust | The range shrinks steadily from 50.2 to 0.8 points, with the same pattern at three ages |
| Revenue retention is far above user retention | Robust | The gap widens consistently at months 3, 6, 9, and 12 |
| Comparable cohorts behave similarly | Fragile | Only six cohorts, all from the first half, and their churn also rises with the calendar |
| Retention is improving or getting worse | Not supported | The data doesn't yet cover enough to answer in either direction |

Available artifacts: a workbook with every formula visible (six contract sheets plus validation, comparison-test, and cut-off-date sheets). The cleaning log records eight ordered rules, three checks that came back zero, and the basis for inferring the extraction date. The matrix is available in two versions, before and after window limiting, and all seven validation gates passed. Everything can be shared on request, with absolute numbers masked.
