# Discovery Sweep Report — Pass 1 (Mass Discovery, Recall-First)

Last updated: 2026-08-17 (Session 2 — full priority-list sweep)

**This remains a discovery-only checkpoint.** Nothing below has been added to `index.html`. Every candidate is `DISCOVERED_UNVERIFIED`, `POSSIBLE_DUPLICATE`, or `NEEDS_REVIEW`, pending Pass 2 (locality confirmation, category relevance, phone/contact verification, dedup resolution). **The live database was not touched this session.**

**Status: all 29 named priority localities have now been attempted at least once.** Geography-master expansion beyond this named list has not started yet.

---

## Per-locality results

Legend: DB = CURRENT_DB_COUNT before this sweep · RAW = raw candidates surfaced · NET NEW = distinct new candidates after excluding exact DB matches and same-session cross-locality duplicates · GAP = NET NEW / (DB + NET NEW)

| Locality | DB | Sources used | RAW | NET NEW | GAP | Notes |
|---|---|---|---|---|---|---|
| בית ג'ן | 0 | Google, B144 | 1 | 1 | 100% | Dapei Zahav (dunsguide.co.il) **SOURCE_RESTRICTED** (HTTP 403) |
| באקה אל-גרביה | 2 | Google, B144 | 4 | 4 | 67% | 2 Abu Tarek listing variants flagged `POSSIBLE_DUPLICATE` of each other |
| אום אל-פחם | 1 | Google, B144, Dapei Zahav | 5 | 5 | 83% | סירמקס גלרי — strong ceramics-specific candidate |
| חדרה | 9 | Google, B144 | 3 | 1 | 10% | 1 clean new (קשת בענן); "חן ניסים קרמיקה" flagged `NEEDS_REVIEW` vs existing "חן קרמיקה"; "אברהם קראדי ובניו" **resolved as NOT a Hadera business** — confirmed via Or Akiva's own B144 listing (address ההדס 23) that this is the same already-listed Or Akiva record bleeding into Hadera search results |
| כפר יאסיף | 0 | Google, B144 | 3 | 2 | 100%* | "שריף הזימה בע\"מ" flagged `POSSIBLE_DUPLICATE`/multi-branch — same name now seen under **3 different localities** (Abu Snan existing DB record, Kafr Yasif, and Tamra) — see cross-cutting duplicates section |
| ערערה — וואדי ערה (Triangle) | 0 | Google, B144 | 1 | 1 | 100% | ⚠️ Name-collision caught: unqualified search returns Ar'ara BaNegev (different locality); needed explicit exclusion |
| קלנסווה | 1 | Google, B144, Easy | 3 | 3 | 75% | |
| טייבה | 0 | Google, B144 | 2 | 2 | 100% | |
| ירכא | 4 | Google, B144 | 3 | 1 | 20% | "מולא עאמר" likely same business as existing "עמאר מולא ובניו" — `POSSIBLE_DUPLICATE` |
| אבו סנאן | 1 | Google, B144 | 2 | 0 | 0% | Both results confirm/corroborate the existing record (2nd-source upgrade for Pass 2), no new name |
| נהריה | 0 | Google, B144 | 4 | 4 | 100% | All general "building materials" — ceramic/sanitary relevance not yet confirmed |
| שלומי | 0 | Google, B144 | 3 | 3 | 100% | "גליל קרמיקה" — ceramics-specific |
| כרמיאל | 7 | Google, B144 | 5 | 2 | 22% | 2 exact DB matches, 1 excluded as `OUT_OF_SCOPE` (רדימיקס — ready-mix concrete manufacturer, not a ceramics/sanitary retailer) |
| טמרה (Tamra) | 1 | Google, B144 (direct fetch) | 7 | 3 | 75% | "סיגמא טופ" — sink **manufacturer**, valuable find; "רויאל קרמיקה" and "סאייג ובניו" flagged cross-locality duplicates (also seen in Carmiel / Nazareth-Nof HaGalil) |
| שפרעם | 2 | Google, B144 | 4 | 1 | 33% | |
| נצרת | 3 | Google, B144 | 1 | 1 | 25% | |
| נוף הגליל | 3 | Google, B144 | 2 | 1 | 25% | |
| סח'נין | 7 | Facebook, Instagram | 2 | 0 | 0% | Both Instagram results **corroborate existing records** (אקספו קרמיקה; מ.דוכי) — good Pass-2 evidence, no new discovery — locality looks genuinely near-saturated |
| עראבה | 2 | Google, B144 (direct fetch) | 10 | ~6 | 75% | General "building materials" category — ceramic/sanitary relevance **not yet confirmed** for any; 1 result was actually a Kafr Kanna listing bleeding in (excluded), "עץ המחלף" cross-listed with Kafr Qara |
| כפר מנדא | 3 | Google, B144, Dapei Zahav | 2 | 1 | 25% | 1 result corroborated existing record via 2nd source |
| עכסל (Iksal) | 0 | Google, B144 | 0 | 0 | — | **SEARCH FAILURE** — no locality-specific results surfaced at all; needs a different query strategy next round (pure Arabic script, alternate transliteration, or direct municipal source) |
| יפיע | 2 | Google, B144 | 5 | 3 | 60% | |
| כפר כנא | 1 | Google, B144 | 3 | 2 | 67% | "עבד אל האדי" — same surname pattern as a Yafia candidate, likely a related but distinct family business |
| אום אל-פחם | — | — | — | — | — | (see above, session 1) |
| ערערה | — | — | — | — | — | (see above, session 1) |
| כפר קרע | 2 | Google, B144 (direct fetch) | 11 | ~7 | 78% | General "building materials" — relevance not yet confirmed; "השלום חומרי בניין" flagged `NEEDS_REVIEW` — same generic name as the Beit Jann candidate, likely coincidental (different regions) not the same business |
| ג'ת (Jatt) | 0 | Google, B144, t.co.il | 1 | 1 | 100% | ⚠️ **Search failure resolved**: two attempts returned only "קריית גת" (a different, southern city) — only succeeded once the query explicitly added "המשולש" (Triangle) and excluded "קרית/קריית גת" |
| טירה | 5 | Google, B144 | 1 | 1 | 17% | |
| פרדס חנה-כרכור | 0 | Google, B144 | 1 | 1 | 100% | |
| אור עקיבא | 3 | Google, B144 | 1 | 0 | 0% | Confirms/closes the Hadera cross-listing (see above) — no new candidate |
| נתניה | 11 | Google, B144 | 4 | 1 | 8% | "אלוני — נתניה" new (matches existing chain-branch naming pattern used elsewhere); "גולדן ברזים וקרמיקה סנטר" flagged `POSSIBLE_DUPLICATE` — identical name to an existing Tira record |

