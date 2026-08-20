# Avnei Sela — Image-Derived Source Reconciliation Report

Generated: 2026-08-20 (this session). Historical recovery (`AVNEI_SELA_RECOVERED_MASTER.csv`, 560 records, previously PASSed) was **not** rerun or rewritten — used read-only as the current baseline, exactly as instructed.

## 1. Image source discovery

Searched the ceramics pilot project directory (`CERAMICS-LIST-avney-sela-pilot`) for image-derived/screenshot-extraction artifacts. Found:

| Artifact | What it is |
|---|---|
| `DRIVE_SOURCE_MANIFEST.json` | Manifest of **15 photographed source images** (`.jpg`, ~7MB each), each with a recorded SHA256 — batch `GOOGLE_DRIVE_2026_08_18` |
| `DRIVE_CUSTOMER_LIST_EXTRACTED.json` | **719 raw rows**, OCR/visually transcribed from those 15 images — the canonical, complete image-derived extraction |
| `DRIVE_CUSTOMER_LIST_MATCHED.json` | A prior matching pass (same 719 rows) against an *older, narrower* baseline (live 280 + discovery pool of 230, as of 2026-08-18) |
| `GOOGLE_DRIVE_CUSTOMER_LIST_INGESTION_REPORT.md` | Narrative report describing the extraction/match/verify pipeline that produced the files above |
| `ONDA_CUSTOMER_LIST_EXTRACTED.json` | 177 rows — **verified to be an exact subset of the 719-row Drive extraction, not a separate source** (see §2) |

Two of the 15 image filenames referenced in the manifest sequence (`197446.jpg`, `197447.jpg`) were confirmed absent from the source Drive folder at extraction time — recorded in the extraction file itself, not something this pass discovered or needs to re-verify.

No other image-derived artifact (OCR dump, screenshot folder, temp CSV/TXT) was found elsewhere in the searched locations.

```
IMAGE_DERIVED_SOURCE_STATUS = FOUND
```

## 2. Avoiding double-counting: the Onda file is not a second source

`ONDA_CUSTOMER_LIST_EXTRACTED.json`'s `source_files` field lists `197443.jpg`, `197444.jpg`, `197445.jpg` — the same first 3 of the Drive batch's 15 images. Before treating it as an independent input, every one of its 177 rows was matched against the Drive extraction's rows from those same 3 images, by `(page_number, row_position, normalized_business_name)`:

**177 / 177 rows matched exactly.** This is a complete, identical overlap — `ONDA_CUSTOMER_LIST_EXTRACTED.json` is an earlier, partial extraction pass (pages 2–4 only) that was fully superseded once the complete 15-image, 719-row `DRIVE_CUSTOMER_LIST_EXTRACTED.json` extraction was run. It was **not** used as a second input; using it alongside the Drive file would have double-counted these 177 rows. This is documented here rather than silently discarded.

## 3. Matching methodology (against the current historical baseline)

The 719 raw rows were matched against all 560 records in `AVNEI_SELA_RECOVERED_MASTER.csv`/`.json` (the just-completed historical recovery, used strictly read-only) using the same normalization already established in that recovery (Unicode-normalized, lowercased, legal-suffix-stripped name; normalized city; digit-only phone).

**Step 1 — dedup within the 719 image rows themselves**, using name+city and name+phone exact keys (no website field exists in this source). Result: **0 internal duplicate groups** — every image row is name+city/name+phone-distinct from every other image row. This is not surprising given how sparse the extracted contact data is (see §4) — most rows don't carry enough fields to collide on these keys.

**Step 2 — for each row, classify via a strict priority cascade** (never automatic on name alone):

1. `DUPLICATE_IMAGE_SOURCE` — non-primary member of an internal duplicate cluster (0 rows this pass, per Step 1)
2. `MATCHED_TO_HISTORICAL` — **exact** normalized name+city match, or exact normalized name+phone match, against the historical master (HIGH confidence)
3. `POSSIBLE_MATCH` — the name alone exactly matches a historical record, with no city/phone available in the image row to corroborate or contradict it — **never auto-merged**, always surfaced for human review (LOW confidence)
4. `NEEDS_REVIEW` — no match found, **and** the row has neither a city nor a phone number, so there is not enough data to responsibly search publicly or assert it's a genuinely new/missing business
5. `IMAGE_DERIVED_MISSING_FROM_HISTORICAL` — no match found anywhere in the 560-row master, but the row does carry real identifying data (a city, in every case this pass — see §4)

This deliberately differs from `DRIVE_CUSTOMER_LIST_MATCHED.json`'s own prior classification, which used fuzzy-scored matching (`score: 0.6`, `0.75`, etc. — visible in its `matched_ref` field) against a narrower, older baseline. This pass uses **exact-key matching only**, against the newer, fuller 560-record master — a deliberately more conservative choice, consistent with "never merge automatically on name alone." The two classifications are compared in §6, not blended.

## 4. Why matching yielded so few strong matches: the underlying data is very sparse

Checked directly against the raw extraction before drawing any conclusion from the low match counts:

| | Count |
|---|---:|
| Rows with a city | 155 |
| Rows with a phone or mobile number | **0** |
| Rows with neither city nor phone | 564 |

**Zero of the 719 rows carry a phone number at all** — the extraction pipeline's own privacy note states internal numeric columns were deliberately not copied during transcription, so contact-number corroboration was never available for this batch, only names and (sometimes) cities. This is a data-availability fact of the source, not a matching-logic gap, and it fully and exactly explains the bucket counts:

