**The meeting chart said the warehouse fills in April 2027, but that date is still a guess**

Presenting data for a decision to build a warehouse, cold-storage company, one-page Power BI dashboard, monthly data January 2024 to June 2027

Mochamad Fajri Ilham Nurdin, completed November 2026, mfajriilhamn@gmail.com

The data is simulated and the company name is fictional. This is a practice case study, not work experience.

## Summary

A cold-storage company is almost out of space and is weighing a new warehouse costing Rp 48 billion. At the meeting, the committee saw a chart showing the warehouse full in April 2027. The recorded data only runs to June 2026; the rest is a guess, and there are three versions of that guess. I redrew the chart without changing a single figure, so it shows what has already happened and what is still a guess. The answer "April 2027" became "between February 2027 and not full at all, depending on how fast orders rise".

## Why this report exists

SejukNusantara rents cold storage space to distributors of meat, dairy, and frozen vegetables. Its four warehouses can hold 6,400 tons a day. In June 2026, orders were already 5,921.1 tons a day, or 92.5% of capacity.

A new warehouse takes 14 months to be ready. If the warehouse fills in 10 months, construction is already 4 months late, so the meeting feels urgent. In a mood like that, asking about the basis of the chart sounds like slowing things down. The committee chair didn't ask me to decide whether to build. They asked for one screen that makes the committee understand what they are betting on.

**Figure 1. The chart brought to the meeting**

![gambar 1](images/gambar-1.png)

*Orders and warehouse capacity per month, tons per day, January 2024 to June 2027. Note June 2026: there is no sign that the real data stops there.*

Some terms used in this report:

| Term | What it means in this case |
|---|---|
| Actual | Orders already recorded, January 2024 to June 2026 |
| Projection | A guess at future orders, July 2026 to June 2027, calculated from a given growth rate |
| Scenario | One version of the guess. There are three: slow (up 0.8% a month), medium (2.1%), and fast (3.8%) |
| Planned capacity | Extra racks not yet installed. If they go ahead, capacity rises to 6,800 from October 2026 |
| Board target | The figure the directors want for June 2027 (9,600), not calculated from data |

## Data

One file with 42 rows, one row per month. January 2024 to June 2026 holds real orders. July 2026 to June 2027 holds three guess columns from the planning team and one board-target column. The file also keeps the forecast made a year earlier for July 2025 to June 2026, which can now be checked against what happened. The data is already clean. I didn't change, add, or remove a single value, and I didn't make a guess of my own.

## What I did

There are three decisions about how to draw, and each has an alternative I rejected.

- **A boundary line at June 2026, guess lines dashed.** Dashed lines alone aren't enough: the pattern disappears when the chart is shrunk to a screenshot, and readers don't know the boundary date. A different color alone isn't enough either, because it disappears in black-and-white print. Two markers together stay readable in both cases.
- **All three guesses are shown together.** The meeting chart only used the medium version. With one version, the committee doesn't know there is a version where the warehouse never fills. I still kept the three lines distinct: the medium version thick dashed, the other two thin lines.
- **Existing capacity is separated from planned capacity.** In the meeting chart, the capacity line is solid to the end, even though 6,800 from October 2026 depends on racks that aren't installed yet. I drew the board target as a single mark at June 2027 so it isn't read as a fourth guess.

While checking the figures, I found one thing that wasn't on the meeting chart: if the extra racks are cancelled, even the slow version fills the warehouse in June 2027. I put that result in the dashboard as a table.

## Findings

**Figure 2. The same chart after redrawing**

![gambar 2](images/gambar-2.png)

*The dashboard's main panel. Solid blue line: real orders up to June 2026. Thick dashed blue line and two thin blue lines: the three versions of the guess. Black line: capacity, dashed for what is still planned. Red dots: the month the warehouse fills. Note the lowest thin line at the far right.*

- **The date it fills depends on which guess is used.** The fast version fills in February 2027, 8 months after the last data point. The medium version fills in April 2027, 10 months after. The slow version isn't full by June 2027. The first two dates are closer than the 14 months it takes to build a warehouse.

**Figure 3. Last year's forecast compared with what happened**

![gambar 3](images/gambar-3.png)

*Dashed line: the forecast made in June 2025. Blue line: orders that happened, July 2025 to June 2026. Note the gap between the two lines throughout the year.*

- **A forecast like this has missed by a wide margin before.** Last year's forecast was too high by 17.1% on average (forecast bias), by as much as 23.6% in April 2026. That is larger than the gap between the medium and slow versions in April 2027 (13.7%), so missing by as much as last year is enough on its own to move the answer from one version to another.

**Figure 4. The month the warehouse fills, with and without the extra racks**

![gambar 4](images/gambar-4.png)

*Table from the dashboard. Note the Slow 0.8% row.*

- **The "not full" answer depends on the extra racks.** Without them capacity stays at 6,400, and even the slow version fills in June 2027. With the racks, the slow version's remaining space in June 2027 is only 284.8 tons a day (4.2% of capacity). The meeting chart shows two lines meeting that both haven't happened yet: guessed orders and planned capacity.
- **Almost a third of the chart is a guess.** 12 of the 42 months in the chart haven't happened yet. The board target for June 2027 (9,600 tons a day) is even higher than the fastest guess (9,263.5).

## What changed in the decision

The meeting chart only offered two choices: sign or postpone. The new chart shows two more things. A warehouse decided now is only ready after June 2027, so in the medium and fast versions the old warehouse still fills before the new one is built. Up to June 2027, that means 3 months of emergency warehouse rental (Rp 5.7 billion) in the medium version and 5 months (Rp 9.5 billion) in the fast version. The new chart also opens a third choice: start work that is cheap to cancel, such as permits and site selection, while waiting three more months of data to see which version is happening. The decision stays with the committee.

## Evidence: dashboard and five checks

**Figure 5. One-page Power BI dashboard**

![gambar 5](images/gambar-5.png)

*Top band: the answer for the committee, the month the warehouse fills in each version (Feb 2027 / Apr 2027 / no), the months left before it fills, and the number of guessed months. Note the label at the right end of each line: it says whether the line is real, a guess, or a plan.*

Before the dashboard was considered done, I ran five checks. The meeting chart failed all five.

| Check | What I found | What I changed |
|---|---|---|
| Does each line state its status (real, guess, plan, target)? | The meeting chart states no status at all | Each line is labeled at its end |
| Are all three guess versions visible? | The meeting chart only used the medium version | All three are shown, with their rates in the label |
| Is it visible which lines go past June 2026? | 4 of 6 lines go past June 2026; planned capacity is drawn solid | Planned capacity made dashed |
| Is the full date written together with its distance? | The meeting chart only says April 2027 | A distance card writes 8 to 10 months next to the 14-month build time |
| Does the target look different from a guess? | In the file, the target is a rising line similar to the fast version | The target became a single mark at June 2027 |

## Limits

This report doesn't answer which guess is most likely to happen. All three were built by the planning team from the same data, and judging them needs a forecasting analysis I didn't do here. The gap between the slow and fast versions isn't a statistical range either; it's only the distance between two rates someone chose. The emergency rental calculation stops at June 2027 because the data stops there. I have only tested this dashboard myself so far, not with someone who knows the business but hasn't seen the data.

## Trace

Every figure is calculated from the file permintaan_gudang.csv by a script that reads it directly; no figure was typed from an image. The data file, script, Power BI dashboard, design decision log, validation notes, and memo are in the project folder on Google Drive.
