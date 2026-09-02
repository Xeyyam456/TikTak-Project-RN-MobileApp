import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// Hermes doesn't ship Intl.PluralRules, which i18next's pluralResolver
// needs at init time regardless of whether any key actually uses plural
// forms — without this polyfill, init() logs a scary-looking
// "i18next::pluralResolver: Your environment..." warning banner on every
// launch even though nothing is actually broken.
import 'intl-pluralrules';
import { getLanguage } from '@shared/api/settingsStorage';
import azScreens from './locales/az/screens.json';
import azShared from './locales/az/shared.json';
import enScreens from './locales/en/screens.json';
import enShared from './locales/en/shared.json';
import ruScreens from './locales/ru/screens.json';
import ruShared from './locales/ru/shared.json';

// Deep merge, not a shallow {...a, ...b} spread — shared.json and
// screens.json can legitimately both contribute keys under the same
// top-level namespace (e.g. both have a `basket` section: shared.json's
// toast strings from basket.store.ts vs. screens.json's BasketScreen UI
// copy). A shallow spread would let one file's `basket` object silently
// clobber the other's instead of combining them.
function deepMerge(a: Record<string, unknown>, b: Record<string, unknown>) {
  const result: Record<string, unknown> = { ...a };
  for (const key of Object.keys(b)) {
    const aValue = a[key];
    const bValue = b[key];
    result[key] =
      aValue && bValue && typeof aValue === 'object' && typeof bValue === 'object'
        ? deepMerge(aValue as Record<string, unknown>, bValue as Record<string, unknown>)
        : bValue;
  }
  return result;
}

// Split into shared.json (src/shared/components/*) and screens.json
// (src/screens/*) per language purely so two people/agents working on
// each half at once don't edit the same file — both merge into the same
// flat `translation` namespace below, so call sites just use t('key')
// regardless of which file the key lives in.
const az = deepMerge(azShared, azScreens);
const en = deepMerge(enShared, enScreens);
const ru = deepMerge(ruShared, ruScreens);

// Initialized synchronously at import time (not inside a component) so the
// very first render already has the right language — same reasoning as
// tokenStorage's synchronous MMKV reads driving RootNavigator's
// initialRouteName without a loading screen.
i18n.use(initReactI18next).init({
  resources: {
    az: { translation: az },
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: getLanguage(),
  fallbackLng: 'az',
  interpolation: {
    // React already escapes rendered text, so double-escaping here isn't
    // needed and would mangle apostrophes in interpolated product titles.
    escapeValue: false,
  },
});

export default i18n;
