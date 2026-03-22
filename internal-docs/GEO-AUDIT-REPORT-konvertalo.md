# GEO Audit Report: Konvertalo.hu

**Audit Date:** 2026-03-22
**URL:** https://konvertalo.hu/
**Business Type:** Utility Platform (Free Online Conversion Tools)
**Language:** Hungarian (Romanian variant at InstrumenteOnline.ro)
**Pages in Sitemap:** 152-198 URLs
**Framework:** Astro SSG + Svelte Islands
**Founder:** Meszaros Janos

---

## Executive Summary

**Overall GEO Score: 50/100 (Poor)**

Konvertalo.hu is a well-engineered privacy-first utility platform with 111 free online tools, strong technical foundations (82/100), and the best schema implementation (62/100) among all sites in this audit series. The Astro SSG architecture delivers perfect static HTML, all AI crawlers are proactively allowed, and the structured data stack (9 schema types, 23 blocks across pages) is genuinely impressive.

However, the site is severely limited by **near-zero brand authority** (5/100), **templated content with minimal experience signals** (58/100 E-E-A-T), and a **Hungarian-only** content strategy that excludes it from the vast majority of AI training corpora. The site exists entirely within its own domain -- no LinkedIn, no YouTube, no GitHub, no Reddit, no Product Hunt, no Wikipedia presence whatsoever.

**Biggest strengths:** Astro SSG (100% static HTML), comprehensive schema stack (9 types), proactive AI crawler access, 111 tools across 10 categories, privacy-first architecture, Romanian language variant.

**Most critical gaps:** Zero external brand presence, no llms.txt, templated/thin tool content without original benchmarks, Hungarian-only content, Organization sameAs effectively empty, no Person schema for founder.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability & Visibility | 55/100 | 25% | 13.8 |
| Brand Authority | 5/100 | 20% | 1.0 |
| Content E-E-A-T | 58/100 | 20% | 11.6 |
| Technical Foundations | 82/100 | 15% | 12.3 |
| Schema & Structured Data | 62/100 | 10% | 6.2 |
| Platform Optimization | 52/100 | 10% | 5.2 |
| **Overall GEO Score** | | | **50/100** |

### Sub-Score Details

| Component | Score | Notes |
|---|---|---|
| AI Citability (passage quality) | 62/100 | FAQ sections citable; "111 tools, 0 server uploads" stat block scored 83 |
| AI Crawler Access | 80/100 | 7 AI crawlers allowed; CCBot blocked, OAI-SearchBot not listed |
| llms.txt | 0/100 | File does not exist |
| Brand Mentions | 5/100 | Zero presence on any external platform |
| Platform: Google AIO | 68/100 | Best platform; FAQ/HowTo schema, question headings |
| Platform: ChatGPT | 42/100 | No entity recognition; OAI-SearchBot not explicit |
| Platform: Perplexity | 46/100 | Zero community validation |
| Platform: Gemini | 48/100 | No Google ecosystem (YouTube, GBP) |
| Platform: Bing Copilot | 38/100 | No IndexNow, no Bing Webmaster Tools |
| E-E-A-T: Experience | 8/25 | No original data, benchmarks, or case studies |
| E-E-A-T: Expertise | 14/25 | Full-stack developer; moderate technical depth |
| E-E-A-T: Authoritativeness | 10/25 | 2-month-old domain; no external recognition |
| E-E-A-T: Trustworthiness | 20/25 | Strong privacy, GDPR, transparent processing |
| Technical: SSR/SSG | 95/100 | Astro SSG -- perfect static HTML delivery |
| Technical: Security | 97/100 | HSTS preload, comprehensive CSP, all headers |
| Technical: Crawlability | 82/100 | Good robots.txt; sitemap URL count discrepancy |
| Schema Completeness | 62/100 | 9 types, 23 blocks; sameAs empty, no Person, no speakable |

---

## Critical Issues (Fix Immediately)

