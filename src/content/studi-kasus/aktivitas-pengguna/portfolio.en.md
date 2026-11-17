**First-week users of social features return 6.84 points more often, and experiment size decides which test runs first**

Mochamad Fajri Ilham Nurdin, completed October 2026, full queries and check files: Google Drive folder, mfajriilhamn@gmail.com

The company, people, and data are fictional, made for practice. This work is a case study and does not come from work experience at any company.

## Context

A subscription video streaming service has 10,000 registered users, and 2,153 of them were active during the data period. Its revenue comes from subscriptions and in-stream ads. Both depend on how often people come back: subscribers who rarely open the app don't feel the value of their subscription when the bill arrives, and every visit is a place to show an ad.

So the measure being tracked is the ratio of daily active users to monthly active users, which this industry calls stickiness. The internal target is 35%, and the figure hasn't moved for months. The head of product holds a feature development budget of Rp 500 million for one quarter, with four candidates going around the meeting: social features, viewing recommendations, games with prizes, and offline viewing. None of them has evidence.

## Question and data

The question: which feature deserves funding first, and on what basis. The material is one app event table, one row for one activity by one user on one date, 1 July 2025 to 31 March 2026. There are 60,000 raw rows, 57,051 after cleaning, 2,153 users, and 274 days without a single empty day. On average each user left only 26.5 activities over nine months.

What isn't in the table: revenue, costs, subscription status, sign-up date, and any experiment results. As a result, no rupiah figure can be calculated from this work, and no cause-and-effect claim can be proven.

## Approach

I used the daily-to-monthly ratio to see the current state, then compared the return rates of two groups of users by their first-week behavior. The ratio captures frequency, and the cohort comparison links that frequency to who comes back. A full retention curve wasn't used because nine months is only enough for the earliest cohort, which is exactly the least trustworthy one. Session length is used as a supplement to test one guess.

Decisions I wrote down before seeing the results:

Every user count uses COUNT(DISTINCT UserID), and the stickiness numerator is the average daily users within a month.

Rejected: COUNT(*). The daily average becomes 208.2 instead of 204.4, the ratio still looks reasonable, and the error would never be caught.

Deduplication picks one row per ActivityID with three keys: earliest date, then a filled-in type, then the longest duration.

Rejected: picking any copy. The row count is the same, 58,500, but the empty types that slip through become 795 instead of 779 and the result can't be repeated.

Sessions with zero or negative duration are dropped, because what is measured is engagement, and opening the app without watching anything doesn't count.

Rejected: counting zero sessions as active. That's valid for measuring reach, but this budget is meant to make people stay longer.

The exposure window is day 0 to day 7 and the return window day 25 to day 35, counted from each person's first activity. The eligibility cut-off, 24 February 2026, is derived from the return window.

Rejected: rating every user. The last thirty-five users can't possibly be seen returning because the data ends, and both groups' return rates drop by about one point with no behavior changing.

The top-segment threshold is more than 10 activities a month, stated every time its figure is stated.

Rejected: choosing the threshold after seeing the results. At a threshold of 8 the top segment accounts for 51.03% of activity, at 12 only 9.94%, from the same data.

After the main comparison came out, I added four checks of my own: separating the July 2025 cohort, which is mixed with existing users, matching the number of active days in the first week along with its interval, calculating how many people an experiment needs, and comparing the pattern of users first seen with the pattern that would appear with no new sign-ups at all.

## Finding 1

Users seen for the first time in the data fell from 340 in August 2025 to 25 in March 2026, while monthly active users stayed at 808 to 840. This figure doesn't necessarily mean fewer new sign-ups. The table has no sign-up date, and on average each user is active in 38.2% of the available months (7,396 user-month pairs, from 2,153 users and 9 months). A group of existing users with that chance of being active, with not a single new sign-up, would be seen for the first time by 515 people in August and 18 in March, down 96.5%. The pattern in the data resembles that pattern, so the drop from 340 to 25 could come from existing users appearing for the first time, from fewer sign-ups, or from both.

