# GEO Audit Report: Konvertalo.hu (Re-Audit)

**Audit Date:** 2026-03-22 (Previous audit: 2026-03-22 earlier)
**URL:** https://konvertalo.hu/
**Business Type:** Utility Platform (111 Free Online Conversion Tools)
**Language:** Hungarian (Romanian variant at InstrumenteOnline.ro)
**Pages in Sitemap:** 247 URLs
**Framework:** Astro SSG + Svelte Islands

---

## Executive Summary

**Overall GEO Score: 56/100 (Poor) -- UP from 50/100 (+6 points)**

Konvertalo.hu has made solid improvements, resolving several critical issues from the first audit: homepage canonical tag added, Twitter Cards implemented, hreflang completed, Person schema deployed, Organization sameAs populated, and llms.txt created. The schema score saw the biggest jump of any site in the portfolio (+16 to 78/100).

However, the site still has the lowest content E-E-A-T (62/100) due to templated tool pages without original benchmarks, and brand authority remains at rock-bottom (8/100). The missing Terms of Service page and trailing-slash canonical mismatch are the key remaining technical issues.

### Score Comparison: Before vs After

| Category | First Audit | Re-Audit | Change |
|---|---|---|---|
| AI Citability & Visibility | 55 | **69** | **+14** |
| Brand Authority | 5 | **8** | +3 |
| Content E-E-A-T | 58 | **62** | +4 |
| Technical Foundations | 82 | **74** | -8* |
| Schema & Structured Data | 62 | **78** | **+16** |
| Platform Optimization | 52 | **55** | +3 |
| **Overall GEO Score** | **50** | **56** | **+6** |

*Technical score lower due to trailing-slash mismatch now properly penalized and Terms of Service still missing.

### What Changed (Improvements Made)

| Change | Impact |
|---|---|
| Created /llms.txt | llms.txt: 0 → 70 |
| Added OAI-SearchBot to robots.txt | Now 8 AI crawlers allowed |
| Populated Organization sameAs (GitHub, LinkedIn, jmeszaros.dev) | Entity linking enabled |
| Added Person schema with credentials | E-E-A-T signal |
| Added speakable property on TechArticle | AI assistant readiness |
| Fixed homepage canonical tag | Technical fix |
| Added Twitter Card meta tags | Social sharing fixed |
| Completed hreflang (hu + ro + x-default) | Multilingual indexing |

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability & Visibility | 69/100 | 25% | 17.3 |
| Brand Authority | 8/100 | 20% | 1.6 |
| Content E-E-A-T | 62/100 | 20% | 12.4 |
| Technical Foundations | 74/100 | 15% | 11.1 |
| Schema & Structured Data | 78/100 | 10% | 7.8 |
| Platform Optimization | 55/100 | 10% | 5.5 |
| **Overall GEO Score** | | | **56/100** |

---

## Previous Issues Status

| Issue | Previous | Current |
|---|---|---|
| Homepage canonical missing | MISSING | **FIXED** |
| Twitter Cards missing | MISSING | **FIXED** |
| Hreflang incomplete | PARTIAL | **FIXED** |
| Person schema missing | MISSING | **FIXED** |
| Organization sameAs empty | EMPTY | **FIXED** (3 links) |
| llms.txt missing | 404 | **FIXED** |
| OAI-SearchBot not listed | MISSING | **FIXED** |
| Speakable missing | MISSING | **FIXED** (on TechArticle) |
| Terms of Service missing | MISSING | **STILL MISSING** |
| Trailing-slash mismatch | FLAGGED | **STILL PRESENT** |
| Original benchmarks missing | FLAGGED | **STILL MISSING** |
| Internal cross-linking sparse | FLAGGED | **STILL SPARSE** |

---

## Remaining Critical Issues

### 1. Terms of Service Page Missing
- Both `/aszf` and `/felhasznalasi-feltetelek` return 404
- EU legal requirement, trust signal gap
- **Fix:** Create ToS page covering usage terms, liability, IP, acceptable use

### 2. Trailing-Slash Canonical/Sitemap Mismatch
- Sitemap URLs use trailing slashes (`/kep/jpg-webp/`)
- Canonical tags omit them (`/kep/jpg-webp`)
- Netlify 301-redirects to trailing-slash versions
- **Fix:** Align all canonical tags to include trailing slashes