\* Kafr Yasif's 100% gap uses NET NEW=2 (excluding the flagged Sherif Al-Hzaimah duplicate) against DB=0.

## Cross-cutting duplicate flags (do not resolve automatically — Pass 2 required)

1. **"שריף הזימה" (Sherif Al-Hzaimah)** — same/similar name surfaced under **Abu Snan** (existing DB record), **Kafr Yasif**, and **Tamra**. Most-duplicated name in this sweep. Could be one family business with a wide service area being cross-listed by directories, or 2-3 real distinct relatives' businesses. Needs direct verification (address + phone per location) before any merge or multi-branch decision.
2. **"רויאל קרמיקה וכלים סנטריים" (Royal Ceramics)** — identical listing text surfaced under both **Carmiel** and **Tamra** category pages.
3. **"סאייג ובניו בע\"מ — יבואני קרמיקה ושיש"** — appears (correctly, as an importer) across **Nazareth**, **Nof HaGalil**, and **Tamra** category pages. Likely a single importer with wide distribution reach rather than 3 branches — flag for Pass 2 to confirm actual base location(s).
4. **"עץ המחלף בע\"מ"** — appears under both **Arraba** and **Kafr Qara** category pages — same cross-listing pattern.
5. **"גולדן ברזים וקרמיקה סנטר"** — identical name under both existing **Tira** DB record and this round's **Netanya** discovery — needs a locality check (may be 2 branches, or a directory error).
6. **"מולא עאמר" / "עמאר מולא ובניו"** (Yarka) — likely the same business with name-order variation between two directory listings.
7. **"החומרי בניין השלום" / "השלום חומרי בניין"** (Beit Jann vs. Kafr Qara) — same generic name, different regions — likely **coincidental**, not the same business, but flagged for a quick sanity check.
8. **Abu Tarek listing variants** (Baqa al-Gharbiyye) — 2 B144 listings for what looks like one business under slightly different legal-name formatting.

