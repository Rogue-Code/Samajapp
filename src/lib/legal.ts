// Single source of truth for the details that appear in the Terms of Use and
// Privacy Policy pages. These are legal identifiers, not copy — changing one
// changes what the app promises, so keep them accurate.

/**
 * The person who builds, owns and runs Sangath. Sangath is operated for the
 * community but is not owned by it: the app and its code are the operator's
 * property, and the operator — not the samaj — holds the database and is the
 * Data Fiduciary for member data under the DPDP Act.
 */
export const OPERATOR_NAME = "Chaudhary Devarsh";

/** The community Sangath serves. Not the owner of the app or of the data. */
export const COMMUNITY_NAME = "Chaudhary Samaj";

/** Reachable inbox for privacy questions, data requests and complaints. */
export const CONTACT_EMAIL = "sangathsupport@gmail.com";

/** Person responsible for answering grievances under the DPDP Act. */
export const GRIEVANCE_OFFICER = "Chaudhary Devarsh";

/**
 * Where the Supabase project physically stores data. Singapore means member
 * data leaves India, which the Privacy Policy has to say out loud — see the
 * cross-border section there before changing this.
 */
export const DATA_REGION = "Singapore (ap-southeast-1)";

/** Bump whenever either document changes in substance. */
export const LAST_UPDATED = "25 August 2026";
