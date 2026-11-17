**Platforms Differ in Efficiency by 2.4 Times, but Campaign Type Separates Them by 4.0 Times**

Ad spend efficiency analysis, digital marketing agency, three platforms, Spreadsheet, 975 clean campaigns from 1,012 raw rows, time spent: 24 hours

Mochamad Fajri Ilham Nurdin, completed October 2026, mfajriilhamn@gmail.com

*Data note: the figures below come from a dataset designed to mimic digital ad spending patterns. It is not real company data, and it is not presented as work experience at any company.*

## Context

A digital marketing agency runs e-commerce campaigns on three ad platforms: Facebook, Instagram, and TikTok. The client's marketing manager holds a Rp 200 million budget for the Lebaran campaign and has to decide how to split it within one week, because setting up the campaigns takes two weeks before launch. ROAS (revenue divided by ad spend) is not a profit measure, because product margins and costs outside advertising aren't recorded. This limit applies to every figure below.

## Question

*"From the last year of data, which channel is the most efficient? I want to put the biggest share of the budget there."*

## Approach

The cleaning rules were set in order before calculating anything, and checks that came back zero were still recorded. The question as asked, efficiency per platform, was answered first. After that I tested one grouping that exists in the data but wasn't mentioned in the request: campaign type. The two were then crossed to make sure no finding was counted twice. Data density per month was checked before drawing any trend.

Three approaches were rejected. First, efficiency as an average per campaign. It looks fair, but it gives small and large campaigns equal weight, when the decision is about where the next rupiah goes. Second, splitting the budget in straight proportion to efficiency, which assumes efficiency stays the same at any spending level. Third, smoothing the trend chart to damp the spikes, because the spikes come from five rows with wrong dates, and smoothing only spreads that error into the neighboring months.

## Findings

1. The efficiency gap between platforms is 2.4 times: Rp 3.65 on Facebook versus Rp 1.54 on Instagram per rupiah spent. Those two platforms received the same share of spend (31.5%). TikTok actually took the largest share (37.0%). Limited to the last year as requested (April 2025 to March 2026), the order is the same: 3.60, 2.66, 1.55.
2. Grouped by campaign type, the gap is 4.0 times: Retargeting Rp 4.51, Brand Awareness Rp 1.13. This separation is 1.7 times sharper, and it comes from a column the request didn't mention.
3. Crossed, Facebook's lead holds in four of five campaign types, so it is not a result of the campaign-type mix. One exception is reported: for Traffic, TikTok leads narrowly (1.84 versus 1.66). On Instagram, two campaign types return less than Rp 1 per rupiah.
4. Five campaigns are dated May to November 2026, after the 1 April 2026 data position, even though their results are already recorded. The five don't change the figures above (the difference is under 0.01), but if they were drawn, the trend would appear to continue to November with one month at a ROAS of 12.00. So the trend is limited to January 2025 to March 2026.

**Figure 1. Facebook and Instagram receive the same share of spend.**

![gambar 1](images/gambar-1.png)

*Share of spend and share of revenue for the three platforms, from 975 clean campaigns. Compare the gray and blue bars in one row: Facebook and Instagram both get 31.5% of spend, but their shares of revenue are 44.4% and 18.7%.*

**Figure 2. Facebook leads in four of five campaign types; the exception is marked.**

![gambar 2](images/gambar-2.png)

*Efficiency of the fifteen combinations of campaign type and platform, with their campaign counts. Read across: within one row the type is the same, so the remaining difference comes purely from the platform. Note the Traffic row, the only row where Facebook's blue bar is not the longest.*

**Figure 3. Dense data for 15 months, then five campaigns dated after the data position.**

![gambar 3](images/gambar-3.png)

*Number of campaigns recorded per month, January 2025 to November 2026. See the orange bars to the right of March 2026: five campaigns, one per month, all dated after the 1 April 2026 data position.*

## Recommendation

Shift budget share toward Facebook and reduce Instagram without stopping it: Facebook Rp 80 million, TikTok Rp 70 million, Instagram Rp 50 million. Within each platform, put Conversion and Retargeting first, and stop Brand Awareness and Engagement on Instagram. The fifteen campaigns with revenue but no cost need checking, and the dates of the five campaigns recorded after 1 April 2026 need to be checked with the recording team.

## Limits

The data only compares revenue with ad spend; product margins aren't recorded, so this is not a profit measure. Every figure measures results at spending levels that already happened and contains no saturation point, so shifting the budget is a decision based on past evidence, not a forecast of results. There is no attribution data, so one campaign's revenue may have been helped by another campaign.

## Trace

| Conclusion | Robustness | What would overturn it |
|---|---|---|
| Facebook is more efficient than Instagram | Robust | New data that reverses the order in Conversion or Retargeting, the two types with the most revenue. So far the order is the same in 64 of 64 cleaning combinations, in the last year alone, and in Ramadan 2025 and 2026; Facebook is above Instagram in all five types |
| Campaign type separates more sharply than platform | Robust | Across 64 cleaning combinations, the type ratio is always 3.67 to 4.02× versus a platform ratio of 2.30 to 2.44×; the gap never closes |
| TikTok is better for Traffic | Fragile | A gap of 1.84 versus 1.66 from 68 and 42 campaigns; it could flip with a little more data |
| Shifting the budget will raise results | Not supported by the data | There is no measured saturation point; if the campaign runs for a month, Rp 80 million for Facebook equals its highest monthly spend (Rp 80.6 million) |

Available artifacts: a workbook with seven analysis sheets plus one dashboard, with every formula visible, a cleaning log that also records three checks that came back zero, a fifteen-cell cross table with the campaign count in each cell, a monthly density table, and the results of seven validation checks.
