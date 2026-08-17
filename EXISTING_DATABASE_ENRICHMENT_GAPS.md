# Existing Database (280 records) — Enrichment Gap Analysis

Generated: 2026-08-17
Source: live `index.html` (`const businesses` array), computed directly from the data — no new web research was needed for this file.

## Headline finding: a ready-to-apply enrichment source already exists locally

Before reading the gap stats below, note the single most actionable fact from this handoff round: **`C:\Users\USER\Downloads\index_1.html`** (a historical, never-deployed local export) already contains real contact enrichment — mobile numbers, branch-manager names, 2 emails, and 8 websites/company numbers — for **20 of the businesses already in the live database** (13 overlapping records with richer fields + 7 fully-missing Oz Ceramica branches). This is zero-new-research, ready-to-merge data. See `CLAUDE_TO_CODEX_CERAMICS_HANDOFF.md` for the full reconciliation and the exact record list. **It was not merged into `index.html` this session** — the task scope for this round was analysis/export/handoff, not live-database modification.

## Completeness statistics (280 live records)

| Field | Count | Percentage |
|---|---|---|
| TOTAL BUSINESSES | 280 | 100% |
| WITH ANY PHONE | 183 | 65% |
| WITH MOBILE (heuristic: 05x-prefixed number pattern in the `phone` field) | 3 | 1% |
| WITH WHATSAPP | 0 | 0% |
| WITH EMAIL | 1 | 0.4% |
| WITH WEBSITE | 1 | 0.4% |
| WITH FACEBOOK | 0 | 0% |
| WITH INSTAGRAM | 0 | 0% |
| WITH PUBLIC CONTACT (name/role) | 0 | 0% |
| WITH VERIFIED LEGAL ENTITY / COMPANY ID | 0 | 0% |
| WITH BRANDS | 1 | 0.4% |
| WITH `confidence_score` (from the earlier enrichment round this session) | 4 | 1.4% |
| WITH `commercial_potential` (same round) | 4 | 1.4% |

**Important caveat on the "mobile" count**: the existing schema has a single `phone` field (no separate landline/mobile split) for all but the 4 records enriched earlier this session. The "3 with mobile" figure is a heuristic regex match against Israeli 05x mobile prefixes within that single field — it is likely an undercount, since some landline-formatted entries (e.g. `*9877`, `1-700-700-112`) aren't classifiable either way from the string alone. A true landline/mobile split requires either re-parsing every phone string or fresh verification — not done this round.

## By region (280 total)

| Region | Count |
|---|---|
| מרכז | 95 |
| צפון | 81 |
| שרון/חיפה | 41 |
| דרום | 34 |
| ירושלים | 29 |

## By category (280 total)

| Category | Count |
|---|---|
| חנות פרטית / סיטונאי | 180 |
| רשת ואולם תצוגה | 36 |
| יבואן | 36 |
| אולם יוקרה | 28 |

## What this means for prioritization

1. **Apply the 20 ready-made enrichments from `index_1.html` first** — this is strictly additive, zero-risk, zero-new-research, and immediately raises WITH MOBILE from 3→~10, WITH WEBSITE from 1→~9, WITH EMAIL from 1→~3, WITH COMPANY ID from 0→8.
2. **Contact enrichment across the other ~260 records is almost entirely undone** (0% WhatsApp, 0% Facebook, 0% Instagram, 0% public contact, 0% company ID across the base dataset). This is a large body of future work, explicitly out of scope for this handoff round per the "do not perform full Pass 2" instruction — flagged here as the actual size of the remaining task, not attempted.
3. The 4 records with `confidence_score`/`commercial_potential` are the ones added in the prior enrichment round this session (Bar-Ami Ma'ale Adumim, Kramica BaGolan, Gid Kafr Yasif... — actually Jerusalem/Mevaseret Zion, see git history) — the other 276 pre-existing seed records have no confidence scoring at all.
