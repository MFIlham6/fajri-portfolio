Case study, RevoU × Telkom Indonesia, Milestone 2

# 20 Clients, 3 Segments, and Only Sending Volume Tells Them Apart

Python (pandas, NumPy, SciPy, scikit-learn, seaborn), Google Colab, Solo, Python, Descriptive Statistics, RFM, Clustering, Segmentation

## 1. Summary

OCA didn't yet know which clients were at risk of churn, ready for an upsell, or in need of re-onboarding. With RFM and K-Means, the 20 clients split into three well-separated segments: Loyal Premium (3 clients, 60% of revenue), Mid Tier (5 clients, 25%), and Potential (12 clients, 15%). Only sending volume tells them apart. The brief's 14-day churn rule didn't catch a single client, so I added an early churn signal that flagged 6 clients. The recommendations differ by segment, from a dedicated Account Manager for Loyal Premium to industry-specific re-onboarding for Potential.

## 2. Why this report exists

A continuation of Milestone 1. All 20 clients were active every day in Q1 2025, but revenue per day kept falling and revenue depended on three clients. The brief asked for three answers:

1. Which clients are most likely to churn, and how can they be kept?
2. How can onboarding be adapted to usage behavior?
3. Which clients are ready to move up to a higher-volume package?

## 3. Data and its limits

One combined dataset holding 122,749 transactions from four channels, already joined to the client table. No rows were removed from the first stage to the last.

| Stage | Rows | What was found | Handling and impact |
|---|---|---|---|
| Raw data | 122,749 | 13 columns, 20 clients, 4 channels | Starting point |
| Fix date format | 122,749 | All 122,749 created_at values and 42,387 receivedTimestamp values were written with year 0025 and a UTC suffix | The year was changed to 2025 and the suffix removed, then converted to datetime. No dates failed to parse; the range is 1 January to 31 March 2025 |
| Standardize charge | 122,749 | 54,149 true, 18,600 false, and 50,000 empty, all WhatsApp rows | Converted to boolean. WhatsApp rows were left empty because this channel doesn't record charge |
| Check duplicates | 122,749 | No fully duplicated rows. One transaction_id is used by two email transactions with a different user, date, status, and price | Both kept and logged as an ID anomaly |
| Check missing values | 122,749 | Empty columns follow the channel: total_sms is only filled for SMS, message_type only for WhatsApp, and receivedTimestamp is empty on 7,613 WhatsApp messages with a rejected or submitted status | Not filled, because these gaps are part of the data's structure |
| Check zero prices | 122,749 | 18,600 transactions (15.2%) priced at 0, the same count as charge false | Kept, because these transactions genuinely weren't billed |
| Cap price outliers | 122,749 | 863 transactions (0.70%) above the IQR limit of 925, all Call, the highest 10,680 | A price_winsorized column was created for clustering. Total revenue in this column is Rp 25.42 million, 1.3% below the original Rp 25.77 million. Revenue reporting still uses the original prices |
| Feature engineering | 122,749 | 4 new features: is_success, hour, day_of_week, month | Data ready for analysis with no rows removed |

The data holds only 20 clients and one quarter, and contains no contracts, package prices, or history of clients who left. So this segmentation describes Q1 2025 behavior only, and the early churn signal can't yet be tested against churn that actually happened.

## 4. What I did

### Descriptive statistics

| Statistic | price |
|---|---|
| Mean | 209.9 |
| Median | 150 |
| Standard deviation | 213.9 |
| Range | 0 to 10,680 |
| Skewness | 2.92 |
| Kurtosis | 66.5 |

The mean is far above the median and kurtosis is very high, so price has a long right tail. On tracing, every extreme value comes from Call. After winsorization, the maximum becomes 925, the mean 207.1, and the standard deviation 197.5, while Q1, the median, and Q3 don't change. The total_sms column is only filled on the 20,000 SMS rows, with a median of 1 and a maximum of 4 SMS per transaction.

| Variable | Finding |
|---|---|
| channel | WhatsApp 50,000, Email 40,000, SMS 20,000, Call 12,749 |
| field_of_business | 9 industries. Travel, Real Estate, and Finance each about 26,000 transactions, eCommerce about 1,500 |
| charge | True on 54,149 of the 72,749 filled rows |
| message_type | 3 types, the most common service (26,681) |
| transaction_id | 122,748 unique values from 122,749 rows |
| join_date | 2022 to 2024, so every client had joined well before Q1 2025 |

### Decisions taken

