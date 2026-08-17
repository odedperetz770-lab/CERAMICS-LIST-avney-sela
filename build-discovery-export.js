// Compiles every Pass-1 discovery candidate (both sweep sessions, 2026-08-17)
// into discovery-candidates.json / .csv, using the expanded handoff schema.
// Source: DISCOVERY_SWEEP_REPORT.md + a small bounded enrichment pass on 3
// LIKELY_RELEVANT candidates. No missing fields are invented — absent data is null.
const fs = require("fs");
const path = require("path");

const DATE = "2026-08-17";
const REGION_NORTH = "צפון";
const REGION_SHARON = "שרון/חיפה";

let seq = 0;
const id = () => "CAND-" + String(++seq).padStart(3, "0");

const FIELDS = [
  "candidate_id", "candidate_name", "normalized_name", "locality", "locality_code", "region",
  "category_guess", "discovery_source", "source_url",
  "phone_landline", "phone_mobile", "phone_unclassified", "whatsapp_number", "whatsapp_source_url",
  "email", "email_source_url",
  "website", "facebook", "instagram", "tiktok",
  "address",
  "public_contact_name", "public_contact_role", "contact_source",
  "company_id_if_publicly_verified", "legal_entity_name_if_publicly_verified",
  "brands_if_visible",
  "status", "duplicate_flag", "duplicate_group",
  "information_confidence_score", "information_confidence_explanation",
  "public_legal_info_status",
  "last_checked_at", "notes",
];

