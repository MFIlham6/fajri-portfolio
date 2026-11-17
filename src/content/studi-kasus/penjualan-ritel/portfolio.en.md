**Setting Branch Priorities from Point-of-Sale Data That Had Not Been Cleaned**

Retail sales analysis, ten-branch retail chain, Spreadsheet, 4,112 clean 2025 transactions from 5,145 raw rows

Mochamad Fajri Ilham Nurdin, completed October 2026, mfajriilhamn@gmail.com

*Data note: the figures below come from a simulated dataset that mimics the sales patterns of a multi-branch retailer. It is not real company data, and it is not presented as work experience at any company.*

## Summary

A ten-branch retail chain needed to decide which branches to prepare first for its biggest shopping period. The only material was one raw export from the point-of-sale system. Adding up that file as it was made 2025 sales read 23.6% too high, because the export also contained 2026 transactions. This analysis separates the period problem from the data-quality problem, then checks which conclusions still hold once both are fixed. The result: only two branches lead clearly enough to be prioritized.

## Business context

In this case scenario, the head of operations had to decide which branches get extra stock and staff first, and when to run the promotion. There was one night to do it, with no analyst team and no comparison report. Reading the order from the raw total would have included Rp 4.78 billion of out-of-period transactions and put the wrong branch in third place.

## Data

Point-of-sale export: 5,145 rows, nine columns, ten branches, four product categories. The dates run into 2026, past the period in question. There is no cost column, no promotion flag, and only one year of relevant data.

## How the work was done

1. The period was limited first, and data quality was checked after. The reason: out-of-period transactions added 23.6% to the total, while all the broken rows inside 2025 came to only 1.09% (both measured against the raw 2025 total).
2. Anomalies were checked by comparing Qty × Price with TotalSales. The TotalSales column holds no negative values at all, even though seven rows have a negative Qty or Price. Checking TotalSales alone would let all seven through.
3. Months were compared on the average per calendar day. Monthly totals are unfair to February, which has only 28 days.
4. Every conclusion was checked again, including splitting the start-of-month effect by month to see whether the pattern shows up in many months or only a few.

**Figure 1. The total swelled by almost a quarter because the period was not limited.**

![gambar 1](images/gambar-1.png)

*Steps from the raw export total of 5,145 rows to the clean 2025 total (Rp million). The bar for transactions outside 2025 is far taller than the two bars for broken rows.*

**Figure 2. Only the top two branches stand clearly apart from the rest.**

![gambar 2](images/gambar-2.png)

*Clean 2025 net sales by branch, one dot per branch, from 4,112 rows. The gap between Medan's blue dot and the highest gray dot, Surabaya Central, is much wider than the gaps between the gray dots.*

**Figure 3. February looks weak by monthly total but strong by daily average.**

![gambar 3](images/gambar-3.png)

*Each 2025 month's gap from its average, measured by monthly total and by average per calendar day, from 4,112 rows. February is below zero by total (gray bar) but above zero by daily average (blue bar). Eleven of the twelve months change rank, but apart from February they move only one or two places. The full ranking is in the table under the Dashboard tab.*

**Figure 4. The start-of-month surge only shows clearly in February and November.**

![gambar 4](images/gambar-4.png)

*Gap between the daily average on days 1 to 5 and the rest of the month, for each 2025 month, from 4,112 rows. The February and November bars are far taller than the other ten months.*

## Findings

1. Yogyakarta (Rp 2,456.3 million) and Medan (Rp 2,392.3 million) lead third place by Rp 321.9 million. The next five branches are only Rp 119.4 million apart, narrower than the gaps above and below them.
2. Of 5,145 rows, 1,000 fall outside the period, worth Rp 4,776,925,000: 995 transactions from January to March 2026 and 5 rows with scattered dates.
3. Seven 2025 rows have a negative Qty or Price while TotalSales stays positive, worth Rp 144,287,500. This anomaly is invisible if only the TotalSales column is checked.
4. Cleaning changed the total by only 1.09%, but that was enough to swap two pairs of branch rankings that differ by Rp 31.4 million and Rp 18.6 million.
5. February ranks 9th by monthly total but 2nd by daily average.
6. Days 1 to 5 are on average 13.7% busier than the rest of the month, while the weekend effect is only 4.0%. This start-of-month surge comes almost entirely from February and November. Without those two months, the start of the month is 2.5% lower.

## Impact on the decision

Read from the raw total, the ten branches would be ranked as ten priority levels, Surabaya East would sit in third place, and February would look like a quiet month. After cleaning, only the top two branches are far enough ahead to be a basis for priority. The five middle branches are treated as equal. For the promotion, the start of the month is worth a trial, but it is not yet strong enough to become a rule because the surge happened in only two months.

## Limits

There is no cost data, so there are no conclusions about profitability. There is no promotion flag, so the cause of the February and November surges cannot be confirmed. The weeks before Lebaran 2025 have not been analyzed separately. One year of data is not enough to claim a seasonal pattern. The negative rows are assumed to be input errors. If they turn out to be valid returns, their value must be recorded as negative, and Surabaya East drops from 4th to 7th place. The top two branches do not change.

## Appendix

A six-tab workbook with every formula visible, including a Cleaning Log that records the rupiah impact of each cleaning step and a Dashboard tab. The decision log records the assumptions and the data that was left out.
