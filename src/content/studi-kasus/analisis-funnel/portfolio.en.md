**Phone verification holds back 6,730 of 14,874 sign-ups, and the gap between platforms is too small to split the fix by platform**

A super-app knew its total conversion was 19.88%, but not at which stage its new users were lost. I built a five-stage funnel from 80,000 event rows to answer that.

Mochamad Fajri Ilham Nurdin, completed October 2026, queries and check files: Google Drive folder, mfajriilhamn@gmail.com

Data note: the figures on this page come from a practice dataset designed to mimic super-app event patterns. It is not real company data and it is not presented as work experience at any company.

## Summary

The app combines ride-hailing, food delivery, and digital payments, and spends Rp 2 billion a month on user acquisition. Of 20,000 users recorded over 15 months, the phone verification step holds back 6,730 of 14,874 sign-ups (45.25%), while the other three steps lose 25.43% to 30.60%. The gap between platforms at that step is only 1.82 points. My suggestion: one fix at the verification step for all platforms, run as a test with a comparison group after the event logging has been audited.

## Why this report exists

The product team is eight people, and its capacity for fixes is one work queue per quarter. Three guesses were going around the meeting: the sign-up form is too long, the verification code often doesn't arrive, or the first order is confusing. Each points to a different stage, and the existing dashboard only shows total conversion.

The quickest way to pick a priority from the dashboard is to compare total conversion by platform and fix the lowest. That points to Web, 18.88% versus 20.15% on Android, a gap of 1.27 points. Meanwhile all three platforms lose 44.72% to 46.54% of their sign-ups at one and the same step, and a comparison of total conversion doesn't show that step.

## Data and its limits

One event table: 80,000 rows, six columns (event ID, user, event name, time, platform, city), 20,000 users, January 2025 to March 2026. There are ten event names; five of them are funnel stages: first visit, account sign-up, phone verification, first order, and second order.

What isn't in the table also decides what I can claim. There are no experiment results, so there is no uplift or ROI figure on this page. There are no records of verification codes being sent, so the guess that the code doesn't arrive can't be proven or disproven from here. There are no reasons for users stopping, so this analysis shows where people stop, and stops there.

## What I did

The work is six steps in order: clean the events, map event names to stage numbers, build one row per user per stage, calculate conversion, break the results down by platform and city, then validate the funnel shape before drawing conclusions. Cleaning dropped 3,796 of 80,000 rows (4.75%) in three recorded stages: 3,150 duplicate rows, 500 without an event name, and 146 timestamped after the end of the data period. I wrote down three decisions before the first analysis query, each with the option I rejected.

What is counted is people, once per stage, at their first event in that stage. The user's platform and city are taken from that same event.

Rejected: counting event rows. In the raw data the visit stage holds 20,808 rows for 19,946 people, 4.32% larger, and the inflation differs by stage, so conversion shifts with it.

Each step's conversion is calculated against the stage directly before it, and the denominator is written with every figure.

Rejected: using the first visit as the denominator for every step. That way the figure keeps falling to 19.88% at the last stage, and the last step looks the worst.

To test the most recent period, I took a cohort: users whose first visit was on or after 1 October 2025, followed to the end of the data.

Rejected: cutting events by date. I tried it first. The sign-up stage then held 7,507 people while visits held only 5,917 (126.87% conversion), because many who signed up in that period had visited before October. The first check, that a funnel must narrow, failed immediately.

The tool is SQL on ClickHouse, with seven CTEs that can each be run and checked on their own.

## Figures

**Figure 1. Users at each stage, and those who don't reach the next stage**

![gambar 1](images/gambar-1.png)

What it shows. The five funnel stages from top to bottom. Dark gray bar: unique users who reached that stage. The part to its right: users from the previous stage who didn't arrive, red in the verification row. The number inside the bar: number of people.

Data range. 76,204 clean events from 20,000 users, 1 January 2025 to 31 March 2026.

What to notice. The widest stopping section is in the verification row: 6,730 people, 45.25% of 14,874. The stopping sections in the other three rows are 1,686 to 5,072 people.

**Figure 2. Sign-up to verification conversion by platform**

![gambar 2](images/gambar-2.png)

What it shows. The share of sign-ups who complete verification, calculated against that platform's own sign-ups. The axis starts at zero. Gray bar: the whole period. Red bar: the cohort whose first visit was on or after 1 October 2025.

Data range. 14,874 sign-ups over the whole period; 4,403 sign-ups in the cohort.

What to notice. All three gray bars end at 53.46% to 55.28%. The red Web bar is 2.28 points shorter than its gray bar; on the other two platforms the two are almost the same length.

**Figure 3. Days from first visit to sign-up**

![gambar 3](images/gambar-3.png)

What it shows. Number of sign-ups by the number of days between first visit and sign-up. The day groups are not the same width. The red bar marks the group where the 70.68-day average falls.

Data range. 14,826 sign-ups with both stages, same period.

What to notice. Two clusters: 8,159 people at 0 and 1 days, and 4,411 people at 31 days or more. The 70.68-day average falls in the 31-to-90-day group, which holds 758 people. Compare with the first row of Figure 4: the cohort since 1 October 2025, observed for at most about six months, stops at this step in almost the same share.

**Figure 4. Share stopping at each step in two time windows**

![gambar 4](images/gambar-4.png)

