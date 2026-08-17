# Claude → Codex Handoff — Avney Sela Ceramics Discovery (Pass 1 + Enrichment Checkpoint)

Generated: 2026-08-17
Handoff author: Claude (this session, final handoff round)

---

## ⚠️ FORMAT PRESERVATION RULE — read before touching anything

**The Avnei Sela B2B database must continue using the existing working UI/product structure.** Future work must UPDATE and ENRICH the authoritative business data source feeding that product. It must **NOT** create a replacement empty dashboard, a new admin/SaaS-style interface, or a second competing database. All enrichment must fit **into** the existing card layout, region/category taxonomy, filters, and dark Hebrew RTL field-sales presentation already live at the URL below.

---

## ⚠️ There are TWO separate, unrelated projects on this machine — do not confuse them

This handoff covers **one specific project only**: the live 280-record directory. A second, unrelated prototype exists at `C:\Users\USER\ceramic-project\` (its own tiny 4-record `database.json`, `geography-master.json`, `coverage-matrix.json`). **That project is not connected to the Vercel deployment below and was not touched.** Do not assume files with the same names exist in this repo — they don't (see the file-path table below for what actually exists here).

---

## 1. Exact authoritative file identification

```
LIVE_SITE:                     https://ceramics-list-avney-sela.vercel.app/
LOCAL_PROJECT_PATH:            C:\Users\USER\CERAMICS-LIST-avney-sela
REPOSITORY_PATH:                C:\Users\USER\CERAMICS-LIST-avney-sela\.git
  (remote: https://github.com/odedperetz770-lab/CERAMICS-LIST-avney-sela.git, branch: main)
AUTHORITATIVE_UI_FILE:          C:\Users\USER\CERAMICS-LIST-avney-sela\index.html
AUTHORITATIVE_BUSINESS_DATA_FILE: C:\Users\USER\CERAMICS-LIST-avney-sela\index.html
  (there is NO separate database.json in this repo — the 280-record array
   `const businesses = [...]` is embedded directly inside index.html)
DEPLOYMENT_ENTRY_FILE:          C:\Users\USER\CERAMICS-LIST-avney-sela\index.html
DATA_LOADING_METHOD:            Embedded JS array inside a static HTML file.
  No build step, no vercel.json, no package.json, no API route — confirmed by
  directory listing (only index.html + this session's new .md/.json/.js files
  exist in the repo root). Vercel serves this as a zero-config static site.
```

## 2. Core counts

```
LIVE_DATABASE_RECORD_COUNT:        280   (verified live, post-enrichment this session)
EXISTING_DATABASE_COUNT:           280   (same as above — index.html IS the database)
PASS1_DISCOVERY_CANDIDATE_COUNT:   79
DISTINCT_LOCALITIES_ATTEMPTED:     29    (all named Pass-1A priority localities;
                                          Jatt attempted twice — failed then resolved)
GEOGRAPHY_MASTER_PATH:             DOES NOT EXIST for this project. (A geography
                                    master with official locality codes exists only
                                    in the unrelated ceramic-project repo — see
                                    warning above. Would need to be built fresh for
                                    Avney Sela if that level of rigor is wanted.)
COVERAGE_MATRIX_PATH:              DOES NOT EXIST for this project, same reason.
```

## 3. Zero-data-loss reconciliation (live vs. the historical Downloads export)

A second local file, `C:\Users\USER\Downloads\index_1.html` (283 records, never deployed), was compared against the live 280-record file by exact business name:

```
LIVE_SITE_BUSINESS_COUNT:                280
INDEX_1_HTML_COUNT:                      283
OVERLAP (same business name in both):    276
EXISTING_ONLY (in live, not in index_1): 4   — see list below
DISCOVERY_ONLY (in index_1, not live):   7   — Oz Ceramica branches, fully missing
POSSIBLE_DUPLICATES (fuzzy, unresolved): not computed this round — only exact
                                          normalized-name matching was done;
                                          a fuzzy pass could surface more
```

**EXISTING_ONLY (4 — added earlier this session, already live and evidence-backed):**
בר עמי — מעלה אדומים · קרמיקה בגולן בע"מ (מג'דל שמס) · גיד מחסני קרמיקה וסניטריה (ירושלים) · עמודי שלמה — מבשרת ציון

**DISCOVERY_ONLY (7 — real, ready-to-apply, currently NOT on the live site):**
עוז קרמיקה — בני ברק (פלאגשיפ), עוז קרמיקה — בני ברק (חרדי), עוז קרמיקה — נתניה, עוז קרמיקה — אשדוד, עוז קרמיקה — אשקלון, עוז קרמיקה — באר שבע, עוז קרמיקה — מעלה אדומים (לוגיסטי/אאוטלט) — each with real manager names, mobile numbers, and/or email, sourced to oz-ceramica.co.il. Full details in `discovery-candidates.json`-adjacent — actually captured in the git history of `index_1.html`, not yet re-exported to a candidate file this round.

### ⚠️ Bigger finding: 13 of the 276 "overlapping" records are also missing fields

Beyond the 7 fully-missing records, **13 records that exist in BOTH files by name** have richer data in `index_1.html` that the live site is missing: 7 gained `contact` (manager name + mobile), 2 gained `email`, 8 gained `website`, 8 gained `company_number`. Example: live's "עוז קרמיקה — מודיעין" has no contact/website/company_number; `index_1.html`'s same-named record has all three (מנהל סניף: דורון, נייד 058-7760607 / oz-ceramica.co.il / ח.פ. 515166395).

**Combined: 20 records (7 + 13) have real, already-known, zero-new-research enrichment sitting in a local file, unused.** This is the single highest-value, lowest-risk next action for this project — full record list is reproducible by diffing `index.html` against `Downloads\index_1.html` on the `name` field (script used: ad-hoc Node comparison, not saved as a standalone file this round — trivial to reproduce).

**Per the stop condition below, none of this was merged into `index.html` this session.**

## 4. Files created this session

| File | Exact path | Description |
|---|---|---|
| `discovery-candidates.json` | `C:\Users\USER\CERAMICS-LIST-avney-sela\discovery-candidates.json` | All 79 Pass-1 candidates, full 33-field schema (contact/social/legal/confidence fields included, mostly null where not yet researched) |
| `discovery-candidates.csv` | `C:\Users\USER\CERAMICS-LIST-avney-sela\discovery-candidates.csv` | Same 79 candidates, UTF-8 BOM CSV (Excel-safe Hebrew) |
| `build-discovery-export.js` | `C:\Users\USER\CERAMICS-LIST-avney-sela\build-discovery-export.js` | Node script that generated the two files above — re-run with `node build-discovery-export.js` after editing the source array inside it |
| `EXISTING_DATABASE_ENRICHMENT_GAPS.md` | `C:\Users\USER\CERAMICS-LIST-avney-sela\EXISTING_DATABASE_ENRICHMENT_GAPS.md` | Completeness statistics for the live 280 records + the 20-record ready-to-apply finding |
| `CERAMICS_DATA_QUALITY_CHECKPOINT.json` | `C:\Users\USER\CERAMICS-LIST-avney-sela\CERAMICS_DATA_QUALITY_CHECKPOINT.json` | Machine-readable summary combining existing-DB and candidate-pool statistics |
| `build-quality-checkpoint.js` | `C:\Users\USER\CERAMICS-LIST-avney-sela\build-quality-checkpoint.js` | Node script that generated the checkpoint JSON — re-run after any data change |
| `CLAUDE_TO_CODEX_CERAMICS_HANDOFF.md` | `C:\Users\USER\CERAMICS-LIST-avney-sela\CLAUDE_TO_CODEX_CERAMICS_HANDOFF.md` | This file |

## 5. Files updated this session (documentation only — NOT the live database)

| File | Exact path |
|---|---|
| `DISCOVERY_SWEEP_REPORT.md` | `C:\Users\USER\CERAMICS-LIST-avney-sela\DISCOVERY_SWEEP_REPORT.md` |

## 6. Files that exist but were NOT modified this session

| File | Exact path | Notes |
|---|---|---|
| `index.html` | `C:\Users\USER\CERAMICS-LIST-avney-sela\index.html` | The live 280-record database + UI. Verified via live fetch to still show 280 after this entire session's work. |
| `index.html.backup_20260817_223943` | `C:\Users\USER\CERAMICS-LIST-avney-sela\index.html.backup_20260817_223943` | Local safety backup from before the 276→280 round, not committed to git |

## 7. Sources used / not used

**Used:** Google Search, B144 (dominant — both search-summaries and direct category-page fetches), Dapei Zahav (d.co.il), Easy, Facebook + Instagram (Sakhnin only, plus 3 enrichment lookups this round), official business websites (2: mowassi.co.il, alony.co.il), t.co.il.

**Not used:** Google Maps place search, Waze, systematic manufacturer/dealer-list crawling, municipal directories, industrial-zone directories, BDI/credit data (never attempted — `BDI_STATUS: NOT_AUTHORIZED_OR_NOT_AVAILABLE`), any legal/court database (0 of 79 candidates have had a legal check — `public_legal_info_status: NOT_CHECKED` on all rows).

## 8. Search failures / blockers

- **עכסל (Iksal)**: 0 candidates across 2 source families — unresolved.
- **dunsguide.co.il**: HTTP 403 on the one URL tried (Beit Jann) — not bypassed.

## 9. Ambiguous localities

1. **ערערה — וואדי ערה** vs. **ערערה בנגב** (different places, collision caught).
2. **ג'ת (המשולש)** vs. **קריית גת** (different places, collision caught after 2 failed attempts).

## 10. Address/locality conflicts found during this round's enrichment pass

- **מוואסי - קרמיקה עארה**: B144 says Ar'ara, a separate t.co.il listing says Baqa al-Gharbiyye. Official website (mowassi.co.il) confirmed real contact details but not a definitive address. `CONFLICT_REVIEW_REQUIRED`.
- **גליל קרמיקה**: B144 (Shlomi category page) vs. a general web search placing it in Rosh Pina (Tzachar industrial zone) — a non-adjacent town. `CONFLICT_REVIEW_REQUIRED`.

## 11. Possible duplicates (7 groups, 13 flagged rows)

`sherif-hzaimah` (3 sightings across Abu Snan/Kafr Yasif/Tamra + existing DB record) · `abu-tarek-baqa` (2 listing variants) · `mula-amer-yarka` · `royal-ceramics` (Carmiel + Tamra) · `sayegh-sons-importer` (Nazareth existing + Nof HaGalil + Tamra) · `etz-hamahalaf` (Arraba + Kafr Qara) · `golden-barazim` (candidate vs. existing Tira record). Full detail in `discovery-candidates.json`.

## 12. Contact enrichment performed this round (bounded — 3 candidates, per the anti-scope-creep instruction)

| Candidate | New data found |
|---|---|
| סירמקס גלרי בע"מ (Umm al-Fahm) | Address confirmed (שכונת אלקואס 12); confidence 5/10 |
| מוואסי - קרמיקה עארה (Ar'ara) | Phone 04-6666665, mobile 054-7576797, email OFFICE@mowassi.co.il, Facebook — via official site; confidence 6/10 (capped by address conflict) |
| גליל קרמיקה (Shlomi) | Mobile 053-531-4900, email galilkarmica@hotmail.com, Facebook + Instagram; confidence 3/10 (capped by address conflict) |

**The other 76 candidates and all 280 existing records were NOT individually re-searched this round** — that is the bulk of remaining Pass 2 work, sized precisely in `EXISTING_DATABASE_ENRICHMENT_GAPS.md` and `CERAMICS_DATA_QUALITY_CHECKPOINT.json`.

## 13. What Codex should NOT do without further instruction

- Do not write any Pass-1 candidate into `index.html` — verification/promotion is Pass 2, not started for these 79.
- **Exception worth flagging**: the 20 ready-to-apply enrichments from `index_1.html` (section 3) are NOT unverified candidates — they're historical data for businesses already confirmed live. Still, per this session's explicit stop condition, they were left unmerged; whether to apply them is a decision for the next explicit instruction, not an autonomous action.
- Do not treat `POSSIBLE_DUPLICATE`/`NEEDS_REVIEW`/`CONFLICT_REVIEW_REQUIRED` rows as resolved facts.
- Do not build a new dashboard or replace the existing UI structure (see Format Preservation Rule).
- Do not confuse this repo with `C:\Users\USER\ceramic-project\`.
- Do not push to `main` without the established deploy-verification pattern (push → wait → fetch the public URL → confirm the count actually changed there, not just that git succeeded).
- Do not fabricate BDI/credit scores, company IDs, or emails not explicitly published.

## 14. Suggested next actions

1. Decide whether to apply the 20 ready-made `index_1.html` enrichments (fast, low-risk, high-value — recommended first step).
2. Investigate the Iksal search failure and the dunsguide.co.il block.
3. Resolve the 2 address conflicts (Mowassi, Galil Ceramica) and the 7 duplicate groups before promoting any of those rows.
4. Extend Facebook/Instagram/Maps/Waze/dealer-list discovery — only Sakhnin and 3 ad-hoc candidates have had social-media search.
5. Continue Pass 1 beyond the named 29 localities using a purpose-built geography master for Avney Sela (none exists yet).
6. Only then run full Pass 2 verification/enrichment across the 79 candidates and the 280 existing records, using the field schema already established in `discovery-candidates.json` and the scoring rubric in this handoff.