### 1. Zero External Brand Presence
- **Impact:** AI models have no external pathway to discover or validate the site. Brand Mentions score: 5/100.
- **Platforms checked:** Wikipedia (absent), Reddit (zero), YouTube (no channel), LinkedIn (no page, 404), GitHub (no org), Product Hunt (absent), G2/Capterra (absent), Trustpilot (absent).
- **Fix:** Create profiles on LinkedIn, GitHub, YouTube. Launch on Product Hunt and AlternativeTo. Begin organic Reddit participation in r/webdev and r/hungary. This is the #1 priority across the entire audit.

### 2. No llms.txt File
- **URL:** Both `/llms.txt` and `/.well-known/llms.txt` return 404
- **Impact:** AI crawlers visiting the site have no structured guide to 111 tools.
- **Fix:** Deploy llms.txt with categories and top tools. Template in Appendix A.

### 3. Organization sameAs Effectively Empty
- **Current:** Only entry is founder's personal site URL (semantically incorrect -- not a platform profile)
- **Impact:** AI models cannot cross-reference "Konvertalo.hu" as an entity.
- **Fix:** Create platform profiles, then populate sameAs with LinkedIn, YouTube, GitHub, Product Hunt URLs.

### 4. No Person Schema for Founder
- **Impact:** Meszaros Janos exists only as inline text. No jobTitle, sameAs, knowsAbout. All TechArticle author fields point to Organization instead of Person.
- **Fix:** Create standalone Person schema. Switch TechArticle author to Person @id reference.

### 5. Missing Homepage Canonical Tag
- **Impact:** Homepage has no self-referencing canonical. Risk of duplicate content issues.
- **Fix:** Add `<link rel="canonical" href="https://konvertalo.hu/">`.

---

## High Priority Issues

### 6. Add Original Benchmarks to Tool Pages
- **Impact:** Experience score is 8/25. Content claims "25-35% smaller files" without any test data.
- **Fix:** Add real conversion test results to each tool page: actual file sizes before/after, conversion times, quality comparison screenshots.

### 7. Build Internal Cross-Linking Between Tools
- **Impact:** Tool pages have only breadcrumb links. No "Related Tools" sections.
- **Fix:** Add 3-5 related tool links per page (e.g., JPG-to-WebP links to PNG-to-WebP, image compression, AVIF converter).

### 8. Fix Sitemap Trailing-Slash Mismatch
- **Impact:** Sitemap lists URLs without trailing slashes but server 301-redirects to trailing-slash versions. Every crawl creates an unnecessary redirect.
- **Fix:** Update sitemap URLs to match canonical trailing-slash format.

### 9. Add OAI-SearchBot to robots.txt
- **Impact:** ChatGPT's dedicated search crawler not explicitly listed.
- **Fix:** Add `User-agent: OAI-SearchBot` / `Allow: /`. 2-minute fix.

### 10. Complete hreflang Implementation
- **Current:** Only homepage has partial hreflang (Romanian alternate, no Hungarian self-reference). Inner pages lack hreflang entirely.
- **Fix:** Every page needs both `hreflang="hu"` (self) and `hreflang="ro"` (Romanian equivalent at InstrumenteOnline.ro).

### 11. Register with Bing Webmaster Tools + IndexNow
- **Impact:** Bing Copilot score is 38/100 (weakest platform).
- **Fix:** Register, add msvalidate.01, implement IndexNow.

### 12. Add Twitter Card Meta Tags
- **Impact:** Missing on all pages. Affects X/Twitter sharing and some AI systems.
- **Fix:** Add twitter:card, twitter:title, twitter:description, twitter:image site-wide.

---

## Medium Priority Issues

### 13. Create Educational Pillar Content
- No blog or guide articles exist. Create 5-10 in-depth guides (1,500-3,000 words): "Guide to Web Image Formats," "PDF Structure Explained," "CSV vs JSON vs XML Compared."

### 14. Add speakable Property to Schemas
- Direct AI assistant readability signal, absent on all pages.

### 15. Expand Thin Tool Categories
- SEO (1 of 8 planned tools), Markdown (1 tool), HTML (2 tools) are underdeveloped.

### 16. Diversify FAQ Content
- Currently templated with identical questions across tools. Each page needs 3-4 unique, tool-specific FAQs.

### 17. Add English-Language Content
- Hungarian-only severely limits AI model citability. English meta descriptions and top-20 tool landing pages would dramatically increase visibility.

