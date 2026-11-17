**Two branch lists, both correct, one file: building a screen that states its reference**

An auto parts distributor was about to split a Rp 6 billion branch-head bonus and a Rp 12 billion marketing budget from a ranking of its 24 branches. Two rankings were going around the meeting, both calculated correctly, and their winners differed. I built one screen that names the reference of every panel, separates the branches whose answer is the same under any reference, and shows where the difference between the two lists comes from.

Mochamad Fajri Ilham Nurdin, November 2026. The data is synthetic; the company name is fictional. Data files, calculation script, dashboard, reference rationale document, and memo: project folder on Google Drive.

## Context

**The company.** RodaNusa distributes auto parts through 24 branches in four regions. The fiscal year from July 2025 to June 2026 closed with revenue of Rp 782.0 billion, up 12.9% from Rp 692.5 billion, and 98.2% of the network target of Rp 796.2 billion. Branch sizes are very unequal: Surabaya booked Rp 98,048.5 million, Kupang Rp 2,260.6 million.

**The decisions at stake.** A Rp 6 billion branch-head bonus and next year's Rp 12 billion marketing budget, both decided from the charts shown at the year-end meeting. That meeting stopped at the twelfth minute: the Sales Director showed a ranking by annual growth with Madiun on top (+33.4%), the Planning Director showed a ranking by target achievement with Tasikmalaya on top (116.2%).

**Why it's hard.** No figure is wrong. Both charts use the same form, sorted horizontal bars in percent, so they read as two opinions about one thing. Both measure each branch from that branch's own zero point, and no title says so.

**Figure 1. The two lists brought to the meeting**

![gambar 1](images/gambar-1.png)

*The Two lists panel on the Compare page: the top four by growth (left) and by percent of target (right). Note the names that appear on only one list.*

**Data and its limits.** Three files: monthly revenue and units sold for 24 branches over 36 months (864 rows), each branch's city and region, and a reference file holding the current-year target, last year's revenue, revenue two years ago, and a market growth benchmark per region. The 12-month totals in the monthly file match the reference file in 72 of 72 values. There are no operating costs, prices, competitor data, or records of branch-head changes. **My role:** choosing each panel's reference, form, order, and marking; checks; the reference rationale document; a one-page memo.

## Framework and approach

All five references were already available as columns. What needed deciding was which reference becomes a panel's frame, which rides along as a marker, and which isn't drawn because it repeats another panel. Before choosing forms, I answered one question for each reference: are its 24 bars measured from the same zero point? Only added rupiah answers yes.

| Decision | Chosen | Rejected alternative | Reason |
|---|---|---|---|
| Main panel frame | Added rupiah against last year | Target achievement alone | The largest target is 46 times the smallest; without rupiah alongside, four of the six biggest contributors are drawn as failures |
| Agreement | A 24 x 5 matrix, cut at each reference's median | Five equal bar charts | Five different orders can't be traced across panels; the matrix gives up magnitude to get a per-row pattern |
| Target deviation form | Length = percent, label = rupiah | Actual and target bars side by side | Surabaya's Rp 4,719.9 million gap and Kupang's Rp 25.1 million both look like a thin gap |
| Row order | One order for all four panels: group, then added rupiah | Each panel sorted by its own value | One order makes one row per branch readable across panels |
| Controls | None | Reference picker, region filter | Six combinations of reference and unit put three different names on top; a filter silently changes the median |

**Checks that changed the design.** First, I compared the order of the growth list and the target-achievement list before installing both. For the 21 branches whose target is last year's revenue × 1.15, the two are identical (correlation 1.000), so the growth panel was dropped and replaced with the two-list chart above. Second, the gap to the market benchmark correlates 0.930 with growth, so it only stays as a matrix column. Third, the correlation of 0.015 between growth and the revenue index against FY24, a figure commonly used as a reason to give the index its own panel, turns out to be shaped by three points. Fourth, the red highlight in the rupiah panel disappeared when printed in grayscale, so I made the other bars lighter.

**Figure 2. The zero of every percent-of-target bar**

![gambar 2](images/gambar-2.png)

**Figure 3. Two scatter tests before installing the second panel**

![gambar 3](images/gambar-3.png)

*See the two black bars at the left and right ends of the target chart; in the right scatter chart, the three named points far from the band of other points.*

## Findings and recommendations

