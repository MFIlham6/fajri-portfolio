**All 361 Reorder Points Sit Below Their Standard Formula, and the Gap Comes Down to One Operator**

Inventory analysis, three-warehouse distribution network, Spreadsheet, 361 clean SKUs from 401 raw rows, time spent: 24 hours

Mochamad Fajri Ilham Nurdin, completed October 2026, mfajriilhamn@gmail.com

*Data note: the figures below come from a simulated dataset that mimics the inventory patterns of a distribution network. It is not real company data, and it is not presented as work experience at any company.*

## Summary

A distribution network builds its weekly orders from a list produced by its inventory system. After three products sat empty on the shelf for almost a week without ever appearing on the list, the reorder points were recalculated from their inputs. The reorder point was too low on every item, without a single exception: the formula adds two days to the lead time, while the system's own safety stock equals one full lead time. Low reorder points make items reach the list late; the case of those three products could not be checked because they are not identified in the file. This work produces two separate action lists: the items that must be handled that week, and one formula that needs replacing in the system.

## Why this report exists

The weekly order list decides which items get ordered, and an empty shelf means unserved sales as well as complaints from stores. The warehouse head asked for a list of items running low before the procurement meeting, assuming it was enough to filter the existing reorder-point column. What made the earlier incident confusing: the three empty products never appeared on the list with any warning.

## Data

An inventory system export for a single date: about four hundred rows, fifteen columns, three warehouses, five product categories. 361 rows remain after forty were dropped for duplicates, negative stock, empty or zero prices, and empty lead times. There is no holding cost, stockout history, supplier reliability record, or system change history, and daily sales are already averages, so their spread is unknown.

## What was done

The columns were first split into two kinds: those that hold observations and those that hold calculated results. The second kind was recalculated from its inputs in helper columns; the original columns were not overwritten, because comparing the two is the finding. Once every row turned out to deviate in the same direction, I looked for a relationship between columns that holds exactly, to trace the formula the system uses, then translated the gap into the number of affected items, split by urgency. Rejected approach: concluding the data was clean because three cross-column consistency rules were followed without a violation, since consistency only proves every number came from one rule, not that the rule is right. Also rejected: reporting the average ratio of 1.376 as the system multiplier, because not one item uses that number, and using the warehouse ranking as the explanation, because the formula is the same in all three warehouses.

**Figure 1. Not a single item has the right reorder point.**

![gambar 1](images/gambar-1.png)

*Distribution of the gap between the reorder point by the standard formula and the reorder point recorded in the system, for 361 clean SKUs. Note that every bar falls in a "short by" group, and the "equal or above" group is zero.*

**Figure 2. The shortfall grows as the lead time gets longer.**

![gambar 2](images/gambar-2.png)

*How far the recorded reorder point sits below the standard formula, as a percentage of the standard formula, for each lead time, 361 clean SKUs. Note the bars rising from 16.7% at 3 days to 40.0% at 10 days.*

**Figure 3. Two groups of items that need different actions.**

![gambar 3](images/gambar-3.png)

*Number of SKUs on the order list under two rules, plus the critical group counted separately, from 361 clean SKUs. Note the dark gray bar at the bottom: the critical group is counted with a different rule and is not part of the gap of 75.*

## Findings

1. Three cross-column consistency rules are followed without a single violation, so every standard check reports clean data.
2. Recalculated with the standard formula, the reorder point is too low on 361 of 361 items, short by 24.9 units on average, without a single exception.
3. The formula the system uses can be traced and holds on every row: reorder point = daily sales × (lead time + 2), while the standard formula equals daily sales × (lead time × 2). The reorder-point gap rises from 16.7% at a 3-day lead time to 40.0% at 10 days. The share of missed items rises too: 26.2% at lead times of 7 days or more, 15.1% at 5 days or less.
4. As a result, the order list holds 118 items when it should hold 193, so 75 items (20.8%) never appear. Separately, 68 items (18.8%) already have stock below what's needed during the lead time, and the two groups don't overlap. Sales not covered by stock for those 68 items during the lead time come to at most Rp 66.7 million; this is an upper bound, not a loss.

## What changed in the decision

Before the analysis, the team would have ordered from the 118-item list as usual, and the next stockout would have come without warning. After it, the output becomes two jobs with different owners: 68 critical items that need expedited delivery or stock transfers that same week, handled by procurement, and one formula replaced in the system so every item, including ones not yet in the system, is calculated correctly, handled by the inventory system owner. Splitting by warehouse also changes the shape of the action: the share of items missed because of the formula is similar across the three warehouses (18.5% to 23.6%), but the Jakarta warehouse holds 32 of the 68 critical items, so the urgent work starts there without auditing the formula warehouse by warehouse.

## Limits

The data has no holding cost, so raising reorder points can't be claimed as savings; the 2.0 multiplier rests on the standard formula, not on cost optimization. The Rp 66.7 million figure is an upper bound, because customer behavior isn't recorded. Daily sales are averages and lead times are recorded as fixed numbers, so the number of critical items is an estimate, and whether the buffer is enough for unstable demand can't be judged. The cause of the low stock at the Jakarta warehouse isn't in the data.

## Trace

A seven-sheet workbook with every formula visible, a cleaning log that also records three consistency checks that came back zero, the original reorder-point column next to the recalculated one, two versions of the order list with their differences marked, a replacement formula ready to install, and the results of seven validation checks.
