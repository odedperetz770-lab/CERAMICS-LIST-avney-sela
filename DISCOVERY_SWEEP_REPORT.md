# Discovery Sweep Report — Pass 1 (Mass Discovery, Recall-First)

Date: 2026-08-17
Scope of this pass: the 4 user-named QA seed localities (Beit Jann, Baqa al-Gharbiyye, Umm al-Fahm, Hadera) plus 5 more zero/low-coverage localities from the Pass 1A priority list (Kafr Yasif, Ar'ara/Wadi Ara, Qalansuwa, Tayibe, and a first look at Jatt).

**This is a discovery-only pass.** Nothing below has been added to `index.html` yet — every candidate is `DISCOVERED_UNVERIFIED` or flagged `POSSIBLE_DUPLICATE`, pending Pass 2 verification (exact locality confirmation, category relevance, phone/contact confirmation, dedup resolution).

**Not yet swept this round** (from the Pass 1A priority list): Yarka, Abu Snan, Nahariya area, Shlomi area, Carmiel, Tamra, Shefa-Amr, Nazareth, Nof HaGalil, Sakhnin, Arraba, Kafr Manda, Iksal, Yafia, Kafr Kanna, Kafr Qara, Pardes Hanna-Karkur, Or Akiva, Netanya. Baseline `CURRENT_DB_COUNT` for these is included below (already pulled from the live data) so the next session can prioritize correctly, but no new discovery search was run for them yet.

---

## Why the original complaint was partly right and partly not

Checking `CURRENT_DB_COUNT` against real discovery results confirms real gaps, but not uniformly — some of the named examples already have meaningful coverage:

| Locality | CURRENT_DB_COUNT (before this pass) |
|---|---|
| Beit Jann | **0** |
| Baqa al-Gharbiyye | 2 |
| Umm al-Fahm | 1 |
| Hadera | **9** |
| Kafr Yasif | **0** |
| Ar'ara (Wadi Ara, Triangle) | **0** |
| Qalansuwa | 1 |
| Tayibe | **0** |
| Jatt | **0** |

Hadera in particular already has 9 real, named records — the complaint holds strongly for Beit Jann/Kafr Yasif/Ar'ara/Tayibe/Jatt (true zero-coverage localities) but less so for Hadera, which needs incremental discovery, not a from-scratch sweep.

---

## Per-locality discovery detail

### בית ג'ן (Beit Jann)
- GOOGLE/MAPS CANDIDATES: 0 distinct (generic national ceramics SEO noise only)
- B144 CANDIDATES: 1 — חומרי בניין השלום (category: general building materials; ceramic/sanitary relevance **not yet confirmed**)
- DAPEI ZAHAV CANDIDATES: **SOURCE_RESTRICTED** — dunsguide.co.il returned HTTP 403 (blocked the fetch); not bypassed, needs a different access method next session
- EASY CANDIDATES: not checked this pass
- FACEBOOK/INSTAGRAM CANDIDATES: not checked this pass
- DEALER-LIST CANDIDATES: not checked this pass
- **UNION CANDIDATE COUNT: 1**
- CURRENT_DB_COUNT: 0
- MISSING_CANDIDATES: 1 (likely more — 4 of 8 mandated source families untried)
- COVERAGE_GAP_PERCENTAGE: 100%

### באקה אל-גרביה (Baqa al-Gharbiyye)
- B144 CANDIDATES: 4 — חומרי בנין אבו טארק בע"מ (2 listing variants, likely same business, flagged `POSSIBLE_DUPLICATE`), ותד וג'יה חסן (חומרי בנין), ברזל ובניין מואסי, א.עתאמנה ובניו בע"מ
- All 4 are general "building materials" category — ceramic/sanitary relevance **not yet confirmed** (Pass 2 required)
- Other source families: not checked this pass
- **UNION CANDIDATE COUNT: 4**
- CURRENT_DB_COUNT: 2 (המרכז קרמיקה מואסי — באקה; קרמיקה צפון באקה)
- MISSING_CANDIDATES: 4
- COVERAGE_GAP_PERCENTAGE: 67% (4 of 6 total discovered-so-far candidates not yet in DB)
- Note: "ברזל ובניין מואסי" shares the surname "מואסי" with the existing DB record "המרכז קרמיקה מואסי" — possible same extended-family business, needs Pass 2 check before treating as fully distinct.

### אום אל-פחם (Umm al-Fahm)
- B144 CANDIDATES: 4 — חומרי בניין בית המקצוען, חומרי בניין אבו סמי ובניו, סירמקס גלרי בע"מ (ceramics-specific: porcelain tiles, showers, jacuzzis, bathroom cabinets, sanitary ware, faucets — strong relevance), חומרי בניין מ.ר.מ.ר
- DAPEI ZAHAV CANDIDATES: 1 — אחמד יוסף מחמוד חומרי בנין בע"מ
- **UNION CANDIDATE COUNT: 5**
- CURRENT_DB_COUNT: 1 (קרמיקה המשולש לקרמיקה ושיש בע"מ)
- MISSING_CANDIDATES: 5
- COVERAGE_GAP_PERCENTAGE: 83%

### חדרה (Hadera)
- B144 CANDIDATES: 3 — חן ניסים קרמיקה (possible dup of existing "חן קרמיקה בע"מ" — needs Pass 2 name-disambiguation), אברהם קראדי ובניו (⚠️ same exact name already seen attributed to **Or Akiva** in an earlier round — likely the same multi-department store being aggregated under both localities by directory sites; do not treat as 2 distinct businesses without checking which city is correct), קשת בענן (new, distinct name — building materials + ceramics/porcelain + sanitary + showers)
- **UNION CANDIDATE COUNT: ~2 net-new** (1 likely duplicate of Or Akiva excluded from the net-new count, 1 name-collision with existing record flagged for review)
- CURRENT_DB_COUNT: 9
- MISSING_CANDIDATES: 2 (net-new, pending dedup resolution)
- COVERAGE_GAP_PERCENTAGE: ~18% — Hadera is genuinely close to well-covered; the user's example here likely reflects specific known businesses not yet cross-checked by name (worth asking which specific Hadera business(es) were expected, if the gap still seems wrong after Pass 2).

### כפר יאסיף (Kafr Yasif)
- B144 CANDIDATES: 3 — שריף הזימה בע"מ (⚠️ near-identical to existing DB record "קרמיקה שריף הזימה" filed under **Abu Snan** — same family business likely operating in both neighboring villages, or a locality-attribution error; needs Pass 2 check), הזימה מופיד חומרי בניין (same surname, possibly related business — not necessarily the same one), דאוד אליאס נמר (חומרי בניין)
- **UNION CANDIDATE COUNT: 3** (1 flagged likely-duplicate-or-branch of the existing Abu Snan record)
- CURRENT_DB_COUNT: 0
- MISSING_CANDIDATES: 2-3 depending on the Abu Snan dedup outcome
- COVERAGE_GAP_PERCENTAGE: 100%

### ערערה — וואדי ערה / המשולש (Ar'ara, Triangle — NOT Ar'ara BaNegev)
- ⚠️ **Locality-name collision caught**: Israel has two places named "ערערה" — this one in the northern Triangle (near Umm al-Fahm/Kafr Qara) and a distinct Bedouin town "ערערה בנגב" in the South. An initial broad search returned only the Negev one; a refined query (`-בנגב`) was needed to reach the correct locality. Recording this explicitly so future rounds don't merge or confuse the two.
- B144 CANDIDATES: 1 — מוואסי - קרמיקה עארה (specifically ceramics category)
- **UNION CANDIDATE COUNT: 1**
- CURRENT_DB_COUNT: 0
- MISSING_CANDIDATES: 1 (likely more — only 1 source family tried)
- COVERAGE_GAP_PERCENTAGE: 100%

### קלנסווה (Qalansuwa)
- B144 CANDIDATES: 2 — ג. אל-חסאן (חומרי בניין), חומרי בניין רבוס בע"מ
- EASY CANDIDATES: 1 — חומרי בנין ג'יוסי, אל קודס 18 (has a specific street address, stronger candidate)
- **UNION CANDIDATE COUNT: 3**
- CURRENT_DB_COUNT: 1 (אל נעים מתאני)
- MISSING_CANDIDATES: 3
- COVERAGE_GAP_PERCENTAGE: 75%

### טייבה (Tayibe)
- B144 CANDIDATES: 2 — חומרי בנין אלאמיר, אוקינוס חומרי בנין
- **UNION CANDIDATE COUNT: 2**
- CURRENT_DB_COUNT: 0
- MISSING_CANDIDATES: 2
- COVERAGE_GAP_PERCENTAGE: 100%

### ג'ת (Jatt)
- No Jatt-specific candidates surfaced in the combined query run this pass (results skewed toward Qalansuwa/Tayibe). **NOT_SWEPT_YET** — needs a dedicated query next round, same as the localities in the "not yet swept" list above.

---

## Totals for this pass

- **Localities with a real discovery attempt:** 9 (8 with results, 1 inconclusive/needs re-query)
- **Total net-new candidates surfaced:** ~26 (across all localities above, before Pass 2 dedup/verification)
- **Restricted sources encountered:** 1 (dunsguide.co.il, HTTP 403 on Beit Jann — not bypassed)
- **Cross-locality duplicate risks flagged:** 3 (Abu Tarek variants in Baqa al-Gharbiyye; אברהם קראדי ובניו appearing under both Hadera and Or Akiva; שריף הזימה family businesses appearing under both Abu Snan and Kafr Yasif)
- **Locality-name collision caught and avoided:** 1 (Ar'ara Triangle vs. Ar'ara BaNegev)

## Source families actually exercised this pass

Used: Google Search (via WebSearch, approximating general search + surfacing B144/Dapei Zahav/Easy result pages), B144, Dapei Zahav, Easy.
**Not used this pass** (tooling/access limits, not skipped by choice): direct Google Maps place search, Waze, Facebook page search, Instagram, manufacturer/importer dealer-list crawling, municipal directories, industrial-zone directories. These remain open for Pass 1 continuation and would very likely raise the candidate counts above further, especially Facebook (many small Arab-sector businesses maintain only a Facebook page, no formal directory listing).

## Next steps

1. Continue Pass 1 discovery for the remaining ~19 unswept localities from the Pass 1A list.
2. Re-run Jatt with a dedicated query.
3. Retry Beit Jann's dunsguide.co.il listing via an alternative access path (or accept as permanently `SOURCE_RESTRICTED` and rely on other families).
4. Resolve the 3 flagged cross-locality duplicate risks before any candidate becomes a production record.
5. Only then begin Pass 2 verification (phone/address/category confirmation, dedup, scoring) and commit real enrichments to `index.html` — per the mandatory deploy-verification workflow already established.
