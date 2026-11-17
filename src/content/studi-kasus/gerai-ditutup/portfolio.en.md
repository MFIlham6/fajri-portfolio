**Three lists with no overlap: choosing 20 of 180 coffee outlets when no standard chart can hold 180 trajectories**

A coffee chain with 180 outlets in ten cities has to close 20 of them. The cost is fixed at Rp 17 billion, whatever the list. Three equally valid ways of ranking give three lists without a single shared name, and the annual revenue lost with them ranges from Rp 4.2 billion to Rp 19 billion. I built a screen that lets its reader see what they are choosing when they choose one of the lists.

Mochamad Fajri Ilham Nurdin, November 2026. The data is synthetic; the company and outlet names are fictional. Data files, calculation script, dashboard, memo, and validation notes: project folder on Google Drive.

## Context

**The decision.** The SeduhKita board has already decided to close 20 outlets. The closing cost (lease penalties, severance, dismantling) is Rp 850 million per outlet, so Rp 17 billion for any list. The only question left is which outlets, and what's at stake is the revenue lost for good along with them. The network's revenue over the last 12 months was Rp 169.8 billion.

**The original list.** The Finance Director sent the 20 outlets with the lowest December 2025 revenue. That column is in every monthly report, anyone can repeat the ranking, and it can be explained to the board in one sentence. The COO asked for a comparison list before signing, with one condition: a screen that lets both of them see the same thing, without proving anyone wrong.

**Why it's hard.** Each outlet has 24 monthly points. A ranking table throws away the trajectory. 180 lines in one chart hold everything and none of them can be followed. 180 small panels don't fit on one screen, and panels with automatic axes make flat outlets look like they are collapsing. All three standard forms fail, and each fails differently.

**Figure 1. Who each ranking method picks**

![gambar 1](images/gambar-1.png)

*The Lists page: each bar is the 20 outlets picked by one ranking method, colored by trajectory group (steady decline, April 2025 drop, new outlet, other). Note the first row (lowest revenue, the original list), which is almost entirely new outlets.*

**Data.** 180 outlets, January 2024 to December 2025, 4,320 rows of which 3,975 are filled. Nineteen outlets opened mid-period and have no data before their opening date. The data is revenue only: no costs, profit, competitors, weather, or operational changes.

## Framework and approach

This work doesn't call for new figures. The work is deciding how many of each outlet's 24 points each element may throw away, then making sure another element gives back what was thrown away. The result is four elements with four levels of compression.

| Element | Compression | What's lost | Given back by |
|---|---|---|---|
| Level-versus-direction map | 24 points into 2 numbers | the trajectory's shape | the sparkline table |
| Sparkline table | 24 points into 1 small line | exact values and scale | the two number columns beside it |
| Small multiples | none, identical axes | screen space | limited to 23 of 180 outlets, stated in the title |
| List strip | 180 outlets into 20 seats | the other 160 outlets | all 180 are still drawn in gray |

**From one axis to two axes**

Ranking by lowest revenue answers "who is smallest now", while the decision asks "who most deserves to close". I kept the original list's column as the horizontal axis and added the 24-month direction on the vertical axis, so a reader of the original list starts from the figure they know. A combined score was rejected because six pairs of outlets have exactly the same December revenue and 24-month change; any formula that reads those two columns gives them the same value.

**From automatic axes to a shared axis**

**Figure 2. Median revenue of the 23 April outlets compared with other established outlets**

![gambar 2](images/gambar-2.png)

*Index of median monthly revenue, 2024 average = 100, January 2024 to December 2025. Note the step down in April 2025 that happens only to those 23 outlets.*

Three outlets in the top row are almost flat. With the tool's default settings they are drawn as steep as three outlets in the bottom row that fell 27% to 38% in a month. The panel form is right; the axis setting is what misleads.

**A written time window**

**Figure 3. Revenue lost and the overlap of each list**

![gambar 3](images/gambar-3.png)

*2025 revenue from the 20 outlets on each list (Rp billion) and the number of outlets also on the original list. Note the 3-month and 6-month trend rows.*

## Findings and recommendations

1. **Small outlets and declining outlets barely overlap.** The lowest-revenue list and the largest-24-month-decline list share only one outlet. 15 of the 20 names on the original list opened between May and September 2025, and their revenue has already risen 38% to 120% since their first month; closing them uses Rp 12.75 billion of the Rp 17 billion.
2. **The same two figures, two decisions.** G108 and G124 both end at Rp 56.8 million with a 24-month change of −23.1%. G108 declined little by little; G124 was flat for 15 months then dropped in April 2025. There are six pairs like this, and in each pair one member declined gradually and one dropped in the same month.
3. **23 outlets fell in the same month.** From March to April 2025, 23 outlets fell 16% to 42% and then stayed at the new level, while the total revenue of the other 122 established outlets rose 5.5%. They are spread across 10 cities and 5 location types. A count with a threshold of more than a 20% drop in a month gives 22, because that threshold misses two members (down 16.4% and 17.0%) and includes one outlet that recovered the following month.
4. **The quota of 20 is bigger than the clear group.** The group declining gradually without the April drop holds 16 outlets. The next established outlet outside the April group fell only 3.8% from 2024 to 2025. On the 12-month strip, the 20th and 21st outlets differ by 0.28 points, so the number 20 is the board's quota and doesn't mark any break in the data.

I built those groups from the trajectories with rules that can be repeated, without the pola_sebenarnya column that also comes with the file. Afterwards the result was matched against that column as an audit: 19, 23, and 16 outlets, all matching.

**Recommendation**

Close the 16 outlets that are declining gradually (revenue over the last 12 months Rp 11.93 billion). Investigate the 23 April outlets as one question for two weeks before closing any of them; if no shared, fixable cause is found, fill the remaining four seats with the four April outlets that fell deepest over 12 months (Rp 3.54 billion). Take out the 19 new outlets and review them again after 12 months of full operation.

**Limits**

- The data only holds revenue, so "declining" means revenue fell. Nothing can be said about any outlet's profit or loss.
- The data holds no events. The April 2025 drop is a pattern; finding its cause needs operational data that isn't in this file.
- Rp 17 billion is the same closing cost for every list and isn't counted as a saving.

## Evidence layer

**Figure 4. The Overview page of the Power BI dashboard**

![gambar 4](images/gambar-4.png)

*Three decision figures at the top (16 to close now, 4 reserve seats, 23 April outlets to investigate), the spread of 180 outlets by revenue and growth, the proposed list below, and a summary for the directors on the right. The Lists, Sudden drop, and Quota pages hold the details.*

| Test | What showed up | Fix | Result |
|---|---|---|---|
| Empty months | row count 4,320, should be 3,975 | months before opening left empty, line broken | 3,975 rows; no outlet jumps up from zero |
| Panel axes | with automatic axes, flat outlets are drawn as sharply as outlets that fell 38% | a fixed range of 40 to 140 on every panel | flat outlets are drawn flat |
| Window | changing 6 months to 3 months changes 20 of 20 names | the period is printed on every element; three windows marked side by side | readers can see pairs moving between lists |
| Color | in grayscale, the strip and table lose the proposed-closure marker | bar thickness and the word "close" added | readable without color |
| Claim limits | the data label "Shared shock" implies an event | the title uses "fell in the same month" | no causal claim on screen |

The 30-second test with a reader who wasn't involved in building it hasn't been run yet and is recorded as NOT YET in the validation notes.
