/**
 * @format
 */

import AnimatedSplashScreen from './src/shared/components/AnimatedSplashScreen';
import AppShell from './src/app/AppShell';
import Providers from './src/app/Providers';
import useAppBootstrap from './src/app/hooks/useAppBootstrap';
// Side-effect imports, both of which must run before anything renders:
// sentry.ts calls Sentry.init(), i18n.ts runs i18next's synchronous init so
// the first render already has the right language.
import './src/shared/config/sentry';
import './src/shared/i18n/i18n';

function App() {
  const { tokenReady, splashDone, finishSplash } = useAppBootstrap();

  if (!splashDone) {
    return <AnimatedSplashScreen ready={tokenReady} onFinish={finishSplash} />;
  }

  return (
    <Providers>
      <AppShell />
    </Providers>
  );
}

export default App;
