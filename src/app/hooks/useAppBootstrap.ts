import { useCallback, useEffect, useState } from 'react';
import { initTokenStorage } from '@shared/api/tokenStorage';

// Owns the two gates the app has to pass before its real UI mounts.
//
// `tokenReady` flips once initTokenStorage() has resolved: since the MMKV
// encryption key lives in the Keystore/Keychain, that read is async and
// nothing below may touch tokenStorage before it lands — RootNavigator's
// getAccessToken() call, which decides the initial route, in particular.
//
// AnimatedSplashScreen only starts its ~2.5s entrance/hold/exit once
// `ready` is true, so a slow Keystore read extends the wait instead of
// racing the animation. That also means `splashDone` can never flip
// earlier than `tokenReady`.
export default function useAppBootstrap() {
  const [tokenReady, setTokenReady] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    initTokenStorage().then(() => setTokenReady(true));
  }, []);

  const finishSplash = useCallback(() => setSplashDone(true), []);

  return { tokenReady, splashDone, finishSplash };
}
