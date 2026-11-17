**Satisfaction Scores Rose, and So Did the Intent to Leave: Re-presenting 4,723 Survey Responses**

A home internet provider with 180,000 customers was about to spend Rp 4.8 billion a year on 40 field technicians, on the assumption that customers leave because of the network. Its annual survey had already been analyzed, but the meeting screen only showed the overall score going up. I rebuilt that screen from the same data, without changing a single figure, until it showed which dimension sets apart the customers who intend to leave.

Mochamad Fajri Ilham Nurdin, completed November 2026, dashboard, memo, and calculations: Google Drive folder, mfajriilhamn@gmail.com

The company, people, and data are fictional, made for practice. Every figure below is calculated from the same survey file and can be recalculated by anyone.

## Summary

**Why this report exists.** The company's monthly churn rose from 1.8% to 2.6%, from about 3,240 to 4,680 customers leaving each month. The budget meeting opened with the overall satisfaction score, which rose from 3.40 to 3.65 through 2025. As long as that figure was on screen, adding technicians sounded like the only sensible proposal, and a counter-analysis from the Customer Experience team twice failed to change the decision.

**Data.** The customer survey from January to December 2025: 4,723 responses from six cities, five rating dimensions scored 1 to 5, one overall score, one question on whether the customer will keep subscribing, and a complaint category filled in by 1,564 respondents. No data from outside that file was added.

**What I decided.** Three presentation decisions, each with the form I rejected:

The overall score is split into three lines on one plane, with customer service as the only colored line.

Rejected: a single overall-score line. That line rises, and its rise hides the dimension falling beneath it.

The drivers of intent to leave are shown as the score gap between two groups of respondents.

Rejected: the yearly average of the five dimensions. That form compares no one, and the dimension with the highest average looks the safest.

Speed is shown as the spread of ratings per city.

Rejected: an average card. The average falls on the rating respondents chose least often.

**Figure 1. Average score per month: overall, customer service, and price**

![gambar 1](images/gambar-1.png)

*Average score from 1 to 5 per month, January to December 2025, from the Overview page of the Power BI dashboard. Note the customer service line falling all year while the price line jumps at the July promotion.*

**Figure 2. Which dimension sets apart respondents who intend to leave**

![gambar 2](images/gambar-2.png)

*Average score of respondents who will stay minus those who intend to leave, per dimension. Note the length of the customer service bar compared with the other dimensions.*

**Figure 3. Where the split in speed ratings comes from**

![gambar 3](images/gambar-3.png)

*Composition of speed ratings per city from the Diagnosis page: gold = ratings 1 to 2, dark gray = 4 to 5. Note the three legacy-network cities at the top and the three new-network cities at the bottom.*

**Findings.** (Figure 1) The overall score rose from 3.40 to 3.65 together with a price jump from 2.91 to 4.13 at the July promotion, while customer service fell every month, from 3.66 to 2.77. (Figure 2) Customer service differs by +0.37 between those who will stay and those who won't, speed and stability by +0.06, and price by −0.12. (Figures 3 and 4) The average speed rating of 3.64 is split: 26.9% gave 1 to 2 and 66.3% gave 4 to 5, and 1,271 of the 1,272 low ratings came from Bandung, Medan, and Balikpapan.

**What changed in the decision.** The meeting's question shifts from how many technicians to add to which dimension sets apart the customers who intend to leave. This screen doesn't decide the budget. It makes the technician proposal judgeable against the dimension the data points to.

**Limits.** The survey measures intent to leave (18.3%, 862 respondents), not customers who already left (actual churn of 2.6% a month), and the two must not be multiplied into rupiah. June was only surveyed for one week (80 responses, other months 422 on average) and is marked separately. This screen doesn't judge whether network improvement is cost-effective.

**Trace.** Every figure is calculated from one survey file of 4,723 rows. The calculation script is in the supporting folder.

## Context

The company serves households in six cities: Jakarta, Bandung, Surabaya, Semarang, Medan, and Balikpapan. Through 2025, the figure management discussed most was churn, customers who stop subscribing each month. The rise from 1.8% to 2.6% means about 1,440 more households leaving every month.

The Director of Operations concluded the cause was the network and proposed 40 field technicians worth Rp 4.8 billion a year. That conclusion is reasonable from where they stand: they receive technical complaints from the field, and internet customers who are disappointed are usually disappointed in their internet. The proposal is concrete, measurable, and ready to run.

The Head of Customer Experience had a survey analysis pointing elsewhere. Twice it was brought to the board meeting, and twice the board closed the discussion by pointing to the rising overall satisfaction score. The problem was in what appeared on the screen, not in the calculation.

**What's at stake.** If the third meeting's screen shows the same figure again, the Rp 4.8 billion budget is spent on a basis that hasn't been tested against the survey data.

