/* 
 * Types can be used for props, but a const export is needed to validate the value of the prop matches the value list.
 */

/** Pre-defined color variants */
export type Colors = 'danger' | 'info' | 'success' | 'warning';
export type ButtonColors = 'primary' | 'secondary' | 'tertiary' | Colors;

/**
 *  Placement values corresponding to Float UI library. Used for positioning of floating elements such as:
 *   - Tooltip
 *   - Popover
 */
export type Placement = "top-start" | "top" | "top-end" | "right-start" | "right" | "right-end" | "bottom-start" | "bottom" | "bottom-end" | "left-start" | "left" | "left-end";


/** Whitelist of tag names rendered by components as types and constants. */
export const TYPOGRAPHY_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'code', 'pre', 'div', 'span'] as const;
export type TypographyTags = typeof TYPOGRAPHY_TAGS[number];

export const SECTION_TAGS = ['div', 'section', 'aside', 'none'] as const;
export type SectionTags = typeof SECTION_TAGS[number];

export const LIST_TAGS = ['ol', 'ul', 'dl'] as const;
export type ListTags = typeof LIST_TAGS[number];
