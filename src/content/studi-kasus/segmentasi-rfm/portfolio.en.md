# Marketplace Customer Segmentation: The Retention Budget Is Split Evenly Across 5,000 People, Yet 8% Hold 28.7% of the Value

A customer segmentation case study at an online retail marketplace with five product categories. Tool: SQL. Scope: 5,000 customers and 48,130 clean transactions from 50,980 raw rows.

Mochamad Fajri Ilham Nurdin, completed October 2026. Full queries and check files: https://drive.google.com/drive/folders/1nfn1i2-QGgt1n8RW9PLb0VgzEM8JM8xP. Email: mfajriilhamn@gmail.com.

Data note: the figures below come from a dataset designed to mimic marketplace transaction patterns. It is not real company data, and it is not presented as work experience at any company.

## 1. Summary

The Rp 150 million quarterly retention budget should **not be split evenly**. Until now it has been split evenly across 5,000 customers. That comes to Rp 30,000 per person, too small to change anyone's behavior. Segmenting 48,130 clean transactions shows the top 400 customers (8.0% of 5,000) hold 28.7% of all transaction value. That is 3.6 times their even share. Meanwhile, 900 customers who used to buy regularly have been gone for more than a quarter. They carry Rp 2.74 billion of historical value (24.7% of the total). The recommendation concentrates the budget on appreciation for the top group and a measured **win-back test** for the group drifting away. All figures are as of 2026-03-31.

## 2. Why this report exists

The current quarter's budget split is waiting for a decision, and one person carries it: the retention budget holder. They have to defend the split in front of management, number by number. The sharpest question: why some customers deliberately get nothing.

Last quarter, promotions were sent to everyone. The campaign report recorded a 12% open rate and 3% voucher redemption. Those numbers are context from stakeholders. They were not verified from the data and are not the basis of the argument.

A split pointed the wrong way spends Rp 150 million on the groups that contribute least. The group that holds most of the value keeps being treated the same as everyone else.

## 3. What I did

The work followed six fixed steps: situation, the right question, data sufficiency, analysis, rebuttal, and recommendation with its limits. Three decisions were fixed in writing before the first analysis query. Each has one rejected alternative.

- Transaction definition: unique rows, positive value, up to the reference date. Of 50,980 raw rows, 2,850 (5.6%) were removed in four stages, with the count at each stage recorded. Rejected: using every row as-is. Duplicates inflate frequency. SUM also silently skips empty values, so two measures would use two different definitions.
- Reference date: 2026-03-31, the last date in the clean data, locked as a literal. Rejected: following the system date. The results would change every day and couldn't be reproduced.
- Segment boundaries: set after reading the population's distribution, then tested for sensitivity. Rejected: quintile scoring per measure. It is more adaptive, but on this data it finds the same shape and is much harder to explain to the budget holder.

| Cleaning stage | Rule | Removed | Rows left |
| --- | --- | --- | --- |
| Raw data | Transaction table, 5 columns |  | 50,980 |
| Exact duplicates | All five columns identical | 2,400 | 48,580 |
| Empty values | TotalValue NULL (failed payment) | 350 | 48,230 |
| Non-positive values | TotalValue zero or negative | 50 | 48,180 |
| Dates outside the period | After 2026-03-31 | 50 | 48,130 |

Segmentation uses RFM (Recency, Frequency, Monetary) with four threshold-based segments. All results come from one recorded query. Each finding was tested against its most likely rebuttal before being reported.

Segment boundaries were drawn after reading the R, F, and M distributions of all customers (as of 2026-03-31, 5,000 customers).

| Measure | Min | Q1 | Median | Q3 | Max |
| --- | --- | --- | --- | --- | --- |
| Recency (days) | 0 | 17 | 61 | 126 | 440 |
| Frequency (transactions) | 2 | 4 | 7 | 14 | 25 |
| Monetary (Rp) | 44,457 | 650,077 | 1,357,960 | 3,121,369 | 10,878,758 |

