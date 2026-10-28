**Case Study, Digital Ad Spend Efficiency**

# **Platform Efficiency Differs 2.4 Times, but Campaign Type Separates 4.0 Times**

Ad spend efficiency analysis, digital marketing agency, three platforms, Spreadsheet, scope of 975 clean campaigns from 1,012 raw rows

Mochamad Fajri Ilham Nurdin, completed October 2026, [mfajriilhamn@gmail.com](mailto:mfajriilhamn@gmail.com)

*Data note: the figures below come from a dataset designed to mimic digital ad spending patterns. It is not real company data, and it is not presented as work experience at any company.*

## **Context**

A digital marketing agency runs e-commerce campaigns on three ad platforms: Facebook, Instagram, and TikTok. The client's marketing manager holds a Rp 200 million budget for the Lebaran (Eid) campaign and has to decide how to split it within one week, because campaign setup takes two weeks before launch. ROAS (revenue divided by ad spend) is not a measure of profit, because product margins and non-ad costs aren't recorded. This limit applies to every number below.

## **The question**

*"From the last year of data, which channel is the most efficient? I want to put the biggest share of the budget there."*

## **Approach**

I set the cleaning rules in order before calculating anything, and checks that came back zero were still recorded. The question asked, efficiency by platform, was answered first. I then tested one grouping that is available in the data but wasn't mentioned in the request: campaign type. The two were then crossed to make sure no finding was counted twice. I checked how dense the data was per month before drawing any trend.

Three approaches were rejected. First, efficiency as an average per campaign. It looks fair, but it gives small and large campaigns equal weight, when the decision is about where the next rupiah goes. Second, splitting the budget in direct proportion to efficiency, which assumes efficiency stays the same at any level of spend. Third, smoothing the trend chart to damp the spikes, because the spikes come from uneven data coverage, not from noise.

## **Findings**

1. **Efficiency differs 2.4 times between platforms**: Rp 3.65 on Facebook versus Rp 1.54 on Instagram per rupiah spent. Those two platforms received exactly the same share of spend (31.5%). TikTok took the largest share (37.0%).  
2. **Grouped by campaign type, the gap is 4.0 times**: Retargeting Rp 4.51, Brand Awareness Rp 1.13. This separation is 1.7 times sharper, and it comes from a column not mentioned in the request.  
3. **Crossed, Facebook's lead holds in four of five campaign types**, so it isn't a mix effect. One exception is reported: for Traffic, TikTok is slightly ahead (1.84 vs 1.66). On Instagram, two campaign types return less than Rp 1 per rupiah.  
4. **Recording almost stopped after March 2026.** The next eight months hold only five campaigns, and three months are completely empty. This doesn't change the numbers above (the difference is under 0.01), but it limits the period that is valid for trends.

**Figure 1. The least efficient platform gets the same share of spend as the most efficient.**

![figure 1](images/gambar-1.png)  
*Efficiency and share of spend for the three platforms, from 975 clean campaigns. Compare the colored and gray bars within one row, then across rows: Instagram's orange bar is the shortest, but its gray bar is as long as Facebook's.*

**Figure 2. Facebook leads in four of five campaign types; the exception is marked.**

![figure 2](images/gambar-2.png)  
*Efficiency of fifteen campaign-type and platform combinations, with their campaign counts. Read across: within one row the type is the same, so the remaining difference comes purely from the platform. The orange frame marks the only row Facebook doesn't win.*

**Figure 3. The range is 23 months, but the density stops in month 15.**

![figure 3](images/gambar-3.png)  
*Number of campaigns recorded per month, January 2025 to November 2026. To the right of March 2026, three months are empty and five others hold one campaign each. A single Rp 0.4 million campaign would show up as a ROAS of 12.00 if the whole range were plotted.*

## **Recommendation**

Shift budget share toward Facebook and reduce Instagram without stopping it: Facebook Rp 80 million, TikTok Rp 70 million, Instagram Rp 50 million. Within each platform, put Conversion and Retargeting first, and stop Brand Awareness and Engagement on Instagram. Fifteen campaigns that show revenue with no cost need checking, and before the most recent period's data is used, it needs confirming whether it was the campaigns or the recording that stopped.

## **Limits**

The data only compares revenue with ad spend; product margins aren't recorded, so this is not a measure of profit. Every number measures results at spend levels that have already happened and contains no saturation point, so shifting the budget is a decision based on past evidence, not a forecast of results. There is no attribution data, so one campaign's revenue may have been helped by another campaign.

## **Audit trail**

| Conclusion | Robustness | What would overturn it |
| :---- | :---- | :---- |
| Facebook is more efficient than Instagram | Robust | Almost nothing; the order is the same in 64 of 64 cleaning combinations, Facebook is above Instagram in all five types, and the order is the same in Ramadan 2025 and 2026 |
| Campaign type separates more sharply than platform | Robust | Across 64 cleaning combinations, the type ratio is always 3.67 to 4.02× against a platform ratio of 2.30 to 2.44×; the gap never closes |
| TikTok is better for Traffic | Fragile | A difference of 1.84 vs 1.66 from 68 and 42 campaigns; it could flip with a little more data |
| Shifting the budget will raise results | Not supported by the data | No measured saturation point; Rp 80 million for Facebook is already at the top of its historical monthly spend (max Rp 80.6 million) |

Available artifacts: a seven-sheet workbook with every formula visible, a cleaning log that also records three checks that came back zero, a fifteen-cell cross table with the campaign count for each cell, a monthly density table, and the results of seven validation gates.
