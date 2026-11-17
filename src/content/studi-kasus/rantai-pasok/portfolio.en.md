**Late-delivery penalties follow volume: three Jakarta routes hold 34.99% of shipments and 34.77% of penalties**

Mochamad Fajri Ilham Nurdin, completed October 2026, queries and check files: Google Drive folder, mfajriilhamn@gmail.com

Disclaimer: the company and its data are fictional. This work is a practice case study and is not presented as work experience at any company.

## Context

An intercity parcel delivery company signs contracts that promise an arrival date for each parcel, and pays a fixed penalty for every parcel that arrives after its promise. Its head of operations knows how much is paid in penalties every month. What they don't know yet is where the delays pile up, while improvement capacity is limited and the contract renewal is only a few months away.

This work answers that question from fifteen months of shipment records: one table, eight columns, about twenty-five thousand rows. Not a single column records the cause of a delay, so this analysis can show where delays pile up and can't explain why they happen.

## Approach

The steps: number each row per shipment number, remove three kinds of rows that don't describe real events, move shipments that haven't arrived into a stream of their own, mark each remaining shipment as late or not, then break the result down three ways (route, pickup day, courier) and translate the late count into rupiah. I wrote down four decisions before running the first analysis query.

What decides late: the arrival date passes that shipment's own promised date.

Rejected: one travel-time limit for every route. Promises for nearby cities and between islands differ, so a single limit would produce a ranking ordered by distance.

Shipments that haven't arrived are set aside and their count is reported; they are neither dropped nor counted.

Rejected: counting them as late. The resulting figure would keep getting worse every time the data is pulled closer to today, with nothing changing on the ground. That approach only suits a different question: how many parcels are currently awaited past their promise.

Three breakdowns were fixed in advance, each matching one kind of action the company can take: a route can be rerouted, a courier can be reviewed, and a pickup day can be rescheduled.

Rejected: trying many breakdowns and reporting the one with the most striking result. With enough attempts, that approach is sure to find a pattern in the noise.

A courier is only rated with at least thirty measured shipments, written down before the ranking was seen. Each courier comes with a 95% confidence interval.

Rejected: setting the threshold after looking at the bottom of the list, which stops a threshold from being a rule.

Cleaning runs in four stages. Each stage records how many rows leave and whether they are dropped or set aside, so the final total can be reconciled to the raw rows without taking any single figure on trust.

## Findings

1. Penalties follow volume. Of 22,614 shipments recorded as arrived, 1,809 arrived after their promise, so on-time delivery is 92.00%. Three routes out of Jakarta hold 34.99% of shipments and account for 34.77% of the period's penalties, with 245, 217, and 167 late shipments out of 3,141, 2,687, and 2,085. Their on-time rates are 91.92% to 92.20%, around the company average. The improvement priority is therefore taken from volume, for reach: improving the biggest routes touches the most shipments.
2. No route performs far differently from the others. All fifteen routes sit within a 2.53-point range, from 90.32% to 92.86%, with 906 to 3,141 shipments per route. A chi-square test across the fifteen routes gives p = 0.62, so this range can't be told apart from chance, and the on-time ranking can't be used to decide which route to work on first.
3. The courier ranking can't yet be used to pass judgment on anyone. The courier with the lowest on-time rate recorded 78.57% from 42 shipments, with a 95% confidence interval of 64.06% to 88.29%, and that interval overlaps the intervals of the nine couriers above it. As a group, the bottom ten couriers do differ from the rest: they recorded 78.57% to 82.93%, the 11th courier is already at 91.30%, and there isn't a single courier between those two figures. The ten hold 406 shipments at 81.53% on time and are worth reviewing together.
4. No pickup day falls behind by 2 points or more. The best and worst days differ by 0.97 points, from 91.50% to 92.47%, over 3,145 to 3,283 shipments per day. A chi-square test gives p = 0.87, and at that volume a gap of about 2 points would show. Rescheduling pickups therefore doesn't promise lower penalties.

**Figure 1. Where the period's penalties come from**

![gambar 1](images/gambar-1.png)

What it shows. Each route's penalties for the period in million rupiah, sorted by penalty. The axis starts at zero. Each route's on-time rate and shipment count are in the evidence-layer table.

Data range. 22,614 measured shipments, 1,809 late, January 2025 to March 2026.

