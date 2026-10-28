Case study, RevoU × Telkom Indonesia, Milestone 1

# OCA Message Volume Fell 28% in One Quarter, and the Drop in Email Was the Main Cause

Tableau Public, Solo, Dashboard, KPI Reporting, Channel Analysis, Stakeholder Mapping

## 1. Summary

OCA Blast's four channel reports were still separate, so the source of the Q1 2025 volume drop wasn't visible. I brought 122,749 transactions into one Tableau dashboard for four reader groups. Volume fell 28% from January to March, and 12,000 of the 14,042 lost messages came from email. The recommendations: investigate the email drop before Q2, limit Call to high-value cases because it succeeds only 21.87% of the time, and add per-channel success rate to the Q2 KPIs.

## 2. Why this report exists

OCA is a CPaaS (Communication Platform as a Service) owned by Telkom Indonesia. It is used by 20 corporate clients from 9 industries to send messages via WhatsApp, SMS, Email, and Call. Throughout Q1 2025, OCA Blast hadn't yet optimized channel performance and user activity, which held back usage growth and monetization.

The dashboard was built for four readers:

| Reader | Decision it supports |
|---|---|
| C-level | Direction of next quarter's KPIs |
| OCA Blast Product Manager | Fixing problem channels |
| Marketing and Campaign Ops | Channel allocation and campaign scheduling |
| Account Manager | Priority clients to retain or grow |

## 3. Data and its limits

Five tables for 1 January to 31 March 2025, a total of 122,749 transactions:

| Table | Rows | Main columns |
|---|---|---|
| wa_transactions | 50,000 | transaction_id, user_id, price, created_at, message_status |
| email_transactions | 40,000 | same |
| sms_transactions | 20,000 | same |
| call_transactions | 12,749 | same |
| users | 20 | user_id, user_name, field_of_business, join_date |

Before the dashboard was built, the four channel tables were combined into one transaction table, then joined to the users table on user_id. The data checks:

| Check | Result |
|---|---|
| Combined row count | 122,749, equal to the total of the four tables (50,000 + 40,000 + 20,000 + 12,749) |
| Clients | 20 clients in the transaction data, equal to the 20 rows of the users table |
| Date range | 1 January to 31 March 2025 |
| Duplicate rows | No fully duplicated rows. One transaction_id is used by two different email transactions |
| Message status | 15 statuses from 4 channels (Call 3, SMS 2, Email 6, WhatsApp 4), mapped to successful or unsuccessful |
| Transactions with no charge | 18,600 transactions (15.2%) priced at 0 and marked charge false. All are failed, undelivered, or clicked messages |

The data covers only one quarter and doesn't include message content, OCA-side delivery costs, or email technical logs. So this dashboard can show where volume and success changed, but not explain why email fell. The data has also been adjusted by the organizers for educational purposes and doesn't reflect OCA's actual business.

## 4. What I did

1. Understanding the problem: the four channel reports were still separate, so I framed four business questions about volume, success, peak hours, and active clients.
2. Preparing the data: combining the tables, checking data quality (the table in section 3), and mapping the 15 message statuses to successful or unsuccessful.
3. Exploration: looking at patterns in volume, success, and revenue by channel, by month, by hour and day, and by client.
4. Analysis: comparing volume, success rate, and revenue per message across channels to find the source of the drop and under-used channels.
5. Visualization: building the dashboard in Tableau Public with KPI cards, bar charts, a heatmap, and line charts. There's one summary page for C-level and one dedicated page for each team.
6. Recommendations: writing recommendations per reader, then ordering them with an impact and effort matrix.

### Metrics and why they were chosen

| Metric | Why it was chosen |
|---|---|
| Total messages sent | To see overall load and usage |
| Success and failure rate | To judge each channel's reliability |
| Share of volume per channel | To see which channels dominate |
| Monthly volume trend | To track growth or decline |
| Active users | To monitor adoption |
| Busiest hours and days | Input for campaign scheduling |
| Total revenue | To judge the effect on monetization |

The definition of "successful" differs for each channel: WhatsApp counts as successful if delivered or read, SMS if sent, Email if delivered, opened, or clicked, and Call if answered. Email with a clicked status counts as successful because a click only happens after the email has been opened, even though 1,102 clicked rows were recorded with no charge. With this definition the overall success rate is 79.54%. If clicked isn't counted, the figure becomes 78.65%.

## 5. Figures

*Figure to come: slide 14, volume per channel chart, January to March.*

*Figure to come: screenshot of the dashboard's main page.*

## 6. Findings

**Email is the source of the volume drop.** Total volume fell 28% from January to March (49,534 to 35,492 messages). Email fell 60% (20,000 to 8,000) and accounts for 12,000 of the 14,042 lost messages, while WhatsApp and SMS were relatively flat. The drop happened in one channel, so its cause needs to be looked for on the email side.

**The most reliable channel is rarely used.**

| Channel | Success rate | Revenue per message |
|---|---|---|
| SMS | 99.67% | Rp 498 |
| WhatsApp | 84.77% | Rp 238 |
| Email | 81.32% | Rp 39 |
| Call | 21.87% | Rp 180 |

SMS almost always succeeds and accounts for 38.7% of revenue, but holds only 16% of volume. Call fails on 78.13% of attempts yet still holds 10% of volume.

**Revenue depends on a few clients.** The top three clients account for about 60% of the Rp 25.77 million total revenue. Losing one of them means revenue falls by about 20%.

## 7. What changed in the decision

| Priority | Recommendation | Owner |
|---|---|---|
| Quick win | Investigate the email drop before Q2 starts | Product Manager |
| Quick win | Limit Call to high-value cases only | Product Manager |
| Quick win | Set a minimum 85% success rate per channel as a Q2 KPI, alongside volume | C-level |
| Major project | Prepare a dedicated plan for the top three clients | Account Manager |
| Major project | Fix email delivery (bounces, sender reputation, list hygiene) | Technical Team |

## 8. Limits and audit trail

The data covers only one quarter, so it can't yet be told whether the email drop is seasonal or comes from a technical problem. The exact cause also can't be seen from transaction data alone and needs email delivery logs.

Audit trail: [Tableau Public dashboard](https://public.tableau.com/views/OCAIndonesia-UnifiedChannelPerformance/OCAIndonesia-UnifiedChannelPerformance), Stakeholder presentation slides, 18 slides, PDF (link to come)

### If I did it again

1. I would calculate volume per day, because February has only 28 days and part of the monthly drop comes from the number of days. I only made this correction in Milestone 2.
2. I would test how strong the peak hours are before suggesting a campaign schedule. In Milestone 2 it turned out the busiest hour holds only 8% of messages, slightly above the 7.7% average per hour.
3. I would cost the proposal to move email volume to SMS, because SMS is about 12 times more expensive per message for clients.

Next: [Milestone 2, OCA client segmentation](/en/projects/telkom-m2/full)
