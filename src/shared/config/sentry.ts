import * as Sentry from '@sentry/react-native';
import { SENTRY_DSN } from './env';

// Side-effect module: imported once from App.tsx so initialisation happens
// before anything renders, the same way i18n.ts is wired up. `enabled` keeps
// it off in dev builds so local crashes never reach the dashboard.
Sentry.init({
  dsn: SENTRY_DSN,
  enabled: !__DEV__,
  tracesSampleRate: 0.2,
});
