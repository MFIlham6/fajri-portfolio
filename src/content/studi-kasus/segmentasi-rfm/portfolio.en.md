**Marketplace Customer Segmentation: The Retention Budget Is Split Evenly Across 5,000 People, Yet 8% Hold 28.7% of Value**

Customer segmentation case study for an online retail marketplace with five product categories. Tool: SQL on ClickHouse. Scope: 5,000 customers and 48,130 clean transactions from 50,980 raw rows. Time spent: 24 hours.

Mochamad Fajri Ilham Nurdin, completed October 2026. Full queries and check files: https://drive.google.com/drive/folders/1nfn1i2-QGgt1n8RW9PLb0VgzEM8JM8xP. Email: mfajriilhamn@gmail.com.

Data note: the figures below come from a dataset designed to mimic marketplace transaction patterns. It is not real company data, and it is not presented as work experience at any company.

## Summary

The Rp 150 million quarterly retention budget should not be split evenly. Last quarter the promotion went to all 5,000 customers; split evenly, that is Rp 30,000 per person. Segmentation of 48,130 clean transactions shows 400 Champions (8.0% of 5,000) hold 28.7% of all transaction value, 3.6 times their even share. Meanwhile, 900 At Risk customers who used to buy regularly have not transacted for more than a quarter. They carry Rp 2.74 billion in historical value (24.7% of the total). The recommendation concentrates the budget on appreciation for Champions and a measured win-back test for At Risk. Two data patterns limit this conclusion: Champions status rests on a March 2026 surge, and At Risk formed while January and February 2026 transactions fell sharply. All figures are as of 2026-03-31.

## Why this report exists

The current quarter's budget split is waiting for a decision, and one person carries it: the retention budget owner. They have to defend the split in front of management, figure by figure. The sharpest question: why some customers deliberately get nothing.

Last quarter the promotion went to everyone. The campaign report recorded a 12% open rate and 3% voucher redemption. Those figures are stakeholder context. They were not verified from the data and are not the basis of the argument.

Split evenly, Lost receives 52% of the budget (Rp 78 million) while holding 16.4% of value, and Champions and At Risk, which together hold 53.4% of value, receive only 26%.

## What was done

Three decisions were written down before the first analysis query, each with one rejected option.

- Transaction definition: unique rows with a positive value, up to the reference date. Of 50,980 raw rows, 2,850 (5.6%) were dropped in four stages, with the count at each stage recorded. Rejected: using every row as it is. Duplicates inflate frequency. SUM also silently skips empty values, so two measures would use two different definitions.
- Reference date: 2026-03-31, the last date of clean data, locked as a literal. Rejected: following the system date. The result changes every day and can't be reproduced.
- Segment cut-offs: set after reading the population's distribution, then sensitivity-tested. Rejected: quintile scoring per measure. It is more adaptive, but on this data it finds the same shape and is much harder to explain to the budget owner.

| Cleaning stage | Rule | Dropped | Rows left |
|---|---|---|---|
| Raw data | Transaction table, 5 columns |  | 50,980 |
| Exact duplicates | All five columns identical | 2,400 | 48,580 |
| Empty value | TotalValue NULL (failed payment) | 350 | 48,230 |
| Non-positive value | TotalValue zero or negative | 50 | 48,180 |
| Date outside the period | After 2026-03-31 | 50 | 48,130 |

Segmentation uses RFM (Recency, Frequency, Monetary) with four threshold-based segments. Every result comes from one recorded query.

The cut-offs between segments were drawn after reading the R, F, and M distributions of all customers (as of 2026-03-31, 5,000 customers).

| Measure | Min | Q1 | Median | Q3 | Max |
|---|---|---|---|---|---|
| Recency (days) | 0 | 17 | 61 | 126 | 440 |
| Frequency (transactions) | 2 | 4 | 7 | 14 | 25 |
| Monetary (Rp) | 44,457 | 650,077 | 1,357,960 | 3,121,369 | 10,878,758 |

The four segments use the cut-offs below. The branches are read from top to bottom, and that order is part of the definition.

| Segment | Condition | Reason |
|---|---|---|
| Champions | R <= 30, F >= 15, and M > Rp 5,000,000 | Three conditions at once, deliberately narrow. M sits far above Q3. |
| Loyal | R <= 90 and F >= 8 | 90 days is one quarter. F >= 8 is just above the median (7). |
| At Risk | R > 90 and F >= 5 | Their frequency proves they were once regular, but they've been gone for more than a quarter. |
| Lost | Everyone else | Still active but with moderate frequency (R <= 90, F 5 to 7), or long silent with F 2 to 4. |