**Project limits.** This work re-presents existing data for one meeting. It doesn't look for new patterns beyond the meeting's four questions, doesn't use billing data, and doesn't calculate the cost of alternatives.

Four questions that must be answerable from one screen, with no presenter explaining:

1. Has customer satisfaction really improved this year?
2. Which service dimension most decides whether people stay or leave?
3. Which city deserves attention first, and how sure are we?
4. Does adding 40 field technicians answer the right problem?

## Framework

Every screen element goes through the same five steps, in order, because each step closes off choices for the next.

1. **Question.** One whole question the element answers. The test: can two opposite answers be imagined? If not, what's written is still only a topic.
2. **Metric.** Average, proportion, gap between groups, or the full distribution. All four are calculated from the same data and can lead to different conclusions, so the choice of metric is recorded as a decision, along with the number of respondents behind it.
3. **Form.** The message is written as a sentence first, then its key words decide the data relationship: up and down means a time series, a gap means a deviation, bigger than means a ranking, a spread means a distribution. The rejected form is recorded too, with its reason.
4. **Screen.** Position and size. The summary at the top left, the element that reverses the old conclusion gets the most space, and everything fits without scrolling.
5. **Conclusion.** One sentence attached to the element, stating the finding with a number, not claiming a cause the data can't show, and fitting on one line.

**Rules I held across the screen.** Every figure appears with its number of respondents. Months that aren't comparable are marked. Bar axes start at zero. One highlight color per element, and that color always means the same thing. Two different metrics never share one name. No filter can make the main conclusion disappear. No pies, 3D effects, or dual axes.

**How it was validated.** Every figure on screen was recalculated from the raw file by a script, not typed from an image. The screen was then tested on one person who wasn't involved: they looked for ten seconds, then said what they read first and what conclusion they took away.

## Findings and recommendations

**Satisfaction didn't improve in the service dimension**

The overall score rose from 3.40 in January to 3.65 in December. Its rise happened together with one dimension: price, from 2.91 in May to 4.13 in July, the month the discount promotion started, then holding at 4.08 to 4.14. Customer service fell every month without once turning back, from 3.66 to 2.77, down 0.89 points. Over the same period, the share of respondents saying they won't continue rose from 11.3% to 22.1% (Figure 1).

**Customer service is the only dimension that sets them apart**

Respondents who will stay gave customer service 3.28, those who won't gave 2.91, a gap of +0.37. Speed and stability are +0.06 each, installation 0.00, price −0.12 (Figure 2). I checked whether this pattern is only a promotion effect by splitting the year: January to June, customer service +0.34 and speed +0.16; July to December, customer service +0.30 and speed −0.01. Customer service leads in both halves.

**Figure 4. Intent to leave by the rating respondents gave**

![gambar 4](images/gambar-4.png)

*Percentage of respondents intending to leave by the rating they gave (1 = worst). Note the customer service line dropping sharply compared with the flat speed line.*

Figure 6 reads the same relationship from the other direction. Among respondents who gave customer service a 1, 32.6% said they won't continue, and among those who gave a 5, only 4.2%. By speed rating, the figure is flat at 17.3% to 20.9%.

**The network problem is real, but it isn't what sets them apart**

Speed in Bandung is 1.73, Medan 1.72, and Balikpapan 1.76, while Jakarta, Surabaya, and Semarang are 4.43 to 4.45 (Figure 4). Scores that low stay on screen, because hiding them would bring the whole argument down at the first question from operations. What the data doesn't support is the assumption that improving the network will keep customers who are currently intending to leave.

One figure supports part of the technician proposal. Among the 1,564 respondents who filled in a complaint category, those who complained that technicians were slow to arrive said they won't continue at 23.0% (343 people), above the 18.3% average. The highest is difficulty reaching customer service, 27.1% (340 people).

**Jakarta first**

**Figure 5. Percentage of respondents saying they won't continue, per city**

![gambar 5](images/gambar-5.png)

*Percentage intending to leave per city; labels show the number intending to leave and the number of respondents. Note Jakarta, with the highest percentage and the most respondents.*

Jakarta contributes 1,850 respondents, 20.2% intent to leave, and 374 of the 862 respondents intending to leave. Its customer service score fell from 3.37 in January to 2.50 in December. Balikpapan has the lowest service score (2.80) but from 45 respondents, below the threshold of 100 I set for ranking.

**Recommendations**

- **Postpone** the procurement of 40 technicians until the next meeting, then decide again side by side with a customer service improvement plan.
- **Shift** this quarter's priority to customer service in Jakarta. The Customer Experience team drafts targets for score and response time within two weeks.
- **Continue** network improvement in Bandung, Medan, and Balikpapan as a separate proposal with its own cost calculation. If technicians are still added, measure the result by technician arrival time.

**Limits of the conclusion**

