# Ceramics Promotion Plan

## Safe candidate set

24 pilot records currently meet the mechanical promotion gate: CORE_RELEVANT, confidence at least 7, usable identity/locality, public source evidence, and no explicit hard duplicate/review/out-of-scope status. This is an approval set, not an automatic production write.

## Before promotion

1. Human-review every candidate against the live 280, including branches and transliteration variants.
2. Confirm current physical locality and at least one active public commercial source.
3. Convert multi-category arrays into the existing UI's compatible presentation without discarding source evidence.
4. Enrich existing records only from source-backed fields; never replace a stronger value with a weaker one.

## Duplicate and branch handling

Exact duplicates may be collapsed only when identity and physical branch match. Same legal entity at different locations remains separate. Uncertain matches remain review-only.

## UI preservation and rollback

Promotion will patch only the existing businesses array inside the authoritative HTML and preserve layout, filters and scripts. Before any authorized promotion, capture the file hash and a timestamped backup; validate counts and rendering; rollback by restoring that exact backup. No promotion is authorized in this session.
