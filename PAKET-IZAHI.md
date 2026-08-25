# Tiktak — Paket Seçimləri və Səbəbləri

Bu sənəd `package.json`-dakı **hər bir paketi** ayrı-ayrı izah edir: nə üçün istifadə olunur, konkret olaraq **harada** işlədilir, və — ən vacibi — **niyə alternativləri deyil, məhz bu seçilib**. Bəzi qərarlar layihə boyu real problemlərdən (build xətaları, runtime bug-ları) sonra dəyişdirilib — bunlar ayrıca qeyd olunub, çünki "niyə" sualının ən dəqiq cavabı elə o təcrübədir.

> Bu sənəd `KOD-IZAHI.md`-nin tamamlayıcısıdır — orada kodun quruluşu, burada isə **hansı alətin seçilməsinin arxasında duran mühakimə** izah olunur.

---

## Məzmun

1. [Əsas framework](#1-əsas-framework)
2. [Naviqasiya](#2-naviqasiya)
3. [Şəbəkə (HTTP)](#3-şəbəkə-http)
4. [Qlobal state](#4-qlobal-state)
5. [Yerli yaddaş (storage)](#5-yerli-yaddaş-storage)
6. [Gesture, animasiya, klaviatura](#6-gesture-animasiya-klaviatura)
7. [Media və asset-lər](#7-media-və-asset-lər)
8. [Siyahılar (lists)](#8-siyahılar-lists)
9. [Bildirişlər](#9-bildirişlər)
10. [Alət zənciri (tooling)](#10-alət-zənciri-tooling)
11. [İstifadə olunmayan/köhnəlmiş paket](#11-istifadə-olunmayanköhnəlmiş-paket)
12. [Ümumi nəticə — seçim fəlsəfəsi](#12-ümumi-nəticə--seçim-fəlsəfəsi)

---

## 1. Əsas framework

### `react` (19.2.0) və `react-native` (^0.83.10)

**Nə üçün:** Tətbiqin özəyi. React-in komponent modeli + React Native-in bunu native Android/iOS view-larına çevirən qatı.

**Niyə React Native, Flutter/Kotlin+Swift deyil?** Komanda/layihə JavaScript/TypeScript bazasında işləyir — Flutter Dart, native inkişaf isə iki ayrı dil (Kotlin + Swift) və iki ayrı kod bazası tələb edərdi. React Native tək kod bazası ilə hər iki platforma "əsl" native komponentlər (JS-dən DOM-a bənzər virtual görüntü deyil, birbaşa `UIView`/`android.view.View`) istehsal edir.

**Niyə `0.83.10`, `0.83.0` yox?** Bu, layihənin ən konkret sənədləşdirilmiş qərarlarından biridir. RN `0.83.0`-da bir core Android reqressiyası var idi — bütün `FormData`/multipart yükləmələr (həm axios, həm fetch) heç bir server cavabı olmadan `Network Error` ilə səssizcə sınırdı (facebook/react-native#54881). Bu, profil avatarı yükləmə funksiyasını debug edərkən aşkarlandı. `0.83.1`+ versiyalarında düzəldilib, ona görə minimum `0.83.10`-a sabitlənib. **Alternativ (aşağı versiyaya enmək) düşünülməyib** — problem konkret bir RN buq-u idi, layihə arxitekturası ilə əlaqəsi yox idi.

### `@react-native/new-app-screen` (^0.83.10)

RN CLI-nin default "yeni layihə" boş ekranının paketi — RN template-inin tərkib hissəsidir, birbaşa istifadə olunmur, `@react-native/*` ailəsinin versiya uyğunluğu üçün saxlanılır.

---

## 2. Naviqasiya

### `@react-navigation/native` + `native-stack` + `bottom-tabs` (v7)

**Nə üçün:** Bütün ekran keçidləri — `RootNavigator` (auth axını + əsas tab-lar + basket/checkout stack-ı), `BottomTabNavigator`, `HomeStackNavigator`, `ProfileStackNavigator`.

**Niyə React Navigation, `react-native-navigation` (Wix) deyil?** İki əsas namizəd var: **React Navigation** (JS-də idarə olunan, geniş icma) və **react-native-navigation** (Wix-in, tam native naviqasiya stack-ı istifadə edən, daha performanslı amma quraşdırması/inteqrasiyası daha mürəkkəb). Kiçik-orta ölçülü bir e-commerce tətbiqi üçün React Navigation-un `native-stack` variantı (aşağıda izah olunur) artıq **native performans** verir, əlavə mürəkkəbliyə ehtiyac yaratmadan. Wix-in kitabxanası daha çox, çox böyük/performans-kritik tətbiqlərdə üstünlük təşkil edir.

**Niyə `native-stack`, sadə `stack` (JS-based) deyil?** React Navigation-un köhnə `@react-navigation/stack` paketi ekran keçidlərini **JS tərəfində** animasiya edir (`Animated` API ilə) — bu, mürəkkəb ekranlarda gecikməyə səbəb ola bilər. `native-stack` isə Android-də `Fragment`, iOS-da `UINavigationController`-in **əsl** naviqasiya mexanizmini işlədir — nəticə daha hamar keçidlər və daha az JS yükü.

### `react-native-screens` (^4.26.2, patch-lənib)

**Nə üçün:** `native-stack`-in özü daxildə bu paketə söykənir — hər ekranı native `Fragment`/`UIViewController`-ə "bağlayan" alt qatdır. Birbaşa import olunmur, React Navigation-un asılılığıdır.

**Niyə patch-lənib?** `patches/react-native-screens+4.26.2.patch` faylı bir TypeScript tip xətasını düzəldir: kitabxananın öz kodu React-in **köhnəlmiş** (`@deprecated`) `React.ElementRef` tipini gözləyirdi, amma layihənin React 19 + TypeScript versiyası ilə bu, tip yoxlamasını (`tsc --noEmit`) sındırırdı. `patch-package` ilə bir sətirlik düzəliş (`ComponentRef` → `ElementRef`) tətbiq olunub. **Alternativ (versiyanı geri çəkmək) seçilməyib**, çünki problem sırf tip-səviyyəli idi — runtime-a təsiri yox idi, patch daha təmiz həll idi.

### `react-native-safe-area-context` (^5.5.2)

**Nə üçün:** Notch/status bar/naviqasiya zolağı kimi "təhlükəsiz sahə" məlumatını (`useSafeAreaInsets`) verir — demək olar hər ekranda `paddingTop: insets.top` kimi işlədilir.

**Niyə bu, əl ilə `Platform.OS === 'ios' ? 44 : 24` kimi sabit dəyərlər deyil?** Cihazlar arasında notch/kamera-deşiyi ölçüləri **fərqlidir** (məsələn Dynamic Island olan iPhone-lar). Sabit dəyər bəzi cihazlarda düzgün, bəzilərində səhv olardı. Bu paket OS-dən **real** dəyəri sorğulayır — React Navigation-un özü də daxili olaraq buna söykənir, ona görə əlavə asılılıq deyil, məcburi tələbdir.

---

## 3. Şəbəkə (HTTP)

### `axios` (^1.19.0)

**Nə üçün:** `httpClient.ts`-dəki tək instance — bütün API sorğuları buradan keçir.

**Niyə axios, native `fetch` deyil?** Əsas səbəb: **interceptor** dəstəyi. `httpClient.ts`-in avtomatik token-yeniləmə məntiqi (401 alanda `/auth/refresh` çağırıb orijinal sorğunu təkrarlamaq) `fetch`-lə əl ilə **hər** sorğu çağırışında təkrarlanmalı olardı. Axios-un `interceptors.response.use(...)` mərkəzi bir yerdə **bir dəfə** yazılıb, bütün sorğulara avtomatik tətbiq olunur. Əlavə üstünlük: axios avtomatik JSON parse edir, `AxiosError` ilə xəta tipləşdirməsi rahatdır (`isAxiosError<T>()` — `apiError.ts`-də istifadə olunur).

---

## 4. Qlobal state

### `zustand` (^5.0.15)

**Nə üçün:** `basket.store.ts` — səbət state-i (məhsullar, miqdarlar, `loading`/`error`) tətbiqin fərqli hissələrindən (Home, CategoryProducts, MyLists, Basket ekranları) eyni anda oxunur/yazılır.

**Niyə Zustand, Redux (Toolkit) deyil?** Redux Toolkit güclüdür, amma boilerplate tələb edir: action-lar, reducer-lər, `Provider` ilə bütün tətbiqi bükmək. Zustand-da bir store sadəcə bir `create()` çağırışıdır — heç bir `Provider` lazım deyil, komponent birbaşa `useBasketStore(state => state.basket)` ilə **yalnız lazım olan hissəni** oxuyur (selector), lazımsız yenidən-render-lərin qarşısı avtomatik alınır. Layihənin state ehtiyacı (əsasən bir səbət obyekti) Redux-un təşkilatı mürəkkəbliyini əsaslandırmır.

**Niyə React Context deyil?** Context, dəyər dəyişəndə **bütün** istifadə edən komponentləri yenidən render edir (selector mexanizmi yoxdur, `useMemo` ilə əl ilə optimallaşdırma tələb edir). Zustand isə bunu daxili edir. Bundan başqa, Context provider-i component ağacına əlavə etmək lazımdır — Zustand-ın store-u ağacdan **kənarda** yaşayır, istənilən yerdən (hətta component olmayan funksiyalardan) çağırıla bilir.

**Niyə Jotai/Recoil deyil?** Bunlar "atomic" state idarəetməsinə üstünlük verir (çoxlu kiçik state parçaları) — bu layihədə isə tək bir mərkəzi obyekt (səbət) kifayətdir, atomic yanaşmanın üstünlüyü burada praktiki fayda vermir.

---

## 5. Yerli yaddaş (storage)

### `react-native-mmkv` (^4.3.2) + `react-native-nitro-modules` (^0.37.0)

**Nə üçün:** `tokenStorage.ts` — access/refresh token-lər, "remember me" bayrağı.

**Niyə MMKV, `@react-native-async-storage/async-storage` deyil (halbuki hələ də `package.json`-dadır — bax Hissə 11)?** Bu, layihənin ən aydın sənədləşdirilmiş miqrasiyalarından biridir (2026-08-22). Səbəb **sinxronluq**: AsyncStorage-un hər oxuması `Promise` qaytarır (asinxron) — bu, `RootNavigator`-un "istifadəçi daxil olubmu?" sualına tətbiq **açılan andaca** cavab verə bilməməsi demək idi, ayrıca "yüklənir..." keçid ekranı tələb edirdi. MMKV-nin native (C++) oxuma/yazması **sinxrondur** — `getAccessToken()` adi bir funksiya kimi dərhal cavab verir, `RootNavigator`-un `initialRouteName`-i heç bir gecikmə olmadan hesablana bilir. Əlavə üstünlük: MMKV, disk I/O-nu minimuma endirən memory-mapped fayl texnikası ilə AsyncStorage-dan **əhəmiyyətli dərəcədə** sürətlidir.

**Niyə `react-native-nitro-modules` ayrıca asılılıqdır?** `react-native-mmkv` v4 tamamilə yenidən yazılıb — Margelo-nun **Nitro Modules** arxitekturası üzərində qurulub (köhnə JSI-based v3-dən fərqli). Nitro Modules öz runtime-ını tələb edir; bu, `mmkv`-nin `peerDependency`-si olsa da, **real** (`dependencies`-də) paket kimi əlavə edilməlidir — əks halda Gradle build `:react-native-nitro-modules` layihəsini tapa bilmir. Bu, CLAUDE.md-də ayrıca sənədləşdirilmiş bir "gotcha"dır.

**Niyə şifrələnmiş SecureStore/Keychain birbaşa deyil?** Layihənin özü qeyd edir ki, bu tətbiqdə "yüksək təhlükəsizlik tələbi" yoxdur — token-lər MMKV-də sadə diskdə saxlanılır (rememberMe=false olanda cold-start-da təmizlənir). Ayrıca memory-only/encrypted storage qatı əlavə etmək, bu tətbiqin risk profilinə görə **artıq mürəkkəblik** olardı — şüurlu sadəlik seçimidir.

---

## 6. Gesture, animasiya, klaviatura

### `react-native-gesture-handler` (^3.2.1)

**Nə üçün:** `App.tsx`-in kökündə `GestureHandlerRootView`; `BottomSheet.tsx`-in sürüşdürmə (drag-to-dismiss) davranışı; `OrderHistoryScreen`-in sifariş siyahısında scroll performansı üçün.

**Niyə bu, React Native-in öz `PanResponder`-i deyil?** `PanResponder` bütün gesture hesablamasını **JS thread-də** aparır — mürəkkəb gesture-lərdə (sürüşdürmə + sürət + native scroll ilə qarşılıqlı əlaqə) gecikməyə/"jank"a səbəb olur. `react-native-gesture-handler` gesture tanımasını **native tərəfə** köçürür, JS thread-i bloklamır. Həm də React Navigation-un öz "sürüşdürüb geri qayıtma" (swipe-back) davranışı da bu paketə söykənir.

### `react-native-reanimated` (^4.5.3) + `react-native-worklets` (^0.11.3)

**Nə üçün:** `AccountInfoScreen`/`LoginScreen`-də `useReanimatedKeyboardAnimation` (klaviatura açılma proqresinə görə scroll gecikməsini seçmək üçün — `progress.value > 0.5` yoxlaması).

**Niyə Reanimated, sadə `Animated` API deyil?** `Animated`, animasiya dəyərlərini JS thread-dən idarə edir (bəziləri "native driver" ilə native tərəfə ötürülsə də) — Reanimated isə animasiya **məntiqini** ("worklet"lər) birbaşa UI thread-də icra edir, JS thread-in məşğul olması (məsələn şəbəkə cavabı emalı) animasiyaya təsir etməsin deyə. `react-native-worklets` — Reanimated v4-ün worklet-ləri kompilyasiya/icra edən ayrı paketə çıxarılmış nüvəsidir (əvvəllər Reanimated-in öz daxilində idi).

**Niyə `@gorhom/bottom-sheet` istifadə olunmayıb (CLAUDE.md-də ətraflı sənədləşdirilib)?** Bu, layihənin ən öyrədici "əvvəl sınadıq, işləmədi" hekayəsidir. `@gorhom/bottom-sheet` v5, layihənin Reanimated v4-ü ilə **səssizcə** uyğunsuz çıxdı — `present()` heç bir JS xətası vermədən çağırılırdı, amma sheet **heç vaxt görünmürdü**. Reanimated-i v3-ə endirmək də alternativ kimi sınandı, amma v3-ün Android tərəfi (`ReanimatedModule.java`) RN 0.83-ün New Architecture API-ları ilə compile olmurdu (`UIManagerModuleListener` kimi siniflər artıq mövcud deyildi) — bu da **ölü son** oldu. Nəticə: kitabxana tam çıxarılıb, əvəzinə core `Animated` + `gesture-handler`-in yalnız handle-də `PanGestureHandler`-i ilə **öz** `BottomSheet.tsx` komponenti yazılıb. **Dərs:** çox yeni (bu halda Reanimated v4-ün worklet arxitekturası) bir asılılıqla işləyərkən, üçüncü-tərəf kitabxanələrin **hələ** ona uyğunlaşmamış ola biləcəyini nəzərə almaq lazımdır.

### `react-native-keyboard-controller` (^1.22.2)

**Nə üçün:** `KeyboardAwareScrollView` — bütün form ekranlarında (`LoginScreen`, `RegisterScreen`, `AccountInfoScreen`) klaviatura açılanda avtomatik scroll.

**Niyə bu, core `KeyboardAvoidingView` + `behavior` prop-u deyil?** Sınanıb və uyğun gəlmədiyi sənədləşdirilib: Android-də `adjustResize` (native pəncərə ölçüsünü avtomatik dəyişmə) və `KeyboardAvoidingView`-un öz JS-səviyyəli hündürlük/padding tənzimləməsi **eyni vaxtda** işləyəndə bir-birini "ikiqat tənzimləyir" və klaviatura bağlananda ekranın altında boş sahə qalırdı. `react-native-keyboard-controller` klaviatura hadisələrini native tərəfdən daha dəqiq izləyir və bu double-adjust problemi olmadan işləyir.

---

## 7. Media və asset-lər

### `react-native-svg` (^15.15.5) + `react-native-svg-transformer` (^1.5.3)

**Nə üçün:** `icons.tsx`-dəki bütün ikonlar, `FruitImage` (Welcome ekranındakı meyvə loqosu), `BasketScreen`-in boş-səbət ikonu.

**Niyə SVG, PNG deyil?** SVG **vektor** formatdır — istənilən ekran sıxlığında (1x, 2x, 3x) itki olmadan miqyaslanır, PNG isə hər sıxlıq üçün ayrı fayl (`icon.png`, `icon@2x.png`, `icon@3x.png`) tələb edərdi. Kiçik ikonlar üçün SVG həm fayl ölçüsü, həm də saxlanma rahatlığı baxımından üstündür.

**`svg-transformer` nə üçündür?** `react-native-svg` tək başına yalnız **runtime**-da SVG render etməyi bacarır (JSX kimi `<Svg><Path .../></Svg>` yazmaq lazımdır) — `svg-transformer` isə Metro-ya `.svg` fayllarını **birbaşa import olunan React komponentləri** kimi tanımağa imkan verir (`import Logo from './logo.svg'`), `metro.config.js`-də konfiqurasiya olunub. Bu, SVG-ni əl ilə JSX-ə çevirmə zəhmətini aradan qaldırır.

### `react-native-image-picker` (^8.2.1)

**Nə üçün:** `AvatarPicker.tsx` — profil şəklini qalereyadan seçmək.

**Niyə bu, `expo-image-picker` deyil?** Layihə **Expo idarəli iş axını** (managed workflow) üzərində deyil, "bare" React Native CLI layihəsidir — Expo-nun modulları adətən Expo runtime-ı tələb edir. `react-native-image-picker` bare RN layihələri üçün ən çox istifadə olunan, native modul kimi birbaşa quraşdırılan alternativdir. Seçim zamanı `maxWidth`/`maxHeight`/`quality` parametrləri ilə **seçim anında** sıxılır — tam ölçülü kamera şəkillərinin serverə yüklənməsinin qarşısını almaq üçün.

### `react-native-bootsplash` (^7.3.2)

**Nə üçün:** Açılış ekranı (loqo + "TIKTAK" wordmark) və tətbiq ikonu generasiyası.

**Niyə bu, React Native-in default splash həlli deyil?** RN-in özü hazır bir splash-screen sistemi təklif etmir — hər layihə ya native tərəfdə əl ilə (Android-də `styles.xml`, iOS-da `LaunchScreen.storyboard`) qurur, ya da bir kitabxana işlədir. `react-native-bootsplash` bu prosesi CLI ilə avtomatlaşdırır (loqo faylından həm Android, həm iOS native splash konfiqurasiyasını generasiya edir) və JS tərəfdən `BootSplash.hide({fade: true})` ilə hamar keçid imkanı verir (`App.tsx`-də istifadə olunur).

---

## 8. Siyahılar (lists)

### `@shopify/flash-list` (^2.3.2)

**Nə üçün:** Məhsul grid-ləri (`CategoryProductsScreen`, `MyListsScreen`) — çoxlu şəkilli kart göstərən siyahılar.

**Niyə FlashList, core `FlatList` deyil?** `FlatList` hər elementi ekrana girəndə/çıxanda **yenidən yaradır/məhv edir** (recycling yoxdur, və ya məhdud) — böyük, şəkilli grid-lərdə scroll zamanı "jank" (kəsik hərəkət) yaradır. FlashList (Shopify-ın kitabxanası) hüceyrələri **təkrar istifadə edir** (`RecyclerListView` prinsipi ilə), nəticədə xüsusilə uzun, şəkilli siyahılarda əhəmiyyətli performans artımı verir. Qeyd: bəzi daha sadə siyahılar (`OrderHistoryScreen`, `SearchScreen`) hələ də core `FlatList` işlədir — çünki o ekranlarda element sayı azdır, FlashList-in performans üstünlüyü praktiki fərq yaratmır, əlavə asılılıq mənasız olardı.

**Diqqət (layihənin özündə sənədləşdirilmiş "gotcha"):** FlashList `PureComponent`-ə bənzər davranış göstərir — `data`/`extraData` prop-larında olmayan bir dəyişiklik (məsələn Zustand store-dan gələn səbət miqdarı) hüceyrələri **avtomatik** yenidən render etmir. Layihə bunu `extraData={basket}` ilə həll edib — unudulsa, "başqa ekrandan geri qayıdanda köhnə miqdar görünür" kimi sərt görünən, əslində sadə bir bug yaranır.

---

## 9. Bildirişlər

### `react-native-toast-message` (^2.4.0)

**Nə üçün:** Bütün "uğurla..." / xəta bildirişləri (giriş, çıxış, səbətə əlavə/silmə, favorit, ünvan yeniləmə).

**Niyə bu, native `Alert.alert` deyil?** `Alert.alert` **bloklayıcıdır** — istifadəçi "OK" düyməsinə basana qədər ekranı tutur, sürətli, ardıcıl əməliyyatlar (məsələn səbətə bir neçə məhsul tez-tez əlavə etmək) üçün narahatedicidir. Toast isə **keçicidir** (bir neçə saniyə görünüb özü yox olur), istifadəçinin davam etməsinə mane olmur — bu, müasir mobil UX-in standart naxışıdır.

**Niyə məhz bu paket, öz komponentini yazmaq (layihənin `BottomSheet`-də etdiyi kimi) deyil?** Burada fərq öz-yazma fəlsəfəsindən **çəkinmək** deyil — `@gorhom/bottom-sheet` real bir uyğunsuzluq problemi yaratmışdı, amma toast-ın öz yazılması üçün belə bir məcburiyyət yoxdur. `react-native-toast-message` **tamamilə JS-dir, heç bir native kodu yoxdur** (`dependencies: {}`, sıfır asılılıq) — quraşdırma, native rebuild, ya versiya uyğunsuzluğu riski praktiki olaraq yoxdur. Toast, `BottomSheet`-dən fərqli olaraq sadə (timed fade-in/out, gesture lazım deyil) bir komponentdir, amma hazır, yaxşı sınanmış, sıfır-risk bir seçim mövcud olduğu üçün onu təkrar yazmaq əlavə dəyər verməzdi.

---

## 10. Alət zənciri (tooling)

### `typescript` (^5.8.3)

Bütün kod bazası TypeScript-dədir — səbəb `KOD-IZAHI.md`-də ətraflı izah olunub: runtime-dan **əvvəl** tip səhvlərini (məsələn, `product.titel` kimi yazı səhvi) tutmaq.

### `eslint` (^8.19.0) + `@react-native/eslint-config`

Kod stilinin və potensial bug-ların (istifadə olunmayan dəyişən, səhv hook istifadəsi) avtomatik yoxlanması. RN-in rəsmi konfiqurasiyası işlədilir ki, komanda "necə formatlamalıyıq" kimi mübahisələrə vaxt sərf etməsin.

### `prettier` (2.8.8)

Kod formatlaşdırması avtomatlaşdırılıb — kod nəzərdən keçirmələrində (code review) formatla bağlı şərhlərin qarşısını alır.

### `jest` (^29.6.3) + `@types/jest` + `react-test-renderer`

`validation.test.ts` kimi test faylları üçün. RN-in default test runner-idir (Metro ilə eyni infrastruktura söykənir).

### `babel-plugin-module-resolver`

`@shared/*`, `@assets/*`, `@typings/*` kimi path alias-larını iş vaxtında (build zamanı) həqiqi nisbi yollara çevirir. **Niyə lazımdır?** Alias-lar olmadan dərin qovluqlardan import etmək `../../../../shared/components/Button` kimi oxunması çətin yollar yaradırdı — alias bunu `@shared/components/Button`-a sadələşdirir. TypeScript tərəfdə eyni alias-lar `tsconfig.json`-un `paths`-ində də təkrarlanmalıdır (build-time və type-check-time ayrı sistemlərdir, biri digərini avtomatik "bilmir").

### `patch-package` (^8.0.1)

`react-native-screens` patch-ini `npm install`-dan sonra avtomatik tətbiq edir (`postinstall` script-i). **Niyə fork etmək əvəzinə patch?** Bütöv paketi fork edib öz npm registry-nizdə saxlamaq — versiya yeniləmələrini əl ilə sinxronlaşdırmaq deməkdir. `patch-package` isə orijinal paketi olduğu kimi saxlayır, yalnız **konkret dəyişikliyi** `node_modules` üzərinə tətbiq edir — paket öz-özünə yenilənəndə (`npm update`) patch-in hələ də tətbiq oluna biləcəyini yoxlamaq kifayətdir.

### `@react-native-community/cli` ailəsi

RN CLI-nin özü — `npx react-native start`, `run-android` kimi əmrləri təmin edir. Layihənin `package.json`-unda **açıq** versiya sabitlənib ki, CLI-nin qlobal versiyası ilə uyğunsuzluq yaranmasın.

---

## 11. İstifadə olunmayan/köhnəlmiş paket

### `@react-native-async-storage/async-storage` (^1.22.3)

**Vəziyyət:** Hələ də `package.json`-dadır, amma `src/` daxilində **heç yerdə** import olunmur. 2026-08-22-də token saxlama MMKV-yə köçürüləndə (Hissə 5-ə bax) bu paket silinməyib, sadəcə istifadəsiz qalıb.

**Niyə silinməyib?** Bu, "diqqətsizlik" deyil — CLAUDE.md-də açıq qeyd olunub ki, bu paket **köhnə**, artıq aktiv olmayan yaddaş qatını təmsil edir, gələcək sessiyalarda kimsə "token AsyncStorage-dadır" deyə səhv fərziyyə etməsin deyə **xəbərdarlıq** məqsədilə sənədləşdirilib. Praktiki olaraq, silinməsi lazımdır (ölü asılılıq, bundle ölçüsünü artırır) — amma bu, konkret bir "təmizlik" tapşırığı kimi ayrıca ediləcək iş sayılıb, "bir addımda hər şeyi eyni anda dəyişmə" prinsipinə görə.

---

## 12. Ümumi nəticə — seçim fəlsəfəsi

Bütün paket seçimlərini nəzərdən keçirəndə üç təkrarlanan meyar görünür:

1. **Sınanmış, geniş icmalı standart üstünlük təşkil edir** (React Navigation, Axios, Zustand) — "daha yeni/eksperimental" alternativlər yalnız real, konkret bir problem həll etdikdə seçilib (MMKV-nin sinxronluğu, FlashList-in performansı).
2. **Native koda toxunan hər asılılıq şübhə ilə qarşılanır.** `react-native-toast-message`-in "sıfır native kod" olması özəlliklə vurğulanıb seçim səbəbi kimi — çünki layihə artıq `@gorhom/bottom-sheet` ilə native/JS uyğunsuzluğunun real qiymətini görüb.
3. **Sınayıb-uğursuz-olma təcrübəsi sənədləşdirilir, təkrarlanmır.** `@gorhom/bottom-sheet` epizodu təsadüfi deyil — CLAUDE.md-nin "Gotchas" bölməsi məhz gələcək sessiyaların **eyni araşdırmanı təkrar etməməsi** üçün var.