What to notice. The top three bars are red, all routes out of Jakarta, with on-time rates of 91.92% to 92.20%. Makassar to Pontianak, the route with the lowest on-time rate, is tenth. Supports finding 1.

**Figure 2. All fifteen routes on a full zero-to-one-hundred axis**

![gambar 2](images/gambar-2.png)

What it shows. Each route's on-time rate as one bar on a 0% to 100% axis, sorted from the lowest.

Data range. Same as Figure 1.

What to notice. All fifteen bars are almost the same length. This figure deliberately uses a full axis because the claim it supports is that no route is far different. Supports finding 2.

**Figure 3. The bottom ten couriers and the width of their uncertainty**

![gambar 3](images/gambar-3.png)

What it shows. The Wilson 95% confidence interval for the on-time rate of the bottom ten couriers. The dark gray part runs from the lower bound of the interval to the recorded value, the light gray part from the recorded value to the upper bound. The last row, in red, is the combined interval of the other 490 couriers, 91.83% to 92.54%.

Data range. 500 couriers, 33 to 52 shipments per courier, same period.

What to notice. The upper bound of all ten intervals is below 92.00%, the company-wide on-time rate, and the ten overlap each other. The horizontal axis starts at 60%, and that cut is written in the axis title. Supports finding 3.

**Figure 4. On-time rate by pickup day**

![gambar 4](images/gambar-4.png)

What it shows. The on-time rate for each pickup day, Monday to Sunday, with the vertical axis from zero.

Data range. 22,614 measured shipments, 3,145 to 3,283 per day.

What to notice. All seven bars are almost the same height. Cutting the axis at 91% would make Wednesday look far lower, and that figure would mislead. Supports finding 4.

## Proposal

Direct improvement at the three highest-volume routes. If all three reach 97% on time, the period's penalties fall by Rp 19,550,000. If all fifteen routes reached it, the drop would be Rp 56,400,000, so three routes alone cover 34.66% of what's available. The 97% target comes from outside the data: the highest on-time rate ever recorded on any route is 92.86%. The rupiah here are at data scale, an average of 54 shipments a day. If this data is a sample of a volume of about 10,000 shipments a day, the three-route saving equals about Rp 7.9 million a day. Review the bottom ten couriers as one group, and don't use the ranking to judge individuals. Start recording a reason for every shipment that misses, because without that record the question of cause can never be answered from this data.

Three things changed because of this work. The priority order moved from performance ranking to volume. Rescheduling pickups was crossed off the improvement list. The plan to use the courier ranking to judge people was postponed, with a reason given in numbers.

## Outside the calculation

2,126 shipments had no arrival date when the data was closed and are not in any of the counts above. Of these, 2,113 were already past their promised date on 31 March 2026, by 222.0 days on average. This figure is not added to the 1,809 and not multiplied by the penalty.

This group turns out not to be in transit. Shipments without an arrival date are spread evenly across all fifteen pickup months, 117 to 163 a month, and 1,951 are more than 30 days past their promise. The data can't tell lost goods apart from arrival scans that weren't recorded, so their physical status needs checking before any figure is recalculated. This group is also larger than the recorded delays: 2,126 shipments are 8.59% of valid shipments, while the late ones are 7.31%. The 92.00% on-time rate therefore only applies to shipments recorded as arrived. If the 2,113 shipments past their promise turn out to have arrived late, the overall on-time rate is 84.14%, and if all 2,126 arrived on time without being recorded, 92.69%. This group's spread by route hasn't been calculated yet. If it piles up on particular routes, the penalty order could change.

**Figure 5. Shipments without an arrival date by pickup month**

![gambar 5](images/gambar-5.png)

What it shows. The number of shipments without an arrival date per month of pickup, split between those whose promise has passed (red) and those whose promise hasn't (gray).

Data range. 2,126 valid shipments without an arrival date, picked up January 2025 to March 2026.

What to notice. All fifteen bars are almost the same height. The gray part only appears in March 2026, 13 shipments.

## Evidence layer

Notes for all tables: period 2025-01-01 to 2026-03-31, the cut-off date 2026-03-31 written as a literal, 2,126 shipments that haven't arrived set aside, zero or negative weights dropped, courier threshold of 30 shipments. Penalty of Rp 50,000 per late shipment, calculated from the count.

## Four-stage reconciliation