### 3. Brand Authority (8/100)
- Zero Wikipedia, Reddit, YouTube, Product Hunt, G2 presence
- No LinkedIn company page
- **Fix:** Launch on Product Hunt, AlternativeTo. Begin Reddit participation.

### 4. No Original Benchmarks in Content
- Tool pages claim "25-35% smaller files" without test data
- Experience score held at 14/25
- **Fix:** Add real conversion test results with actual file sizes

### 5. CCBot Still Blocked
- Prevents entry into Common Crawl (feeds LLaMA, Mistral, BLOOM)
- **Fix:** Consider unblocking CCBot for open-source AI visibility

---

## Platform Readiness

| Platform | Previous | Current | Change |
|---|---|---|---|
| Google AIO | 68 | **72** | +4 |
| Gemini | 48 | **55** | +7 |
| ChatGPT | 42 | **52** | +10 |
| Perplexity | 46 | **48** | +2 |
| Bing Copilot | 38 | **46** | +8 |
| **Average** | **52** | **55** | **+3** |

ChatGPT gained the most (+10) from OAI-SearchBot addition.

---

## 30-Day Action Plan

### Week 1: Critical Fixes
- [ ] Create Terms of Service page
- [ ] Fix trailing-slash canonical mismatch
- [ ] Create Wikidata entity for Konvertalo.hu
- [ ] Link llms.txt from HTML `<head>`
- [ ] Implement IndexNow + Bing Webmaster Tools
- [ ] Consider unblocking CCBot

### Week 2: Content & Authority
- [ ] Add original benchmark data to top 10 tool pages
- [ ] Add "Related Tools" cross-linking sections
- [ ] Expand About page with founder narrative
- [ ] Add visible "last updated" dates on tool pages
- [ ] Create LinkedIn company page
- [ ] Update privacy policy date to 2026

### Week 3: Platform Presence
- [ ] Launch on Product Hunt and AlternativeTo
- [ ] Begin Reddit participation (r/webdev, r/hungary)
- [ ] Create YouTube channel with tool demo videos
- [ ] Add external citations to tool pages (format specs)

### Week 4: Content Expansion
- [ ] Create first educational pillar guide article
- [ ] Add English-language versions of top 10 tools
- [ ] Diversify FAQ content per tool
- [ ] Create llms-full.txt companion file

---

## Projected Score Path

| Timeframe | Actions | Projected Score |
|---|---|---|
| Current (Mar 22) | -- | **56/100 (Poor)** |
| After Week 1 | ToS, trailing-slash, Wikidata, IndexNow | **63/100 (Fair)** |
| After Week 2 | Benchmarks, cross-linking, LinkedIn | **68/100 (Fair)** |
| After Week 3 | Product Hunt, Reddit, YouTube | **73/100 (Fair-Good)** |
| After Week 4 | English content, guides, llms-full.txt | **76/100 (Good)** |
| 3-6 months | Community, Wikipedia, reviews | **82-85/100 (Good)** |

---

## Final Portfolio Rankings (All 4 Sites, All Re-Audited)

| Rank | Site | Baseline | Re-Audit | Gain | Best Dimension | Worst Dimension |
|---|---|---|---|---|---|---|
| 1 | **MatekMegoldasok** | 55 | **63** | +8 | Technical (90) | Brand (8) |
| 2 | **CutOptim** | 56 | **63** | +7 | Technical (82) | Brand (22) |
| 3 | **Konvertalo** | 50 | **56** | +6 | Schema (78) | Brand (8) |
| 4 | **SEOTudas** | 46 | **54** | +8 | Content (75) | Crawler (25) |

### Universal Findings Across All 4 Sites

1. **Same improvement playbook works everywhere:** llms.txt + robots.txt + Person schema + sameAs = +6 to +8 points consistently
2. **Brand authority is the universal bottleneck:** Scores range 5-22/100 across all sites. This is the #1 lever for the next phase.
3. **Technical foundations are strong across the board:** 74-90/100. No site has a technical problem.
4. **Content quality is good but underutilized:** 62-75/100. Excellent content exists but lacks external validation.
5. **The path to "Good" (75+) requires external presence:** No amount of on-site optimization alone can cross the threshold — brand authority building is mandatory.

---

*Report generated by GEO Audit Tool | 2026-03-22*
*Methodology: 6-category weighted scoring with 3 parallel analysis agents*
*Comparison baseline: Initial audit 2026-03-22*
