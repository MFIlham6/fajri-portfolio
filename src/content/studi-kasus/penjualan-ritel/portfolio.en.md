**Total Sales Were Inflated by 23.6% Before a Single Broken Row Was Touched**

Retail sales analysis · ten-branch retail chain · Spreadsheet · 4,112 clean 2025 transactions from 5,145 raw rows

Mochamad Fajri Ilham Nurdin · completed October 2026 · mfajriilhamn@gmail.com

*Data note: the figures below come from a simulated dataset that mimics the sales patterns of a multi-branch retailer. It is not real company data, and it is not presented as work experience at any company.*

**Summary.** A ten-branch retail chain was preparing for its biggest shopping period using one raw export from its point-of-sale system. Adding up the file as it was made the total 23.6% too high, because the export also contained the following year's transactions. This analysis separates the scope problem from the data-quality problem, then tests which conclusions still hold once both are fixed.

**Why this report exists.** The head of operations had to decide which branches get extra stock and staff first, and when to launch the promotion. There was one night to do it, with no analyst team and no comparison report. The decision would be made either way. Without this analysis, the order would have been read from the raw totals, which included Rp 4.99 billion of out-of-period transactions and put the wrong branch in third place.

**Data.** A point-of-sale export: 5,145 rows, nine columns, ten branches, four product categories. The date range runs past the period in question, into 2026. There is no cost column, no promotion flag, and only one year of relevant data.

**What I did.** I limited the period first, before checking data quality. The reason is measurable: the scope error shifts the total by 23.6%, while all the broken rows inside 2025 add up to only 1.09%. I then checked for anomalies through the component columns, comparing Qty × Price with TotalSales. Rejected approach: checking for anomalies in the TotalSales column alone. In this file that column has no negative values at all, even though seven rows have a negative Qty or Price. Also rejected: comparing months by their monthly totals, because February has only 28 days. Finally, I re-tested every conclusion, including splitting the yearly average by month to see whether the pattern repeats.

**Figure 1. The number grew by almost a quarter because the period was not limited.**  
![figure 1](images/gambar-1.png)  
 *Total transaction value from the 5,145 exported rows compared with the 4,145 rows that fall in 2025. Note that the gap appears before a single broken row is removed.*

**Figure 2. Only the top two branches stand clearly apart from the rest.**

![figure 2](images/gambar-2.png)  
 *All ten branches on the 2025 net sales axis, from 4,112 rows. Note the width of the gap on the right compared with the width of the five-point cluster in the middle.*

**Figure 3. Eleven of twelve positions move once the denominator is made equal.**

![figure 3](images/gambar-3.png)  
 *Ranking of the twelve months of 2025 by total and by average per calendar day, from 4,112 rows. Note the orange February line and the only flat line.*

**Figure 4. The start-of-month effect only shows clearly in February and November.**

**![figure 4](images/gambar-4.png)**

*Difference in average daily sales between the 1st to 5th and the rest of the month, for each month of 2025, from 4,112 rows. Note the height of the February and November bars compared with the other ten months.* 

**Findings.**

1. Of 5,145 rows, 1,000 fall outside the period, worth Rp 4,776,925,000: 995 transactions from January to March 2026 and 5 rows with scattered dates.  
2. Seven 2025 rows have a negative Qty or Price but a positive TotalSales, worth Rp 144,287,500. This anomaly can't be seen from the TotalSales column.  
3. Cleaning shifts the total by only 1.09%, but that is enough to swap two pairs of branch rankings that differ by Rp 31.4 million and Rp 18.6 million.  
4. The 1st to the 5th of the month are on average 13.7% busier than the rest of the month, while the weekend effect is only 4.0%.

**What changed in the decision.** Before the analysis, the ten branches would have been ranked as ten tiers from the raw totals, and February would have been treated as a quiet month. Afterwards, only the top two branches are far enough apart to base priorities on, with a gap of Rp 321.9 million to third place. The five branches in the middle sit within Rp 119.4 million of each other, narrower than the gaps on either side, so they are treated as equal. Promotion timing moves from weekends to just before the 1st, because the payday effect is three times larger.

**Limits.** There is no cost data, so there are no conclusions about profitability. There is no promotion flag, so the cause of the February and November spikes can't be confirmed. One year of data is not enough to claim a seasonal pattern. Negative rows are assumed to be input errors; if they turn out to be legitimate returns, ranks 3 and 4 could swap.

**Audit trail.** A five-sheet workbook with every formula visible, a cleaning log with the rupiah impact of each decision, and a decision log listing the assumptions and the data that was removed.
