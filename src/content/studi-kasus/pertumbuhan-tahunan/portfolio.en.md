Year-on-year growth analysis case study · SQL · practice data

# 12.37% Growth Clears the 10% Bar, Carried by Volume and Four of Five Product Lines

Revenue at the fictional distributor RetailMax rose from Rp 5,120.15 million to Rp 5,753.58 million. That figure held after 2,020 dirty rows were removed, but only six of the twelve months of 2025 actually cleared the bar.

Mochamad Fajri Ilham Nurdin · completed October 2026 · full queries and their results: [Google Drive folder](https://drive.google.com/drive/folders/1KmSMKyHa7fL0Gdp-20WZ4ePFMs4QqNUi) · mfajriilhamn@gmail.com

The company and its data are fictional, made for Windata Academy practice. Every figure below is calculated from the same transaction file and can be recalculated by anyone.

## 1. Summary

**The problem.** RetailMax sells consumer goods to 200 retail outlets in five trade regions. Its head of finance will discuss Rp 12 billion of growth funding, and the term sheet holds one numeric condition: annual revenue must grow above 10%. What needs answering is whether that growth figure still holds once the data is cleaned and split by month, product line, and region.

**The core finding.** 2025 revenue grew 12.37% over 2024, 2.37 points above the bar. Gross margin also rose from 26.48% to 26.99%. The growth came from volume: units sold rose 15.57% while rupiah per unit in each line barely moved. The unevenness sits in two places. Only six of the twelve months of 2025 cleared 10%, and Grocery, the largest line with 24.98% of revenue, shrank 1.67%. All five regions grew within a narrow 9.88% to 15.04% range.

**The recommendation.** The 12.37% figure is fit to take to the meeting together with the monthly and per-line breakdowns. An answer on Grocery's decline needs preparing before it's asked, because it touches almost a quarter of revenue. Whether the funding itself is justified is a decision that needs material beyond this data.

## 2. How the data was cleaned

The raw file holds 40,800 rows. 38,780 rows are used to calculate growth. The difference, 2,020 rows or 4.95% of the file, leaves through four steps in order.

| Step | Rows left | Out | Reason |
| --- | --- | --- | --- |
| Raw file | 40,800 |  | The file's contents as they are. |
| 1. Duplicate orders | 40,000 | 800 | The same order sent more than once by the till. The copies aren't new sales. |
| 2. Empty order value | 39,515 | 485 | Rows without a rupiah value. If treated as zero, the order count rises without any sale. |
| 3. Returns separated | 38,922 | 593 | Returned goods, with negative values. Kept in their own table and not counted as sales. |
| 4. After the cut-off date | 38,780 | 142 | Orders dated after 31 March 2026, the last date with complete data. |

There are 148 rows dated after the cut-off, but only 142 leave in the fourth step. The other six had already left in steps two and three because their values were empty or negative. Both numbers are correct and answer different questions.

The order of the first step also shapes the result. 120 order numbers have a failed attempt with an empty value on the same date as the real transaction. I numbered the rows on the raw table by earliest date, then rows with a filled-in value, then rows with a positive value, so that the real transaction is the one kept.

If cleaning is skipped, growth reads as 13.09%. The error leans upward because the value of 2025's duplicates (Rp 113.50 million) is almost twice that of 2024's (Rp 63.83 million). The margin over the bar then looks looser than it really is.

## 3. Findings

**Finding 1. Half of 2025 grew below 10%.** The 12.37% annual figure is built from very different months: June only 3.83% and November 24.31%. January, February, May, June, July, and December are below the bar. A reader who only sees the annual figure will assume growth was even across the year.

**Figure 1. Year-on-year growth, the twelve months of 2025**

![figure 1](images/fig-1.svg)

*What it shows: Revenue growth for each month of 2025 against the same month of 2024, with a dashed line at 10%.*

*Data range: 38,780 clean orders from 200 outlets, January 2024 to December 2025.*

*What to see: Six green bars cross the line and six grey bars stop below it.*

**Finding 2. Four lines grew, the largest line shrank.** Snacks grew 32.49%, Beverages 19.21%, PersonalCare 15.52%, and Household 9.43%. Grocery fell 1.67%, even though it accounts for 24.98% of 2025 revenue, the largest share of the five lines. If that decline continues, the other four lines have to cover a growing hole. The breakdown by region shows Grocery fell in four of five regions, most deeply in Kalimantan (−5.16%) and JawaBarat (−4.35%), and its order count fell in all five regions.

**Figure 2. Growth by product line, 2025 against 2024**

![figure 2](images/fig-2.svg)

*What it shows: Each line's revenue growth in percent, sorted from fastest, with zero in the middle and the 2025 share in the right-hand column.*

*Data range: Two full years, 2024 and 2025. The first quarter of 2026 isn't included.*

*What to see: One bar points left, and that bar belongs to the line with the largest share.*

**Finding 3. The growth came from volume, and it's spread across the network.** Units sold rose from 304,245 to 351,627 (15.57%) and units per order from 18.08 to 19.95. Rupiah per unit in each line only shifted −0.11% to +0.05%, so the revenue increase didn't come from price. Each line's margin also rose by a similar amount, about half a point. On the retailer side, all 200 outlets ordered in both years with no new or departing outlets, 112 of them grew above 10%, and the median growth per outlet is 13.65%. The 12.37% figure doesn't depend on a handful of large retailers. Growth that comes from volume requires warehousing and delivery to grow too, and that needs to be part of the discussion about how the funds are used.

**Finding 4. The seasonal pattern isn't used to correct growth.** December (1.178) and March (1.167) are the busiest months, February (0.874) the quietest. This index explains the pattern in revenue levels, not corrected growth. A year-on-year comparison already compares the same month, so dividing it by this index counts the same thing twice. No figure in this file is called seasonally adjusted growth.

**Figure 3. Seasonal index for the twelve calendar months**

![figure 3](images/fig-3.svg)

*What it shows: Average revenue for each calendar month divided by the average of all months, with a dashed line at 1.*

*Data range: 27 months, January 2024 to March 2026. The divisor is Rp 459.06 million per month.*

*What to see: Two green bars, March and December, sit furthest above the line. February is the shortest.*

**Finding 5. Regional risk is covered.** All five regions grew 9.88% to 15.04%, much tighter than the range between lines, and none shrank. Jabodetabek grew fastest (15.04%) with a 33.13% share. JawaBarat is the only one below the bar, narrowly, at 9.88%. Combined growth doesn't depend on one market.

## 4. Limits of the conclusions

The data available is one table with ten columns: order number, date, outlet, city, region, product line, product, units, order value, and cost of goods. From that, there are some questions this file has no right to answer.

- Grocery's decline is proven and its location is visible, but its cause isn't. There are no columns about competitors, market prices, discounts, product launches, shelf changes, or marketing.
- The data stops on 31 March 2026. The first quarter of 2026 grew 12.79% over the first quarter of 2025, but one quarter isn't enough for a projection. Comparing 2026 to date with all of 2025 gives −73.57%, a meaningless figure because it compares three months with twelve.
- The margin rise of about half a point in every line is measured, but whether it came from cheaper purchase prices or a change of supplier can't be seen in this data.
- The growth condition is met. Whether Rp 12 billion of funding is justified is a decision that needs cash flow, liabilities, and a plan for using the funds.

## 5. Query appendix

The snippet that produces the main figures. It runs as it is.

```sql
WITH deduped_sales AS (
    SELECT *,
        ROW_NUMBER() OVER (
            PARTITION BY TxnID
            ORDER BY TxnDate ASC, Revenue IS NULL ASC, Revenue <= 0 ASC
        ) AS rn
    FROM yoy_growth.sales                 -- raw table, not yet filtered
),
clean_sales AS (
    SELECT *
    FROM deduped_sales
    WHERE rn = 1
      AND Revenue IS NOT NULL
      AND Revenue > 0
      AND TxnDate <= toDate('2026-03-31')  -- the cut-off is written as a fixed value
),
monthly_revenue AS (
    SELECT
        toStartOfMonth(TxnDate) AS month,
        ROUND(SUM(toFloat64(Revenue)), 2) AS total_revenue,
        ROUND(SUM(toFloat64(COGS)), 2) AS total_cogs,
        count() AS txn_count
    FROM clean_sales
    GROUP BY month
)
SELECT
    curr.month AS month,
    curr.total_revenue AS current_revenue,
    prev.total_revenue AS previous_revenue,
    ROUND((curr.total_revenue - prev.total_revenue) * 100
          / nullIf(prev.total_revenue, 0), 2) AS yoy_growth_pct
FROM monthly_revenue curr
INNER JOIN monthly_revenue prev
    ON curr.month = addMonths(prev.month, 12)
ORDER BY month ASC
```

The queries for the per-line and per-region breakdown, margin, seasonal index, and six consistency checks are in the full query file. All six checks pass: the monthly growth range, quarters summing to the same total as months, cost of goods never exceeding order value, no month-to-month jumps outside 0.33 to 3 times, the five regions summing to 2025 revenue, and no rows breaking the cleaning rules.

## 6. Data report

### Monthly revenue and year-on-year growth

| Month | Revenue (million) | Cost of goods (million) | Orders | Units | Margin | YoY growth |
| --- | --- | --- | --- | --- | --- | --- |
| Jan 2024 | 388.11 | 286.43 | 1,274 | 23,241 | 26.20% |  |
| Feb 2024 | 369.90 | 271.46 | 1,240 | 22,111 | 26.61% |  |
| Mar 2024 | 472.33 | 345.14 | 1,550 | 28,826 | 26.93% |  |
| Apr 2024 | 437.99 | 322.05 | 1,540 | 25,091 | 26.47% |  |
| May 2024 | 426.87 | 313.64 | 1,400 | 26,076 | 26.53% |  |
| Jun 2024 | 420.80 | 309.61 | 1,324 | 24,876 | 26.42% |  |
| Jul 2024 | 414.04 | 303.56 | 1,276 | 24,254 | 26.68% |  |
| Aug 2024 | 403.85 | 297.84 | 1,315 | 23,907 | 26.25% |  |
| Sep 2024 | 393.37 | 290.28 | 1,322 | 23,010 | 26.21% |  |
| Oct 2024 | 433.69 | 318.98 | 1,451 | 25,577 | 26.45% |  |
| Nov 2024 | 430.78 | 317.95 | 1,430 | 25,667 | 26.19% |  |
| Dec 2024 | 528.42 | 387.59 | 1,704 | 31,609 | 26.65% |  |
| Jan 2025 | 407.80 | 295.71 | 1,291 | 25,079 | 27.49% | 5.07% |
| Feb 2025 | 392.72 | 285.84 | 1,228 | 24,043 | 27.22% | 6.17% |
| Mar 2025 | 547.81 | 400.44 | 1,691 | 33,789 | 26.90% | 15.98% |
| Apr 2025 | 543.85 | 398.27 | 1,698 | 33,398 | 26.77% | 24.17% |
| May 2025 | 469.10 | 345.38 | 1,422 | 28,024 | 26.37% | 9.89% |
| Jun 2025 | 436.92 | 318.18 | 1,318 | 26,829 | 27.18% | 3.83% |
| Jul 2025 | 448.00 | 325.73 | 1,347 | 26,870 | 27.29% | 8.20% |
| Aug 2025 | 475.94 | 347.02 | 1,454 | 29,505 | 27.09% | 17.85% |
| Sep 2025 | 445.03 | 323.83 | 1,353 | 26,998 | 27.23% | 13.13% |
| Oct 2025 | 497.45 | 364.59 | 1,492 | 30,768 | 26.71% | 14.70% |
| Nov 2025 | 535.49 | 388.78 | 1,603 | 33,068 | 27.40% | 24.31% |
| Dec 2025 | 553.47 | 406.73 | 1,724 | 33,256 | 26.51% | 4.74% |
| Jan 2026 | 493.45 | 356.46 | 1,452 | 29,571 | 27.76% | 21.00% |
| Feb 2026 | 441.00 | 320.23 | 1,241 | 26,622 | 27.39% | 12.29% |
| Mar 2026 | 586.39 | 426.86 | 1,640 | 34,705 | 27.21% | 7.04% |

The twelve months of 2024 have no comparison, so their growth column is empty. Totals over 27 months: 38,780 orders and 746,770 units.

### Quarterly rollup

| Quarter | Revenue (million) | Cost of goods (million) | Orders |
| --- | --- | --- | --- |
| 2024 Q1 | 1,230.34 | 903.03 | 4,064 |
| 2024 Q2 | 1,285.66 | 945.30 | 4,264 |
| 2024 Q3 | 1,211.26 | 891.68 | 3,913 |
| 2024 Q4 | 1,392.89 | 1,024.52 | 4,585 |
| 2025 Q1 | 1,348.33 | 981.99 | 4,210 |
| 2025 Q2 | 1,449.87 | 1,061.83 | 4,438 |
| 2025 Q3 | 1,368.97 | 996.58 | 4,154 |
| 2025 Q4 | 1,586.41 | 1,160.10 | 4,819 |
| 2026 Q1 | 1,520.84 | 1,103.55 | 4,333 |

Assembled from the monthly table. The nine quarters sum to the same total as the 27 months at full precision, within one cent.

### Product lines and regions, 2025 against 2024

| Line or region | 2024 (million) | 2025 (million) | Growth | 2025 share | Unit growth |
| --- | --- | --- | --- | --- | --- |
| Snacks | 675.64 | 895.16 | 32.49% | 15.56% | 32.46% |
| Beverages | 1,024.65 | 1,221.49 | 19.21% | 21.23% | 19.22% |
| PersonalCare | 933.36 | 1,078.22 | 15.52% | 18.74% | 15.65% |
| Household | 1,024.74 | 1,121.37 | 9.43% | 19.49% | 9.38% |
| Grocery | 1,461.76 | 1,437.34 | -1.67% | 24.98% | -1.66% |
| Jabodetabek | 1,657.12 | 1,906.35 | 15.04% | 33.13% |  |
| JawaTimur | 1,144.90 | 1,290.53 | 12.72% | 22.43% |  |
| Kalimantan | 504.25 | 559.82 | 11.02% | 9.73% |  |
| Bali | 773.09 | 853.26 | 10.37% | 14.83% |  |
| JawaBarat | 1,040.79 | 1,143.62 | 9.88% | 19.88% |  |

Unit growth is only calculated per line. The five lines and the five regions each sum to Rp 5,753.58 million.