What it shows. The share that doesn't go on to the next stage, against the stage directly before. Gray bar: the whole period. Red bar: the cohort since 1 October 2025.

Data range. 19,946 visitors over the whole period; 5,917 visitors in the cohort.

What to notice. At all four steps the two bars differ by less than 1.3 points, and the verification pair stays the longest (45.25% and 45.88%).

## Findings

1. One step loses more people than the last two steps combined. Of 14,874 sign-ups, 6,730 never completed phone verification (45.25%). The step before loses 25.43% of 19,946 visitors, the two steps after 30.60% and 29.83%. The first and second order together lose 4,178 people.
2. Web is indeed the lowest, but the gap isn't enough to split the queue. At the verification step, Web is 53.46% (1,570 of 2,937), Android 54.91% (3,683 of 6,707), iOS 55.28% (2,891 of 5,230). All three platforms drop most sharply at the same step, and lifting Web to the iOS level adds only about 53 people over 15 months, against the 6,730 who stop at this step. That 1.82-point gap also can't yet be told apart from chance (z 1.59; the usual limit is 1.96). By city the range is 53.20% to 56.35%. The data holds nothing that explains the gap, so I only report its size.
3. The time from visit to sign-up seems split in two, but the long part is probably a timestamp defect. 8,159 of 14,826 sign-ups registered on the same day as their first visit or the day after, while 2,617 (17.65%) only signed up more than 180 days later. If gaps that long were real, the cohort since 1 October 2025, observed for at most about six months, should lose most of those sign-ups, and its visit-to-sign-up conversion would be about 61.4% at most. The result is 74.41%, almost the same as the whole period (74.57%). So I put some users' first-visit timestamps on the audit list. Per-step conversion is unaffected, because it is calculated from who arrives, not when.
4. The event logging isn't clean yet. There are 159 stage-skip records, users recorded at a stage without being recorded at the stage directly before it, for example 57 people recorded as verified without ever being recorded as signing up. 35 of 32,477 transitions between neighboring stages have timestamps that run backwards (0.11%). If those 57 people are removed, conversion at the verification step becomes 54.37% (8,087 of 14,874) and is still the lowest.
5. The result holds for the cohort since 1 October 2025, with one thing to watch. Among the 5,917 people whose first visit was on or after 1 October 2025, 2,020 of 4,403 sign-ups stopped at verification (45.88%). The gap between Web and iOS at this step widens to 3.98 points, but Web sign-ups in that cohort are only 848 people and the gap hasn't crossed the limit above (z 1.87).

## What changed in the decision, and what I measure afterwards

The priority choice shifts from "which platform is worst" to "which step leaks most". One fix at the verification step, applied to all three platforms, replaces three queues per platform. Of the three guesses going around, only the one about the verification code points to this step. Records of code delivery aren't in the data, so the logging audit should start by pulling those delivery records, and then the fix runs as a test with a comparison group.

I set three measures before the fix is built, and all three already have a starting value: sign-up to verification conversion with sign-ups as the denominator (54.37%, only users recorded at both stages), the number of sign-ups who complete verification (8,087), and the number of stage-skip records (159). A one-quarter test is enough to read an increase of about 5 points or more: a 5-point increase needs about 1,540 sign-ups per group, roughly 2.5 months at the October 2025 to March 2026 sign-up rate, while a 3-point increase needs almost 7 months. I'll revisit this suggestion if the audit finds most of those 6,730 people were verified but not recorded, or if the test group's conversion doesn't differ from the comparison group.

## Limits, trace, and how to rerun

- Without experiment data, how many extra sign-ups the fix produces can't be estimated. I didn't turn the 5-point target going around the meeting into a projection.
- I tested dropping the 146 future-timestamped rows: with or without them, the five funnel figures and the time-gap table don't change, because each user is taken from their first event.
- The columns in the source table are Nullable. An example nested check query using UserID = '' returns 0 on this table; the version using IS NULL returns 159, and a second method without a JOIN gives the same figure.
- The cohort since 1 October 2025 has less time to complete stages. Its average visit-to-sign-up gap is 10.86 days because the longest gap that can be observed is about six months (the recorded maximum is 175 days).
- New visitors per month fell 37% from October 2025 (986 versus 1,559 in January to September 2025). The share stopping at each step didn't change, but the number of people helped by the fix shrinks with it, and this data has no monthly acquisition spend to explain why.

| Figure | Where it comes from |
|---|---|
| 76,204 clean rows | 80,000 raw rows minus 3,150 duplicates, 500 without a name, and 146 future timestamps; users stay at 20,000 |
| 19,946 to 3,966 | Unique users per stage from 52,582 stage-per-user rows |
| 45.25%, 6,730 people | 14,874 sign-ups minus the 8,144 recorded as verified, divided by 14,874 |
| 1.82 points, z 1.59 | iOS 55.28% minus Web 53.46%; a two-proportion test with sign-ups per platform as the denominator |
| 70.68 days, median 1 | 14,826 visit-to-sign-up transitions for users who have both stages |
| 159; 35 of 32,477 | The fifth and third of five validation checks |
| 5,917 people | Users whose first visit fell between 1 October 2025 and 31 March 2026 |

Every figure comes from 1-Kueri SQL.sql, which runs as it is on ClickHouse: one main pipeline query, one cleaning-impact query, five validation queries, and supporting queries for city, time gaps, and the cohort.

The full query, decision log, one-page memo, and evidence appendix are available in the folder linked at the top.