### 18. Add External Citations to Tool Pages
- Link to authoritative sources: WebP spec at web.dev, JPEG standard, RFC 4180 for CSV, ECMA-404 for JSON.

### 19. Add Terms of Service Page
- Currently missing. Basic trust signal for a utility platform.

### 20. Remove Deprecated HowTo Schema
- Google removed HowTo rich results in Sep 2023. Present on all tool pages, adding ~55KB of unnecessary page weight across 111 pages.

### 21. Standardize SoftwareApplication Schema
- Inconsistent dateModified, image, and screenshot across tool pages.

### 22. Add Physical Address or Business Registration
- Contact page has only email/form. Adding city/country or business registration number improves trust.

---

## Low Priority Issues

### 23. Add font-display: swap to font declarations (CLS risk)
### 24. Add resource preconnect hints for Google Fonts
### 25. Add image width/height attributes and srcset
### 26. Reconcile sitemap URL count (152 vs 198 expected)
### 27. Add explicit meta robots tags
### 28. Add noscript fallback for interactive tool components
### 29. Consider unblocking CCBot (feeds Common Crawl, largest open AI training dataset)

---

## Category Deep Dives

### AI Citability & Visibility (55/100)

**Citability: 62/100** -- FAQ sections and statistics blocks are the strongest citable elements.

| Content Block | Score | Notes |
|---|---|---|
| About page statistics ("111 tools, 0 uploads") | 83 | Most citable single element |
| JPG-to-WebP FAQ answers | 74 | Specific format details quotable |
| PDF merge how-to steps | 68 | Clear procedural content |
| CSV-to-JSON delimiter detection | 65 | Technical specificity |
| Generic tool descriptions | 45 | Templated, not differentiated |

**Crawler Access: 80/100** -- 7 AI crawlers allowed, CCBot blocked, OAI-SearchBot not listed.

**llms.txt: 0/100** -- Does not exist.

**Brand Authority: 5/100** -- Zero external presence anywhere.

---

### Brand Authority (5/100)

| Platform | Status |
|---|---|
| Wikipedia | Absent |
| Reddit | Zero mentions |
| YouTube | No channel |
| LinkedIn | No company page (404) |
| GitHub | No organization |
| Product Hunt | Absent |
| G2/Capterra | Absent |
| Trustpilot | Absent |
| Social media | Zero profiles |

This is the single biggest factor suppressing the GEO score. The site has 111 tools but zero external footprint.

---

### Content E-E-A-T (58/100)

| Dimension | Score | Key Finding |
|---|---|---|
| Experience | 8/25 | No original benchmarks, no case studies, no before/after data |
| Expertise | 14/25 | Full-stack developer, correct terminology, moderate depth |
| Authoritativeness | 10/25 | 2-month-old domain, zero external recognition |
| Trustworthiness | 20/25 | GDPR, privacy policy, transparent client-side processing |

**AI Content Assessment:** Likely human-edited template/AI-generated content. Rigid template structure, formulaic FAQ answers, repeated privacy messaging, no unique editorial voice.

**Content Freshness:** Current (0-5 months old). Some tool dates predate stated founding (content prepared before launch).

---

### Technical Foundations (82/100)

| Area | Score | Key Finding |
|---|---|---|
| SSR/SSG | 95 | Astro SSG + Svelte islands -- excellent |
| Security | 97 | HSTS preload, comprehensive CSP, all headers |
| Crawlability | 82 | Good robots.txt, sitemap has trailing-slash mismatch |
| Meta Tags | 62 | Missing homepage canonical, no Twitter Cards, incomplete hreflang |
| URL Structure | 82 | Clean Hungarian slugs, trailing-slash redirect issue |
| Mobile | 85 | Responsive, dark mode, PWA-like features |
| CWV Risk | 70 | Missing image dimensions, no font-display, no preloads |

---

### Schema & Structured Data (62/100)

**Found (9 types):** WebSite+SearchAction, Organization, ItemList (111 tools), SoftwareApplication, WebApplication, FAQPage, HowTo, TechArticle, BreadcrumbList

**Best in class:** ItemList cataloging all 111 tools is excellent for AI discovery. Per-tool SoftwareApplication with aggregateRating is rich-result eligible. BreadcrumbList on all inner pages.

