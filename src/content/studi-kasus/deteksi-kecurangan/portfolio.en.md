**A digital wallet review queue: 56 people behind 1,395 transactions, and a threshold that hasn't been lowered**

A digital wallet's risk team can only review 200 cases a day out of about 50,000 transactions. I built a priority queue from four behavioral signals and checked what the thresholds and weights actually decide.

Mochamad Fajri Ilham Nurdin, completed October 2026, queries and check files: Google Drive folder, mfajriilhamn@gmail.com

Data note: the figures on this page come from a practice dataset designed to mimic digital wallet transaction patterns. The company and its data are fictional, and this work is not presented as work experience at any company.

## Summary

With a review capacity of 200 cases a day and a volume of about 50,000 transactions, only 0.4% of transactions can be seen by a person, so the order of review decides who gets checked. Four behavioral signals produce a queue of 1,395 transactions belonging to 56 users over 15 months, with a peak of 14 transactions (one user) in a day. This practice dataset is only about 1/230 of that daily volume. At full volume, the same queue becomes about 705 transactions a day belonging to about 108 users, so it only fits if it is opened by user. My suggestion: review by user, record the result of each review as a label, and leave the threshold alone, because lowering it multiplies the number of people touched 46 times while capacity stays the same.

## Why this report exists

There was no written way to decide which transactions make up that 0.4%. The list needed has to come out every morning the same way, sorted, with a reason for each row, and be recalculable by someone else.

The most natural shortcut is to lower the threshold so more transactions get on the list. Review capacity doesn't rise with it, so a longer list adds no checks. The only thing that changes is who fills the top two hundred rows, and who lands on the list without ever being opened. The second shortcut, reviewing from the largest transactions down, only looks at the amount, while all four of the risk team's rules judge behavior: speed, moving between cities, number of devices, and the amount compared with the owner's habits.

## Data and its limits

One transaction table: 101,039 rows from 8,000 users, January 2025 to March 2026, seven columns (transaction ID, user, time, amount, city, merchant, device). Cleaning removed 2,142 rows (2.12%) in three recorded stages: 1,200 copies from resends, 148 timestamped after the end of the period, and 794 refunds set aside. 492 transactions without a merchant are still scored. Unique users stay at 8,000 at every stage.

What isn't in the data decides what I can claim. There are no human review results, so precision, recall, and the false-positive rate can't be calculated, and there are no such figures on this page. There are no customer complaints, transaction reasons, distances between cities, or merchant categories.

## What I did

The work is seven fixed steps: clean the transactions, calculate the four behavioral signals one by one, combine them into one weighted score, translate the score into a priority level, then validate the shape of the output before any list is handed over. All four signals can be explained in one everyday sentence: back-to-back transactions that are too fast, an amount far above the owner's habit, moving between cities too quickly, and too many devices in a day. Cleaning runs in four stages, three that remove rows and one that holds and flags them, and the count at each stage is recorded. Every query layer adds only one column, so the row count must stay the same and any accidental filtering shows up at once. I wrote down three decisions before the first analysis query.

The output is a review priority order with Low, Medium, and High levels. Every column is named for what it measures (flag per signal, score, level), and the queue is organized by user: one case holds all of that person's transactions in the queue, which signals fired, and the results of earlier reviews.

Rejected: a fraud or not-fraud flag. The data doesn't hold a single review result that could support it, and a label like that would be read as a list of suspects.

The signals are combined with summed weights, then cut by two thresholds. I translated the four rules exactly as the risk team gave them. Speed uses a five-row window, not a ten-minute window, because the rule says five transactions, and the average for the amount signal excludes the transaction being measured.

Rejected: a model trained from the data. Training a model needs labeled examples, and this data doesn't have a single one. Without labels, a model would only relearn the same rules in a form much harder to explain to a compliance reviewer. This rejection holds until review results have been collected.

The thresholds and weights have the status of practice rules that haven't been calibrated, and I wrote that status everywhere their numbers appear.

Rejected: tuning the threshold until the output size feels right. It is the most common way, and the result is a number without a basis that changes who gets checked.

## Figures

**Figure 1. Daily queue load compared with review capacity**

![gambar 1](images/gambar-1.png)

What it shows. The most users and the most transactions entering the queue in one day, next to the team's capacity, all in cases per day.

