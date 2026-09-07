# Tiktak

Meyvə-tərəvəz sifarişi üçün React Native mobil tətbiqi — Azərbaycan, İngilis və Rus dillərində, qaranlıq rejim dəstəyi ilə.

| | |
|---|---|
| **Platforma** | Android (iOS hələ qurulmayıb — [aşağıya bax](#bilinən-məhdudiyyətlər)) |
| **React Native** | 0.83.10 (New Architecture) |
| **Dil** | TypeScript |
| **Paket adı** | `com.tiktak` |
| **Min. Android** | 7.0 (API 24) |
| **Versiya** | 1.4.4 |

---

## Nə edir?

İstifadəçi qeydiyyatdan keçir, məhsullara baxır, səbətə əlavə edir və sifariş verir:

```
Welcome → Qeydiyyat / Giriş → Əsas səhifə (kateqoriyalar)
   → Kateqoriya → Məhsullar → Səbətə əlavə
   → Səbət → Sifarişi tamamla → Uğur ekranı
```

### Xüsusiyyətlər

- **Autentifikasiya** — qeydiyyat, giriş, avtomatik token yeniləməsi, "sessiyanı aktiv saxla"
- **Kataloq** — kateqoriyalar, məhsul detalı, kampaniyalar
- **Axtarış** — gecikdirilmiş (debounce) axtarış + son axtarışların tarixçəsi
- **Səbət** — optimistik yeniləmə (ani reaksiya), sürətli tıklamalar üçün debounce
- **Sifariş** — nağd/kart seçimi, sifariş tarixçəsi, sifariş detalı
- **Favoritlər** — "Siyahılarım" ekranı
- **Profil** — avatar yükləmə, hesab məlumatlarının redaktəsi
- **Ünvan** — xəritədən seçim (MapLibre + OpenStreetMap, API açarı tələb etmir)
- **Tənzimləmələr** — qaranlıq rejim (sistem temasını canlı izləyir), dil seçimi, keş təmizləmə
- **Bildirişlər** — sifariş verildikdən sonra yerli (local) bildirişlər
- **Dəstək** — WhatsApp / Facebook / e-poçt əlaqə sətirləri

---

## Texnologiyalar

| Sahə | Seçim |
|---|---|
| Naviqasiya | React Navigation (native-stack + bottom-tabs) |
| Server state / keş | TanStack Query (+ MMKV-yə yazılan keş) |
| Qlobal state | Zustand (səbət) |
| Şəbəkə | Axios (interceptor-larla) |
| Yerli yaddaş | react-native-mmkv (token-lər Keychain açarı ilə şifrələnib) |
| Animasiya / jest | Reanimated + Gesture Handler |
| Siyahılar | FlashList |
| Dil | i18next + react-i18next (az / en / ru) |
| Xəritə | MapLibre + OpenFreeMap |
| Bildirişlər | Notifee (yalnız yerli) |
| Xəta izləmə | Sentry (yalnız release build-də aktiv) |

> Hər paketin **niyə** seçildiyi (və niyə alternativinin seçilmədiyi) → [`PAKET-IZAHI.md`](./PAKET-IZAHI.md)

---

## Tələblər

- **Node.js** ≥ 20
- **JDK 17** (Temurin tövsiyə olunur)
- **Android SDK** (compileSdk 36) + Android Studio və ya `sdkmanager`
- Fiziki Android cihaz və ya emulyator

---

## Quraşdırma

```bash
git clone https://github.com/Xeyyam456/TikTak-Project-RN-MobileApp.git
cd TikTak-Project-RN-MobileApp
npm install
```

`npm install` bitəndə `patch-package` avtomatik işə düşür və `patches/` qovluğundakı düzəlişləri tətbiq edir.

---

## İşə salmaq

**1. Metro-nu başladın:**

```bash
npm start
```

**2. Tətbiqi cihaza qurun.**

> ⚠️ **`npm run android` bu layihədə işləmir.** Node-un yeni versiyaları (CVE-2024-27980 düzəlişindən sonra) `.bat` fayllarının birbaşa işə salınmasını bloklayır, React Native CLI isə Gradle-ı məhz belə çağırır.

Onun əvəzinə Gradle-ı birbaşa çağırın (**PowerShell**-də, Git Bash-də yox):

```powershell
cd android
./gradlew.bat app:installDebug
cd ..
adb shell am start -n com.tiktak/.MainActivity
```

**Fiziki cihaz USB ilə qoşulubsa** Metro avtomatik tapılır. WiFi debugging işlədirsinizsə, port yönləndirməsi lazımdır:

```bash
adb reverse tcp:8081 tcp:8081
```

(Cihaz yenidən qoşulanda bu yönləndirmə itir — `Unable to load script` xətası görsəniz, əmri təkrarlayın.)

### Faydalı əmrlər

| Əmr | Nə edir |
|---|---|
| `npm start` | Metro dev server |
| `npm start -- --reset-cache` | Metro-nu keşi təmizləyərək başladır |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | TypeScript tip yoxlaması |
| `npm run apk` | Release APK yaradır |

> **Kod dəyişikliyi cihazda görünmürsə** — əvvəlcə Metro-nu şübhələndirin. Xüsusən `.json` (dil faylları) və SVG dəyişikliklərindən sonra keş köhnələ bilir: 8081 portundakı prosesi bağlayıb `npm start -- --reset-cache` ilə yenidən başladın.

---

## Release APK

```bash
npm run apk
```

Skript `gradlew.bat assembleRelease` çağırır və nəticəni asan tapılan yerə köçürür:

```
/apk/tiktak-<tarix>.apk
```

⏱️ **Bu build təxminən 39 dəqiqə çəkir** — dörd ABI üçün native kod yenidən qurulur. Fon rejimində işə salın; uzun sükut "ilişib" demək deyil.

Yaranan APK Metro-dan **asılı deyil**, `adb install -r` ilə istənilən cihaza qurula bilər.

> Versiya artırarkən **iki yeri** yeniləmək lazımdır: `package.json`-dakı `version` və `android/app/build.gradle`-dəki `versionCode` / `versionName`. Bunlar avtomatik sinxronlaşmır, üstəlik `versionCode` artırılmasa yeni build köhnəsinin üzərinə qurulmur.

---

## Layihə strukturu

```
src/
├── app/            # Tətbiqin qurulma qatı (Providers, AppShell, açılış qapıları)
├── navigation/     # Naviqasiya ağacı (root stack → tab-lar → daxili stack-lər)
├── screens/
│   ├── auth/       # Welcome, Login, Register
│   └── protected/  # home, basket, checkout, campaigns, search, profile
├── shared/
│   ├── api/        # httpClient, tokenStorage, queryClient, settingsStorage
│   ├── components/ # Button, Input, ProductGrid, BottomSheet, Skeleton...
│   ├── services/   # Hər backend sahəsi üçün bir fayl
│   ├── store/      # Zustand (səbət)
│   ├── i18n/       # Dil faylları və quraşdırma
│   ├── icons/      # SVG ikonlar
│   └── utils/      # validation, apiError, toast, notifications...
└── theme/          # Rənglər, şriftlər, ThemeContext
```

Konvensiyalar:

- Hər komponent öz qovluğunda: `ComponentName.tsx` + `.styles.ts` + `.types.ts` + `index.ts`
- Ekran məntiqi hər sahənin öz `hooks/` qovluğunda
- `src/` altında heç bir fayl ~110 sətri keçmir (`.styles.ts` istisna)
- Path alias-ları: `@shared/*`, `@typings/*`, `@assets/*`

---

## Sənədlər

| Fayl | Nə üçün |
|---|---|
| [`KOD-IZAHI.md`](./KOD-IZAHI.md) | Kodun tam izahı — sıfırdan, addım-addım (24 hissə) |
| [`PAKET-IZAHI.md`](./PAKET-IZAHI.md) | Hər paketin niyə seçildiyi, alternativlərin niyə seçilmədiyi |
| [`CLAUDE.md`](./CLAUDE.md) | Layihə qaydaları və məlum tələlər (AI köməkçiləri üçün) |
| [`docs/api.md`](./docs/api.md) | Backend API sənədləşməsi |

> `docs/api.md` bəzi yerlərdə köhnəlib — xüsusən "cavab zərfi yoxdur" qeydləri. Yeni endpoint əlavə edərkən cavabın formasını bir dəfə xam şəkildə yoxlayın.

---

## Bilinən məhdudiyyətlər

- **iOS qurulmayıb.** İnkişaf maşını Windows-dur; `ios/` qovluğuna ilk commit-dən bəri toxunulmayıb. Kod cross-platform yazılıb, amma **sınanmayıb** — klaviatura idarəsi və özəl `BottomSheet` kimi yerlərdə `Platform.OS` budaqları lazım ola bilər.
- **Avtomatlaşdırılmış test yoxdur.** Bu, şüurlu qərardır (səbəb `PAKET-IZAHI.md`-nin 15-ci bölməsindədir). Yoxlama `npm run lint` + `npx tsc --noEmit` + cihazda əl ilə test ilə aparılır.
- **Şəkil keşləmə yoxdur.** `expo-image` bu React Native versiyası ilə uyğun gəlmir (təfərrüat `CLAUDE.md`-dədir).
- **Push bildiriş yoxdur.** Backend-də push infrastrukturu olmadığı üçün bildirişlər tamamilə yerlidir.
