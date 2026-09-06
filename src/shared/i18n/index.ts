// `@shared/i18n` is the only import path for this module — importing
// `./i18n` directly bypasses this entry point and makes the file layout
// inside the folder part of every call site's import, the same reasoning
// as `@shared/icons`. Importing this module for its side effect (as
// App.tsx does) still runs i18n.init() synchronously at import time.
export { default } from './i18n';