Data range. 98,897 clean transactions from 8,000 users, 1 January 2025 to 31 March 2026.

What to notice. The two red bars stop at 3 and 14. The gray capacity bar stops at 200.

**Figure 2. Signal combinations that make up the queue**

![gambar 2](images/gambar-2.png)

What it shows. The number of transactions for each signal combination in the queue, with its number of users.

Data range. 1,395 transactions in the queue, belonging to 56 users, same period.

What to notice. The red location + device bar stops at 1,279 and covers all 56 users. The other four bars stop at 42, 34, 31, and 9.

**Figure 3. Users touched at three threshold positions**

![gambar 3](images/gambar-3.png)

What it shows. The number of users with at least one transaction in the queue, at a Medium threshold of 60, 40 (in use), and 25. The signal rules and weights are the same.

Data range. Same as Figure 1.

What to notice. The bottom bar stops at 2,581, almost at the end of the axis. The red bar in the middle stops at 56 and the top bar at 9.

**Figure 4. Amount signals and transactions above Rp 2 million, by month**

![gambar 4](images/gambar-4.png)

What it shows. Per month, transactions that fire the amount signal (red) and transactions worth more than Rp 2 million (gray).

Data range. Same as Figure 1.

What to notice. The two bars are almost the same height in every month. Up to October 2025 both are below 40, then they rise every month to 674 in March 2026.

## Findings

1. The queue is concentrated on a few people. Of 98,897 clean transactions, 1,395 enter the queue, and all of them belong to 56 users: a median of 28 transactions per person, spread over 2 to 7 days (median 4). Per person per day there are 6.5 transactions on average, at most 14, and at most 3 people enter the queue in one day. In this dataset the queue fits far below capacity. A daily volume of 50,000 is roughly 230 times this dataset, and at that volume the queue becomes about 705 transactions belonging to about 108 people a day. Per transaction that exceeds the capacity of 200; per user it still fits on a normal day. The same people also come back on other days, so one case needs to carry the results of earlier reviews.
2. Lowering the threshold adds people, not checks. A Medium threshold lowered from 40 to 25 raises the queue to 4,872 transactions, and the users touched from 56 to 2,581. Capacity stays at 200 cases a day, so not one check is added. Raising the threshold to three signals leaves 9 transactions belonging to 9 users.
3. Different weights only change the order inside Medium. The level is decided entirely by how many signals fire: one signal is Low, two Medium, three High. Equal weights for all four signals give exactly the same queue contents and levels. With the current weights, a case scoring 55 is opened before 50 and 45. With equal weights, every Medium case scores 50 and is sorted by time. There are only eleven possible scores, so the thresholds work like a three-position switch.
4. The signal counts aren't comparable with each other. The device signal fires 8,314 times (1,032 users) and speed 371 times (149 users), but the device signal flags all of a person's transactions on a problem day, while the others flag per transaction. The amount signal is also starting to shift: all 1,616 of its firings (1,185 users) fall on transactions above Rp 2 million, and 1,474 of them (1,155 users) happened from November 2025 to March 2026. The median transaction amount was stable through 2025, then rose 13.7% in March 2026 (Rp 239,834), when 10.08% of that month's transactions were above Rp 2 million. With full history, the amount signal fires on 10.07% of March 2026 transactions and becomes the most frequent signal, above device (8.41%). If that month is recalculated with history cut off too, the order of the four signals looks unchanged. The March 2026 queue holds 95 transactions belonging to 13 users.
5. The accuracy of this system can't be calculated. The data doesn't hold a single manual review result, so there's nothing to compare precision, recall, or the false-positive rate against. The small share of the queue (1.41%) doesn't show accuracy either, because that share only describes the list's size. A random list of the same size would also be 1.41%. Those figures can only be calculated after review results are recorded as labels.

Recommendation. Use this queue as the daily work order, one case per user carrying the results of earlier reviews. Record the result of each review as a label from day one, and also review 20 random transactions a day from outside the queue as a comparison. Don't change any threshold or weight until enough labels have been collected to compare them. This list is not used to freeze accounts automatically.

## What changed in the decision, and what I measure afterwards

The queue, which had no order before, now has an order anyone can recalculate: score descending, then longest waiting, then transaction ID as the tie-breaker. The way of working changes from per transaction to per user. One decision that was about to be made, lowering the threshold, is postponed with a reason given in numbers. One new question goes to the product team: what has changed in large transactions since November 2025.

