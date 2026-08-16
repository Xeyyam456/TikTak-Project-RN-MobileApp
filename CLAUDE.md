# Tiktak — React Native app

React Native 0.83 (New Architecture), TypeScript, Android + iOS.

## Stack
- React Navigation (native-stack), react-native-safe-area-context
- react-native-keyboard-controller + react-native-reanimated + react-native-worklets (keyboard handling — see Gotchas)
- react-native-bootsplash (splash screen + app icon, brand: fruit basket logo + "TIKTAK" gradient wordmark)
- react-native-svg + react-native-svg-transformer (import `.svg` as components)
- axios + `@react-native-async-storage/async-storage` (API client + token persistence — see API layer below)

## API layer
- Backend contract is documented in `docs/api.md`, generated from the team's Postman collection (`Tiktak - E-commerce Api's - Stage 3-4 Final`). Re-derive from that collection (not from re-reading old chat) if endpoints change — the collection has known quirks (double slash in `orders/user`, `orders/admin` "stats" sharing its URL with "list") noted there.
- `src/shared/config/env.ts` — `BASE_URL` is a **placeholder** (`https://CHANGE_ME.tiktak.az`), the collection didn't include a Postman environment file with the real value. Must be filled in before any service call will actually resolve.
- `src/shared/api/httpClient.ts` — single axios instance, base URL `${BASE_URL}/api/tiktak`. Request interceptor attaches `Authorization: Bearer` (from `tokenStorage`) + `Accept-Language`. Response interceptor catches 401, calls `/auth/refresh` once (de-duped via a shared in-flight promise so concurrent 401s don't fire multiple refreshes), retries the original request, and clears tokens if refresh fails.
- `src/shared/api/tokenStorage.ts` — wraps AsyncStorage. Note: installed AsyncStorage is v3, which uses `setMany`/`removeMany` (object/array-of-keys signatures), **not** the older `multiSet`/`multiRemove` tuple-array API seen in most online examples/docs.
- `src/shared/services/*.service.ts` — one file per domain (`auth`, `profile`, `product`, `basket`, `category`, `campaign`, `order`, `upload`), matching `docs/api.md`'s Client section. Admin endpoints are documented but have no service file yet — nothing in the app consumes them (no admin screens under `src/screens/private/`).
- Response shape is inconsistent across endpoints — most wrap in `{ message, data, result }`, but `GET /basket` and all of `orders/checkout|user|user/:id` return the raw object/array with no envelope. Each service function already accounts for this; don't assume a uniform envelope when adding new ones.
- `@react-native-async-storage/async-storage` is a native module — after installing it, a native rebuild is required (see Gotchas below) before `tokenStorage` actually works on-device; type-checking passing does not mean it's linked yet.

## Structure
- `src/screens/auth/` — Welcome, Login, Register (pre-login)
- `src/screens/private/` — post-login screens, gated by auth token (currently empty, being built out)
- `src/shared/components/` — Button, TextField, Input, InputLabel
- `src/shared/utils/validation.ts` — form validators
- `src/shared/api/`, `src/shared/services/`, `src/shared/config/` — API client, per-domain services, env config (see API layer above)
- `src/navigation/RootNavigator.tsx` — stack navigator
- `src/theme/fonts.ts`, `src/hooks/useReload.ts`
- `types/` — **project root**, not under `src/`. `svg.d.ts` (ambient `*.svg` module decl), `navigation.ts` (RootStackParamList), `api.ts` (backend response/domain types, mirrors `docs/api.md`)

## Path aliases (babel.config.js `module-resolver` + tsconfig.json `paths`, kept in sync)
- `@assets/*` → `assets/*`
- `@shared/*` → `src/shared/*`
- `@typings/*` → `types/*` (⚠️ do NOT name this alias `@types` — collides with TS's reserved DefinitelyTyped resolution, causes `TS6137`)

## Gotchas / decisions already made (don't redo the investigation)
- **`npx react-native run-android` fails on this machine**: Node ≥20.11/18.19.1 (CVE-2024-27980 fix) blocks direct `.bat` spawning, breaking the RN CLI's gradlew invocation. Workaround: build directly with `cd android && ./gradlew.bat app:installDebug` (PowerShell, not Git Bash), then `adb shell am start -n com.tiktak/.MainActivity`.
- Physical Android device connects over WiFi debugging: `adb pair <ip:port> <code>` → `adb connect <ip:port>` → `adb reverse tcp:8081 tcp:8081` (needed for Metro; reverse mapping drops if device reconnects/switches transport, must redo it if `Unable to load script` appears). Some devices (Xiaomi/Redmi) block `adb shell input tap/keyevent` even with USB debugging unless "USB debugging (Security settings)" is separately enabled — screenshots still work, just not input injection.
- Android 12+ system splash screen icon is **always circle-masked** by the OS — can't be styled square. Fixed by setting `android:windowSplashScreenAnimatedIcon` to a transparent 1dp drawable in `values-v31/styles.xml` (API 31+ override of `BootTheme`) so no visible shape flashes before our custom bootsplash view takes over.
- Android edge-to-edge (targetSdk 35+) forces a translucent scrim over the nav bar; plain `android:navigationBarColor` isn't enough — also need `android:enforceNavigationBarContrast`/`enforceStatusBarContrast` set to `false` in `AppTheme`.
- Keyboard handling: uses `KeyboardAwareScrollView` from `react-native-keyboard-controller` (NOT `KeyboardAvoidingView` + manual `behavior` — Android `adjustResize` + JS-level height/padding double-adjust and desync after keyboard close, leaving a residual gap). The library's `ScrollViewWithBottomPadding` wrapper hardcodes `flexGrow:1` internally — a footer/button placed as a sibling outside the ScrollView will always get pushed to the screen bottom regardless of content length; keep the submit button **inside** the ScrollView's content instead if it should sit right after the form fields. Manual `onFocus` → `scrollToEnd()` is used to guarantee the button is reachable when focusing early fields too; use `progress.value` (`useReanimatedKeyboardAnimation`) to pick 0ms delay if keyboard's already open vs ~300ms if it still needs to animate open, otherwise the scroll races the keyboard/ghost-padding animation and jumps.
- `react-native-bootsplash` generate CLI warns/fails past certain logo `--logo-width` sizes: >134dp shows a cropping warning, >192dp refuses to generate. Keep it under 134 for the actual Android system splash icon; a taller/wider custom logo (e.g. logo + wordmark stacked) can still be used for the in-app custom splash view as long as its *effective* dp width stays in range.

## Working agreements
- User (Xeyyam) tests primarily on a physical Android device (Xiaomi/Redmi-family) + an emulator (`emulator-5554`, `android_device` AVD). Verify UI/layout changes with actual screenshots, not just type-check — this project has had several rounds of "looks right in theory, wrong on device" bugs (keyboard behavior, nav bar color, splash icon shape).
- Keep this file updated when a new non-obvious constraint, workaround, or architectural decision is discovered — don't let future sessions re-derive things already solved here.
