**RetailMax revenue grew 12.37% and cleared the 10% bar, carried by larger orders in four of five product lines**

Revenue at the fictional distributor RetailMax rose from 5,120.15 million to 5,753.58 million rupiah. That figure holds after 2,020 dirty rows were removed and stays above 10% in three of the four quarters of 2025. The only line that shrank, Grocery, lost 8.35% of its orders.

Mochamad Fajri Ilham Nurdin, completed October 2026, full queries and results: Google Drive folder, mfajriilhamn@gmail.com

The company and its data are fictional, made for Windata Academy practice. Every figure below is calculated from the same transaction file and can be recalculated by anyone.

## Summary

The problem. RetailMax sells consumer goods to 200 retail outlets in five sales regions. Its head of finance will discuss Rp 12 billion of growth funding, and the term sheet has one numeric condition: annual revenue must grow above 10%. What needs answering is whether that growth figure still holds after the data is cleaned and broken down by month, product line, and region.

The core finding. 2025 revenue grew 12.37% over 2024, 2.37 points above the bar, and 12.27% once returns are subtracted. Gross margin also rose from 26.48% to 26.99%. The growth came from what's inside each order: orders rose 4.72%, units per order rose 10.34%, and rupiah per unit in each line stayed almost the same. By quarter, growth was 9.59% to 13.89%. Grocery, the largest line with 24.98% of revenue, shrank 1.67%, with orders down 8.35%. All five regions grew, by 9.88% to 15.04%.

The recommendation. The 12.37% figure is fit to take to the meeting together with the quarterly and per-line figures. An answer on the drop in Grocery orders should be ready before anyone asks, because that line holds almost a quarter of revenue. Whether the funding makes sense is a decision that needs material outside this data.

## How this data was cleaned

The raw file has 40,800 rows. 38,780 rows are used to calculate growth. The difference, 2,020 rows or 4.95% of the file, leaves through four steps in order.

| Step | Rows left | Removed | Why |
|---|---|---|---|
| Raw file | 40,800 |  | The file's contents as they are. |
| 1. Duplicate orders | 40,000 | 800 | The same order sent more than once by the till. The copies are not new sales. |
| 2. Empty order value | 39,515 | 485 | Rows without a rupiah value. Counted as zero, they would add orders without any sale. |
| 3. Returns set aside | 38,922 | 593 | Returned goods, with a negative value. Kept in a separate table and not counted as sales. |
| 4. After the cut-off date | 38,780 | 142 | Orders dated after 31 March 2026, the last date with complete data. |

There are 148 rows dated after the cut-off, but only 142 leave in step four. The other six had already left in steps two and three because their value was empty or negative. The 148 figure is counted from canonical rows, the 142 figure is counted at step four.

The order of the first step also shapes the result. 120 order numbers have a failed attempt with an empty value on the same date as the real transaction. I numbered rows over the raw table ordered by earliest date, then rows with a value filled in, then rows with a positive value, so the real transaction is the one kept.

If cleaning is skipped, growth reads 13.09%. Most of that 0.72-point gap comes from duplicates: the value of 2025 duplicates (113.50 million) is almost twice that of 2024 duplicates (63.83 million), while returns only rose from 77.30 million to 91.73 million. Duplicate rows themselves rose from 291 to 389, much faster than orders.

## Findings

Finding 1. Three of the four quarters of 2025 grew above 10%. The first quarter grew 9.59%, the second 12.77%, the third 13.02%, and the fourth 13.89%. Monthly figures swing more, from 3.83% (June) to 24.31% (November), and six months fall below 10%. Part of that swing comes from the comparison month. December 2024 jumped 22.67% over November 2024, so December 2025, up 3.36% over November 2025, grew only 4.74% year on year. The standard deviation of monthly growth is 7.24 points. If every month grew 12.37% with a spread of 4 to 5 points, six months below 10% would still appear with an 8 to 15% chance, so those six months are not yet a sign of weakening growth.

**Figure 1. Revenue growth in each month of 2025 against the same month of 2024**

![gambar 1](images/gambar-1.png)

What it shows. Revenue growth in each month of 2025 against the same month of 2024, with a dashed line at 10%.

Data range. 38,780 clean orders from 200 outlets, January 2024 to December 2025.

What to notice. Six red bars stop below the line and six gray bars pass it.

Finding 2. Four lines grew; Grocery lost orders. Snacks grew 32.49%, Beverages 19.21%, Personal Care 15.52%, and Household 9.43%. Grocery fell 1.67% in rupiah, even though it accounts for 24.98% of 2025 revenue, the largest share of the five lines. The stronger signal is in its order count: 4,802 to 4,401, down 8.35% (z = −4.18). Grocery's rupiah per order rose 7.29%, so its rupiah drop is small. Grocery orders fell in all five regions by a similar amount, from 6.2% (Jabodetabek) to 11.7% (Kalimantan), and the differences between regions aren't meaningful (chi-square 1.05, df 4). As a measure of impact: without the Grocery drop, total growth would be 12.85%, and the 121.41 million of headroom above the bar equals 8.45% of Grocery's 2025 revenue.

**Figure 2. Growth by product line, 2025 against 2024**

![gambar 2](images/gambar-2.png)