Three measures, two of which already have a starting value: transactions entering the queue per day (an average of 7.58 on days with any, peak 14, to be measured again at full volume) and users touched per month (6 to 17). The third, the share of cases that turn out to be legitimate after review, has no starting value at all, and that's why review results need to be recorded from day one, plus a random sample of 20 transactions a day from outside the queue as a comparison. In a month that is about 600 transactions. If none of them needs follow-up, the rate of cases slipping past the queue is likely below 0.5%. My original plan, ten a week, would only give about 43 transactions a month.

## Limits, trace, and how to rerun

- All four thresholds and weights are practice rules that have never been compared with review results. This queue shows where to direct attention, and decisions about people are made by the reviewer.
- The capacity of 200 cases and the volume of 50,000 transactions a day come from the brief. This dataset is about 1/230 of that volume, so the full-volume figures on this page are multiplied out, and the load on a busy day at full volume can't be estimated yet.
- The location signal can't tell neighboring cities from distant ones because there is no distance data.
- The decision to keep the 492 transactions without a merchant hasn't been tested. If some of them are logging failures, those transactions are scored without merchant context.
- In the source table every column is Nullable, and empty merchants are stored as NULL. A "merchant not empty" condition written as a comparison with an empty string returns NULL, so I wrote it with a fallback value of 0.
- The amount signal on the March 2026 cut alone compares against history that is cut off too, so I don't compare its figures directly with the full period.

## Evidence layer: cleaning

| Stage | Rows removed | Share of raw | Remaining |
|---|---|---|---|
| raw rows |  |  | 101,039 |
| copies from resends | 1,200 | 1.19% | 99,839 |
| timestamp after the end of the period | 148 | 0.15% | 99,691 |
| negative amount, set aside as refunds | 794 | 0.79% | 98,897 |
| total removed from scoring | 2,142 | 2.12% | 98,897 |

492 transactions without a merchant ID are held, flagged, and still scored, because transfers between users are a channel that still needs watching. Unique users are 8,000 at every stage.

## Evidence layer: the four signals and their weights

| Signal | Rule | Weight | Fired | Share | Users |
|---|---|---|---|---|---|
| speed | 5 transactions within 10 minutes | 30 | 371 | 0.38% | 149 |
| amount | above 3 times the historical average | 25 | 1,616 | 1.63% | 1,185 |
| location | 2 cities in under 60 minutes | 25 | 2,959 | 2.99% | 1,543 |
| device | more than 3 devices in a day | 20 | 8,314 | 8.41% | 1,032 |

The four counts aren't comparable: the device signal flags all of a person's transactions on a problem day, while the other three flag per transaction.

## Evidence layer: spread of levels

| Level | Signals fired | Transactions | Share | Users |
|---|---|---|---|---|
| Low | 0 or 1 | 97,502 | 98.59% | 8,000 |
| Medium | 2 | 1,386 | 1.40% | 56 |
| High | 3 or 4 | 9 | 0.01% | 9 |

With weights of 30, 25, 25, 20 and thresholds of 70 and 40, the level is decided entirely by the number of signals that fire. Not one of the sixteen combinations breaks this, and equal weights of 25 with thresholds of 50 and 75 give identical queue contents and levels, with a different order inside Medium.

## Evidence layer: validation

| # | Check | Result | Note |
|---|---|---|---|
| 1 | scores fall within the eleven possible values | passed | zero rows outside |
| 2 | all four signals fire at reasonable sizes | passed | device needs an explanation of how its rule works |
| 3 | the three levels add up to all clean rows | passed | 97,502 + 1,386 + 9 = 98,897 |
| 4 | no rows that should already have been removed | passed | non-positive amounts, future timestamps, and repeated IDs: zero |
| 5 | the thresholds produce a usable list | failed | there are no review results to compare against |

Every figure comes from 1-Kueri SQL.sql, ten statements that each hold the full chain and run as they are on ClickHouse: the daily queue, grouping by user, cleaning reconciliation, the per-transaction signal table, the spread of levels and combinations, five validation checks, daily load, the threshold simulation, and the March 2026 cut. The per-transaction signal table and the daily queue are available on request, because they contain user IDs.

The full query, decision log, one-page memo, and the data for all four figures (5-Data Grafik) are available in the folder linked at the top.
