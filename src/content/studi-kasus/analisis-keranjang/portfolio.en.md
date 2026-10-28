# Seasonal Bundles for a Beauty E-commerce: The Top-Scoring Pair Appears in Only 146 of 3,000 Baskets

A shopping-basket analysis case study at a beauty e-commerce business with fifteen products in three categories. Tool: SQL. Scope: 3,000 baskets from 17,259 clean items, 18,815 raw rows.

Mochamad Fajri Ilham Nurdin, completed October 2026. Full queries and check files: https://drive.google.com/drive/folders/1f3TngZSC0yYUtq99YapCx0EVR-mSsTjG. Email: mfajriilhamn@gmail.com.

Data note: the figures below come from a practice dataset designed to mimic beauty e-commerce transaction patterns. It is not real company data, and it is not presented as work experience at any company.

## 1. Summary

A Rp 80 million seasonal bundle campaign can only run a few bundles, because each bundle takes the same share of the budget whether it sells or not. An analysis of 3,000 shopping baskets found three pairs that pass three conditions at once. Each appears in 1,231 to 1,395 baskets and shows up together 1.41 to 1.68 times as often as expected if the two products were unrelated. I rejected the pair with the highest score, 13.46 times what chance would give, because it appears in only 146 baskets. The recommendation: run the three bundles as a **test with a comparison group**, and move the rejected pair to automatic recommendations on the product page.

## 2. Why this report exists

The merchandising team asked for a short list of product pairs to bundle, with reasons they could defend in front of their managers. Two shortcuts were available, and both produce a list that looks reasonable. Pairing the two best sellers gives a discount to people who already buy both. Ranking pairs by a single measure of association and taking the top ones puts the pair with the thinnest evidence in first place.

## 3. Data

One order-item table: 18,815 rows, seven columns, 3,000 orders from January 2025 to March 2026, and 15 products in three categories (face care, lips, and eyes). The table holds no campaign results, margins, or reasons people bought, so this report contains no sales projection.

## 4. What I did

The work followed six steps: situation, the right question, data sufficiency, analysis, rebuttal, then recommendation with its limits. I wrote down three decisions before the first analysis query, each with one rejected alternative.

- A basket is the set of unique products per order, from items that pass four cleaning rules: 1,556 rows (8.3%) were removed, made up of 835 exact duplicates, 374 without a product code, 200 returns, and 147 free samples. Rejected: baskets from the rows as they are. Pairs are formed by joining the table to itself, and there duplicate rows multiply the counts. In the raw table the number of pair rows is 14.2% higher, and the increase is uneven.
- Three measures are calculated side by side: how often both products appear together, how often the second product comes along when the first is bought, and how many times more often they appear together than chance would give. Rejected: ranking by one measure and taking the top ten, which on this data puts the 146-basket pair in first place.
- The filter uses three conditions at once: more often than chance, present in at least 200 baskets, and a gap too large to be chance. Rejected: a threshold used without testing. The same three bundles come out for any threshold from 147 to 1,231 baskets.

## 5. Figures

![Spread of 105 product pairs: multiple of chance against number of baskets](images/gambar-1.svg)

What it shows: all 105 product pairs. Horizontal: number of baskets containing both products. Vertical: how many times more often they appear together than chance, on a log scale. Dashed line at 1.00 (equal to chance), dotted line at the 200-basket threshold. Data range: 3,000 baskets from 17,259 clean items, orders from January 2025 to March 2026. What to see: one black circle alone at the top left, at 146 baskets and 13.46 times; three red dots on the right, at 1,231 to 1,395 baskets and 1.41 to 1.68 times; the other 101 grey dots sit close to the 1.00 line.

## 6. Findings

1. **Three pairs appear together far more often than the products' popularity can explain.** Each is in 1,231 to 1,395 of 3,000 baskets (41.0% to 46.5%) and appears together 1.41 to 1.68 times as often as chance. One of them crosses categories, from face care to eye care.
2. **The pair with the highest score isn't worth a campaign.** It appears together 13.46 times as often as chance, eight times the next best pair, and the association is real: the gap is 41 standard deviations from chance. The problem is reach, only 146 of 3,000 baskets (4.9%). With a fixed cost per bundle, this pair pays the full cost for about a tenth of the other bundles' reach.
3. **Almost half the pairs look associated when they aren't.** 47 of 105 pairs appear together more often than chance, a number you would expect even with no association at all. Only 4 of the 47 have a gap too large to be chance.
4. **The result holds when the period is shortened.** In the last six months (1,218 baskets, threshold lowered proportionally to 81) the same three bundles pass in the same order, and the rejected pair is still rejected with 56 baskets.

## 7. What changed in the decision

The bundle list that would have been picked from a single-measure ranking is now filtered by three conditions, and the pair that would have taken first place is removed. Three bundles are proposed as a test: some shoppers see the bundle, some don't, then pair sales in both groups are compared. The rejected pair is routed to automatic recommendations on the product page, which cost almost nothing per pair. The proposal is reviewed if the test shows sales are the same in both groups, or if new data pushes one of the bundles close to 1.00 times.

## 8. Limits and audit trail

- The data contains no promotion experiments at all, so extra sales from the bundles can't be estimated from it. That's why the recommendation takes the form of a test.
- Removing returns and free samples is a definition decision. I re-ran it without both rules, and the same three bundles still pass.
- Margins and discount costs are not in the data.

| Figure | Where it comes from |
|---|---|
| 17,259 items, 3,000 orders | Four cleaning stages on 18,815 raw rows |
| 105 pairs | Every combination of two of the 15 products; each pair appears together at least once |
| 1,231 to 1,395 | Number of baskets containing both products, per bundle |
| 1.41 to 1.68 times | Co-occurrence divided by what each product's popularity would predict |
| 146 baskets, 13.46 times | The rejected pair; its two products are the least bought of the 15 |
| 47 of 105; 4 of 47 | Pairs above chance; those with a gap of more than 1.96 standard deviations |
| 1,218 baskets | Orders since 1 October 2025, cleaned with the same rules |
