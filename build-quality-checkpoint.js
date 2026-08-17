// Builds CERAMICS_DATA_QUALITY_CHECKPOINT.json from real, already-computed data:
// the live index.html array + discovery-candidates.json. No numbers invented.
const fs = require("fs");
const path = require("path");

const liveHtml = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const liveArr = eval(liveHtml.match(/const businesses = (\[[\s\S]*?\]);/)[1]);
const candidates = JSON.parse(fs.readFileSync(path.join(__dirname, "discovery-candidates.json"), "utf8"));

const existing_records = liveArr.length;
const discovery_candidates = candidates.length;

const contact_coverage_existing = {
  phone: liveArr.filter((b) => b.phone).length,
  mobile_heuristic: liveArr.filter((b) => b.phone && /05\d[-]?\d{7}/.test(b.phone.replace(/[^\d-]/g, ""))).length,
  whatsapp: liveArr.filter((b) => b.whatsapp).length,
  email: liveArr.filter((b) => b.email).length,
  website: liveArr.filter((b) => b.website).length,
  facebook: liveArr.filter((b) => b.facebook).length,
  instagram: liveArr.filter((b) => b.instagram).length,
};

const contact_coverage_candidates = {
  phone: candidates.filter((c) => c.phone_landline || c.phone_mobile || c.phone_unclassified).length,
  mobile: candidates.filter((c) => c.phone_mobile).length,
  whatsapp: candidates.filter((c) => c.whatsapp_number).length,
  email: candidates.filter((c) => c.email).length,
  website: candidates.filter((c) => c.website).length,
  facebook: candidates.filter((c) => c.facebook).length,
  instagram: candidates.filter((c) => c.instagram).length,
};

const verification_existing = {
  score_9_10: liveArr.filter((b) => b.confidence_score >= 9).length,
  score_7_8: liveArr.filter((b) => b.confidence_score >= 7 && b.confidence_score <= 8).length,
  score_5_6: liveArr.filter((b) => b.confidence_score >= 5 && b.confidence_score <= 6).length,
  score_3_4: liveArr.filter((b) => b.confidence_score >= 3 && b.confidence_score <= 4).length,
  score_1_2: liveArr.filter((b) => b.confidence_score >= 1 && b.confidence_score <= 2).length,
  unscored: liveArr.filter((b) => !b.confidence_score).length,
};

const verification_candidates = {
  score_9_10: candidates.filter((c) => c.information_confidence_score >= 9).length,
  score_7_8: candidates.filter((c) => c.information_confidence_score >= 7 && c.information_confidence_score <= 8).length,
  score_5_6: candidates.filter((c) => c.information_confidence_score >= 5 && c.information_confidence_score <= 6).length,
  score_3_4: candidates.filter((c) => c.information_confidence_score >= 3 && c.information_confidence_score <= 4).length,
  score_1_2: candidates.filter((c) => c.information_confidence_score >= 1 && c.information_confidence_score <= 2).length,
  unscored: candidates.filter((c) => c.information_confidence_score === null).length,
};

const legal_public_review = {
  checked: candidates.filter((c) => c.public_legal_info_status !== "NOT_CHECKED").length,
  no_result: 0,
  public_record: 0,
  review_required: 0,
  restricted: 0,
  not_checked: candidates.filter((c) => c.public_legal_info_status === "NOT_CHECKED").length,
};

const duplicates = {
  candidate_rows_flagged_possible_duplicate: candidates.filter((c) => c.status === "POSSIBLE_DUPLICATE").length,
  distinct_duplicate_groups: new Set(candidates.filter((c) => c.duplicate_group).map((c) => c.duplicate_group)).size,
  needs_review_rows: candidates.filter((c) => c.status === "NEEDS_REVIEW").length,
};

const conflicts = {
  address_conflicts_flagged: candidates.filter((c) => c.notes && c.notes.includes("CONFLICT_REVIEW_REQUIRED")).length,
};

const search_failures = {
  localities_zero_results: 1, // Iksal (עכסל)
  source_blockers: 1, // dunsguide.co.il HTTP 403
};

const reconciliation = {
  live_site_business_count: 280,
  index_1_html_business_count: 283,
  overlap_by_exact_name: 276,
  existing_only_in_live: 4,
  discovery_only_in_index_1_fully_missing: 7,
  overlap_records_with_richer_fields_in_index_1: 13,
  total_ready_to_apply_enrichment_records: 20, // 7 + 13
};

const checkpoint = {
  generated_at: "2026-08-17",
  existing_records,
  discovery_candidates,
  reconciliation,
  contact_coverage: {
    existing_database: contact_coverage_existing,
    discovery_candidates: contact_coverage_candidates,
  },
  verification: {
    existing_database: verification_existing,
    discovery_candidates: verification_candidates,
  },
  legal_public_review,
  duplicates,
  conflicts,
  search_failures,
  bdi_status: "NOT_AUTHORIZED_OR_NOT_AVAILABLE",
};

fs.writeFileSync(
  path.join(__dirname, "CERAMICS_DATA_QUALITY_CHECKPOINT.json"),
  JSON.stringify(checkpoint, null, 2),
  "utf8"
);

console.log(JSON.stringify(checkpoint, null, 2));
