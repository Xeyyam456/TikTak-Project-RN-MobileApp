# Tiktak — Paket Seçimləri və Səbəbləri

Bu sənəd `package.json`-dakı **hər bir paketi** ayrı-ayrı izah edir: nə üçün istifadə olunur, konkret olaraq **harada** işlədilir, və — ən vacibi — **niyə alternativləri deyil, məhz bu seçilib**. Bəzi qərarlar layihə boyu real problemlərdən (build xətaları, runtime bug-ları) sonra dəyişdirilib — bunlar ayrıca qeyd olunub, çünki "niyə" sualının ən dəqiq cavabı elə o təcrübədir.

> Bu sənəd `KOD-IZAHI.md`-nin tamamlayıcısıdır — orada kodun quruluşu, burada isə **hansı alətin seçilməsinin arxasında duran mühakimə** izah olunur.

> **Versiya qeydi — bu sənəddəki nömrələrdə `^` (caret) yoxdur, bu qəsdəndir.** `package.json`-dakı bütün asılılıqlar **dəqiq versiyaya sabitlənib** (caret aralıqları tamamilə silinib). Səbəb: caret ilə (`^5.5.2`) `npm install`, package.json-a toxunmadan belə, sınanmamış bir yeni minor/patch versiyanı səssizcə çəkə bilər — bu layihədə isə native modulların (MMKV/Nitro, Reanimated, gesture-handler) versiya fərqi build sındırmaq səviyyəsində əhəmiyyət daşıyır. Sabitləmə zamanı versiyalar caret-in "döşəmə" dəyərinə deyil, `node_modules`-də **faktiki quraşdırılmış və sınanmış** dəyərə bərabərləşdirildi — bir neçə paket artıq package.json-da yazılandan irəli sürüşmüşdü.

---

## Məzmun