The four segments use the following thresholds. The branches are read from top to bottom, and that order is part of the definition.

| Segment | Condition | Reason |
| --- | --- | --- |
| Champions | R <= 30, F >= 15, and M > Rp 5,000,000 | Three conditions at once, deliberately narrow. M sits far above Q3. |
| Loyal | R <= 90 and F >= 8 | 90 days is one quarter. F >= 8 is just above the median (7). |
| At Risk | R > 90 and F >= 5 | Their frequency proves they were once regular, but they have been gone for more than a quarter. |
| Lost | Everyone else | Infrequent and long unseen, or new and without a habit yet. |

## 4. Data

There is only one data source: a transaction table. It holds 50,980 rows and five columns: transaction ID, customer, date, value, and category. The clean data covers January 2025 to March 2026. The raw data contains 50 rows dated up to December 2026. Those rows were removed.

Three things are not in the table: campaign results, channel costs, and the reasons customers stopped. So this report contains no ROI figure or recovery projection.

## 5 and 6. Figures and findings

Value is concentrated in a small group, and the group drifting away almost matches it. 400 customers (8.0% of 5,000) hold 28.7% of transaction value, 3.6 times their even share. Their medians are 22 transactions and Rp 8.06 million per person. The At Risk group (900 customers, 18.0%) follows with 24.7% of value.

| Segment (as of 2026-03-31) | Customers | Share | Median R (days) | Median F | Median M (Rp) | Total value (Rp) | Value share |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Champions | 400 | 8.00% | 3 | 22 | 8,056,861 | 3,183,642,059 | 28.68% |
| Loyal | 1,100 | 22.00% | 19 | 16 | 3,026,085 | 3,353,539,214 | 30.21% |
| At Risk | 900 | 18.00% | 112 | 11 | 3,005,368 | 2,741,303,048 | 24.69% |
| Lost | 2,600 | 52.00% | 90.5 | 4.5 | 669,350 | 1,822,238,246 | 16.42% |
| Total | 5,000 | 100% |  |  |  | 11,100,722,566 | 100.00% |

![figure 1](images/gambar-1.svg)

*What it shows: customer share (gray) and transaction value share (red) for each segment, in percent. The end of each red bar holds the segment's total value (Rp billion) and its value share as a multiple of its customer share.*

*Data range: 48,130 clean transactions from 5,000 customers, 2025-01-01 to 2026-03-31, as of 2026-03-31.*

*What to see: the red bar of the 400-person segment is 3.6 times its gray bar. The red bar of the 2,600-person segment is a third of its gray bar. The red bar of the 900 people drifting away is only 4.0 percentage points below the 400-person segment.*

The group drifting away holds almost as much value as the top group. 900 customers (18.0%) have a median of 11 transactions, a sign they were once regular. They now have a median of 112 days without a transaction. This group's historical value is Rp 2.74 billion (24.7% of the total). How much of it can be recovered can't be known from transaction data. Most customers (2,600 people, 52.0%) are light buyers, not loyal customers who were lost. Their medians are 4.5 transactions and Rp 0.67 million per person.

![figure 2](images/gambar-2.svg)

*What it shows: median days since the last transaction (horizontal) and median number of transactions (vertical) for each segment. Circle area follows the number of customers, but it is deliberately compressed. Circle areas are not a comparison of size.*

*Data range: 5,000 customers, as of 2026-03-31.*

*What to see: the circle for the group drifting away sits to the right of the 90-day line, at a height of 11 transactions. The bottom group's circle sits right on that line, at a height of 4.5 transactions.*

Value concentration is real, but more moderate than the common assumption. The top 20% of customers hold 49.2% of value, not 80%. This concentration is a property of the data's distribution, not an artifact of the segment boundaries. Value per customer ranges from Rp 44,457 to Rp 10,878,758, with a median of Rp 1,357,960.

![figure 3](images/gambar-3.svg)

*What it shows: cumulative percentage of transaction value (vertical) held by the top customers (horizontal). The dashed line shows an even split.*

