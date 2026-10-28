Demand forecasting case study, Python (Google Colab), practice data

# August 2022 Stock Forecast for Five Q-Commerce Hubs: The Simplest Method Turned Out to Be the Most Accurate

August demand is forecast at 394,242 units, with 40% in the last week. SARIMA, first chosen for its 5.04% MAPE, missed by 14% to 80% when tested on forecasting a full month.

Mochamad Fajri Ilham, Team 6, notebook and supporting files: [Google Drive folder](https://drive.google.com/drive/folders/1jk8wOdxjqNUFT7m-CwR94zbNxKYuf3Tq), mfajriilhamn@gmail.com

The company and its data are fictional, for practice. Every figure is calculated from the same shipment file and can be recalculated with its notebook.

## 1. Summary

A Q-Commerce company has run five new hubs since January 2022. The operations team needs weekly demand figures for August 2022 per hub to prepare stock, especially for Fruit & Vegetables and Dairy, which spoil quickly. The data holds shipped goods by month, category, week, and hub over seven months.

The first version of this analysis chose SARIMA and concluded demand would peak in week three. On re-checking, two things turned out to be wrong: the "August" figures were shifted by one month, and the test data used to choose the model was only three weeks, part of which had leaked into the training data. After a proper re-test, the seasonal naive method (the same week last month) is the most accurate at hub and category level, with an average error of 9.2%.

The recommendation: prepare 394,242 units for August, make sure the week-four order covers 10 days, give Dairy a 12.6% buffer and Fruit & Vegetables 8.4%, then correct orders once the first week is over.

## 2. Data and its checks

The Demand_Data.csv file holds 1,400 rows, exactly 7 months x 10 categories x 4 weeks x 5 hubs. There are no empty values, no duplicates, and no zero or negative quantities. The only fixes needed were data types: the month column converted to a date and Shipped Qty from comma-formatted text to a number. Weeks W1 to W4 are mapped to the 1st, 8th, 15th, and 22nd, so W4 holds 7 to 10 days.

There are 108 values above the IQR upper bound. 94 come from Fruit & Vegetables and Dairy, and 55 fall in W4. Both are genuine patterns in the data, so every row is kept.

## 3. Findings

**Finding 1.** Every month is split into weeks in the same proportions. In all 350 combinations of month, category, and hub, W1 holds 15% of the month's volume, W2 20%, W3 25%, and W4 40%, with the largest difference 0.09 points from rounding. Demand always peaks in W4. Another consequence: weekly data adds no information on top of monthly data. What's really being forecast is one August total, with seven months of history.

**Finding 2.** Volume flattened after Ramadan. The monthly total rose sharply from January to April, when Ramadan 2022 (2 April to 1 May) pushed volume to 446,512 units. May fell 20.8%, then June rose 8.4% and July 2.8%. All five hubs moved in the same pattern.

**Figure 1. Monthly Shipped Qty by hub**

![figure 1](images/gambar-1-en.png)

Note the April peak and the almost flat line from June to July at every hub.

**Finding 3.** Two fresh categories hold almost half the volume. Fruit & Vegetables account for 32.7% and Dairy 14.5%, a total of 47.2% or 1,015,719 units. Fruit & Vegetables are 2.26 times the second category.

**Figure 2. Total Shipped Qty by category, January to July 2022**

![figure 2](images/gambar-2-en.png)

The two colored bars are the categories that get stock targets.

**Finding 4.** Each category is heading in a different direction. Dairy rose 6% in June and 9% in July, while Fruit & Vegetables rose 4% then fell 6%. Frozen Food grew fastest, from 3.3% of volume in February to 7.1% in July. For rising categories, a forecast from last month tends to be too low, and that's counted into the buffer.

## 4. Choosing a method

Six methods were tested with a two-fold backtest. The first fold forecasts June with data up to May, the second forecasts July with data up to June, each over four full weeks. Testing was done on the total across all hubs and on 50 hub x category series.

| Method | MAPE, June total | MAPE, July total | Average of 50 series |
| --- | --- | --- | --- |
| Seasonal naive | 7.8% | 2.7% | 9.2% |
| 3-month average x profile | 3.1% | 0.1% | 10.3% |
| Holt-Winters multiplicative | 5.3% | 10.4% | 10.4% |
| Holt-Winters additive | 48.2% | 26.8% | 23.2% |
| 4-week MA | 29.8% | 31.4% | 31.4% |
| SARIMA (1,1,1)(0,1,1,4) | 80.1% | 14.0% | 40.4% |

SARIMA and additive Holt-Winters read the February-to-April rise as a trend and extend it, so they miss badly in June when volume actually fell. The three-month average looks most accurate at total level, but that's because April's spike and May's drop happen to cancel out in its test window. For August the window is May to July, and its forecast would be 4.3% below July even though the last two months rose.

Seasonal naive was chosen because its error is lowest at the level used to prepare stock, hub x category. The method is also easy for the operations team to recalculate without a statistical model.

**Figure 3. Average backtest MAPE, 50 hub x category series**

![figure 3](images/gambar-3.png)

Compare the seasonal naive bar with SARIMA at the bottom.

## 5. August forecast and stock targets

| Hub | W1 (1-7 Aug) | W2 (8-14 Aug) | W3 (15-21 Aug) | W4 (22-31 Aug) | Total |
| --- | --- | --- | --- | --- | --- |
| Hub A | 9,931 | 13,243 | 16,553 | 26,484 | 66,211 |
| Hub B | 10,210 | 13,616 | 17,020 | 27,231 | 68,077 |
| Hub C | 12,882 | 17,177 | 21,470 | 34,350 | 85,879 |
| Hub D | 12,806 | 17,075 | 21,345 | 34,152 | 85,378 |
| Hub E | 13,306 | 17,739 | 22,173 | 35,479 | 88,697 |
| Total | 59,135 | 78,850 | 98,561 | 157,696 | 394,242 |

**Figure 4. Weekly Shipped Qty and the August 2022 forecast**

![figure 4](images/gambar-4-en.png)

The dashed line is multiplicative Holt-Winters for comparison, 10% above July.

Safety stock is calculated from the relative error of seasonal naive in June and July, with the five hubs combined per category, at a 95% service level: a buffer of 8.4% of the forecast for Fruit & Vegetables and 12.6% for Dairy. Because the weekly pattern is fixed, the error in percent is the same for all four weeks, so the buffer is calculated as a percent of each week's forecast.

Weekly stock targets (forecast plus buffer), in units:

| Hub | Fruit & Veg W1 | Fruit & Veg W2 | Fruit & Veg W3 | Fruit & Veg W4 | Dairy W1 | Dairy W2 | Dairy W3 | Dairy W4 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hub A | 2,557 | 3,411 | 4,263 | 6,820 | 1,384 | 1,846 | 2,308 | 3,692 |
| Hub B | 2,046 | 2,728 | 3,411 | 5,456 | 1,153 | 1,538 | 1,922 | 3,077 |
| Hub C | 4,263 | 5,684 | 7,104 | 11,367 | 2,308 | 3,077 | 3,845 | 6,152 |
| Hub D | 5,541 | 7,388 | 9,236 | 14,778 | 2,538 | 3,384 | 4,230 | 6,767 |
| Hub E | 5,968 | 7,957 | 9,946 | 15,914 | 2,692 | 3,589 | 4,487 | 7,178 |

## 6. Recommendations

- The W4 order covers 10 days, 22 to 31 August, with 40% of the month's volume.
- Use the stock targets above for Fruit & Vegetables and Dairy, and deliver vegetables two to three times a week so the buffer doesn't pile up.
- Frozen Food keeps well and is still rising, so it's safe to order above the July figure with a thicker buffer.
- Once W1 of August is over, divide the W1 figure by 0.15 to estimate the August total and correct the W2 to W4 orders.

## 7. Limits of the analysis

- Seven months of history, two of which are the hubs' start-up period and Ramadan. Error is only measured from two test months.
- The data holds shipped goods. Without data on closing stock, spoilage, stock-outs, prices, and promotions, Shipped Qty may be lower than true demand.
- Safety stock assumes a one-week lead time. If it's longer, the buffer needs multiplying by the square root of the lead time in weeks.
- Independence Day, 17 August, falls in W3. Its effect can't be measured from this data.

## 8. What was fixed from the first version

| First version | After recalculation |
| --- | --- |
| Fruit & Vegetables 31.4% of total shipments | 32.7% (703,770 of 2,152,036 units) |
| Fruit & Vegetables + Dairy 45.3% | 47.2%. The unit count, 1,015,719, was already correct |
| Volume grew steadily from January | Rose until April (Ramadan), fell 20.8% in May, then rose only 8.4% and 2.8% in June and July |
| The 108 outliers are end-of-month spikes | Only 55 are in W4. 94 come from Fruit & Vegetables and Dairy, the highest-volume categories |
| Additive model chosen because the seasonal amplitude is stable | The amplitude grows with volume. What stays fixed is the ratio: W1 15%, W2 20%, W3 25%, W4 40% |
| Moving Average MAPE 91.90% and 99.67% | 30.6%. The old figures were calculated on data rows that hadn't been aggregated |
| Holt-Winters 9.77%, SARIMA 5.04%, SARIMA best | With a full-month test: additive Holt-Winters 37.5%, SARIMA 47.0% (June 80.1%, July 14.0%). Best at hub x category level: seasonal naive 9.2% |
| Demand peaks in W3 (15 to 21 August) | Peaks in W4 (22 to 31 August), 40% of the month's volume |
| Safety stock 52 to 124 units, Dairy demand stable | Safety stock 12.6% of the forecast, 345 to 804 units in W4. Dairy rose two months in a row |

Files: 1-Forecasting Notebook ([Google Colab](https://colab.research.google.com/drive/139ScaFsLvjnVViHmYAI8nyQyrnfzvkdA)), 2-Decision Memo, 3-Forecast Results, 4-Portfolio, 5-Presentation Slides. All are in the same [Google Drive folder](https://drive.google.com/drive/folders/1jk8wOdxjqNUFT7m-CwR94zbNxKYuf3Tq).
