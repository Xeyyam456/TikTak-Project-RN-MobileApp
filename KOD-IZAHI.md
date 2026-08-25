# Tiktak — Layihənin Tam Kod İzahı

Bu sənəd Tiktak React Native tətbiqinin **hər qatını** — sıfırdan başlayaraq, heç bir proqramlaşdırma təcrübəsi olmadığını fərz edərək — izah edir. Məqsəd sadədir: bu sənədi oxuyan hər kəs (siz özünüz, komanda yoldaşınız, ya da təqdimatda sizə sual verən biri) kodun **nəyi** etdiyini deyil, **niyə** məhz belə yazıldığını da anlasın.

Tiktak — meyvə-tərəvəz (e-commerce) mobil tətbiqidir: istifadəçi qeydiyyatdan keçir, kateqoriyalara baxır, məhsul axtarır, səbətə əlavə edir, sifariş verir və sifariş tarixçəsinə baxır. React Native ilə yazılıb ki, **eyni TypeScript kodu həm Android, həm iOS üçün işləsin** — ayrıca Kotlin/Swift layihəsi yazmağa ehtiyac qalmır.

> **Necə oxumalı?** Sənəd aşağı-yuxarı bir kurs kimi qurulub: əvvəlcə dil əsasları (JavaScript, TypeScript), sonra React Native əsasları, sonra layihənin öz strukturu, sonra hər qat ayrı-ayrı. Artıq JavaScript/TypeScript bilirsinizsə, 2-ci və 3-cü hissələri keçib birbaşa 4-cü hissədən davam edə bilərsiniz. Sənədin **lüğət** hissəsi (ən sonda) bütün texniki terminlərin bir cümləlik izahını verir — bir termini unutsanız oraya baxın.

---

## Məzmun (Table of Contents)