What it means for the budget: an experiment on new sign-ups can't be scheduled before the data team states the number of new sign-ups per month, and it is bigger than it looks. To detect the 6.84-point gap from Finding 3 with an 80% chance at the 5% level needs about 798 people per group, or about 1,600 people. A share prompt only moves some participants, so the effect on the whole group will be smaller. If it drops to 2 points, the need is about 9,437 people per group. The raw 8.46-point gap would need only 511 people per group, but that figure still contains differences in the type of user.

**Figure 1. Users seen for the first time in the data, by month**

![gambar 1](images/gambar-1.png)

What it shows. The number of users whose first activity in the data falls in that month, vertical bars from zero. This figure is not the same as new sign-ups because the table has no sign-up date. March 2026 is colored red.

Data range. August 2025 to March 2026, clean data. July 2025 isn't drawn because anyone active before the data started is recorded first in July.

What to notice. The bars fall every month, from 340 to 25, down 92.65%, while monthly active users over the same period stay at 808 to 840.

## Finding 2

Stickiness moved between 24.17% and 27.08% over nine months, a range of 2.91 points, with no lasting upward direction. March 2026 is 24.32%. The 35% target equals 294 daily active users out of March's 838 monthly users, while 204 were recorded, 90 people short every day. The best month, February 2026, is still 7.92 points below target. February's daily average was 227 people, while that month's mix of 8 weekend days and 20 weekdays predicts only 204.4 (weekends average 228.8, weekdays 194.7). Its monthly users were 840, almost the same as March, so the rise came from more frequent visits, and weekend days don't explain it.

The target sits outside the entire range ever reached, so it won't be met through small improvements. February is the only example of the kind of rise the target aims for, and the product team should be asked what was running that month.

**Figure 2. Monthly stickiness against the internal target**

![gambar 2](images/gambar-2.png)

What it shows. Average daily active users divided by monthly active users, per month, as a red line, with a black dashed line at the 35% target. The vertical axis starts at 22%.

Data range. July 2025 to March 2026, 57,051 clean rows.

What to notice. The red line moves between 24.17% and 27.08%, with one peak in February. The distance from the highest point to the target line is 7.92 points.

## Finding 3

Of 2,118 users whose 30-day window is complete, those who touched sharing or comments in their first seven days returned at 67.22% (687 of 1,022), against 58.76% (644 of 1,096) for those who didn't. The gap is 8.46 points, with a 95% confidence interval from 4.37 to 12.56 points, so it is too large for chance. The cause isn't known yet.

The extra checks show part of this gap comes from the type of user. Social-feature users were already more active from the start: in the August 2025 cohorts and later, they were active on 3.62 days in their first week on average, against 2.91 days. When first-week active days are matched, the gap becomes 6.84 points (the weighted average of the three layers in Figure 3, 95% interval 2.72 to 10.96 points). This figure is probably still too high, because the 3-days-or-more layer holds people active 3 to 8 days, and social-feature users are more common at its upper end. By layer, only the 2-day layer clearly separates from zero (11.40 ± 8.16 points), while the 1-day layer (3.09 ± 12.05 points) is too small to read on its own. Sharing only, commenting only, and both give close figures, 66.32% to 69.89%, so no single feature stands out. One more thing: 1,997 of the 2,153 active users (92.75%) used social features at some point in the nine months, so the room left is in the first week.

This finding is enough to decide what to test, and not yet enough to build a feature with the whole budget.

**Figure 3. 30-day return rate, with and without social features in the first week**

![gambar 3](images/gambar-3.png)

What it shows. The percentage of users active again on day 25 to day 35 after their first activity, for the whole cohort and then split by the number of active days in the first week. The axis starts at zero.

Data range. 2,118 users with a first activity no later than 24 February 2026. 35 users after that date are excluded.

What to notice. The red bar is longer in all four pairs. The gap is 8.46 points for the whole cohort, then 3.09, 11.40, and 5.61 points once active days are matched. This figure shows an association and does not show a cause.

## Finding 4

Two guesses going around before the analysis aren't supported by the data yet. The average session lengths on phone, web, and smart TV are at most 0.3 minutes apart (26.9 to 27.2 minutes). With a standard deviation of 17.45 minutes and this many activities, the smallest gap that could be detected is about 0.5 minutes, so there is no duration gap above that. Duration also doesn't answer whether people come back more often on a particular platform, and 1,272 of the 2,153 users use all three platforms. The top segment holds 157 users, 18.74% of March's 838 users, and accounts for 29.68% of activity, a figure that follows from the segment's own definition. What they do differently isn't known yet.

