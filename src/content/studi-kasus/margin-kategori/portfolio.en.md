**Combined margin rose 4.84 points while all seven category margins fell: building one screen that holds both**

A marketplace was about to pay out a Rp 34 billion incentive and raise seller service fees on the basis of a combined gross margin that rose from 15.58% to 20.43%. That figure is calculated correctly. Split by category, the margins of all seven categories behind it fell. I built a dashboard that shows both facts on one screen and breaks down where the rise comes from.

Mochamad Fajri Ilham Nurdin, November 2026. The data is synthetic; the company name is fictional. Data files, calculation script, dashboard, memo, and validation notes: project folder on Google Drive.

## Context

**The company.** TokoRame sells in seven categories. Over 24 months (July 2024 to June 2026) its monthly GMV rose from Rp 102.8 billion to Rp 230.9 billion, +124.7%, and all seven categories grew in rupiah. Their speeds are very unequal: Beauty +796.7%, Health +673.8%, Electronics +16.4%.

**The decisions at stake.** Two proposals rest on the rise in combined margin: a Rp 34 billion incentive for the pricing team, and a seller service fee increase across all seven categories. The Finance Director asked for a per-category breakdown before either goes ahead.

**Why it's hard.** The data is clean and no figure is wrong. The combined margin really did rise +4.84 points, and the margins of all seven categories really did fall, by −1.13 to −3.00 points. The direction of the combined figure is the opposite of the direction of all its parts, and no single standard chart carries both: a big-number card throws away the parts, absolute stacked bars don't hold margin, 100% stacked bars make Electronics look like it collapsed, and indexed lines throw away size.

**Figure 1. The figure the directors see**

![gambar 1](images/gambar-1.png)

*Combined gross margin per month, July 2024 to June 2026, the first panel of the Overview page in the Power BI dashboard. Note the line rising until late 2025 and then flattening.*

**Data and its limits.** 168 rows, seven categories × 24 months, holding GMV and gross profit. There is no margin column, so how to derive it is a decision. There are no operating costs, prices, promotions, competitor data, or policy notes, so this work can show where the rise comes from and can't explain why the mix shifted. **My role:** metric definition, choice of forms, the breakdown, checks, and a one-page memo.

## Framework and approach

Five presentation decisions can reverse the sign of the conclusion without changing a single figure. Each has a default setting that feels neutral, so I decided each one and wrote it on the screen.

| Decision | Chosen | Rejected alternative | Reason |
|---|---|---|---|
| Margin definition | SUM(profit)/SUM(GMV), written on screen | AVG(profit/GMV), the default in many BI tools: −1.98 points | The directors' question is about every rupiah; only a weighted margin can be multiplied into gross profit |
| Height and weight | Bubble scatter: margin change, ending margin, area = GMV | Two bar panels side by side | The finding is the relationship between the two; separate panels ask the reader to pair seven rows from memory |
| Window | 24 months, written in the title, with a curve across every window length | Last 12 months as the default filter: −0.25 points | The sign flips at 13 months; a window hidden in a filter hides that there is a choice |
| Grouping | Seven categories | Two super-categories: Lifestyle +1.96, Technology −1.42 | Merging means reweighting; Lifestyle rises even though all four of its members fall, and decisions are made per category |
| Small-multiple axes | 6 points wide, centered per category | One shared axis, or automatic axes | A shared axis flattens the declines; automatic axes make −1.13 and −3.00 points look equally steep |

**Checks that changed the design.** The first test of every version is arithmetic: +7.02 from weight, −1.84 from performance, and −0.34 from interaction must add up to +4.84. That test produced a finding, the negative sign of the interaction, and because of it the breakdown panel shows all three terms. The second test repeats the breakdown for every window length. The result: in every window of 4 to 24 months all seven categories fall and the performance term is negative, while the weight term shrinks from +7.02 to about zero. The third test splits the weight term by category; Electronics' sign flips (−1.94 or +1.24 points) depending on the reference, so that detail wasn't installed.

**Figure 2. Window curve: total change and its two terms for every window length**

![gambar 2](images/gambar-2.png)

*Margin change by the distance between the two periods compared, 3 to 24 months. Note the margin effect line (Rate effect, red) below zero across the whole range, and the total change line that only crosses zero at a distance of 13 months.*

**Figure 3. Sales share alongside GMV in rupiah**

