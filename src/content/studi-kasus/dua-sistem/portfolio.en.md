**Two systems, one frame: building a budget-meeting screen that doesn't promise a comparison the data doesn't have**

A software company was about to reallocate its Rp 14.4 billion marketing budget across six acquisition channels. The meeting opened with one dual-axis chart showing traffic and revenue rising together. The figures are correct; the frame promises a comparison between two systems that count different things. I built one six-element screen that separates the frame, names the denominator of every ratio, and shows the revenue that has no source.

Mochamad Fajri Ilham Nurdin, November 2026. The data is synthetic; the company name is fictional. Data files, calculation script, dashboard, conclusion sentences, form rationale document, and memo: project folder on Google Drive.

## Context

**The company.** AturNiaga sells subscription operations software to small and medium retailers. Its customers are companies, and contracts are signed months after the first visit. From July 2024 to June 2026 it recorded 1,034,769 visit sessions and 907 closed deals worth Rp 12,173 million. Two of the six channels are bought with ads (Rp 1,188 million spent over 24 months); the other four cost people and time that aren't recorded in the data.

**The decision at stake.** The Head of Marketing brought four questions to the budget meeting: which channel covers its cost, whether the April 2025 campaign worked, how much revenue can't be traced, and if the budget is cut 20%, from which channel.

**Why it's hard.** The figures come from three systems that are each correct. Analytics counts sessions per device, stamped at the visit. The ad platform counts trial sign-ups, stamped at the click. The CRM counts companies that sign a contract, stamped at the signature. The meeting chart put organic sessions on the left axis and deal value on the right, and the position of the two lines is decided by the right-axis limit the charting tool picked.

**Figure 1. The same meeting chart at three right-axis limits**

![gambar 1](images/gambar-1.png)

*See the blue line in all three panels, then the number of crossings in each panel's title.*

**Data and its limits.** One combined table of 144 rows (24 months × 6 channels) with sessions, spend, platform conversions, closed deals, and deal value, plus its three raw exports. The combined columns match all three exports on every row. 202 deals have no lead source in the CRM, and the combined table already assigns those deals to channels with an attribution model that is taken as given. **My role:** choosing the frame, form, and reading order of six elements; six conclusion sentences; a form rationale document; a one-page memo.

## Framework and approach

Before choosing forms, I recorded three things for every figure: its unit, when its system stamps the time, and what population it counts. Two figures may share one plane only if all three match. Sessions versus rupiah fail on all three, so the new screen holds six planes, each with one unit, three more than the old meeting screen.

| Decision | Chosen | Rejected alternative | Reason |
|---|---|---|---|
| Traffic and revenue | Two stacked panels, identical x-axis, each from 0 | One dual-axis chart | Right limits of Rp 500, 900, 1,400 million give 2, 7, 0 crossings from the same figures |
| Efficiency and volume | Two horizontal bar charts, row order locked the same | Sessions as a second series in the efficiency panel | Aligned rows replace a second axis without two units on one plane |
| Untraceable revenue | A named, hatched slice sitting on the zero line | A stack of traced sources only | A filtered stack still looks whole while Rp 2,794 million goes missing |
| Cost per acquisition (CPA) | Two ratios per channel, denominator in the label | A cost-per-conversion card | Swapping the denominator reverses the order of the two paid channels |
| Controls | None | Source filter, date picker | A filter can switch off the untraceable slice; a three-month window erases the 24-month comparison |

**Checks that changed the design.** First, I split the April 2025 session spike by channel: Social Ads +13,373 sessions and Search Ads +5,355 against the March and May average, Organic Search −409. The traffic panel therefore got a third series, sessions from the two paid channels, so the spike isn't read as organic growth. Second, I tested the efficiency panel against the attribution model. That model gives Partner Referral 31.0% of its value from untraceable deals and Social Ads 13.1%; with traced value only, the order of all six channels stays the same, and if the whole Rp 2,794 million were given to Social Ads, that channel would still be below Partner Referral. Third, I rejected a deal series shifted by two months: the correlation of sessions with deals is 0.59 at a one-month shift and 0.55 at two months, so the data doesn't clearly pick two months, and the lag is stated in an annotation instead.

**Figure 2. Multiple against July 2024, and sessions and deal value per month**

![gambar 2](images/gambar-2.png)

*The Trend page of the Power BI dashboard. Top cards: organic sessions 2.4 times and deal value 1.3 times against July 2024. Top chart: sessions per month; bottom chart: deal value per signing month, Rp million. Note the April 2025 spike in the top chart that doesn't appear in the bottom chart.*

**Figure 3. Revenue per session without and with model-assigned deals**

![gambar 3](images/gambar-3.png)

*Revenue per session for each channel, calculated two ways. Dark bars: all deals, including source-less deals assigned to channels. Light bars: only deals with a recorded source. Note the channel order is the same in both calculations.*