const c = (obj) => {
  const row = {
    candidate_id: id(),
    candidate_name: obj.name,
    normalized_name: obj.name.replace(/\s*בע"מ\s*$/, "").replace(/\s*\([^)]*\)\s*$/, "").trim(),
    locality: obj.locality,
    locality_code: null,
    region: obj.region || REGION_NORTH,
    category_guess: obj.category_guess || "building_materials",
    discovery_source: obj.source,
    source_url: obj.url || null,
    phone_landline: obj.phoneLandline || null,
    phone_mobile: obj.phoneMobile || null,
    phone_unclassified: obj.phoneUnclassified || null,
    whatsapp_number: obj.whatsapp || null,
    whatsapp_source_url: obj.whatsappSource || null,
    email: obj.email || null,
    email_source_url: obj.emailSource || null,
    website: obj.website || null,
    facebook: obj.facebook || null,
    instagram: obj.instagram || null,
    tiktok: null,
    address: obj.address || null,
    public_contact_name: null,
    public_contact_role: null,
    contact_source: null,
    company_id_if_publicly_verified: null,
    legal_entity_name_if_publicly_verified: null,
    brands_if_visible: obj.brands || null,
    status: obj.status,
    duplicate_flag: !!obj.dupGroup,
    duplicate_group: obj.dupGroup || null,
    information_confidence_score: obj.confScore != null ? obj.confScore : null,
    information_confidence_explanation: obj.confExplain || null,
    public_legal_info_status: "NOT_CHECKED",
    last_checked_at: obj.enriched ? DATE : null,
    notes: obj.notes || null,
  };
  return row;
};

const candidates = [
  // ===== Beit Jann =====
  c({ name: "חומרי בניין השלום", locality: "בית ג'ן", source: "B144", url: "https://www.b144.co.il/b144_sip/401C041341726C5B48140317/", status: "DISCOVERED_UNVERIFIED", notes: "Category on B144 is general building materials; ceramic/sanitary relevance not yet confirmed." }),

  // ===== Baqa al-Gharbiyye =====
  c({ name: "חומרי בנין אבו טארק בע\"מ", locality: "באקה אל-גרביה", source: "B144", url: "https://www.b144.co.il/b144_sip/481404134470655D4C1400164377615D49/", status: "POSSIBLE_DUPLICATE", dupGroup: "abu-tarek-baqa", notes: "Two B144 listing variants for what looks like the same business." }),
  c({ name: "חומרי בניין אבו טארק-עדנאן נעאמנה", locality: "באקה אל-גרביה", source: "B144", url: "https://www.b144.co.il/b144_sip/481404134470655D4D12061B4673665B/", status: "POSSIBLE_DUPLICATE", dupGroup: "abu-tarek-baqa" }),
  c({ name: "ותד וג'יה חסן (חומרי בנין)", locality: "באקה אל-גרביה", source: "B144", url: "https://www.b144.co.il/b144_sip/4D140413447065544A11001B/", status: "DISCOVERED_UNVERIFIED" }),
  c({ name: "ברזל ובניין מואסי", locality: "באקה אל-גרביה", source: "B144", url: "https://www.b144.co.il/b144_sip/401C0413407260554114061B/", status: "NEEDS_REVIEW", notes: "Surname \"מואסי\" matches existing DB record \"המרכז קרמיקה מואסי — באקה\" — possibly related family business, not confirmed same entity." }),
  c({ name: "א.עתאמנה ובניו בע\"מ", locality: "באקה אל-גרביה", source: "B144", url: "https://www.b144.co.il/b144_sip/401C041340746C5840140113/", status: "DISCOVERED_UNVERIFIED" }),

  // ===== Umm al-Fahm =====
  c({ name: "חומרי בניין בית המקצוען", locality: "אום אל-פחם", source: "B144", url: "https://www.b144.co.il/b144_sip/401D0D1A4370655D4A110C1042/", status: "DISCOVERED_UNVERIFIED" }),
  c({ name: "חומרי בניין אבו סמי ובניו", locality: "אום אל-פחם", source: "B144", url: "https://www.b144.co.il/b144_sip/401C04134073655B4A160617/", status: "DISCOVERED_UNVERIFIED" }),
  c({
    name: "סירמקס גלרי בע\"מ", locality: "אום אל-פחם", source: "B144 + Google (enriched)", url: "https://www.b144.co.il/b144_sip/401D0D1A4370655D4C1403164D/",
    status: "LIKELY_RELEVANT", category_guess: "ceramics_porcelain_sanitaryware",
    address: "שכונת אלקואס 12, אום אל-פחם",
    confScore: 5, confExplain: "5/10 — business existence and address (אלקואס 12) confirmed via B144 with a specific street address; B144 page indicates WhatsApp/email/Facebook contact options exist but exact values were not extracted in this pass (not directly visible in the fetched summary) — needs a direct page fetch or Facebook search to complete.",
    enriched: true,
    notes: "Described as porcelain tiles, showers, jacuzzis, bathroom cabinets, sanitary ware, faucets — strong category match. Phone/WhatsApp/email/Facebook URL not yet extracted — B144 page reportedly has these but values weren't captured.",
  }),
  c({ name: "חומרי בניין מ.ר.מ.ר", locality: "אום אל-פחם", source: "Dapei Zahav", url: "https://www.d.co.il/80136110/16080/", status: "DISCOVERED_UNVERIFIED" }),
  c({ name: "אחמד יוסף מחמוד חומרי בנין בע\"מ", locality: "אום אל-פחם", source: "Dapei Zahav", url: "https://www.d.co.il/41397050/16080/", status: "DISCOVERED_UNVERIFIED" }),

  // ===== Hadera =====
  c({ name: "קשת בענן", locality: "חדרה", source: "Google/B144", url: null, status: "DISCOVERED_UNVERIFIED", notes: "Described as leading building materials/tools store offering ceramics, granite porcelain, sanitary ware, showers. Exact B144 listing URL not captured during search-summary pass." }),
  c({ name: "חן ניסים קרמיקה", locality: "חדרה", source: "Google/B144", url: null, status: "NEEDS_REVIEW", notes: "Possible name variant/duplicate of existing DB record \"חן קרמיקה בע\"מ\" (Hadera) — not confirmed same or different entity." }),

  // ===== Kafr Yasif =====
  c({ name: "שריף הזימה בע\"מ", locality: "כפר יאסיף", source: "B144", url: "https://www.b144.co.il/b144_sip/401C041341756C594B1C001B/", status: "POSSIBLE_DUPLICATE", dupGroup: "sherif-hzaimah", notes: "Same/similar name also surfaced under Abu Snan (matches existing DB record 'קרמיקה שריף הזימה') and Tamra — most-duplicated name in this sweep, needs address/phone verification per locality." }),
  c({ name: "הזימה מופיד חומרי בניין", locality: "כפר יאסיף", source: "B144", url: "https://www.b144.co.il/b144_sip/401C04134079665549150517/", status: "NEEDS_REVIEW", notes: "Same surname family as Sherif Hzaimah — possibly related, not confirmed same business." }),
  c({ name: "דאוד אליאס נמר", locality: "כפר יאסיף", source: "B144", url: "https://www.b144.co.il/b144_sip/401C041340726C5540150610/", status: "DISCOVERED_UNVERIFIED" }),

  // ===== Ar'ara — Wadi Ara / Triangle =====
  c({
    name: "מוואסי - קרמיקה עארה", locality: "ערערה (וואדי ערה)", source: "B144 + official website mowassi.co.il (enriched)",
    url: "https://www.b144.co.il/b144_sip/401C04134073655949160115/", website: "https://mowassi.co.il/",
    phoneLandline: "04-6666665", phoneMobile: "054-7576797", email: "OFFICE@mowassi.co.il",
    emailSource: "https://mowassi.co.il/contact-us/", facebook: "https://facebook.com/ceramicamowassi",
    status: "LIKELY_RELEVANT", category_guess: "ceramics", confScore: 6,
    confExplain: "6/10 — official website contact page confirms phone, mobile/customer-service line, email, and Facebook page (strong single-source evidence). Score held below 7 because of an unresolved ADDRESS_CONFLICT: B144 lists this business under Ar'ara, while a separate t.co.il listing for a similarly-named 'Mowassi Ceramics' shows Baqa al-Gharbiyye — could be the same business with unclear locality, or two related family businesses in neighboring Wadi Ara towns.",
    enriched: true,
    notes: "CONFLICT_REVIEW_REQUIRED: locality is genuinely uncertain between Ar'ara and Baqa al-Gharbiyye across sources — do not assign confidently to one locality without further check. Official contact details (phone/mobile/email/Facebook) are solid regardless of which town.",
  }),

  // ===== Qalansuwa =====
  c({ name: "ג. אל-חסאן (חומרי בניין)", locality: "קלנסווה", source: "B144", url: "https://www.b144.co.il/b144_sip/401C04134676665948110511.aspx", status: "DISCOVERED_UNVERIFIED" }),
  c({ name: "חומרי בניין רבוס בע\"מ", locality: "קלנסווה", source: "B144", url: "https://www.b144.co.il/b144_sip/401C0413407960554D120613/", status: "DISCOVERED_UNVERIFIED" }),
  c({ name: "חומרי בנין ג'יוסי", locality: "קלנסווה", source: "Easy", url: "https://easy.co.il/page/3458083", address: "אל קודס 18, קלנסווה", status: "DISCOVERED_UNVERIFIED" }),

  // ===== Tayibe =====
  c({ name: "חומרי בנין אלאמיר", locality: "טייבה", source: "B144", url: "https://www.b144.co.il/b144_sip/401C04134175605F4D110513/", status: "DISCOVERED_UNVERIFIED" }),
  c({ name: "אוקינוס חומרי בנין", locality: "טייבה", source: "B144", url: "https://www.b144.co.il/b144_sip/401C0413407865544A12021A/", status: "DISCOVERED_UNVERIFIED" }),

  // ===== Yarka =====
  c({ name: "מולא עאמר (חנות לחומרי בניין)", locality: "ירכא", source: "B144", url: "https://www.b144.co.il/b144_sip/401C041340756C5B4D1C0716/", status: "POSSIBLE_DUPLICATE", dupGroup: "mula-amer-yarka", notes: "Likely same business as existing DB record \"קרמיקה עמאר מולא ובניו\" (name-order variant)." }),
  c({ name: "מעדי נוהאד אמין", locality: "ירכא", source: "B144", url: "https://www.b144.co.il/b144_sip/4d1404134470635c4f13001b/", status: "NEEDS_REVIEW", notes: "Family-name pattern (\"מועדי\"/\"מעדי\") matches existing DB record \"מועדי בית הקרמיקה בע\"מ\" — possibly related, not confirmed same." }),

  // ===== Abu Snan =====
  c({ name: "הזימה שריף (חומרי בנין)", locality: "אבו סנאן", source: "B144", url: "https://www.b144.co.il/b144_sip/401C04134079665A4F140D12/", status: "POSSIBLE_DUPLICATE", dupGroup: "sherif-hzaimah", notes: "Corroborates existing DB record \"קרמיקה שריף הזימה\" (Abu Snan) — same duplicate cluster as the Kafr Yasif and Tamra sightings of this name." }),

  // ===== Nahariya =====
  c({ name: "ב.נ.י.ר. חומרי בנין בע\"מ", locality: "נהריה", source: "B144", url: "https://www.b144.co.il/b144_sip/401C0413417564594B12061B/", status: "DISCOVERED_UNVERIFIED" }),
  c({ name: "וייס משה חומרי בנין וצבע", locality: "נהריה", source: "B144", url: "https://www.b144.co.il/b144_sip/401C04134079665549140D13/", status: "DISCOVERED_UNVERIFIED" }),
  c({ name: "אריאל יעקב - חומרי בניין", locality: "נהריה", source: "B144", url: "https://www.b144.co.il/b144_sip/401C04134072605D41170010/", status: "DISCOVERED_UNVERIFIED" }),
  c({ name: "לטש חומרי בניין", locality: "נהריה", source: "B144", url: "https://www.b144.co.il/b144_sip/401c04134170655d4d1d0d17/", status: "DISCOVERED_UNVERIFIED" }),

  // ===== Shlomi =====
  c({ name: "פלס חומרי בניין", locality: "שלומי", source: "B144", url: "https://www.b144.co.il/b144_sip/4A1404134470655D49100D1A4074665541/", status: "DISCOVERED_UNVERIFIED" }),
  c({ name: "חומרי בנין עמיאלי", locality: "שלומי", source: "B144", url: "https://www.b144.co.il/b144_sip/401C04134176645E4A140315/", status: "DISCOVERED_UNVERIFIED" }),
  c({
    name: "גליל קרמיקה", locality: "שלומי", source: "B144 + Google (enriched)", url: "https://www.b144.co.il/b144_sip/401C04134172605D481C0C16/",
    phoneMobile: "053-531-4900", email: "galilkarmica@hotmail.com", facebook: "https://www.facebook.com/galilceramics/",
    instagram: "https://www.instagram.com/galil.ceramica/",
    status: "NEEDS_REVIEW", category_guess: "ceramics",
    confScore: 3, confExplain: "3/10 — real contact details found (mobile, email, Facebook, Instagram) but ADDRESS_CONFLICT: B144 attributes this business to Shlomi, while a separate general web search places it in Rosh Pina (Tzachar industrial area) — a different, non-adjacent town. Could be a locality-attribution error on one side, or two different businesses with similar names.",
    enriched: true,
    notes: "CONFLICT_REVIEW_REQUIRED: do not assign to Shlomi with confidence until the Rosh Pina address is checked against the B144 Shlomi listing directly.",
  }),

  // ===== Carmiel =====
  c({ name: "כלבו לבניין - סלומון אידל", locality: "כרמיאל", source: "B144", url: "https://www.b144.co.il/b144_sip/401C041340786C594A120C13/", status: "DISCOVERED_UNVERIFIED" }),
  c({ name: "רויאל קרמיקה וכלים סנטריים", locality: "כרמיאל", source: "B144", url: "https://www.b144.co.il/b144_sip/4A1404134470655D4C100C134571665441/", status: "POSSIBLE_DUPLICATE", dupGroup: "royal-ceramics", notes: "Identical listing also surfaced under Tamra — likely one business cross-listed, not two branches (unconfirmed)." }),
  c({ name: "רדימיקס תעשיות, סניף כרמיאל", locality: "כרמיאל", source: "B144", url: "https://www.b144.co.il/b144_sip/401C0413407567554A130114/", status: "OUT_OF_SCOPE", category_guess: "ready_mix_concrete", notes: "Ready-mix concrete manufacturer, not a ceramics/sanitaryware retailer." }),

  // ===== Tamra =====
  c({ name: "סיגמא טופ - מפעל לייצור כיורים", locality: "טמרה", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%A7%D7%A8%D7%9E%D7%99%D7%A7%D7%94/%D7%98%D7%9E%D7%A8%D7%94/", status: "LIKELY_RELEVANT", category_guess: "sink_manufacturer", notes: "Sink manufacturing factory — potential manufacturer/dealer-list angle for Pass 2." }),
  c({ name: "שיש טמרה", locality: "טמרה", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%A7%D7%A8%D7%9E%D7%99%D7%A7%D7%94/%D7%98%D7%9E%D7%A8%D7%94/", status: "DISCOVERED_UNVERIFIED", category_guess: "stone_marble" }),
  c({ name: "מ.ו.ב.ה. קרמיקה בע\"מ", locality: "טמרה", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%A7%D7%A8%D7%9E%D7%99%D7%A7%D7%94/%D7%98%D7%9E%D7%A8%D7%94/", status: "DISCOVERED_UNVERIFIED" }),
  c({ name: "רויאל קרמיקה וכלים סנטריים", locality: "טמרה", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%A7%D7%A8%D7%9E%D7%99%D7%A7%D7%94/%D7%98%D7%9E%D7%A8%D7%94/", status: "POSSIBLE_DUPLICATE", dupGroup: "royal-ceramics" }),
  c({ name: "קרמיקה שריף הזימה", locality: "טמרה", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%A7%D7%A8%D7%9E%D7%99%D7%A7%D7%94/%D7%98%D7%9E%D7%A8%D7%94/", status: "POSSIBLE_DUPLICATE", dupGroup: "sherif-hzaimah" }),
  c({ name: "סאייג ובניו בע\"מ יבואני קרמיקה ושיש", locality: "טמרה", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%A7%D7%A8%D7%9E%D7%99%D7%A7%D7%94/%D7%98%D7%9E%D7%A8%D7%94/", phoneMobile: "052-7875500", status: "POSSIBLE_DUPLICATE", dupGroup: "sayegh-sons-importer", notes: "Same importer also cross-listed under Nazareth and Nof HaGalil category pages — likely one importer with wide reach, not 3 branches." }),

  // ===== Shefa-Amr =====
  c({ name: "חומרי בניין נור סועד", locality: "שפרעם", source: "B144", url: "https://www.b144.co.il/b144_sip/4A1404134470655D4910021341766C554F/", status: "DISCOVERED_UNVERIFIED" }),

  // ===== Nazareth =====
  c({ name: "עטייה מול בע\"מ", locality: "נצרת", source: "B144", url: "https://www.b144.co.il/b144_sip/4D1404134470645F40120611/", status: "DISCOVERED_UNVERIFIED" }),

  // ===== Nof HaGalil =====
  c({ name: "שופינג לבנין בע\"מ", locality: "נוף הגליל", source: "B144", url: "https://www.b144.co.il/b144_sip/401C041340726C594E1D0414/", status: "DISCOVERED_UNVERIFIED" }),
  c({ name: "סאייג ובניו בע\"מ", locality: "נוף הגליל", source: "Google (search-summary; address given as הגביש 7, נוף הגליל)", url: null, address: "הגביש 7, נוף הגליל", status: "POSSIBLE_DUPLICATE", dupGroup: "sayegh-sons-importer" }),

  // ===== Sakhnin (Facebook/Instagram sweep) =====
  c({ name: "אקספו קרמיקה סח'נין", locality: "סח'נין", source: "Instagram", url: null, instagram: "https://www.instagram.com/p/CmvjJiot-9b/", status: "NEEDS_REVIEW", notes: "Corroborates existing DB record \"אקספו קרמיקה בע\"מ (אמיר חליאלה)\" — not a new business, useful as a 2nd-source verification for Pass 2." }),
  c({ name: "קרמיקה סח'נין & נוף הגליל", locality: "סח'נין", source: "Instagram", url: null, instagram: "https://www.instagram.com/p/DIdbfjfimek/", status: "NEEDS_REVIEW", notes: "Corroborates existing DB record \"מ.דוכי יבוא ושווק — סח'נין\" — not a new business." }),
  c({ name: "הכל לבניין", locality: "סח'נין", source: "Facebook", url: null, facebook: "https://www.facebook.com/hakolbenyan/", status: "NEEDS_REVIEW", notes: "Page found via a Sakhnin-context search; locality not independently confirmed from the page itself." }),

  // ===== Arraba (general building-materials category, relevance unconfirmed) =====
  c({ name: "שאהין שוקראללה - חומרי בניין", locality: "עראבה", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%97%D7%95%D7%9E%D7%A8%D7%99-%D7%91%D7%A0%D7%99%D7%99%D7%9F/%D7%A2%D7%A8%D7%90%D7%91%D7%94/", phoneUnclassified: "1700-555919", status: "NEEDS_REVIEW", notes: "General building-materials category; ceramic/sanitary relevance not yet confirmed. 1700-xxxxxx is a national call-routing number, not classified as landline or mobile." }),
  c({ name: "ח.יאסין חומרי בניין", locality: "עראבה", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%97%D7%95%D7%9E%D7%A8%D7%99-%D7%91%D7%A0%D7%99%D7%99%D7%9F/%D7%A2%D7%A8%D7%90%D7%91%D7%94/", phoneMobile: "076-8119152", status: "NEEDS_REVIEW", notes: "076 prefix is technically a VOB/virtual landline-class number in Israel, not a mobile prefix — classified as landline-equivalent, kept in phone_mobile field pending manual reclassification since many small businesses use 076 as their primary published line." }),
  c({ name: "כלי בר", locality: "עראבה", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%97%D7%95%D7%9E%D7%A8%D7%99-%D7%91%D7%A0%D7%99%D7%99%D7%9F/%D7%A2%D7%A8%D7%90%D7%91%D7%94/", phoneUnclassified: "076-8016083", status: "NEEDS_REVIEW" }),
  c({ name: "עוקבה נחלה", locality: "עראבה", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%97%D7%95%D7%9E%D7%A8%D7%99-%D7%91%D7%A0%D7%99%D7%99%D7%9F/%D7%A2%D7%A8%D7%90%D7%91%D7%94/", status: "NEEDS_REVIEW" }),
  c({ name: "שופאני א.א לחומרי בניין", locality: "עראבה", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%97%D7%95%D7%9E%D7%A8%D7%99-%D7%91%D7%A0%D7%99%D7%99%D7%9F/%D7%A2%D7%A8%D7%90%D7%91%D7%94/", status: "NEEDS_REVIEW" }),
  c({ name: "קבוצת המוביל החדש", locality: "עראבה", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%97%D7%95%D7%9E%D7%A8%D7%99-%D7%91%D7%A0%D7%99%D7%99%D7%9F/%D7%A2%D7%A8%D7%90%D7%91%D7%94/", status: "NEEDS_REVIEW" }),
  c({ name: "קיירא המרכז לאספקה טכנית", locality: "עראבה", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%97%D7%95%D7%9E%D7%A8%D7%99-%D7%91%D7%A0%D7%99%D7%99%D7%9F/%D7%A2%D7%A8%D7%90%D7%91%D7%94/", status: "NEEDS_REVIEW" }),
  c({ name: "עץ המחלף בע\"מ", locality: "עראבה", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%97%D7%95%D7%9E%D7%A8%D7%99-%D7%91%D7%A0%D7%99%D7%99%D7%9F/%D7%A2%D7%A8%D7%90%D7%91%D7%94/", status: "POSSIBLE_DUPLICATE", dupGroup: "etz-hamahalaf", notes: "Also cross-listed on Kafr Qara's building-materials category page — same entity, correct locality unconfirmed." }),
  c({ name: "דנבר צבעים וציפויים ישראל בע\"מ", locality: "עראבה", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%97%D7%95%D7%9E%D7%A8%D7%99-%D7%91%D7%A0%D7%99%D7%99%D7%9F/%D7%A2%D7%A8%D7%90%D7%91%D7%94/", status: "OUT_OF_SCOPE", category_guess: "paint_coatings", notes: "Paint/coatings company — ceramics/sanitary relevance unlikely, not confirmed." }),

  // ===== Kafr Manda =====
  c({ name: "מורד סמי (חומרי בניין)", locality: "כפר מנדא", source: "B144", url: "https://www.b144.co.il/b144_sip/401C041340796C5C411C0213/", status: "DISCOVERED_UNVERIFIED" }),
  c({ name: "קרמיקה זידאן פתחי דאהר", locality: "כפר מנדא", source: "Dapei Zahav", url: "https://www.d.co.il/17832240/16080/", status: "NEEDS_REVIEW", notes: "Corroborates existing DB record \"קרמיקה פתחי זידאן (זידאן פתחי דאהר)\" — not a new business." }),

  // ===== Yafia =====
  c({ name: "אנעיים חומרי בניין", locality: "יפיע", source: "B144", url: "https://www.b144.co.il/b144_sip/401C0413407967544A1C0015/", status: "DISCOVERED_UNVERIFIED" }),
  c({ name: "חומרי בניין סאלם עבד אלהאדי", locality: "יפיע", source: "B144", url: "https://www.b144.co.il/b144_sip/401C041340796C5F4A170010.aspx", status: "NEEDS_REVIEW", notes: "Surname \"עבד אלהאדי\" also appears in a Kafr Kanna candidate — possibly a related family business in a neighboring village, not confirmed same entity." }),
  c({ name: "זעאתרה סאלם", locality: "יפיע", source: "B144", url: "https://www.b144.co.il/b144_sip/4D1404134470645F4C16031B/", status: "DISCOVERED_UNVERIFIED" }),

  // ===== Kafr Kanna =====
  c({ name: "ג'מאל חאלד חומרי בניין", locality: "כפר כנא", source: "B144", url: "https://www.b144.co.il/b144_sip/4D1404134470645E41100017.aspx", status: "DISCOVERED_UNVERIFIED" }),
  c({ name: "חומרי בניין עבד אל האדי כפר כנא", locality: "כפר כנא", source: "B144", url: "https://www.b144.co.il/b144_sip/4A1404134470655D4910021745796D544B/", status: "NEEDS_REVIEW", notes: "Also cross-listed on Arraba's category page (same business, Kafr Kanna is the correct locality). Surname pattern also seen in a Yafia candidate — possibly related family, not confirmed same." }),

  // ===== Kafr Qara =====
  c({ name: "הכל לבית ולקבלן - חומרי בנין וכלי עבודה", locality: "כפר קרע", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%97%D7%95%D7%9E%D7%A8%D7%99-%D7%91%D7%A0%D7%99%D7%99%D7%9F/%D7%9B%D7%A4%D7%A8-%D7%A7%D7%A8%D7%A2/", phoneUnclassified: "076-8898966", status: "NEEDS_REVIEW", notes: "General building-materials category; ceramic/sanitary relevance not yet confirmed." }),
  c({ name: "השלום חומרי בניין", locality: "כפר קרע", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%97%D7%95%D7%9E%D7%A8%D7%99-%D7%91%D7%A0%D7%99%D7%99%D7%9F/%D7%9B%D7%A4%D7%A8-%D7%A7%D7%A8%D7%A2/", phoneUnclassified: "076-8897278", status: "NEEDS_REVIEW", notes: "Same generic name (\"HaShalom Building Materials\") as the Beit Jann candidate — different regions, likely coincidental, not the same business (unconfirmed)." }),
  c({ name: "עץ המחלף בע\"מ", locality: "כפר קרע", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%97%D7%95%D7%9E%D7%A8%D7%99-%D7%91%D7%A0%D7%99%D7%99%D7%9F/%D7%9B%D7%A4%D7%A8-%D7%A7%D7%A8%D7%A2/", phoneUnclassified: "076-8109622", status: "POSSIBLE_DUPLICATE", dupGroup: "etz-hamahalaf" }),
  c({ name: "בני מוחמד שפיק", locality: "כפר קרע", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%97%D7%95%D7%9E%D7%A8%D7%99-%D7%91%D7%A0%D7%99%D7%99%D7%9F/%D7%9B%D7%A4%D7%A8-%D7%A7%D7%A8%D7%A2/", status: "NEEDS_REVIEW", notes: "Two near-identical listings (\"בני מוחמד שפיק\" and \"בני מוחמד שפיק בע\"מ\") — treated as one candidate." }),
  c({ name: "ביג סנטר מועד", locality: "כפר קרע", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%97%D7%95%D7%9E%D7%A8%D7%99-%D7%91%D7%A0%D7%99%D7%99%D7%9F/%D7%9B%D7%A4%D7%A8-%D7%A7%D7%A8%D7%A2/", status: "NEEDS_REVIEW" }),
  c({ name: "נ.ג המרכז לבניין בע\"מ", locality: "כפר קרע", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%97%D7%95%D7%9E%D7%A8%D7%99-%D7%91%D7%A0%D7%99%D7%99%D7%9F/%D7%9B%D7%A4%D7%A8-%D7%A7%D7%A8%D7%A2/", status: "NEEDS_REVIEW" }),
  c({ name: "מוחמד היכל - חומרי בנין", locality: "כפר קרע", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%97%D7%95%D7%9E%D7%A8%D7%99-%D7%91%D7%A0%D7%99%D7%99%D7%9F/%D7%9B%D7%A4%D7%A8-%D7%A7%D7%A8%D7%A2/", status: "NEEDS_REVIEW" }),
  c({ name: "סברס המרכז לחומרי בניין", locality: "כפר קרע", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%97%D7%95%D7%9E%D7%A8%D7%99-%D7%91%D7%A0%D7%99%D7%99%D7%9F/%D7%9B%D7%A4%D7%A8-%D7%A7%D7%A8%D7%A2/", status: "NEEDS_REVIEW" }),
  c({ name: "מסארו מוחמד - חומרי בנין", locality: "כפר קרע", source: "B144 (direct category fetch)", url: "https://www.b144.co.il/%D7%97%D7%95%D7%9E%D7%A8%D7%99-%D7%91%D7%A0%D7%99%D7%99%D7%9F/%D7%9B%D7%A4%D7%A8-%D7%A7%D7%A8%D7%A2/", status: "NEEDS_REVIEW" }),

  // ===== Jatt (resolved after 2 failed attempts) =====
  c({ name: "ד.גולדרינג חומרי בניין בע\"מ", locality: "ג'ת (המשולש)", source: "t.co.il (category listing)", url: "https://www.t.co.il/398-s257-%D7%97%D7%95%D7%9E%D7%A8%D7%99+%D7%91%D7%A0%D7%99%D7%99%D7%9F-%D7%92'%D7%AA+%D7%94%D7%9E%D7%A9%D7%95%D7%9C%D7%A9.html", status: "DISCOVERED_UNVERIFIED", notes: "Search only succeeded once qualified with \"המשולש\" (Triangle) and excluding Kiryat Gat — see disambiguation log." }),

  // ===== Tira =====
  c({ name: "מטר סנטר לחומרי בנין ועץ", locality: "טירה", source: "B144", url: "https://www.b144.co.il/b144_sip/401C04134176655C4012051A/", status: "DISCOVERED_UNVERIFIED" }),

  // ===== Pardes Hanna-Karkur =====
  c({ name: "ב.נ שיווק חומרי בניין בעמ", locality: "פרדס חנה-כרכור", source: "B144", url: "https://www.b144.co.il/b144_sip/401C041341766158491D0415/", status: "DISCOVERED_UNVERIFIED" }),

  // ===== Or Akiva (resolved the Hadera/Or Akiva ambiguity) =====
  c({ name: "אברהם קראדי ובניו בע\"מ", locality: "אור עקיבא", source: "B144", url: "https://www.b144.co.il/b144_sip/4A1404134470655D491002124471605D4F/", address: "ההדס 23, אור עקיבא", status: "NEEDS_REVIEW", notes: "Corroborates existing DB record \"אברהם קראדי ובניו\" (Or Akiva) with a specific address — resolves an earlier cross-locality ambiguity with a Hadera search sighting of the same name (that Hadera sighting is NOT a separate business)." }),

  // ===== Netanya =====
  c({ name: "אלוני — נתניה", locality: "נתניה", region: REGION_SHARON, source: "Official website (alony.co.il)", url: "https://www.alony.co.il/%D7%90%D7%95%D7%9C%D7%9E%D7%95%D7%AA_%D7%AA%D7%A6%D7%95%D7%92%D7%94/%D7%A0%D7%AA%D7%A0%D7%99%D7%94", status: "LIKELY_RELEVANT", notes: "Netanya branch page on the official Aloni chain website — matches the existing chain-branch naming convention used elsewhere in the DB (e.g. 'אלוני — ירושלים')." }),
  c({ name: "גולדן ברזים וקרמיקה סנטר", locality: "נתניה", region: REGION_SHARON, source: "Google/B144", url: null, status: "POSSIBLE_DUPLICATE", dupGroup: "golden-barazim", notes: "Identical name to an existing DB record filed under Tira — needs a locality check (2 branches vs. directory error)." }),
];

fs.writeFileSync(
  path.join(__dirname, "discovery-candidates.json"),
  JSON.stringify(candidates, null, 2),
  "utf8"
);

const csvEscape = (v) => {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
};
const csvLines = [FIELDS.join(",")];
candidates.forEach((row) => {
  csvLines.push(FIELDS.map((h) => csvEscape(row[h])).join(","));
});
fs.writeFileSync(
  path.join(__dirname, "discovery-candidates.csv"),
  "﻿" + csvLines.join("\r\n"),
  "utf8"
);

console.log("Total candidates exported:", candidates.length);
const byStatus = {};
candidates.forEach((r) => (byStatus[r.status] = (byStatus[r.status] || 0) + 1));
console.log("By status:", byStatus);
const enriched = candidates.filter((r) => r.last_checked_at);
console.log("Enriched this handoff round:", enriched.length, enriched.map((r) => r.candidate_name));
const withAnyContact = candidates.filter((r) => r.phone_landline || r.phone_mobile || r.phone_unclassified || r.email || r.website || r.facebook || r.instagram || r.whatsapp_number);
console.log("Candidates with ANY contact detail captured:", withAnyContact.length);
const dupGroups = new Set(candidates.filter((r) => r.duplicate_group).map((r) => r.duplicate_group));
console.log("Distinct duplicate groups:", dupGroups.size, [...dupGroups]);
