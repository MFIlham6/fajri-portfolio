Data cleaning and analysis case study · e-commerce retail, supply chain · Python (pandas, SciPy)

# DataCo Late Deliveries: The Problem Is the Delivery Promise; Region and Product Make No Difference

57.3% of DataCo's orders arrive after their promise. First Class is promised in 1 day and always arrives on day 2, while Second Class is as slow as Standard. Adjusting the First Class promise alone brings lateness down to 42.0%.

Mochamad Fajri Ilham · notebook, clean data, and supporting files: [Google Drive folder](https://drive.google.com/drive/folders/1duVt4871pYcAj2Dt2-O6mPjqh1F3nz2h) · mfajriilhamn@gmail.com

The DataCo Smart Supply Chain dataset is published on Mendeley Data (Constante, Silva, and Pereira, 2019, CC BY 4.0). The data is almost certainly simulated (see Finding 5), so the findings here describe that data, not necessarily a real company's operations.

## 1. Summary

My earlier final project used the same dataset and concluded that the 54.83% late rate was caused by internal logistics processes, infrastructure in certain regions, and frequent stock-outs. When I reopened the dataset without a problem brief, the first step was to clean the data and log every change. That cleaning changed almost every old conclusion.

The real late rate is 57.3% per order. Actual delivery days depend only on the shipping mode, and the differences between regions or categories that used to show up disappear once counted per order. The problem is in the promise: First Class is late 100% of the time, Second Class 80%, Same Day 48%, Standard 40%. Late First Class, Second Class, and Same Day orders are worth 10.6 million, a third of total sales. The recommendation is to adjust the First Class promise, give Same Day a 12:00 cut-off, and decide what to do with Second Class.

## 2. Business problem and objective

DataCo is an e-commerce retailer of sporting goods (fan shop, apparel, golf, footwear) that sells to individual and corporate customers and ships to 164 countries. This analysis sits in the supply chain and delivery logistics function.

The problem: 57.3% of orders arrive after the promised date, and the figure hasn't improved in three years. The three modes customers pay for to get faster delivery (First Class, Second Class, Same Day) account for 58.4% of all late orders, because their promises don't match the delivery times achieved. The sales value of those orders is 10.6 million, or 33.4% of total sales, about 3.5 million a year. The data holds no shipping costs, so this figure is the value of affected orders, not a loss.

Objective: reduce lateness per order from 57.3% to at most 40% within 3 months and at most 30% within 6 months, by aligning the promises and delivery processes of those three modes.

| Criterion | Content |
| --- | --- |
| Specific | Focus on First Class, Second Class, and Same Day. Region and product aren't touched because they make no difference. |
| Measurable | The percentage of orders with actual days greater than promised days, excluding canceled orders, with Same Day measured in hours. Guard metric: the average actual delivery days for each mode don't rise. |
| Achievable | Simulation: a 2-day First Class promise gives 42.0%, adding a Same Day cut-off gives 39.4%. Promising Second Class in 4 days gives 31.6%, speeding it up to 2 days gives 23.8%. |
| Relevant | The three modes account for 58.4% of lateness and are paid services sold as faster. |
| Time-bound | 3 months for the promise and cut-off changes, 6 months for the Second Class decision, which needs carrier negotiation or a tariff change. These time frames are assumptions, because the data holds no implementation times. |

The old target in the final project (45% within 6 months) is already beaten just by adjusting the First Class promise, so the target was raised.

## 3. Data and cleaning

DataCoSupplyChainDataset.csv holds 180,519 item rows from 65,752 orders with 53 columns, orders from 1 January 2015 to 31 January 2018. There are no duplicate rows. There are 14 cleaning steps, and the full history is in 3-Cleaning Log. The ones with the most effect on the numbers:

- Latin-1 encoding. The file fails to read as UTF-8 because of accented place names.
- 15 columns removed: five with no information (masked email and password, empty product description, Product Status always 0, destination postcode 86% empty), four containing personal or unused data, and six from duplicate column pairs.
- 7,754 canceled and fraud items were recorded as not late. Once excluded, lateness rises from 54.83% to 57.29%.
- From October 2017 each order is almost always a single item and active products drop to 8 to 20 a month. This period is flagged and excluded from product comparisons.
- Items are rolled up into 62,897 orders. An order holds 2.75 items on average, always with the same mode and late status, so counting per item makes the sample look three times larger.

## 4. Findings

**Finding 1.** Each mode's promise doesn't match the delivery time achieved. The promise is always the same per mode: Same Day 0 days, First Class 1, Second Class 2, Standard 4. First Class always arrives in 2 days. Second Class and Standard are spread evenly from 2 to 6 days, about 20% each, so both average 4.0 days.

**Figure 1. Spread of actual delivery days per mode and its promise**

![figure 1](images/gambar-1-en.png)

Compare the Second Class and Standard Class panels: the bars are the same, only the promise line differs.

| Mode | Share of orders | Promise | Actual delivery time | Late | Share of all late orders |
| --- | --- | --- | --- | --- | --- |
| Same Day | 5.4% | 0 days | 0 days (ordered before 12:00) or 1 day | 48.4% | 4.6% |
| First Class | 15.3% | 1 day | always 2 days | 100.0% | 26.6% |
| Second Class | 19.5% | 2 days | 2 to 6 days, average 4.0 | 80.0% | 27.2% |
| Standard Class | 59.8% | 4 days | 2 to 6 days, average 4.0 | 39.8% | 41.6% |
| All modes | 100% |  |  | 57.3% | 100% |

**Finding 2.** Same Day lateness is decided by the order time. Every Same Day order ships exactly 12 hours after ordering. Orders before 12:00 ship the same day and are on time. Orders from 12:00 onward ship after midnight, are recorded as 1 day, and are late.

**Figure 2. Late Same Day orders by order hour**

![figure 2](images/gambar-2-en.png)

Note the boundary at 12:00.

**Finding 3.** Region, category, segment, and payment method make no difference. A chi-square test per item makes region look significant. Per order, and within the same mode, no factor has p below 0.05. Because a non-significant p doesn't prove the effect is zero, effect size was calculated too. Shipping mode's Cramér's V is 0.48, while every other factor is below 0.03. Within the same mode, regions with at least 500 orders differ by only −3.1 to +2.4 points from the mode average, compared with a 60-point gap between modes.

| Factor | p, per item | p, per order | p, Standard Class orders | Cramér's V | Range of lateness per order |
| --- | --- | --- | --- | --- | --- |
| Market | 0.10 | 0.53 | 0.69 | 0.007 | 56.5 to 57.7% |
| Destination region | < 0.001 | 0.10 | 0.20 | 0.022 | 52.6 to 60.0% |
| Category | 0.62 | 0.68 | 1.00 | 0.027 | 40.3 to 70.0% |
| Department | 0.74 | 0.70 | 0.74 | 0.011 | 56.4 to 61.4% |
| Customer segment | 0.35 | 0.59 | 0.13 | 0.004 | 57.2 to 57.7% |
| Payment method | 0.16 | 0.70 | 0.50 | 0.005 | 56.7 to 57.5% |

**Figure 3. Lateness of Standard Class orders by destination region**

![figure 3](images/gambar-3.png)

The numbers in brackets are order counts. A range that crosses the average line means that region doesn't differ from the average.

**Finding 4.** No improvement in three years. Monthly lateness moves between 55.0% and 59.9%, and each mode's share barely changes from year to year.

**Figure 4. Late orders per month**

![figure 4](images/gambar-4-en.png)

The dashed line is the 45% target from the earlier final project.

**Finding 5.** This data is almost certainly simulated. Some patterns are too neat for real operations, and this needs to be known before the results are used for decisions:

- Standard and Second Class delivery days are spread 19.9% to 20.2% on every day from 2 to 6.
- Every Same Day order ships exactly 12 hours after ordering, and every First Class order in exactly 2 days.
- All 1,488 orders suspected of fraud were paid by transfer, with not one from any other method.
- Customers are only in the United States and Puerto Rico, yet goods ship to 164 countries with the same late rate.
- Lateness per year is 57.2%, 57.6%, and 57.0%, and the Cramér's V of every factor other than mode is below 0.03.

Real data almost always has differences between regions, seasons, and carriers. So the recommendations below should be read as a way of thinking to be re-tested on operational data, not figures to use directly.

## 5. Delivery promise simulation

Because delivery days aren't affected by other factors, the scenarios are recalculated with the same actual days and a changed promise. The scenarios are cumulative: each row adds a change on top of the row before it.

| Scenario | Late orders |
| --- | --- |
| Current state | 57.3% |
| 1. First Class promised in 2 days | 42.0% |
| 2. + Same Day with a 12:00 cut-off | 39.4% |
| 3. + Second Class promised in 4 days (same as Standard) | 31.6% |
| 4. + Second and Standard promised in 5 days | 15.9% |

**Figure 5. Late orders per scenario**

![figure 5](images/gambar-5-en.png)

The first bar is the current state.

The alternative for Second Class is to speed up its process until it truly takes 2 days. Together with the First Class and Same Day changes, lateness falls to 23.8%. Its cost can't be calculated from this data.

## 6. Recommendations

- Promise First Class in 2 days, or prove a 1-day process first before selling that service again. This step alone brings lateness to 42.0%, but goods don't get any faster. The risk is that customers paying for First Class switch to Standard, so test it on part of the orders first and watch the share of First Class orders and cancellations.
- Same Day with a 12:00 cut-off. Orders after that are promised for tomorrow.
- Speed Second Class up to 2 days, or promise it in 4 days and stop selling it as a faster service. The choice depends on the tariff difference and carrier costs.
- Measure lateness per order, excluding canceled orders, and Same Day in hours.
- The 2-to-6-day spread in Standard and Second Class becomes the next operational job. Even after every promise is adjusted, on-time performance is still below US parcel carriers (90% to 97%) and the APQC median OTIF (90%).

## 7. Other findings

All 1,488 orders suspected of fraud were paid by transfer, 8.2% of all transfer orders, with a sales value of 741,492. No other payment method has a single one. On the profit side, 18.7% of items were sold at a loss.

## 8. Limits of the analysis

- The data is almost certainly simulated (Finding 5).
- The 3- and 6-month time frames in the objective are assumptions. The data holds no implementation time for promise changes or carrier negotiations.
- There are no columns for shipping rates, carrier, or origin warehouse, so the cost of each scenario can't be calculated.
- Lateness doesn't change repeat purchasing (96.3% of customers whose first order was late bought again, compared with 95.8%), so its effect on revenue can't be measured.
- Changing the promise lowers the late figure without speeding up the goods. First Class customers still receive their goods on day 2.

## 9. What was fixed from the first version

| First version | After cleaning and recalculation |
| --- | --- |
| Late rate 54.83% | 57.31% per order. The old figure was calculated per item and counted canceled items as on time |
| Period December 2014 to December 2017 | 1 January 2015 to 31 January 2018. From October 2017 the data's structure changes |
| Central Africa, South Asia, East Africa late above 55.94% | The difference between regions isn't significant per order (p = 0.10; within Standard Class p = 0.20) |
| Golf Bags & Carts, Soccer, Pet Supplies late by more than 0.7 days on average | All three are small categories (61, 136, and 472 items). The average across all items is 0.57 days and the difference between categories isn't significant (p = 0.68) |
| 18.68% of orders had a stock-out | Product Status is always 0, so the data doesn't record stock-outs. 18.7% is the share of items sold at a loss |
| Same Day has the lowest late rate, 4.50% | 4.50% is Same Day's share of all late items. Its late rate is 48.4% per order |
| Standard Class accounts for 41.45% of lateness, so it needs auditing | True (41.6% per order), but because Standard holds 59.8% of orders. Its late rate is actually the lowest (39.8%) |
| Benefit per order read as profit per order | The value is per item. Read per order, recorded profit is 1,388,652 out of 3,966,903 |

Files: 1-Cleaning and Analysis Notebook, 2-Decision Memo, 3-Cleaning Log, 4-Clean Data, 5-Portfolio. All are in the same [Google Drive folder](https://drive.google.com/drive/folders/1duVt4871pYcAj2Dt2-O6mPjqh1F3nz2h).
