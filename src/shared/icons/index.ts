// Inline SVG icon set, grouped by where the icons get used rather than one
// file per icon — each is a handful of lines and they are never imported
// individually. `@shared/icons` is the only import path; the groups below
// are an internal detail.
export * from './navigation';
export * from './actions';
export * from './shopping';
export * from './account';
export * from './contact';
export type { IconProps } from './icon.types';