![gambar 3](images/gambar-3.png)

*The Categories page: share of sales value per category (left) and monthly GMV in Rp billion (right), July to September 2024 against April to June 2026. Note Electronics: its share fell from 42.4% to 22.0% while its rupiah rose.*

## Findings and recommendations

1. **All seven categories lost margin.** The last three months against the first three: Beauty −3.00, Health −2.39, Fashion −2.12, Home −1.99, Electronics −1.63, Phones & Accessories −1.62, Automotive −1.13 points. This is a seven-row calculation on one window and one definition; it doesn't judge anyone's performance.
2. **Combined margin rose because the mix shifted.** The +4.84-point rise is made up of a +7.02-point mix effect, a −1.84-point rate effect, and a −0.34-point interaction. The interaction is negative because weight flowed to the categories whose margins fell deepest: Beauty grew fastest and lost the most margin.
3. **The source of that rise has run out.** Combined margin peaked in November 2025 (21.17%) and flattened after, Beauty's share stopped at about 26%, and the mix effect over the last 6 months is almost zero. What remains is the decline in category margins, which is negative at every window length.
4. **A falling share doesn't mean a shrinking category.** Electronics' share fell from 42.4% to 22.0%, while its monthly GMV rose 16.4% and it is still the second largest. The service fee proposal applies to all seven categories, including this large category that is still growing.

**Figure 4. Margin change in each category**

![gambar 4](images/gambar-4.png)

*Margin change in each category in points, July to September 2024 against April to June 2026. Note that all seven bars are on the negative side.*

**Figure 5. Breaking down +4.84 points**

![gambar 5](images/gambar-5.png)

*Mix effect +7.02, rate effect −1.84, and interaction −0.34 points. Note the Mix bar is taller than the total rise.*

**Recommendation.** Separate the two decisions that are attached to one figure. The incentive is postponed one meeting and judged against the per-category breakdown; if the incentive rules were meant from the start to measure mix shifts, it can be paid on that basis with the basis written down. The service fee proposal is calculated per category before it is decided. As a counterfactual comparison: if each category's margin had held and only the mix had shifted, today's combined margin would be 22.60%, or Rp 5,030 million a month (about Rp 60.4 billion a year) above the recorded gross profit. That figure is a gap against a counterfactual and can't be read as a loss or a saving.

**Limits.** The data only holds GMV and gross profit. Explaining why category margins are thinning needs prices, promotions, and margin targets per category, which aren't in this file. The decline may well be deliberate; if so, the combined rise still doesn't come from category performance. There is no claim about net profit because operating costs aren't available.

## Evidence layer

**Figure 6. The Overview page of the Power BI dashboard**

![gambar 6](images/gambar-6.png)

**Reading order.** A shows the figure the directors see in the form they know. B is the main panel: seven bubbles, all to the left of the zero line. C proves there is no exception month by month. D and E are opened when the questions "why did the combined figure rise" and "is Electronics shrinking" come up. F states the window, the grouping, and the limits of the claims, plus the curve across every window length.

| Check | Result | What was observed and fixed |
|---|---|---|
| 20 reference figures recalculated | Pass | 20 of 20 match |
| Breakdown closes | Pass | +7.02 −1.84 −0.34 = +4.84, also visible in the waterfall chart |
| Panel A number labels | Fail, fixed | The three-month average (102.8) had been attached to the July 2024 bar, whose value is 96.1 |
| Grayscale render | Fail, fixed | Electronics and Phones & Accessories became two almost identical grays in element E |
| Splitting the weight term by category | Fail, dropped | Electronics' sign flips depending on the reference |
| Bubbles proportional to area | Pass | Radius 5.17 to 1, square root of the GMV ratio 5.16 |

**Handover.** Three things must not be changed without changing the panel title: the window (24 months to 12 months turns +4.84 into −0.25 points), the grouping (seven categories to two super-categories flips Lifestyle's sign), and the margin definition (AVG gives −1.98 points). Every quarter, check whether the November 2025 peak is still the peak and repeat the breakdown over a window of the same length.

Broke down a +4.84-point rise in combined margin into +7.02 points of mix shift and −1.84 points of performance, showed that all seven category margins fall at every window length (weighted, 24 months), then proposed separating the Rp 34 billion incentive decision from the service fee increase and postponing it one meeting.
