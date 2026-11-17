**A Proposal for 12 Vans Worth Rp 2.1 Billion Was Nearly Approved, Yet the Extra Time Appears Before the Vehicles Leave**

Diagnosis of a same-day delivery decline, logistics operator with eight hubs, Power BI dashboard, 72,000 orders from 1 May to 29 June 2026

Mochamad Fajri Ilham Nurdin, completed November 2026, mfajriilhamn@gmail.com

Data note: the figures below come from a simulated dataset that mimics same-day delivery operations. It is not real company data and is not presented as work experience at any company.

## Summary

A same-day delivery operator saw its on-time rate fall from 94.2% to 82.6% after the order cut-off was moved two hours, and the Director of Operations proposed leasing 12 extra vans worth Rp 2.1 billion a year. That network figure is correct, and it points to no hub, hour, or process stage. I laid out the same evidence in an order that separates the four: 78.2% of the extra time turns out to appear in the dispatch queue, while last mile, the stage where vans work, accounts for only 3.8%.

## Why this report exists

On 17 June 2026, the same-day cut-off was moved back from 14:00 to 16:00 to give customers a longer shopping window. Thirteen days later, the capital approval meeting opened with one card: 82.6% on time. From that figure, "late orders mean too few vehicles" is a reasonable guess, and the Rp 2.1 billion a year decision would be made the next morning with or without an analysis. The Head of Fulfillment needed one screen whose argument lands in 30 seconds, and whose details can be defended line by line when questioned.

## Data

Three files at different levels of detail: 72,000 order rows with the duration of each process stage (pick, pack, dispatch, transit, last mile), 480 hub-day summary rows, and 1,920 hub-day-time-band summary rows. All three match each other down to the cell. About 28% of orders are next-day service and are never late. The data has no dispatch staff numbers, dock capacity, weather, or hourly van utilization.

## What I did

I wrote the screen's argument in one sentence before opening the tool, then gave each clause one form: a control chart to prove the shift, two hub panels for load and proportion, a hub-by-order-hour heatmap to find the intersection, and the minute gap per stage for where the lost time sits. Every figure had a written contract (source, level of detail, numerator, denominator, comparison) before it was drawn.

Rejected approaches: two before-and-after bars, because they can't tell a lasting shift from a few bad days; ranking hubs by the number of late orders alone, because that puts the biggest hub on top whatever its state; a combined priority score, because its weights are a business decision no one has approved; and the composition of total duration per stage, because transit (about 110 minutes) would look dominant even though it barely changed.

Checks that changed the work: averaging on-time per hub-day gives 84.44%, 1.88 points above the ratio of totals of 82.56%, so every rate was recalculated as a total divided by a total. My draft memo once said vans could help by at most 3.8%. I took that sentence out, because the dispatch queue could be waiting for empty vans and this data has no hourly utilization. The test design was then changed so the number of vans is held fixed.

**Figure 1. All thirteen days after 17 June sit below the baseline's normal range**

![gambar 1](images/gambar-1.png)

*Daily network on-time rate, 1 May to 29 June 2026. The dashed band is the normal range before 17 June; the blue line after it. Note that every day after 17 June is below the lower limit.*

Daily network on-time rate, 1 May to 29 June 2026, 72,000 orders. The gray band is the control limit calculated from the period before 17 June. Note where the red points sit relative to that band, and that not one returns inside it.

**Figure 2. Jakarta carries the largest load, Bandung has the highest late rate**

![gambar 2](images/gambar-2.png)

*Top: number of late orders per hub after 17 June. Bottom: late rate per hub. Note Jakarta in the top chart and Bandung in the bottom chart.*

Eight hubs, 17 to 29 June 2026, 15,600 orders. Left, number of late orders; right, late rate with its number of orders, hubs in the same order in both panels. Note that the top two rows don't have the same order on the left and the right.

