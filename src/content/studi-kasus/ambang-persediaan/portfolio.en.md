**All 361 Reorder Points Sit Below Their Standard Formula, and the Gap Comes From a Single Operator**

Inventory analysis · three-warehouse distribution network · Spreadsheet · scope of 361 clean SKUs from 401 raw rows

Mochamad Fajri Ilham Nurdin · completed October 2026 · [mfajriilhamn@gmail.com](mailto:mfajriilhamn@gmail.com)

*Data note: the figures below come from a simulated dataset that mimics the inventory patterns of a distribution network. It is not real company data, and it is not presented as work experience at any company.*

**Summary.** A distribution network builds its weekly orders from a list produced by its inventory system. After three products sat empty on the shelf for almost a week without ever appearing on that list, I recalculated the reorder points from their inputs. They turned out to be too low for every single item, without exception, because the formula adds two days to the lead time instead of doubling it. This work produces two separate action lists: the items that must be handled that week, and one formula that needs replacing in the system.

**Why this report exists.** The weekly order list decides which items get ordered, and an empty shelf means lost sales plus complaints from stores. The head of operations asked for a list of low-stock items before the procurement meeting, assuming it was enough to filter the existing reorder-point column. What made the earlier stock-outs confusing: none of the three empty products ever appeared on the list with any warning. With no warning at all, a reorder-point error like this can run unnoticed for a long time.

**Data.** An inventory system export for a single date: about four hundred rows, fifteen columns, three warehouses, five product categories. 361 rows remain after forty rows were removed for duplicates, negative stock, empty or zero prices, and empty lead times. There is no holding cost, stock-out history, supplier reliability record, or system change history, and daily sales are already averages, so their spread is unknown.

**What I did.** I first split the columns into two types: observations and calculated results. I recalculated the second type from its inputs in helper columns; the original columns were not overwritten, because comparing the two is the finding. Once it was clear every row deviated in the same direction, I looked for an exact relationship between columns to trace the formula the system uses, then translated the gap into the number of affected items, split by urgency. Rejected approach: concluding the data was clean because three cross-column consistency rules held with no violations, since consistency only proves every number came from one rule, not that the rule is right. Also rejected: reporting the 1.376 average ratio as the system multiplier, because not a single item uses that number, and using the warehouse ranking as the explanation, because the formula is the same in all three warehouses.

**Figure 1. Not one item has the right reorder point.**

![figure 1](images/gambar-1.png)

*Distribution of the gap between the reorder point under the standard formula and the one recorded in the system, for 361 clean SKUs. Note that every bar is on the "too low" side and the "right / above" row is empty.*

**Figure 2. The shortfall grows as the lead time gets longer.**

![figure 2](images/gambar-2.png)

*Recorded reorder multiplier (black dots) compared with the standard formula (blue dots) for each lead time, 361 clean SKUs. Note that the gap between the two dots widens from the top row to the bottom row.*

**Figure 3. Two groups of items that need different actions.**

![figure 3](images/gambar-3.png)

*Number of SKUs on the order list under two rules, plus the critical group counted separately, from 361 clean SKUs. Note the dividing line: the bottom bar is not part of the gap of 75.*

**Findings.**

- Three cross-column consistency rules hold without a single violation, so every standard check reports the data as clean.  
- Recalculated with the standard formula, the reorder point is too low for 361 of 361 items, short by 24.9 units on average, with no exceptions.  
- The system's formula can be traced and holds for every row: reorder point = daily sales × (lead time + 2), while the standard formula is equivalent to daily sales × (lead time × 2). The shortfall rises from 16.7% at a 3-day lead time to 40.0% at 10 days; items with lead times of 7 days or more are missed 26.2% of the time, items of 5 days or less 15.1%.  
- As a result, the order list holds 118 items when it should hold 193, so 75 items (20.8%) never appear. Separately, 68 items (18.8%) already have stock below what's needed during the lead time, and the two groups don't overlap. The sales value that can't be served for those 68 items is at most Rp 234.0 million; this is an upper bound, not a loss.

**What changed in the decision.** Before the analysis, the team would have ordered from the 118-item list as usual, and the next stock-out would have happened without warning. Afterwards, the output becomes two jobs for different owners: 68 critical items that need expedited delivery or a stock transfer that same week, handled by procurement, and one formula replaced in the system so every item, including ones not yet in the system, is calculated correctly, handled by the inventory system owner. Splitting by warehouse also changes the shape of the action: the share of items missed because of the formula is similar in all three warehouses (18.5% to 23.6%), but warehouse A holds 32 of the 68 critical items, so urgent action starts there without needing a formula audit per warehouse.

**Limits.** The data has no holding cost, so raising the reorder point can't be claimed as a saving; the 2.0 multiplier is grounded in the standard formula, not in cost optimization. The sales value at risk is an upper bound, because customer behavior isn't recorded. Daily sales are averages and lead times are recorded as fixed numbers, so the count of critical items is an estimate, and whether the buffer is enough for unstable demand can't be judged. The cause of the low stock in warehouse A is not in the data.

**Audit trail.** A six-sheet working file with every formula visible, a cleaning log that also records three consistency checks that came back zero, the original and recalculated reorder-point columns side by side, two versions of the order list with their differences flagged, a replacement formula ready to install, and the results of seven validation gates.