**Critical gaps:** sameAs empty, no Person schema, no speakable, TechArticle author is Organization not Person, HowTo is deprecated, inconsistent SoftwareApplication properties.

**Path to 85+:** Populate sameAs (+15-20), add Person schema (+10-12), add speakable (+10) = ~85/100.

---

### Platform Optimization (52/100)

| Platform | Score | Key Factor |
|---|---|---|
| Google AIO | 68 | Best alignment; FAQ/HowTo schema, question headings |
| Gemini | 48 | No Google ecosystem (YouTube, GBP) |
| Perplexity | 46 | Zero community validation |
| ChatGPT | 42 | No entity recognition |
| Bing Copilot | 38 | No IndexNow, no Bing WMT |

---

## Quick Wins (Implement This Week)

1. **Create /llms.txt** -- Deploy with all 111 tools organized by category. 1-2 hour task. Template in Appendix A.

2. **Add OAI-SearchBot to robots.txt** -- 2-minute fix.

3. **Fix homepage canonical tag** -- Add `<link rel="canonical" href="https://konvertalo.hu/">`. 5-minute fix.

4. **Add Twitter Card meta tags** -- Template-level change, 30 minutes.

5. **Create LinkedIn company page** -- 1-hour task. Add to Organization sameAs.

---

## 30-Day Action Plan

### Week 1: Foundation & Quick Wins
- [ ] Create and deploy /llms.txt
- [ ] Add OAI-SearchBot to robots.txt
- [ ] Fix homepage canonical tag
- [ ] Add Twitter Card meta tags site-wide
- [ ] Fix sitemap trailing-slash mismatch
- [ ] Create LinkedIn company page
- [ ] Create GitHub organization
- [ ] Begin populating Organization sameAs array

### Week 2: Schema & Entity
- [ ] Create standalone Person schema for founder
- [ ] Switch TechArticle author from Organization to Person @id
- [ ] Add speakable property to TechArticle schemas
- [ ] Remove deprecated HowTo schema (optional -- reduces page weight)
- [ ] Standardize SoftwareApplication across all tool pages
- [ ] Complete hreflang implementation (hu + ro on all pages)
- [ ] Register with Bing Webmaster Tools + implement IndexNow

### Week 3: Content Enhancement
- [ ] Add original benchmark data to top 10 tool pages (actual file sizes, conversion times)
- [ ] Add "Related Tools" section to all tool pages (3-5 links each)
- [ ] Diversify FAQ content -- add 3-4 unique questions per tool
- [ ] Add external citations to tool pages (format specs, web.dev)
- [ ] Create Terms of Service page
- [ ] Add before/after visual comparisons to image tool pages

### Week 4: Authority Building
- [ ] Launch on Product Hunt
- [ ] Register on AlternativeTo
- [ ] Begin Reddit participation (r/webdev, r/hungary, r/opensource)
- [ ] Plan YouTube channel (tool demo videos)
- [ ] Create first educational pillar guide article
- [ ] Consider English landing pages for top 20 tools

---

## Projected Score Improvement

| Timeframe | Actions | Projected Score |
|---|---|---|
| Current | -- | **50/100 (Poor)** |
| After Week 1 | llms.txt, robots.txt, canonical, LinkedIn, GitHub | **58/100 (Fair)** |
| After Week 2 | Person schema, speakable, hreflang, Bing WMT | **65/100 (Fair)** |
| After Week 3 | Benchmarks, cross-linking, citations, content | **70/100 (Fair-Good)** |
| After Week 4 | Product Hunt, Reddit, YouTube planning | **74/100 (Fair-Good)** |
| 3-6 months | Established community, English content, press | **80-85/100 (Good)** |

---

## Comparison: All Audited Sites