Fixing one platform and targeting the top segment are not on this quarter's test list. The platform guess can be tested again with stickiness per platform if needed.

## Recommendation and budget split

The first step costs nothing: ask the data team how many new sign-ups there are per month, and the product team what was running in February 2026. After that:

| step | budget | what is tested and its conditions |
|---|---|---|
| randomized test of viewing recommendations on existing users, starting now | Rp 150 million | whether better recommendations raise visit frequency, the kind of rise that happened in February; chosen because its participants are already available, and this data holds no clues about recommendations |
| randomized test of a share prompt in the first week for new sign-ups | Rp 150 million | whether encouraging sharing changes the return rate; starts once new sign-ups are enough for about 1,600 people in one quarter, or more if the effect is smaller |
| expansion reserve | Rp 200 million | released only for an experiment that meets a success measure written down before the experiment runs |

The Rp 150 million per experiment is an assumed cost of building and measuring one feature for one quarter, not calculated from the data. Games with prizes and offline viewing aren't funded yet because the data holds no clues about either. I deliberately didn't set the success measures, because that is a product decision. What I can provide is the calculation of how many people are needed for each size of gap.

## Limits

- The return-rate gap, 8.46 points raw or 6.84 points after matching, is an association. Experiments are proposed because an association alone doesn't show a cause.
- The 35% target and the Rp 500 million budget come from internal decisions and aren't derived from the data.
- Revenue uplift and ROI can't be calculated because there isn't a single rupiah figure in the data, and this work contains no projection of a stickiness increase.
- Nine months means each month appears once, so seasonal patterns can't be separated from real change. Without a sign-up date, new sign-ups also can't be separated from existing users appearing for the first time.

## How to check

The query is one file with eighteen statements in the Google Drive folder, with a fixed date limit of 31 March 2026 and no today(), so anyone gets the same figures. The chain of thirteen named stages from deduped_activity to feature_retention is in the first statement, with a comment at each decision. Seven consistency checks run on the final output and all pass: daily users never exceed monthly users across 274 days, stickiness sits at 24.17% to 27.08%, the activity mix adds up to the 57,051 clean rows, no platform has more than 2,153 users, the three segments each month add up to that month's monthly users, there are no empty types, dates past the limit, or non-positive durations in the clean data, and returners never exceed their group's members. The figures behind all three charts are on the 5-Data Grafik sheet in the same folder. The experiment size, the interval for the matched gap, and the first-seen comparison are calculated outside the query from the tables below, with formulas written in 3-Hasil Kueri.

## Data report

Every table below comes from queries run on ClickHouse Labs on 17 October 2026, period 1 July 2025 to 31 March 2026 with a fixed date limit of 31 March 2026, and follows the order of the pipeline. There is no new interpretation in this section.

## Cleaning reconciliation

| stage | before | dropped | after |
|---|---|---|---|
| deduplicate ActivityID | 60,000 | 1,500 | 58,500 |
| empty type and date past the limit | 58,500 | 973 | 57,527 |
| zero or negative duration | 57,527 | 476 | 57,051 |
| total | 60,000 | 2,949 | 57,051 |

| defect, counted from the deduplicated result | rows | share of raw rows |
|---|---|---|
| empty ActivityType | 779 | 1.30% |
| ActivityDate after 31 March 2026 | 195 | 0.33% |
| zero or negative session duration | 485 | 0.81% |

The first table records rows dropped at each stage and can be summed. The second records the rows carrying each defect and can't be summed: the three add up to 1,459, while 1,449 were dropped after deduplication, because 10 rows carry two defects at once. Users: 2,167 in the raw data, still 2,167 after deduplication, 2,153 after cleaning because 14 people had every row defective.

## Row count at each stage

| stage | rows | stage | rows |
|---|---|---|---|
| deduped_activity | 58,500 | user_monthly | 7,396 |
| clean_activity | 57,051 | power_users | 27 |
| daily_active | 274 | user_cohort | 2,118 |
| monthly_active | 9 | initial_behavior | 2,118 |
| stickiness | 9 | retention_base | 2,118 |
| activity_mix | 6 | feature_retention | 2 |
| platform_split | 3 |  |  |