## Data

The only data source is one transaction table. It has 50,980 rows and five columns: transaction number, customer, date, value, and category. The clean data covers January 2025 to March 2026. The raw data has 50 rows dated as late as December 2026. Those rows were removed.

Three things are not in the table: campaign results, channel costs, and the reasons customers stopped. So this report has no ROI figure or recovery projection.

## Figures and findings

Value is concentrated in Champions, and At Risk almost matches them. 400 Champions (8.0% of 5,000) hold 28.7% of transaction value, 3.6 times their even share. Their median is 22 transactions and Rp 8.06 million per person. At Risk (900 customers, 18.0%) follow with 24.7% of value. The Champions figure rests on one month: in March 2026 they made 2,597 transactions (6.5 per person), while in the 14 months before they made 381 to 498 a month. Without March, only 285 of the 400 pass the Rp 5 million threshold, and their value share is 22.8%.

| Segment (as of 2026-03-31) | Customers | Share | Median R (days) | Median F | Median M (Rp) | Total value (Rp) | Value share |
|---|---|---|---|---|---|---|---|
| Champions | 400 | 8.00% | 3 | 22 | 8,056,861 | 3,183,642,059 | 28.68% |
| Loyal | 1,100 | 22.00% | 19 | 16 | 3,026,085 | 3,353,539,214 | 30.21% |
| At Risk | 900 | 18.00% | 112 | 11 | 3,005,368 | 2,741,303,048 | 24.69% |
| Lost | 2,600 | 52.00% | 90.5 | 4.5 | 669,350 | 1,822,238,246 | 16.42% |
| Total | 5,000 | 100% |  |  |  | 11,100,722,566 | 100.00% |

**Figure 1. Champions hold a large share of value, and At Risk almost matches them**

![gambar 1](images/gambar-1.png)

What it shows: each segment's share of customers (gray) and share of transaction value (red), in percent. The end of each red bar carries the segment's total value (Rp billion) and the multiple of value share over customer share.

Data range: 48,130 clean transactions from 5,000 customers, 2025-01-01 to 2026-03-31, as of 2026-03-31.

What to notice: the red Champions bar is 3.6 times its gray bar. The red Lost bar is a third of its gray bar. The red At Risk bar is 4.0 percentage points below Champions.

At Risk holds almost as much value as Champions. 900 customers (18.0%) have a median of 11 transactions, a sign they were once regular. Now their median is 112 days without a transaction. This group's historical value is Rp 2.74 billion (24.7% of the total). How much can be recovered is unknown from transaction data. Lost (2,600 people, 52.0%) is made up of two equal groups. 1,300 people still shopped in the last 90 days (median 33 days) but only 5 to 7 times in 15 months. The other 1,300 have been silent for more than 90 days (median 170 days) with 2 to 4 transactions. Lost's combined median (90.5 days, 4.5 transactions) falls in the gap between the two and doesn't describe a single customer.

**Figure 2. At Risk used to be regular and is now drifting away, while Lost splits into two groups**

![gambar 2](images/gambar-2.png)

What it shows: median days since the last transaction (horizontal) and median number of transactions (vertical) for each group, with Lost split into active Lost and silent Lost. The area of each circle is roughly proportional to the number of customers. The vertical dashed line marks 90 days.

Data range: 5,000 customers, as of 2026-03-31.

What to notice: the At Risk circle sits right of the 90-day line, at a height of 11 transactions. Active Lost sits left of the line (33 days, 6 transactions), silent Lost far to the right (170 days, 3 transactions).

Value concentration is real, but more moderate than the common assumption. The top 20% of customers hold 49.2% of value, not 80%. This concentration is a property of the data's distribution, not an artifact of the segment lines. Value per customer runs from Rp 44,457 to Rp 10,878,758, with a median of Rp 1,357,960.

**Figure 3. Value is concentrated, but it doesn't follow the 80/20 rule**

![gambar 3](images/gambar-3.png)

What it shows: the cumulative percentage of transaction value (vertical) held by the top customers (horizontal). The dashed line shows an even split.

Data range: 5,000 customers and Rp 11.10 billion of clean transaction value, as of 2026-03-31.

What to notice: the red curve is at 28.7% for the top 8% of customers and 49.2% for the top 20%. At the top 20% of customers, the curve is below 80%.

