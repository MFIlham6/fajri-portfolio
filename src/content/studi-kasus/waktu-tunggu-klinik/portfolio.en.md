Case Study: Healthcare Waiting Times

**Branch Rankings Can't Be Told Apart from a Lottery, and Differences Between Clinicians Can't Be Measured Person by Person**

Patient waiting-time analysis, eight-branch clinic network, Spreadsheet, 744 clean visits from 782 raw rows, time spent: 24 hours

Mochamad Fajri Ilham Nurdin, completed October 2026, mfajriilhamn@gmail.com

*Data note: the figures below come from a dataset designed to mimic clinic visit patterns. It is not real company data, and it is not presented as work experience at any company.*

## Context

A clinic network with eight branches keeps receiving complaints about patient waiting times. Management wants to know where the problem is before deciding to add doctors. There are two risks. First, staff placed at the wrong branch become a running cost that doesn't resolve the complaints. Second, waiting-time analysis almost always ends up asking about particular clinicians, and a wrong conclusion there sticks to a person. The data records neither the visit time nor the number of doctors on duty per session, even though both are the most natural explanations for long queues.

## Question

"Which branch has the longest waiting time? We want to prioritize adding doctors there."

## Approach

Cleaning rules were written in order before calculating, including checks that came back zero and checks for overlap between rules. The spread of the data was measured first to know how many observations are needed before an average is fit to compare. Every average is written together with its number of observations. Differences between groups were tested by reshuffling the group labels while keeping the group sizes. The same test was run on every grouping, including ones whose results support the finding. After that, the minimum number of observations was raised step by step, and the test was repeated on the groups that remained.

Four approaches were rejected. The first: ranking the groups and reporting the top one. It answers the question most directly, but a ranking can always be built, even when every group is equal. The second: accepting the grouping that separates most sharply as the finding. More groups means each group is smaller, and small groups produce extreme values more often. The third: calculating relationships between measures on all the data. Small groups pull those relationships along, so a spurious link sounds like a test result. The fourth: delivering conclusions that name individuals. The data allows it, but the cause of the differences is unknown. A mistake about a budget can be corrected; a mistake about a person may not be.

## Findings

1. Branch rankings can't be told apart from a lottery. The highest and lowest branches differ by 4.0 minutes, and 31.8% of 2,000 label reshuffles produce a gap that large or larger. Departments show the same pattern (2.6 minutes, 33.4%).
2. Grouped by clinician, the gap is 16.8 minutes and only 0.7% of reshuffles reach it, so differences between clinicians do exist. But pure reshuffling alone already produces a range with a median of 11.6 minutes, so most of the raw figure is random variation.
3. More than half of that gap disappears when clinicians with few visits are excluded, and what remains is equal to a lottery. With a minimum of 20 visits, the range is 6.4 minutes (16 people, down 62%), and all six names at both ends of the ranking change. Retested on these 16 people, 89% of reshuffles reach 6.4 minutes (median 8.4 minutes), and not one individual differs from the overall average by more than their own uncertainty. The difference that passed the test in finding 2 comes from five people with 12 to 19 visits, whose averages are too unstable to judge one by one.
4. Four explanations were tested, and none explains it. The correlation of consultation length with waiting time is +0.32 across all clinicians (barely passing, p = 0.049) and −0.38 across the 16 with enough data (p = 0.15, not yet distinguishable from zero). Patient count is weak in both populations (−0.22) and points the opposite way to what was expected. Department and branch already fell away in finding 1.

**Figure 1. Actual range and the 95th percentile of the reshuffled range, by grouping**

![gambar 1](images/gambar-1.png)

*The blue bar is the actual range; the gray bar is the limit exceeded by only 5% of reshuffles. Compare their lengths in each grouping.*

**Figure 2. Range of average waiting time between clinicians at four visit-count thresholds**

![gambar 2](images/gambar-2.png)

*Averages from few visits are unstable: with a standard deviation of 11.5 minutes, an average of 12 visits has an uncertainty of ±6.5 minutes. Note the jump between the 15 and 20 thresholds.*

**Figure 3. Correlation of consultation length and visit count with waiting time, by visit-count threshold**

![gambar 3](images/gambar-3.png)

*Note the sign and height of the bars at each threshold. With 16 people, a correlation below about 0.5 can't yet be distinguished from zero.*

## Answer

No branch differs meaningfully. Differences between clinicians exist, but they can't be measured person by person: among those with enough data, the remaining gap is 6.4 minutes and equal to a lottery. The cause is unknown.

## Recommendation

Don't use branch rankings to allocate staff, and don't set waiting-time targets per individual, because with a standard deviation of 11.5 minutes such a target is hit or missed by chance. Record visit time and the number of doctors on duty per session for three months. With about 50 visits a month across the whole network, one month is too few to compare. Both columns are cheap and can tell "someone works more slowly" apart from "that session was short of people". Also trace the ten visits where the consultation took place but revenue was recorded as zero (about Rp 1.6 million if they really weren't paid).

## Limits

The cause of the differences between clinicians is unknown. One department is represented by only two people among those with enough data, so the effect of specialization isn't fully ruled out. The 24.7-minute average can't be judged reasonable or not without an outside benchmark. This analysis deliberately doesn't rank individuals. The data allows it, but the explanation that can't yet be tested, scheduling, sits in columns that were never collected.

## Trace

| Conclusion | Robustness | What would overturn it |
|---|---|---|
| Branch rankings aren't fit for use | Robust | New data in which fewer than 5% of reshuffles reach the gap between branches; now 31.8% |
| There are real differences between clinicians | Robust | New data in which more than 5% of reshuffles reach their range; now 0.7% |
| Those differences can't be measured person by person | Robust | Fewer than 5% of reshuffles reach the range of clinicians with enough data; now 89% |
| Consultation length and patient count don't explain it | Moderate | A correlation above 0.5 among clinicians with enough data; now −0.38 and −0.22 from 16 people |
| Specialization doesn't explain it | Fragile | Specialization averages that separate clearly once each specialization has at least five clinicians with enough data; some now have only two |
| Cause of the differences | Unknown | Needs visit time and staff per session; neither is recorded |

Available artifacts: a seven-sheet workbook with every formula visible. Its cleaning log holds four rules in order, three checks that came back zero, and an overlap check. A formula-based reshuffling test (50 runs per grouping, re-runnable) sits under the clinician table, together with the range table at four thresholds and the retest on clinicians with enough data. Everything can be shared on request, with individual names and locations masked.