- Intent to leave of 18.3% (862 of 4,723 respondents) is a survey answer. Actual churn of 2.6% a month comes from billing. The two aren't compared on one axis and aren't multiplied into rupiah.
- The relationships shown are associations. The data doesn't prove that poor service causes customers to leave.
- June was only surveyed from 1 to 7 June (80 responses) and isn't used to read trends.
- The survey doesn't contain infrastructure age or repair costs. The split in speed follows the city, and its explanation lies outside this data.

## Evidence

**One-screen dashboard**

**Figure 6. The Overview page of the Power BI dashboard**

![gambar 6](images/gambar-6.png)

*Three cards at the top: intent to leave, customer service score, and overall score. Below them, four charts with conclusions as titles. The Diagnosis page tests the idea that a slow network is the cause.*

Seven elements without scrolling: the main sentence, the three-dimension trend, the driver gap, the speed spread per city, intent to leave per city, intent to leave by rating, and a method note. No filters, so the full picture always shows.

**Reasons for each form, in brief**

| Element | Form chosen | Form rejected | Main reason |
|---|---|---|---|
| Main sentence | A finding sentence at the top left with period and n | An overall-score card of 3.65 | The top left is read first; that card repeats the figure that stalled the two previous meetings. |
| Trend | Three-series line, June as a hollow point, July promotion marker | Overall line only; a January versus December card | A single line hides the decline; a two-point card erases the eleven months in between. |
| Drivers | Sorted gap bars, zero inside the plane | Average per dimension; radar | An average doesn't compare two groups; a radar uses angle and area, which are read less accurately than length. |
| Speed | 100% stacked bars per city | Average card; pie | The average falls on a rating chosen by 6.7% of respondents; a pie can't line up six cities. |
| City | Sorted bars with n, cities with n<100 not ranked | Shaded map; ranking without n | A map gives weight by area; without n, a city with 45 respondents rises to the top. |
| Intent by rating | Two-series line, axis from 0% | Scatter per respondent; table | Whole-number ratings stack 4,723 points on 25 positions; a table forces the reader to work out the slope. |
| Method note | Three text columns at the bottom of the screen | Removed or moved to a second page | Without the note, every objection has to be answered out loud. |

The full version, with question and data-relationship columns, is in the form-rationale document.

**Monthly data**

| Month | n | Overall | Service | Price | Speed | Intent to leave |
|---|---|---|---|---|---|---|
| January | 415 | 3.40 | 3.66 | 2.95 | 3.62 | 11.3% |
| February | 415 | 3.30 | 3.60 | 2.92 | 3.60 | 16.6% |
| March | 435 | 3.29 | 3.48 | 2.92 | 3.66 | 15.2% |
| April | 415 | 3.33 | 3.44 | 2.91 | 3.62 | 16.9% |
| May | 435 | 3.29 | 3.37 | 2.91 | 3.64 | 15.6% |
| June (1 to 7 June) | 80 | 4.06 | 3.21 | 2.80 | 3.56 | 8.8% |
| July | 435 | 3.73 | 3.17 | 4.13 | 3.62 | 22.5% |
| August | 415 | 3.71 | 3.09 | 4.11 | 3.67 | 18.1% |
| September | 435 | 3.65 | 3.05 | 4.11 | 3.67 | 20.0% |
| October | 415 | 3.59 | 2.89 | 4.08 | 3.65 | 21.4% |
| November | 435 | 3.69 | 2.83 | 4.14 | 3.63 | 22.8% |
| December | 393 | 3.65 | 2.77 | 4.14 | 3.63 | 22.1% |

Average scores from 1 to 5. Average responses in months other than June: 422; overall score in months other than June: 3.51.

**Data per city**

| City | n | Service | Speed | Speed 1 to 2 | Intent to leave | People |
|---|---|---|---|---|---|---|
| Jakarta | 1,850 | 2.98 | 4.44 | 0.0% | 20.2% | 374 |
| Bandung | 1,089 | 3.34 | 1.73 | 89.9% | 19.3% | 210 |
| Surabaya | 944 | 3.47 | 4.45 | 0.1% | 14.3% | 135 |
| Semarang | 522 | 3.18 | 4.43 | 0.0% | 16.1% | 84 |
| Medan | 273 | 3.57 | 1.72 | 92.7% | 19.0% | 52 |
| Balikpapan | 45 | 2.80 | 1.76 | 86.7% | 15.6% | 7 |

**Complaint categories**

| Category | Respondents | Intent to leave |
|---|---|---|
| Connection keeps dropping | 381 | 18.4% |
| Speed doesn't match the plan | 376 | 16.8% |
| Technician slow to arrive | 343 | 23.0% |
| Hard to reach customer service | 340 | 27.1% |
| Bill doesn't match | 62 | 21.0% |
| Slow installation | 62 | 19.4% |

Filled in by 1,564 of 4,723 respondents; 3,159 didn't fill in a complaint category.