Segment sizes depend on the reference date, but the direction of the recommendation doesn't. An analysis three months earlier (data and reference date 2025-12-31) gives Champions 83, Loyal 2,222, At Risk 226, and Lost 2,469, out of 5,000 customers. Of those 2,222 Loyal, 857 became At Risk by 2026-03-31. That is 95% of the current 900 At Risk. My guess before running it, that Loyal would shrink, turned out wrong. I had counted the frequency effect of a shorter history and forgotten the recency effect.

| Number of customers (of 5,000) | Champions | Loyal | At Risk | Lost |
|---|---|---|---|---|
| Reference 2025-12-31 | 83 | 2,222 | 226 | 2,469 |
| Reference 2026-03-31 | 400 | 1,100 | 900 | 2,600 |

| Segment on 2025-12-31 (rows) to segment on 2026-03-31 (columns) | Champions | Loyal | At Risk | Lost | Total |
|---|---|---|---|---|---|
| Champions | 83 | 0 | 0 | 0 | 83 |
| Loyal | 305 | 1,060 | 857 | 0 | 2,222 |
| At Risk | 11 | 40 | 43 | 132 | 226 |
| Lost | 1 | 0 | 0 | 2,468 | 2,469 |
| Total | 400 | 1,100 | 900 | 2,600 | 5,000 |

| Active customers per quarter (clean data) | 2025 Q1 | 2025 Q2 | 2025 Q3 | 2025 Q4 | 2026 Q1 |
|---|---|---|---|---|---|
| Active customers | 3,953 | 3,935 | 4,013 | 3,954 | 2,789 |
| Total value (Rp billion) | 2.19 | 2.21 | 2.28 | 2.24 | 2.18 |

**Figure 4. Segment sizes depend on the reference date (2025-12-31 variant)**

![gambar 4](images/gambar-4.png)

What it shows: the number of customers in each segment with an identical pipeline and rules on two reference dates, 2025-12-31 (gray) and 2026-03-31 (red).

Data range: 5,000 customers on both dates. Clean transactions up to each date.

What to notice: the gray Champions (83) and At Risk (226) bars are much shorter than their red bars (400 and 900). Loyal is the only segment that shrinks (2,222 to 1,100).

## What changed in the decision

The meeting's question shifts. Before: how big a voucher to give everyone. Now: which groups receive a concentrated budget, and on what basis. The same budget now funds two programs.

The first program: non-discount appreciation for the 400 Champions. Their median is 3 days since their last transaction, so they are active without being paid. The initial proposal is 40% of the budget, Rp 150,000 per person, five times the even split.

The second program: a measured win-back test for the 900 At Risk customers. A small part (20%) is deliberately sent nothing, as a comparison group. The initial proposal is 40% of the budget. The test result decides the scale for the next quarter.

Loyal (1,100 people) is kept with minimal effort on 15% of the budget. A 5% reserve covers measurement. The 2,600 Lost customers get no campaign budget; the half that is still active is watched in the next segmentation because they are closest to moving up to Loyal. These shares are an initial proposal, not a result calculated from the data. The segmentation is rerun every quarter with an identical pipeline.

| Segment (as of 2026-03-31) | Customers | Role in the budget | Proposed share | Per head |
|---|---|---|---|---|
| Champions | 400 (8.0%) | Non-discount appreciation: early product access, priority service | Rp 60 m (40%) | Rp 150,000 |
| At Risk | 900 (18.0%) | Win-back test. 180 people (20%) are sent nothing as a comparison | Rp 60 m (40%) | Rp 83,333 per recipient (720) |
| Loyal | 1,100 (22.0%) | Kept with minimal effort (routine communication) | Rp 22.5 m (15%) | Rp 20,455 |
| Lost | 2,600 (52.0%) | No campaign budget | Rp 0 | Rp 0 |
| Reserve |  | Measuring the test results | Rp 7.5 m (5%) |  |

What I will measure afterwards. This recommendation has no results yet, so I state how we will know. Three measures are set now, before the programs run.

- First, how many of the 900 At Risk customers transact again within one quarter after the test is sent. The result is read against the comparison group that received nothing.
- Second, how many of the 400 Champions are still Champions when the segmentation is rerun at the end of the next quarter. This also tests whether the March 2026 surge repeats.
- Third, the cost per returning customer. This figure only exists once the first measure has been read.

All three are read on dates set together with the programs, not chosen after the figures are visible.

## Limits and trace

