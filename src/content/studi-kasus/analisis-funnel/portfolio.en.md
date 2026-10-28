Onboarding funnel analysis case study, done with SQL

# Phone Verification Holds Back 6,730 of 14,874 Sign-ups, and the Gap Between Platforms Is Too Small to Split the Fix

A super-app knew its total conversion was 19.88%, but not at which stage its new users were lost. I built a five-stage funnel from 80,000 event rows to answer that.

Mochamad Fajri Ilham Nurdin, completed October 2026, queries and check files: [Google Drive folder](https://drive.google.com/drive/folders/1G4zWKbhuikCkt27hnz621Ik5kkPo6I1O), mfajriilhamn@gmail.com

Data note: the figures on this page come from a practice dataset designed to mimic super-app event patterns. It is not real company data and is not presented as work experience at any company.

## 1. Summary

A super-app combining ride-hailing, food delivery, and digital payments spends Rp 2 billion a month on user acquisition. Of the 20,000 users recorded over 15 months, the phone verification step holds back 6,730 of 14,874 sign-ups (45.25%), while the other three steps lose 25.43% to 30.60%. The gap between platforms at that step is only 1.82 points. My recommendation: one fix at the verification step for all platforms, run as a test with a comparison group after its event logging has been audited.

## 2. Why this report exists

The product team has eight people, and its fix capacity is one work queue per quarter. Three guesses were going around in meetings: the sign-up form is too long, verification codes often don't arrive, or the first order is confusing. Each points to a different stage, and the existing dashboard only shows total conversion.

The fastest way to pick a priority from the dashboard is to compare total conversion by platform and fix the lowest. That points to Web, 18.88% against 20.15% on Android, a 1.27-point gap. Meanwhile all three platforms lose about half their sign-ups at one and the same step, and that approach would never show it.

## 3. Data and its limits

One event table: 80,000 rows, six columns (event ID, user, event name, time, platform, city), 20,000 users, January 2025 to March 2026. There are ten event names; five of them are funnel stages: first visit, account sign-up, phone verification, first order, and second order.

What isn't in the table also decides what I can claim. There are no experiment results, so there's no uplift or ROI figure on this page. There's no record of verification codes being sent, so the guess that codes don't arrive can't be proven or disproven from here. There are no reasons users stopped, so this analysis shows where people stop, and stops there.

## 4. What I did

The work is six steps in order: clean the events, map event names to stage numbers, build one row per user per stage, calculate conversion, split the results by platform and city, then validate the funnel's shape before drawing conclusions. Cleaning removed 3,796 of 80,000 rows (4.75%) in three stages, each recorded: 3,150 duplicate rows, 500 without an event name, and 146 timestamped after the end of the data period. I wrote down three decisions before the first analysis query, each with the option I rejected.

**What is counted is people, once per stage, at their first event in that stage.** The user's platform and city are taken from the same event.

Rejected: counting event rows. In the raw data the visit stage holds 20,808 rows for 19,946 people, 4.32% more, and the inflation differs at each stage, so conversion shifts with it.

**Each step's conversion is calculated against the stage just before it, and the denominator is written next to every figure.**

Rejected: using the first visit as the denominator for every step. That way the number keeps falling down to 19.88% at the last stage, and the last step looks the worst.

**For the last-six-months test, I took a cohort: users whose first visit was on or after 1 October 2025, followed to the end of the data.**

Rejected: cutting events by date. I tried it first. The sign-up stage then held 7,507 people while visits held only 5,917 (126.87% conversion), because many who signed up in that period had already visited before October. The first check, that a funnel must go down, failed straight away.

The tool is SQL, with seven CTEs that can each be run and checked on their own.

## 5. Figures

**Figure 1. Users at each stage, and those who don't reach the next stage**

![figure 1](images/fig-1.svg)

*What it shows: Five funnel stages from top to bottom. Dark bar: unique users who reached that stage. Light part: users from the previous stage who didn't get there, with the count and share.*

*Data range: 76,204 clean events from 20,000 users, 1 January 2025 to 31 March 2026.*

*What to see: The widest light part is in the verification row: 6,730 people, 45.25% of 14,874. The light parts in the other three rows are 1,686 to 5,072 people.*

**Figure 2. Sign-up to verification conversion by platform**

![figure 2](images/fig-2.svg)

*What it shows: The share of sign-ups that completed verification, calculated against that platform's own sign-ups. The axis starts at zero. Bars: the whole period. Circles: the cohort that first visited from October 2025.*

*Data range: 14,874 sign-ups over the whole period; 4,403 sign-ups in the cohort.*

*What to see: The ends of the three bars sit at 53.46% to 55.28%. The Web circle sits 2.28 points left of the end of its bar; the circles for the other two platforms almost touch theirs.*

**Figure 3. Days from first visit to sign-up**

![figure 3](images/fig-3.svg)

*What it shows: Number of sign-ups by the number of days between first visit and sign-up. The day groups are not equal in width.*

*Data range: 14,826 sign-ups that have both stages, same period.*

*What to see: Two clusters: 8,159 people at 0 and 1 day, and 4,411 people at 31 days or more. The average line, 70.68 days, falls in the 31-to-90-day group, which holds 758 people.*

**Figure 4. Share dropping off per step in two time windows**

![figure 4](images/fig-4.svg)

*What it shows: The share that doesn't continue to the next stage, against the stage just before it. Top bar: the whole period. Bottom bar: the cohort from 1 October 2025.*

*Data range: 19,946 visitors over the whole period; 5,917 visitors in the cohort.*

*What to see: At all four steps the two bars differ by less than 1.3 points, and the verification pair stays the longest (45.25% and 45.88%).*

## 6. Findings

1. **One step loses more people than the last two steps combined.** Of 14,874 sign-ups, 6,730 never completed phone verification (45.25%). The step before it loses 25.43% of 19,946 visitors, the two steps after it 30.60% and 29.83%. The first and second orders together lose 4,178 people.
2. **Web is indeed the lowest, but the gap isn't enough to split the queue.** At the verification step, Web is 53.46% (1,570 of 2,937), Android 54.91% (3,683 of 6,707), iOS 55.28% (2,891 of 5,230). This 1.82-point gap can't yet be told apart from chance (z 1.59; the usual threshold is 1.96), and all three platforms drop most sharply at the same step. By city the range is 53.20% to 56.35%. The data holds nothing that explains the gap, so I only report its size.
3. **The time from visit to sign-up splits in two, and no single number represents it.** 8,159 of 14,826 sign-ups registered on the same day as their first visit or the day after. Another 4,411 (29.75%) only signed up more than 30 days later, including 2,617 after more than 180 days. The 70.68-day average falls in the 31-to-90-day group, which holds only 758 people, and the 1-day median hides the second group. At the other three steps the gap is short: a median of 1 day, at most 6 days.
4. **The event logging isn't clean yet.** 159 stage memberships are recorded without the stage just before them, for example 57 people recorded as verified without ever being recorded as signing up. 35 of 32,477 transitions between neighbouring stages have timestamps that go backwards (0.11%). If those 57 people are excluded, verification-step conversion becomes 54.37% (8,087 of 14,874) and is still the lowest.
5. **The result holds in the last six months, with one thing to watch.** Of the 5,917 people who first visited from 1 October 2025, 2,020 of 4,403 sign-ups stopped at verification (45.88%). The gap between Web and iOS at this step widens to 3.98 points, but Web sign-ups in that cohort number only 848, and the gap hasn't passed the threshold above (z 1.87).

## 7. What changed in the decision, and what I measure afterwards

The choice of priority shifts from "which platform is worst" to "which step leaks most". One fix at the verification step, applying to all three platforms, replaces three queues by platform. Of the three guesses going around, only the one about verification codes points to this step. Because there's no record of code delivery in the data, I suggest the logging audit starts there, and that the fix is then run as a test with a comparison group.

I set three measures before the fix is built, and all three already have a baseline: sign-up to verification conversion with sign-ups as the denominator (54.75%), the number of people who complete verification (8,144), and the number of stage memberships that skip a stage (159). I'll revisit this recommendation if the audit finds most of those 6,730 people did verify but weren't recorded, or if the test group's conversion doesn't differ from the comparison group's.

## 8. Limits, audit trail, and how to re-run it

- Without experiment data, how many extra sign-ups the fix produces can't be estimated. I did not turn the 5-point uplift target going around in meetings into a projection.
- I tested removing the 146 future-dated rows: with or without them, the five funnel figures and the time-gap table don't change, because each user is taken from their first event.
- The source table's columns are Nullable. An example nested check query using `UserID = ''` returns 0 on this table; the version using `IS NULL` returns 159, and a second method without a JOIN gives the same number.
- The last-six-months cohort has less time to complete the stages. The average visit-to-sign-up gap in that cohort is 10.86 days because the longest gap that can be observed is about six months (the longest recorded is 175 days).

| Figure | Where it comes from |
| --- | --- |
| 76,204 clean rows | 80,000 raw rows minus 3,150 duplicates, 500 without a name, and 146 future timestamps; users stay at 20,000 |
| 19,946 to 3,966 | Unique users per stage from 52,582 stage-membership rows |
| 45.25%, 6,730 people | 14,874 sign-ups minus 8,144 recorded as verified, divided by 14,874 |
| 1.82 points, z 1.59 | iOS 55.28% minus Web 53.46%; a two-proportion test with sign-ups per platform as denominators |
| 70.68 days, median 1 | 14,826 visit-to-sign-up transitions for users who have both stages |
| 159; 35 of 32,477 | The fifth and third of five validation checks |
| 5,917 people | Users whose first visit falls between 1 October 2025 and 31 March 2026 |

Every figure comes from `1-Kueri SQL.sql`, which runs as it is: one main pipeline query, one cleaning-impact query, five validation queries, and supporting queries for city, time gaps, and the cohort.