| stage | before | removed | type | after |
|---|---|---|---|---|
| duplicate shipments from rescans | 25,800 | 800 | dropped | 25,000 |
| pickup date after 31 March 2026 | 25,000 | 160 | dropped | 24,840 |
| zero or negative weight | 24,840 | 100 | dropped | 24,740 |
| not yet arrived | 24,740 | 2,126 | set aside | 22,614 |

1,060 rows dropped, 2,126 set aside. The pickup date is compared as toDate(PickupDate). Without toDate() on the left side, the second stage removes 24,804 rows because every shipment during 31 March is dropped too.

## On-time rate by route, sorted by on-time rate

| route | shipments | late | on time | penalty |
|---|---|---|---|---|
| Makassar to Pontianak | 930 | 90 | 90.32 | 4,500,000 |
| Jakarta to Medan | 1,528 | 139 | 90.90 | 6,950,000 |
| Surabaya to Balikpapan | 1,114 | 98 | 91.20 | 4,900,000 |
| Surabaya to Malang | 1,386 | 120 | 91.34 | 6,000,000 |
| Jakarta to Surabaya | 2,687 | 217 | 91.92 | 10,850,000 |
| Jakarta to Semarang | 2,085 | 167 | 91.99 | 8,350,000 |
| Medan to Palembang | 1,124 | 89 | 92.08 | 4,450,000 |
| Jakarta to Bandung | 3,141 | 245 | 92.20 | 12,250,000 |
| Jakarta to Bogor | 1,357 | 105 | 92.26 | 5,250,000 |
| Surabaya to Denpasar | 1,599 | 122 | 92.37 | 6,100,000 |
| Jakarta to Cirebon | 1,123 | 85 | 92.43 | 4,250,000 |
| Semarang to Yogyakarta | 906 | 68 | 92.49 | 3,400,000 |
| Jakarta to Makassar | 1,386 | 103 | 92.57 | 5,150,000 |
| Semarang to Solo | 1,156 | 83 | 92.82 | 4,150,000 |
| Bandung to Yogyakarta | 1,092 | 78 | 92.86 | 3,900,000 |
| total | 22,614 | 1,809 | 92.00 | 90,450,000 |

## On-time rate by pickup day

| day | shipments | late | on time |
|---|---|---|---|
| Monday | 3,213 | 242 | 92.47 |
| Tuesday | 3,145 | 252 | 91.99 |
| Wednesday | 3,235 | 275 | 91.50 |
| Thursday | 3,275 | 253 | 92.27 |
| Friday | 3,283 | 268 | 91.84 |
| Saturday | 3,271 | 262 | 91.99 |
| Sunday | 3,192 | 257 | 91.95 |
| total | 22,614 | 1,809 | 92.00 |

## The ten couriers with the lowest on-time rate

Threshold of 30 shipments. 500 of 500 couriers rated, 0 excluded, at least 33 shipments, 45.2 on average. The 11th courier recorded 91.30%.

| courier | shipments | late | on time | 95% interval |
|---|---|---|---|---|
| CRR-395 | 42 | 9 | 78.57 | 64.06 to 88.29 |
| CRR-485 | 39 | 8 | 79.49 | 64.47 to 89.22 |
| CRR-254 | 41 | 8 | 80.49 | 65.99 to 89.77 |
| CRR-281 | 36 | 7 | 80.56 | 64.97 to 90.25 |
| CRR-229 | 33 | 6 | 81.82 | 65.61 to 91.39 |
| CRR-226 | 46 | 8 | 82.61 | 69.28 to 90.91 |
| CRR-033 | 52 | 9 | 82.69 | 70.27 to 90.62 |
| CRR-131 | 35 | 6 | 82.86 | 67.32 to 91.90 |
| CRR-224 | 41 | 7 | 82.93 | 68.74 to 91.47 |
| CRR-357 | 41 | 7 | 82.93 | 68.74 to 91.47 |

## 97% target scenarios

| option | shipments | late | prevented | saving if 97% is reached |
|---|---|---|---|---|
| three worst by on-time rate | 3,572 | 327 | 220 | Rp 11,000,000 |
| three most expensive by penalty | 7,913 | 629 | 391 | Rp 19,550,000 |
| all fifteen routes | 22,614 | 1,809 | 1,128 | Rp 56,400,000 |