1. [Giriş — Tiktak nədir, texnologiyalar niyə seçilib](#hissə-1-giriş)
2. [JavaScript əsasları](#hissə-2-javascript-əsasları)
3. [TypeScript ətraflı bələdçi](#hissə-3-typescript-ətraflı-bələdçi)
4. [React və React Native əsasları](#hissə-4-react-və-react-native-əsasları)
5. [Qovluq strukturu](#hissə-5-qovluq-strukturu)
6. [Per-component qovluq konvensiyası](#hissə-6-per-component-qovluq-konvensiyası)
7. [Tiplər sistemi](#hissə-7-tiplər-sistemi)
8. [Giriş nöqtələri: index.js → App.tsx](#hissə-8-giriş-nöqtələri)
9. [Naviqasiya](#hissə-9-naviqasiya)
10. [Autentifikasiya və token idarəetməsi](#hissə-10-autentifikasiya)
11. [API qatı — httpClient və interceptor-lar](#hissə-11-api-qatı)
12. [Servislər (services)](#hissə-12-servislər)
13. [State idarəetməsi — Zustand və basket.store.ts](#hissə-13-state-idarəetməsi)
14. [Paylaşılan komponentlər (shared/components)](#hissə-14-paylaşılan-komponentlər)
15. [Ekranlar (screens)](#hissə-15-ekranlar)
16. [Toast bildirişləri sistemi](#hissə-16-toast-bildirişləri)
17. [Alətlər və build sistemi](#hissə-17-alətlər-və-build-sistemi)
18. [Platform-spesifik məsələlər və öyrənilmiş dərslər](#hissə-18-öyrənilmiş-dərslər)
19. [Lüğət](#hissə-19-lüğət)

---

## Hissə 1: Giriş

### Tiktak nədir?

Tiktak — Azərbaycan dilində işləyən bir meyvə-tərəvəz sifariş tətbiqidir. İstifadəçi axını belədir:

```
Welcome ekranı → Qeydiyyat/Giriş → Əsas səhifə (kateqoriyalar)
  → Kateqoriya seç → Məhsullara bax → Səbətə əlavə et
  → Səbət ekranı → Sifarişi tamamla (Checkout) → Uğur ekranı
```

Bundan əlavə: axtarış, favoritlər (Siyahılarım), profil məlumatları, sifariş tarixçəsi.

### Niyə React Native?

Ənənəvi mobil development-də Android üçün Kotlin/Java, iOS üçün Swift/Objective-C — **iki ayrı layihə**, iki ayrı komanda demək idi. React Native isə **bir dəfə JavaScript/TypeScript ilə yazılan komponentləri** hər iki platformada həqiqi native komponentlərə (Android-də native View-lara, iOS-da UIView-lara) çevirir. Yəni bu, "veb səhifəni mobil tətbiqə bükmək" (Cordova/PhoneGap kimi) demək **deyil** — `View` komponenti Android-də əsl `android.view.View`, iOS-da əsl `UIView` olur.

### "New Architecture" nədir?

`CLAUDE.md`-də "React Native 0.83.10 (New Architecture)" yazılıb. React Native-in köhnə versiyalarında JS kodu ilə native kod arasında "Bridge" adlanan, JSON-a bənzər mesajlarla işləyən **asinxron** bir körpü var idi — hər instruksiya (məsələn "bu View-un rəngini dəyiş") serialize olunub körpüdən keçirdi, bu da gecikmə yaradırdı. New Architecture (Fabric + TurboModules) bu körpünü aradan qaldırıb, JS və native kod arasında **birbaşa, sinxron** əlaqə (JSI — JavaScript Interface) qurur. Nəticə: daha sürətli render, daha az gecikmə, xüsusən animasiyalarda və gestures-də hiss olunur.

### Əsas texnologiya seçimləri (və niyə)

| Texnologiya | Nə üçün | Niyə məhz bu |
|---|---|---|
| **TypeScript** | JavaScript-in tip-yoxlamalı versiyası | Kodu yazarkən səhvləri (məsələn, `product.titel` kimi yazı səhvini) dərhal tapır, iş vaxtında (runtime) deyil |
| **React Navigation** | Ekranlar arası keçid | React Native-də ən çox istifadə olunan, "native-stack" native performans verir |
| **Zustand** | Qlobal state (səbət) | Redux-dan qat-qat sadədir — boilerplate (təkrar kod) demək olar yoxdur |
| **Axios** | Şəbəkə sorğuları | `fetch`-dən fərqli olaraq **interceptor** dəstəyi var (aşağıda izah olunacaq) — bu, avtomatik token yeniləməsi üçün vacibdir |
| **react-native-mmkv** | Telefon yaddaşında məlumat saxlamaq (token-lər) | `AsyncStorage`-dan qat-qat sürətlidir (C++ native, disk I/O-nu minimuma endirir) və **sinxron** oxuma imkanı verir |
| **Zod-a bənzər əl ilə validasiya** | Form yoxlaması | Layihə kiçikdir, ayrıca validasiya kitabxanası əvəzinə sadə funksiyalar (`validateName`, `validatePhone`) kifayət edir |

Qalan kitabxanaların hər biri (gesture-handler, reanimated, keyboard-controller və s.) öz yerində, konkret bir problemi həll etdiyi üçün seçilib — bunları Hissə 14-15-də konkret istifadə yerləri ilə izah edəcəyik.

---

## Hissə 2: JavaScript əsasları

Bu hissə TypeScript-ə keçmədən əvvəl, kod boyu tez-tez rast gələcəyiniz təmiz JavaScript sintaksisini izah edir. Əgər bunları bilirsinizsə, birbaşa Hissə 3-ə keçin.

### `import` / `export`

Hər fayl öz "modulu"dur. Bir fayldakı funksiya/dəyəri başqa fayldan istifadə etmək üçün onu **export** etmək, digər fayda **import** etmək lazımdır.

```ts
// validation.ts — BU faylda "export" olunur
export function validateName(value: string): string | undefined {
  if (!value.trim()) return 'Ad, soyad daxil edin';
  return undefined;
}
```

```ts
// RegisterScreen.tsx — BAŞQA fayldan import edilir
import { validateName } from '@shared/utils/validation';
```

İki növ export var:
- **Named export** (`export function ...`, `export const ...`) — bir fayldan bir neçə şey export etmək olar, import edərkən `{ }` daxilində, **eyni adla** yazılmalıdır: `import { validateName } from ...`.
- **Default export** (`export default ComponentName`) — bir fayldan yalnız **bir dənə** default export ola bilər, import edərkən istənilən adla (adətən eyni adla) yazıla bilər, `{ }` lazım deyil: `import Button from '@shared/components/Button';`

Layihədə hər komponent faylı `export default ComponentName;` ilə bitir (bax `Button.tsx`, sətir 47: `export default Button;`) — bu, "bu faylın əsas məhsulu budur" demək kimidir.

### Arrow function (ox funksiyası)

```ts
// Adi funksiya
function add(a: number, b: number) {
  return a + b;
}

// Eyni şey, arrow function ilə
const add = (a: number, b: number) => a + b;
```

Arrow function-ların ən vacib fərqi: `this` açar sözünü **öz ətrafından götürmür**, əhatə edən (kod bloku) skoup-dan miras alır. React-də bu, callback-lərdə (`onPress={() => setCount(count + 1)}`) çox rahatlıq yaradır.

Layihədə demək olar hər yerdə görəcəksiniz:
```ts
onPress={() => navigation.navigate('Register')}
```
Bu, "bu düyməyə basılanda, `navigation.navigate('Register')` işə düşsün" deməkdir — `() =>` hissəsi funksiyanı **dərhal işə salmır**, sadəcə "basılanda işə düş" funksiyası yaradır.

### Destructuring (obyekt/array-i "açmaq")

```ts
const profile = { full_name: 'Əli', phone: '+994501234567' };

// Adi yol
const name = profile.full_name;
const phone = profile.phone;

// Destructuring ilə eyni şey, bir sətirdə
const { full_name, phone } = profile;
```

Bu, React-də props almaq üçün **hər yerdə** işlədilir — məsələn `Button.tsx`-də (sətir 8-15):
```ts
function Button({
  title,
  onPress,
  disabled,
  loading,
  variant = 'primary',   // "= 'primary'" default dəyərdir — verilməzsə bu işlənir
  style,
}: ButtonProps) {
```

Array-larda da işləyir:
```ts
const [name, setName] = useState('');
```
Bu, React-in `useState` hook-unun qaytardığı `[cari_dəyər, yeniləyici_funksiya]` array-ini iki ayrı dəyişənə "açır".

### Spread operator (`...`)

Bir obyektin/array-in **bütün sahələrini** başqasına köçürmək üçün:

```ts
const nextErrors = {
  name: validateName(name),
  address: address.trim() ? undefined : 'Ünvan daxil edin',
  password: changingPassword ? validatePassword(password) : undefined,
};
```

`AccountInfoScreen.tsx`-də (sətir 100-105) daha maraqlı bir istifadə var — **şərti spread**:
```ts
const updated = await updateProfile({
  full_name: name.trim(),
  address: address.trim(),
  ...(changingPassword
    ? { password, password_repeat: passwordRepeat }
    : {}),
});
```
Bura oxu: "əgər `changingPassword` true-dursa, `{password, password_repeat: passwordRepeat}` obyektini bura **əri** (spread et), yox əgər `{}` (boş obyekt) əri" — nəticədə, istifadəçi şifrə dəyişmirsə, sorğuya `password` sahəsi ümumiyyətlə **daxil edilmir**.

`Input.tsx`-də (sətir 13, `...inputProps`) isə "qalan bütün props-ları olduğu kimi ötür" mənasında işlədilir — buna "rest parametri" deyilir (spread-in əksi kimi düşünün: yığma).

### Template literal (backtick sətirlər)

```ts
const message = `${title} səbətə əlavə edildi`;
```

Adi `"..."` sətirdən fərqli olaraq, backtick (`` ` ``) daxilində `${dəyişən}` yazaraq dəyişənləri birbaşa sətrin içinə "yeritmək" olar. `basket.store.ts`-də (sətir 45) məhz belə işlədilib:
```ts
showSuccessToast(
  `${title} ${previousQuantity === 0 ? 'səbətə əlavə edildi' : 'sayı artırıldı'}`,
);
```

### Ternar operator (`? :`)

"Əgər-onda-əks halda"-nın bir sətirlik forması:

```ts
const label = previousQuantity === 0 ? 'səbətə əlavə edildi' : 'sayı artırıldı';
```

JSX daxilində `if/else` yazmaq **olmur** (JSX ifadədir, blok deyil), ona görə şərti render etmək üçün ternar hər yerdə görünür:
```tsx
{loading ? (
  <ActivityIndicator color="#7BC043" style={styles.loader} />
) : (
  <FlatList ... />
)}
```

Bəzən **zəncirlənmiş** ternar da işlədilir (`CategoryProductsScreen.tsx`, sətir 130-134):
```tsx
{error ? (
  <ErrorState message={error} onRetry={retry} />
) : loading && categories.length === 0 && products.length === 0 ? (
  <ActivityIndicator ... />
) : (
  <FlashList ... />
)}
```
Bura oxu: "əgər xəta varsa → ErrorState göstər; yox əgər (xəta yoxdur AMMA) yüklənir VƏ heç bir data yoxdursa → spinner göstər; əks halda → siyahını göstər".

### `&&` ilə şərti render

```tsx
{campaigns.length > 0 && (
  <FlatList ... />
)}
```
JavaScript-də `&&` operatoru "solundakı doğrudursa, sağındakını qaytar" məntiqi ilə işləyir. Əgər `campaigns.length > 0` `false`-dursa, bütün ifadə `false` olur və React `false`-u ekrana heç nə çəkmədən keçir. Bu, "yalnız X varsa Y-i göstər" demək üçün ən qısa yoldur.

> **Diqqət:** `{count && <Text>...}` yazsanız və `count` `0`-dırsa, ekranda söz yerinə **"0" rəqəmi** görünə bilər (React `0`-ı boş kimi yox, dəyər kimi render edir). Layihədə bu tələ `campaigns.length > 0 &&` kimi **açıq müqayisə** ilə önlənib — `campaigns.length &&` yazılmayıb, məhz bunun üçün.

### Optional chaining (`?.`) və nullish coalescing (`??`)

```ts
const basketItemCount =
  basket?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
```

- `basket?.items` — "əgər `basket` `null`/`undefined`-dursa, xəta atma, sadəcə `undefined` qaytar, davam etmə". Adi `basket.items` yazsaydıq və `basket` `undefined` olsaydı, tətbiq **çökərdi** (`Cannot read property 'items' of undefined`).
- `?? 0` — "əgər solundakı `null`/`undefined`-dursa, `0` işlət". `||`-dan fərqi: `0 ?? 5` → `0` qalır (çünki `0` "boş" deyil, sadəcə sıfırdır), amma `0 || 5` → `5` olardı (çünki `||` `0`-ı "falsy" sayır). Bu fərq **çox** vacibdir — say dəyərləri ilə işləyəndə həmişə `??` işlədin, `||` yox.

### Array metodları: `.map()`, `.filter()`, `.find()`, `.reduce()`

Bunlar array-in **hər elementi üçün** nəsə edir, orijinal array-i **dəyişdirmir**, yeni nəticə qaytarır.

- **`.map()`** — hər elementi başqa bir şəklə çevirir. JSX-də siyahı render etmək üçün əsas vasitə:
  ```tsx
  {categories.map(category => (
    <CategoryCard key={category.id} category={category} />
  ))}
  ```
  (`key` prop-u React-ə "bu elementləri necə izləyim" deyir — siyahıdakı hər elementin unikal ID-si olmalıdır, yoxsa React siyahı dəyişəndə səhv render edə bilər.)

- **`.filter()`** — şərtə uyğun gələnləri seçir. `CategoryProductsScreen.tsx` (sətir 70-72):
  ```ts
  const visibleProducts = products.filter(
    product => product.category?.id === selectedCategoryId,
  );
  ```
  ("bütün məhsullardan yalnız seçilmiş kateqoriyaya aid olanları götür")

- **`.find()`** — şərtə uyğun **ilk** elementi tapır (yoxdursa `undefined`). `basket.store.ts` (sətir 41-43):
  ```ts
  const title =
    basket.items?.find(item => item.product.id === productId)?.product.title
    ?? 'Məhsul';
  ```

- **`.reduce()`** — bütün elementləri **tək bir dəyərə** yığır. `AppHeader.tsx` (sətir 21-22):
  ```ts
  const basketCount =
    basket?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  ```
  ("hər item-in `quantity`-sini toplayaraq ümumi say tap, başlanğıc dəyər `0`")

### `async` / `await` və Promise

Şəbəkə sorğusu (məsələn "profili gətir") **dərhal** cavab vermir — bir neçə millisaniyə (ya saniyə) çəkir. JavaScript bu gözləmə müddətini bloklamadan idarə etmək üçün **Promise** (vəd) obyektindən istifadə edir: "bu iş **gələcəkdə nə vaxtsa** ya uğurla bitəcək, ya da xəta ilə".

`async`/`await` Promise-lərlə işləməyin ən oxunaqlı yoludur:

```ts
export async function login(
  payload: LoginPayload,
  rememberMe: boolean,
): Promise<LoginResponse> {
  const { data } = await httpClient.post<ApiEnvelope<LoginResponse>>(
    '/auth/login',
    payload,
  );
  setRememberMe(rememberMe);
  await setTokens(data.data.tokens.access_token, data.data.tokens.refresh_token);
  return data.data;
}
```

- `async function` — bu funksiyanın içində `await` işlədə bilərsiniz, funksiyanın özü avtomatik bir `Promise` qaytarır.
- `await bir_promise` — "bu sətirdə funksiyanın icrasını **dayandır**, promise nəticə verənə (ya xəta atana) qədər gözlə, sonra davam et". Bu, kodu sanki sinxronmuş kimi (yuxarıdan-aşağı, addım-addım) oxumağa imkan verir, halbuki arxada asinxron işləyir.
- Xəta idarəetməsi `try/catch` ilə olur — `LoginScreen.tsx` (sətir 53-61):
  ```ts
  try {
    await login({ phone, password }, rememberMe);
    showSuccessToast('Uğurla daxil oldunuz');
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  } catch (error) {
    setFormError(getApiErrorMessage(error));
  } finally {
    setLoading(false);
  }
  ```
  `finally` bloku **hər iki halda** (uğur da, xəta da) işə düşür — burada "yüklənmə spinner-ini söndür" məhz buna görə `finally`-dədir, uğur/xəta budaqlarının hər ikisində təkrarlamaq əvəzinə.

### `Promise.all()`

Bir neçə asinxron işi **paralel** (eyni vaxtda) başladıb, **hamısı bitəndə** davam etmək üçün. `useHomeData.ts` (sətir 25):
```ts
return Promise.all([getProfile(), listCategories(), listCampaigns()])
  .then(([profileData, categoryList, campaignList]) => {
    setProfile(profileData);
    setCategories(categoryList);
    setCampaigns(campaignList);
  })
```
Əgər bunları **ardıcıl** (`await getProfile(); await listCategories(); await listCampaigns();`) çağırsaydıq, hər biri növbəti başlamazdan əvvəl bitməli olardı — 3 sorğu cəmi 300ms çəkərdisə, indi 100ms-ə düşür (paralel işlədiyi üçün).

### React-in ilk baxışı: `useState` və `useEffect`

Bunları Hissə 4-də ətraflı izah edəcəyik, amma sintaksis səviyyəsində bunlar da adi funksiyalardır:

```ts
const [profile, setProfile] = useState<UserProfile>();
```
`useState(başlanğıc_dəyər)` — `[cari_dəyər, dəyəri_dəyişən_funksiya]` array-i qaytarır (yuxarıda gördüyümüz destructuring).

```ts
useEffect(() => {
  loadProfile();
}, [loadProfile]);
```
`useEffect(funksiya, [asılılıqlar])` — "komponent ilk render olunanda (və ya `[]` daxilindəki dəyərlərdən biri dəyişəndə) bu funksiyanı işə sal".

---

## Hissə 3: TypeScript ətraflı bələdçi

TypeScript = JavaScript + **tip sistemi**. Kodu yazarkən "bu dəyişən nə növ məlumat saxlayacaq" — mətn (`string`), rəqəm (`number`), obyekt, funksiya və s. — əvvəlcədən bəyan edirsiniz, TypeScript compiler-i isə kodu işə salmadan **əvvəl** uyğunsuzluqları tapır.

### Niyə vacibdir? Real nümunə

`getApiErrorMessage.ts`-ə baxın:
```ts
export function getApiErrorMessage(error: unknown): string {
```
`error: unknown` — "bu funksiyaya nə gələcəyini bilmirəm" deməkdir (JavaScript-in `catch (error)` blokunda `error`-un həqiqi tipi əvvəlcədən bilinmir — Error ola bilər, sətir ola bilər, hər şey ola bilər). Əgər bu sahədə `any` yazsaydıq, TypeScript bizi heç bir yoxlamaya məcbur etməzdi və `error.response.data.message` yazsaydıq, `error` əslində `Error` obyekti olsaydı (heç bir `.response` sahəsi olmadan), tətbiq **çökərdi**. `unknown` isə TypeScript-i məcbur edir ki, istifadədən əvvəl **yoxlayaq**:
```ts
if (isAxiosError<{ message?: string }>(error)) {
  return error.response?.data?.message ?? FALLBACK_MESSAGE;
}
return FALLBACK_MESSAGE;
```
`isAxiosError(...)` çağırışı bir **type guard**-dır (aşağıda izah olunur) — bu `if` blokunun içində TypeScript artıq bilir ki, `error` doğrudan da axios-un xəta tipidir, `.response` sahəsinə təhlükəsiz müraciət etmək olar.

### `interface` və `type` — fərq nədir?

Hər ikisi "bu obyektin formaı belədir" demək üçündür, amma fərqli hallarda işlədilir.

```ts
// types/api.ts-dən
export interface UserProfile {
  id: number;
  full_name: string;
  phone: string;
  address: string | null;
  img_url: string | null;
  role: UserRole;
  created_at: string;
}
```

```ts
// shared üzvi tiplər üçün, adətən union-larla
export type ProductMeasure =
  | 'kg' | 'gr' | 'litre' | 'ml' | 'meter'
  | 'cm' | 'mm' | 'piece' | 'packet' | 'box';
```

Praktiki fərq: `interface` **"extends" (genişləndirmə)** və sonradan **"declaration merging"** dəstəkləyir, `type` isə union (`|`) və intersection (`&`) yaratmaq üçün daha çevikdir. Layihədə obyekt formaları üçün əsasən `interface`, union/alias-lar üçün `type` işlədilib — məcburi qayda deyil, sadəcə "hansı alət hansı işə daha yaxşı uyğun gəlir" prinsipidir.

**`extends` nümunəsi** (`types/api.ts`, sətir 85-87):
```ts
export interface ProductDetail extends Product {
  is_favorite: boolean;
}
```
`ProductDetail` — `Product`-un **bütün sahələrini** miras alır, üstünə bir sahə (`is_favorite`) əlavə edir. Bu, `GET /products/:id` cavabının "siyahıdakı Product-a bənzəyir, amma bir sahə artıqdır" olduğunu dəqiq ifadə edir.

### Union tip (`|`) — "bu ya bu, ya da o ola bilər"

```ts
export type PaymentMethod = 'CASH' | 'CARD';
```
Bu, `PaymentMethod` tipli bir dəyişənin **yalnız** `'CASH'` ya `'CARD'` sətri ola biləcəyini deyir — başqa sətir yazsanız (`'PAYPAL'` kimi), compiler dərhal xəta verir. Bu, adi `string` tipindən **qat-qat təhlükəsizdir**, çünki mümkün variantları bağlayır.

`OrderStatus`, `UserRole` tipləri də eyni məntiqlə qurulub (`types/api.ts`, sətir 31-41).

Nullable sahələr də union-dır: `address: string | null` — "ya mətn, ya `null` (heç bir ünvan yoxdur)".

### Intersection tip (`&`) — "bu VƏ o birlikdə"

`TextField.types.ts`-də:
```ts
export type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
};
```
`TextFieldProps` = React Native-in öz `TextInputProps`-unun **bütün sahələri** + bizim əlavə etdiyimiz `label`, `error` sahələri. Bu, "TextInput-un bacardığı hər şeyi bacarsın, üstünə bir label və xəta mətni əlavə et" deməkdir — `<TextField placeholder="..." keyboardType="phone-pad" label="Telefon" error={errors.phone} />` kimi istifadə edəndə TypeScript hər iki qrupun sahələrini tanıyır.

### Optional sahə (`?`)

```ts
export type ButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'danger';
  style?: StyleProp<ViewStyle>;
};
```
`?` işarəsi olan sahələr **məcburi deyil** — `<Button title="Daxil ol" />` yazsanız, `onPress`/`disabled`/`loading`/`variant`/`style` verilməyəcək, TypeScript bunu qəbul edəcək. `?`-siz `title` isə **hər dəfə** verilməlidir.

### Generic-lər (`<T>`) — "tip parametri"

Generic — funksiyanın/tipin **hansı konkret tip ilə işlədiyini sonradan bildirmək** üçündür. Ən aydın nümunə `ApiEnvelope`:

```ts
// types/api.ts
export interface ApiEnvelope<T> {
  message: string;
  data: T;
  result: boolean;
}
```

`T` burada "naməlum, sonradan doldurulacaq tip" mənasındadır. İstifadə zamanı:
```ts
// profile.service.ts
const { data } = await httpClient.get<ApiEnvelope<UserProfile>>('/profile');
```
Bura oxu: "bu sorğunun cavabı `{ message, data: UserProfile, result }` formasında olacaq" — `data.data` yazanda TypeScript avtomatik bilir ki, bu `UserProfile` tipidir (adı, telefonu, ünvanı olan bir obyekt), `any` yox.

`PaginatedEnvelope` isə `ApiEnvelope`-u **genişləndirən** generic-dir:
```ts
export interface PaginatedEnvelope<T> extends ApiEnvelope<T[]> {
  pagination: Pagination;
}
```
Diqqət: `ApiEnvelope<T[]>` — `T`-nin özü yox, `T`-nin **array**ı `data` sahəsinə gedir. `product.service.ts`-də `PaginatedEnvelope<Product>` işlədiləndə, `data.data` bir `Product[]` (Product array-i) olur, üstəlik `data.pagination` (səhifələmə məlumatı) da var.

Generic-lər funksiyalarda da olur — `quantityForProduct` funksiyasının özü generic deyil, amma React-in `useState<UserProfile>()` çağırışı generic-dir: "bu state-in tipi `UserProfile | undefined` olacaq" deyir.

### `unknown` vs `any`

- `any` — "bu dəyərin **istənilən** tip olduğunu güman et, HEÇ bir yoxlama etmə". Bu, TypeScript-in bütün faydasını **söndürür** — `any` tipli dəyərin istənilən sahəsinə müraciət edə bilərsiniz, compiler heç vaxt xəta verməz, hətta səhv yazsanız belə (`error.responze.data` kimi yazı səhvi belə keçər).
- `unknown` — "bu dəyərin tipini bilmirəm, AMMA istifadə etməzdən əvvəl **yoxlamalısan**". `getApiErrorMessage(error: unknown)` bunun məhz nümunəsidir — bu layihədə `any` **heç yerdə işlədilməyib**, hər yerdə ya konkret tip, ya `unknown` + yoxlama işlədilib.

### `as` — tip iddiası (type assertion)

`as` "mən bu dəyərin əslində filan tip olduğunu **bilirəm**, sən mənə inan" deməkdir — TypeScript-in öz nəticə çıxarmasını **əzir**. Diqqətlə işlədilməlidir, çünki səhv olsa, runtime-da çökmə yarada bilər.

`upload.service.ts`-də (sətir 16-20) maraqlı bir nümunə — **ikiqat assertion**:
```ts
formData.append('file', {
  uri: file.uri,
  name: file.name,
  type: file.type,
} as unknown as Blob);
```
`FormData.append`-in TypeScript tipi ikinci parametr üçün əsl brauzer `Blob` tipini gözləyir, amma React Native-də fayl `{uri, name, type}` formasında ötürülür (brauzer `Blob`-u deyil). TypeScript birbaşa `as Blob` yazmağa icazə **vermir**, çünki bu iki tip "əlaqəli" sayılmır. `as unknown as Blob` — "əvvəlcə `unknown`-a çevir (bu hər şeyə uyğun gəlir), sonra `unknown`-dan `Blob`-a çevir" yolu ilə bu məhdudiyyəti "dələ dəlik açır". Bu, kodda **niyə** belə yazıldığının şərh edilməsini tələb edən nadir hallardan biridir — məhz buna görə faylda izahlı şərh var.

`CategoryProductsScreen.tsx`-də (sətir 78-81) başqa bir nümunə:
```ts
function goToBasket() {
  (
    navigation as unknown as NativeStackNavigationProp<RootStackParamList>
  ).navigate('Basket');
}
```
Bu ekran `HomeStackParamList` naviqasiyasında olduğu üçün TypeScript `navigation.navigate('Basket')`-ə icazə vermir (`Basket` bu stack-də yoxdur, `RootStackParamList`-dədir). Amma React Navigation-da nested stack-lər faktiki olaraq öz valideynlərinin metodlarına çıxış əldə edə bilir — bu, TypeScript-in tip sistemi ilə tam ifadə edilə bilməyən bir runtime davranışdır, ona görə `as unknown as ...` ilə "mən bilirəm ki, bu, işləyəcək" deyilir.

### `satisfies` açar sözü

Bu layihədə görünməyib, amma TypeScript bilməli olduğunuz vacib bir konsepsiyadır: `satisfies` bir dəyərin müəyyən tipə **uyğun olduğunu yoxlayır, AMMA onun daha dar (spesifik) tipini itirmir**. Məsələn:
```ts
const colors = { red: '#FF0000', blue: '#0000FF' } satisfies Record<string, string>;
// colors.red-in tipi hələ də 'string' deyil, konkret '#FF0000' ola bilər (əgər `as const` ilə birlikdə işlədilsə)
```
Fərq: `as Record<string, string>` yazsaydıq, TypeScript `colors`-un dəqiq açarlarını (`red`, `blue`) unudardı, sadəcə "hər hansı sətir açarı" bilərdi. `satisfies` isə hər iki tərəfi saxlayır: həm "bu, `Record<string, string>`-ə uyğundur" yoxlanması, həm də konkret `red`/`blue` açarlarının bilinməsi.

### `Record<K, V>`

"Açarları `K` tipində, dəyərləri `V` tipində olan obyekt" — `order.ts`-də əla nümunə (sətir 9-16):
```ts
const ORDER_STATUS_META: Record<OrderStatus, OrderStatusMeta> = {
  PENDING: { label: 'Qəbul edilib', color: '#C68A1E', backgroundColor: '#FCF1DC' },
  CONFIRMED: { label: 'Təsdiqləndi', color: '#3D7CE0', backgroundColor: '#E6EEFC' },
  PREPARING: { label: 'Hazırlanır', color: '#8E4FC9', backgroundColor: '#F1E6FA' },
  READY: { label: 'Hazırdır', color: '#1AA89A', backgroundColor: '#DEF5F2' },
  DELIVERED: { label: 'Çatdırıldı', color: '#5C9A2E', backgroundColor: '#E9F5DD' },
  CANCELLED: { label: 'Ləğv edildi', color: '#D14444', backgroundColor: '#FBE6E6' },
};
```
`Record<OrderStatus, OrderStatusMeta>` — "bu obyektin açarları məhz `OrderStatus` union-undakı 6 sətirdən biri olmalıdır (`PENDING`, `CONFIRMED` və s.), heç biri əskik olmasın, artıq olmasın, dəyərləri isə `OrderStatusMeta` formasında olsun" deməkdir. Əgər `OrderStatus`-a yeni status (məsələn `'REFUNDED'`) əlavə etsəniz, TypeScript dərhal bu obyektdə həmin açarın **əskik olduğunu** bildirəcək — beləliklə status siyahısını yeniləyəndə heç bir hal unudulmur.

### `Partial<X>`, `Pick<X, K>`

Layihədə birbaşa görünməyib, amma tanış olmaq faydalıdır:
- `Partial<UserProfile>` — `UserProfile`-ın **bütün sahələrini optional** edir (hamısını `?`-li kimi). "Yeniləmə" funksiyalarında tez-tez işlədilir: "yalnız dəyişən sahələri göndər".
- `Pick<UserProfile, 'full_name' | 'phone'>` — `UserProfile`-dan **yalnız** göstərilən sahələri götürən yeni tip yaradır.

Layihədə bunun əvəzinə ayrıca payload interfeysləri yazılıb (`UpdateProfilePayload` kimi) — kiçik layihədə bu, daha oxunaqlı ola bilər, `Partial`/`Pick`-in "böyük tipdən avtomatik törətmə" gücü isə daha böyük, tez-tez dəyişən API-larda daha faydalıdır.

### `keyof typeof` naxışı

`TabBar.tsx`-də (sətir 10-30) çox işlək bir naxış var:
```ts
const ICONS = {
  Home: HomeIcon,
  Search: SearchIcon,
  Profile: UserIcon,
} as const;

const LABELS = {
  Home: 'Əsas',
  Search: 'Axtar',
  Profile: 'Hesabım',
} as const;

const INITIAL_SCREEN: Partial<Record<keyof typeof LABELS, string>> = {
  Home: 'HomeMain',
  Profile: 'ProfileMain',
};
```
`typeof LABELS` — "`LABELS` dəyişəninin **tipini** mənə ver" (yəni `{ Home: string; Search: string; Profile: string }` formasını). `keyof typeof LABELS` isə "bu tipin **açarlarının** union-unu ver" — yəni `'Home' | 'Search' | 'Profile'`. Beləliklə, ayrıca bir tip yazmadan, mövcud bir obyektin açarlarından **avtomatik** bir union tipi yaratmış oluruq. `INITIAL_SCREEN`-in `Partial<Record<...>>` olması isə "bu 3 açardan hamısı yox, bəziləri (Home, Profile) olsun, Search-un ilkin ekranı yoxdur, sahə əskik ola bilər" deməkdir.

Sonra kodda:
```ts
const Icon = ICONS[route.name as keyof typeof ICONS];
```
Burada `as keyof typeof ICONS` yazılıb, çünki `route.name`-in tipi React Navigation-dan gələn ümumi `string`-dir, TypeScript bunun məhz `ICONS`-un açarlarından biri olduğunu **avtomatik bilmir** (biz insan olaraq bilirik, çünki tab adları elə bu 3-dür) — ona görə əl ilə "iddia" edirik.

### `as const`

`as const` bir dəyəri **dəyişməz (readonly) və ən dar tipdə** "dondurur". `theme/fonts.ts`-də:
```ts
export const FONTS = {
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  semiBold: 'Roboto-SemiBold',
  bold: 'Roboto-Bold',
  extraBold: 'Roboto-ExtraBold',
} as const;
```
`as const` olmasaydı, `FONTS.regular`-ın tipi sadəcə `string` olardı (istənilən mətn ola bilər). `as const` ilə tipi məhz `'Roboto-Regular'` (bu konkret sətir) olur — üstəlik bütün obyekt `readonly` olur, yəni `FONTS.regular = 'başqa şey'` yazsanız, TypeScript xəta verər. `TabBar.tsx`-dəki `ICONS`/`LABELS` obyektləri də eyni səbəbdən `as const`-dır — bu, yuxarıdakı `keyof typeof` naxışının işləməsi üçün **vacibdir**: `as const` olmasa, `keyof typeof LABELS` `string` olardı, `'Home' | 'Search' | 'Profile'` yox.

### Type guard-lar (tip mühafizəçiləri)

Bir `if` bloku ilə TypeScript-ə "bu bloğun içində, bu dəyişənin tipi daha dardır" demək. `getApiErrorMessage.ts`-də:
```ts
if (isAxiosError<{ message?: string }>(error)) {
  return error.response?.data?.message ?? FALLBACK_MESSAGE;
}
```
`isAxiosError` axios kitabxanasının verdiyi bir funksiyadır, xüsusi bir imza ilə yazılıb ki, TypeScript "bu funksiya `true` qaytarsa, arqument həqiqətən `AxiosError` tipindədir" deyə bilsin (buna **type predicate** deyilir, funksiyanın qaytarma tipi `error is AxiosError<T>` formasında yazılır). Bizim öz kodumuzda bu naxışı görmək istəsəniz, ən sadə forması belədir:
```ts
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
```

`typeof`/`instanceof` ilə də sadə type guard-lar yaranır — `Input.tsx`-də (sətir 29):
```ts
const realValue = typeof value === 'string' ? value : '';
```
("`value`-nin runtime tipi `string`-dirsə onu işlət, deyilsə boş sətir işlət" — çünki `TextInputProps`-un `value` sahəsi TypeScript-də `string | undefined` ola bilər).

---

## Hissə 4: React və React Native əsasları

### Component (komponent) nədir?

React-də hər şey **komponent**dir — UI-ın kiçik, yenidən-istifadə oluna bilən parçası. Ən sadə forması: props alan, JSX qaytaran bir funksiya.

```tsx
function InputLabel({ children }: InputLabelProps) {
  return <Text style={styles.label}>{children}</Text>;
}
```

`children` — React-in xüsusi bir prop-udur: `<InputLabel>Telefon</InputLabel>` yazanda, `"Telefon"` sətri avtomatik `children` kimi ötürülür.

### JSX nədir?

```tsx
<View style={styles.header}>
  <Text style={styles.logo}>TIK TAK</Text>
</View>
```
Bu, **JavaScript deyil**, HTML-ə bənzəyən, amma əslində sadə `React.createElement(...)` çağırışlarına "compile" olunan bir sintaksisdir (Babel bunu edir, bax Hissə 17). `<View>` bir HTML `<div>`-i **deyil** — React Native-in öz komponentidir, Android-də `android.view.ViewGroup`-a, iOS-da `UIView`-a çevrilir.

### Props vs State — fərq nədir?

- **Props** — komponentə **kənardan** verilən, komponentin özünün dəyişə bilmədiyi məlumat (`<Button title="Daxil ol" />`-dakı `title`).
- **State** — komponentin **öz daxili yaddaşı**, `useState` ilə yaradılır, komponentin özü dəyişə bilər, dəyişəndə komponent **yenidən render olunur**.

```ts
const [password, setPassword] = useState('');
```
`password` — cari dəyər (başlanğıcda boş sətir). `setPassword('yeni')` çağırılanda, React bu komponenti (və onun içindəki JSX-i) **yenidən icra edir**, `password` indi `'yeni'`-dir, ekran yenilənir.

### `useEffect` — "yan təsirlər"

Komponentin render-i **saf** olmalıdır (eyni props/state ilə həmişə eyni JSX qaytarmalı) — şəbəkə sorğusu, timer qurmaq kimi "yan təsirlər" render zamanı deyil, **render bitdikdən sonra** olmalıdır. `useEffect` məhz bunun üçündür:

```ts
useEffect(() => {
  loadProfile();
}, [loadProfile]);
```

`[loadProfile]` — **asılılıq array-i**. React bu array-dəki dəyərlərdən **hər hansı biri** əvvəlki render-dən fərqlənəndə (referans müqayisəsi ilə), effekti yenidən işə salır. `[]` (boş array) — "yalnız ilk render-də bir dəfə işə sal" deməkdir (çünki boş array heç vaxt "dəyişmir").

**Təmizləmə funksiyası** — `useEffect`-in içindəki funksiya bir funksiya **qaytara** bilər, bu, komponent "unmount" olanda (ekrandan silinəndə) və ya effekt təkrar işə düşməzdən **əvvəl** çağırılır:
```ts
// useHomeData.ts, sətir 52-62
useEffect(() => {
  if (campaigns.length <= 1) return;
  const interval = setInterval(() => {
    campaignIndexRef.current = (campaignIndexRef.current + 1) % campaigns.length;
    campaignListRef.current?.scrollToIndex({ index: campaignIndexRef.current, animated: true });
  }, CAMPAIGN_AUTOPLAY_MS);
  return () => clearInterval(interval);
}, [campaigns]);
```
Bu, "kampaniya karuseli hər 3 saniyədən bir avtomatik sürüşsün" məntiqidir. `return () => clearInterval(interval);` olmasaydı, `campaigns` dəyişən **hər dəfə** yeni bir `setInterval` qurulardı, köhnələri isə **heç vaxt dayandırılmazdı** — yaddaş sızması (memory leak) və bir neçə paralel timer-in eyni anda işləməsi baş verərdi.

### Niyə `useCallback`?

```ts
const loadProfile = useCallback(() => {
  setLoading(true);
  setError(undefined);
  getProfile()
    .then(setProfile)
    .catch(err => setError(getApiErrorMessage(err)))
    .finally(() => setLoading(false));
}, []);

useEffect(() => {
  loadProfile();
}, [loadProfile]);
```

Adətən hər render-də funksiyalar **yenidən yaradılır** (JavaScript-də funksiya da bir dəyərdir, hər dəfə fərqli referansla). Əgər `loadProfile`-i `useCallback` olmadan yazsaydıq, `useEffect`-in asılılıq array-i (`[loadProfile]`) **hər render-də** "dəyişmiş" sayılardı (yeni funksiya = yeni referans), nəticədə `loadProfile()` **sonsuz dövrədə** çağırılardı: render → effekt işə düşür → `setLoading(true)` state dəyişir → yenidən render → yeni `loadProfile` → effekt yenə işə düşür... `useCallback(fn, [])` isə "bu funksiyanı yaddaşda saxla, `[]` daxilindəki dəyərlər dəyişməyənə qədər **eyni referansı** qaytar" deməkdir — beləliklə `useEffect` yalnız **əsl** lazım olduqda işə düşür.

Bu həm də layihədə **"retry" (yenidən cəhd) düyməsinin** necə işlədiyinin əsasıdır — `loadProfile` funksiyası həm `useEffect`-də ilkin yükləmə üçün, həm də `ErrorState`-in `onRetry={loadProfile}` prop-unda **eyni funksiya** kimi işlədilir.

### `View`, `Text`, `StyleSheet` — React Native-in "HTML/CSS"-i

Veb-də `<div>`, `<span>`, `<p>` və CSS faylları var. React Native-də bunların qarşılığı:

- **`<View>`** — universal konteyner (veb-dəki `<div>`-in qarşılığı). Özündə mətn saxlaya **bilməz** — mətn həmişə `<Text>` daxilində olmalıdır.
- **`<Text>`** — yalnız mətn üçün. React Native-də `<View>Salam</View>` yazmaq **xəta**dır, `<View><Text>Salam</Text></View>` yazılmalıdır.
- **`StyleSheet.create({...})`** — CSS-in qarşılığı, amma **CSS faylı deyil**, JavaScript obyektidir:
  ```ts
  export const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: '#FFFFFF' },
    title: { fontSize: 20, color: '#1A1A1A', fontFamily: FONTS.bold, textAlign: 'center' },
  });
  ```
  `StyleSheet.create` sadəcə tip-yoxlama və kiçik performans optimallaşdırması (stil obyektlərini bir dəfə yaradıb ID-yə bağlamaq) verir — funksional olaraq adi JS obyektindən fərqi azdır.

### Flexbox — **yeganə** layout sistemi

CSS-də `display: flex` **seçimlərdən biridir** (grid, block, inline də var). React Native-də isə **hər `View` default olaraq flexbox-dur** — başqa layout modeli yoxdur. Əsas fərqlər veb CSS-dən:
- `flexDirection`-ın **default**-u `'column'`-dur (veb-də `'row'`-dur) — yəni uşaq elementlər default olaraq **yuxarıdan-aşağı** düzülür.
- Vahidlər **rəqəmdir**, `px`/`%` yazılmır: `{ width: 100 }` (100-ün özü density-independent pixel — dp).
- `gap` sahəsi (məsafə) React Native-in nisbətən yeni versiyalarında dəstəklənir və bu layihədə geniş işlədilir (`form: { gap: 20 }` kimi) — əvvəllər hər elementə əlavə `marginBottom` yazmaq lazım gəlirdi.

Nümunə (`ProfileScreen.styles.ts`-dən bənzər):
```ts
menu: {
  marginTop: 32,
  paddingHorizontal: 24,
},
```

### Metro — React Native-in "Webpack"-i

Veb layihələrində kod brauzer üçün Webpack/Vite ilə "bundle" olunur. React Native-də bu işi **Metro** görür — sizin bütün `.ts`/`.tsx` fayllarınızı, şəkillərinizi (SVG daxil, aşağıda), `node_modules`-u bir araya gətirib telefonun JS mühərriki (Hermes) üçün icra oluna bilən bir JS bundle-ına çevirir. `npm run start` (`react-native start`) Metro server-ini başladır — telefon tətbiqi işə düşəndə bu server-dən **canlı** yeni kodu çəkir (development zamanı), bu da "Fast Refresh"-i (kodu dəyişəndə tətbiqin avtomatik yenilənməsini) mümkün edir.

### Native modul nədir?

Bəzi funksionallıq (kamera, fayl sistemi, cihaz yaddaşı) **sırf JavaScript ilə mümkün deyil** — telefonun əməliyyat sisteminə (Android/iOS-un öz API-larına) müraciət tələb edir. Bu körpünü quran kitabxanalara **native modul** deyilir — onların JS tərəfi ilə yanaşı, Android üçün Kotlin/Java, iOS üçün Swift/Objective-C (bəzən həm də C++, "New Architecture"-da) kodu da var. Layihədə `react-native-mmkv`, `react-native-svg`, `react-native-gesture-handler`, `react-native-reanimated`, `react-native-image-picker`, `react-native-bootsplash` — hamısı native moduldur. Bunun **əməli** nəticəsi: sırf JS paketi əlavə etmək kifayət etmir, native tərəfi də tətbiqə "bağlamaq" (linking) və android/ios layihələrini **yenidən compile etmək** lazımdır (`CLAUDE.md`-də dəfələrlə vurğulanan "type-checking passing does not mean it's linked yet" xəbərdarlığı buna görədir).

### Android vs iOS — nə fərqlidir?

- **Fayl sistemi/qovluqlar**: `android/` və `ios/` qovluqları hər platformanın öz native layihəsini saxlayır (Android üçün Gradle, iOS üçün Xcode/CocoaPods layihəsi).
- **Klaviatura davranışı**: Android-in `adjustResize` rejimi klaviatura açılanda ekranı sıxışdırır, iOS isə bunu etmir — `react-native-keyboard-controller`-in işlədilmə səbəbi məhz bu fərqi hamarlamaqdır (bax Hissə 18).
- **Splash screen**: Android 12+ splash ikonunu **məcburi dairəvi** kəsir, iOS-da belə məhdudiyyət yoxdur (bax Hissə 18).
- **Naviqasiya jestləri**: iOS-da "sağa sürüşdürüb geri qayıtmaq" sistem səviyyəsindədir, Android-də bu, React Navigation-un `gestureEnabled` seçimi ilə idarə olunur (bax `HomeStackNavigator.tsx`-dəki `gestureEnabled: false`).
- **`Platform.OS`** — kodda `if (Platform.OS === 'ios') {...}` yazaraq platform-spesifik budaqlar yaratmaq mümkündür. `CLAUDE.md`-nin "Working agreements" hissəsində qeyd olunduğu kimi, bu layihə hazırda **əsasən Android-də** test olunub, iOS tərəfi hələ tam işlənməyib — gələcək iş kimi planlaşdırılıb.

### `SafeAreaProvider` / `useSafeAreaInsets`

Müasir telefonlarda "notch" (kamera kəsiyi), status bar, ev düyməsi zolağı kimi UI-a "basıla bilən" sahələr var. `react-native-safe-area-context`-in `useSafeAreaInsets()` hook-u bu sahələrin ölçüsünü (`top`, `bottom`, `left`, `right`) qaytarır ki, kontenti bu zolaqların **altında gizlənmədən** yerləşdirə bilək:
```ts
const insets = useSafeAreaInsets();
// ...
<View style={[styles.flex, { paddingTop: insets.top }]}>
```
Bu naxışı demək olar **hər ekranda** görəcəksiniz — ekranın yuxarı/aşağı kənarına toxunan hər element bu cür `insets`-lə "hesablaşır".

---

## Hissə 5: Qovluq strukturu

```
Tiktak/
├── App.tsx                    ← Tətbiqin kök komponenti (bax Hissə 8)
├── index.js                   ← Tətbiqin əsl giriş nöqtəsi
├── app.json                   ← Tətbiqin adı və s.
├── babel.config.js            ← Babel konfiqurasiyası (alias-lar burada)
├── metro.config.js            ← Metro bundler konfiqurasiyası
├── tsconfig.json              ← TypeScript konfiqurasiyası (alias-lar burada da)
├── jest.config.js             ← Test konfiqurasiyası
├── package.json               ← Asılılıqlar (dependencies) və skriptlər
├── scripts/
│   └── build-apk.js           ← Release APK yaratmaq üçün skript (bax Hissə 17)
├── android/                   ← Android-in native layihəsi (Gradle)
├── ios/                       ← iOS-un native layihəsi (Xcode/CocoaPods)
├── assets/                    ← Şəkillər, SVG-lər (@assets alias-ı bura işarə edir)
├── types/                     ← Layihə-boyu paylaşılan TypeScript tipləri (bax Hissə 7)
│   ├── api.ts                 ← Backend-dən gələn/gedən data tipləri
│   ├── navigation.ts          ← Naviqasiya param tipləri
│   ├── svg.d.ts                ← "*.svg" import-larını TypeScript-ə tanıdır
│   └── images.d.ts             ← "*.png/.jpg/.jpeg" import-larını tanıdır
├── docs/
│   └── api.md                 ← Backend API-nin sənədləşməsi (Postman-dan)
└── src/
    ├── navigation/             ← Bütün naviqasiya konfiqurasiyası (bax Hissə 9)
    │   ├── RootNavigator.tsx
    │   ├── navigationRef.ts
    │   ├── BottomTabNavigator.tsx
    │   ├── HomeStackNavigator.tsx
    │   ├── ProfileStackNavigator.tsx
    │   └── TabBar.tsx
    ├── screens/                ← Bütün ekranlar (bax Hissə 15)
    │   ├── auth/                ← Giriş-öncəsi: Welcome, Login, Register
    │   └── protected/           ← Giriş-sonrası: home/, basket/, checkout/, search/, profile/
    ├── shared/                 ← Ekranlar-arası paylaşılan hər şey
    │   ├── api/                 ← httpClient.ts, tokenStorage.ts (bax Hissə 11)
    │   ├── components/          ← Button, TextField, ScreenHeader, ErrorState və s. (bax Hissə 14)
    │   ├── config/               ← env.ts (BASE_URL və s.)
    │   ├── hooks/                ← useReload.ts
    │   ├── services/             ← Hər backend sahəsi üçün bir fayl (bax Hissə 12)
    │   ├── store/                ← basket.store.ts (Zustand, bax Hissə 13)
    │   └── utils/                ← validation.ts, apiError.ts, toast.ts, order.ts
    └── theme/
        └── fonts.ts              ← Font adları sabiti
```

**Diqqət:** `types/` qovluğu `src/`-in **daxilində deyil**, layihənin **kökündədir**. Bu qəsdəndir — `types/` yalnız **birdən çox əlaqəsiz fayl arasında** paylaşılan tiplər üçündür (`UserProfile`, naviqasiya param-ları kimi). Bir komponentin öz prop tipi (`ButtonProps` kimi) isə **öz qovluğunda**, `ComponentName.types.ts` faylında qalır — bunları mərkəzləşdirmək (`types/`-ə köçürmək) səhv olardı, çünki o zaman "bu tip hardan istifadə olunur" sualına cavab tapmaq çətinləşərdi.

`src/hooks/` deyil, `src/shared/hooks/` — bu, 2026-08-25-də şüurlu şəkildə köçürülüb: `useReload` başqa ekranlar arasında paylaşılan (reusable) bir hook-dur, `shared/`-in bütün digər məzmunu (api, services, components, utils) kimi eyni kateqoriyaya aiddir. Əvvəllər ayrıca `src/hooks/` qovluğu var idi, amma orada **cəmi bir fayl** var idi — bu, strukturlaşdırılmış qərar deyil, sadəcə təsadüfən elə qalmışdı.

---

## Hissə 6: Per-component qovluq konvensiyası

Demək olar hər ekran/komponent bu formada təşkil olunub:

```
ComponentName/
├── ComponentName.tsx          ← Əsas komponent kodu
├── ComponentName.styles.ts    ← StyleSheet.create({...}) bloku
├── ComponentName.types.ts     ← Props tipi (əgər varsa)
└── index.ts                   ← export { default } from './ComponentName';
```

### Niyə belə?

**1. `.styles.ts` ayrı fayldadır.** Bir komponent həm biznes-məntiqi (state, handler-lər), həm JSX, həm də (bəzən onlarla sətir) stil daşıyırsa, faylı oxumaq çətinləşir — "bura stil, bura məntiq" ayırd etmək gözü yorur. Ayırmaqla, `ComponentName.tsx`-i açan kəs birbaşa **nə baş verdiyini**, `.styles.ts`-i açan isə **necə göründüyünü** oxuyur.

**2. `.types.ts` ayrıdır, amma yalnız lazım olduqda.** `MenuRow.types.ts` kimi kiçik fayllar bəzən 4-5 sətirdir, amma bu, o komponentin **ictimai müqaviləsini** (hansı props qəbul edir) bir baxışda görünən yerə çıxarır — `ComponentName.tsx`-in özünü açmadan, sadəcə `.types.ts`-ə baxaraq "bu komponentə nə ötürməliyəm" sualına cavab tapmaq olur.

**3. `index.ts` — "barel fayl".** Xarici import `@shared/components/Button` şəklində qalır (`@shared/components/Button/Button` yox) — çünki qovluğun `index.ts`-i `export { default } from './Button';` yazır, JavaScript/TypeScript modul sistemində bir qovluğa import edəndə avtomatik onun `index.ts`-i axtarılır. Beləliklə, daxili fayl adlandırma konvensiyası **dəyişsə belə**, xarici import yolları sınmır.

**Named export-lar da `index.ts`-dən keçir** — məsələn `ProductCard/index.ts`:
```ts
export { default } from './ProductCard';
export { COLUMNS, GRID_GAP, HORIZONTAL_PADDING, CARD_WIDTH } from './ProductCard.styles';
```
Bu, `ProductCard`-ın grid-layout sabitlərini (məsələn neçə sütunlu grid olduğunu) **başqa ekranların da** (CategoryProductsScreen, MyListsScreen) eyni dəyərlərlə işləməsi üçün ictimai edir — sütun sayı iki yerdə fərqli təsadüfən yazılmasın deyə.

### Bu qaydanın istisnaları

- **`src/navigation/HomeStackNavigator.tsx`, `TabBar.tsx`** — flat saxlanılıb, çünki cəmi ~30 sətir stil var, ayırmaq faydadan çox əlavə fayl aça-bağlama yorğunluğu yaradardı.
- **`src/shared/components/icons.tsx`** — bir "komponent" deyil, kiçik, müstəqil SVG ikon funksiyalarının **torbasıdır** (`HomeIcon`, `SearchIcon`, `UserIcon` və onlarla başqası, hər biri 10-15 sətir). Bunları 30+ ayrı qovluğa bölmək, faydadan çox routin əlavə edərdi.
- **`src/screens/protected/basket/`** — `BasketScreen.tsx`/`.styles.ts`/`index.ts` birbaşa `basket/` qovluğunun içindədir, öz `BasketScreen/` alt-qovluğu **yoxdur**. Səbəb: `basket/` sahə-qovluğu (`home/`, `checkout/`, `profile/` kimi) yalnız **bir** ekran saxlayır — `basket/BasketScreen/BasketScreen.tsx` yazsaydıq, "basket" sözü ard-arda 2 dəfə təkrarlanardı, mənasız bir qat əlavə olardı. 2026-08-24-də bu düzləndirildi.

### `.constants.ts` **niyə yoxdur**?

Bəziləri gözləyə bilər ki, `.styles.ts`/`.types.ts` kimi, kiçik sabitlər üçün də ayrıca `.constants.ts` faylı olsun. Bu, **şüurlu şəkildə rədd edilib** (2026-08-22-də müzakirə olunub). Səbəb: bu layihədəki əksər lokal sabitlər (`FALLBACK_IMAGE_URL`, debounce müddəti kimi) **tək-istifadəlik, bir sətirlik** dəyərlərdir, işlədildiyi yerə sıx bağlıdır. Onları ayrı fayla köçürmək, oxucunu "bu sabit nə üçündür" sualının cavabından **uzaqlaşdırar** — kontekstdən qopararaq, faydadan çox anlaşılmazlıq yaradar. Qayda: **stil obyektinə birbaşa girən sabitlər** (`CARD_WIDTH`, `HORIZONTAL_PADDING`) `.styles.ts`-də qalır, **məntiq/JSX-də işlədilən sabitlər** isə `.tsx` daxilində qalır.

---

## Hissə 7: Tiplər sistemi

### `types/api.ts` — backend ilə "müqavilə"

Bu fayl, backend-in `docs/api.md`-də sənədləşdirilmiş cavablarının **TypeScript güzgüsüdür**. Hər `interface` bir backend obyektinə uyğun gəlir:

```ts
export interface ApiEnvelope<T> {
  message: string;
  data: T;
  result: boolean;
}
```
Bu, backend-in **ən çox** işlətdiyi cavab "zərfidir" (envelope) — həqiqi məlumat (`data`) daxilində, bir uğur mesajı və bool nəticə ilə birlikdə gəlir. Bunun **generic** (`<T>`) olması vacibdir, çünki hər endpoint fərqli `data` tipi qaytarır — `ApiEnvelope<UserProfile>`, `ApiEnvelope<Basket>`, `ApiEnvelope<Category[]>` kimi, eyni "zərf" formasını yenidən-yenidən yazmadan.

```ts
export interface PaginatedEnvelope<T> extends ApiEnvelope<T[]> {
  pagination: Pagination;
}
```
Səhifələnmiş siyahılar (məhsul siyahısı kimi) üçün — `ApiEnvelope<T[]>`-i miras alır (yəni `data` bir array-dir) + üstünə `pagination` (cari səhifə, ümumi səhifə sayı) əlavə edir.

Domain (sahə) tipləri (`UserProfile`, `Category`, `Campaign`, `Product`, `Basket`, `Order` və s.) hər biri backend-in müvafiq obyektinin **eyni ilə** güzgüsüdür — sahə adları belə backend-dəki `snake_case`-ə (`full_name`, `img_url`, `created_at`) uyğun saxlanılıb, çevirmə (mapping) qatı **yoxdur**. Bu, sadəlik üçün şüurlu bir seçimdir — kiçik layihədə hər sahəni "frontend adına" çevirmək əlavə mürəkkəblik olardı ki, heç bir real faydası olmazdı.

**`ProductDetail extends Product`** nümunəsi Hissə 3-də izah olunub — API-nin "siyahı görünüşü" (`Product`) ilə "detal görünüşü" (`ProductDetail`, üstünə `is_favorite` ilə) arasındakı fərqi dəqiq ifadə edir.

### `types/navigation.ts` — ekranlar arası "xəritə"

```ts
export type RootStackParamList = {
  Welcome: undefined;
  Register: undefined;
  Login: undefined;
  Main: NavigatorScreenParams<ProtectedTabParamList> | undefined;
  Basket: undefined;
  Checkout: undefined;
  OrderSuccess: undefined;
};
```
Hər açar bir ekran adıdır, dəyəri isə **həmin ekrana naviqasiya edərkən ötürülməli param-ın tipidir**. `undefined` — "bu ekran heç bir param gözləmir" (`navigation.navigate('Welcome')` kifayətdir). `NavigatorScreenParams<ProtectedTabParamList>` isə **iç-içə** (nested) naviqasiya üçündür — `Main` özü bir tab-naviqasiyadır, onun içində daha bir "hara getməli" sualı var.

```ts
export type HomeStackParamList = {
  HomeMain: undefined;
  CategoryProducts: { categoryId: number; categoryName: string };
};
```
`CategoryProducts` isə **param tələb edir** — `navigation.navigate('CategoryProducts', { categoryId: 5, categoryName: 'Meyvələr' })` yazmasanız, TypeScript xəta verir. Bu tip-təhlükəsizliyin faydası: `CategoryProductsScreen.tsx`-də `route.params.categoryId`-ə müraciət edəndə, TypeScript bunun **mütləq** bir `number` olduğunu bilir — `route.params?.categoryId` yazıb "bəlkə yoxdur" narahatlığı çəkməyə ehtiyac yoxdur.

**İç-içə naviqasiyanın "necə çağırılması"** maraqlıdır — `CLAUDE.md`-də qeyd olunduğu kimi:
```ts
navigation.navigate('Main', { screen: 'Home', params: { screen: 'HomeMain' } })
```
Bu, "kök stack-də `Main`-ə get, orada tab-naviqasiyanın `Home` tab-ına get, o tab-ın öz stack-ində `HomeMain` ekranına get" deməkdir — hər səviyyə öz `ParamList` tipi ilə TypeScript tərəfindən yoxlanılır, səhv ekran adı yazsanız (yazı səhvi kimi) compile zamanı tutulur.

### `types/svg.d.ts`, `types/images.d.ts` — "ambient" bəyanatlar

```ts
declare module '*.svg' {
  import type { FC } from 'react';
  import type { SvgProps } from 'react-native-svg';
  const content: FC<SvgProps>;
  export default content;
}
```
TypeScript öz-özünə `.svg`/`.png`/`.jpg` fayllarının nə olduğunu **bilmir** (bunlar kod faylı deyil). Bu `declare module '*.svg' {...}` bəyanatı TypeScript-ə deyir: "hər dəfə kimsə `import Foo from './foo.svg'` yazsa, `Foo`-nun tipini `FC<SvgProps>` (React komponenti) kimi qəbul et". `react-native-svg-transformer` (bax Hissə 17) isə Metro səviyyəsində, əsl SVG faylını doğrudan da bir React komponentinə **çevirir** — bu iki mexanizm (TypeScript tərəfi və Metro tərəfi) birlikdə işləyərək `<FruitImage width={260} height={260} />` kimi SVG-ni adi komponent kimi istifadə etməyə imkan verir.

---

## Hissə 8: Giriş nöqtələri

### `index.js`

```js
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```
Bu, tətbiqin **əsl** başlanğıc nöqtəsidir — React Native-in öz `AppRegistry`-sinə "bu tətbiqin (adı `app.json`-dan gəlir) kök komponenti `App`-dır" deyir. Android/iOS native tərəfi bu adı işlədərək JS bundle-ını yükləyəndə hansı komponentdən başlayacağını bilir.

### `App.tsx` — "provider-lər zənciri"

```tsx
function App() {
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <SafeAreaProvider>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <NavigationContainer ref={navigationRef}>
              <RootNavigator />
            </NavigationContainer>
            <Toast />
          </SafeAreaProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
```

React-də "provider" naxışı — bir komponent ağacın **başında** dayanıb, altındakı **bütün** komponentlərə ortaq bir imkan/state verir (Context API vasitəsilə, arxa planda). Burada hər qatın öz rolu var, **sırası əhəmiyyətlidir** (ən xaricdəki ən əvvəl icra olunur, ən son bağlanır):

1. **`ErrorBoundary`** — ən xaricdə, çünki alt ağacın **istənilən yerində** bir JS xətası baş versə, bunu tutub tətbiqi tamamilə ağardan (white screen) qorumalıdır (bax Hissə 14).
2. **`GestureHandlerRootView`** — `react-native-gesture-handler`-in işləməsi üçün **kökdə, bir dəfə** olmalıdır (`CLAUDE.md`-də vurğulanır: iç-içə ikinci nüsxə lazım deyil, `BottomSheet` daxilində əlavə bir dənə var idi, sadəcə bir keçmiş debug cəhdinin izi kimi qalıb, funksional problem yaratmır çünki daxili `TouchableOpacity`-lər core RN-dəndir).
3. **`KeyboardProvider`** — `react-native-keyboard-controller`-in bütün klaviatura-uyğunlaşdırma məntiqinin işləməsi üçün ehtiyac duyduğu konteksti verir.
4. **`SafeAreaProvider`** — `useSafeAreaInsets()`-in işləməsi üçün ehtiyac duyduğu konteksti verir.
5. **`NavigationContainer`** — React Navigation-un kökü, bütün ekran-keçidlərini idarə edir. `ref={navigationRef}` — bu, **çox vacib bir naxışdır**, Hissə 9-da ətraflı izah olunur.
6. **`RootNavigator`** — bizim öz naviqasiya ağacımız (bax Hissə 9).
7. **`Toast`** — `NavigationContainer`-dən **kənarda, ondan sonra** yerləşdirilib ki, bütün ekranların **üzərində** görünsün, ekran keçidlərindən asılı olmadan (bax Hissə 16).

`useEffect(() => { BootSplash.hide({ fade: true }); }, [])` — tətbiq ilk render olunanda, native splash screen-i (loqo göstərən ilkin ekran) yumşaq keçidlə (fade) gizlədir — bu, JS bundle-ının yüklənməsi bitənə qədər istifadəçinin boş/ağ ekran görməsinin qarşısını alır.

---

## Hissə 9: Naviqasiya

### Stack, Tab — fərqləri

- **Stack Navigator** — ekranlar bir-birinin **üzərinə yığılır** (kağız yığını kimi), geri düyməsi bir üstdəkini "sıyırır". `RootNavigator`, `HomeStackNavigator`, `ProfileStackNavigator` — hamısı stack-dir.
- **Tab Navigator** — bir neçə ekran arasında **yan-yana** keçid, adətən ekranın altında düymələrlə (`BottomTabNavigator`).

### `RootNavigator.tsx` — kök stack

```tsx
function RootNavigator() {
  const initialRouteName = getAccessToken() ? 'Main' : 'Welcome';

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="Basket" component={BasketScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
    </Stack.Navigator>
  );
}
```

**Diqqətə çarpan nöqtə:** `Basket`, `Checkout`, `OrderSuccess` — bunlar `Main` (tab-lar) ilə **eyni səviyyədə**, kök stack-in **birbaşa üzvləridir**, tab-ların içində **deyil**. Niyə? Çünki bu 3 ekran **istənilən tab-dan** çağırıla bilməlidir — məsələn həm "Əsas" tab-ındakı bir məhsul kartından, həm "Axtar" tab-ından səbətə keçmək mümkündür. Əgər `Basket` `Home` tab-ının daxili stack-ində olsaydı, `Search` tab-ından ona keçmək qat-qat mürəkkəbləşərdi.

`initialRouteName` — tətbiq açılanda **hansı ekrandan başlasın** sualının cavabıdır:
```ts
const initialRouteName = getAccessToken() ? 'Main' : 'Welcome';
```
Bu, `getAccessToken()`-in **sinxron** olmasına əsaslanır (bax Hissə 10, MMKV) — heç bir "yüklənir..." ekranı **lazım deyil**, çünki token-in olub-olmadığı **dərhal**, birinci render-də məlum olur.

### `navigationRef.ts` — komponent olmayan yerdən naviqasiya

```ts
import { createNavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from '@typings/navigation';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function resetToWelcome() {
  if (navigationRef.isReady()) {
    navigationRef.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  }
}
```

**Problem:** normalda naviqasiya etmək üçün `useNavigation()` hook-u işlədilir — amma bu, yalnız **React komponentlərinin daxilində** işləyir (hook-lar komponent/hook daxilində çağırılmalıdır). `httpClient.ts` isə sırf bir JS modulu, React komponenti **deyil** — session bitəndə "istifadəçini Welcome ekranına at" demək lazım olanda, `useNavigation()`-dan istifadə etmək **mümkün deyil**.

**Həll:** `createNavigationContainerRef()` — komponent ağacından **kənarda** yaşayan bir "referans" yaradır. Bu referans `App.tsx`-də `<NavigationContainer ref={navigationRef}>` ilə **əsl naviqasiya konteynerinə bağlanır**. Beləliklə `navigationRef.reset(...)` istənilən sıravi JS faylından (komponent olmadan) çağırıla bilər — `resetToWelcome()` məhz bunu edir, `httpClient.ts`-in 401-response interceptor-unda işlədilir (bax Hissə 11).

`navigationRef.isReady()` yoxlaması vacibdir — əgər `NavigationContainer` hələ mount olmayıbsa (məsələn, tətbiq hələ açılırkən çox erkən bir sorğu xəta versə), `.reset()` çağırmaq xəta atar; `isReady()` bu erkən çağırışları təhlükəsiz "susdurur".

### `BottomTabNavigator.tsx` — `tabBar` render prop naxışı

```tsx
function renderTabBar(props: BottomTabBarProps) {
  return <TabBar {...props} />;
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={renderTabBar}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}
```
`tabBar` prop-u öz **xüsusi** tab-bar dizaynımızı (`TabBar.tsx`) React Navigation-un standart tab-bar-ı əvəzinə işlətməyə imkan verir. Faylda diqqətli bir şərh var: `renderTabBar` funksiyası **modul-səviyyəli sabit referans** olmalıdır (hər render-də yenidən yaradılmamalıdır) — çünki `BottomTabView` bunu **adi funksiya kimi çağırır**, JSX kimi `<TabBar {...props} />` yazmır; əgər birbaşa `tabBar={TabBar}` yazsaydıq, `TabBar` bir React komponenti kimi deyil, sıravi funksiya kimi çağırılardı, bu da onun daxilindəki hook-ları (`useSafeAreaInsets` kimi) **sındırardı** (hook-lar yalnız React-in öz render mərhələsində, komponent kimi çağırılanda işləyir).

### `TabBar.tsx` — xüsusi tab-bar

Bu fayl Hissə 3-də `as const`/`keyof typeof`/`Partial<Record<...>>` nümunələri üçün istifadə olunmuşdu. Əlavə edilməli maraqlı bir şərh (sətir 22-26):
```ts
// Tabs backed by a nested stack need their initial screen named explicitly —
// `navigate(route.name)` on an already-focused tab does NOT reset a nested
// stack back to its first screen by itself...
```
Bu, "Əsas" tab-ında bir kateqoriyanın məhsullarına baxarkən yenidən "Əsas" düyməsinə basanda, **kateqoriya siyahısına** (ilk ekrana) qayıtmaq gözləntisini izah edir — React Navigation-un öz standart tab-bar-ı bunu avtomatik edir (bir tab-a təkrar basanda onun nested stack-i sıfırlanır), amma **xüsusi** tab-bar yazanda bu davranış **əl ilə** yenidən yaradılmalıdır — `navigation.navigate(route.name, { screen: initialScreen })` yazaraq açıq-aydın "ilkin ekrana get" deyilir.

### `HomeStackNavigator.tsx` — `AppHeader`-in yeri

```tsx
function HomeStackNavigator() {
  return (
    <View style={styles.flex}>
      <AppHeader />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeMain" component={HomeScreen} />
        <Stack.Screen
          name="CategoryProducts"
          component={CategoryProductsScreen}
          options={{ gestureEnabled: false }}
        />
      </Stack.Navigator>
    </View>
  );
}
```
`AppHeader` (loqo + səbət ikonu) `Stack.Navigator`-un **xaricində**, amma onu əhatə edən `View`-in daxilindədir — beləliklə bu header **hər iki** daxili ekranda (`HomeMain` və `CategoryProducts`) sabit qalır, hər ekranın öz header-i yazılmasına ehtiyac qalmır. `CategoryProducts`-da `gestureEnabled: false` — bu ekranda sağa-sürüşdürüb-geri-qayıtma jesti **söndürülüb** (görünür, bu ekranın öz daxili üfüqi sürüşdürmə elementləri — kateqoriya çipləri kimi — ilə qarışmasın deyə).

---

## Hissə 10: Autentifikasiya

### `tokenStorage.ts` — token-lər haradadır?

```ts
import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({ id: 'tiktak-storage' });

export function getAccessToken(): string | null {
  return storage.getString(ACCESS_TOKEN_KEY) ?? null;
}
```

**MMKV nədir?** Bu, telefon diskində açar-dəyər (key-value) formatında məlumat saxlamaq üçün Tencent-in yazdığı, **C++ əsaslı** native kitabxanadır. Köhnə `AsyncStorage`-dan fərqi: `AsyncStorage` **hər** oxuma/yazma üçün asinxron körpüdən keçirdi (yavaş), MMKV isə memory-mapped fayl texnikası ilə demək olar **anlıq, sinxron** oxuma verir.

**Niyə sinxronluq vacibdir?** `RootNavigator`-da gördüyümüz kimi:
```ts
const initialRouteName = getAccessToken() ? 'Main' : 'Welcome';
```
Bu sətir **komponentin ilk render-ində, dərhal** işə düşür. Əgər `getAccessToken()` asinxron olsaydı (`AsyncStorage`-da olduğu kimi), tətbiq token-i "gözləyərkən" ya boş ekran göstərməli, ya da "yüklənir..." spinner-i əlavə etməli idi. MMKV-nin sinxronluğu bu **ara ekranı tamamilə lazımsız edir**.

> `getAccessToken`-in imzasında `Promise` yoxdur, amma bəzi kod yerlərində hələ də `await getAccessToken()` yazılıb (məsələn `httpClient.ts`-in request interceptor-unda). Bu, xəta **deyil** — JavaScript-də `await qeyri-Promise-dəyər` sadəcə həmin dəyəri **dərhal** qaytarır, heç bir gecikmə yaratmır. Kod miqrasiya zamanı (AsyncStorage-dan MMKV-yə keçəndə) bu sətirləri təmizləmək **vacib olmadığı üçün** toxunulmayıb.

### `react-native-mmkv@4` — diqqət ediləsi tələ

`createMMKV({ id: 'tiktak-storage' })` — **funksiya çağırışı**dır, `new MMKV(...)` **deyil**. MMKV-nin 4-cü versiyası kitabxananı sıfırdan, Nitro Modules adlı yeni bir native-körpü arxitekturasında yazıb — bu versiyada `MMKV` artıq **yalnız bir TypeScript tipidir**, runtime-da mövcud bir sinif (class) **deyil**. `new MMKV()` yazsanız, "Cannot read property 'prototype' of undefined" xətası ilə çökərsiniz. Bu, kitabxananın **köhnə** sənədləşməsinə uyğun kod yazanların düşdüyü çox yayılmış bir tələdir.

### "Sessiyanı aktiv saxla" (Remember me) məntiqi

```ts
// LoginScreen-də bir Checkbox var, defolt: unchecked

// auth.service.ts
export async function login(payload: LoginPayload, rememberMe: boolean): Promise<LoginResponse> {
  const { data } = await httpClient.post<ApiEnvelope<LoginResponse>>('/auth/login', payload);
  setRememberMe(rememberMe);
  await setTokens(data.data.tokens.access_token, data.data.tokens.refresh_token);
  return data.data;
}
```

```ts
// tokenStorage.ts, faylın ən sonunda, modul yüklənəndə BİR DƏFƏ işə düşür
if (!getRememberMe()) {
  clearTokens();
}
```

Bu son bloku diqqətlə oxuyun — o, `tokenStorage.ts` modulunun **importlanma anında**, yəni tətbiqin **soyuq başlanğıcında** (cold start — proses tamamilə yenidən başlayanda) **bir dəfə** işə düşür. Tətbiqi arxa plana atıb (background) geri gəlmək JS prosesini **yenidən başlatmır** (proses yaşamağa davam edir) — ona görə bu yoxlama **yalnız** telefon tətbiqi tam bağlayıb yenidən açanda təsir edir. Nəticə: "Sessiyanı aktiv saxla" işarələnməyibsə, istifadəçi tətbiqi arxa plana atıb geri qayıda bilər (sessiya davam edir), amma tətbiqi **tam bağlayıb yenidən açsa**, yenidən giriş etməli olur — dəqiq "sessiya yalnız tətbiq açıq olduğu müddətdə" davranışı, ayrıca "yaddaşda-saxlanan-diskdə-yox" token növü qurmadan.

### `signup` vs `login` — niyə fərqli davranırlar?

```ts
export async function signup(payload: SignupPayload): Promise<void> {
  await httpClient.post<ApiEnvelope<null>>('/auth/signup', payload);
}
```
`signup` **heç bir token qaytarmır** (`ApiEnvelope<null>`) — qeydiyyatdan sonra istifadəçi **avtomatik daxil olmur**, ayrıca Login ekranına yönləndirilir (`RegisterScreen.tsx`-də `navigation.navigate('Login')`). `login` isə token-ləri alıb saxlayır və istifadəçini birbaşa `Main`-ə aparır.

---

## Hissə 11: API qatı

### `env.ts` — konfiqurasiya

```ts
export const BASE_URL = 'https://api.sarkhanrahimli.dev';
export const LANG = 'az';
```
Sadə, amma vacib bir detal: `BASE_URL`-də `/api/tiktak` **yoxdur** — bu şaquli sonluq `httpClient.ts`-in özündə əlavə olunur. Niyə ayrılıb? Çünki `performRefresh` funksiyası (aşağıda) `axios`-un **öz**, `httpClient`-dən asılı olmayan instansını işlədir, amma eyni URL-ə ehtiyac duyur — `BASE_URL`-i "təmiz" saxlamaq, hər iki yerdə `${BASE_URL}/api/tiktak/...` yazmağa imkan verir, təkrarlanmanı azaldır.

### `httpClient.ts` — mərkəzi axios instansı

Bütün şəbəkə sorğuları **bir** axios instansından keçir:
```ts
const httpClient = axios.create({
  baseURL: `${BASE_URL}/api/tiktak`,
  headers: { 'Accept-Language': LANG },
});
```

**Interceptor nədir?** Axios-un "hər sorğudan/cavabdan **əvvəl**, mərkəzi bir yerdə, avtomatik iş görmək" imkanıdır — hər ayrı `service` faylında eyni məntiqi təkrarlamaq əvəzinə.

**Request interceptor** (sorğu **gedəndə** işə düşür):
```ts
httpClient.interceptors.request.use(async config => {
  const token = await getAccessToken();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});
```
Bu, **hər** sorğuya avtomatik `Authorization: Bearer <token>` başlığı əlavə edir — `basket.service.ts`, `product.service.ts` və s. heç biri bu barədə **düşünməli deyil**, mərkəzi yerdə həll olunub.

**Response interceptor — token yeniləmə axını.** Bu, faylın ən mürəkkəb, ən öyrədici hissəsidir:

```ts
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = performRefresh().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}
```

**Nə üçün bu qəribə `refreshPromise` dəyişəni var?** Təsəvvür edin: bir ekran eyni anda **3 fərqli** sorğu göndərir (məsələn profil, kateqoriyalar, kampaniyalar — `Promise.all` ilə, Hissə 2-yə bax), və token vaxtı bitib. Hər 3 sorğu da eyni anda `401` cavabı alacaq. Əgər hər biri **öz-özünə** "yeni token al" sorğusu göndərsə, backend-ə **3 ayrı** refresh sorğusu gedər — bu, həm lazımsız yük, həm də bəzi backend-lərdə (refresh token-i "bir dəfəlik" sayanlarda) real bir problem yarada bilər (2-ci refresh sorğusu artıq "işlədilmiş" bir refresh token-lə uğursuz ola bilər).

**Həll — "in-flight promise" naxışı:** `refreshPromise` dəyişəni modul-səviyyəli (bütün sorğular arasında **paylaşılan**) bir dəyişəndir. Birinci `401` gələndə `refreshPromise` `null`-dur, ona görə **əsl** `performRefresh()` çağırılır və nəticə `refreshPromise`-a yazılır. İkinci, üçüncü `401`-lər gələndə (demək olar eyni anda) `refreshPromise` artıq **doludur** (birinci sorğunun başlatdığı promise) — ona görə onlar yeni sorğu göndərmirlər, sadəcə **eyni** promise-i gözləyirlər. `.finally(() => { refreshPromise = null; })` — refresh (uğurlu da, uğursuz da) bitəndə dəyişəni sıfırlayır ki, **növbəti** dəfə token yenidən bitəndə təzə bir refresh başlaya bilsin.

```ts
httpClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableConfig | undefined;
    const isAuthEndpoint = originalRequest?.url?.startsWith('/auth/');

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);
        return httpClient(originalRequest);
      }

      await clearTokens();
      showErrorToast('Sessiyanızın müddəti bitdi, yenidən daxil olun');
      resetToWelcome();
    }

    return Promise.reject(error);
  },
);
```

Addım-addım:
1. Cavab `401` (icazəsiz) olubsa VƏ bu sorğu **artıq bir dəfə** yenidən cəhd edilməyibsə (`_retry` bayrağı — sonsuz dövrənin qarşısını alır: yenidən cəhd edilən sorğu da `401` alsa, **ikinci** dəfə refresh cəhd edilmir) VƏ bu **auth endpoint-i deyilsə**...
2. `_retry = true` qoyulur (bu **eyni** sorğu obyektinin üzərində — Axios konfiqurasiyasına əl ilə əlavə edilən xüsusi bir bayraq, `RetryableConfig` interfeysi bunu rəsmiləşdirir).
3. `refreshAccessToken()` çağırılır (yuxarıdakı de-duplikasiya ilə).
4. **Uğurlu olsa**: orijinal sorğunun `Authorization` başlığı yeni token-lə yenilənir, sorğu **yenidən göndərilir** (`httpClient(originalRequest)`) — istifadəçi heç nə hiss etmir, sorğu sadəcə bir az gecikir.
5. **Uğursuz olsa** (refresh token da ölübsə): token-lər silinir, xəta toast-ı göstərilir, `resetToWelcome()` ilə istifadəçi Welcome ekranına atılır.

**`isAuthEndpoint` yoxlaması niyə lazımdır?** Bunu düşünün: istifadəçi **səhv parol** yazıb "Daxil ol"a basır. Backend bu sorğuya (`POST /auth/login`) da **`401`** ilə cavab verə bilər (səhv giriş məlumatı üçün). Əgər yuxarıdakı bütün məntiq bu sorğuya da tətbiq olunsaydı: sistem "sessiya bitib" deyə düşünüb refresh cəhd edərdi (mənasız, çünki hələ heç bir sessiya yoxdur), refresh token da olmadığı üçün uğursuz olardı, sonra **"Sessiyanızın müddəti bitdi"** toast-ı göstərib istifadəçini **naviqasiya edərdi** — halbuki istifadəçi sadəcə **səhv parol yazıb**, LoginScreen-in öz `formError`-unda "Səhv parol" görməli idi, qəribə bir "sessiya bitmə" mesajı yox. `originalRequest.url?.startsWith('/auth/')` yoxlaması bunu **kökündən** önləyir — `/auth/*` sorğuları bu bütün refresh-retry rəqsindən **tamamilə kənar** saxlanılır, onların `401`-i sadəcə adi bir xəta kimi geri qaytarılır (`Promise.reject(error)`), `LoginScreen.tsx`-in özündəki `catch` bloku onu `getApiErrorMessage`-lə göstərir.

Bu, **2026-08-25**-də əlavə edilmiş, incə amma vacib bir düzəlişdir — özündə gözəl bir dərs daşıyır: **mərkəzi, "hər yerə tətbiq olunan" məntiq yazanda, "bu məntiqin tətbiq olunmamalı olduğu haldakı" halları da düşünmək lazımdır.**

### Cavab "zərfi" (envelope) — backend-in "sabit olmayan sabitliyi"

`CLAUDE.md`-də dəfələrlə qeyd olunan bir mövzu: backend-in cavab formatı **bütün endpoint-lərdə eyni deyil**, üstəlik vaxtla **dəyişib** (drift edib):

```ts
// order.service.ts-dən, şərhlə birlikdə
export async function listOrders(): Promise<Order[]> {
  // docs/api.md documents this as a raw array with no envelope, but the
  // backend now wraps it in `{ message, data, result }` like most other
  // list endpoints (confirmed via raw response log while debugging orders
  // not showing up despite existing on the account) — same kind of
  // contract drift already seen once on GET /basket.
  const { data } = await httpClient.get<ApiEnvelope<Order[]>>('/orders/user');
  return data.data;
}
```

Bu, real bir debug hekayəsinin izidir: sənədləşmə (`docs/api.md`) "bu endpoint-in zərfi yoxdur" deyirdi, amma **əslində** backend nə vaxtsa dəyişib zərf əlavə edib, sənəd yenilənməyib. Bu cür uyğunsuzluqlar özünü necə göstərir? — kod `response.data`-nı birbaşa `Order[]` kimi işlədəndə (halbuki əslində `{message, data: Order[], result}` idi), TypeScript-in özü bunu **tuta bilmirdi** (çünki tip bəyanatı da səhv yazılmışdı, kodun özü ilə "razılaşırdı" — bu, tip sisteminin real API cavabını **doğrulamadığını**, yalnız *sizin bildirdiyiniz* tipə uyğunluğu yoxladığını göstərən vacib bir dərsdir). Nəticə: sifarişlər siyahısı **sakitcə boş** görünürdü, heç bir xəta atmadan. Düzəliş — raw `console.log` ilə əsl cavabı yoxlamaq, tipi və unwrap məntiqini ona uyğunlaşdırmaq oldu.

**Dərs:** backend cavabı "qəribə" davransa (boş siyahı, undefined sahə), **əvvəlcə sənədə/koda yox, canlı cavaba** (raw log) inanın.

---

## Hissə 12: Servislər

Hər `*.service.ts` faylı **bir backend "sahəsinə"** (domain) uyğun gəlir — `docs/api.md`-nin bölmələri ilə paralel. Hər funksiya: (1) `httpClient` ilə sorğu göndərir, (2) cavabı **düzgün** unwrap edir (zərfli/zərfsiz, Hissə 11-ə bax), (3) **tipli** nəticə qaytarır.

- **`auth.service.ts`** — `signup`, `login`, `logout` (bax Hissə 10).
- **`profile.service.ts`** — `getProfile` (`GET /profile`), `updateProfile` (`PUT /profile`, `UpdateProfilePayload` — ad, ünvan, şəkil, istəyə görə şifrə).
- **`product.service.ts`** — `listProducts` (səhifələnmiş, axtarış parametri ilə), `getProduct` (detal, `is_favorite` daxil), `toggleFavorite`, `listFavorites`.
- **`category.service.ts`**, **`campaign.service.ts`** — sadə, tək-funksiyalı fayllar (`listCategories`, `listCampaigns`).
- **`basket.service.ts`** — `getBasket`, `addToBasket`, `removeFromBasket`, `clearBasket`. Bu funksiyalar **özləri** heç bir state saxlamır, sadəcə HTTP sorğusu göndərib nəticəni qaytarır — state idarəetməsi `basket.store.ts`-in işidir (bax Hissə 13, bu ayrılıq vacibdir).
- **`order.service.ts`** — `checkout`, `listOrders`, `getOrder`. `checkout`-un cavabı **raw `Order`** kimi işlədilir (zərfsiz) — `CLAUDE.md` bunu "hələ yenidən yoxlanmayıb" deyə qeyd edir, çünki `CheckoutScreen` bu qaytarılan dəyəri istifadə **etmir** (uğurlu olsa sadəcə naviqasiya edir), ona görə bir uyğunsuzluq olsa belə, hələ üzə çıxmayıb.
- **`upload.service.ts`** — `uploadFile`, `FormData` ilə şəkil yükləmə (Hissə 3-də `as unknown as Blob` nümunəsi buradandır).

**Ümumi naxış:** hər servis funksiyası **çox nazikdir** — heç bir biznes-məntiq, state, ya UI ilə bağlı kod yoxdur, sadəcə "bu URL-ə bu formada sorğu göndər, bu formada cavab qaytar". Bu, **ayrılmış məsuliyyət** (separation of concerns) prinsipinin əməli tətbiqidir: ekranlar "necə göstərim", store-lar "state-i necə saxlayım", servislər isə yalnız "backend-lə necə danışım" sualına cavab verir.

---

## Hissə 13: State idarəetməsi — Zustand

### Niyə "qlobal" state lazımdır?

Səbət (basket) məlumatı bir çox ekranda görünür — `AppHeader`-dəki nişan (badge), `BasketScreen`, `CheckoutScreen`, `CategoryProductsScreen`/`MyListsScreen`-dəki `BasketSummaryBar`. Əgər hər ekran öz `useState`-ini saxlasaydı, bir ekranda səbətə məhsul əlavə edəndə, **başqa** ekranın state-i heç xəbər tutmazdı — istifadəçi başqa taba keçib geri qayıdana qədər köhnə say görünərdi (ya hər ekranın öz-özünə təkrar-təkrar sorğu göndərməsi lazım gələrdi). Zustand kimi bir **qlobal store**, "bir yerdə saxla, hər kəs oxusun" imkanı verir.

### Niyə Zustand, Redux yox?

Redux — güclüdür, amma çox **boilerplate** (təkrar, "mərasim" kodu) tələb edir: action tipləri, action creator-lar, reducer-lar, `dispatch` çağırışları. Zustand isə bir `create()` funksiyası ilə həm state-i, həm onu dəyişən funksiyaları **eyni yerdə** təyin etməyə imkan verir — kiçik-orta ölçülü layihələr üçün daha az kod, daha sürətli inkişaf.

```ts
type BasketState = {
  basket: Basket | undefined;
  loading: boolean;
  error: string | undefined;
  fetchBasket: () => Promise<void>;
  addItem: (productId: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  clearBasket: () => Promise<void>;
};

export const useBasketStore = create<BasketState>((set, get) => ({
  basket: undefined,
  loading: false,
  error: undefined,
  fetchBasket: async () => {
    set({ loading: true, error: undefined });
    try {
      const basket = await getBasket();
      set({ basket });
    } catch (err) {
      set({ error: getApiErrorMessage(err) });
    } finally {
      set({ loading: false });
    }
  },
  // ...
}));
```

`create<BasketState>((set, get) => ({...}))` — burada `set` funksiyası state-i **yeniləmək**, `get` isə cari state-i **oxumaq** üçündür (React komponentindən kənarda, "indi state nədir" sualının cavabını almaq üçün). Ekranlarda bu store belə işlədilir:
```ts
const basket = useBasketStore(state => state.basket);
const addItem = useBasketStore(state => state.addItem);
```
`useBasketStore(state => state.basket)` — "yalnız `basket` sahəsini izlə" deməkdir. Bu **seçici (selector)** naxışıdır — əgər `loading` dəyişsə, amma bu komponent yalnız `basket`-i izləyirsə, komponent **lazımsız yerə yenidən render olunmur** (performans üçün vacibdir).

### `addItem`/`removeItem` — "əvvəlki miqdarı bil, sonra qərar ver" naxışı

```ts
addItem: async productId => {
  const previousQuantity = quantityForProduct(get().basket, productId);
  const basket = await addToBasket(productId);
  set({ basket });
  const title =
    basket.items?.find(item => item.product.id === productId)?.product.title
    ?? 'Məhsul';
  showSuccessToast(
    `${title} ${previousQuantity === 0 ? 'səbətə əlavə edildi' : 'sayı artırıldı'}`,
  );
},
```

Diqqət yetirin: bu **tək** funksiya iki fərqli halı ("ilk dəfə səbətə əlavə edildi" vs "artıq səbətdə olan məhsulun sayı artırıldı") **eyni backend endpoint-i ilə** idarə edir (`/basket/:id/add` — istər ilk əlavə, istər artırma, eyni sorğu). Fərqi **frontend özü** müəyyən edir: sorğu göndərilməzdən **əvvəl**, `get().basket`-dən (backend sorğusuna ehtiyac olmadan, mövcud state-dən) əvvəlki miqdarı öyrənir. Əgər `0`-dırsa (məhsul əvvəllər səbətdə deyildi) → "əlavə edildi" mesajı, əks halda → "artırıldı" mesajı.

**Niyə bu, mərkəzi store-da, hər ekranda ayrı-ayrı yazılmayıb?** Çünki səbətə məhsul əlavə etmək **bir çox** ekrandan mümkündür — `CategoryProductsScreen`, `MyListsScreen`, `ProductDetailSheet`, `BasketScreen`-in özü. Əgər bu "hansı mesajı göstərim" məntiqini **hər** ekranda təkrarlasaydıq, 4 yerdə eyni şərti yazmalı olardıq — kimsə birini unutsa, ya səhv yazsa, uyğunsuzluq yaranardı. Store-da **bir dəfə** yazılıb, çünki bütün bu ekranlar **eyni store-un eyni `addItem` funksiyasını** çağırır — toast mesajı **avtomatik**, hər yerdə eyni davranışla çıxır.

### `quantityForProduct` — niyə store-un xaricində, amma eyni fayldadır?

```ts
export function quantityForProduct(basket: Basket | undefined, productId: number) {
  return (
    basket?.items?.find(item => item.product.id === productId)?.quantity ?? 0
  );
}
```
Bu, **Zustand hook-u deyil**, sadə bir "saf funksiyadır" (pure function) — verilən `basket`/`productId`-dən "bu məhsul səbətdə neçə ədəddir" sualına cavab verir. Store-un daxilində (`addItem` içində `get().basket`-lə birlikdə) də, ekranlarda (`quantityForProduct(basket, item.id)` kimi, komponentin öz oxuduğu `basket`-lə) də işlədilir. `basket.store.ts`-dən export olunması, "bu, səbətlə bağlı bir yardımçı funksiyadır" mənasında məntiqli yer seçimidir — ayrıca fayla çıxarmaq, iki funksiyanın **birbaşa əlaqəli** olduğunu gizlədərdi.

---

## Hissə 14: Paylaşılan komponentlər

Bu hissə `src/shared/components/`-dəki hər komponentin **niyə** var olduğunu izah edir.

### `Button`

```tsx
function Button({ title, onPress, disabled, loading, variant = 'primary', style }: ButtonProps) {
  const lastPressRef = useRef(0);
  const isDisabled = disabled || loading;

  function handlePress() {
    const now = Date.now();
    if (now - lastPressRef.current < DOUBLE_PRESS_GUARD_MS) return;
    lastPressRef.current = now;
    onPress?.();
  }
  // ...
}
```
İki maraqlı detal: (1) `loading` zamanı mətn əvəzinə spinner göstərilir **və** düymə avtomatik `disabled` olur (`isDisabled = disabled || loading`) — istifadəçi sorğu davam edərkən düyməyə **təkrar** basıb ikinci sorğu göndərə bilməsin deyə. (2) `lastPressRef` ilə **"double-press guard"** — hətta `loading` state-i React-in növbəti render-i ilə **dərhal** ekrana çatmasa belə (bir neçə millisaniyəlik gecikmə ilə), `Date.now()`-a əsaslanan bu yoxlama son 600ms ərzində ikinci basışı **rədd edir**. Bu, "sifarişi tamamla" kimi düymələrdə **təkrar sifariş** riskinin qarşısını alan sadə, effektiv bir mühafizədir.

### `Input` — parol maskalama

Hissə 3-də bu faylın **niyə** native `secureTextEntry`-ni işlətmədiyi izah olunub (`CLAUDE.md`-nin gotcha-sı: Android ilk simvolu ~2 saniyə açıq göstərir). Kod məntiqi: `value` **həmişə** `•` simvolları kimi göstərilir, istifadəçinin yazdığı **əsl** mətn ayrıca (`realValue`, valideynin `onChangeText`-inə ötürülən) saxlanılır. İstifadəçi yeni hərf yazanda ya da silərkən, gələn **maskalanmış** mətnlə (`displayText`) köhnə maskanı (`oldMasked`) **prefiks/sufiks** üzrə müqayisə edərək, dəyişikliyin **harada** baş verdiyini (əlavə olunan/silinən hissəni) hesablayır — bu, kiçik bir "diff alqoritmi"dir.

Gözü ilə görmə düyməsinin (`EyeIcon`/`EyeOffIcon`) davranışı da qəsdən seçilib: **"ikon cari vəziyyəti göstərir"** (bağlı göz = maskalanıb/gizlidir, açıq göz = görünür) — əks konvensiya (ikon "bas budur" hərəkətini göstərsin) əvvəlcə sınanıb, sonra istifadəçi tələbi ilə geri qaytarılıb.

### `TextField` — `InputLabel` + `Input` + xəta mətni

```tsx
function TextField({ label, error, style, ...inputProps }: TextFieldProps) {
  return (
    <View style={styles.container}>
      <InputLabel>{label}</InputLabel>
      <Input style={[error ? styles.inputError : null, style]} {...inputProps} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}
```
"Kompozisiya" (composition) naxışının gözəl nümunəsi — `TextField` özü heç bir input məntiqi yazmır, sadəcə `InputLabel` + `Input`-u **birləşdirir**, üstünə "label + xəta mətni" konvensiyasını əlavə edir. Formlarda hər yerdə `TextField` işlədilir (`Input`-un özü birbaşa yalnız `Checkout`-un qeyd sahəsi, `Search`-un axtarış qutusu kimi "label lazım olmayan" yerlərdə görünür).

### `Checkbox`

```tsx
function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <Pressable style={styles.row} onPress={() => onChange(!checked)} hitSlop={8}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? <CheckIcon size={13} color="#FFFFFF" /> : null}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}
```
Sadə, "controlled component" naxışının dərs kitabı nümunəsi: `Checkbox`-ın özündə **heç bir** daxili state yoxdur — `checked` dəyəri **tamamilə** valideyndən gəlir, basılanda özü heç nəyi dəyişmir, sadəcə `onChange(!checked)` çağırıb "mən dəyişməliyəm" siqnalı göndərir, **qərarı valideynə buraxır**. `LoginScreen`-də "Sessiyanı aktiv saxla" (rememberMe, defolt `false`) üçün işlədilir. `hitSlop={8}` — toxunma sahəsini vizual qutudan 8px **hər tərəfə** genişləndirir, kiçik bir kvadratı barmaqla dəqiq vurmaq çətinliyini azaldır (Apple/Google-un minimum toxunma-sahəsi tövsiyələrinə uyğunlaşdırma).

### `ScreenHeader` — 6 ekranın ortaq başlığı

```tsx
function ScreenHeader({ title, onBack }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBack} hitSlop={{...}}>
        <ArrowLeftIcon size={22} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerSpacer} />
    </View>
  );
}
```
Bu komponent 2026-08-24-də çıxarılıb — əvvəllər **6 ayrı ekranda** (`AccountInfoScreen`, `MyListsScreen`, `OrderHistoryScreen`, `OrderSuccessScreen`, `BasketScreen`, `CheckoutScreen`) hərfi-hərfinə **eyni** JSX (geri düymə + başlıq + boş "spacer" — düymə ilə simmetriya üçün) təkrarlanırdı, yalnız başlıq mətni fərqli idi. `headerSpacer` — sağ tərəfdə, geri düyməsi ilə **eyni enində** boş bir sahə — bu, başlıq mətninin **tam ortada** qalmasını təmin edir (əks halda, sol tərəfdə düymə olub sağda heç nə olmasa, başlıq mərkəzdən sola meyllənərdi).

### `ErrorState` — "yenidən cəhd et" nümunəsi

```tsx
function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Button title="Yenidən cəhd et" onPress={onRetry} style={styles.retryButton} />
    </View>
  );
}
```
Bu, fetch-on-mount olan **hər** ekranda (Home, Profile, CategoryProducts, MyLists, OrderHistory, AccountInfo, Checkout, Basket) eyni şəkildə işlədilir — `onRetry` prop-una hər ekranın öz yükləmə funksiyası (`loadProfile`, `retry` və s.) ötürülür. Bundan **əvvəl**, bu ekranların əksəriyyətində şəbəkə xətası zamanı ekran sadəcə **boş** qalırdı (heç bir siqnal, "məlumat yoxdur"dan fərqlənmirdi) — `ErrorState`-in əlavə edilməsi birbaşa bu boşluğu doldurdu.

### `AuthSwitchLink` — "Hesabınız var(mı)" linki

```tsx
function AuthSwitchLink({ promptText, linkText, onPress }: AuthSwitchLinkProps) {
  return (
    <Text style={styles.text}>
      {promptText} {' '}
      <Text style={styles.link} onPress={onPress}>
        {linkText}
      </Text>
    </Text>
  );
}
```
Diqqət: React Native-də **iç-içə `<Text>`** tamamilə normaldır və hətta lazımdır — bir mətn parçasını fərqli stillə (`onPress` daxil) vurğulamağın yeganə yoludur (`<View>` daxilində edilə bilməz, çünki mətn hissələri **eyni sətirdə axmalıdır**). `WelcomeScreen`/`RegisterScreen`-də "Hesabınız varsa → Daxil olun", `LoginScreen`-də "Hesabınız yoxdursa → Qeydiyyatdan keç" — eyni komponent, fərqli `promptText`/`linkText`/`onPress` ilə.

### `ProductCard` — grid-dəki məhsul kartı

`quantity` prop-u `0`-dırsa (məhsul hələ səbətdə yoxdur), kart qiymət + "Səbətə əlavə et" düyməsi göstərir. `quantity > 0`-dırsa, **eyni sahədə** tam fərqli bir UI göstərir: `{quantity} {product.type} = {total} AZN` (məsələn "2 kg = 6.40 AZN") + `−`/`+ N {type}` stepper-i. Bu, "eyni komponent, prop-a görə tamam fərqli render" naxışıdır — ayrı bir "SəbətdəkiMəhsulKartı" komponenti yazmaq əvəzinə, tək `ProductCard` **iki halı da** öz daxilində idarə edir, çünki ikisi arasında keçid (məhsulu ilk dəfə səbətə atmaq) **eyni kartın üzərində, animasiyasız** baş verməlidir.

`total` hesablanması (`(Number(product.price) * quantity).toFixed(2)`) diqqətəlayiqdir: `product.price` backend-dən **sətir** (string) kimi gəlir (məsələn `"3.20"`), ona görə əvvəlcə `Number(...)`-a çevrilir, sonra vurulur, sonra `.toFixed(2)` ilə yenidən **iki onluq rəqəmli sətrə** qaytarılır — sadə görünsə də, backend-in "qiymət sətirdir" qərarının frontend-də hər dəfə **təkrarlanan** bir çevrilmə addımı yaratdığına diqqət çəkən yaxşı bir nümunədir.

### `BasketSummaryBar` — üzən səbət zolağı

```tsx
function BasketSummaryBar({ itemCount, total, onPress }: BasketSummaryBarProps) {
  return (
    <TouchableOpacity style={[styles.bar, {...}]} onPress={onPress}>
      <View style={styles.left}>
        <View style={styles.countBadge}><Text>{itemCount}</Text></View>
        <Text style={styles.label}>Sifarişlər</Text>
      </View>
      <Text style={styles.total}>₼ {total}</Text>
    </TouchableOpacity>
  );
}
```
`CategoryProductsScreen` və `MyListsScreen`-də, səbətdə ən azı bir məhsul olanda ekranın **altında üzən** (floating) bir zolaq — "N sifariş, cəmi ₼X" göstərir, basılanda `Basket` ekranına aparır. Komponentin özü `SUMMARY_BAR_HEIGHT`/`SUMMARY_BAR_GAP` sabitlərini `index.ts` vasitəsilə **ictimai** edir (Hissə 6-da izah olunan "layout sabitini export etmə" naxışı) — çünki onu göstərən ekranlar, siyahının altına **məhz bu hündürlük qədər** boşluq buraxmalıdır (əks halda son kart zolağın altında gizlənər — Hissə 18-in 4-cü dərsi ilə eyni kateqoriyadan bir problem).

### `ConfirmModal` — təsdiq modalı

`ProfileScreen`-də çıxış təsdiqi, `BasketScreen`-də "Səbəti təmizlə" təsdiqi üçün işlədilir — hər ikisi **eyni** komponentin fərqli `title`/`message`/`icon`/`destructive` prop-ları ilə çağrılan nüsxələridir. `destructive` prop-u `true` olanda, təsdiq düyməsi qırmızı (`variant="danger"`) olur — istifadəçiyə vizual olaraq "bu, geri dönməz bir hərəkətdir" siqnalı verir.

### `BottomSheet` — özəl, "aşağıdan-çıxan" sheet

Bu, layihənin ən mürəkkəb UI komponentidir və özündə bir "niyə bunu özümüz yazdıq" hekayəsi daşıyır (Hissə 18-də ətraflı). Qısaca: `Modal` (React Native-in öz komponenti, ayrı native "pəncərə" açır) + `Animated` (React Native-in köhnə, worklets-siz animasiya API-si) + `PanGestureHandler` (sürüşdürərək bağlamaq üçün) birləşməsidir. `translateY` adlı bir `Animated.Value` sheet-in şaquli mövqeyini idarə edir — `0` "tam açıq", `OFFSCREEN_Y` (ekran hündürlüyü) "tam gizli" deməkdir.

Sürüşdürmə məntiqi diqqətlidir:
```ts
function onHandleGestureEvent(event: PanGestureHandlerGestureEvent) {
  translateY.setValue(Math.max(0, event.nativeEvent.translationY));
}
```
`Math.max(0, ...)` — istifadəçi sheet-i aşağı çəkib **yenidən yuxarı** itələsə, `translationY` mənfi olardı, bu da sheet-i öz "dincəlmə" mövqeyindən **yuxarı** qaldırardı (görünüş cəhətdən qəribə). `Math.max(0, ...)` bunun qarşısını alaraq, sheet-in heç vaxt `0`-dan yuxarı (daha çox açıq görünən mövqeyə) çıxmamasını təmin edir. Bu dəyərin **JS callback-də** (`Animated.event` ilə deyil) hesablanması vacibdir — çünki yalnız bu yolla **hər framedə** clamp (məhdudlaşdırma) tətbiq etmək mümkündür.

### `ErrorBoundary` — tətbiq-boyu "təhlükəsizlik torları"

```tsx
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null, resetKey: 0 };

  static getDerivedStateFromError(error: Error): Pick<ErrorBoundaryState, 'error'> {
    return { error };
  }

  handleRetry = () => {
    this.setState(({ resetKey }) => ({ error: null, resetKey: resetKey + 1 }));
  };

  render() {
    if (this.state.error) {
      return ( /* xəta UI-si */ );
    }
    return <Fragment key={this.state.resetKey}>{this.props.children}</Fragment>;
  }
}
```

**Niyə class komponent, funksional deyil?** React-in "Error Boundary" mexanizmi (alt ağacda tutulmamış bir JS xətası baş verəndə, bütün tətbiqin ağarması/çökməsi əvəzinə, "nəsə səhv getdi" ekranı göstərmək) yalnız **class komponentlərdə**, `static getDerivedStateFromError` (və/ya `componentDidCatch`) metodları vasitəsilə mümkündür — bu, React-in özünün, hələ funksional komponentlərə bu imkanı verməməsinin nəticəsidir (hook-larla error boundary yazıla bilmir).

**`resetKey` naxışı — niyə sadəcə `error: null` kifayət etmir?** Əgər çökmənin səbəbi **bir dəfəlik** render qəlizliyi idisə, `error`-u təmizləmək kifayət edərdi — komponentlər yenidən render olunar, hər şey düzəlir. Amma çökmənin səbəbi **sınıq state** idisə (məsələn bir dəyişən gözlənilməz bir dəyərdə "ilişib qalıb"), sadəcə `error: null` yazmaq **eyni sınıq state-lə eyni ağacı yenidən render edər** — çökmə **dərhal təkrarlanar**. `resetKey`-i artırıb, `children`-i `<Fragment key={resetKey}>` daxilinə salmaqla, React-ə "bu, **tamam yeni** bir ağacdır, köhnəsini unmount et, təzəsini sıfırdan mount et" deyilir — bu, bütün alt komponentlərin state-ini (o cümlədən naviqasiyanın öz daxili state-ini) **sıfırlayır**, sınıq state-i özü ilə aparır.

---

## Hissə 15: Ekranlar

### Auth axını: Welcome → Register/Login

**`WelcomeScreen`** — ən sadə ekrandır: loqo, qısa təsvir, "Qeydiyyat" düyməsi, `AuthSwitchLink`. Heç bir server sorğusu yoxdur.

**`RegisterScreen`** / **`LoginScreen`** — hər ikisi eyni **naxışı** izləyir: `useState` ilə forma sahələri + xətalar + `formError` (server xətası) + `loading`, `handleSubmit`-də əvvəlcə **client-side** validasiya (`validateName`, `validatePhone`, `validatePassword`), sonra (yalnız hamısı keçərsə) server sorğusu. Uğur → `showSuccessToast` + naviqasiya; uğursuzluq → `formError`-a `getApiErrorMessage(error)` yazılır (Input-un `error` prop-u ilə eyni sahənin altında qırmızı mətn kimi görünür).

`LoginScreen`-in fərqi — `Checkbox` ilə "Sessiyanı aktiv saxla" (rememberMe) və `navigation.reset({ index: 0, routes: [{ name: 'Main' }] })` (bax aşağı — niyə `navigate` yox, `reset`).

**Niyə `navigation.reset`, `navigation.navigate` yox?** `navigate('Main')` sadəcə `Main`-i **yığının üstünə** əlavə edərdi — istifadəçi geri düyməsinə bassa, yenidən `Login`-ə **qayıda bilərdi**. `reset({ index: 0, routes: [{ name: 'Main' }] })` isə **bütün** yığını silib, `Main`-i **yeganə** ekran kimi qoyur — girişdən sonra geri düyməsi ilə login formuna qayıtmaq mümkün olmur (məntiqli də budur: artıq daxil olmusan, "geri" niyə login-ə aparsın?).

### Home axını

**`HomeScreen`** — `useHomeData()` hook-u ilə profil + kateqoriyalar + kampaniyalar məlumatını gətirir (Hissə 4-də `useEffect`/`useCallback` izahı bura aiddir). `useScrollToTop(categoryListRef)` — React Navigation-un hook-u, "artıq fokuslanmış tab-a təkrar basanda siyahını yuxarı sürüşdür" davranışını verir (native tab-bar-ların ənənəvi davranışı).

`AddressEditModal` alt-komponenti — "Çatdırılma ünvanı" kartına basılanda açılan, ünvanı redaktə edən öz-özlük (self-contained) bir modal: öz `addressInput`/`addressError`/`saving` state-i, öz `handleSave`-i var, `HomeScreen`-ə yalnız `visible`/`profile`/`onClose`/`onSaved` prop-ları ilə bağlıdır.

`CategoryCard`, `CampaignCard` — kiçik, sırf-göstərici (presentational) komponentlər, öz state-ləri yoxdur, sadəcə `product`/`campaign` obyektini alıb göstərirlər.

**`CategoryProductsScreen`** — bu, layihənin ən çox-qatlı ekranlarından biridir, ona görə 2 ayrı hook-a bölünüb:
- **`useCategoryProductsData`** — kateqoriyalar + məhsullar + səbət-yükləmə, `Promise.all` ilə paralel, `error`/`retry` ilə.
- **`useCategoryChipsScroll`** — üfüqi kateqoriya "çip"lərinin (kiçik düymələr) seçilmiş kateqoriyaya **avtomatik sürüşməsi** məntiqi. Burada iki incə "yarış vəziyyəti" (race condition) şərhlərlə izah olunub: (1) `scrollTo` çağırışı çiplərin öz layout-u ilə **eyni committə** baş versə, native ScrollView hələ "sabitləşməyib", səssizcə ləğv olunur — `requestAnimationFrame` ilə bir kadr gecikdirilir; (2) axtarılan çip hələ **ölçülməyibsə** (`onLayout` işə düşməyibsə) VƏ bütün çiplərin **ümumi eni** də hələ bilinmirsə, sürüşmə cəhdi səssizcə heç nə etmir — hər iki siqnal (`chipsContentReady` VƏ konkret çipin mövqeyi) gələnə qədər gözlənilir.

**`ProductDetailSheet`** — `BottomSheet` üzərində qurulmuş, məhsulun tam təsvirini göstərən, favorit düyməsi olan sheet. `handleToggleFavorite`-də **optimistic update** naxışı var: `setIsFavorite(nextValue)` sorğu **göndərilməzdən əvvəl** çağırılır (istifadəçi dərhal dəyişikliyi görür), sorğu uğursuz olsa, `catch` bloku dəyəri **geri qaytarır** (`setIsFavorite(!nextValue)`) — bu, "əvvəlcə göstər, arxa planda təsdiqlə, xəta olsa geri al" naxışıdır, gözləmə hissi yaratmadan daha rahat UX verir.

**`EmptyCategoryState`** — `CategoryProductsScreen`-in `FlashList`-inə `ListEmptyComponent` kimi ötürülən, tək məqsədi olan kiçik komponent: seçilmiş kateqoriyada heç bir məhsul qalmayanda (məsələn axtarış/filter nəticəsində) boş "X" ikonu + "Bu kateqoriyada məhsul yoxdur" mətni göstərir. Öz state-i, prop-u belə yoxdur — sırf FlashList-in "boş siyahı" halını `loading`/`error` hallarından vizual olaraq ayırmaq üçün var (`{error ? <ErrorState/> : loading ? <Spinner/> : <FlashList ListEmptyComponent={EmptyCategoryState} .../>}` zəncirinin son həlqəsi).

### Basket və Checkout axını

**`BasketScreen`** — `useBasketStore`-dan oxuyur, `BasketRow` alt-komponenti hər məhsul sətrini göstərir (şəkil, ad, qiymət, `+`/`−` stepper). Stepper-in maraqlı detalı: `item.quantity <= 1` olanda, `−` düyməsinin ikonu **zibil qutusuna** çevrilir (silmə niyyətini vizual olaraq bildirir).

`position: 'absolute'` **işlədilmir** footer üçün (`CLAUDE.md`-nin gotcha-sında izah olunan səbəbdən) — footer hündürlüyü `onLayout` ilə ölçülüb, siyahının `paddingBottom`-una **əl ilə** əlavə edilir ki, son element footer-in **altında gizlənməsin**.

**`CheckoutScreen`** — profil (ad/ünvan/telefon, salt-oxu göstərilir), qeyd sahəsi, ödəniş üsulu seçimi (`PAYMENT_OPTIONS` array-i üzərindən `.map()`), və `OrderItemsBox` (sifariş elementlərinin sürüşən qutusu — ayrıca komponentə çıxarılıb, çünki öz layout-hesablama məntiqi — `boxHeight`, `onLayout` — var, bu da onu CheckoutScreen-in özündən **məntiqi olaraq ayrı** edir).

**`OrderSuccessScreen`** — sifariş uğurla göndəriləndən sonra göstərilən, `REDIRECT_SECONDS = 3` ilə başlayan geri-sayım ekranı. Məntiq sadədir: `useEffect` hər saniyə `setSecondsLeft(s => s - 1)` çağırır, `secondsLeft <= 0` olanda `goToOrderHistory(navigation)` işə düşür və `Profile` tab-ının `OrderHistory` ekranına yönləndirir. Ekranda həm də bir "Əsas səhifəyə qayıt" düyməsi var — geri-sayımı gözləmədən dərhal `Home`-a qayıtmaq üçün.

**Bu ekranda tapılan və düzəldilən real bir naviqasiya bug-ı:** ilkin versiyada hər iki çıxış yolu (geri-sayım VƏ düymə) `navigation.navigate('Main', {...})` işlədirdi. Nəzəri olaraq, React Navigation-da `navigate()` **artıq yığında olan** bir ekrana çağırılanda, onun **üstündəki** hər şeyi silib həmin ekrana "geri qayıtmalıdır" (`Basket` → `Checkout` → `OrderSuccess` silinib, `Main` fokuslanmalıdır). Amma **real cihazda test edərkən** bu etibarlı işləmirdi — istifadəçi bu ekrandan uzaqlaşıb (məsələn başqa tab-lara keçib) sonra telefonun **geri düyməsini dəfələrlə** bassa, "Sifarişiniz uğurla göndərildi" ekranına **yenidən düşə bilirdi**. Bu, istifadəçi təcrübəsi baxımından səhvdir — artıq tamamlanmış bir sifarişin "uğur" ekranı, bir "pop-up" kimi **bir dəfəlik** olmalıdır, geri-naviqasiya ilə təkrar əlçatan olmamalıdır.

**Düzəliş:** hər iki çıxış nöqtəsi `navigation.navigate(...)` əvəzinə `navigation.reset({ index: 0, routes: [{ name: 'Main', params: {...} }] })` işlətməyə keçirildi:
```ts
function goToOrderHistory(
  navigation: NativeStackNavigationProp<RootStackParamList>,
) {
  navigation.reset({
    index: 0,
    routes: [
      {
        name: 'Main',
        params: { screen: 'Profile', params: { screen: 'OrderHistory' } },
      },
    ],
  });
}
```
`reset`, `navigate`-dən fərqli olaraq, "əvvəlki yığını **sil**, YENİ bir yığın **bunula əvəz et**" əməliyyatıdır — şərti/ehtimal əsaslı "pop-back" davranışına güvənmək əvəzinə, `Basket`/`Checkout`/`OrderSuccess`-in yığından **qeyd-şərtsiz** silinməsini təmin edir. Nəticədə geri düyməsinin bu ekranlara "təsadüfən" qayıtma ehtimalı sıfırlanır.

**Dərs:** React Navigation-un sənədləşməsindəki "belə etməlidir" davranışı, **hər zaman** hər cihazda/versiyada eyni etibarlılıqla işləməyə bilər — xüsusən "bir ekranı yığından **həmişə** silmək" kimi **qəti** bir tələb olanda, ehtimala əsaslanan `navigate()` əvəzinə, birmənalı `reset()` istifadə etmək daha təhlükəsizdir. Bu problem yalnız **real cihazda**, ekranlar arası dəfələrlə keçid edərək test edərkən üzə çıxdı — sadəcə "sifariş ver, uğur ekranını gör" ssenarisini bir dəfə sınamaq kifayət etməzdi.

### Search axını

**`SearchScreen`** — debounce (gecikdirilmiş axtarış) + "yarış vəziyyəti" qorunması ilə maraqlıdır:
```ts
const latestQueryRef = useRef('');
// ...
const timeout = setTimeout(() => {
  latestQueryRef.current = trimmed;
  listProducts({ search: trimmed }).then(response => {
    if (latestQueryRef.current !== trimmed) return;
    // ...
  });
}, SEARCH_DEBOUNCE_MS);
```
Debounce özü ("yazmağı dayandırdıqdan 500ms sonra axtar") **yalnız** eyni-anlı **növbədə duran** sorğuların qarşısını alır — əgər istifadəçi "al" yazıb fasilə versə (bir sorğu göndərilsin), sonra "ma" əlavə etsə (ikinci sorğu göndərilsin), **hər iki** sorğu artıq "havadadır", və **daha gec** göndərilən (dar "alma" sorğusu) daha **tez** cavab versə, sonra **daha erkən** göndərilən (geniş "al" sorğusu) **gec** cavab versə, onun nəticəsi **köhnəlmiş** halda ekranı **əvəz edərdi** — istifadəçi "alma" yazıb "al"ın nəticələrini görərdi. `latestQueryRef`, "ən son **başladılan** sorğu hansıdır" izləyir, hər cavab gələndə "bu, hələ də ən son sorğumdur?" yoxlayır — deyilsə, nəticəni **atır**.

### Profile axını

**`ProfileScreen`** — avatar (`AvatarPicker`), ad/telefon, menyu sətirləri (`MenuRow`), çıxış təsdiqi. `AvatarPicker` öz-özlük komponentdir: `react-native-image-picker`-lə şəkil seçimi, seçim zamanı `maxWidth`/`maxHeight`/`quality` ilə **çəkiliş vaxtı sıxılma** (böyük orijinal şəkli yükləməmək üçün), sonra `uploadFile` + `updateProfile`.

**`AccountInfoScreen`** — ad/ünvan/e-poçt(sabit, düzəldilə bilməz)/telefon(sabit)/şifrə/şifrə-təkrarı sahələri. `PLACEHOLDER_EMAIL` sabiti üzərindəki şərh vacibdir: backend-in `UserProfile`-ında **ümumiyyətlə e-poçt sahəsi yoxdur**, amma dizayn maketi bunu göstərir — ona görə **statik, redaktə edilə bilməyən** bir sahə kimi (yalnız vizual tamlıq üçün) göstərilir, backend-ə **heç vaxt** göndərilmir.

**`MyListsScreen`** (favoritlər) — `ProductDetailSheet`-in `onFavoriteChange` callback-i ilə maraqlı bir optimallaşdırma edir:
```ts
onFavoriteChange={(productId, isFavorite) => {
  if (!isFavorite) {
    setFavorites(current => current.filter(p => p.id !== productId));
    return;
  }
  setFavorites(current => {
    if (current.some(p => p.id === productId)) return current;
    if (!selectedProduct || selectedProduct.id !== productId) return current;
    return [selectedProduct, ...current];
  });
}}
```
Sheet-də bir məhsulu favoritlərdən çıxarsanız/geri qatsanız, ekran **bütün siyahını yenidən sorğulamaq** əvəzinə, lokal `favorites` array-ini **əl ilə** yeniləyir — daha sürətli, daha az şəbəkə yükü.

**`OrderHistoryScreen`** — `OrderCard` (status nişanı `getOrderStatusMeta`-dan rəng alır, Hissə 3-dəki `Record<OrderStatus, ...>` nümunəsi), `OrderDetailSheet` isə seçilmiş sifarişin ətraflı görünüşü (`BottomSheet` üzərində, `ProductDetailSheet` kimi).

---

## Hissə 16: Toast bildirişləri

`react-native-toast-message` — istifadəçiyə **müdaxiləedici olmayan**, öz-özünə yoxa çıxan bir bildiriş göstərmək üçün. `Alert.alert` (React Native-in native alert-i) fərqli olaraq, toast **ekranı bloklamır**, istifadəçi davam edə bilər.

```ts
// toast.ts
export function showSuccessToast(message: string) {
  Toast.show({ type: 'success', text1: message });
}

export function showErrorToast(message: string) {
  Toast.show({ type: 'error', text1: message });
}
```

**Tətbiqdə iki ayrı geri-bildirim üslubu var, qəsdən:**
- **Toast** — arxa-plan/keçici hərəkətlər üçün: giriş/çıxış uğuru, səbətə əlavə/çıxarma, favorit dəyişikliyi, ünvan yeniləməsi, avatar yükləmə xətası. Bunlar "nəticəni bildirir, amma davam etmək üçün heç bir hərəkət tələb etmir".
- **`formError` (sətir daxili mətn)** — forma göndərmə xətaları üçün: Login/Register/AccountInfo/Checkout-un öz submit düyməsinin yanında. Bunlar istifadəçinin **nəyisə düzəltməli** olduğu hallardır — mətn **ekranda qalır** (toast kimi yoxa çıxmır), çünki istifadəçi düymə basmazdan əvvəl onu **görüb oxumalıdır**.

`AppHeader` daxil edilmədən, `Toast`-un `App.tsx`-də `NavigationContainer`-dən **kənarda** yerləşdirilməsi vacibdir — beləliklə, bir toast göstəriləndə eyni zamanda ekran keçidi baş versə belə (məsələn login uğurundan sonra), toast **naviqasiyadan asılı olmadan** ekranın üzərində qalmağa davam edir.

---

## Hissə 17: Alətlər və build sistemi

### `babel.config.js` — alias-lar

```js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module-resolver', {
      root: ['.'],
      alias: {
        '@assets': './assets',
        '@shared': './src/shared',
        '@typings': './types',
      },
    }],
    'react-native-worklets/plugin',
  ],
};
```
`babel-plugin-module-resolver` — `import X from '@shared/components/Button'` yazanda, bunu **runtime-da** əsl nisbi yola (`../../shared/components/Button` kimi) çevirir. Bu, uzun, kövrək (fayl yeri dəyişəndə sınan) nisbi yollar (`../../../../hooks/useReload`) yazmaq əvəzinə **hər yerdən eyni, qısa** yol yazmağa imkan verir.

`tsconfig.json`-dakı `paths` sahəsi **eyni** alias-ları TypeScript-ə tanıdır — bu, **iki ayrı** konfiqurasiyadır (Babel — runtime/bundling üçün, TypeScript — tip-yoxlama üçün), onlar **əl ilə sinxron** saxlanılmalıdır (biri dəyişəndə o biri unudulmasın).

**Diqqət:** `@typings` — **`@types` deyil**! `CLAUDE.md`-də xəbərdarlıq var: `@types` TypeScript-in özünün DefinitelyTyped tip-paketləri (`@types/react` kimi) üçün **rezerv etdiyi** bir sözdür, bu adı öz alias-ınız üçün işlətsəniz, `TS6137` xətası ilə qarşılaşarsınız.

### `metro.config.js` — SVG transformer

`react-native-svg-transformer` Metro-ya "`.svg` fayllarını JS asset kimi yox, React komponentinə **çevirilməli** kod kimi rəftar et" deyir — beləliklə `<FruitImage width={260} height={260} />` kimi, SVG faylını sanki adi bir komponentmiş kimi import edib istifadə etmək mümkün olur (Hissə 7-dəki `svg.d.ts` bunun TypeScript tərəfidir).

### ESLint, Prettier, Jest

- **ESLint** (`@react-native/eslint-config` üzərində) — kod stilini və ümumi səhv naxışlarını (istifadə olunmayan dəyişən, inline stil xəbərdarlığı və s.) yoxlayır. `npm run lint` ilə işə düşür.
- **Prettier** — kodun formatını (boşluq, tırnaq növü) avtomatik nizamlayır.
- **Jest** — test framework-üdür. `src/shared/utils/validation.test.ts` — `validateName`/`validatePhone`/`validatePassword` funksiyalarının müxtəlif girişlərlə **düzgün** nəticə verdiyini yoxlayan **vahid testlər** (unit test). `npm test` ilə işə düşür.

### Android build-in Windows-a xas çətinlikləri

`CLAUDE.md`-nin Gotchas hissəsi bunları ətraflı sənədləşdirir, burada yalnız **niyə** vacib olduqlarını qeyd edirik:

- **`npx react-native run-android` işləmir** bu maşında — Node-un yeni versiyaları (CVE-2024-27980 təhlükəsizlik düzəlişindən sonra) `.bat` fayllarının birbaşa işə salınmasını məhdudlaşdırır, bu da RN CLI-nin `gradlew.bat`-ı çağırma üsulunu sındırır. Əvəzinə **birbaşa** `cd android && ./gradlew.bat app:installDebug` işlədilir.
- **`scripts/build-apk.js`** (`npm run apk`) — release APK yaradır və `android/app/build/outputs/...` dərinliyindən çıxarıb, tapılması asan olan kök-səviyyəli `/apk/tiktak-<tarix>.apk`-a köçürür:
  ```js
  execSync(`"${gradlewPath}" assembleRelease`, { cwd: androidDir, stdio: 'inherit', shell: true });
  // ...
  fs.copyFileSync(apkSource, destPath);
  ```
  `gradlewPath`-ın **tam, resolve olunmuş** yol (nisbi ad yox) kimi verilməsi vacibdir — Node 24 + `shell: true` kombinasiyasında, `cmd.exe`-nin `gradlew.bat`-ı öz-özünə axtarması (implicit cwd-search) işləmirdi, `cwd` düzgün təyin edilsə belə.

---

## Hissə 18: Öyrənilmiş dərslər

Bu hissə `CLAUDE.md`-nin "Gotchas" bölməsindəki, **ən öyrədici** qərarları seçib beynəlxalq bir təqdimatda da izah edilə biləcək formada təqdim edir — bunlar "nə üçün belə yazılıb" sualının ən dəyərli cavablarıdır.

### 1. `@gorhom/bottom-sheet` niyə işlədilmir?

Layihə əvvəlcə populyar `@gorhom/bottom-sheet` kitabxanasını sınayıb — amma sheet-in `.present()` metodu **heç bir JS xətası vermədən** çağırılırdı, amma sheet **heç vaxt görünmürdü**. Səbəb: `react-native-reanimated`-in 4-cü versiyası (yeni "worklets" arxitekturası ilə) çox yenidir, `@gorhom/bottom-sheet` hələ tam uyğunlaşmayıb. Reanimated-i **3**-ə endirmək də alınmadı — v3-ün Android Java körpü kodu, bu layihənin RN 0.83-ünün New Architecture API-ları ilə **compile olunmurdu**.

**Nəticə:** kitabxananı tərk edib, `react-native-gesture-handler`-i (reanimated-dən **asılı olmayan**, müstəqil işləyən) saxlayaraq, **özümüz** bir `BottomSheet` yazdıq (Hissə 14-də izah olunub, core `Animated` + `PanGestureHandler` ilə).

**Dərs:** yeni, sürətlə dəyişən bir ekosistemdə (React Native-in New Architecture keçidi kimi), üçüncü tərəf kitabxanaların **son** versiyalarla uyğunluğu **fərz edilməməlidir** — kiçik, öz nəzarətinizdə olan bir həll bəzən daha sabit ola bilər.

### 2. Parol maskalaması niyə əl ilədir?

Android-in native `secureTextEntry` xüsusiyyəti ilk yazılan simvolu **~2 saniyə** açıq göstərir (OS-səviyyəli bir "peek" animasiyasıdır, JS-lə əlaqəsi yoxdur). Bu, `autoCorrect`/`autoComplete`/`importantForAutofill` kimi bütün props-ları söndürməklə belə **düzəlmirdi**. Həll — Hissə 14-də izah olunan, tamamilə əl ilə maskalama.

**Dərs:** platform-səviyyəli davranışlar bəzən JS tərəfindən **konfiqurasiya edilə bilmir** — belə hallarda, native davranışı **tamamilə** bypass edən öz həllinizi yazmaq lazım gələ bilər.

### 3. MMKV niyə AsyncStorage əvəzinə?

`AsyncStorage`-in hər oxuma/yazması asinxrondur — bu, `RootNavigator`-un "token varmı, yoxmu" sualına **dərhal** cavab verə bilməməsi demək idi, "yüklənir..." ekranı tələb edirdi. MMKV-nin **sinxron** API-si bu ara-ekranı tamamilə aradan qaldırdı (Hissə 10-da ətraflı).

### 4. `position: 'absolute'` footer-lərin gizli təhlükəsi

Görünüşcə məntiqli bir naxış — "footer-i ekranın dibinə sabitləmək üçün `position: 'absolute'` işlət, üstündəki siyahıya `marginBottom` ver ki, son element örtülməsin" — **işləmir**. Səbəb: `marginBottom` yalnız **adi axından** (normal flow) olan qonşu elementlərə təsir edir; `position: 'absolute'` olan bir element axından **tamamilə çıxarılır**, `marginBottom`-u sadəcə **görməzdən gəlir**. Nəticə: son element vizual olaraq footer-in **altında** qalır — bu, əvvəlcə "ScrollView-ın künc-yumşaltması (borderRadius) işləmir" bir render-bug-u kimi görünürdü (yalnız üst künclər yumru, alt künclər kəskin), amma əsl problem clip-ləmə deyil, footer-in üstündən **basması** idi.

**Həll:** footer-i **adi axında** saxlamaq (heç bir `position: 'absolute'`), onun **həqiqi hündürlüyünü** `onLayout` ilə ölçüb, siyahının `paddingBottom`-una **əl ilə** əlavə etmək (`BasketScreen`/`CheckoutScreen`-də görüldüyü kimi).

**Dərs:** vizual bir "render bug"a bənzəyən şey, əslində fərqli bir kök-səbəbdən (layout modelinin özündən) qaynaqlana bilər — simptomu deyil, **kök səbəbi** axtarmaq lazımdır.

### 5. Sessiya bitmə axını — mərkəzi məntiqin "istisna hallarını" düşünmək

Hissə 11-də ətraflı izah olunub: `httpClient.ts`-in 401-refresh məntiqi **bütün** sorğulara tətbiq olunsaydı, səhv-parol login cəhdi **yanlışlıqla** "sessiya bitdi" kimi işlənərdi. `/auth/*` endpoint-lərinin bu axından **açıq şəkildə** çıxarılması, mərkəzi/qlobal məntiq yazarkən **"bu, harada tətbiq OLUNMAMALIDIR"** sualının, "harada tətbiq olunmalıdır" sualı qədər vacib olduğunu göstərir.

### 6. Backend cavabının "sabit olmayan sabitliyi"

Hissə 11-in sonunda izah olunan `GET /basket`/`GET /orders/user` "zərf drift"i — sənədləşmənin (`docs/api.md`) həmişə **canlı** backend davranışını əks etdirmədiyini göstərir. `CLAUDE.md`-nin özü bunu açıq deyir: *"əgər digər 'zərfsiz' endpoint-lər qəribə davranmağa başlasa, bu sənədə güvənmək əvəzinə raw `console.log` ilə yenidən yoxlayın"*.

**Dərs:** API inteqrasiyasında **sənəd ≠ reallıq** ola bilər, xüsusən API vaxtla dəyişən komandalar tərəfindən idarə olunursa. Şübhəli davranış görəndə, **birbaşa** şəbəkə cavabına baxmaq, fərziyyəyə güvənməkdən **həmişə** daha etibarlıdır.

### 7. `navigate()` "geri qayıtmalıdır", amma zəmanət vermir

Hissə 15-in "Basket və Checkout axını" bölməsində ətraflı izah olunub: `OrderSuccessScreen`-dən çıxarkən əvvəlcə `navigation.navigate('Main', {...})` işlədilirdi — nəzəri olaraq bu, artıq yığında olan `Main`-ə "geri qayıtmalı", üstündəki `Basket`/`Checkout`/`OrderSuccess`-i silməli idi. Real cihazda test edərkən bu **etibarlı** işləmirdi: istifadəçi başqa yerlərə keçib geri düyməsini dəfələrlə bassa, "Sifarişiniz uğurla göndərildi" ekranına **yenidən düşə** bilirdi. Həll — `navigate()` əvəzinə `navigation.reset({ index: 0, routes: [{ name: 'Main', params: {...} }] })`: bu, ehtimala əsaslanan "pop-back" davranışına güvənmək əvəzinə, köhnə yığının **qeyd-şərtsiz silinməsini** təmin edir.

**Dərs:** naviqasiya kitabxanasının "nəzəri olaraq bunu etməlidir" davranışı ilə "bunu **zəmanətlə** etməlidir" tələbi arasında fərq var — bir ekranın geri-naviqasiya ilə **heç vaxt** əlçatan olmaması kimi qəti tələblər üçün, ehtimala əsaslanan `navigate()` yox, birmənalı `reset()` seçilməlidir. Bu cür bug-lar tək bir "sınaq ssenarisi" ilə (sifariş ver → uğur ekranını gör) üzə çıxmır — yalnız ekranlar arası **dəfələrlə, müxtəlif ardıcıllıqla** keçid edərək test edəndə aşkarlanır.

---

## Hissə 19: Lüğət

| Termin | Sadə izah |
|---|---|
| **API** | Application Programming Interface — proqramların bir-biri ilə "danışmaq" üçün istifadə etdiyi qaydalar toplusu. Burada: mobil tətbiqin backend server-i ilə danışdığı HTTP sorğu/cavab formatı. |
| **Async/await** | Gözləmə tələb edən (məsələn şəbəkə) əməliyyatları, kodu bloklamadan, sadə "addım-addım" oxunan formada yazmaq üsulu. |
| **Axios** | JavaScript üçün populyar HTTP sorğu kitabxanası, interceptor dəstəyi ilə tanınır. |
| **Component (komponent)** | React-də UI-ın kiçik, təkrar-istifadə oluna bilən tikinti daşı — props alıb JSX qaytaran funksiya (və ya sinif). |
| **Context (React Context)** | Bir dəyəri komponent ağacının başından, prop-ları hər səviyyədə əl-ələ ötürmədən, dərinliklərə "yaymaq" mexanizmi (Provider-lər bunu işlədir). |
| **Debounce** | Ard-arda tez-tez baş verən hadisələri (məsələn, hər hərf yazılışını), son hadisədən **müəyyən müddət sonra** yalnız **bir dəfə** işə salmaq texnikası. |
| **Destructuring** | Bir obyekt/array-in sahələrini ayrı-ayrı dəyişənlərə "açmaq" sintaksisi: `const { a, b } = obj;`. |
| **Generic (`<T>`)** | Bir funksiya/tipin, hansı **konkret** tiplə işləyəcəyini sonradan (istifadə zamanı) müəyyən etməyə imkan verən "tip parametri". |
| **Hook** | React-də funksional komponentlərə state, yan-təsir (effect) və s. imkanları verən xüsusi funksiyalar (`useState`, `useEffect`, `useCallback` kimi, adları `use`-la başlayır). |
| **HTTP interceptor** | Bir HTTP kitabxanasının, hər sorğu/cavabı **mərkəzi** bir yerdə, avtomatik olaraq "tutub" üzərində iş görmə imkanı (məsələn hər sorğuya token əlavə etmək). |
| **Interface** | TypeScript-də bir obyektin "formasını" (hansı sahələri, hansı tiplərlə olmalıdır) təsvir edən bəyanat. |
| **JSX** | JavaScript daxilində HTML-ə bənzəyən sintaksislə UI təsviri yazmağa imkan verən genişlənmə (Babel tərəfindən adi JS-ə çevrilir). |
| **JSI (JavaScript Interface)** | React Native-in New Architecture-ında, JS və native kod arasında **birbaşa, sinxron** əlaqə quran mexanizm (köhnə "Bridge"-i əvəz edir). |
| **Metro** | React Native-in öz JS bundler-i (kodu telefon üçün icra oluna bilən formaya yığan alət) — veb-dəki Webpack/Vite-ə bənzəyir. |
| **MMKV** | Telefon diskində açar-dəyər formatında, çox sürətli və **sinxron** məlumat saxlamaq üçün native kitabxana. |
| **Native modul** | JS ilə yanaşı, platformanın öz dilində (Kotlin/Swift) yazılmış, telefonun aparat/OS imkanlarına (kamera, yaddaş və s.) çıxış verən kitabxana hissəsi. |
| **Optimistic update** | Server cavabını **gözləmədən**, dəyişikliyi dərhal ekranda göstərmək, sonra arxa planda təsdiqləmək (xəta olsa geri almaq) UX texnikası. |
| **Prop (property)** | Bir React komponentinə **kənardan** ötürülən, komponentin özü tərəfindən dəyişdirilə bilməyən məlumat. |
| **Provider** | Bir Context-in dəyərini komponent ağacının bir hissəsinə "yayan" komponent (məsələn `SafeAreaProvider`). |
| **Race condition (yarış vəziyyəti)** | Bir neçə asinxron əməliyyatın **nəticələrinin sırası** gözlənilməz olması nəticəsində yaranan səhv (məsələn, gec başlayan, amma tez bitən sorğunun köhnə nəticəni "üstələməsi"). |
| **Selector (Zustand-da)** | Bir store-dan **yalnız lazım olan** hissəni "seçib" oxumaq funksiyası, lazımsız yenidən-render-lərin qarşısını alır. |
| **State** | Bir komponentin öz daxili, dəyişə bilən (və dəyişəndə komponentin yenidən render olunmasına səbəb olan) yaddaşı. |
| **Store (Zustand-da)** | Tətbiqin bir hissəsinin qlobal, bir çox komponent arasında paylaşılan state-ini saxlayan mərkəzi obyekt. |
| **Type guard** | Bir `if` şərti vasitəsilə, TypeScript-ə "bu blokun içində, bu dəyərin tipi daha dardır" bildirən naxış. |
| **Type predicate** | Bir funksiyanın qaytarma tipini `param is SomeType` formasında yazaraq, onu type guard kimi işlətməyə imkan verən sintaksis. |
| **Union tip (`\|`)** | Bir dəyərin **bir neçə mümkün tipdən biri** ola biləcəyini bildirən TypeScript konstruksiyası (`'CASH' \| 'CARD'` kimi). |
| **Unwrap (zərfi açmaq)** | Backend-in `{message, data, result}` kimi "zərflədiyi" cavabdan, **əsl** lazım olan məlumatı (`data`) çıxarmaq əməliyyatı. |