**Figure 3. Lateness piles up on orders placed 15:00 to 17:59 at two hubs**

![gambar 3](images/gambar-3.png)

*Percentage of orders late after 17 June by hub and order time band. Brighter means higher. Note the 15:00 to 17:59 column in the Jakarta and Bandung rows.*

Late rate by hub and order time band, 17 to 29 June 2026, with the number of orders in each cell. Note the two framed cells, and that the morning cells of the same two hubs don't differ from other hubs.

**Figure 4. The dispatch queue carries 78.2% of the extra minutes, last mile 3.8%**

![gambar 4](images/gambar-4.png)

*Extra minutes per order above standard time, after subtracting the state before 17 June, by process stage. Note the Dispatch bar compared with Last mile.*

Excess minutes per order above each stage's standard time, after subtracting before 17 June, in process order. Note the one bar far ahead of the other four, and that it sits before transit and last mile.

**Figure 5. No hub comes close to full van capacity on the daily average**

![gambar 5](images/gambar-5.png)

*Average van utilization per hub after 17 June; 100% means every van in use all day. Note the distance from the highest bar to 100%.*

Average van utilization per hub, 17 to 29 June 2026, axis 0% to 100%. Note the distance from the highest bar to the full-capacity line.

## Findings

1. On-time fell 11.6 points, from 94.2% to 82.6% (12,880 of 15,600 orders). All thirteen days after the change sit below the lower limit of 92.2%, without one returning to the range.
2. Jakarta carries 945 late orders (24.2% of 3,900), Bandung has the highest late rate at 26.8% (523 of 1,950). Measured against each hub's own habit before 17 June, these two hubs carry 64.1% of the network's extra lateness.
3. At those two hubs, orders placed 15:00 to 17:59 were late 59.9% of the time (Bandung, 397 of 663) and 49.5% (Jakarta, 656 of 1,326), while both hubs' morning orders were 7.0% to 8.5%.
4. The extra time is 5.93 minutes per order, and 4.63 minutes of it (78.2%) forms in the dispatch queue. Last mile contributes 0.23 minutes (3.8%), and average van utilization is 65.1%, 58.9% to 69.9% by hub.
5. The share of orders placed 15:00 to 17:59 stays at 34% in both periods. What changed is how long same-day orders in that window wait at dispatch: 31.0 minutes on average before 17 June and 54.1 minutes after.

## What changed in the decision

Before the analysis, the meeting would have decided how many vans to add. After it, the question becomes at which stage time is added and whether that stage's capacity is what's short. The recommendation: hold the 12-van contract for two weeks and test extra dispatch capacity from 15:00 to 18:00 in Jakarta and Bandung, or restore the 14:00 cut-off for the test group if extra capacity isn't available, with the number of vans held fixed. It succeeds if the test group's on-time rate returns to 92.2% or higher, dispatch excess minutes fall by at least 50%, and cancellations don't rise meaningfully. The van proposal isn't thrown out; it is decided again from the test result.

**Figure 6. The Overview page of the Power BI dashboard**

![gambar 6](images/gambar-6.png)

One 16:9 screen read from top to bottom: the shift, location, hour, stage, checks, then action. Note that this screen has no KPI card in the top left corner, and the recommendation is in the last row.

## Limits

This analysis is observational. The cut-off change coincides with the decline and hasn't been proven to be the only cause, because staffing, dock capacity, and order mix haven't been separated. The 65.1% utilization is a daily average and could hide peaks by route or by hour. The network figure includes next-day orders; counting only same-day orders, on-time fell from 91.9% to 75.9%, with the same hubs, hours, and stage. Rp 2.1 billion is the value of the contract on hold, not a saving.

## Trace

The calculation script that reads all three raw files and produces every figure above; a design decision log with one row per element, metric contracts, and rejected forms; a validation log with five audits, including five checks that failed and were fixed and retested; a one-page decision memo; and the Power BI dashboard. All are in the project folder.
