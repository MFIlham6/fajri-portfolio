Review-priority queue case study, done with SQL

# Behind 1,395 Transactions That Need Review There Are Only 56 People, and Lowering the Threshold Would Touch 2,581 People Without Adding a Single Check

A digital wallet's risk team can only review 200 cases a day out of about 50,000 transactions. I built a priority queue from four behavioral signals and checked what its thresholds and weights actually decide.

Mochamad Fajri Ilham Nurdin, completed October 2026, queries and check files: [Google Drive folder](https://drive.google.com/drive/folders/1dNayzpUA-FOX7Diu8NGoEzT-vdKCQ91R), mfajriilhamn@gmail.com

Data note: the figures on this page come from a practice dataset designed to mimic digital wallet transaction patterns. The company and its data are fictional, and this work is not presented as work experience at any company.

## 1. Summary

With a review capacity of 200 cases a day and a volume of about 50,000 transactions, only 0.4% of transactions can be seen by a person, so the order of review decides who gets checked. Four behavioral signals produce a queue of 1,395 transactions belonging to 56 users over 15 months, with a peak of 14 transactions (one user) in a day. My recommendation: review by user, record the outcome of every review as a label, and leave the threshold alone, because lowering it multiplies the number of people touched 46-fold while capacity stays the same.

## 2. Why this report exists

Only 0.4% of transactions can be checked by a person, and there was no written way to decide which ones. The list needed has to come out every morning in the same way, sorted, with a reason for each row, and it has to be reproducible by someone else.

The most natural shortcut is lowering the threshold so more transactions make the list. Review capacity doesn't rise with it, so a longer list adds no checks. All that changes is who fills the top two hundred rows, and who lands on the list without ever being opened. The second shortcut, checking from the largest transactions down, ignores that what we're looking for is a behavior pattern, not an amount.

## 3. Data and its limits

One transaction table: 101,039 rows from 8,000 users, January 2025 to March 2026, seven columns (transaction ID, user, time, value, city, merchant, device). Cleaning removed 2,142 rows (2.12%) in three stages, each recorded: 1,200 copies from resubmissions, 148 timestamped after the end of the period, and 794 refunds set aside. 492 transactions without a merchant were still scored. Unique users stay at 8,000 at every stage.

What isn't in the data decides what I can claim. There are no human review outcomes, so precision, recall, and false-positive rate can't be calculated, and no such figure appears on this page. There are no customer complaints, transaction reasons, distances between cities, or merchant categories.

## 4. What I did

The work is seven fixed steps: clean the transactions, calculate the four behavioral signals one by one, combine them into one weighted score, translate the score into a priority level, then validate the shape of the output before any list is handed over. The four signals can each be explained in one everyday sentence: transactions in a row that are too fast, a value far above the owner's usual, moving between cities too quickly, and too many devices in a day. Cleaning runs in four stages, three removing rows and one holding and flagging them, and every stage has its count recorded. Each query layer adds only one column, so its row count must stay the same and any accidental filtering shows up straight away. I wrote down three decisions before the first analysis query.

**What is produced is a review-priority order with Low, Medium, and High levels.** The column names say what is measured (velocity_flag, risk_score, risk_level), and the queue is arranged by user: one person is one case, with the signals that fired.

Rejected: a fraud / not-fraud flag. The data contains not a single check outcome that could support it, and a label like that would be read as a list of suspects.

**The signals are combined with summed weights, then cut by two thresholds.** I translated the four rules exactly as the risk team gave them. Velocity uses a five-row window, not a ten-minute window, because the rule says five transactions, and the average for the amount signal doesn't include the transaction being measured.

Rejected: a model trained on the data. Training a model needs labelled examples, and this data has none. Without labels, a model would only relearn the same rules in a form that is much harder to explain to a compliance reviewer. This rejection stands until review outcomes have been collected.

**The thresholds and weights are uncalibrated practice rules, and I wrote that status everywhere their numbers appear.**

Rejected: tuning the threshold until the output count feels right. It's the most common approach, and the result is a number with no basis that changes who gets checked.

## 5. Figures

**Figure 1. The queue's daily load compared with review capacity**

![figure 1](images/fig-1.svg)

*What it shows: The most users and the most transactions entering the queue in a single day, next to the team's capacity, all in cases per day.*

*Data range: 98,897 clean transactions from 8,000 users, 1 January 2025 to 31 March 2026.*

*What to see: The top two bars stop at 3 and 14. The bottom bar reaches 200, the end of the axis.*

**Figure 2. Signal combinations that make up the queue**

![figure 2](images/fig-2.svg)

*What it shows: The count of queued transactions for each signal combination, with the number of users.*

*Data range: 1,395 transactions in the queue, belonging to 56 users, same period.*

*What to see: The location + device bar stops at 1,279 and covers all 56 users. The other four bars stop at 42, 34, 31, and 9.*

**Figure 3. Users touched at three threshold positions**

![figure 3](images/fig-3.svg)

*What it shows: The number of users with at least one transaction in the queue, at a Medium threshold of 60, 40 (in use), and 25. The signal rules and their weights are the same.*

*Data range: Same as Figure 1.*

*What to see: The bottom bar stops at 2,581, almost at the end of the axis. The middle bar stops at 56 and the top bar at 9.*

**Figure 4. The amount signal and transactions above Rp 2 million, by month**

![figure 4](images/fig-4.svg)

*What it shows: Per month, transactions that fired the amount signal (green) and transactions worth more than Rp 2 million (grey).*

*Data range: Same as Figure 1.*

*What to see: Both bars are almost the same height in every month. Until October 2025 both are below 40, then they rise every month up to 674 in March 2026.*

## 6. Findings

1. **The queue is concentrated on a few people.** Of 98,897 clean transactions, 1,395 entered the queue, and all of them belong to 56 users: a median of 28 transactions per person, spread over 2 to 7 days. At most 3 people enter the queue in a day, with a peak of 14 transactions from one person. This queue fits far below capacity, so what needs organizing is how it's opened: by user, not by transaction.
2. **Lowering the threshold adds people, not checks.** Lowering the Medium threshold by fifteen points raises the queue to 4,872 transactions, and the users touched from 56 to 2,581. Capacity stays at 200 cases a day, so not a single check is added. Raising the threshold to three signals leaves 9 transactions belonging to 9 users.
3. **The differing weights don't yet distinguish anything.** The level is decided entirely by how many signals fire: one signal is Low, two is Medium, three is High. Equal weights for all four signals produce exactly the same queue. There are only eleven possible scores, so the threshold works like a three-position switch.
4. **The counts for each signal aren't comparable with one another.** The device signal fires 8,314 times (1,032 users) and velocity 371 times (149 users), but the device signal flags all of a person's transactions on a problem day, while the others flag per transaction. The amount signal is also starting to drift: all 1,616 of its firings (1,185 users) fall on transactions above Rp 2 million, and 1,474 of them (1,155 users) happened from November 2025 to March 2026, while the median transaction value barely moved. Recalculated for March 2026 alone, the order of the four signals stays the same, and the queue is 95 transactions belonging to 13 users.
5. **This system's accuracy can't be calculated.** The data contains not a single manual check outcome, so there's nothing to compare precision, recall, or false-positive rate against. The small share entering the queue (1.41%) isn't proof of accuracy either: a random list of the same size would have the same share. That figure can only be calculated once review outcomes are recorded as labels.

**Recommendation.** Use this queue as the daily work order, one case per user. Record the outcome of every review as a label from day one. Don't change any threshold or weight until enough labels have been collected to compare them. This list is not used to block accounts automatically.

## 7. What changed in the decision, and what I measure afterwards

A queue that had no order now has one that anyone can reproduce: score descending, then the longest waiting, then transaction ID as the tie-breaker. The way of working changes from per transaction to per user. One decision that was about to be made, lowering the threshold, is postponed with a reason in numbers. One new question goes to the product team: what has changed in large transactions since November 2025.

Three measures, two of which already have a baseline: transactions entering the queue per day (an average of 7.58 on days with any, a peak of 14) and users touched per month (6 to 17). The third, the share of cases that turn out to be fine after review, has no baseline at all, which is why review outcomes need to be recorded from day one, plus a random sample of ten transactions outside the queue each week for comparison.

## 8. Limits, audit trail, and how to re-run it

- All four thresholds and weights are practice rules that have never been compared with review outcomes. This queue shows where attention is directed, and conclusions about the people remain the reviewer's job.
- The location signal can't tell neighbouring cities from distant ones because there's no distance data.
- The decision to hold 492 transactions without a merchant hasn't been tested. If some of them are logging failures, those transactions are scored without their merchant context.
- In the source table every column is Nullable, and empty merchants are stored as NULL. A "merchant is not empty" condition written as a comparison with an empty string returns NULL, so I wrote it with a fallback value of 0.
- On a one-month slice, the amount signal compares against a history that is cut short too, so I don't compare its numbers directly with the full period.

### Evidence layer: cleaning

| Stage | Rows out | Share of raw | Remaining |
| --- | --- | --- | --- |
| raw rows |  |  | 101,039 |
| copies from resubmissions | 1,200 | 1.19% | 99,839 |
| timestamps after the end of the period | 148 | 0.15% | 99,691 |
| negative values, set aside as refunds | 794 | 0.79% | 98,897 |
| total out of scoring | 2,142 | 2.12% | 98,897 |

492 transactions without a merchant ID are held, flagged, and still scored, because peer-to-peer transfers are a channel that still needs watching. Unique users are 8,000 at every stage.

### Evidence layer: four signals and their weights

| Signal | Rule | Weight | Fired | Share | Users |
| --- | --- | --- | --- | --- | --- |
| velocity | 5 transactions within 10 minutes | 30 | 371 | 0.38% | 149 |
| amount | above 3 times the historical average | 25 | 1,616 | 1.63% | 1,185 |
| location | 2 cities within less than 60 minutes | 25 | 2,959 | 2.99% | 1,543 |
| device | more than 3 devices in a day | 20 | 8,314 | 8.41% | 1,032 |

The four counts aren't comparable: the device signal flags all of a person's transactions on a problem day, while the other three flag per transaction.

### Evidence layer: spread of levels

| Level | Signals fired | Transactions | Share | Users |
| --- | --- | --- | --- | --- |
| Low | 0 or 1 | 97,502 | 98.59% | 8,000 |
| Medium | 2 | 1,386 | 1.40% | 56 |
| High | 3 or 4 | 9 | 0.01% | 9 |

With weights of 30, 25, 25, 20 and thresholds of 70 and 40, the level is decided entirely by the count of signals that fire. None of the sixteen combinations breaks this, and flat weights of 25 with thresholds of 50 and 75 produce an identical queue.

### Evidence layer: validation

| # | Check | Result | Note |
| --- | --- | --- | --- |
| 1 | scores fall on the eleven possible values | pass | zero rows outside |
| 2 | all four signals fire at reasonable magnitudes | pass | device needs its rule's shape explained |
| 3 | the three levels add up to all clean rows | pass | 97,502 + 1,386 + 9 = 98,897 |
| 4 | no rows that should already have been removed | pass | non-positive values, future timestamps, and repeated IDs: zero |
| 5 | the threshold produces a usable list | fail | no review outcomes to compare against |

Every figure comes from `1-Kueri SQL.sql`, ten statements that each contain the full chain and run as they are: the daily queue, grouping by user, cleaning reconciliation, the per-transaction signal table, the spread of levels and combinations, five validation checks, daily load, threshold simulation, and the one-month slice. The per-transaction signal table and the daily queue are available on request, because they contain user IDs.
