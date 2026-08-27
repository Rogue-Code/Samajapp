/**
 * Choices shared by Profile Setup and the Account editor.
 *
 * Both screens write the same `profiles` columns, so the options have to agree —
 * they drifted once already, with Account still offering a three-way
 * Single/Married/Other while setup offered five.
 */
export const MARITAL_OPTIONS = ["Single", "Married", "Divorced", "Widowed", "Separated"] as const;

export type MaritalStatus = (typeof MARITAL_OPTIONS)[number];
