Case Study · Healthcare Waiting Times

# **Branch Rankings Can't Be Told Apart From a Lottery, and the Gap Between Medical Staff Turns Out to Be Less Than Half Its Raw Figure**

Patient waiting-time analysis · eight-branch clinic network · Spreadsheet · scope of 744 clean visits from 782 raw rows

Mochamad Fajri Ilham Nurdin · completed October 2026 · [mfajriilhamn@gmail.com](mailto:mfajriilhamn@gmail.com)

*Data note: the figures below come from a dataset designed to mimic clinic visit patterns. It is not real company data, and it is not presented as work experience at any company.*

## **Context**

A clinic network with eight branches kept receiving complaints about patient waiting times. Management wanted to know where the problem was before deciding to add doctors. The stakes had two layers. First, staff placed at the wrong branch become a running cost that doesn't fix the complaints. Second, waiting-time analysis almost always ends with questions about particular medical staff, and a wrong conclusion there sticks to a person. The data doesn't record visit times or the number of doctors on duty per session, even though both are the most natural explanations for long queues.

## **The question**

"Which branch has the longest waiting time? We want to prioritize adding doctors there."

## **Approach**

I wrote the cleaning rules in order before calculating, including checks that came back zero and checks for overlap between rules. I measured the spread of the data first to know how many observations are needed before an average is fair to compare. Every average is written with its number of observations. Differences between groups were tested by reshuffling the group labels while keeping the group sizes. The same test was run on groupings that overturn and that support, then the minimum number of observations was raised step by step to see how many survive.

Four approaches were rejected. First, ranking the groups and reporting the top one. It answers the question most directly, but a ranking can always be built, even when every group is equal. Second, accepting whichever grouping separates most sharply as the finding. More groups mean smaller groups, and small groups produce extreme values more often. Third, calculating the relationship between measures on all the data. Small groups pull that relationship along, so a spurious link sounds like a verified result. Fourth, reporting conclusions that name individuals. The data allows it, but the cause of the difference is unknown. A mistake about a budget can be corrected; a mistake about a person may not be.

## **Findings**

1. **The branch ranking can't be told apart from a lottery.** The gap between the highest and lowest branch is 4.0 minutes, and 31.8% of 2,000 label shuffles produce a gap that large or larger. Departments show the same pattern (2.6 minutes, 33.4%).  
2. **Grouped by medical staff, the gap is 16.8 minutes and only 0.7% of shuffles reach it.** There is a real difference. But pure shuffling alone already produces a middle range of 11.6 minutes, so most of the raw figure is random variation.  
3. **More than half of that gap disappears when staff with few visits are excluded.** With a minimum of 20 visits, the range is 6.4 minutes (16 people, down 62%), and all six names at both ends of the board change. In this group, no individual differs from the overall average by more than their own uncertainty margin.  
4. **Four explanations were tested, and none of them explains it.** The correlation between consultation length and waiting time is +0.32 across all staff, but it flips to −0.38 once the populations are made equal. Patient count is weak in both populations (−0.22) and points the opposite way from what was assumed. Department and branch were already ruled out in finding 1.

**Figure 1. Only the gap between medical staff survives testing; branch and department gaps are no different from a lottery draw.**

![figure 1](images/gambar-1.png)

The same procedure is used for all three groupings, and it is the same procedure that overturns the branch finding.

**Figure 2. More than half the gap disappears once staff with few visits are excluded.**

![figure 2](images/gambar-2.png)

An average of a few visits is shaky: with a standard deviation of 11.5 minutes, an average of 12 visits has an uncertainty of ±6.5 minutes. The remaining gap is 6.4 minutes.

**Figure 3. The most convincing explanation disappears when recalculated.**

![figure 3](images/gambar-3.png)

The correlation between consultation length and waiting time changes sign, from +0.32 to −0.38, once the populations are made equal, so this link can't be used as an explanation.

## **Answer**

No branch is meaningfully different. The difference is between medical staff, 6.4 minutes in the group with enough observations, and its cause is unknown.

## **Recommendation**

Don't use the branch ranking to allocate staff, and don't set per-person waiting-time targets, because with 11.5 minutes of variation those targets are met or missed by chance. Record visit times and the number of doctors on duty per session for one month. Both are cheap and immediately separate "someone works more slowly" from "that session was short-staffed". Also trace the ten visits where a consultation took place but revenue was recorded as zero (about Rp 1.6 million if they were indeed unpaid).

## **Limits**

The cause of the 6.4-minute gap is unknown. One department is represented by only two people among those with enough data, so the effect of specialization isn't fully ruled out. The 24.7-minute average can't be judged as reasonable or not without an outside benchmark. This analysis deliberately does not rank individuals. The data allows it, but the most likely explanation, scheduling, sits in columns that were never collected.

## **Audit trail**

| Conclusion | Robustness | What would overturn it |
| :---- | :---- | :---- |
| The branch ranking is not fit for use | Robust | Almost nothing: 31.8% of shuffles reach the same gap |
| There is a real difference between medical staff | Robust | Only 0.7% of shuffles reach its range |
| Its size is 6.4 minutes, not 16.8 | Robust | Two different approaches, shuffling and raising the threshold, point the same way |
| Consultation length and patient count don't explain it | Robust | Both are weak or change sign in the group with enough observations |
| Specialization doesn't explain it | Fragile | One specialization is represented by only two people |
| Cause of the difference | Unknown | Needs visit times and staff per session; neither is recorded |

Available artifacts: a six-sheet workbook with every formula visible. Its cleaning log holds four ordered rules, three checks that came back zero, and an overlap check. A formula-based shuffle test (50 repetitions per grouping, re-runnable) sits below the medical-staff table, together with a range table at five thresholds. Everything can be shared on request, with individual names and locations masked.