*Data range: 5,000 customers and Rp 11.10 billion of clean transaction value, as of 2026-03-31.*

*What to see: the red curve is at 28.7% for the top 8% of customers and 49.2% for the top 20%. At the top 20% of customers, the curve is below 80%.*

Segment sizes depend on the reference date, but the direction of the recommendation doesn't. An analysis three months earlier (data and reference date 2025-12-31) gives Champions 83, Loyal 2,222, At Risk 226, and Lost 2,469, out of 5,000 customers. Of those 2,222 Loyal, 857 became At Risk by 2026-03-31. That is 95% of the current 900 At Risk. My guess before running it, that Loyal would shrink, turned out to be wrong. I accounted for the frequency effect of a shorter history and forgot the recency effect.

| Number of customers (of 5,000) | Champions | Loyal | At Risk | Lost |
| --- | --- | --- | --- | --- |
| Reference 2025-12-31 | 83 | 2,222 | 226 | 2,469 |
| Reference 2026-03-31 | 400 | 1,100 | 900 | 2,600 |

| Segment at 2025-12-31 (rows) to segment at 2026-03-31 (columns) | Champions | Loyal | At Risk | Lost | Total |
| --- | --- | --- | --- | --- | --- |
| Champions | 83 | 0 | 0 | 0 | 83 |
| Loyal | 305 | 1,060 | 857 | 0 | 2,222 |
| At Risk | 11 | 40 | 43 | 132 | 226 |
| Lost | 1 | 0 | 0 | 2,468 | 2,469 |
| Total | 400 | 1,100 | 900 | 2,600 | 5,000 |

| Active customers per quarter (clean data) | 2025 Q1 | 2025 Q2 | 2025 Q3 | 2025 Q4 | 2026 Q1 |
| --- | --- | --- | --- | --- | --- |
| Active customers | 3,953 | 3,935 | 4,013 | 3,954 | 2,789 |
| Total value (Rp billion) | 2.19 | 2.21 | 2.28 | 2.24 | 2.18 |

![figure 4](images/gambar-4.svg)

*What it shows: number of customers in each segment, with an identical pipeline and rules, at two reference dates, 2025-12-31 (gray) and 2026-03-31 (red).*

*Data range: 5,000 customers at both dates. Clean transactions up to each date.*

*What to see: the gray bars of the top segment (83) and the drifting segment (226) are much shorter than their red bars (400 and 900). The middle segment's bars move the other way (2,222 to 1,100).*

## 7. What changed in the decision

The question in the meeting shifts. Before: how large a voucher to give everyone. Now: which groups receive a concentrated budget, and on what basis. The same budget now funds two programs.

Program one: non-discount appreciation for the top 400 customers. Their median is 3 days since the last transaction, so they are already active without being paid. If the whole budget went to them, each person would receive Rp 375,000, compared with Rp 30,000 under an even split. The initial proposal is 40% of the budget.

Program two: a measured win-back test for the 900 customers drifting away. A small share (20%) deliberately receives nothing, as a comparison group. The initial proposal is 40% of the budget. The test results decide next quarter's scale.

The middle group (1,100 people) gets minimal upkeep with 15% of the budget. A 5% measurement reserve. The bottom 2,600 customers get no campaign budget. These shares are an initial proposal, not a result calculated from data. Segmentation is re-run every quarter with an identical pipeline.

| Segment (as of 2026-03-31) | Customers | Role in the budget | Proposed share | Per person |
| --- | --- | --- | --- | --- |
| Champions | 400 (8.0%) | Non-discount appreciation: early product access, priority service | Rp 60M (40%) | Rp 150,000 |
| At Risk | 900 (18.0%) | Win-back test. 180 people (20%) receive nothing, as a comparison group | Rp 60M (40%) | Rp 83,333 per recipient (720) |
| Loyal | 1,100 (22.0%) | Kept with minimal effort (routine communication) | Rp 22.5M (15%) | Rp 20,455 |
| Lost | 2,600 (52.0%) | No campaign budget | Rp 0 | Rp 0 |
| Reserve |  | Measuring the test results | Rp 7.5M (5%) |  |