## Nine months

| month | monthly users | daily average | stickiness | lowest daily | highest daily | activities | weekend share | first seen |
|---|---|---|---|---|---|---|---|---|
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

Users first seen in July 2025 (780) certainly include existing users, and later months may too, because the table has no sign-up date. Average daily users are 194.7 on 196 weekdays and 228.8 on 78 weekend days, weekends 17.49% higher. The daily average between months only moves from 191 to 227.

## Activity mix

| type | activities | share of activity | unique users | average per user |
|---|---|---|---|---|
| Watch | 20,096 | 35.22% | 2,135 | 9.41 |
| Search | 10,170 | 17.83% | 2,013 | 5.05 |
| Share | 8,680 | 15.21% | 1,824 | 4.76 |
| Like | 7,530 | 13.20% | 1,888 | 3.99 |
| Comment | 7,016 | 12.30% | 1,712 | 4.10 |
| Download | 3,559 | 6.24% | 1,503 | 2.37 |
| total | 57,051 | 100.00% |  |  |

Share is higher than Like by activity count and lower by unique users.

## Platform

| platform | unique users | activities | average session length |
|---|---|---|---|
| Mobile | 1,887 | 28,619 | 26.9 minutes |
| Web | 1,729 | 17,843 | 27.2 minutes |
| SmartTV | 1,651 | 10,589 | 27.0 minutes |

Unique users can't be summed: 311 users use one platform, 570 two platforms, 1,272 all three. The average duration across all rows is 27.0 minutes, standard deviation 17.45 minutes.

## User segments, March 2026

| segment | activities a month | users | share of users | activities | share of activity |
|---|---|---|---|---|---|
| Power | more than 10 | 157 | 18.74% | 1,910 | 29.68% |
| Middle | 5 to 10 | 573 | 68.38% | 4,154 | 64.54% |
| Casual | fewer than 5 | 108 | 12.89% | 372 | 5.78% |
| total |  | 838 | 100.00% | 6,436 | 100.00% |

| top-segment threshold | users | share of users | share of activity |
|---|---|---|---|
| more than 8 | 302 | 36.04% | 51.03% |
| more than 10 | 157 | 18.74% | 29.68% |
| more than 12 | 45 | 5.37% | 9.94% |

## Return-rate cohorts

| group | users | returned | return rate |
|---|---|---|---|
| Social Early | 1,022 | 687 | 67.22% |
| shared and commented | 186 | 130 | 69.89% |
| commented only | 358 | 240 | 67.04% |
| shared only | 478 | 317 | 66.32% |
| No Social Early | 1,096 | 644 | 58.76% |

Gap of 8.46 points, 95% confidence interval 4.37 to 12.56 points (normal approximation for the difference of two proportions). Without the eligibility cut-off: 66.44% of 1,034 against 57.55% of 1,119.

| cohort and group | users | returned | return rate | first-week active days |
|---|---|---|---|---|
| July 2025 cohort, No Social Early | 392 | 239 | 60.97% | 2.52 |
| July 2025 cohort, Social Early | 388 | 253 | 65.21% | 2.81 |
| August 2025 cohort onward, No Social Early | 704 | 405 | 57.53% | 2.91 |
| August 2025 cohort onward, Social Early | 634 | 434 | 68.45% | 3.62 |

The July 2025 cohort is certainly mixed with existing users, and later cohorts may be too. The gap is 4.24 points in the July cohort and 10.92 points in the later cohorts. The 95% interval for each layer in the next table: 1 day ± 12.05 points, 2 days ± 8.16 points, 3 days or more ± 5.18 points. Their weighted average is 6.84 points, interval 2.72 to 10.96 points.

| first-week active days | users without social | return rate | users with social | return rate | gap |
|---|---|---|---|---|---|
| 1 day | 189 | 52.91% | 100 | 56.00% | 3.09 points |
| 2 days | 328 | 51.52% | 240 | 62.92% | 11.40 points |
| 3 days or more | 579 | 64.77% | 682 | 70.38% | 5.61 points |
