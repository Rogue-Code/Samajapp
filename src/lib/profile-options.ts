/**
 * Choices shared by Profile Setup and the Account editor.
 *
 * Both screens write the same `profiles` columns, so the options have to agree —
 * they drifted once already, with Account still offering a three-way
 * Single/Married/Other while setup offered five.
 */
export const MARITAL_OPTIONS = ["Single", "Married", "Divorced", "Widowed", "Separated"] as const;

export type MaritalStatus = (typeof MARITAL_OPTIONS)[number];

/**
 * Quick-pick occupations. Unlike marital status this isn't a closed set — the
 * column is free text — so both screens pair this list with an "Other" choice
 * that reveals a plain text field, the same escape hatch PlacePicker uses for
 * villages. A member whose occupation predates this list (free text saved
 * before the dropdown existed) still round-trips correctly: it just doesn't
 * match a preset, so the UI falls into the "Other" state and shows their own
 * words back to them instead of silently discarding what they typed.
 */
export const OCCUPATION_OPTIONS = [
  "Business Owner",
  "Farmer",
  "Government Service",
  "Private Service",
  "Teacher",
  "Doctor",
  "Engineer",
  "Lawyer",
  "Trader",
  "Self-Employed",
  "Homemaker",
  "Student",
  "Retired",
] as const;

export type OccupationOption = (typeof OCCUPATION_OPTIONS)[number];

/** Sentinel select value for "none of the presets — let me type my own". */
export const OCCUPATION_OTHER = "__other__";

/** Translation key suffix for a preset value: "Self-Employed" -> "SelfEmployed". */
export function occupationKeySuffix(option: OccupationOption): string {
  return option.replace(/[^A-Za-z]/g, "");
}

/**
 * Relation-to-admin choices, shared by Manage Family (adding a free-text
 * member) and the family-code join flow (declaring how the requester relates
 * to the admin they are asking to join).
 */
export const RELATIONS = [
  "Father",
  "Mother",
  "Spouse",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Grandfather",
  "Grandmother",
  "Other",
] as const;

export type Relation = (typeof RELATIONS)[number];
