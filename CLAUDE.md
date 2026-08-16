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
- `src/shared/config/env.ts` — `BASE_URL = 'https://api.sarkhanrahimli.dev'` (real value, confirmed by Xeyyam). `httpClient.ts` appends `/api/tiktak` itself — don't include that suffix in `BASE_URL`.
- `src/shared/api/httpClient.ts` — single axios instance, base URL `${BASE_URL}/api/tiktak`. Request interceptor attaches `Authorization: Bearer` (from `tokenStorage`) + `Accept-Language`. Response interceptor catches 401, calls `/auth/refresh` once (de-duped via a shared in-flight promise so concurrent 401s don't fire multiple refreshes), retries the original request, and clears tokens if refresh fails.
- `src/shared/api/tokenStorage.ts` — wraps AsyncStorage. Pinned to **`@react-native-async-storage/async-storage@1.22.3`** (not latest) — see Gotchas below for why; uses the `multiSet`/`multiRemove` tuple-array API. If this package is ever bumped to 2.x/3.x, its Room+KSP build path returns and the app will hit the same SSL wall unless the workaround below is still in place.
- `src/shared/services/*.service.ts` — one file per domain (`auth`, `profile`, `product`, `basket`, `category`, `campaign`, `order`, `upload`), matching `docs/api.md`'s Client section. Admin endpoints are documented but have no service file yet — nothing in the app consumes them (no admin screens under `src/screens/private/`).
- Response shape is inconsistent across endpoints — most wrap in `{ message, data, result }`, but `GET /basket` and all of `orders/checkout|user|user/:id` return the raw object/array with no envelope. Each service function already accounts for this; don't assume a uniform envelope when adding new ones.
- `@react-native-async-storage/async-storage` is a native module — after installing/changing its version, a native rebuild is required (see Gotchas below) before `tokenStorage` actually works on-device; type-checking passing does not mean it's linked yet.
- **Verified working end-to-end** (2026-08-17, emulator `android_device`): `signup` and `login` both wired to `LoginScreen`/`RegisterScreen`, tested against the real backend above — signup returned "Qeydiyyat tamamlandı", login returned profile for a real account and stored tokens. `Button` component now supports a `loading` prop (spinner + double-submit guard); form-level API errors surface via a `formError` state + `getApiErrorMessage()` (`src/shared/utils/apiError.ts`), not per-field errors.

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
- **Gradle fails to download any brand-new dependency with an SSL handshake error** (`certificate_unknown ... PKIX path building failed`), even though `curl`/browsers work fine: this machine's **Avast Antivirus does TLS-inspection (MITM) on all HTTPS**, re-signing certs with its own root CA (`Avast Web/Mail Shield Root`). That root is trusted by Windows (so curl/browsers are fine) but **not** by the standalone Eclipse Adoptium JDK Gradle uses — so any artifact not already cached in `~/.gradle` fails to resolve, from any host (`dl.google.com`, `repo.maven.apache.org`). This is why adding `@react-native-async-storage/async-storage@3.x`/`2.x` failed (their build needs KSP/Room artifacts never fetched before) while everything already-cached kept working. **Fix already applied on this machine** — don't redo it, don't ask the user for admin rights: exported the Avast root cert from `Cert:\LocalMachine\Root` (PowerShell), imported it into a **user-writable copy** of cacerts at `C:\Users\Mr Frontend\.gradle\cacerts-with-avast.jks` (via `keytool -importcert`, avoids needing admin rights to touch the protected JDK cacerts under `Program Files`), and pointed Gradle at it globally via `C:\Users\Mr Frontend\.gradle\gradle.properties`:
  ```
  systemProp.javax.net.ssl.trustStore=C\:\\Users\\Mr Frontend\\.gradle\\cacerts-with-avast.jks
  systemProp.javax.net.ssl.trustStorePassword=changeit
  ```
  If a *new* machine/user hits this same SSL error, redo this exact recipe (`Get-ChildItem Cert:\LocalMachine\Root | Where Subject -match "Avast"` → export → `keytool -importcert` into a copy of cacerts → `systemProp.javax.net.ssl.trustStore` in the user's global `~/.gradle/gradle.properties`) rather than downgrading packages to dodge it — downgrading (as done for async-storage) is a workaround for *that specific package*, not a fix for the underlying machine issue.
- Metro's file watcher (`FallbackWatcher`) crashes the whole Metro process with an uncaught `ENOENT` if a directory it's watching gets deleted mid-scan — this reliably happens from Gradle's transient CMake temp dirs (`.cxx/.../CMakeTmp/...`) and from npm's temp package-swap dirs (`node_modules/@scope/.pkg-RANDOM`) during `npm install`. Symptom: app hangs forever on the bootsplash screen with no error on-device because Metro silently died. Fix: just restart Metro (`npx react-native start`, add `--reset-cache` if a resolver error mentions a file that demonstrably exists on disk — Metro's haste map can go stale across rapid `npm install` swaps).
- `adb shell input tap <x> <y>` needs **actual device pixel coordinates** (this emulator is 1080×2400), not the coordinates read off a downscaled screenshot preview (often shown at 900×2000) — multiply the preview coordinates by the scale factor (e.g. ×1.2) or taps land on the wrong element. Different screens can also have the primary button at different y-offsets (e.g. Login's button sits higher than Register's since it has one fewer field) — don't reuse a tap coordinate across screens without rechecking the screenshot.

## Working agreements
- User (Xeyyam) tests primarily on a physical Android device (Xiaomi/Redmi-family) + an emulator (`emulator-5554`, `android_device` AVD). Verify UI/layout changes with actual screenshots, not just type-check — this project has had several rounds of "looks right in theory, wrong on device" bugs (keyboard behavior, nav bar color, splash icon shape).
- Keep this file updated when a new non-obvious constraint, workaround, or architectural decision is discovered — don't let future sessions re-derive things already solved here.