Every figure in this table only applies if the chosen routes reach 97% on time. The remaining delays at target are calculated per route as volume × 3% and rounded to the nearest whole number before summing. The third option still leaves 681 delays or Rp 34,050,000, because a 97% target doesn't mean zero penalties.

## Checks

| check | kind | expected | result |
|---|---|---|---|
| reconciliation closes at every stage | correctness | yes | yes |
| route, day, and full courier tables add up to the same | correctness | 22,614 and 1,809 | yes, in all three |
| impossible values in all three tables | correctness | 0 rows | 0 rows |
| empty arrival date in the denominator | correctness | 0 of 22,614 | 0 of 22,614 |
| sum of penalties by route equals the period's penalties | correctness | 90,450,000 | 90,450,000 |
| spread between days wide enough to support a conclusion | strength | not yet known | no, 0.97 points |

The first five checks have a definite answer if the pipeline is correct. The sixth judges the strength of the conclusion. The toDayOfWeek mapping was also matched against dates whose weekday is known, because swapped day labels aren't caught by a summing check.

## Variant: January to March 2026 only

In this cut (4,401 measured shipments, 387 late, 91.21% on time), the three Jakarta routes still account for the largest penalties with 49, 47, and 45 delays (36.43% of the quarter's penalties), and pickup day still can't be told apart from chance (a 4.62-point range from about 600 shipments a day, p = 0.11), although at this volume only a gap of about 4.3 points would show. This quarter's on-time rate of 91.21% is lower than the 92.19% of the previous twelve months (z = 2.16). The drop comes almost entirely from January 2026 (90.05%), while February and March are at 91.81%. Statements about rankings don't hold. The range between routes widens to 7.20 points and Surabaya to Balikpapan moves from the worst three to the best. Jakarta to Semarang falls to 88.69%, below the quarter's average. A courier ranking can't be built at all, because the courier with the most shipments holds only 16 and the 30 threshold excludes all 500 couriers.

## Query that was run

The full pipeline with a comment at each decision. The file 1-Kueri SQL.sql in the Drive folder holds 14 statements that were rerun on ClickHouse and produce the figures on this page. Its revision adds one query that hasn't been run yet, the spread of shipments without an arrival date by route.

```sql
WITH kiriman_bernomor AS (
    -- Decision 1. Copies come from warehouse rescans, a few seconds to two
    -- minutes apart. There is no row-creation time column, so the copy kept
    -- is the one with the earliest PickupDate (the first scan).
    -- Rejected: DISTINCT, because the copies differ in PickupDate and would
    -- not be removed. On this data, keeping the last copy gives the same final numbers.
    SELECT *,
        ROW_NUMBER() OVER (PARTITION BY ShipmentID ORDER BY PickupDate ASC) AS urutan
    FROM supply_chain.shipments
),

kiriman_sah AS (
    -- Decision 2. Three layered removals in one filter.
    -- toDate(PickupDate) on the left: PickupDate includes a time, so without toDate()
    -- every shipment during 31 March is dropped too (24,804 instead of 24,840).
    -- The cut-off date is written as a literal, not today(), so the result is stable.
    -- Decision 3. Zero weights (58 rows) are removed along with negative weights (42).
    -- Weight isn't used in any analysis. Zero weights are removed because the rows
    -- were filled in without weighing. This reason is weaker than for negative weights.
    SELECT *
    FROM kiriman_bernomor
    WHERE urutan = 1
      AND toDate(PickupDate) <= toDate('2026-03-31')
      AND Weight_kg > 0
),

masih_jalan AS (
    -- Decision 4. Not yet arrived means it can't be judged yet. Set aside, neither
    -- discarded nor counted. The filter is IS NULL, not a date comparison,
    -- because comparing with NULL drops rows in both directions.
    SELECT * FROM kiriman_sah WHERE DeliveryDate IS NULL
),

kiriman_terukur AS (
    -- The only base for every percentage. Read from kiriman_sah (branching),
    -- not from masih_jalan.
    SELECT * FROM kiriman_sah WHERE DeliveryDate IS NOT NULL
),

penanda_lambat AS (
    -- Decision 5. Late = DeliveryDate after that shipment's PromisedDate.
    -- Rejected: one travel-time limit for all routes, which punishes long routes
    -- for their distance. meleset_hari is only a note, not the deciding rule.
    SELECT *,
        CASE WHEN DeliveryDate > PromisedDate THEN 1 ELSE 0 END AS terlambat,
        dateDiff('day', PromisedDate, DeliveryDate) AS meleset_hari
    FROM kiriman_terukur
),

per_jalur AS (
    -- Penalties are calculated from the COUNT (lambat * 50000), not from a rounded
    -- percentage. Percentages are rounded once, at the end.
    SELECT
        concat(OriginCity, ' ke ', DestCity) AS jalur,
        count() AS kiriman,
        countIf(terlambat = 1) AS lambat,
        round(countIf(terlambat = 0) * 100 / count(), 2) AS ketepatan,
        countIf(terlambat = 1) * 50000 AS denda
    FROM penanda_lambat
    GROUP BY jalur
),

per_hari AS (
    -- toDayOfWeek in ClickHouse: 1 Monday to 7 Sunday. Matched against dates whose weekday
    -- is known: 2025-01-06 = 1 (Monday), 2026-03-29 = 7 (Sunday),
    -- 2026-03-31 = 2 (Tuesday). No penalty column, because the pickup day can't
    -- be acted on.
    SELECT
        toDayOfWeek(PickupDate) AS hari,
        ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'][toDayOfWeek(PickupDate)] AS nama_hari,
        count() AS kiriman,
        countIf(terlambat = 1) AS lambat,
        round(countIf(terlambat = 0) * 100 / count(), 2) AS ketepatan
    FROM penanda_lambat
    GROUP BY hari, nama_hari
),

per_kurir_penuh AS (
    -- Full table with no threshold and no LIMIT, used by the sum checks.
    SELECT
        CourierID,
        count() AS kiriman,
        countIf(terlambat = 1) AS lambat,
        round(countIf(terlambat = 0) * 100 / count(), 2) AS ketepatan
    FROM penanda_lambat
    GROUP BY CourierID
),

per_kurir AS (
    -- Decision 6. An eligibility threshold of 30 shipments, written BEFORE the ranking was seen.
    -- On the full data it excludes no one (the minimum is 33 shipments),
    -- and it is still written. A 95% Wilson interval comes with every row because each courier
    -- only holds about 45 shipments.
    SELECT
        CourierID,
        count() AS kiriman,
        countIf(terlambat = 1) AS lambat,
        round(countIf(terlambat = 0) * 100 / count(), 2) AS ketepatan,
        countIf(terlambat = 0) / count() AS p_tepat,
        round((p_tepat + 1.96 * 1.96 / (2 * kiriman)
            - 1.96 * sqrt(p_tepat * (1 - p_tepat) / kiriman + 1.96 * 1.96 / (4 * kiriman * kiriman)))
            / (1 + 1.96 * 1.96 / kiriman) * 100, 2) AS selang_bawah,
        round((p_tepat + 1.96 * 1.96 / (2 * kiriman)
            + 1.96 * sqrt(p_tepat * (1 - p_tepat) / kiriman + 1.96 * 1.96 / (4 * kiriman * kiriman)))
            / (1 + 1.96 * 1.96 / kiriman) * 100, 2) AS selang_atas
    FROM penanda_lambat
    GROUP BY CourierID
    HAVING count() >= 30
    ORDER BY ketepatan ASC, CourierID ASC
    LIMIT 10
),

kiriman_berisiko AS (
    -- CHALLENGE C. Decision 7. Past its promise = the promised date falls on or
    -- before 2026-03-31 (toDate on the left, the same rule as the pickup date,
    -- so promises during 31 March count as passed). If made strict
    -- (before 31 March), the count is 2,108.
    -- Days are counted from the promised date to the 2026-03-31 cut-off, in
    -- calendar days. Not from the pickup date, because what's measured is the promise passing.
    -- RULE: this count is NOT added to 1,809 and NOT multiplied by 50000.
    SELECT
        count() AS berisiko,
        round(avg(dateDiff('day', toDate(PromisedDate), toDate('2026-03-31'))), 1) AS rata_hari_lewat
    FROM masih_jalan
    WHERE toDate(PromisedDate) <= toDate('2026-03-31')
)

SELECT jalur, kiriman, lambat AS terlambat, ketepatan, denda
FROM per_jalur
ORDER BY ketepatan ASC;
```

Data note: the figures on this page come from a practice dataset designed to mimic the shipment records of an intercity logistics company. The data and charts for Figures 1 to 5 are on the 6-Data Grafik sheet.
