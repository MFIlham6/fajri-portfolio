User activity analysis case study · SQL · a head of product decides which feature to fund first

# New-User Arrivals Fell From 340 to 25 a Month While Stickiness Sat at 24%, and That Decides Which Experiment Can Run First

Mochamad Fajri Ilham Nurdin · completed October 2026 · full queries and check files: [Google Drive folder](https://drive.google.com/drive/folders/1SLtnN9fwUOx-oeWT-u6vaY2YYvxaiatJ) · mfajriilhamn@gmail.com

The company, people, and data are fictional, made for practice. This work is a case study, not work experience at any company.

## Context

A video subscription service has 10,000 registered users, 2,153 of whom were active during the data period. Its revenue comes from subscriptions and in-stream ads. Both depend on how often people come back: subscribers who rarely open the app don't feel the value of their subscription when the bill arrives, and every visit is a place to show an ad.

So the metric being watched is the ratio of daily active users to monthly active users, which this industry calls stickiness. The internal target is 35%, and the number hadn't moved for months. The head of product holds a Rp 500 million feature-development budget for one quarter, with four candidates going around in meetings: social features, show recommendations, rewards games, and offline viewing. None of them has evidence behind it.

## Question and data

The question: which feature is worth funding first, and on what basis. The material is one app event table, one row for one activity by one user on one date, 1 July 2025 to 31 March 2026. There are 60,000 raw rows, 57,051 after cleaning, 2,153 users, and 274 days with not a single empty day. On average each user left only 26.5 activities over nine months.

What isn't in the table: revenue, costs, subscription status, sign-up date, and any experiment results. As a result, no rupiah figure can be calculated from this work, and no cause-and-effect claim can be proven.

## Approach

I use the daily-to-monthly ratio to see the current state, then compare the return rate of two groups of users by their first-week behavior. The ratio captures frequency, and the cohort comparison links that frequency to who comes back. A full retention curve isn't used because nine months is only enough for the earliest cohorts, which are exactly the least trustworthy. Session length is used as a supplement to test one hypothesis.

Decisions I wrote down before seeing the results:

**Every user count uses COUNT(DISTINCT UserID), and the stickiness numerator is a daily average, not a sum.**

Rejected: COUNT(*). The daily average becomes 208.2 instead of 204.4, the ratio still looks reasonable, and the mistake would never be noticed.

**Dedup keeps one row per ActivityID with three keys: the earliest date, then a filled-in type, then the longest duration.**

Rejected: picking an arbitrary copy. The row count is the same, 58,500, but the empty types that slip through become 795 instead of 779 and the result can't be reproduced.

**Sessions with zero or negative duration are removed, because what's measured is engagement, not just opening the app.**

Rejected: counting zero-length sessions as active. That's valid for measuring reach, but this budget is aimed at making people stay longer.

**The exposure window is day 0 to day 7 and the return window day 25 to day 35, counted from each person's first activity. The eligibility cut-off, 24 February 2026, is derived from the return window.**

Rejected: assessing every user. The last thirty-five users can't possibly be seen returning because the data ends, and both groups' return rates drop by about one point without any behavior changing.

**The top-segment threshold is more than 10 activities a month, stated every time the figure is quoted.**

Rejected: choosing the threshold after seeing the results. At a threshold of 8 the top segment accounts for 51.03% of activity, at 12 only 9.94%, from the same data.

After the main comparison came out, I added three checks of my own: separating the July 2025 cohort, which is mixed with existing users; equalizing the number of active days in the first week; and calculating how many people an experiment needs to catch a gap as large as the one observed.

## Findings

### Finding 1

Users whose first activity falls in the month fell from 340 in August 2025 to 25 in March 2026, down 92.65%, while monthly active users stayed at 808 to 840. That calm monthly figure is propped up by existing users returning, and the stickiness dashboard doesn't show it because the ratio doesn't change when its users shift from new people to existing ones.

So what: this drop decides the order of steps. To catch a return-rate gap of 8.46 points with an 80% chance at the 5% level, an experiment on new users needs about 511 people per group, or 1,022 people. At March's inflow that takes more than three years, and at August 2025's inflow about three months. If the true effect is half of what's observed, the requirement rises to about 2,089 people per group. Whether this drop is deliberate needs to be answered by the acquisition team before money is allocated.

**Figure 1. Users with their first activity in each month**

![figure 1](images/fig-1.svg)

*What it shows: The count of users whose first activity in the data falls in that month, vertical bars from zero.*

*Data range: August 2025 to March 2026, clean data. July 2025 isn't plotted because anyone active before the data starts is first recorded in July.*

*What to see: The bars fall every month, from 340 to 25, down 92.65%, while monthly active users in the same period stay at 808 to 840.*

### Finding 2

Stickiness moved between 24.17% and 27.08% over nine months, a 2.91-point range, with no lasting upward direction. March 2026 is 24.32%. The 35% target equals 294 daily active users out of March's 838 monthly users, while 204 were recorded, 90 people short every day. The best month, February 2026, is still 7.92 points below target. February's rise came from the same users coming more often (its monthly users were 840, almost the same as March), and February's weekend share, 28.57%, doesn't explain it, because November, at 33.33%, was actually lower.

So what: the target sits outside the whole range ever reached, so it won't be met through small fixes. February is the only example of the kind of rise the target aims for, and the product team needs to be asked what was running that month.

**Figure 2. Monthly stickiness against the internal target**

![figure 2](images/fig-2.svg)

*What it shows: Average daily active users divided by monthly active users, per month, with a dashed line at the 35% target. The vertical axis starts at 22%.*

*Data range: July 2025 to March 2026, 57,051 clean rows.*

*What to see: The line moves inside a 24.17% to 27.08% band, with one peak in February. The gap from the highest point to the target line is 7.92 points.*

### Finding 3

Of 2,118 users with a complete 30-day window, those who used sharing or comments in their first seven days came back 67.22% of the time (687 of 1,022), compared with 58.76% (644 of 1,096) for those who didn't. The gap is 8.46 points, about 1.14 times, with a 95% confidence interval from 4.37 to 12.56 points. The gap is real, and its cause isn't known yet.

The extra checks show part of this gap comes from the kind of user. Social-feature users were more engaged from the start: among users who arrived from August 2025, they were active 3.62 days on average in their first week, against 2.91 days. If first-week active days are equalized, the gap shrinks to about 6.8 points (a weighted average of the three layers in Figure 3). The gap doesn't disappear, so there's still something worth testing. Sharing only, commenting only, and both give similar figures, 66.32% to 69.89%, so no single feature stands out. One more thing: 1,997 of 2,153 active users (92.75%) have already used a social feature, so the room left is in new users' first week.

So what: this finding is enough to decide what to test, and not enough to build a feature with the whole budget.

**Figure 3. 30-day return rate, with and without social features in the first week**

![figure 3](images/fig-3.svg)

*What it shows: The percent of users active again on day 25 to day 35 after their first activity, for the whole cohort and then split by the number of active days in the first week. The axis starts at zero.*

*Data range: 2,118 users with a first activity no later than 24 February 2026. 35 users after that date are excluded.*

*What to see: The green bar is longer in all four pairs, and the gap shrinks from 8.46 points to 3.09, 11.40, and 5.61 points once active days are equalized. Association, not cause and effect.*

### Finding 4

Two hypotheses going around before the analysis aren't supported by the data. Average session length on mobile, web, and smart TV is within 0.3 minutes (26.9 to 27.2 minutes), while the standard deviation of session length is 17.45 minutes, and 1,272 of 2,153 users use all three platforms. The top segment holds 157 users, or 18.74% of March's 838 users, and accounts for 29.68% of activity, but that figure only restates the segment's definition. What they do differently isn't known yet.

So what: fixing one particular platform and targeting the top segment are struck off the list before anyone spends time there.

## Recommendation and budget split

The first step costs nothing: ask the acquisition team whether the drop in new users is deliberate, and the product team what was running in February 2026. After that:

| step | budget | what is tested and its conditions |
| --- | --- | --- |
| test show recommendations on existing users, randomized, starting now | Rp 150 million | whether better recommendations increase visit frequency, the kind of rise seen in February; participants are already available |
| test a sharing prompt in new users' first week, randomized | Rp 150 million | whether encouraging sharing changes the return rate; starts once the new-user inflow is enough for about 1,022 people in one quarter |
| expansion reserve | Rp 200 million | released only for experiments that pass a success measure written before the experiment runs |

The Rp 150 million per experiment is an assumed cost of building and measuring one feature for one quarter, not a data result. Rewards games and offline viewing aren't funded yet because the data holds no clues about either. I deliberately didn't set the success measure, because that's a product decision. What I can provide is the calculation of how many people are needed for each size of gap.

## Limits

- The 8.46-point return-rate gap is an association, not cause and effect. Experiments are proposed because association alone isn't enough.
- The 35% target and the Rp 500 million budget come from internal decisions, not from the data.
- Revenue uplift and ROI can't be calculated because there isn't a single rupiah figure in the data, and this work contains no projection of a stickiness increase.
- Nine months means each month appears once, so seasonal patterns can't be separated from real change.

## How to check it

The queries are one file with eighteen statements in the [Google Drive folder](https://drive.google.com/drive/folders/1SLtnN9fwUOx-oeWT-u6vaY2YYvxaiatJ), with a fixed cut-off date of 31 March 2026 and no today(), so anyone gets the same numbers. The chain of thirteen named stages from deduped_activity to feature_retention is in the first statement, with comments on every decision. Seven consistency checks were run on the final output and all passed: daily users never exceed monthly users across 274 days, stickiness sits at 24.17% to 27.08%, the activity mix adds up to the 57,051 clean rows, no platform's users exceed 2,153, the three segments in each month add up to that month's monthly users, there are no empty types or dates past the cut-off or non-positive durations in the clean data, and those who return never exceed their group's members.

## Data report

Every table below comes from queries run in Labs on 17 October 2026, period 1 July 2025 to 31 March 2026 with a fixed cut-off of 31 March 2026, arranged in pipeline order. There is no new interpretation in this section.

### Cleaning reconciliation

| stage | before | removed | after |
| --- | --- | --- | --- |
| dedup ActivityID | 60,000 | 1,500 | 58,500 |
| empty type and date past the cut-off | 58,500 | 973 | 57,527 |
| zero or negative duration | 57,527 | 476 | 57,051 |
| total | 60,000 | 2,949 | 57,051 |

| defect, counted from the dedup result | rows | share of raw rows |
| --- | --- | --- |
| empty ActivityType | 779 | 1.30% |
| ActivityDate after 31 March 2026 | 195 | 0.33% |
| zero or negative session duration | 485 | 0.81% |

The first table records rows removed at each stage and can be summed. The second records rows carrying each defect and can't be summed: the three add up to 1,459, while 1,449 were removed after dedup, because 10 rows carry two defects at once. Users: 2,167 in the raw data, still 2,167 after dedup, 2,153 after cleaning because all of 14 people's rows were defective.

### Row count at each stage

| stage | rows | stage | rows |
| --- | --- | --- | --- |
| `deduped_activity` | 58,500 | `user_monthly` | 7,396 |
| `clean_activity` | 57,051 | `power_users` | 27 |
| `daily_active` | 274 | `user_cohort` | 2,118 |
| `monthly_active` | 9 | `initial_behavior` | 2,118 |
| `stickiness` | 9 | `retention_base` | 2,118 |
| `activity_mix` | 6 | `feature_retention` | 2 |
| `platform_split` | 3 |  |  |

### Nine months

| month | monthly users | daily average | stickiness | lowest daily | highest daily | activities | weekend share | new users |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Jul 2025 | 780 | 191 | 24.49% | 165 | 235 | 6,030 | 25.81% | 780 |
| Aug 2025 | 808 | 196 | 24.29% | 169 | 225 | 6,196 | 32.26% | 340 |
| Sep 2025 | 840 | 215 | 25.55% | 187 | 274 | 6,557 | 26.67% | 280 |
| Oct 2025 | 818 | 198 | 24.17% | 174 | 234 | 6,242 | 25.81% | 220 |
| Nov 2025 | 818 | 206 | 25.22% | 175 | 249 | 6,302 | 33.33% | 175 |
| Dec 2025 | 833 | 205 | 24.62% | 176 | 249 | 6,474 | 25.81% | 145 |
| Jan 2026 | 821 | 200 | 24.42% | 173 | 234 | 6,328 | 29.03% | 120 |
| Feb 2026 | 840 | 227 | 27.08% | 196 | 269 | 6,486 | 28.57% | 68 |
| Mar 2026 | 838 | 204 | 24.32% | 176 | 244 | 6,436 | 29.03% | 25 |
| overall | 2,153 distinct | 204.4 | 24.17 to 27.08% | 165 | 274 | 57,051 |  |  |

July 2025's new users (780) include existing users. Average daily users are 194.7 on 196 weekdays and 228.8 on 78 weekend days; weekends are 17.49% higher, far beyond the range between months.

### Activity mix

| type | activities | share of activities | unique users | average per user |
| --- | --- | --- | --- | --- |
| Watch | 20,096 | 35.22% | 2,135 | 9.41 |
| Search | 10,170 | 17.83% | 2,013 | 5.05 |
| Share | 8,680 | 15.21% | 1,824 | 4.76 |
| Like | 7,530 | 13.20% | 1,888 | 3.99 |
| Comment | 7,016 | 12.30% | 1,712 | 4.10 |
| Download | 3,559 | 6.24% | 1,503 | 2.37 |
| total | 57,051 | 100.00% |  |  |

Share is higher than Like by activity count and lower by unique users.

### Platforms

| platform | unique users | activities | average session duration |
| --- | --- | --- | --- |
| Mobile | 1,887 | 28,619 | 26.9 minutes |
| Web | 1,729 | 17,843 | 27.2 minutes |
| SmartTV | 1,651 | 10,589 | 27.0 minutes |

Unique users can't be summed: 311 users use one platform, 570 use two, 1,272 use all three. The average duration across all rows is 27.0 minutes, with a standard deviation of 17.45 minutes.

### User segments, March 2026

| segment | activities a month | users | share of users | activities | share of activities |
| --- | --- | --- | --- | --- | --- |
| Power | more than 10 | 157 | 18.74% | 1,910 | 29.68% |
| Middle | 5 to 10 | 573 | 68.38% | 4,154 | 64.54% |
| Casual | fewer than 5 | 108 | 12.89% | 372 | 5.78% |
| total |  | 838 | 100.00% | 6,436 | 100.00% |

| top-segment threshold | users | share of users | share of activities |
| --- | --- | --- | --- |
| more than 8 | 302 | 36.04% | 51.03% |
| more than 10 | 157 | 18.74% | 29.68% |
| more than 12 | 45 | 5.37% | 9.94% |

### Return-rate cohorts

| group | users | returned | return rate |
| --- | --- | --- | --- |
| Social Early | 1,022 | 687 | 67.22% |
| shared and commented | 186 | 130 | 69.89% |
| commented only | 358 | 240 | 67.04% |
| shared only | 478 | 317 | 66.32% |
| No Social Early | 1,096 | 644 | 58.76% |

A gap of 8.46 points, 95% confidence interval 4.37 to 12.56 points (normal approximation for the difference of two proportions). Without the eligibility cut-off: 66.44% of 1,034 against 57.55% of 1,119.

| cohort and group | users | returned | return rate | first-week active days |
| --- | --- | --- | --- | --- |
| July 2025 cohort, No Social Early | 392 | 239 | 60.97% | 2.52 |
| July 2025 cohort, Social Early | 388 | 253 | 65.21% | 2.81 |
| August 2025 onward, No Social Early | 704 | 405 | 57.53% | 2.91 |
| August 2025 onward, Social Early | 634 | 434 | 68.45% | 3.62 |

In the July 2025 cohort, which is mixed with existing users, the gap is 4.24 points. In the cohorts after it, 10.92 points.

| first-week active days | users without social | return rate | users with social | return rate | gap |
| --- | --- | --- | --- | --- | --- |
| 1 day | 189 | 52.91% | 100 | 56.00% | 3.09 points |
| 2 days | 328 | 51.52% | 240 | 62.92% | 11.40 points |
| 3 days or more | 579 | 64.77% | 682 | 70.38% | 5.61 points |