| Decision | Reason |
|---|---|
| Recency not used | Every client transacted on the last day of the quarter, so Recency is 0 for everyone |
| Active days and number of channels dropped | Their standard deviation is 0: every client was active 90 days and used 4 channels |
| Success rate dropped | Its range is only 78.9% to 80.3%. After scaling, this difference just becomes noise |
| Quantile split (pd.qcut) rejected | It splits clients into equal-sized groups, so clients with 1,552 and 6,010 messages land in the same group. Thresholds were moved to the data's natural gaps |
| RobustScaler | Shapiro-Wilk test p < 0.05 and skewness 1.73, so the data isn't normal and is right-skewed |
| k = 3 | Inertia drops from 6.99 at k = 2 to 0.0067 at k = 3. Silhouette is highest at k = 3 (0.985), compared with 0.913 at k = 2 and 0.857 at k = 4 |
| Validation with manual rules | Thresholds of 5,000 and 20,000 messages produce the same segments for 20 of 20 clients |

## 5. Figures

**Figure 1. Messages and revenue per client by segment, Q1 2025 (slide 10)**

![figure 1](images/gambar-1.png)

**Figure 2. Revenue and average price per transaction by segment, January to March 2025 (slide 12)**

![figure 2](images/gambar-2.png)

*Figure to come: bivariate chart of success rate per channel and monthly volume per channel, from the notebook.*

## 6. Findings

**Three well-separated segments.**

| Segment | Clients | Messages per quarter threshold | Messages per day | Revenue share |
|---|---|---|---|---|
| Loyal Premium | 3 | 20,000 or more | about 270 | 60% |
| Mid Tier | 5 | 5,000 to 19,999 | about 68 | 25% |
| Potential | 12 | below 5,000 | about 17 | 15% |

The largest Potential client sent 1,593 messages, while the smallest Mid Tier client sent 6,010. The gap is wide, so a threshold anywhere inside it gives the same result.

**Only volume tells clients apart.** Every client generates about Rp 210 per message, so Monetary is almost the same as Frequency. The weekend share is about 29% in every segment (2 of 7 days equals 28.6%), the busiest hour holds only about 8% of messages, and every segment uses the channels in the same proportions (about 41% WhatsApp, 33% email, 16% SMS, 10% call).

**Revenue fell 10% from January to March in every segment.** No client stopped. Everyone sent less, especially email. Loyal Premium's revenue per day fell from about Rp 180 thousand to Rp 172 thousand, then Rp 163 thousand. Average price per transaction rose about 25% because the share of cheap email shrank.

### Findings nobody asked for

1. The brief's churn rule doesn't catch anyone. The brief flags churn if a client is inactive for 14 days, but every client was active 90 of 90 days. I added an earlier signal: non-email messages per day falling more than 10% from January to March. Email is excluded because it fell 60% across every client at once, which looks more like a change on the platform side. The result: 6 clients flagged, 5 of them from the Potential segment.
2. The suggested channel trial isn't relevant. The brief suggests a trial for clients using only one channel, but every client already uses all four.
3. Industry doesn't decide the tier. Travel, Real Estate, and Finance each have one Loyal Premium client and one Potential client. All four Hospitality clients are in Potential, even though booking confirmations and reminders give them a reason to send more.

## 7. What changed in the decision

| Segment | Recommendation | Owner |
|---|---|---|
| Loyal Premium | A dedicated Account Manager per client and an automatic alert when monthly volume falls | Account Manager |
| Mid Tier | A volume discount from 2,500 messages a month (about 20% above the current average) | Product Manager |
| Potential | Re-onboarding with industry templates, starting with Hospitality, targeting 600 messages a month per client by June | Marketing Ops |
| 6 flagged clients | Contacted in April to ask about the cause of the drop | Account Manager |
| All | The 14-day rule set up as an automatic alert on the dashboard | Product Manager |

## 8. Limits and audit trail

The very high silhouette shows the groups really are well separated, but with data this small, manual rules are already enough, so K-Means works as a confirmation. The early churn signal's accuracy can't be tested yet because there's no Q2 data.

Audit trail: Notebook (GitHub link to come), Stakeholder presentation slides, 18 slides, PDF (link to come)

### If I did it again

1. I would start from manual rules at the data's gaps, then use K-Means as a comparison, because with 20 clients and one distinguishing dimension the result is already visible from a histogram.
2. I would ask for at least two quarters of data so the early churn signal can be tested against clients who eventually leave.
3. I would ask for email delivery logs to confirm whether the 60% drop came from clients or from the platform.

Back to: [Milestone 1, OCA channel dashboard](/en/projects/telkom-m1/full)
