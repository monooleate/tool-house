# GSC → BigQuery analytics pipeline — konvertalo.hu + instrumenteonline.ro

This repo serves **two** GSC properties. GSC bulk export → BigQuery turns Search Console data into
keyword / title / content decisions. Master methodology (shared): `monooleate/opticut` →
`internal-docs/seo/GSC-BIGQUERY-PIPELINE.md`.

## Connection

| Property | Raw table | Snapshot table |
|---|---|---|
| konvertalo.hu (PDF/image converter) | `grabit-495706.searchconsole_konvertalo_hu.searchdata_url_impression` | `…searchconsole_konvertalo_hu.weekly_report` |
| instrumenteonline.ro (RO calculators) | `grabit-495706.searchconsole_konvertalo_ro.searchdata_url_impression` | `…searchconsole_konvertalo_ro.weekly_report` |

Project (data + billing) `grabit-495706`, Region **EU**. Data from 2026-08-10 (**no backfill**);
`weekly_report` tables created + seeded 2026-08-17.

## Site config

- **Dimension** = first URL path segment = category (`/pdf/`, `/kep/` for konvertalo.hu;
  `/calculator/`, `/geometrie/`, `/conversii/` for instrumenteonline.ro). Each site is single-language.
- **Brand exclusion**: none.

## Method

- Position = `SUM(sum_position)/SUM(impressions) + 1` (column `sum_position`, 0-indexed → `+1`).
- Impression-weighted; anonymized (`query = NULL`) excluded from query-level reports; always filter
  `data_date` (partitioned).

## Reports (`weekly_report.report`)

`R1_category` (per-category scorecard) · `R2_bucket` (known vs anonymized) · `R3_striking` (pos 8–20,
keyword/title wins) · `R4_ctr_outlier` (ranks well, low CTR → title/meta).

## Weekly scheduled queries

Create **one scheduled query per property**. Console → Scheduled queries → Create → paste the SELECT →
Destination = that property's `weekly_report`, **Append**, Region **EU**, **Weekly**. The two queries
are identical except the dataset name.

### konvertalo.hu — dataset `searchconsole_konvertalo_hu`
### instrumenteonline.ro — dataset `searchconsole_konvertalo_ro`

```sql
-- Replace <DATASET> with searchconsole_konvertalo_hu OR searchconsole_konvertalo_ro
WITH base AS (
  SELECT REGEXP_EXTRACT(url, r'https?://[^/]+/([^/]+)') AS category,
    REGEXP_REPLACE(url,r'#.*$','') AS page,
    query, is_anonymized_query, impressions, clicks, sum_position
  FROM `grabit-495706.<DATASET>.searchdata_url_impression`
  WHERE data_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
)
SELECT CURRENT_DATE() AS run_date, 'R1_category' AS report, category AS dim1, CAST(NULL AS STRING) AS dim2,
  SUM(impressions) AS impr, SUM(clicks) AS clicks,
  ROUND(SAFE_DIVIDE(SUM(clicks),SUM(impressions))*100,2) AS ctr_pct,
  ROUND(SUM(sum_position)/SUM(impressions)+1,1) AS pos
FROM base GROUP BY category
UNION ALL
SELECT CURRENT_DATE(),'R2_bucket',IF(is_anonymized_query,'anonymized','known'),CAST(NULL AS STRING),
  SUM(impressions),SUM(clicks),ROUND(SAFE_DIVIDE(SUM(clicks),SUM(impressions))*100,2),ROUND(SUM(sum_position)/SUM(impressions)+1,1)
FROM base GROUP BY 3
UNION ALL
SELECT CURRENT_DATE(),'R3_striking',category,query,
  SUM(impressions),SUM(clicks),ROUND(SAFE_DIVIDE(SUM(clicks),SUM(impressions))*100,2),ROUND(SUM(sum_position)/SUM(impressions)+1,1)
FROM base WHERE is_anonymized_query=FALSE GROUP BY category,query
HAVING SUM(impressions)>=10 AND SUM(sum_position)/SUM(impressions)+1 BETWEEN 8 AND 20.5
UNION ALL
SELECT CURRENT_DATE(),'R4_ctr_outlier',page,CAST(NULL AS STRING),
  SUM(impressions),SUM(clicks),ROUND(SAFE_DIVIDE(SUM(clicks),SUM(impressions))*100,2),ROUND(SUM(sum_position)/SUM(impressions)+1,1)
FROM base GROUP BY page
HAVING SUM(impressions)>=30 AND SUM(sum_position)/SUM(impressions)+1<=8;
```

## From data to change

- **R4** → title/description rewrite, keyword verbatim at the front, ≤60 chars.
- **R3** → add the missing word — but ONLY after reading the target page's real title/keywords. Word
  already present + poor position = competition, **not** a missing word → don't churn the page.
- Never invent a keyword or number; measure the page source first.