What I will measure afterwards. This recommendation has no results yet, so I state how we'll find out. Three measures are fixed now, before the programs run.

- First, how many of the 900 customers drifting away transact again within one quarter of the test being sent. The result is read against the comparison group that received nothing.
- Second, how many of the top 400 customers are still in the same segment when segmentation is re-run at the end of next quarter.
- Third, cost per returning customer. This figure only exists once the first measure has been read.

All three are read on a date fixed together with the program, not chosen after the numbers are visible.

## 8. Limits and audit trail

- Every figure describes behavior up to 2026-03-31. The recommendation assumes next quarter will resemble the last one. Transaction data can't test that assumption, and the data itself shakes it. Active customers fell from 3,954 in the last quarter of 2025 to 2,789 in the first quarter of 2026 (down 29.5%). Total value is almost the same. The cause is unknown.
- Rp 2.74 billion is historical value, not a recovery projection.
- The segment boundaries are an analysis decision. Moving the frequency threshold two steps moves 824 customers. Moving the day threshold by half moves zero customers.

| Threshold moved (customers per segment) | Champions | Loyal | At Risk | Lost | Moved |
| --- | --- | --- | --- | --- | --- |
| Official | 400 | 1,100 | 900 | 2,600 |  |
| Champions recency 30 to 45 days | 400 | 1,100 | 900 | 2,600 | 0 |
| Loyal frequency 8 to 6 transactions | 400 | 1,924 | 900 | 1,776 | 824 |
| Champions monetary Rp 5M to Rp 4M | 452 | 1,048 | 900 | 2,600 | 52 |
| At Risk frequency 5 to 4 transactions | 400 | 1,100 | 1,289 | 2,211 | 389 |

| Figure | Where it comes from |
| --- | --- |
| 48,130 clean transactions | A four-stage pipeline on the transaction table: 50,980 to 48,580 to 48,230 to 48,180 to 48,130. Removed: duplicates 2,400, empty values 350, non-positive 50, past the reference date 50. |
| 400 / 1,100 / 900 / 2,600 | Aggregation per customer, then threshold classification. The core query is shown in full below. |
| 28.7% and 24.7% value share | Sum of transaction value per segment divided by the Rp 11.10 billion total. |
| Median 3 / 112 days; 22 / 11 transactions | Median per segment of the per-customer Recency and Frequency columns. |
| 49.2% for the top 20% | Cumulative value of customers sorted from the largest spender. |
| Rp 375,000 and Rp 30,000 per person | Arithmetic: Rp 150 million divided by 400 and by 5,000. This is not a data finding. |

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
  multiIf(                                              -- branch order is intentional
    recency <= 30 AND frequency >= 15 AND monetary > 5000000, 'Champions',
    recency <= 90 AND frequency >= 8,                        'Loyal',
    recency > 90  AND frequency >= 5,                        'At Risk',
                                                          'Lost') AS segmen,
  count() AS pelanggan, sum(monetary) AS nilai
FROM profil GROUP BY segmen ORDER BY pelanggan DESC
```

Re-running it. The full queries, data files, and decision log are stored at https://drive.google.com/drive/folders/1nfn1i2-QGgt1n8RW9PLb0VgzEM8JM8xP. There are three steps. Load transactions.csv into a table named transactions. Run the query above (or rfm_challenge_2026-10-12.sql) as it is. Check the count at each cleaning stage against 50,980 to 48,580 to 48,230 to 48,180 to 48,130, and the four segments against 400, 1,100, 900, and 2,600. The reference date is locked as a literal inside the query, so the result is the same whenever it is run. (The query keeps its original Indonesian names: bernilai = has a value, positif = positive, bersih = clean, profil = profile, segmen = segment, pelanggan = customers, nilai = value.)
