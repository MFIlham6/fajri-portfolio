**The top-scoring product pair appears in only 146 of 3,000 baskets, so I did not propose it as a bundle**

A beauty e-commerce business with fifteen products is preparing a seasonal bundle campaign worth Rp 80 million. Of 105 possible product pairs, three qualified as bundle candidates.

Mochamad Fajri Ilham Nurdin, completed October 2026 with SQL on ClickHouse, queries and check files: Google Drive folder, mfajriilhamn@gmail.com

Data note: the figures on this page come from a practice dataset designed to mimic beauty e-commerce transaction patterns. It is not real company data and it is not presented as work experience at any company.

## Summary

Each bundle in this campaign takes the same share of the budget, for visuals, home-page placement, and the discount, whether the bundle sells or not. So only a few bundles can run. An analysis of 3,000 shopping baskets found three pairs that pass three conditions at once. Each appears in 1,231 to 1,395 baskets and occurs together 1.41 to 1.68 times more often than expected if the two products were unrelated. Their six products are the six best sellers, so most of their buyers already buy both without a bundle. I rejected the pair with the highest score, 13.46 times chance, because it appears in only 146 baskets. The recommendation: run the three bundles as a test with a comparison group, and move the rejected pair to automatic recommendations on the product page.

## Why this report exists

The merchandising team asked for a short list of product pairs to bundle, with reasons they can defend in front of their manager. There are two quick methods whose results look reasonable. The first pairs best-selling products without checking whether they're actually bought together. The two best sellers in this data, Daily Moisturizer and Eye Cream, appear together in 1,066 baskets, but that is exactly what their individual popularity predicts (0.99 times). The second ranks pairs by strength of association and takes the top, and that puts the pair with the thinnest evidence, 146 baskets, in first place. Pairs that avoid both traps still carry a third problem: if they're already often bought together, the bundle discount mostly lands on purchases that would have happened anyway.

## Data

One order-item table: 18,815 rows, seven columns, 3,000 orders from January 2025 to March 2026, and 15 products in three categories (face care, lips, and eyes). The table holds no campaign results, margins, or reasons for buying. So this page contains no sales projections at all.

## What was done

Three decisions determine the result. I wrote each down with one option I rejected.

A basket is the set of unique products per order. Its items pass four cleaning rules; 1,556 rows (8.3%) were dropped: 835 exact duplicates, 374 without a product code, 200 returns, and 147 free samples.

Rejected: baskets built from rows as they are. Pairs are formed by joining the table to itself, and there duplicate rows multiply the count. In the raw table the number of pair rows is 14.2% higher, and the increase isn't even across pairs.

Three measures are calculated side by side. How often the two products appear together, how often the second product comes along when the first is bought, and how many times more often they appear together than chance.

Rejected: ranking by one measure and taking the top ten. By times-chance or by the chance of being bought along, the 146-basket pair comes first. By basket count, the top three match these three bundles, but fourth and fifth place go to two pairs that are no more frequent than chance.

The filter uses three conditions at once. More frequent than chance, present in at least 200 baskets, and a gap too large to be explained by chance. I tested the 200 threshold by moving it from 0 to 1,500 baskets.

Rejected: a threshold used without testing. Here the same three bundles come out for any threshold from 147 to 1,231 baskets.

The tool is SQL on ClickHouse. Every figure on this page comes from one recorded query that can be rerun.

## Figure

**Figure 1. Times-chance co-occurrence and basket count, 105 product pairs**

![gambar 1](images/gambar-1.png)

What it shows. All 105 product pairs. Horizontal: number of baskets containing both products. Vertical: how many times more often they appear together than chance. Dashed line at 1.00 (equal to chance), dotted line at the 200-basket threshold.

Data range. 3,000 baskets from 17,259 clean items, orders January 2025 to March 2026.

What to notice. One black dot alone at the top left, at 146 baskets and 13.46 times. Three red dots on the right, at 1,231 to 1,395 baskets and 1.41 to 1.68 times. The other 101 gray dots cling to the 1.00 line.

## Findings

1. Three pairs appear together more often than their products' popularity can explain, but most of their buyers already buy both. Each appears in 1,231 to 1,395 of 3,000 baskets (41.0% to 46.5%) and occurs together 1.41 to 1.68 times more often than chance, with a gap of 15.6 to 21.1 standard deviations. One of them crosses categories, from face care to eye care. Their six products are the six best sellers out of 15. For every basket holding only one of the products, there are already 2.1 to 2.4 baskets holding both.
2. The pair with the highest score is not worth a campaign. It occurs together 13.46 times more often than chance, eight times the next best pair, and more than nine in ten buyers of its first product also take the second. The link is real: its gap is 41 standard deviations from chance. The problem is reach, only 146 of 3,000 baskets (4.9%). With a fixed cost per bundle, this pair pays the full cost for 146 baskets, while each of the other bundles reaches 1,231 to 1,395.
3. Almost half the pairs look associated, but most can't be told apart from chance. 47 of 105 pairs appear together more often than chance. That is about half, a number that would appear even with no association at all. Only 4 of the 47 have a gap too large for chance.
4. The result is the same over the last six months. With 1,218 baskets and the threshold lowered proportionally to 81, the same three bundles qualify in the same order, and the rejected pair is still rejected with 56 baskets.

## What changed in the decision

The pair that is most convincing by times-chance, Eye Primer + Eyeliner Pen, leaves the bundle list and goes to automatic recommendations on the product page, which cost almost nothing per pair. The three bundles are proposed as a test rather than shown to every buyer at once: some buyers see the bundle, some don't, and the pair's sales in the two groups are compared. Because most buyers already buy both products, only the gap between the two groups shows whether the discount produces extra sales.

This proposal is revisited if the test shows the pair's sales are the same in both groups, or if new order data pushes one of the bundles close to 1.00 times.

## Limits and trace

- The data holds no promotion experiments at all, so extra sales from bundles can't be estimated from it. That's why the recommendation takes the form of a test.
- Dropping returns and free samples is a definition decision. I reran without those two rules, and the same three bundles still qualify.
- Margins and discount costs aren't in the data. Whether a bundle is profitable after the discount is outside the scope of this analysis.
- Pair patterns during Ramadan 2025 and 2026 weren't checked separately. Orders per quarter were 551 to 625 with no surge in the first quarter, but that doesn't show whether the pairs changed during Ramadan. The query to check it is in the decision log.

| Figure | Where it comes from |
|---|---|
| 17,259 items, 3,000 orders | Four cleaning stages over 18,815 raw rows; the count at each stage is recorded in the decision log |
| 105 pairs | All combinations of two of the 15 products; every pair appears together at least once |
| 1,231 to 1,395 | Number of baskets containing both products, per bundle |
| 1.41 to 1.68 times | Co-occurrence divided by what each product's popularity predicts |
| 2.1 to 2.4 | Baskets with both products divided by baskets with only one, per bundle (1,231 / 507, 1,333 / 630, 1,395 / 672); the six products are the six best sellers out of 15 |
| 146 baskets, 13.46 times | The rejected pair; its two products are the least bought of the 15, so its times-chance figure jumps easily |
| 47 of 105; 4 of 47 | Pairs above chance; those whose gap exceeds 1.96 standard deviations |
| 1,218 baskets | Orders since 1 October 2025, cleaned with the same four rules before baskets were formed |

The full query, decision log, one-page memo, and evidence appendix are available in the folder linked at the top.