1. **Ten of the 24 branches agree on all five references.** Bandung, Medan, Bekasi, Palembang, and Bogor are above the network median on all five; Banjarmasin, Cirebon, Samarinda, Jember, and Manado are below the median on all five. The debate is about 14 branches.
2. **The two lists differ because of three hand-set targets.** 21 of the 24 targets equal last year's revenue × 1.15, so the two lists are identical from row 5 to row 24. Tasikmalaya (×1.020), Madiun (×1.280), and Kupang (×1.240) are what make the top differ. At ×1.15, Tasikmalaya would sit at 103.1% and Madiun would lead both lists.
3. **The target-achievement winner ranks 17th of 24 in rupiah.** Tasikmalaya added Rp 1,113.1 million, 17th of 24. Bandung, Surabaya, Palembang, and Bogor read as missing their targets even though they are among the six biggest contributors; together they added Rp 30,433.9 million, 34.0% of the network's growth.
4. **The revenue index against FY24 and growth differ at only three branches, and that's exactly where the decision is.** Their correlation is 0.015 across 24 branches and 0.882 without Cirebon, Madiun, and Kupang, whose revenue fell last year (−6.9%, −21.9%, −30.5%). Madiun grew +33.4% with an index of 104.3; Kupang +25.4% and 87.2. Cirebon grew +0.6%, with an index of 93.7, a second half of −0.6%, and units sold down 5.5%.

**Figure 4. The ranking used in the meeting: % of target**

![gambar 4](images/gambar-4.png)

*Percent of target achieved, the order brought to the meeting. Note Tasikmalaya's red bar.*

**Figure 5. The same branches, the same zero: the 24-branch table in the dashboard**

![gambar 5](images/gambar-5.png)

*The Compare page, fixed row order. First column: added rupiah against last year; second column: distance from its own target, red meaning below target. Note Tasikmalaya's row (purple) in both columns, and the four branches below 0 in the second column that are in the top six in the first.*

**Recommendation.** Split the bonus by target achievement, with how targets were set written on the panel, and let the meeting decide openly whether the three hand-set targets are paid by the written target or by the ×1.15 basis; both ways put all three above target, and what changes is their order. Read the marketing budget from the revenue index against FY24 (FY24 = 100) together with added rupiah. Annual growth isn't used for the budget because it misleads at exactly the branches that fell last year. Surabaya (missing the largest target by Rp 4,719.9 million, index 119.5) and Cirebon (index 93.7 and still falling) need two different kinds of attention.

**Limits.** The data doesn't explain causes and holds no costs, so there is no claim about which branch is most profitable. Targets are a planning decision; this work shows the effect of their multipliers on the picture and doesn't judge whether they are reasonable. Network revenue rose 12.9% while units sold rose 5.5%, and the data doesn't separate price from shifts in product mix.

## Evidence layer

**Figure 6. The Overview page of the Power BI dashboard**

![gambar 6](images/gambar-6.png)

**Reading order.** The screen's title names the number of branches that agree: 10 of 24. The left column holds two network figures (10 of 24 branches agree, 98.2% of target achieved) and three things to check before deciding. The matrix on the right gives one row per branch and one column per reference: blue above the median, yellow below, red the bottom six. The Compare page holds each reference's figures and the reason the two meeting lists differ; the Branch page details one branch.

| Check | Result | What was observed and fixed |
|---|---|---|
| Reference figures recalculated from monthly data | Pass | 72 of 72 values match; every case figure quoted matches |
| Reference and unit in every panel title | Pass | Panels 3 and 4 carry a per-branch zero warning |
| Correlation of side-by-side panels | Pass, with a note | 0.015 is sensitive to three branches; recorded in the reference rationale document |
| Grayscale render | Fail, fixed | Tasikmalaya's highlight in panel 2 was as dark as the other bars |
| "Name the reference" test on a new reader | Not yet | Waiting for a reader who wasn't involved in building it |

**Handover.** Two things must not be changed without changing the panel title: the shared row order (if each panel is sorted on its own, the four panels turn back into four lists), and the network median cut (a region filter changes it). Every fiscal year, check again how many targets use the standard multiplier; if every target uses the same formula, the growth list and the target list will be fully identical.

Rearranged 24 branches on references with the same zero, showed that 10 branches agree on all five references and that the two lists that stalled the meeting differ only because of three hand-set targets, then paired one reference with the Rp 6 billion bonus and one with the Rp 12 billion budget.