- Every figure describes behavior up to 2026-03-31. The recommendation assumes the next quarter resembles the last one, yet the last quarter itself didn't resemble the ones before. Throughout 2025, transactions ranged from 3,011 to 3,459 a month; January and February 2026 had only 2,235 and 2,009, then March jumped to 4,404. The quarter's total value looks flat because March covered the two months before it. At Risk formed in this window (226 as of 2025-12-31, 456 as of 2026-02-28, 900 as of 2026-03-31). The cause is unknown; the first question for the data team is whether recording for January and February 2026 is complete.
- Rp 2.74 billion is historical value, not a recovery projection. The status of the 400 Champions also rests on March 2026; without that month only 285 pass the Rp 5 million threshold.
- The cut-offs between segments are an analysis decision. Moving the Loyal Frequency cut-off from 8 to 6 moves 824 customers. Moving the Champions Recency cut-off from 30 to 45 days moves zero customers.

| Cut-off moved (customers per segment) | Champions | Loyal | At Risk | Lost | Moved |
|---|---|---|---|---|---|
| Official | 400 | 1,100 | 900 | 2,600 |  |
| Champions Recency 30 to 45 days | 400 | 1,100 | 900 | 2,600 | 0 |
| Loyal Frequency 8 to 6 transactions | 400 | 1,924 | 900 | 1,776 | 824 |
| Champions Monetary Rp 5 m to Rp 4 m | 452 | 1,048 | 900 | 2,600 | 52 |
| At Risk Frequency 5 to 4 transactions | 400 | 1,100 | 1,289 | 2,211 | 389 |

| Figure | Where it comes from |
|---|---|
| 48,130 clean transactions | A four-stage pipeline over the transaction table: 50,980 to 48,580 to 48,230 to 48,180 to 48,130. Dropped: 2,400 duplicates, 350 empty values, 50 non-positive, 50 past the reference date. |
| 400 / 1,100 / 900 / 2,600 | Aggregation per customer, then threshold classification. The core query is shown in full below. |
| 28.7% and 24.7% value share | Each segment's total transaction value divided by the Rp 11.10 billion total. |
| Median 3 / 112 days; 22 / 11 transactions | Median per segment over the per-customer Recency and Frequency columns. |
| 49.2% at the top 20% | Cumulative value of customers sorted from the largest spend. |
| Rp 150,000 and Rp 30,000 per person | Arithmetic: Rp 60 million divided by 400, and Rp 150 million divided by 5,000. This is not a data finding. |

```sql
WITH deduped AS (
  SELECT DISTINCT TransactionID, CustomerID, TransactionDate, TotalValue, ProductCategory
  FROM transactions                                     -- 50,980 -> 48,580
), bernilai AS (
  SELECT * FROM deduped WHERE TotalValue IS NOT NULL    -- 48,580 -> 48,230
), positif AS (
  SELECT * FROM bernilai WHERE TotalValue > 0            -- 48,230 -> 48,180
), bersih AS (
  SELECT * FROM positif
  WHERE TransactionDate <= toDate('2026-03-31')         -- 48,180 -> 48,130
), profil AS (
  SELECT CustomerID,
         dateDiff('day', max(TransactionDate), toDate('2026-03-31')) AS recency,
         count() AS frequency, sum(TotalValue) AS monetary
  FROM bersih GROUP BY CustomerID                       -- 5,000 customers
)
SELECT
  multiIf(                                              -- branch order is deliberate
    recency <= 30 AND frequency >= 15 AND monetary > 5000000, 'Champions',
    recency <= 90 AND frequency >= 8,                        'Loyal',
    recency > 90  AND frequency >= 5,                        'At Risk',
                                                          'Lost') AS segmen,
  count() AS pelanggan, sum(monetary) AS nilai
FROM profil GROUP BY segmen ORDER BY pelanggan DESC
```

Rerunning it. The full queries, data files, and decision log are stored at https://drive.google.com/drive/folders/1nfn1i2-QGgt1n8RW9PLb0VgzEM8JM8xP. There are three steps. Load transactions.csv into the transactions table. Run the query above (or 1-Kueri SQL.sql) as it is. Match the count at each cleaning stage against 50,980 to 48,580 to 48,230 to 48,180 to 48,130, and the four segments against 400, 1,100, 900, and 2,600. The reference date is locked as a literal inside the query, so the result is the same whenever it is run. The figures for the monthly pattern, Champions per month, and the two Lost groups are in Section 6 of the query file and in 6-Data Grafik.