| Metric | MatekMegoldasok | SEOTudas | CutOptim | Konvertalo |
|---|---|---|---|---|
| **GEO Score** | **55** | **46** | **56** | **50** |
| Content E-E-A-T | 70 | 71 | 65 | 58 |
| Technical | 84 | 78 | **92** | 82 |
| AI Crawler Access | 92 | 10 | 90 | 80 |
| Brand Authority | 12 | 5 | 18 | 5 |
| Schema | 38 | 52 | 42 | **62** |
| Platform Optimization | 62 | 55 | 58 | 52 |
| Business Type | Educational | Agency | SaaS | Utility |
| Languages | 1 (HU) | 1 (HU) | 8 (multi) | 1 (HU+RO) |
| Framework | Deno Fresh | Deno Fresh | Astro | Astro |

**Universal pattern across all 4 sites:** Strong technical foundations, near-zero brand authority, incomplete sameAs/Person schemas. The #1 improvement for every site remains **building external presence and entity recognition**.

---

## Appendix A: Recommended llms.txt

```markdown
# Konvertalo.hu

> 111 free online conversion and file processing tools.
> All processing happens in your browser -- no server uploads, no registration.
> Privacy-first, GDPR compliant. Available in Hungarian and Romanian.

## Image Tools
- [JPG to WebP](https://konvertalo.hu/kep/jpg-webp): Convert JPEG images to WebP format (25-35% smaller files)
- [PNG to WebP](https://konvertalo.hu/kep/png-webp): Convert PNG to WebP with transparency
- [HEIC to JPG](https://konvertalo.hu/kep/heic-jpg): Convert iPhone HEIC photos to JPEG
- [Image Compression](https://konvertalo.hu/kep/keptomorites): Compress images without visible quality loss
- [Image Resize](https://konvertalo.hu/kep/kep-atmeretezese): Resize images to exact dimensions
- [WebP to PNG](https://konvertalo.hu/kep/webp-png): Convert WebP back to PNG
- [AVIF to JPG](https://konvertalo.hu/kep/avif-jpg): Convert AVIF to JPEG

## PDF Tools
- [PDF Merge](https://konvertalo.hu/pdf/osszeillesztes): Combine multiple PDFs into one
- [PDF Split](https://konvertalo.hu/pdf/szetvalasztas): Split PDF into individual pages
- [PDF Compress](https://konvertalo.hu/pdf/tomorites): Reduce PDF file size
- [PDF Rotate](https://konvertalo.hu/pdf/forgatas): Rotate PDF pages
- [PDF Watermark](https://konvertalo.hu/pdf/vizjel): Add watermarks to PDFs
- [PDF Password](https://konvertalo.hu/pdf/jelszo-vedelem): Password-protect PDFs

## Data Tools
- [CSV to JSON](https://konvertalo.hu/adat/csv-json): Convert CSV files to JSON format
- [JSON to CSV](https://konvertalo.hu/adat/json-csv): Convert JSON to CSV
- [Excel to JSON](https://konvertalo.hu/adat/excel-json): Convert Excel spreadsheets to JSON

## Developer Tools
- [JSON Formatter](https://konvertalo.hu/fejleszto/json-formazas): Format and validate JSON
- [YAML Formatter](https://konvertalo.hu/fejleszto/yaml-formazas): Format YAML documents
- [Base64 Encoder](https://konvertalo.hu/fejleszto/base64-kodolas): Encode/decode Base64
- [URL Encoder](https://konvertalo.hu/fejleszto/url-kodolas): URL encode/decode strings
- [HTML Minifier](https://konvertalo.hu/fejleszto/html-minifikacio): Minify HTML code

## Text Tools
- [Slug Generator](https://konvertalo.hu/szoveg/slug-generalas): Generate URL-friendly slugs
- [Text Case Converter](https://konvertalo.hu/szoveg/kis-nagy-betu): Convert text case
- [Duplicate Remover](https://konvertalo.hu/szoveg/duplikatum-eltavolitas): Remove duplicate lines

## SEO Tools
- [Title/Meta Length](https://konvertalo.hu/seo/title-meta-hossz): Check title and meta description length

## About
- [About](https://konvertalo.hu/rolunk): Platform info and founder
- [Contact](https://konvertalo.hu/kapcsolat): info@konvertalo.hu
- [Privacy](https://konvertalo.hu/adatvedelmi-nyilatkozat): GDPR privacy policy
```

---

*Report generated by GEO Audit Tool | 2026-03-22*
*Methodology: 6-category weighted scoring with 5 parallel analysis agents*