1. [Əsas framework](#1-əsas-framework)
2. [Naviqasiya](#2-naviqasiya)
3. [Şəbəkə (HTTP)](#3-şəbəkə-http)
4. [Qlobal state](#4-qlobal-state)
5. [Server state / keş (TanStack Query)](#5-server-state--keş-tanstack-query)
6. [Beynəlxalqlaşdırma (i18n)](#6-beynəlxalqlaşdırma-i18n)
7. [Monitorinq və təhlükəsizlik](#7-monitorinq-və-təhlükəsizlik)
8. [Xəritə və məkan](#8-xəritə-və-məkan)
9. [Yerli yaddaş (storage)](#9-yerli-yaddaş-storage)
10. [Gesture, animasiya, klaviatura](#10-gesture-animasiya-klaviatura)
11. [Media və asset-lər](#11-media-və-asset-lər)
12. [Siyahılar (lists)](#12-siyahılar-lists)
13. [Bildirişlər](#13-bildirişlər)
14. [Alət zənciri (tooling)](#14-alət-zənciri-tooling)
15. [Silinmiş paketlər (artıq `package.json`-da yoxdur)](#15-silinmiş-paketlər-artıq-packagejson-da-yoxdur)
16. [Ümumi nəticə — seçim fəlsəfəsi](#16-ümumi-nəticə--seçim-fəlsəfəsi)

---

## 1. Əsas framework

### `react` (19.2.0) və `react-native` (0.83.10)

**Nə üçün:** Tətbiqin özəyi. React-in komponent modeli + React Native-in bunu native Android/iOS view-larına çevirən qatı.

**Niyə React Native, Flutter/Kotlin+Swift deyil?** Komanda/layihə JavaScript/TypeScript bazasında işləyir — Flutter Dart, native inkişaf isə iki ayrı dil (Kotlin + Swift) və iki ayrı kod bazası tələb edərdi. React Native tək kod bazası ilə hər iki platforma "əsl" native komponentlər (JS-dən DOM-a bənzər virtual görüntü deyil, birbaşa `UIView`/`android.view.View`) istehsal edir.

**Niyə `0.83.10`, `0.83.0` yox?** Bu, layihənin ən konkret sənədləşdirilmiş qərarlarından biridir. RN `0.83.0`-da bir core Android reqressiyası var idi — bütün `FormData`/multipart yükləmələr (həm axios, həm fetch) heç bir server cavabı olmadan `Network Error` ilə səssizcə sınırdı (facebook/react-native#54881). Bu, profil avatarı yükləmə funksiyasını debug edərkən aşkarlandı. `0.83.1`+ versiyalarında düzəldilib, ona görə `0.83.10`-a sabitlənib. **Alternativ (aşağı versiyaya enmək) düşünülməyib** — problem konkret bir RN buq-u idi, layihə arxitekturası ilə əlaqəsi yox idi.

**Gotcha — bu versiya "sadəcə ən yeni olduğu üçün" seçilməyib, ona görə də təsadüfən aşağı salınmamalıdır.** Əgər gələcəkdə **hər hansı** başqa fayl-yükləmə endpoint-i Android-də cavabsız `Network Error` verməyə başlasa, ilk yoxlanacaq şey tətbiq kodu deyil, quraşdırılmış `react-native` patch versiyasıdır.

### `@react-native/new-app-screen` (0.83.10)

RN CLI-nin default "yeni layihə" boş ekranının paketi — RN template-inin tərkib hissəsidir. `src/` daxilində **heç yerdə import olunmur**; `@react-native/*` ailəsinin versiya uyğunluğunu qorumaq üçün template ilə birlikdə saxlanılır.

---

## 2. Naviqasiya

### `@react-navigation/native` (7.3.16) + `native-stack` (7.18.6) + `bottom-tabs` (7.18.16)

**Nə üçün:** Bütün ekran keçidləri — `RootNavigator` (auth axını + əsas tab-lar + Basket/Checkout/OrderSuccess/Campaigns stack-ı), `BottomTabNavigator`, `HomeStackNavigator`, `ProfileStackNavigator`.

**Niyə React Navigation, `react-native-navigation` (Wix) deyil?** İki əsas namizəd var: **React Navigation** (JS-də idarə olunan, geniş icma) və **react-native-navigation** (Wix-in, tam native naviqasiya stack-ı istifadə edən, daha performanslı amma quraşdırması/inteqrasiyası daha mürəkkəb). Kiçik-orta ölçülü bir e-commerce tətbiqi üçün React Navigation-un `native-stack` variantı (aşağıda izah olunur) artıq **native performans** verir, əlavə mürəkkəbliyə ehtiyac yaratmadan. Wix-in kitabxanası daha çox, çox böyük/performans-kritik tətbiqlərdə üstünlük təşkil edir.

**Niyə `native-stack`, sadə `stack` (JS-based) deyil?** React Navigation-un köhnə `@react-navigation/stack` paketi ekran keçidlərini **JS tərəfində** animasiya edir (`Animated` API ilə) — bu, mürəkkəb ekranlarda gecikməyə səbəb ola bilər. `native-stack` isə Android-də `Fragment`, iOS-da `UINavigationController`-in **əsl** naviqasiya mexanizmini işlədir — nəticə daha hamar keçidlər və daha az JS yükü.

**Qeyd — yeni ekranlar əlavə olunub, yeni paket yox.** Kampaniyalar ekranı (`screens/protected/campaigns/`, root stack-da `Campaigns` marşrutu) məhz bu paketin üstündə quruldu — heç bir əlavə naviqasiya asılılığı gətirmədən. Bu, seçimin **doğruluğunu** sonradan təsdiqləyən bir siqnaldır: yeni bir domen əlavə etmək artıq mövcud navigator-a bir `<Stack.Screen>` və `types/navigation.ts`-ə bir sətir deməkdir. Sifariş ekranındakı ödəniş üsulu seçimi (`PaymentMethodPicker`, `PaymentMethod` tipi) də eyni kateqoriyadır — ayrıca bir "form" və ya "radio-group" kitabxanası gətirilmədi, sadə RN komponentləri kifayət etdi.

### `react-native-screens` (4.26.2, patch-lənib)

**Nə üçün:** `native-stack`-in özü daxildə bu paketə söykənir — hər ekranı native `Fragment`/`UIViewController`-ə "bağlayan" alt qatdır. Birbaşa import olunmur, React Navigation-un asılılığıdır.

**Niyə patch-lənib?** `patches/react-native-screens+4.26.2.patch` faylı bir TypeScript tip xətasını düzəldir: kitabxananın `StackHeaderConfigAndroidNativeComponent.ts` faylı `React.ComponentRef` tipinə istinad edirdi, layihənin React 19 + TypeScript qurğusu isə bunu həll edə bilmirdi və tip yoxlaması (`tsc --noEmit`) sınırdı. `patch-package` ilə bir sətirlik düzəliş (`ComponentRef` → `ElementRef`) tətbiq olunub. **Alternativ (versiyanı geri çəkmək) seçilməyib**, çünki problem sırf tip-səviyyəli idi — runtime-a təsiri yox idi, patch daha təmiz həll idi.

**Gotcha — patch faylının adında versiya var (`+4.26.2`).** Bu təsadüfi deyil: `patch-package` patch-i **yalnız** həmin versiyaya tətbiq edir. `react-native-screens` yenilənəndə patch səssizcə tətbiq olunmur deyil — `postinstall` addımı xəbərdarlıq verir, amma yeni versiya problemi artıq özü həll etmiş ola bilər. Yəni yeniləmədən sonra `tsc --noEmit`-i işlədib patch-in **hələ də lazım olub-olmadığını** yoxlamaq lazımdır, kor-koranə yeni patch generasiya etmək yox.

### `react-native-safe-area-context` (5.8.0)

**Nə üçün:** Notch/status bar/naviqasiya zolağı kimi "təhlükəsiz sahə" məlumatını (`useSafeAreaInsets`) verir — demək olar hər ekranda `paddingTop: insets.top` kimi işlədilir. `SafeAreaProvider` `src/app/Providers/Providers.tsx`-də quraşdırılıb.

**Niyə bu, əl ilə `Platform.OS === 'ios' ? 44 : 24` kimi sabit dəyərlər deyil?** Cihazlar arasında notch/kamera-deşiyi ölçüləri **fərqlidir** (məsələn Dynamic Island olan iPhone-lar). Sabit dəyər bəzi cihazlarda düzgün, bəzilərində səhv olardı. Bu paket OS-dən **real** dəyəri sorğulayır — React Navigation-un özü də daxili olaraq buna söykənir, ona görə əlavə asılılıq deyil, məcburi tələbdir.

---

## 3. Şəbəkə (HTTP)

### `axios` (1.19.0)

**Nə üçün:** `httpClient.ts`-dəki tək instance — bütün API sorğuları buradan keçir.

**Niyə axios, native `fetch` deyil?** Əsas səbəb: **interceptor** dəstəyi. `httpClient.ts`-in avtomatik token-yeniləmə məntiqi (401 alanda `/auth/refresh` çağırıb orijinal sorğunu təkrarlamaq) `fetch`-lə əl ilə **hər** sorğu çağırışında təkrarlanmalı olardı. Axios-un `interceptors.response.use(...)` mərkəzi bir yerdə **bir dəfə** yazılıb, bütün sorğulara avtomatik tətbiq olunur. Eyni şey request tərəfinə də aiddir — `Authorization: Bearer` başlığı və `Accept-Language` hər sorğuya avtomatik əlavə olunur, çağırış yerlərinin bundan xəbəri belə yoxdur.

**Əlavə üstünlük:** axios avtomatik JSON parse edir və `AxiosError` ilə xəta tipləşdirməsi rahatdır (`isAxiosError<T>()` — `apiError.ts`-də istifadə olunur), halbuki `fetch` HTTP 4xx/5xx cavablarını **ümumiyyətlə xəta saymır** (yalnız şəbəkə səviyyəsində sınanda `reject` edir), yəni hər çağırışda `if (!response.ok) throw ...` əl ilə yazılmalı olardı.

---

## 4. Qlobal state

### `zustand` (5.0.15)

**Nə üçün:** `basket.store.ts` — səbət state-i (məhsullar, miqdarlar, `loading`/`error`) tətbiqin fərqli hissələrindən (CategoryProducts, MyLists, Search, Basket ekranları) eyni anda oxunur/yazılır.

**Niyə Zustand, Redux (Toolkit) deyil?** Redux Toolkit güclüdür, amma boilerplate tələb edir: action-lar, reducer-lər, `Provider` ilə bütün tətbiqi bükmək. Zustand-da bir store sadəcə bir `create()` çağırışıdır — heç bir `Provider` lazım deyil, komponent birbaşa `useBasketStore(state => state.basket)` ilə **yalnız lazım olan hissəni** oxuyur (selector), lazımsız yenidən-render-lərin qarşısı avtomatik alınır. Layihənin state ehtiyacı (əsasən bir səbət obyekti) Redux-un təşkilatı mürəkkəbliyini əsaslandırmır.

**Niyə React Context deyil?** Context, dəyər dəyişəndə **bütün** istifadə edən komponentləri yenidən render edir (selector mexanizmi yoxdur, `useMemo` ilə əl ilə optimallaşdırma tələb edir). Zustand isə bunu daxili edir. Bundan başqa, Context provider-i component ağacına əlavə etmək lazımdır — Zustand-ın store-u ağacdan **kənarda** yaşayır, istənilən yerdən (hətta component olmayan funksiyalardan) çağırıla bilir.

**Niyə Jotai/Recoil deyil?** Bunlar "atomic" state idarəetməsinə üstünlük verir (çoxlu kiçik state parçaları) — bu layihədə isə tək bir mərkəzi obyekt (səbət) kifayətdir, atomic yanaşmanın üstünlüyü burada praktiki fayda vermir.

**Qeyd — Context bu layihədə hələ də var, amma başqa iş üçün.** `ThemeContext.tsx` (dark mode) məhz React Context ilə yazılıb və bu **ziddiyyət deyil**: tema dəyəri nadir hallarda (istifadəçi keçirici ilə oynayanda və ya OS teması dəyişəndə) dəyişir, üstəlik dəyişəndə **onsuz da** hər komponentin yenidən render olunması **istənilən** nəticədir. Context-in "hamısını yenidən render et" davranışı burada problem deyil, məqsəddir — səbətdə isə tam əksinə.

---

## 5. Server state / keş (TanStack Query)

### `@tanstack/react-query` (5.102.8) + `@tanstack/react-query-persist-client` (5.102.8) + `@tanstack/query-async-storage-persister` (5.102.8)

**Nə üçün:** `src/shared/api/queryClient.ts` / `queryStorage.ts` / `queries/queryKeys.ts` — demək olar bütün ekranların server-dən gətirdiyi məlumat (profil, kateqoriyalar, kampaniyalar, məhsullar, axtarış, sifarişlər, favoritlər) bu üçlüklə idarə olunur, əvvəlki `useState`+`useEffect`+`useCallback` naxışının (Hissə 4-cü qlobal state ilə **qarışdırılmamalıdır**, bax Zustand hissəsi) yerinə.

**Niyə TanStack Query, sadəcə `useState`/`useEffect`-i davam etdirmək deyil?** Kiçik layihələrdə əl ilə fetch-idarəetməsi kifayət edir, amma bu layihə böyüdükcə üç təkrarlanan problem üzə çıxdı: (1) hər ekran öz `loading`/`error`/keş-idarəetmə boilerplate-ini **təkrar** yazırdı; (2) heç bir keş olmadığı üçün, bir ekrandan digərinə keçib geri qayıtmaq **hər dəfə** yeni bir şəbəkə sorğusu (və boş spinner) demək idi, hətta məlumat saniyələr əvvəl artıq gətirilmiş olsa belə; (3) `HomeScreen` və `CheckoutScreen` kimi ekranlar **eyni** profil məlumatını ayrı-ayrı sorğulayırdı, aralarında heç bir paylaşılan keş yox idi. TanStack Query bu üçünü də "pulsuz" (kitabxananın öz daxili məntiqi ilə) həll edir — `KOD-IZAHI.md`-nin Hissə 18-i ətraflı izah edir.

**Niyə Zustand-ın özü ilə edilmir (`basket.store.ts`-ə bənzər əl ilə keş)?** Server-dən gələn məlumatın öz-özünə xas problemləri var — "nə vaxt köhnəlir", "arxa planda necə yenilənir", "eyni sorğu paralel neçə dəfə gedirsə necə birləşdirilir" (Hissə 3-dəki token-yeniləmə interceptor-unun öz "in-flight promise" naxışına bənzər — `KOD-IZAHI.md`-nin Hissə 11-i, amma **hər** sorğu üçün ümumiləşdirilmiş) — bunları Zustand-da əl ilə yenidən yazmaq, əslində TanStack Query-nin artıq həll etdiyi bir problemi təkrar həll etmək olardı. Səbətin özü (Zustand-da qalır) fərqlidir, çünki onun **optimistik** davranışı artıq TanStack Query-dən əvvəl yazılmışdı və öz məntiqi ilə yaxşı işləyir (bax Hissə 4-cü, Qlobal state).

**Seçimin sonradan təsdiqi:** Kampaniyalar ekranı bu paketdən **sonra** əlavə olundu və heç bir yeni infrastruktur tələb etmədi — `useCampaignsData.ts` sadəcə bir `useQuery` çağırışıdır, keş/`loading`/`error`/pull-to-refresh davranışının hamısı hazır gəlir. Yəni əlavə edilən hər yeni server domeni artıq **sıfır** boilerplate ilə gəlir; bu, ilkin qərarın əsl qazancının harada olduğunu göstərir.

**Gotcha — `gcTime` persister-in `maxAge`-i ilə sinxron olmalıdır:** `queryClient.ts`-də `gcTime: 24 * 60 * 60 * 1000` (24 saat), `queryStorage.ts`-in export etdiyi `persistOptions`-un `maxAge`-i də **eyni** 24 saatdır. Əgər `gcTime` bundan qısa olsaydı, istifadə olunmayan bir sorğu yaddaşdan (RAM-dan) diskə yazılmazdan **əvvəl** silinə bilərdi — persistlik səssizcə pozulardı, heç bir xəta olmadan. Bu iki dəyəri **əl ilə sinxron** saxlamaq lazımdır, kitabxananın özü bunu avtomatik etmir. (Bu iki dəyər əvvəllər ayrı fayllarda idi — `maxAge` `App.tsx`-də yazılırdı; indi `persistOptions` konfiqurasiya etdiyi persister-in **yanında**, `queryStorage.ts`-də saxlanılır, məhz ona görə ki, sinxron qalması lazım olan iki sətir bir-birini görsün.)

**Gotcha — `createSyncStoragePersister` deyil, `createAsyncStoragePersister`:** TanStack Query-nin köhnə `createSyncStoragePersister`-i **deprecated** elan olunub, yeni tövsiyə edilən yol `createAsyncStoragePersister`-dir — halbuki MMKV-nin özü **sinxrondur**. Bu, ziddiyyət **deyil**: sinxron bir dəyəri asinxron gözlənilən bir interfeysə ötürmək, JavaScript-də sadəcə "artıq həll olunmuş bir promise" deməkdir, heç bir performans itkisi yaratmır.

**`buster` nə üçündür?** `queryStorage.ts`-də `CACHE_BUSTER = 'v1'` sabiti var. Diskdəki keş **köhnə** məlumat formatını saxlaya bilər — məsələn bir sahə adı dəyişsə, istifadəçinin telefonundakı 24 saatlıq keş yeni koda **uyğun gəlməyən** obyektlər qaytarardı və tətbiq səbəbi görünməyən bir şəkildə sınardı. Buster-i dəyişmək `restoreClient()`-ə köhnə keşi bərpa etmək əvəzinə **atmağı** əmr edir. Yəni bu sabit "unudulmuş bir versiya nömrəsi" deyil — API cavab formatı dəyişəndə **əl ilə artırılmalı** olan bir təhlükəsizlik klapanıdır.

---

## 6. Beynəlxalqlaşdırma (i18n)

### `react-i18next` (15.1.3) + `i18next` (23.16.8) + `intl-pluralrules` (2.0.1)

**Nə üçün:** `src/shared/i18n/` — tətbiqin bütün mətnləri üç dildə (az/en/ru), `SettingsScreen`-in dil seçimi ilə dəyişdirilə bilən. Quraşdırma `src/shared/i18n/i18n/i18n.ts`-də, **import anında sinxron** işə düşür və `App.tsx`-dən yan-təsir (side-effect) import-u kimi çağırılır — ilk render artıq düzgün dildə olsun deyə.

**Niyə react-i18next, React Native-in öz sadə bir "mətn xəritəsi" naxışı (`const LABELS = { az: {...}, en: {...} }` + əl ilə seçmə) deyil?** Kiçik bir tətbiq üçün əl ilə həll düşünülə bilərdi, amma i18next bir neçə real problemi **hazır** həll edir: interpolyasiya (`t('basket.addedToBasket', { title })` — dəyişən dəyərləri mətnə yeritmək), cəm formaları (bəzi dillərdə "1 məhsul" / "2 məhsul" fərqli qrammatik formalar tələb edə bilər — bu layihə hələ bundan **istifadə etmir**, amma infrastruktur hazırdır), fallback dil (`fallbackLng: 'az'` — bir açar tərcümə olunmayıbsa, səssizcə boş yerinə default dilə düşür) və React inteqrasiyası (`react-i18next`-in `useTranslation()` hook-u, dil dəyişəndə **bütün** komponentləri avtomatik yenidən render etdirir, əl ilə "hər yerdə forceUpdate et" yazmağa ehtiyac qalmadan).

**`intl-pluralrules` niyə ayrıca asılılıqdır?** Hermes (React Native-in default JS mühərriki) `Intl.PluralRules`-u (bir ədədin, dilin qrammatikasına görə hansı "cəm kateqoriyasına" aid olduğunu müəyyən edən brauzer-standart API) **daşımır**. i18next bunu **init zamanı**, hətta heç bir cəm forması işlədilməsə belə, yoxlayır — polyfill olmadan, hər tətbiq açılışında konsolda funksional zərəri olmayan, amma qorxuducu görünən bir xəbərdarlıq çıxır. `intl-pluralrules` sadəcə bu API-nin JS-də yazılmış bir tətbiqini əlavə edir və `i18n.init()`-dən **əvvəl** import olunmalıdır.

**Dərs (layihənin özündə üzə çıxan bir bug-dan):** iki ayrı JSON faylını (`shared.json`/`screens.json`) birləşdirərkən **dayaz spread** (`{ ...a, ...b }`) əvəzinə **dərin (recursive) merge** işlədilməlidir — əks halda hər iki faylın **eyni** üst-səviyyəli açarı (bu layihədə `basket`) bir-birini səssizcə əzir. Ətraflı izah `KOD-IZAHI.md`-nin Hissə 20-də.

**Məhsul qərarı — "AZN" tərcümə olunmur.** Üç dilin hər birində eyni qalır (ISO valyuta kodu konvensiyası). Bu, "unudulmuş tərcümə" deyil, istifadəçi ilə açıq təsdiqlənmiş qərardır.

**Gotcha — uzun tərcümə üçün qabı böyütmək qadağandır.** Rus dilindəki düymə mətni `ProductCard`-a sığmayanda düzgün həll **mətni kiçiltmək** oldu (`Button`-un `textStyle` prop-u + `numberOfLines={1}` təhlükəsizlik toru), kartı böyütmək yox. Səbəb sadədir: qab bir dilə görə böyüdülsə, grid-in bütün ölçü riyaziyyatı digər iki dildə də dəyişir — yəni bir dilin problemi üç dilin layoutunu pozardı.

---

## 7. Monitorinq və təhlükəsizlik

### `@sentry/react-native` (8.24.0)

**Nə üçün:** `src/shared/config/sentry.ts` — `Sentry.init({ dsn: SENTRY_DSN, enabled: !__DEV__, tracesSampleRate: 0.2 })` ilə production-da baş verən çökmə/xətaları izləmək.

**Niyə ayrıca bir yan-təsir modulu (`sentry.ts`), `App.tsx`-in içində bir çağırış deyil?** Sentry-nin init-i **hər şeydən əvvəl**, hətta ilk render başlamazdan qabaq işləməlidir — əks halda tətbiqin ilk anlarında baş verən bir çökmə heç vaxt qeydə alınmaz. Modulu ayırıb `App.tsx`-in yuxarısından `import './src/shared/config/sentry'` kimi çağırmaq bunu **qaydaya** çevirir: JS modul sistemi import-ları komponent kodundan əvvəl icra edir, yəni sıralama təsadüfə buraxılmır. Eyni naxış `i18n.ts` üçün də işlədilir.

**Niyə Sentry, Firebase Crashlytics deyil?** Hər ikisi bu işi görə bilər; Sentry seçilib, çünki o, **həm** crash-reporting, **həm** performans izləməsini (transaction tracing) **eyni** SDK-da verir, React Native üçün ilk-dərəcəli (first-class) dəstəyi var (mənbə xəritələri — source maps — ilə minifikasiya olunmuş JS xətalarını oxunaqlı stack-trace-ə çevirmək daxil), və Firebase ekosisteminə bağlı deyil (layihə heç bir başqa Firebase xidməti işlətmir, ona görə əlavə bir Google hesabı/layihəsi qurmağa ehtiyac yaratmır).

**Gotcha — `enabled: !__DEV__` niyə vacibdir?** Development zamanı (Metro-dan işə düşən build-də) baş verən "xətalar" çox vaxt Fast Refresh-in öz keçici vəziyyətlərindən qaynaqlanır, real istifadəçi problemi deyil. Bu bayraq olmasaydı, development sessiyaları Sentry panelini **real** production xətaları ilə qarışan gurultu ilə doldurardı — real xətaları tapmaq çətinləşərdi.

### `react-native-keychain` (10.0.0)

**Nə üçün:** `tokenStorage.ts` — MMKV-nin token-ləri şifrələyən açarını, telefonun öz Android Keystore/iOS Keychain-ində saxlamaq üçün (bax Hissə 9-un düzəliş qeydi).

**Niyə bu, açarı sadəcə koddakı bir sabitdə saxlamaq deyil?** Çünki bu, şifrələməni **mənasız** edərdi — əgər açar tətbiqin öz JS/native kodunun daxilindədirsə, telefona fiziki girişi olan (ya APK-nı decompile edən) hər kəs açarı da tapa bilər, MMKV-nin şifrələnmiş faylını da aça bilər. Keychain/Keystore isə əməliyyat sisteminin **öz** təhlükəsizlik hardware/OS-səviyyəli mexanizmidir — açar oradan, tətbiqin öz kodundan **kənar** bir yerdə mühafizə olunur, `react-native-keychain` sadəcə bu OS API-larına JS-dən çıxış verən bir körpüdür.

**Gotcha — `Keychain.getGenericPassword()`/`setGenericPassword()` yalnız asinxrondur, və bunun qiyməti bütün açılış axınına yayılıb.** Bu, `tokenStorage.ts`-in özünün **artıq** tam sinxron ola bilməməsinin səbəbidir: `initTokenStorage()` bir dəfəlik gözlənilməli bir addıma çevrildi. O gözləmə `src/app/hooks/useAppBootstrap.ts`-də idarə olunur (`tokenReady` bayrağı), `AnimatedSplashScreen` isə öz animasiyasına yalnız `ready` doğru olandan sonra başlayır — yəni Keystore oxuması yavaş olsa, animasiya onunla **yarışmır**, sadəcə gözləmə uzanır. Nəticədə istifadəçi heç vaxt boş/yarımçıq ekran görmür (`KOD-IZAHI.md`-nin Hissə 8/10-una bax).

---

## 8. Xəritə və məkan

### `@maplibre/maplibre-react-native` (11.3.8)

**Nə üçün:** `src/screens/protected/home/MapAddressPicker/` — çatdırılma ünvanını xəritədən seçmək (`AddressEditModal`-ın "xəritədən seç" sətrindən açılır). Məntiq `src/screens/protected/home/hooks/useMapAddressPicker.ts`-də, reverse-geocoding isə `src/shared/services/geocoding.service.ts`-də (Nominatim).

**Niyə komponent `shared/` altında deyil?** Əvvəl orada idi, sonra `home/`-a köçürüldü: onun **yeganə** istifadəçisi `AddressEditModal`-dır, o da bir `home/` ekran komponentidir. Bu layihədə `shared/` "bir-biri ilə əlaqəsi olmayan ekranlarda **həqiqətən** işlədilən" şeylər üçündür — tək istifadəçisi olan bir şeyi ora qoymaq qovluğun mənasını aşındırır. İkinci bir istifadəçi peyda olsa, geri köçürmək düzgün olar.

**Niyə MapLibre, `react-native-maps` (Google Maps) deyil?** Bu, layihənin ən açıq sənədləşdirilmiş "pulsuz alternativ axtarışı" qərarlarından biridir. `react-native-maps`-in Google Maps backend-i, hətta pulsuz limit daxilində qalsanız belə, **billing hesabına bağlı** bir API açarı tələb edir (kredit kartı, ödəniş alınmasa belə) — bu, istifadəçi ilə açıq müzakirə edildikdən sonra qəbuledilməz sayıldı. MapLibre — Google-a bağlı olmayan, açıq mənbəli render mühərriki — heç bir API açarı, heç bir billing hesabı tələb etmir, əvəzinə OpenFreeMap-in pulsuz `liberty` vektor-tile üslubu ilə işləyir.

**Diqqət — `expo` bunun peer-asılılığıdır, amma bu, `expo-image` epizodu ilə eyni kateqoriya deyil.** `@maplibre/maplibre-react-native`-in `package.json`-unda `expo` **optional** bir peer-asılılıqdır (`peerDependenciesMeta`-da `optional: true`) — quraşdırılanda Expo-nun runtime-ını **tələb etmir**, tam Expo framework-ünü çəkmir. Bu, layihənin bu paketdən **əvvəl** sınayıb tərk etdiyi `expo-image`-in (`package.json`-a heç vaxt daxil edilməmiş, çünki tamamilə geri çevrilib — ətraflı hekayə `KOD-IZAHI.md`-nin Hissə 23-ündə) yaşadığı Kotlin-səviyyəli uyğunsuzluqdan **fərqli bir hekayədir** — MapLibre-nin native build-i **ilk cəhddə** uğurla keçdi, heç bir Promise-interfeys problemi yaratmadı.

**Gotcha — dev build-də görünən sarı xəbərdarlıq zolağı bu paketin **buq-u deyil**.** MapLibre `liberty` üslubunda `Invalid geometry in line layer` kimi LogBox xəbərdarlıqları yaza bilər — bunlar tile üslubunun özündən gəlir, kosmetikdir, release build-də ümumiyyətlə görünmür. Amma o zolaq ekranın altındakı düymənin **üstünə** oturub toxunuşları uda bilir; "düymə basılmır" deyə bir səhv diaqnoz qoymazdan əvvəl zolağın orada olub-olmadığını yoxlamaq lazımdır.

---

## 9. Yerli yaddaş (storage)

### `react-native-mmkv` (4.3.2) + `react-native-nitro-modules` (0.37.0)

**Nə üçün:** `tokenStorage.ts` (access/refresh token-lər, "remember me" bayrağı) və daha üç ayrı instans: `settingsStorage.ts` (`tiktak-settings` — dark mode + dil), `searchHistory.ts` (`tiktak-search-history` — son axtarışlar), `queryStorage.ts` (`tiktak-query-cache` — TanStack Query-nin diskə yazılan keşi).

**Niyə MMKV, `@react-native-async-storage/async-storage` deyil?** Bu, layihənin ən aydın sənədləşdirilmiş miqrasiyalarından biridir (2026-08-22; paketin özü sonradan, 2026-09-06-da silinib — bax Hissə 15). Səbəb **sinxronluq**: AsyncStorage-un hər oxuması `Promise` qaytarır (asinxron) — bu, `RootNavigator`-un "istifadəçi daxil olubmu?" sualına **hər dəfə** asinxron cavab verməsi, yəni hər oxuma nöqtəsində əlavə gözləmə məntiqi demək idi. MMKV-nin native (C++) oxuma/yazması **sinxrondur** — `getAccessToken()` adi bir funksiya kimi dərhal cavab verir, `initialRouteName` sadə bir üçlük operator ilə hesablanır. Əlavə üstünlük: MMKV, disk I/O-nu minimuma endirən memory-mapped fayl texnikası ilə AsyncStorage-dan **əhəmiyyətli dərəcədə** sürətlidir.

**Vacib nüans — "sinxron" sözü indi yalnız oxumalara aiddir, quraşdırmaya yox.** Şifrələmə əlavə olunandan sonra (aşağıdakı düzəliş) MMKV instansının **özünü yaratmaq** artıq sinxron deyil, çünki şifrələmə açarı Keychain-dən gəlir. Yəni: `initTokenStorage()` bir dəfə `await` olunur (splash ekranı bu müddətdə ekranda qalır), **ondan sonra** bütün `getAccessToken()`/`getRefreshToken()`/`getRememberMe()` çağırışları yenə də tam sinxrondur. Qoruyucu olaraq `requireStorage()` init-dən əvvəl istifadəyə `'tokenStorage used before initTokenStorage() resolved'` xətası ilə cavab verir. Digər üç instans bu gözləməyə **tabe deyil** — şifrələnmədikləri üçün import anında sinxron yaradılır.

**Niyə `react-native-nitro-modules` ayrıca asılılıqdır?** `react-native-mmkv` v4 tamamilə yenidən yazılıb — Margelo-nun **Nitro Modules** arxitekturası üzərində qurulub (köhnə JSI-based v3-dən fərqli). Nitro Modules öz runtime-ını tələb edir; bu, `mmkv`-nin `peerDependency`-si olsa da, **real** (`dependencies`-də) paket kimi əlavə edilməlidir — əks halda Gradle build `:react-native-nitro-modules` layihəsini tapa bilmir.

**Gotcha — v4-də `new MMKV(config)` işləmir.** v4-də `MMKV` yalnız bir TypeScript **tipidir**; runtime konstruktoru `createMMKV(config)` funksiyasıdır. `new MMKV(...)` yazsanız `Cannot read property 'prototype' of undefined` alırsınız — üstəlik bu, tip yoxlamasından **keçir**, yəni yalnız cihazda üzə çıxır. Yeni bir MMKV instansı əlavə edərkən mövcud dörd instansdan birinə baxıb eyni naxışı təkrarlamaq ən təhlükəsiz yoldur.

**Gotcha — native rebuild olmadan işləmir.** MMKV və Nitro native modullardır: versiyaları dəyişəndən sonra `cd android && ./gradlew.bat app:installDebug` icra olunmayınca `tokenStorage` cihazda işləməz. `tsc` və `eslint`-in təmiz keçməsi paketin **bağlandığı** anlamına gəlmir.

**Düzəliş (2026-09-01): bu instans artıq şifrələnib.** Əvvəllər burada "şifrələnmiş SecureStore/Keychain birbaşa lazım deyil, bu tətbiqdə yüksək təhlükəsizlik tələbi yoxdur" yazılırdı — bu qərar sonradan **dəyişdirilib**: `tokenStorage.ts`-in MMKV instansı indi `encryptionType: 'AES-256'` ilə şifrələnir, açar isə `react-native-keychain` vasitəsilə Android Keystore/iOS Keychain-də saxlanılır (bax Hissə 7). Bu, "token-lər sadə diskdə saxlanılır" iddiasını **artıq düzgün deyil** edir — köhnə "şüurlu sadəlik" mühakiməsi orijinal risk qiymətləndirməsi üçün düzgün idi, amma layihə böyüdükcə təhlükəsizlik tələbi yenidən qiymətləndirilib. Digər üç MMKV instansı **hələ də** şifrələnməmiş qalır — həssas olmayan məlumat üçün bu əlavə mürəkkəblik (və Keystore gözləməsi) hələ də əsaslandırılmır, seçim yalnız **token-lər** üçün dəyişib.

---

## 10. Gesture, animasiya, klaviatura

### `react-native-gesture-handler` (3.2.1)

**Nə üçün:** `src/app/Providers/Providers.tsx`-də `GestureHandlerRootView` (bütün tətbiqin kökü); `BottomSheet.tsx`-in sürüşdürmə (drag-to-dismiss) davranışı; `OrderDetailSheet`-in daxili siyahısında scroll performansı üçün (`ScrollView`-un gesture-handler versiyası).

**Niyə bu, React Native-in öz `PanResponder`-i deyil?** `PanResponder` bütün gesture hesablamasını **JS thread-də** aparır — mürəkkəb gesture-lərdə (sürüşdürmə + sürət + native scroll ilə qarşılıqlı əlaqə) gecikməyə/"jank"a səbəb olur. `react-native-gesture-handler` gesture tanımasını **native tərəfə** köçürür, JS thread-i bloklamır. Həm də React Navigation-un öz "sürüşdürüb geri qayıtma" (swipe-back) davranışı da bu paketə söykənir.

**Gotcha — `GestureHandlerRootView` yalnız **bir dəfə**, kökdə olmalıdır.** `BottomSheet`-in `Modal`-ının içinə ikinci bir dənə qoymaq (Android-də `Modal` ayrı native pəncərədə render olunduğu üçün məntiqli görünür) sınandı; nəticədə onun daxilindəki sarğı elementlərinin **core RN `TouchableOpacity`** qalması məcburi oldu. Gesture-handler-in öz `TouchableOpacity`-si ilə əvəz edildikdə `flex:1`/`justifyContent:'flex-end'` layoutu səssizcə sındı — sheet ekranın **yuxarısına** yapışdı, ağ-üstə-ağ görünməz oldu və bütün tətbiqdə altındakı toxunuşları udmağa başladı. Yalnız sifariş detalındakı `ScrollView` gesture-handler versiyasına keçirilməli idi.

### `react-native-reanimated` (4.5.3) + `react-native-worklets` (0.11.3)

**Nə üçün:** İki ayrı iş görür. (1) Klaviatura: `useAuthFormScroll.ts` və `useAccountInfoForm.ts`-də `useReanimatedKeyboardAnimation`-un `progress.value`-si (klaviatura artıq açıqdırsa 0ms, hələ açılırsa ~300ms scroll gecikməsi seçmək üçün). (2) Animasiyalar: `AnimatedSplashScreen` (açılış ekranının bütün timeline-ı — səbətin xətt-cizgi çəkilməsi, meyvələrin düşməsi, wordmark, fade-out), `Skeleton` (yüklənmə pərdələrinin pulsasiyası), `ThemeSwitch` və `LanguagePicker` (toggle/seçim keçidləri).

**Niyə Reanimated, sadə `Animated` API deyil?** `Animated`, animasiya dəyərlərini JS thread-dən idarə edir (bəziləri "native driver" ilə native tərəfə ötürülsə də) — Reanimated isə animasiya **məntiqini** ("worklet"lər) birbaşa UI thread-də icra edir, JS thread-in məşğul olması (məsələn şəbəkə cavabı emalı) animasiyaya təsir etməsin deyə. Açılış ekranı bunun ən aydın nümunəsidir: animasiya oynayarkən JS thread paralel olaraq Keystore oxuması, i18n init-i və naviqasiya qurulması ilə məşğuldur — `Animated` ilə bu, gözlə görünən kəkələmə demək olardı.

**`react-native-worklets` niyə ayrıca paketdir?** O, Reanimated v4-ün worklet-ləri kompilyasiya/icra edən **nüvəsidir** — əvvəllər Reanimated-in öz daxilində idi, v4-də ayrı paketə çıxarılıb. Layihə ondan birbaşa da istifadə edir: `AnimatedSplashScreen`-də `scheduleOnRN` (UI thread-dən JS thread-ə geri çağırış). **Gotcha:** bu iş üçün köhnə `runOnJS` **deprecated**-dir və konsola xəbərdarlıq yazır — yeni kodda `scheduleOnRN` işlədilməlidir.

**Niyə `@gorhom/bottom-sheet` istifadə olunmayıb?** Bu, layihənin ən öyrədici "əvvəl sınadıq, işləmədi" hekayəsidir. `@gorhom/bottom-sheet` v5, layihənin Reanimated v4-ü ilə **səssizcə** uyğunsuz çıxdı — `present()` heç bir JS xətası vermədən çağırılırdı, amma sheet **heç vaxt görünmürdü** (həm `enableDynamicSizing`, həm açıq `snapPoints` sınandı). Reanimated-i v3-ə endirmək də alternativ kimi sınandı, amma v3-ün Android tərəfi (`ReanimatedModule.java`) RN 0.83-ün New Architecture API-ları ilə compile olmurdu (`UIManagerModuleListener` kimi siniflər artıq mövcud deyildi) — bu da **ölü son** oldu. Nəticə: kitabxana tam çıxarılıb, əvəzinə core `Animated` + `gesture-handler`-in yalnız handle-də `PanGestureHandler`-i ilə **öz** `BottomSheet.tsx` komponenti yazılıb. **Dərs:** çox yeni (bu halda Reanimated v4-ün worklet arxitekturası) bir asılılıqla işləyərkən, üçüncü-tərəf kitabxanaların **hələ** ona uyğunlaşmamış ola biləcəyini nəzərə almaq lazımdır.

### `react-native-keyboard-controller` (1.22.2)

**Nə üçün:** `KeyboardProvider` (Providers.tsx-də) + `KeyboardAwareScrollView` — bütün form ekranlarında (`LoginScreen`, `RegisterScreen`, `AccountInfoForm`) klaviatura açılanda avtomatik scroll.

**Niyə bu, core `KeyboardAvoidingView` + `behavior` prop-u deyil?** Sınanıb və uyğun gəlmədiyi sənədləşdirilib: Android-də `adjustResize` (native pəncərə ölçüsünü avtomatik dəyişmə) və `KeyboardAvoidingView`-un öz JS-səviyyəli hündürlük/padding tənzimləməsi **eyni vaxtda** işləyəndə bir-birini "ikiqat tənzimləyir" və klaviatura bağlananda ekranın altında boş sahə qalırdı. `react-native-keyboard-controller` klaviatura hadisələrini native tərəfdən daha dəqiq izləyir və bu double-adjust problemi olmadan işləyir.

**Gotcha — göndər düyməsi ScrollView-un **içində** qalmalıdır.** Kitabxananın `ScrollViewWithBottomPadding` sarğısı daxildə `flexGrow:1` sərt-kodlayır; ScrollView-un **kənarında**, qardaş element kimi qoyulmuş bir footer/düymə məzmunun uzunluğundan asılı olmayaraq **həmişə** ekranın dibinə itələnir. Formun sonunda görünməli olan düymə ScrollView-un məzmununun içində saxlanılmalıdır.

---

## 11. Media və asset-lər

### `react-native-svg` (15.15.5) + `react-native-svg-transformer` (1.5.3)

**Nə üçün:** İki fərqli istifadə forması var. (1) **JSX-də əl ilə yazılmış** ikonlar — `src/shared/icons/` (`navigation.tsx`/`actions.tsx`/`shopping.tsx`/`account.tsx`/`contact.tsx`), açılış ekranının animasiyalı meyvə/səbət formaları (`SplashFruitShapes.tsx`, `DrawnPath.tsx`, `FallingFruit.tsx`), boş-vəziyyət ikonları (`BasketEmptyState`, `EmptyCategoryState`). (2) **Fayldan import olunan** SVG — `WelcomeScreen`-dəki `import FruitImage from '@assets/images/images1.svg'`.

**Niyə SVG, PNG deyil?** SVG **vektor** formatdır — istənilən ekran sıxlığında (1x, 2x, 3x) itki olmadan miqyaslanır, PNG isə hər sıxlıq üçün ayrı fayl (`icon.png`, `icon@2x.png`, `icon@3x.png`) tələb edərdi. Kiçik ikonlar üçün SVG həm fayl ölçüsü, həm də saxlanma rahatlığı baxımından üstündür. Əlavə olaraq: SVG-nin rəngi prop kimi ötürülə bilir (`<CheckIcon color={colors.primary} />`) — dark mode ilə bu, praktiki bir tələbdir, PNG üçün isə hər tema üçün ayrı fayl dəsti lazım olardı.

**`svg-transformer` nə üçündür?** `react-native-svg` tək başına yalnız **runtime**-da SVG render etməyi bacarır (JSX kimi `<Svg><Path .../></Svg>` yazmaq lazımdır) — `svg-transformer` isə Metro-ya `.svg` fayllarını **birbaşa import olunan React komponentləri** kimi tanımağa imkan verir (`import Logo from './logo.svg'`), `metro.config.js`-də konfiqurasiya olunub, tip tərəfdən isə kök `types/svg.d.ts`-dəki ambient modul bəyanı ilə tamamlanır.

**Gotcha — brend loqolarını əl ilə "təxmin edərək" çəkməyin.** `contact.tsx`-dəki WhatsApp ikonu iki dəfə freehand çəkildi (danışıq baloncuğu + telefon cizgisi) və ikinci variant istifadəçiyə "giriş qadağandır" işarəsi kimi göründü — dairəvi baloncuq + diaqonal xətt vizual olaraq **başqa bir tanınmış simvola** çevrilir. Həll: konkret bir brendi təmsil edən ikon üçün tanınmış, hazır monoxrom `<Path>` işlətmək. Ümumi anlayış ikonları (ox, səbət, tənzimləmə) üçün freehand tamamilə normaldır — orada "səhv olmaq" mümkün deyil, brend markasında isə mümkündür.

### `react-native-image-picker` (8.2.1)

**Nə üçün:** `src/screens/protected/profile/hooks/useAvatarUpload.ts` (`launchImageLibrary`) — `AvatarPicker` komponenti üçün profil şəklini qalereyadan seçmək.

**Niyə bu, `expo-image-picker` deyil?** Layihə **Expo idarəli iş axını** (managed workflow) üzərində deyil, "bare" React Native CLI layihəsidir — Expo-nun modulları adətən `expo-modules-core` runtime-ını tələb edir, o da bu RN versiyasında layihəyə **sınanmış və təsdiqlənmiş** şəkildə uyğun gəlmir (bax `expo-image` epizodu, Hissə 8 və `KOD-IZAHI.md` Hissə 23). `react-native-image-picker` bare RN layihələri üçün ən çox istifadə olunan, native modul kimi birbaşa quraşdırılan alternativdir.

**Vacib istifadə detalı:** seçim `maxWidth`/`maxHeight`/`quality` parametrləri ilə **seçim anında** kiçildilir. Səbəb sadəcə "trafikə qənaət" deyil — müasir telefon kamerasının tam ölçülü şəkli bir neçə meqabayt olur, bu isə multipart yükləməni həm yavaşladır, həm də uğursuzluq ehtimalını artırır. Şəkli serverə göndərməzdən əvvəl kiçiltmək, sonradan server tərəfdə həll etməkdən ucuzdur.

### `react-native-bootsplash` (7.3.2)

**Nə üçün:** Açılış ekranının **native** hissəsi və tətbiq ikonu generasiyası. `AnimatedSplashScreen.tsx`-də `BootSplash.useHideAnimation({ manifest, ready, animate })` ilə işlədilir.

**Niyə bu, React Native-in default splash həlli deyil?** RN-in özü hazır bir splash-screen sistemi təklif etmir — hər layihə ya native tərəfdə əl ilə (Android-də `styles.xml`, iOS-da `LaunchScreen.storyboard`) qurur, ya da bir kitabxana işlədir. `react-native-bootsplash` bu prosesi CLI ilə avtomatlaşdırır və — daha vacibi — native splash-dan JS-ə keçidi **atlanmasız** edir.

**Vacib düzəliş — bu layihədə native splash **boşdur**, görünən açılış ekranı JS-də çəkilir.** Sadə `BootSplash.hide({ fade: true })` naxışı burada işlədilmir. Bunun əvəzinə: hər `android/app/src/main/res/drawable-*/bootsplash_logo.png` qəsdən **1x1 tam şəffaf** 68-baytlıq placeholder-dir, real animasiya (`SplashScene` — səbətin xətt-cizgi çəkilməsi → dolması → meyvələrin düşməsi → "TIKTAK" wordmark → fade-out) isə Reanimated ilə JS-də oynayır. `useHideAnimation` native splash-ı gizlədib bizim `animate` callback-imizi çağırır, `container` prop-ları isə JS view-un native splash-la **eyni** yerdə/ölçüdə durmasını təmin edir — yəni keçid anında gözlə görünən heç bir sıçrayış olmur.

**Gotcha — mark-ın ölçüsü `SCENE_SCALE` ilə dəyişdirilir, viewBox ilə yox.** `splashTimeline.ts`-dəki bütün yollar (səbətin konturu, hər meyvənin `from`/`to` ofsetləri) sabit 170×220 koordinat sahəsində yazılıb. `VIEWBOX_WIDTH`/`VIEWBOX_HEIGHT`-i böyütmək rəsmi böyütmür — sadəcə eyni ölçülü rəsmin ətrafına boş kanvas əlavə edir. Yeganə düzgün düymə `AnimatedSplashScreen.styles.ts`-dəki `SCENE_SCALE`-dir.

**Gotcha — release build-də AAPT2 çökməsi bu şəffaf PNG-lərdən qaynaqlanır.** `assembleRelease`, `mergeReleaseResources` mərhələsində `Unexpected error during compile '...bootsplash_logo.png'` ilə sınırdı. Səbəb faylın **pozuq olması deyil** — aapt2 tam şəffaf PNG-ləri "crunch" edərkən access violation ilə çökür (Gradle-dan kənarda da təkrarlanır; ölçünün əhəmiyyəti yoxdur). Həll: `android/app/build.gradle`-də release buildType üçün `crunchPngs false`. Debug build-lər bunu heç vaxt görmür (AGP debuggable tiplərdə crunching-i onsuz da söndürür) — yəni "installDebug işləyir, assembleRelease işləmir" məhz bu problemin imzasıdır.

**Gotcha — CLI-nin loqo ölçüsü limiti.** `--logo-width` 134dp-dən böyük olanda kəsilmə xəbərdarlığı, 192dp-dən böyük olanda isə generasiyadan tamamilə imtina edir. Native ikon üçün 134-dən aşağı qalmaq lazımdır; JS-də çəkilən mark bu limitə tabe deyil.

---

## 12. Siyahılar (lists)

### `@shopify/flash-list` (2.3.2)

**Nə üçün:** Məhsul grid-ləri — `src/shared/components/ProductGrid/`, yəni həm `CategoryProductsScreen`-in kateqoriya məhsulları, həm də `MyListsScreen`-in favoritlər grid-i bu tək komponentdən keçir.

**Niyə FlashList, core `FlatList` deyil?** `FlatList` hər elementi ekrana girəndə/çıxanda **yenidən yaradır/məhv edir** (recycling yoxdur, və ya məhdud) — böyük, şəkilli grid-lərdə scroll zamanı "jank" (kəsik hərəkət) yaradır. FlashList (Shopify-ın kitabxanası) hüceyrələri **təkrar istifadə edir** (`RecyclerListView` prinsipi ilə), nəticədə xüsusilə uzun, şəkilli siyahılarda əhəmiyyətli performans artımı verir.

**Niyə hər yerdə deyil?** Daha sadə siyahılar (`OrderHistoryScreen`, `SearchScreen`, kateqoriya grid-i) hələ də core `FlatList` işlədir — o ekranlarda element sayı azdır, FlashList-in performans üstünlüyü praktiki fərq yaratmır. Bu şüurlu bir asimmetriyadır: "yeni alət tapdıq, hər yerə tətbiq edək" yanaşması burada yalnız əlavə mürəkkəblik gətirərdi.

**Diqqət (layihənin özündə sənədləşdirilmiş "gotcha"):** FlashList `PureComponent`-ə bənzər davranış göstərir — `data`/`extraData` prop-larında olmayan bir dəyişiklik (məsələn Zustand store-dan gələn səbət miqdarı) hüceyrələri **avtomatik** yenidən render etmir. Layihə bunu `ProductGrid`-də `extraData={basket}` ilə həll edib — unudulsa, "başqa ekrandan geri qayıdanda köhnə miqdar görünür" kimi sərt görünən, əslində sadə bir bug yaranır. Bu real olaraq bir dəfə baş verib.

---

## 13. Bildirişlər

### `react-native-toast-message` (2.4.0)

**Nə üçün:** Bütün "uğurla..." / xəta bildirişləri (giriş, çıxış, səbətə əlavə/silmə, favorit, ünvan yeniləmə, tema sıfırlama). Konfiqurasiya `src/shared/utils/toast.tsx`-dədir.

**Niyə bu, native `Alert.alert` deyil?** `Alert.alert` **bloklayıcıdır** — istifadəçi "OK" düyməsinə basana qədər ekranı tutur, sürətli, ardıcıl əməliyyatlar (məsələn səbətə bir neçə məhsul tez-tez əlavə etmək) üçün narahatedicidir. Toast isə **keçicidir** (bir neçə saniyə görünüb özü yox olur), istifadəçinin davam etməsinə mane olmur — bu, müasir mobil UX-in standart naxışıdır.

**Niyə məhz bu paket, öz komponentini yazmaq (layihənin `BottomSheet`-də etdiyi kimi) deyil?** Burada fərq öz-yazma fəlsəfəsindən **çəkinmək** deyil — `@gorhom/bottom-sheet` real bir uyğunsuzluq problemi yaratmışdı, amma toast-ın öz yazılması üçün belə bir məcburiyyət yoxdur. `react-native-toast-message` **tamamilə JS-dir, heç bir native kodu yoxdur** (`dependencies: {}`, sıfır asılılıq) — quraşdırma, native rebuild, ya versiya uyğunsuzluğu riski praktiki olaraq yoxdur. Toast, `BottomSheet`-dən fərqli olaraq sadə (timed fade-in/out, gesture lazım deyil) bir komponentdir, amma hazır, yaxşı sınanmış, sıfır-risk bir seçim mövcud olduğu üçün onu təkrar yazmaq əlavə dəyər verməzdi.

**Gotcha — `toastConfig`-in girişləri **əsl komponent** olmalıdır, sadə funksiya yox.** Bu, "sıfır native kod = sıfır risk" fikrinin sərhədini göstərən real bir bug-dır. Kitabxana `config[type](props)`-u öz `ToastUI` render-inin **daxilində birbaşa funksiya çağırışı** kimi icra edir (JSX kimi yox) — yəni konfiqurasiya girişinin içinə düz yazılmış bir `useTheme()` **öz** komponentinin deyil, `ToastUI`-nin hook siyahısına qoşulur. Bu, təsadüfən işləyirdi, çünki `success` və `error` girişlərinin hər biri **dəqiq bir** hook çağırırdı; amma kitabxananın öz `info` fallback-ı **heç bir** hook çağırmır — yəni bir dəfə `info` toast-ı göstərmək hook sayını render-lər arası dəyişdirib `Rendered fewer hooks than expected` ilə tətbiqi çökdürərdi. Həll: `success: props => <SuccessToastView {...props} />` kimi **JSX olaraq** render etmək. `eslint`-in `react-hooks/rules-of-hooks` qaydası bunu düzgün göstərirdi — **disable şərhi ilə susdurulmamalıdır**.

### `@notifee/react-native` (9.1.8)

**Nə üçün:** `src/shared/utils/notifications.ts` — sifariş verildikdən sonra əməliyyat sisteminin bildiriş panelinə göndərilən **yerli** (local) bildirişlər. **Diqqət:** bu, yuxarıdakı `react-native-toast-message`-dən **tamam fərqli** bir kateqoriyadır — toast tətbiq **açıq** ikən ekranın üzərində görünür, Notifee-nin bildirişləri isə OS-in öz bildiriş mərkəzinə gedir, tətbiq fonda/bağlı olsa belə görünə bilər.

**Niyə Notifee, React Native-in "community" push-notification paketi (`react-native-push-notification` və ya `@react-native-firebase/messaging`) deyil?** Layihənin heç bir **real** backend push infrastrukturu (FCM/APNs qeydiyyatı) yoxdur — bu bildirişlər tamamilə **yerli**, client-side taymerlərlə yaradılır ("sifariş qəbul edildi" dərhal, "hazırlanır" 30 saniyə sonra). Firebase-ə bağlı bir paket seçmək, real push infrastrukturu olmayan bir ehtiyac üçün lazımsız bir ekosistem asılılığı (Firebase layihəsi qurmaq, `google-services.json` idarə etmək) yaradardı. Notifee isə **saf yerli** bildiriş idarəetməsinə fokuslanıb, heç bir push-backend tələb etmir, amma gələcəkdə real push əlavə olunsa, Firebase-in özü ilə **yanaşı** işləyə bilir (əvəz etmək lazım deyil).

**Gotcha-nın olmaması özü bir "gotcha"dır — niyə vurğulanır?** `@notifee/react-native` **saf Java** ilə yazılıb (Kotlin deyil) — `KOD-IZAHI.md`-nin Hissə 23-ündə izah olunan "yeni native asılılıq əlavə etməzdən əvvəl Kotlin/Java nisbətini yoxla" prinsipinin **müsbət** nümunəsi kimi seçilib: build ilk cəhddə uğurla keçdi, `expo-image`-in yaşadığı Promise-interfeys uyğunsuzluğu ilə **heç bir** oxşarlığı olmadı.

**Gotcha — Android 13+ icazəsi istifadə anında istənilir və rədd cavabı xəta sayılmır.** `notifications.ts` `POST_NOTIFICATIONS` icazəsini `notifee.requestPermission()` ilə məhz bildiriş göndərmə anında soruşur (tətbiq açılışında yox — istifadəçi hələ heç bir sifariş verməmişkən icazə istəmək mənasızdır). İstifadəçi rədd etsə, funksiya **səssizcə heç nə etmir**: sifariş onsuz da uğurla verilib, bildirişin çıxmaması axını pozmamalıdır.

**Gotcha — background handler əlavə olunarsa, yeri `index.js`-dir.** Hazırda layihədə belə bir handler yoxdur (bütün bildirişlər tətbiq açıq ikən planlaşdırılır). Əgər əlavə olunsa, qeydiyyat `AppRegistry.registerComponent`-dən **əvvəl**, `index.js`-də olmalıdır — `App.tsx`-in içindən yox. Səbəb: tətbiq bağlı ikən gələn bildiriş React ağacı ümumiyyətlə qurulmamış icra olunur, yəni komponent daxilində qeydiyyat gecdir.

---

## 14. Alət zənciri (tooling)

### `typescript` (5.9.3)

Bütün kod bazası TypeScript-dədir — səbəb `KOD-IZAHI.md`-də ətraflı izah olunub: runtime-dan **əvvəl** tip səhvlərini (məsələn, `product.titel` kimi yazı səhvi) tutmaq.

**Gotcha — `tsconfig.json`-dakı `"types": []` qəsdəndir.** Bax Hissə 15 (jest-in silinməsi) — o boş massiv silinsə, build dərhal `TS2688` ilə sınır.

### `@types/react` (19.2.17)

React-in tip bəyanları. React 19-un öz paketi tipləri daşımır, ona görə bu ayrıca asılılıqdır və `react`-in major versiyası ilə **eyni** xətdə (19.x) saxlanılmalıdır.

### `eslint` (8.57.1) + `@react-native/eslint-config` (0.83.10)

Kod stilinin və potensial bug-ların (istifadə olunmayan dəyişən, səhv hook istifadəsi) avtomatik yoxlanması. RN-in rəsmi konfiqurasiyası işlədilir ki, komanda "necə formatlamalıyıq" kimi mübahisələrə vaxt sərf etməsin.

**Niyə hələ ESLint 8, 9 deyil?** ESLint 9 tamamilə yeni "flat config" formatına keçib; `@react-native/eslint-config`-in bu RN versiyası üçün buraxılışı isə köhnə `.eslintrc` formatına əsaslanır. 9-a keçmək, RN-in rəsmi konfiqurasiyasını **əl ilə** yenidən yazmaq demək olardı — bu isə "linter işləsin" məqsədi ilə müqayisədə əsassız bir iş həcmidir. Bu, praktikada ESLint-in real dəyər verdiyi bir hadisə ilə də təsdiqləndi: yuxarıdakı toast hook-ları buq-unu ilk göstərən məhz `react-hooks/rules-of-hooks` qaydası oldu.

### `prettier` (2.8.8)

Kod formatlaşdırması avtomatlaşdırılıb — kod nəzərdən keçirmələrində (code review) formatla bağlı şərhlərin qarşısını alır. Versiya 2.x-də qalır, çünki RN-in eslint konfiqurasiyası onunla uyğunlaşdırılıb; 3.x-in fərqli default-ları (məsələn trailing comma davranışı) bütün kod bazasında lazımsız bir "formatla-yenidən" diff-i yaradardı.

### `@babel/core` + `@babel/preset-env` + `@babel/runtime` (7.29.7) + `@react-native/babel-preset` (0.83.10)

JS/TS-in transpile qatı. Birbaşa konfiqurasiya olunmurlar — RN-in preset-i onları idarə edir; üçünün eyni `7.29.7` xəttində saxlanılması preset-in gözlədiyi versiya ilə uyğunsuzluqdan qaçmaq üçündür.

### `babel-plugin-module-resolver` (5.0.3)

`@shared/*`, `@assets/*`, `@typings/*` kimi path alias-larını iş vaxtında (build zamanı) həqiqi nisbi yollara çevirir. **Niyə lazımdır?** Alias-lar olmadan dərin qovluqlardan import etmək `../../../../shared/components/Button` kimi oxunması çətin yollar yaradırdı — alias bunu `@shared/components/Button`-a sadələşdirir. TypeScript tərəfdə eyni alias-lar `tsconfig.json`-un `paths`-ində də təkrarlanmalıdır (build-time və type-check-time ayrı sistemlərdir, biri digərini avtomatik "bilmir").

**Gotcha — alias `@types` adlana bilməz.** Ona görə `@typings/*` seçilib: `@types` adı TypeScript-in öz DefinitelyTyped həlletmə mexanizmi ilə toqquşur və `TS6137` xətası verir.

### `@react-native/metro-config` (0.83.10)

Metro bundler-in RN üçün hazır konfiqurasiyası. `metro.config.js` onun üzərinə yalnız bir dəyişiklik qoyur: `.svg` fayllarını `react-native-svg-transformer`-ə yönləndirmək.

### `@react-native/typescript-config` (0.83.10)

Layihənin `tsconfig.json`-unun miras aldığı baza konfiqurasiya. **Diqqət:** o, `"types": ["jest"]`-i sərt-kodlaşdırıb verir — bu, jest silindikdən sonra bir problemə çevrildi, bax Hissə 15.

### `patch-package` (8.0.1)

`react-native-screens` patch-ini `npm install`-dan sonra avtomatik tətbiq edir (`postinstall` script-i). **Niyə fork etmək əvəzinə patch?** Bütöv paketi fork edib öz npm registry-nizdə saxlamaq — versiya yeniləmələrini əl ilə sinxronlaşdırmaq deməkdir. `patch-package` isə orijinal paketi olduğu kimi saxlayır, yalnız **konkret dəyişikliyi** `node_modules` üzərinə tətbiq edir — paket öz-özünə yenilənəndə patch-in hələ də tətbiq oluna biləcəyini yoxlamaq kifayətdir.

### `@react-native-community/cli` + `cli-platform-android` + `cli-platform-ios` (20.0.0)

RN CLI-nin özü — `npx react-native start`, `run-android` kimi əmrləri təmin edir. Layihənin `package.json`-unda **açıq** versiya sabitlənib ki, CLI-nin qlobal versiyası ilə uyğunsuzluq yaranmasın.

**Gotcha — bu maşında `run-android` işləmir, bu CLI-nin buq-u deyil.** Node ≥20.11/18.19.1 (CVE-2024-27980 düzəlişi) `.bat` fayllarının birbaşa spawn edilməsini blokladı, CLI isə Gradle-ı məhz belə çağırır. İş üsulu: `cd android && ./gradlew.bat app:installDebug` (PowerShell-də, Git Bash-də yox), sonra `adb shell am start -n com.tiktak/.MainActivity`. Eyni səbəbdən `scripts/build-apk.js` (`npm run apk`) `gradlew.bat`-ı **tam həll olunmuş yol** ilə çağırır, sadə ad ilə yox.

---

## 15. Silinmiş paketlər (artıq `package.json`-da yoxdur)

Bu bölmə hazırda **mövcud olmayan** asılılıqları izah edir. Səbəb: sənədin əsas sualı "niyə məhz bu paket seçilib" olduğuna görə, "niyə bu paket **artıq yoxdur**" da eyni dərəcədə əhəmiyyətli bir qərardır — əks halda köhnə kod nümunələrinə və ya köhnə sənəd hissələrinə rast gələn növbəti sessiya paketin hələ də layihədə olduğunu güman edib səhv fərziyyə qurur.

### `@react-native-async-storage/async-storage` (əvvəlki: 1.22.3) — silinib 2026-09-06

**Nə üçün idi:** Token saxlama qatı — access/refresh token-ları və `remember_me` bayrağını cihaz yaddaşında saxlayırdı. 2026-08-22-də bu iş tamamilə `react-native-mmkv`-yə köçürüldü (səbəblər Hissə 9-da), paketin özü isə həmin miqrasiyada silinmədi.

**Niyə silindi?** Miqrasiyadan (2026-08-22) silinməyə (2026-09-06) qədər keçən ~2 həftə ərzində `src/` daxilində bu paketin **sıfır** import-u qaldı. Yəni "gələcəkdə yenə lazım ola bilər" ehtimalını dəstəkləyən heç bir real siqnal üzə çıxmadı — nə bir yeni istifadə yeri, nə də MMKV-nin çatmadığı bir ssenari. Bu şəraitdə ölü asılılığı saxlamağın yalnız iki nəticəsi vardı: (1) bundle ölçüsünün lazımsız artması, (2) daha ciddisi — gələcək bir sessiyanın kodu oxuyarkən "token AsyncStorage-dadırmı?" deyə səhv fərziyyə etmə riski. İkincisi konkret bir **yanlış istiqamətə aparan** risk idi, ona görə paket tamamilə çıxarıldı.

**Niyə iki addımda — əvvəl saxlanılıb (sadəcə sənədləşdirilib), sonra silinib?** Bu, layihənin "bir addımda hər şeyi eyni anda dəyişmə" prinsipinin birbaşa nəticəsidir. MMKV-yə keçid **funksional** və **riskli** bir dəyişiklik idi: native modul əlavə edilir, şifrələmə açarı Keychain-dən oxunur, `tokenStorage.ts`-in bütün çağırış yerləri dəyişir, native rebuild tələb olunur — nəsə sınsa, günahkarın hansı dəyişiklik olduğunu dəqiq bilmək lazımdır. Ölü asılılığın `package.json`-dan silinməsi isə **risksiz təmizlik** işidir. Bu ikisini eyni commit-də birləşdirmək o deməkdir ki, miqrasiyadan sonra hər hansı build/runtime problemi çıxsa, "MMKV inteqrasiyası səhvdir" ilə "silinmiş paket hardasa hələ də lazım imiş" versiyaları bir-birindən ayrıla bilməz. Ona görə əvvəlcə miqrasiya təkbaşına tamamlandı, paketin **niyə** artıq işlədilmədiyi sənədləşdirildi, real istifadənin sıfır olduğu bir müddət müşahidə edildi — və yalnız bundan sonra silmə ayrıca, öz başına bir addım kimi edildi.

**Qeyd — ada baxıb səhv salmayın:** `@tanstack/query-async-storage-persister` **ayrıca** paketdir və hələ də layihənin asılılığıdır (Hissə 5). Adında "async-storage" keçməsinə baxmayaraq, `queryStorage.ts` onu AsyncStorage ilə deyil, **MMKV** ilə təchiz edir — bu paket sadəcə "asinxron interfeysli hər hansı yaddaş" gözləyir, konkret olaraq AsyncStorage-ı deyil.

### `jest` (əvvəlki: 29.7.0) + `@types/jest` (29.5.14) + `react-test-renderer` (19.2.0) + `@types/react-test-renderer` (19.1.0) — silinib 2026-09-06

**Nə üçün idi:** Test runner və test infrastrukturu — `validation.test.ts` və RN şablonunun öz `App.test.tsx` faylı üçün. Paketlərlə birlikdə `jest.config.js` faylı və `package.json`-dakı `test` script-i də vardı.

**Niyə silindi — texniki səbəb deyil, məhsul qərarı:** Burada heç bir versiya uyğunsuzluğu, build xətası və ya RN 0.83 ilə konflikt yoxdur. İstifadəçidən (layihə sahibindən) testlərin bu layihəyə **konkret nə qazandıracağı** soruşuldu; 2026-09-04-də cavab "test yazmağı dayandıraq" oldu. Yəni silmə bir problemdən qaçmaq deyil, açıq şəkildə verilmiş bir qərarın icrasıdır.

**Niyə "işləyən testləri silmək" deyil?** Bu, qərarın ən vacib hissəsidir: silinən şey **işləyən test toplusu deyildi**. Qalan iki test faylının ikisi də artıq **işləmirdi**:

- `validation.test.ts` — validatorların qaytardığı sabit Azərbaycan mətnlərini yoxlayırdı, halbuki `validation.ts` çoxdan `i18n.t()`-yə keçmişdi və o mətnləri artıq **qaytarmırdı**; üstəlik MMKV/Nitro üçün heç bir mock olmadığından fayl **yüklənə belə bilmirdi**.
- RN şablonunun öz `App.test.tsx`-i — `RNGestureHandlerModule` üzərində xəta verib ölürdü.

Yəni `npm test` **heç vaxt** uğurlu olmurdu. Həmişə qırmızı olan bir test əmri, olmayan test əmrindən **daha pisdir**: ona artıq heç kim baxmır, "yəqin yenə həmin köhnə xətadır" deyilir, və nəticədə real bir problemi göstərsə belə fərq edilməz. Ona görə seçim "testləri düzəltmək" ilə "testləri silmək" arasında deyil, "daimi qırmızı, etibarsız bir siqnalı saxlamaq" ilə "heç bir siqnal olmadığını açıq etiraf etmək" arasında idi.

**Gotcha — `tsconfig.json`-dakı `"types": []` qəsdəndir, silinməməlidir:** `@types/jest` silinəndən sonra layihə `TS2688: Cannot find type definition file for 'jest'` xətası ilə sındı. Səbəb: layihənin miras aldığı `@react-native/typescript-config` paketi `"types": ["jest"]`-i **sərt-kodlaşdırıb** verir — yəni TypeScript-ə "jest tiplərini tap və yüklə" deyir, halbuki artıq tapılacaq bir şey yoxdur. Həll: layihənin öz `tsconfig.json`-unda bu miras dəyəri açıq **boş massivlə** (`"types": []`) üstələmək. Fayla baxanda bu, "unudulmuş, təmizlənməli boş kod" təsiri bağışlaya bilər — belə deyil, o massiv silinən kimi build yenidən sınır.

### `@gorhom/bottom-sheet` və `expo-image` — heç vaxt `package.json`-a düşməyib

Bu ikisi yuxarıdakılardan **fərqli** bir kateqoriyadır: sınandılar, işləmədilər və tam geri çevrildilər — yəni "silinmiş asılılıq" deyil, "rədd edilmiş namizəd"dirlər. Hekayələri Hissə 10 (bottom-sheet, Reanimated v4 uyğunsuzluğu) və Hissə 8/`KOD-IZAHI.md` Hissə 23-də (expo-image, `expo-modules-core` Kotlin/Promise uyğunsuzluğu) izah olunub. **Vacib fərq:** `expo-image` "hələlik təxirə salınıb" deyil, bu RN versiyası üçün **qapalı** sayılır — yəni şəkil keşləmə funksiyası hazırda **prinsipial olaraq bloklanıb**, sadəcə növbəyə qoyulmayıb.

Eyni kateqoriyadan bir üçüncü hal var, amma səbəbi texniki deyil: **deep linking (`tiktak://`)** tam tətbiq olundu və **işlədi**, sonra istifadəçinin açıq istəyi ilə çıxarıldı ("açılacaq real bir link olmadığına görə praktiki istifadə yeri yoxdur"). Bu, uğursuzluq deyil, **əhatə dairəsindən çıxarılma**dır — mövzu yenidən qalxsa, sıfırdan araşdırmağa ehtiyac yoxdur.

---

## 16. Ümumi nəticə — seçim fəlsəfəsi

Bütün paket seçimlərini nəzərdən keçirəndə beş təkrarlanan meyar görünür:

1. **Sınanmış, geniş icmalı standart üstünlük təşkil edir** (React Navigation, Axios, Zustand) — "daha yeni/eksperimental" alternativlər yalnız real, konkret bir problem həll etdikdə seçilib (MMKV-nin sinxronluğu, FlashList-in performansı, Reanimated-in UI-thread animasiyaları).
2. **Native koda toxunan hər asılılıq şübhə ilə qarşılanır.** `react-native-toast-message`-in "sıfır native kod" olması özəlliklə vurğulanıb seçim səbəbi kimi — çünki layihə artıq `@gorhom/bottom-sheet` ilə native/JS uyğunsuzluğunun real qiymətini görüb. Bu, sonradan formal bir ön-yoxlamaya çevrilib: yeni native asılılıq üçün **əvvəlcə** Kotlin/Java nisbətinə, New Architecture markerlərinə və `peerDependenciesMeta`-ya baxılır, **sonra** feature kodu yazılır.
3. **Sınayıb-uğursuz-olma təcrübəsi sənədləşdirilir, təkrarlanmır.** `@gorhom/bottom-sheet` epizodu təsadüfi deyil — sonrakı sessiyalarda `expo-image` ilə **eyni kateqoriyadan** bir uğursuzluq (native/JS Promise-interfeys uyğunsuzluğu) yaşandı və eyni şəkildə sənədləşdirilib, tərk edilib. CLAUDE.md-nin "Gotchas" bölməsi və bu sənədin Hissə 15-i məhz gələcək sessiyaların **eyni araşdırmanı təkrar etməməsi** üçün var.
4. **Pulsuz/açıq alternativ, ödənişli/qapalı olandan üstün tutulur, eyni funksionallığı verirsə.** MapLibre + OpenFreeMap-in Google Maps əvəzinə seçilməsi (billing hesabı tələb etməmək üçün) bu prinsipin ən aydın nümunəsidir — funksional fərq praktiki olaraq yox idi, seçim tamamilə "istifadəçidən əlavə öhdəlik tələb etməmək" mühakiməsinə əsaslanıb.
5. **Mövcud paketlə həll oluna bilən şey üçün yeni paket gətirilmir.** Kampaniyalar ekranı, ödəniş üsulu seçimi, axtarış tarixçəsi, dark mode, boş-vəziyyət ekranları — hamısı **sıfır** yeni asılılıqla əlavə olundu. Ən yaxşı asılılıq idarəetməsi, quraşdırılmayan asılılıqdır: yeni hər paket versiya uyğunluğu, native build riski və gələcək miqrasiya borcu gətirir. Bu sənədin özü də həmin mühasibatın bir hissəsidir — hər sətir, kiminsə gələcəkdə "bu niyə buradadır?" sualına cavab axtarmasına qənaət edilən vaxtdır.
