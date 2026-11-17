**The Revenue Target Was About to Be Built from 24.6% Growth, Yet Early-Year Volume Had Already Stopped Rising**

Revenue forecast, mid-sized company, Spreadsheet, 482 clean financial records from 500 raw rows, 27 months, time spent: 24 hours

Mochamad Fajri Ilham Nurdin, completed October 2026, mfajriilhamn@gmail.com

*Data note: the figures below come from a simulated dataset that mimics the financial records of a mid-sized company. It is not real company data, and it is not presented as work experience at any company.*

## Summary

A mid-sized company planned to set its annual revenue target from the previous year's 24.6% growth. That figure is correct, but breaking it down shows that all of the increase came from a higher number of transactions, and in the first quarter of the current year that number had stopped rising. This work produces a forecast as a range, one budget figure with its reasoning, and a list of indicators that can be tracked monthly.

## Why this report exists

The target figure decides more than the contents of the budget document: it becomes the basis for each team's targets, hiring plans, and the cost ceiling that can be planned. The finance lead asked for one figure for the budget meeting. Too high, and the whole organization chases volume it doesn't yet have capacity for; too low, and resources aren't prepared.

## Data

Financial records for 27 months, five hundred rows, with date, revenue, cost, profit, and five categories. 482 rows remain after cleaning. There is no customer data, no unit count, and no event markers such as campaigns or price changes, and cost is recorded as one combined figure. The last period contains only three months.

## What was done

Year-over-year growth was broken into two components, the number of transactions and the average value per transaction. The pattern was tested across all 27 months with correlation, then repeated by category to check whether the mechanism holds in every part. The forecast was built by locking the component that proved stable and varying the component that moves. Rejected approach: treating the last three months as an annual point, because as a total it looks like a 74.3% drop when the period is only a quarter of a year. Also rejected: judging cleaning unnecessary because its impact on the total is only 1.4%. In the monthly breakdown, which is the basis of the forecast, eleven of the twelve months shifted, by up to 18.7%.

**Figure 1. The growth came from the number of transactions, while value per transaction fell.**

![gambar 1](images/gambar-1.png)

*Change in three measures from the first year to the second, calculated from 482 clean rows. Note that the transaction count bar is longer than the revenue bar, and the third bar points the other way.*

**Figure 2. The same period gives three different conclusions, depending on how it is compared.**

![gambar 2](images/gambar-2.png)

*Three ways of comparing January to March of the current year with the year before, all from 482 clean rows. Note that only the blue bar compares equivalent periods, and its direction differs from the bar above it.*

**Figure 3. Transaction count moves with revenue; value per transaction barely moves.**

![gambar 3](images/gambar-3.png)

*Revenue and transaction count per month, one dot per month from 27 months of clean data. Note that the dots form a tight rising band (r = 0.967). Value per transaction, almost flat around Rp 32.3 million, is in the fourth chart of the Dashboard tab.*

## Findings

1. Revenue rose 24.6%, transaction count rose 26.9%, and the average value per transaction fell 1.8%. The growth came from volume, and in all five categories the transaction count moved further than value per transaction.
2. Over 27 months, monthly revenue correlates 0.967 with transaction count, while value per transaction has no trend over time (r = −0.194) and stays between Rp 28.3 and 34.7 million, averaging Rp 32.3 million.
3. The last period gives three conclusions depending on how it is compared: down 74.3%, up 2.9%, or down 12.8%. Only the third is like for like, and there the transaction count fell 10.4%. Three months are too few to confirm a direction, but enough not to assume last year's pace will continue.
4. Cleaning 18 rows moved the total by only 1.4%, but it moved eleven of the twelve monthly figures of the second year, the largest by 18.7%, so the shape of the curve used for forecasting changed even though the total barely did.

## What changed in the decision

Before the analysis, the target would have been built by extending 24.6% growth. After it, the target is built from two components multiplied: value per transaction, locked because it is stable, and transaction count, varied from flat to repeating last year's pace. The result is a range of Rp 7.6 to 9.7 billion with a midpoint of Rp 8.7 billion. The proposed budget figure is Rp 7.6 billion, because the first-quarter transaction pace matches the flat scenario, and the gap to the upper bound is a management decision about adding capacity that hasn't been made yet. The tracked indicator also changes, from revenue to transaction count per month.

## Limits

The data has no customers or unit counts, so the cause of the volume increase can't be confirmed: it could be more customers, existing customers ordering more often, or a change in how records are kept. A 27-month span is too short to claim a seasonal pattern, so the first-quarter drop can't be separated into season and slowdown. The forecast is calculated one year ahead from the last full year. The first quarter of the second year was its strongest; if that pattern repeats, the current first-quarter pace is equivalent to about Rp 6.8 billion, below the budget figure. A forecast talks about a period that hasn't happened yet, so what can be judged is its assumptions, not the accuracy of its figures.

## Trace

A seven-sheet workbook, including the Dashboard that sources all three figures, with every formula visible, a cleaning log that also records four checks that came back zero, the three-component growth breakdown side by side, growth by category, the forecast's assumptions and the conditions that would invalidate it written inside the workbook, and the results of seven validation checks.