## Locality-name disambiguation log

- **Ar'ara — Wadi Ara/Triangle** vs. **Ar'ara BaNegev**: distinct places, confirmed collision, resolved by excluding "בנגב" from the query.
- **Jatt (ג'ת, Triangle)** vs. **Kiryat Gat (קריית גת)**: distinct places; unqualified "ג'ת" searches returned only Kiryat Gat results twice. Resolved by adding "המשולש" (Triangle) and excluding "קרית/קריית גת" explicitly.
- **Beit Jann (בית ג'ן)** vs. **Beit Jamal (בית ג'מאל)**: a monastery complex with an unrelated name, surfaced once as search noise — not a real collision risk (very different names), but noted since a first-pass reader might confuse them.

## Search failures / source blockers

- **Iksal (עכסל)**: zero locality-specific candidates found across 2 source families tried. Genuine `SEARCH_FAILURE_SIGNAL` — needs investigation next round (try Arabic script directly, alternate Hebrew spelling "אכסאל", or a direct B144/municipal category URL rather than a blended query).
- **dunsguide.co.il**: returned HTTP 403 on the one URL tried (Beit Jann). Not bypassed. Other Dapei Zahav (d.co.il) URLs worked fine, so this appears to be dunsguide.co.il specifically, not the whole source family.

## Source families actually exercised this session

Used across the full sweep: **Google Search** (via WebSearch), **B144** (search + direct category-page fetches — direct fetches were far more productive than relying on search-result summaries), **Dapei Zahav** (d.co.il), **Easy**, **Facebook + Instagram** (tried specifically for Sakhnin — corroborated 2 existing records, found 0 new).

**Still not used this session**: Google Maps place search, Waze, manufacturer/importer dealer-list crawling (beyond incidental mentions), municipal business directories, industrial-zone directories. These remain open — likely to raise candidate counts further, especially for the localities currently showing 0-1 net-new.

## Totals for this session (Session 2 — 21 localities)

- Localities swept: Yarka, Abu Snan, Nahariya, Shlomi, Carmiel, Tamra, Shefa-Amr, Nazareth, Nof HaGalil, Sakhnin, Arraba, Kafr Manda, Iksal (failed), Yafia, Kafr Kanna, Kafr Qara, Jatt, Tira, Pardes Hanna-Karkur, Or Akiva, Netanya
- Net-new candidates this session: **~39**
- Cross-locality duplicates flagged this session: 6 (see above)
- Search failures this session: 1 (Iksal)
- Restricted sources this session: 0 new (dunsguide.co.il already logged in session 1)

## Grand totals (Session 1 + Session 2 combined)

```
LOCALITIES SWEPT THIS SESSION: 21 (session 2) — 9 in session 1 — 30 locality-attempts total,
  29 DISTINCT NAMED LOCALITIES (Jatt attempted in both sessions: failed → resolved)

TOTAL PRIORITY LOCALITIES SWEPT: 29 / 29 named in the Pass 1A list
PRIORITY LOCALITIES REMAINING: 0 from the named list
  (geography-master expansion BEYOND the named list has not started — see Next Steps)

CANDIDATES BEFORE (session 1 start): 0 discovery-pool candidates (production DB only, 280 records)
CANDIDATES AFTER (this checkpoint): ~59 net-new DISCOVERED_UNVERIFIED candidates
  (~20 from session 1 + ~39 from session 2), before Pass-2 dedup resolution
NET NEW CANDIDATES: ~59

BY SOURCE (approximate, both sessions):
  Google Search:      ~30 locality searches run
  B144:                dominant source — surfaced the large majority of candidates,
                        both via search-result titles and direct category-page fetches
  Dapei Zahav:          3 direct hits (Umm al-Fahm, Kafr Manda x2)
  Easy:                 1 direct hit (Qalansuwa)
  Facebook/Instagram:   tried for Sakhnin only — 0 new, 2 corroborations
  Google Maps:          not used (no direct Maps API access — B144/directory results
                        substitute partially but are not equivalent)
  Waze:                 not used
  Dealer lists:         not deliberately used this round (some importer names surfaced
                        incidentally, e.g. Sayegh & Sons)
  Municipal:            not used
  Industrial zones:     not used as a separate search axis (some candidates are
                        incidentally in industrial zones per their listed address)

BY REGION: all candidates this pass are in the NORTH/SHARON commercial regions
  (Galilee, Triangle, Wadi Ara, Carmiel/Karmiel area, Netanya/Sharon coast)

TOP LOCALITIES BY NET-NEW CANDIDATE COUNT:
  1. אום אל-פחם — 5
  2. נהריה — 4
  3. באקה אל-גרביה — 4
  4. כפר קרע — ~7 (highest raw count, pending relevance confirmation)
  5. עראבה — ~6 (pending relevance confirmation)
  6. שלומי — 3
  7. יפיע — 3
  8. קלנסווה — 3
  9. טמרה — 3
  10. כפר יאסיף — 2 (net of dup)
  11. כפר כנא — 2
  12. כרמיאל — 2
  13. טייבה — 2
  (remaining localities: 0-1 net-new each)

LOCALITIES WITH SURPRISINGLY LOW / ZERO NET-NEW COUNTS:
  - עכסל (Iksal) — 0, genuine search failure, needs different approach
  - סח'נין — 0 new but well-corroborated, likely near-saturated (DB already had 7)
  - אבו סנאן — 0 new, likely near-saturated (existing record corroborated twice)
  - אור עקיבא — 0 new, existing coverage (3) appears accurate/complete for what's been tried

SEARCH FAILURES / SOURCE BLOCKERS:
  - עכסל: 0 results after 2 source families — unresolved
  - dunsguide.co.il: HTTP 403 on Beit Jann — unresolved, other sources substituted

AMBIGUOUS LOCALITIES FOUND: 2 confirmed collisions
  (Ar'ara Triangle vs. Ar'ara BaNegev; Jatt Triangle vs. Kiryat Gat)

POSSIBLE DUPLICATES: 8 flagged (listed in full above), none resolved/merged —
  all held for Pass 2

PASS-1 SATURATION STATUS: NOT saturated overall. High-population/urban localities
  (Umm al-Fahm, Nahariya, Baqa al-Gharbiyye, Kafr Qara, Arraba) are still producing
  strong new-candidate rates even from just 2 source families (Google+B144) — Facebook/
  Instagram/Maps/Waze/dealer-lists/municipal have barely been touched and would likely
  raise these further. Only Abu Snan, Sakhnin, and Or Akiva show signs of approaching
  saturation (multiple sources, low/zero new names) — but even these have not had the
  full 13-source-family treatment yet.
```

## Next steps (Pass 1 continuation — NOT Pass 2)

1. Investigate the Iksal search failure with an alternate strategy.
2. Retry dunsguide.co.il for Beit Jann via an alternate access path, or accept as permanently restricted.
3. Add Facebook/Instagram discovery for the localities that showed strong candidate counts but haven't had social-media search yet (Umm al-Fahm, Baqa al-Gharbiyye, Nahariya, Kafr Qara, Arraba are the highest-value targets given their current recall rates).
4. Add Google Maps / Waze discovery where accessible.
5. Expand beyond the named 29-locality list using the geography master (per the original brief) — the North/Triangle/Wadi Ara area has been the focus so far; Center, Jerusalem, South, Sharon-Haifa still need their own dedicated Pass 1 sweeps beyond what was already spot-checked in the earlier session.
6. Only after further saturation — begin Pass 2 verification and dedup resolution, starting with the 8 flagged duplicate clusters.

**Pass 2 has not begun. The live database (`index.html`, 280 records) is unchanged this session.**