What it shows. Each line's revenue growth in percent, sorted from fastest, with the zero line as the divider. Each line's 2025 share is in the product line and region table in the Data report section.

Data range. Two full years, 2024 and 2025. The first quarter of 2026 isn't included.

What to notice. One red bar points left: Grocery, the line with the largest share.

Finding 3. The growth comes from what's inside each order, and it's spread across the network. Orders rose 4.72%, from 16,826 to 17,621. Units sold rose 15.57% (304,245 to 351,627), because units per order rose from 18.08 to 19.95. Rupiah per unit in each line moved only −0.11% to +0.05%, so the revenue increase didn't come from price. Combined rupiah per unit fell 2.77% because the mix shifted toward lines that are cheaper per unit, mainly Snacks. Each line's margin rose by a similar amount, about half a point. On the retailer side, all 200 outlets ordered in both years with no new or departed outlets: 112 grew above 10%, 41 grew 0 to 10%, 47 shrank, and the median growth per outlet is 13.65%.

Finding 4. The seasonal pattern isn't used to adjust growth. Averaging 2024 and 2025, December (1.194) and March (1.126) are the busiest months and February (0.842) the quietest. The 27-month index in the query file (March 1.167, February 0.874) gives January to March three observations, including 2026, which is already higher because of growth, so those three months are lifted. A year-on-year comparison already compares the same months, so dividing it again by a seasonal index would count the seasonal pattern twice.

**Figure 3. Seasonal index for each calendar month, average of 2024 and 2025**

![gambar 3](images/gambar-3.png)

What it shows. Average revenue for each calendar month in 2024 and 2025 divided by the average of those 24 months, with a dashed line at 1.

Data range. 24 months, January 2024 to December 2025. The divisor is 453.07 million rupiah a month.

What to notice. Two red bars, March and December, sit furthest above the line. February is the shortest.

Finding 5. No region shrank. All five regions grew 9.88% to 15.04%, a tighter range than between lines. Jabodetabek grew fastest (15.04%) with a 33.13% share. West Java grew 9.88%, but the 10% bar applies to the total, and without the Grocery drop that region grew 11.13%.

## Limits of the conclusion

The available data is one table with ten columns: order number, date, outlet, city, region, product line, product, units, order value, and cost of goods. From that, there are some questions this file has no right to answer.

- The drop in Grocery orders is proven; its cause isn't. There are no columns about competitors, market prices, discounts, product launches, shelf changes, or marketing.
- The data stops on 31 March 2026. The first quarter of 2026 grew 12.79% over the first quarter of 2025, but one quarter isn't enough for a projection. Comparing 2026 so far with all of 2025 gives −73.57%, a meaningless figure because it compares three months with twelve.
- The margin rise of about half a point in every line is measured, but whether it comes from cheaper purchase prices or a change of supplier can't be seen from this data.
- I haven't seen the term sheet's definition of revenue. After returns are subtracted, growth is 12.27%, and trade discounts, if any, aren't recorded in this data. Whether Rp 12 billion of funding makes sense is a decision that needs cash flow, liabilities, and a plan for using the funds.

## Query appendix

The excerpt that produces the main figure. It can be run as it is on ClickHouse.

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

The queries for the line and region breakdowns, margin, seasonal index, and six consistency checks are in the full query file. All six checks pass: the range of monthly growth, the quarters adding up to the months, cost of goods never exceeding order value, no month-to-month jump outside 0.33 to 3 times, the five regions adding up to 2025 revenue, and no rows breaking the cleaning rules.

## Monthly revenue and year-on-year growth

| Month | Revenue (million) | Cost of goods (million) | Orders | Units | Margin | YoY growth |
|---|---|---|---|---|---|---|
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

The twelve months of 2024 have no comparison, so their growth column is empty. Total over 27 months: 38,780 orders and 746,770 units.

## Quarterly rollup

| Quarter | Revenue (million) | Cost of goods (million) | Orders |
|---|---|---|---|
| 2024 Q1 | 1,230.34 | 903.03 | 4,064 |
| 2024 Q2 | 1,285.66 | 945.30 | 4,264 |
| 2024 Q3 | 1,211.26 | 891.68 | 3,913 |
| 2024 Q4 | 1,392.89 | 1,024.52 | 4,585 |
| 2025 Q1 | 1,348.33 | 981.99 | 4,210 |
| 2025 Q2 | 1,449.87 | 1,061.83 | 4,438 |
| 2025 Q3 | 1,368.97 | 996.58 | 4,154 |
| 2025 Q4 | 1,586.41 | 1,160.10 | 4,819 |
| 2026 Q1 | 1,520.84 | 1,103.55 | 4,333 |

Assembled from the monthly table. The nine quarters add up to the 27 months at full value, within a tolerance of one cent.

## Product lines and regions, 2025 against 2024

| Line or region | 2024 (million) | 2025 (million) | Growth | 2025 share | Unit growth |
|---|---|---|---|---|---|
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

Unit growth is only calculated per line. The five lines and the five regions each add up to 5,753.58 million.

Completed 17 October 2026 with a data cut-off of 31 March 2026, revised 9 November 2026. Query: 1-Kueri SQL.sql. Full output of every statement: 3-Hasil Kueri. Data for all three figures and extra calculations (quarters, Grocery, returns, 24-month index): 5-Data Grafik. All in the same folder.