- 155 rows have a city → exactly 10 matched (`MATCHED_TO_HISTORICAL`) + 145 unmatched-with-data (`IMAGE_DERIVED_MISSING_FROM_HISTORICAL`) = 155 ✓
- 564 rows have neither city nor phone → exactly 19 matched by name alone (`POSSIBLE_MATCH`) + 545 with no match and no data (`NEEDS_REVIEW`) = 564 ✓

## 5. Record accounting

| Field | Value |
|---|---:|
| `IMAGE_SOURCE_FILES_FOUND` | 15 |
| `IMAGE_DERIVED_RAW_RECORDS` | 719 |
| `IMAGE_DERIVED_UNIQUE_RECORDS` | 719 |
| `IMAGE_DERIVED_MATCHED_TO_HISTORICAL` | 10 |
| `IMAGE_DERIVED_POSSIBLE_MATCH` | 19 |
| `IMAGE_DERIVED_MISSING_FROM_HISTORICAL` | 145 |
| `IMAGE_DERIVED_DUPLICATES` | 0 |
| `IMAGE_DERIVED_NEEDS_REVIEW` | 545 |
| **Sum** | **719** |
| **`IMAGE_DERIVED_UNACCOUNTED`** | **0** ✅ |

## 6. Cross-check against the project's own prior matching pass

For transparency, the counts above are compared against `DRIVE_CUSTOMER_LIST_MATCHED.json`'s own pre-existing `cross_reference` field (computed 2026-08-18, fuzzy-scored, against the older 280+230 baseline):

| This pass | Count | Prior pass (fuzzy, older baseline) | Count |
|---|---:|---|---:|
| `MATCHED_TO_HISTORICAL` | 10 | `EXISTING_LIVE_EXACT_MATCH` + `EXISTING_DISCOVERY_MATCH` | 20 + 8 = 28 |
| `POSSIBLE_MATCH` | 19 | `POSSIBLE_MATCH_NEEDS_REVIEW` | 66 |
| `NEEDS_REVIEW` | 545 | `UNCLEAR_NO_LOCALITY` | 385 |
| `IMAGE_DERIVED_MISSING_FROM_HISTORICAL` | 145 | `NEW_LEAD` | 240 |

The two passes diverge in every row because they use genuinely different methods (exact-key vs. fuzzy-scored matching) against genuinely different baselines (this pass's 560-record unified historical master vs. the prior pass's narrower, older 280+230 split pool) — not because either is wrong. This pass is the more conservative of the two by design. Neither classification overwrites or is merged into the other; both are preserved as separate, independently-inspectable artifacts (`DRIVE_CUSTOMER_LIST_MATCHED.json` untouched; this pass's results in `AVNEI_SELA_IMAGE_DERIVED_RECONCILIATION.csv`).

## 7. What to do with each bucket (not performed automatically by this pass)

- **`IMAGE_DERIVED_MISSING_FROM_HISTORICAL` (145 rows)** — the highest-value output: real business names + cities, photographed from a physical customer-list document, with no match anywhere in the current 560-record historical set. Candidates for a future, explicitly-authorized public-verification pass — **not performed here** (no new web discovery, per your instruction).
- **`POSSIBLE_MATCH` (19 rows)** — name-only matches to an existing historical record; a human should confirm identity before treating them as the same business.
- **`NEEDS_REVIEW` (545 rows)** — no city, no phone, no name match; this is exactly the sparse-OCR-page problem the project's own ingestion report already flagged as needing a different strategy (e.g. re-OCR with layout/locality inference) before these can be searched or classified further.
- **`IMAGE_DERIVED_MISSING_FROM_HISTORICAL`, `POSSIBLE_MATCH`, and `NEEDS_REVIEW` rows were not promoted, merged, or written into the historical master.** They exist only in the new reconciliation output.

## 8. Output files

| File | Rows | Purpose |
|---|---:|---|
| `AVNEI_SELA_IMAGE_DERIVED_RECONCILIATION.csv` | 719 | Every image-derived record: business name, city, phone/address (all empty for phone, per §4), source file/page/position, original extracted text, extraction confidence, computed classification, matched historical record ID, match evidence, confidence, review reason |
| `AVNEI_SELA_IMAGE_RECOVERY_STATS.json` | — | Raw computed statistics backing this report |
| `AVNEI_SELA_IMAGE_DERIVED_REPORT.md` | — | This file |

No existing file was modified. `AVNEI_SELA_RECOVERED_MASTER.csv`/`.json` were read but not rewritten. No production data touched, nothing merged, deployed, or newly discovered on the web.

## 9. Final report fields

```
IMAGE_SOURCE_FILES_FOUND = 15
IMAGE_DERIVED_RAW_RECORDS = 719
IMAGE_DERIVED_UNIQUE_RECORDS = 719
IMAGE_DERIVED_MATCHED_TO_HISTORICAL = 10
IMAGE_DERIVED_POSSIBLE_MATCH = 19
IMAGE_DERIVED_MISSING_FROM_HISTORICAL = 145
IMAGE_DERIVED_DUPLICATES = 0
IMAGE_DERIVED_NEEDS_REVIEW = 545
IMAGE_DERIVED_UNACCOUNTED = 0
```

**AVNEI_SELA_IMAGE_RECONCILIATION = PASS**