## Findings and recommendations

1. **The number two channel by volume is at the bottom in efficiency.** Social Ads brought 263,317 sessions, 2nd of 6, and produced Rp 5,868 of deal value per session. Partner Referral produced Rp 28,339 from 32,584 sessions, 4.8× higher. The order is the same for deals per 1,000 sessions (2.1 versus 0.4) and for traced value only (Rp 19,543 versus Rp 5,098).
2. **Organic sessions grew 2.4×, deal value 1.3×, and that gap holds on any basis.** The 2.4× and 1.3× compare two single months, while monthly deal value moves 21.2% month to month on average. Using the average of the first and last three months: 2.3× versus 1.4×. Using year-over-year totals: organic sessions +57.1%, deal value +13.3%.
3. **The April 2025 campaign reads as a failure by signing month and a success by first-visit month.** By signing month, April booked 37 deals, down from 42. If every deal is returned to the month of its first session, April 2025 first visits produced 52 deals worth Rp 651.8 million, while March and May produced 38 and 39. The extra is about Rp 153 million of deal value for about Rp 58 million of ad spend above the neighboring months. Deals per 1,000 sessions in the April cohort are 0.88, close to 0.95 in the neighboring months.
4. **Rp 2,794 million has no source.** 202 of 907 deals (22.3%), 23.0% of value. In the CRM lead-source frame, this slice is second only to Organic Search. The average untraceable deal is Rp 13.8 million, above the traced average of Rp 13.3 million.
5. **Cost per acquisition (CPA) reverses the order of the two paid channels.** Per trial sign-up, Social Ads cost Rp 844 thousand and Search Ads Rp 1,839 thousand. Per contracted company, Rp 4,220 thousand versus Rp 3,425 thousand. The widening is 5.0× versus 1.9×.

**Figure 4. Deals by first-session month**

![gambar 4](images/gambar-4.png)

*Deals per first-session month, October 2024 to December 2025. Note the April 2025 bar (52 deals) compared with the months beside it (38 and 39).*

**Figure 5. Two denominators for the same spend**

![gambar 5](images/gambar-5.png)

*Cost per trial sign-up (ad platform) and per contracted company (CRM), Search Ads and Social Ads, Rp thousand. Note the order of the two channels reversing between the two denominators.*

**Recommendation.** Cuts start with Social Ads spend, gradually from next quarter, reassessed no sooner than one quarter later because the visit-to-contract lag has a median of 75 days. The money released isn't moved entirely to Partner Referral, which brought only 32,584 sessions in two years. The size needs stating: all ad spend on the two paid channels in the second year was Rp 542 million, while 20% of Rp 14.4 billion is Rp 2,880 million. The rest of the cut has to come from people and time costs that aren't recorded per channel, so those costs need splitting by channel before the rest is allocated.

**Limits.** There is no cause-and-effect claim: the April cohort is one event without a controlled comparison, and the first-session date doesn't say which channel convinced the buyer. Revenue per session is past efficiency, not a promise for additional spend. The attribution model is taken as given. Brand awareness isn't measured in any of the three systems.

## Evidence layer

**Figure 6. The Channels page of the Power BI dashboard**

![gambar 6](images/gambar-6.png)

**Reading order.** The page title answers the meeting's question: cuts start with Social Ads. The left cards give the ratio of revenue per session between the top and bottom channels (4.8 times) and the share of deal value without a source (23%). The table in the middle sorts channels from highest revenue per session, with All deals and Tracked only buttons for the two calculation methods. The right panel shows the selected channel and deal value per CRM source. The Trend and Systems pages hold the time detail and the differences between systems.

| Check | Result | What was observed and fixed |
|---|---|---|
| Combined table matched against the raw exports | Pass | Sessions, spend, conversions, deals, and traced value match on every row; untraceable deals per month match the source-less CRM rows |
| Case figures recalculated | Pass | 2.4× and 1.3×; 4.8×; 22.3% and Rp 2,794 million; 5.0× and 1.9×; crossings 2, 7, 0; a 75-day lag (52 to 101) |
| Five frame checks | Pass | Unit on the axis, one unit per plane, denominator in the label, stacks that add up, a sentence on every element |
| A sentence that goes beyond its element | Fail, fixed | Element 4's sentence mentioned sessions; the lag was moved to an annotation |
| Ten-second test on a new reader | Not yet | Waiting for a reader who wasn't involved in building it |

**Handover.** Two things must not be changed without changing the element title: element 2's row order, which follows element 1, and the untraceable slice in element 5. If the attribution model is replaced, repeat the test on element 1 with traced value only. If people costs per channel become available, a cost ratio can be calculated for all six channels and element 6 replaced.

Separated two series that had shared one dual-axis plane, changed the basis for comparing channels from volume to revenue per session, and showed Rp 2,794 million of revenue without a source, making it visible that the number two channel by volume is at the bottom in efficiency.
