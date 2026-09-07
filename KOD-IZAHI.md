# Tiktak — Layihənin Tam Kod İzahı

Bu sənəd Tiktak mobil tətbiqinin **hər qatını** sıfırdan izah edir. Heç bir proqramlaşdırma təcrübəniz olmadığını fərz edirik: hər anlayış ilk dəfə işlədiləndə izah olunur, hər kod nümunəsi sətir-sətir açılır.

Məqsəd sadədir: bu sənədi oxuyan adam kodun **nə etdiyini** deyil, **niyə məhz belə yazıldığını** da anlasın. Çünki "nə edir" sualının cavabını kodun özündən də tapmaq olar — "niyə belədir" isə kodda yazılmır, adamın başında qalır. Bu sənəd məhz onu yazıya köçürür.

Tiktak — meyvə-tərəvəz sifariş tətbiqidir. İstifadəçi qeydiyyatdan keçir, kateqoriyalara baxır, məhsul axtarır, səbətə atır, sifariş verir, sifarişlərinin tarixçəsinə baxır.

---

## Bu sənədi necə oxumalı?

Sənəd bir kurs kimi qurulub — aşağıdan yuxarıya, sadədən mürəkkəbə:

| Əgər siz... | Buradan başlayın |
|---|---|
| Heç vaxt kod yazmamısınızsa | Hissə 1 (əvvəldən sona) |
| JavaScript bilirsinizsə | Hissə 3 (TypeScript) |
| JS + TS bilirsinizsə | Hissə 4 (React əsasları) |
| React bilirsinizsə, sadəcə bu layihəni tanımaq istəyirsinizsə | Hissə 5 (Qovluq strukturu) |
| Konkret bir faylı axtarırsınızsa | Hissə 5-dəki qovluq xəritəsi |
| Bir termini unutmusunuzsa | Hissə 24 (Lüğət) |

İki bacı sənəd də var:

- **`CLAUDE.md`** — qısa, sıx, "nə etməli / nə etməməli" siyahısı. Kod yazarkən baxılır.
- **`PAKET-IZAHI.md`** — `package.json`-dakı hər paketin **niyə seçildiyi** (və niyə alternativinin seçilmədiyi).
- **`KOD-IZAHI.md`** (bu sənəd) — kodun özünün necə qurulduğu.

---

## Məzmun (Table of Contents)

1. [Giriş — Tiktak nədir, texnologiyalar niyə seçilib](#hissə-1-giriş)
2. [JavaScript əsasları](#hissə-2-javascript-əsasları)
3. [TypeScript ətraflı bələdçi](#hissə-3-typescript-ətraflı-bələdçi)
4. [React və React Native əsasları](#hissə-4-react-və-react-native-əsasları)
5. [Qovluq strukturu](#hissə-5-qovluq-strukturu)
6. [Fayl təşkili konvensiyaları](#hissə-6-fayl-təşkili-konvensiyaları)
7. [Tiplər sistemi](#hissə-7-tiplər-sistemi)
8. [Giriş nöqtələri: index.js → App.tsx → src/app/](#hissə-8-giriş-nöqtələri)
9. [Naviqasiya](#hissə-9-naviqasiya)
10. [Autentifikasiya və token idarəetməsi](#hissə-10-autentifikasiya)
11. [API qatı — httpClient və interceptor-lar](#hissə-11-api-qatı)
12. [Servislər (services)](#hissə-12-servislər)
13. [State idarəetməsi — Zustand və səbət](#hissə-13-state-idarəetməsi)
14. [Paylaşılan komponentlər (shared/components)](#hissə-14-paylaşılan-komponentlər)
15. [Ekranlar (screens)](#hissə-15-ekranlar)
16. [Toast bildirişləri sistemi](#hissə-16-toast-bildirişləri)
17. [Alətlər və build sistemi](#hissə-17-alətlər-və-build-sistemi)
18. [Server state idarəetməsi — TanStack Query](#hissə-18-server-state-idarəetməsi)
19. [Tema — Dark Mode](#hissə-19-tema-dark-mode)
20. [Beynəlxalqlaşdırma (i18n)](#hissə-20-beynəlxalqlaşdırma-i18n)
21. [Yerli bildirişlər (Notifee)](#hissə-21-yerli-bildirişlər)
22. [Xəritədən ünvan seçimi (MapLibre)](#hissə-22-xəritədən-ünvan-seçimi)
23. [Platform-spesifik məsələlər və öyrənilmiş dərslər](#hissə-23-öyrənilmiş-dərslər)
24. [Lüğət](#hissə-24-lüğət)

> **Sətir nömrələri haqqında bir qeyd.** Bu sənəddə qəsdən "filan faylın 47-ci sətri" kimi istinadlar **yoxdur**. Səbəb: kod dəyişəndə sətir nömrələri sürüşür, sənəd isə dəyişmir — nəticədə bir müddət sonra hər istinad yalan olur. Onun əvəzinə **fayl adı + funksiya adı** ilə istinad edirik (`useLoginForm.ts`-in `handleSubmit` funksiyası) — funksiya adları sətir nömrələrindən qat-qat uzun ömürlüdür.

---

## Hissə 1: Giriş

### Tiktak nədir?

Tiktak — Azərbaycan dilində işləyən meyvə-tərəvəz sifariş tətbiqidir. İstifadəçinin gördüyü yol belədir:

```
Welcome ekranı → Qeydiyyat / Giriş → Əsas səhifə (kateqoriyalar)
   → Kateqoriya seç → Məhsullara bax → Səbətə əlavə et
   → Səbət ekranı → Sifarişi tamamla (Checkout) → Uğur ekranı
```

Bunlardan başqa: axtarış, kampaniyalar, favoritlər ("Siyahılarım"), profil məlumatları, sifariş tarixçəsi, tənzimləmələr (qaranlıq rejim + dil), dəstək ekranı.

### Niyə React Native?

Ənənəvi mobil development belə idi: Android üçün Kotlin dilində **bir layihə**, iOS üçün Swift dilində **ayrı bir layihə**. Yəni eyni "səbətə əlavə et" düyməsini iki dəfə, iki fərqli dildə yazmalı olursunuz. Bir səhv tapılanda iki yerdə düzəldirsiniz.

React Native bunu dəyişir: siz **bir dəfə** JavaScript/TypeScript ilə yazırsınız, o isə hər iki platformada **əsl native komponentlərə** çevrilir.

Burada vacib bir incəlik var: bu, "veb səhifəni tətbiqin içinə yerləşdirmək" **deyil**. Kodda yazdığınız `<View>` Android-də əsl `android.view.View`, iOS-da əsl `UIView` olur — yəni istifadəçinin barmağı altında əsl native düymə var, brauzer təqlidi yox.

### "New Architecture" nədir?

`CLAUDE.md`-də "React Native 0.83.10 (New Architecture)" yazılıb. Bu nə deməkdir?

**Köhnə üsul (Bridge):** JS kodu ilə native kod bir-biri ilə "məktublaşırdı". JS deyirdi: "bu düymənin rəngini qırmızı et". Bu mesaj mətn formatına çevrilirdi (serialize), körpüdən keçirdi, o biri tərəfdə yenidən açılırdı. Hər əmr üçün bu gedər-gələr. Nəticə: animasiyalarda gözlə görünən kəkələmə.

**Yeni üsul (Fabric + TurboModules + JSI):** körpü aradan qalxıb. JS birbaşa native obyektə toxunur — sanki eyni otaqdadırlar, məktublaşmırlar. Nəticə: daha sürətli render, xüsusən animasiya və gesture-lərdə hiss olunan fərq.

Praktikada bu bizə nə verir? İki şey:
1. Tətbiq daha hamar işləyir.
2. **Amma** hər kitabxana bu yeni arxitekturaya uyğunlaşmayıb. Layihə boyu bir neçə dəfə "kitabxana quraşdırıldı, amma işləmədi" hadisəsi məhz bundan qaynaqlandı (bax Hissə 23).

### Əsas texnologiya seçimləri (və niyə)

| Texnologiya | Nə işə yarayır | Niyə məhz bu seçilib |
|---|---|---|
| **TypeScript** | JavaScript + tip yoxlaması | `product.titel` kimi yazı səhvini kod işə düşməzdən **əvvəl** tutur |
| **React Navigation** | Ekranlar arası keçid | Ən geniş istifadə olunan; `native-stack` variantı native performans verir |
| **Zustand** | Qlobal state (səbət) | Redux-dan qat-qat sadə — demək olar heç bir təkrar kod yoxdur |
| **TanStack Query** | Server-dən gələn məlumat + keş | "Yüklənir / xəta / keş / yenidən sorğula" məntiqini hər ekranda təkrar yazmaqdan xilas edir |
| **Axios** | Şəbəkə sorğuları | `fetch`-dən fərqli olaraq **interceptor** var — avtomatik token yeniləməsi bununla mümkün olur |
| **react-native-mmkv** | Telefon yaddaşı (token-lər, tənzimləmələr) | `AsyncStorage`-dan sürətli, üstəlik **sinxron** oxuyur |
| **Əl ilə yazılmış validasiya** | Form yoxlaması | Layihə kiçikdir; `validateName`/`validatePhone` kimi sadə funksiyalar kifayət edir, ayrıca kitabxana artıqlıq olardı |

Qalan kitabxanaların hər biri konkret bir problemi həll etdiyi üçün var. Onların hamısının **niyəsi** ayrıca sənəddədir: `PAKET-IZAHI.md`.

---

## Hissə 2: JavaScript əsasları

Bu hissə kod boyu tez-tez rast gələcəyiniz JavaScript sintaksisini izah edir. Bunları bilirsinizsə, birbaşa Hissə 3-ə keçin.

### `import` / `export` — fayllar bir-biri ilə necə danışır

Hər fayl öz dünyasıdır. Bir faylda yazdığınız funksiya, başqa fayl üçün **görünməzdir** — nə qədər ki, siz onu açıq şəkildə "bayıra vermirsiniz".

Bunu belə təsəvvür edin: hər fayl bir mağazadır. `export` — "bu məhsulu vitrinə qoyuram, satılıqdır". `import` — "qonşu mağazadan o məhsulu alıram".

```ts
// src/shared/utils/validation.ts — BU faylda vitrinə qoyulur
export function validateName(value: string): string | undefined {
  if (!value.trim()) return i18n.t('validation.nameRequired');
  return undefined;
}
```

```ts
// useRegisterForm.ts — BAŞQA fayldan alınır
import { validateName } from '@shared/utils/validation';
```

İki növ export var:

**1. Named export** (adlı export) — bir fayldan **neçə istəsəniz** o qədər şey verə bilərsiniz. Alarkən adı **hərfi-hərfinə** düz yazmalısınız və `{ }` mötərizəsinə salmalısınız:

```ts
export function validateName(...) { }
export function validatePhone(...) { }
export function validatePassword(...) { }

// alarkən:
import { validateName, validatePhone } from '@shared/utils/validation';
```

**2. Default export** — bir fayldan **yalnız bir dənə** ola bilər. Alarkən `{ }` lazım deyil, adını da istədiyiniz kimi qoya bilərsiniz:

```ts
export default Button;

// alarkən:
import Button from '@shared/components/Button';
```

Layihədə hər komponent faylı `export default ComponentName;` ilə bitir. Bu, "bu faylın **əsas məhsulu** budur" deməkdir — qalan hər şey köməkçidir.

### Arrow function (ox funksiyası)

Funksiya yazmağın iki forması:

```ts
// Klassik forma
function add(a: number, b: number) {
  return a + b;
}

// Eyni şey, arrow function ilə
const add = (a: number, b: number) => a + b;
```

Arrow function-da `{ }` və `return` yazmasanız, ox işarəsindən sonrakı ifadə **avtomatik qaytarılır**. Yəni yuxarıdakı iki forma tam eynidir.

Layihədə arrow function-u ən çox düymələrdə görəcəksiniz:

```tsx
onPress={() => navigation.navigate('Register')}
```

Buradakı `() =>` hissəsi çox vacibdir. Onsuz yazsanız:

```tsx
onPress={navigation.navigate('Register')}   // ❌ SƏHV
```

...bu, "düyməyə basılanda naviqasiya et" demir — "**elə indi**, render anında naviqasiya et, nəticəsini isə `onPress`-ə ver" deməkdir. Yəni düyməyə heç kim toxunmamış, ekran dəyişər.

`() =>` yazanda isə funksiyanı **yaradırıq, amma çağırmırıq**. React onu saxlayır və yalnız barmaq toxunanda çağırır. Bunu belə düşünün: `navigation.navigate('Register')` — "get". `() => navigation.navigate('Register')` — "getmək üçün təlimat kağızı". Düyməyə kağızı veririk, o da lazım olanda oxuyur.

### Destructuring (obyekti "açmaq")

Obyektin içindən sahələri çıxarmağın qısa yolu:

```ts
const profile = { full_name: 'Əli', phone: '+994501234567' };

// Uzun yol
const name = profile.full_name;
const phone = profile.phone;

// Destructuring — eyni şey, bir sətirdə
const { full_name, phone } = profile;
```

React-də props almaq üçün **hər yerdə** işlədilir. `ProductGrid.tsx`-ə baxın:

```tsx
function ProductGrid({
  products,
  basket,
  quantityFor,
  onProductPress,
  onAdd,
  onDecrement,
  refreshing,
  onRefresh,
}: ProductGridProps) {
```

Bu, "mənə verilən props obyektinin içindən bu sahələri çıxar və hər birini ayrıca dəyişən kimi işlət" deməkdir. Alternativi belə olardı:

```tsx
function ProductGrid(props: ProductGridProps) {
  // sonra hər yerdə props.products, props.basket, props.onAdd...
}
```

...yəni hər istifadədə `props.` yazmaq. Destructuring bunu bir dəfə edir.

Default dəyər də vermək olar:

```tsx
function Skeleton({ width = '100%', height, borderRadius = 6, style }: SkeletonProps) {
```

`width = '100%'` — "əgər çağıran adam `width` verməyibsə, `'100%'` işlət".

Array-lərdə də işləyir:

```ts
const [name, setName] = useState('');
```

`useState` bir array qaytarır: `[cari_dəyər, dəyişdirən_funksiya]`. Destructuring onu iki ayrı dəyişənə paylayır. Adları özünüz seçirsiniz — `[a, b]` da yaza bilərdiniz, sadəcə oxunaqlı olmazdı.

### Spread operator (`...`) — "hamısını bura tök"

Üç nöqtə "bu obyektin/array-in bütün içini bura köçür" deməkdir.

```ts
const previousBasket = { items: [...], total: '12.40', count: 3 };

// köhnəsinin hamısını götür, yalnız items-i dəyiş:
const emptied = { ...previousBasket, items: [], total: '0.00', count: 0 };
```

Bu naxış `basket.store.ts`-in `clearBasket` funksiyasında məhz belə işlədilir.

**Şərti spread** daha maraqlıdır — `useAccountInfoForm.ts`-də istifadə olunur:

```ts
const updated = await updateProfile({
  full_name: name.trim(),
  address: address.trim(),
  ...(changingPassword
    ? { password, password_repeat: passwordRepeat }
    : {}),
});
```

Bunu belə oxuyun: "əgər `changingPassword` doğrudursa, `{password, password_repeat}` sahələrini bura tök; əks halda **boş obyekt** tök (yəni heç nə əlavə etmə)".

Nəticə: istifadəçi şifrəsini dəyişmirsə, serverə gedən sorğuda `password` sahəsi **ümumiyyətlə olmur**. `password: undefined` göndərmək ilə sahəni **heç göndərməmək** arasında fərq var — bəzi backend-lər birincini "şifrəni boş et" kimi başa düşə bilər.

**Rest parametri** — spread-in tərsi. `Input.tsx`-də:

```tsx
function Input({ value, onChangeText, ...inputProps }: InputProps) {
  // ...
  return <TextInput {...inputProps} value={masked} />;
}
```

Buradakı `...inputProps` "sadaladıqlarımdan **qalan** bütün props-ları bir obyektə yığ" deməkdir. Sonra `{...inputProps}` ilə onları olduğu kimi `TextInput`-a ötürürük. Yəni: "mən `value` və `onChangeText`-i özüm idarə edirəm, qalan nə varsa (placeholder, keyboardType, autoFocus...) birbaşa aşağı ötür".

### Template literal (backtick sətirlər)

Adi sətir `'...'` və ya `"..."` ilə yazılır. Backtick (`` ` ``) ilə yazılan sətrin isə üstünlüyü var: içinə `${...}` yazıb dəyişən yerləşdirə bilərsiniz.

```ts
const url = `${BASE_URL}/api/tiktak`;
```

Alternativ (çirkin) yol:

```ts
const url = BASE_URL + '/api/tiktak';
```

Bir-iki dəyişəndə fərq görünmür, amma dörd-beş dəyişən olanda `+` işarələri arasında itirsiniz.

### Ternar operator (`? :`) — bir sətirlik "əgər"

```ts
const initialRouteName = getAccessToken() ? 'Main' : 'Welcome';
```

Oxunuşu: "`getAccessToken()` nəsə qaytarırsa → `'Main'`, əks halda → `'Welcome'`".

Bu, `RootNavigator.tsx`-dəki əsl koddur: tokeni varsa istifadəçini birbaşa əsas ekrana, yoxdursa qarşılama ekranına aparır.

**Niyə JSX-də `if` əvəzinə ternar?** Çünki JSX-in içində (`{ }` mötərizələri arasında) yalnız **ifadə** yazmaq olar, **blok** yox. `if` bir blokdur, dəyər qaytarmır. Ternar isə ifadədir, dəyər qaytarır:

```tsx
{loading ? (
  <ActivityIndicator color={colors.primary} />
) : (
  <ProductGrid products={products} ... />
)}
```

Bəzən **zəncirlənmiş** ternar da görünür — `CheckoutScreen.tsx`-də:

```tsx
{profileError ? (
  <ErrorState message={profileError} onRetry={loadProfile} />
) : loadingProfile ? (
  <ActivityIndicator color={colors.primary} style={styles.loader} />
) : (
  <>
    <CheckoutForm ... />
    <OrderItemsBox items={items} />
    <CheckoutFooter ... />
  </>
)}
```

Oxunuşu, yuxarıdan aşağı, ilk uyğun gələn qazanır:
1. Xəta varmı? → xəta ekranı göstər.
2. (Xəta yoxdur.) Yüklənirmi? → spinner göstər.
3. (Nə xəta var, nə yüklənir.) → əsl məzmunu göstər.

Bu sıralama təsadüfi deyil: **xəta yoxlaması həmişə birinci gəlir**. Əks halda xəta baş verəndə ekranda sonsuz spinner fırlanardı.

### `&&` ilə şərti göstərmə

```tsx
{basketCount > 0 && (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>{basketCount}</Text>
  </View>
)}
```

JavaScript-də `&&` belə işləyir: solundakı yalandırsa — dayan, solundakını qaytar; solundakı doğrudursa — sağındakını qaytar. React isə `false`, `null`, `undefined` dəyərlərini ekrana **heç nə çəkmədən** keçir.

Nəticə: "səbətdə məhsul varsa nişanı göstər, yoxdursa heç nə göstərmə". Bu, `AppHeader.tsx`-dəki əsl koddur.

> **⚠️ Klassik tələ — sıfır rəqəmi.** Əgər `{basketCount && <View>...}` yazsaydıq və `basketCount` **0** olsaydı, ifadə `0` qaytarardı. React isə `false`-u gizlədir, amma `0`-ı **əsl rəqəm** sayır və ekrana çıxarır! Nəticədə istifadəçi ekranın küncündə səbəbsiz bir "0" görər.
>
> Ona görə layihədə həmişə **açıq müqayisə** yazılır: `basketCount > 0 &&`. Beləliklə ifadə ya `false` (gizlənir), ya da JSX qaytarır — heç vaxt `0` qaytarmır.

### Optional chaining (`?.`) və nullish coalescing (`??`)

Bu ikisi "məlumat yoxdursa nə edək?" sualının cavabıdır. `AppHeader.tsx`-dən əsl nümunə:

```ts
const basketCount =
  basket?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
```

Sətir-sətir açaq:

**`basket?.items`** — sual işarəsi "əgər `basket` yoxdursa (null/undefined), dayan və `undefined` qaytar" deməkdir. Onsuz, yəni sadəcə `basket.items` yazsaydıq və səbət hələ yüklənməmiş olsaydı, tətbiq **çökərdi**: `Cannot read property 'items' of undefined`.

Səbət tətbiq açılanda dərhal mövcud olmur — serverdən gəlir. Yəni ilk render anında `basket` **həmişə** `undefined`-dir. `?.` olmasa, tətbiq hər açılışda çökərdi.

**`?? 0`** — "solundakı null/undefined-dirsə, `0` işlət".

`||` ilə fərqi vacibdir:

| İfadə | Nəticə | Səbəb |
|---|---|---|
| `0 ?? 5` | `0` | `0` — null deyil, deməli qalır |
| `0 \|\| 5` | `5` | `\|\|` `0`-ı "boş" sayır |

Rəqəmlərlə işləyəndə **həmişə `??` işlədin**. Əks halda əsl `0` dəyəri səhvən başqa rəqəmlə əvəz olunar — məsələn "səbətdə 0 məhsul" ilə "səbət hələ yüklənməyib" bir-birinə qarışar.

### Array metodları: `.map()`, `.filter()`, `.find()`, `.reduce()`

Bu dördü array-in hər elementi üzərində gəzir. Vacib ortaq cəhət: **heç biri orijinal array-i dəyişmir**, hamısı yeni nəticə qaytarır.

**`.map()` — hər elementi başqa şeyə çevirir.** Say dəyişmir: 5 element girirsə, 5 element çıxır.

```tsx
{LANGUAGES.map(language => (
  <LanguageRow key={language.code} language={language} />
))}
```

Buradakı `key` prop-u React üçündür: "siyahı dəyişəndə hansı elementin hansı olduğunu bu ID ilə tanı". Onsuz React siyahını yenidən çəkəndə səhv element saxlaya bilər.

**`.filter()` — şərtə uyğun gələnləri seçir.** Say azala bilər:

```ts
const visibleProducts = products.filter(
  product => product.category?.id === selectedCategoryId,
);
```

**`.find()` — şərtə uyğun İLK elementi tapır** (tapmasa `undefined`). `basket.helpers.ts`-dən:

```ts
export function findItem(basket: Basket | undefined, productId: number) {
  return basket?.items?.find(item => item.product.id === productId);
}
```

`.filter()` bütün uyğunları **array** kimi qaytarır, `.find()` isə yalnız birini, **tək obyekt** kimi.

**`.reduce()` — hamısını tək bir dəyərə yığır.**

```ts
basket?.items?.reduce((sum, item) => sum + item.quantity, 0)
```

Addım-addım necə işləyir (səbətdə 2 alma + 3 armud olsun):

| Addım | `sum` (yığılan) | `item.quantity` | Yeni `sum` |
|---|---|---|---|
| Başlanğıc | `0` (sondakı `0`-dan) | — | `0` |
| 1-ci məhsul | `0` | `2` | `2` |
| 2-ci məhsul | `2` | `3` | `5` |
| Nəticə | | | **`5`** |

Sondakı `0` başlanğıc dəyərdir. Onu yazmasanız və array **boş** olsa, `.reduce()` xəta atar.

### `async` / `await` və Promise

Şəbəkə sorğusu dərhal cavab vermir — bəzən 50 ms, bəzən 3 saniyə çəkir. Bu müddətdə tətbiq donmamalıdır.

JavaScript bunu **Promise** (vəd) ilə həll edir: "bu iş gələcəkdə nə vaxtsa ya uğurla bitəcək, ya xəta verəcək — hazır olanda sənə xəbər verərəm".

`async`/`await` isə Promise-lərlə işləməyin ən oxunaqlı formasıdır. `auth.service.ts`-dən əsl kod:

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

- **`async function`** — "bu funksiyanın içində `await` işlədə bilərəm". Belə funksiya avtomatik olaraq Promise qaytarır.
- **`await`** — "bu sətirdə dayan, nəticə gələnə qədər gözlə, sonra davam et". Sanki kod yuxarıdan-aşağı, addım-addım gedirmiş kimi oxunur — halbuki arxa planda asinxron işləyir və tətbiq donmur.

**Xətaları `try/catch` tutur.** `useLoginForm.ts`-dən:

```ts
setLoading(true);
try {
  await login({ phone, password }, rememberMe);
  showSuccessToast(t('login.successToast'));
  navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
} catch (error) {
  setFormError(getApiErrorMessage(error));
} finally {
  setLoading(false);
}
```

Üç blokun hər birinin öz işi var:

| Blok | Nə vaxt işləyir | Burada nə edir |
|---|---|---|
| `try` | Həmişə (əsas yol) | Giriş sorğusunu göndərir, uğurlu olsa əsas ekrana keçir |
| `catch` | Yalnız xəta olanda | Xəta mətnini forma altında göstərir |
| `finally` | **Hər iki halda** | Spinner-i söndürür |

`finally` olmasaydı, `setLoading(false)` sətrini **iki dəfə** — həm `try`-ın sonunda, həm `catch`-in içində — yazmalı olardıq. Birini unutsaq, düymə əbədi "yüklənir" vəziyyətində qalardı.

### `Promise.all()` — paralel gözləmə

Bir neçə asinxron işi **eyni anda** başladıb hamısının bitməsini gözləmək üçün. `useHomeData.ts`-dən:

```ts
const retry = useCallback(() => {
  return Promise.all([
    profileQuery.refetch(),
    categoriesQuery.refetch(),
    campaignsQuery.refetch(),
  ]);
}, [profileQuery, categoriesQuery, campaignsQuery]);
```

Fərqi görək. Hər sorğu 100 ms çəkir:

| Üsul | Kod | Ümumi vaxt |
|---|---|---|
| Ardıcıl | `await a(); await b(); await c();` | 300 ms |
| Paralel | `await Promise.all([a(), b(), c()])` | ~100 ms |

Ardıcıl variantda hər sorğu növbətinin başlaması üçün gözləyir. Paralel variantda üçü də eyni anda yola düşür, ən uzunu nə qədər çəkirsə, o qədər gözləyirik.

Burada vacib nüans: bu kod məlumatın **ilk** gətirilməsi üçün deyil (onu TanStack Query özü edir, Hissə 18). Bu, yalnız "Yenidən cəhd et" düyməsi üçündür — üç sorğunu birdən təzələmək lazım gələndə.

### İlk baxış: `useState` və `useEffect`

Bunları Hissə 4-də ətraflı açacağıq. Hələlik sintaksis kimi tanıyın:

```ts
const [note, setNote] = useState('');
```

`useState(başlanğıc)` → `[cari_dəyər, dəyişdirici_funksiya]` qaytarır.

```ts
useEffect(() => {
  fetchBasket();
}, [fetchBasket]);
```

`useEffect(funksiya, [asılılıqlar])` → "komponent ilk dəfə ekrana gələndə (və mötərizədəki dəyərlərdən biri dəyişəndə) bu funksiyanı işə sal".

---

## Hissə 3: TypeScript ətraflı bələdçi

TypeScript = JavaScript + **tip sistemi**.

Tip sistemi nə deməkdir? Siz hər dəyişən üçün "bu, hansı növ məlumat saxlayacaq" deyirsiniz — mətn (`string`), rəqəm (`number`), obyekt, funksiya. TypeScript isə kodu işə salmazdan **əvvəl** yoxlayır: hər yerdə söz verdiyiniz tiplərə əməl olunurmu?

### Niyə vacibdir? Bir cümləlik cavab

Çünki səhvi **iki gün sonra istifadəçinin telefonunda** yox, **iki saniyə sonra öz ekranınızda** tutursunuz.

`product.titel` yazsanız (`title` əvəzinə), JavaScript susur — `undefined` qaytarır, ekranda boşluq görünür, siz isə səbəbi saatlarla axtarırsınız. TypeScript isə elə yazdığınız anda qırmızı xətt çəkir: "`Product` tipində `titel` adlı sahə yoxdur".

### Real nümunə: `unknown` niyə `any`-dən yaxşıdır

`apiError.ts`-ə baxın — bütün layihədə xəta mətnini çıxaran yeganə funksiya:

```ts
import { isAxiosError } from 'axios';
import i18n from '@shared/i18n/i18n';

export function getApiErrorMessage(error: unknown): string {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? i18n.t('apiError.fallback');
  }
  return i18n.t('apiError.fallback');
}
```

Diqqət: `error: unknown`.

Niyə `unknown`? Çünki `catch (error)` blokuna **nə gələcəyini heç kim bilmir**. Axios xətası ola bilər. Adi `Error` ola bilər. Kimsə `throw 'salam'` yazıbsa, sadə bir sətir də ola bilər.

İndi fərqi görək:

| Yazsaydıq | TypeScript nə edərdi | Nəticə |
|---|---|---|
| `error: any` | Heç nə. `error.response.data.message` yazmağa icazə verərdi | Xəta adi `Error` olsaydı, tətbiq **çökərdi** |
| `error: unknown` | İstifadədən əvvəl yoxlamağa **məcbur** edir | Çökmə mümkün deyil |

`any` yazmaq — TypeScript-i quraşdırıb sonra söndürmək kimidir. Bu layihədə `any` **heç yerdə** yoxdur; hər yerdə ya konkret tip, ya `unknown` + yoxlama var.

### `interface` və `type` — fərq nədir?

Hər ikisi "bu obyektin forması belədir" demək üçündür.

```ts
// types/api.ts — obyekt forması üçün interface
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
// variantlar siyahısı üçün type
export type ProductMeasure =
  | 'kg' | 'gr' | 'litre' | 'ml' | 'meter'
  | 'cm' | 'mm' | 'piece' | 'packet' | 'box';
```

Praktiki fərq:
- `interface` — obyekt formaları üçün, `extends` ilə genişləndirmək rahatdır.
- `type` — union (`|`) və intersection (`&`) yaratmaq üçün daha çevikdir.

Layihədə obyektlər üçün `interface`, variant siyahıları üçün `type` işlədilib. Bu, məcburi qayda deyil — sadəcə "hansı alət hansı işə daha yaxşı yatır" prinsipi.

**`extends` (genişləndirmə) nümunəsi:**

```ts
export interface ProductDetail extends Product {
  is_favorite: boolean;
}
```

`ProductDetail` — `Product`-un **bütün** sahələrini miras alır, üstünə bir dənə əlavə edir. Bu, backend-in davranışını dəqiq ifadə edir: "`/products/:id` cavabı siyahıdakı məhsulun eynisidir, sadəcə bir sahə artıqdır".

Alternativ nə olardı? Bütün sahələri ikinci dəfə əl ilə yazmaq. Sonra backend `Product`-a yeni sahə əlavə edəndə **bir yerdə** yeniləyib **o birini unutmaq**. `extends` bu riski tamamilə aradan qaldırır.

### Union tip (`|`) — "ya bu, ya o"

```ts
export type PaymentMethod = 'CASH' | 'CARD';
```

Bu, `PaymentMethod` tipli dəyişənin **yalnız** bu iki sətirdən biri ola biləcəyini deyir. `'PAYPAL'` yazsanız — dərhal xəta.

Niyə bu, sadəcə `string` yazmaqdan yaxşıdır? Çünki `string` yazsaydıq, `paymentMethod = 'cash'` (kiçik hərflə) da keçərdi, backend isə bunu tanımayıb 400 xətası qaytarardı. Union tip bu səhvi **yazı anında** tutur.

Eyni məntiqlə qurulmuş digərləri: `OrderStatus` (6 status), `UserRole`, `ProductMeasure`.

**Nullable sahələr də union-dır:**

```ts
address: string | null;
```

Oxunuşu: "ya mətn, ya `null`". `null` burada təsadüfi deyil — backend istifadəçinin ünvanı yoxdursa məhz `null` qaytarır. Tip bunu açıq yazır, ona görə koda `profile.address ?? ''` kimi qorunma yazmağı **unutmaq mümkün deyil**: TypeScript xatırladır.

### Intersection tip (`&`) — "bu VƏ o birlikdə"

```ts
// TextField.types.ts
export type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
};
```

`TextFieldProps` = React Native-in `TextInputProps`-unun bütün sahələri **plus** bizim iki sahəmiz.

Bu nə deməkdir? `<TextField>` komponentimiz həm adi `TextInput`-un bacardığı hər şeyi (placeholder, keyboardType, autoFocus, maxLength...) qəbul edir, həm də bizim əlavə etdiyimiz `label` və `error`-u. Yəni "təkəri yenidən icad etmirik, mövcud təkərin üstünə iki şey əlavə edirik".

### Optional sahə (`?`)

```ts
export type ButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'danger';
  textStyle?: StyleProp<TextStyle>;
};
```

`?` işarəsi olan sahələr **məcburi deyil**. `<Button title="Daxil ol" />` yazmaq kifayətdir.

`?`-siz `title` isə hər dəfə verilməlidir — məntiqlidir, çünki mətnsiz düymə mənasızdır.

### Generic-lər (`<T>`) — "tipi sonra deyəcəyəm"

Generic-i belə təsəvvür edin: **boş yerli forma**. Formanın quruluşu hazırdır, sadəcə "burada nə olacağını" sonradan doldurursunuz.

Ən aydın nümunə — backend cavablarının "zərfi":

```ts
export interface ApiEnvelope<T> {
  message: string;
  data: T;
  result: boolean;
}
```

Backend demək olar hər cavabı belə göndərir: `{ message: "...", data: {...}, result: true }`. Zərfin forması **həmişə eynidir**, amma içindəki `data` hər dəfə fərqlidir — bəzən profil, bəzən məhsul siyahısı.

`T` məhz o "boş yer"dir. İstifadə anında doldurulur:

```ts
// profile.service.ts
const { data } = await httpClient.get<ApiEnvelope<UserProfile>>('/profile');
return data.data;
```

İndi TypeScript dəqiq bilir: `data.data` — bir `UserProfile`-dır. `data.data.full_name` yazanda avtomatik tamamlayır; `data.data.fullname` yazsanız xəta verir.

Generic olmasaydı nə edərdik? Hər endpoint üçün ayrıca zərf tipi yazardıq: `ProfileEnvelope`, `ProductEnvelope`, `OrderEnvelope`... Onlarla eyni formalı tip. Generic bunu **birinə** endirir.

**Bir addım da irəli:**

```ts
export interface PaginatedEnvelope<T> extends ApiEnvelope<T[]> {
  pagination: Pagination;
}
```

Diqqətlə baxın: `ApiEnvelope<T[]>` — `T`-nin özü yox, `T`-nin **array**ı. Yəni `PaginatedEnvelope<Product>` yazanda `data` sahəsi `Product[]` olur, üstəlik `pagination` da əlavə olunur. Səhifələnən siyahı cavabları məhz belədir.

### `as` — tip iddiası

`as` "mən bu dəyərin əslində filan tip olduğunu **bilirəm**, sən mənə inan" deməkdir. TypeScript-in öz nəticəsini **əzir**, ona görə ehtiyatla işlədilməlidir.

Layihədə ən maraqlı nümunə `upload.service.ts`-dədir — **ikiqat** iddia:

```ts
formData.append('file', {
  uri: file.uri,
  name: file.name,
  type: file.type,
} as unknown as Blob);
```

Niyə belə qəribə yazılıb? Səbəb tarixidir:
1. `FormData.append`-in tip bəyanı brauzerdən gəlir və ikinci arqument üçün `Blob` gözləyir.
2. React Native-də isə fayl `Blob` deyil — `{uri, name, type}` formasında bir obyektdir. Runtime-da bu **düzgün işləyir**, sadəcə tiplər uyğun gəlmir.
3. Birbaşa `as Blob` yazmağa TypeScript icazə vermir: "bu iki tip bir-birinə heç bənzəmir, səhv edirsən".
4. `as unknown as Blob` — əvvəl `unknown`-a (hər şeyə uyğun gəlir), sonra `Blob`-a. Yəni TypeScript-ə "bilirəm, qəbul et" deyirik.

Bu, kodda **şərh tələb edən** nadir hallardandır — məhz ona görə faylda izahlı şərh var. Qayda belədir: `as unknown as` yazırsınızsa, yanında **niyə** olduğunu da yazın.

### `Record<K, V>` — "açarları belə, dəyərləri belə obyekt"

`order.ts`-dən əla nümunə:

```ts
const ORDER_STATUS_COLORS: Record<OrderStatus, { color: string; backgroundColor: string }> = {
  PENDING:   { color: '#C68A1E', backgroundColor: '#FCF1DC' },
  CONFIRMED: { color: '#3D7CE0', backgroundColor: '#E6EEFC' },
  PREPARING: { color: '#8E4FC9', backgroundColor: '#F1E6FA' },
  READY:     { color: '#1AA89A', backgroundColor: '#DEF5F2' },
  DELIVERED: { color: '#5C9A2E', backgroundColor: '#E9F5DD' },
  CANCELLED: { color: '#D14444', backgroundColor: '#FBE6E6' },
};
```

`Record<OrderStatus, ...>` deyir ki: "bu obyektin açarları **məhz** `OrderStatus` union-undakı 6 dəyər olmalıdır — biri əskik olmasın, artıq olmasın".

Bunun praktiki dəyəri budur: sabah backend `'REFUNDED'` adlı yeni status əlavə etsə və siz `OrderStatus` tipinə onu yazsanız, TypeScript **dərhal** bu obyektdə xəta göstərəcək: "`REFUNDED` açarı əskikdir". Yəni yeni statusu əlavə edib rəngini təyin etməyi **unuda bilmirsiniz**.

Bu, "tip sistemi sizin yerinizə xatırlayır" prinsipinin ən gözəl nümunəsidir.

**i18n əlavə olunanda bu naxış necə dəyişdi?** Əvvəllər status adları (`'Hazırlanır'` kimi) bu cədvəldə birbaşa yazılırdı. Amma dil dəyişəndə problem çıxdı: cədvəl **modul yüklənəndə bir dəfə** qurulur, yəni tətbiq açılan andakı dildə donub qalırdı. Həll: mətnləri cədvəldən çıxarıb funksiyaya köçürmək —

```ts
const ORDER_STATUS_LABEL_KEYS: Record<OrderStatus, string> = {
  PENDING: 'orderStatus.pending',
  // ...
};

export function getOrderStatusMeta(status: OrderStatus): OrderStatusMeta {
  return {
    ...ORDER_STATUS_COLORS[status],
    label: i18n.t(ORDER_STATUS_LABEL_KEYS[status]),
  };
}
```

İndi `i18n.t(...)` **hər çağırışda** işləyir, yəni həmişə cari dili qaytarır. Rənglər isə cədvəldə qalıb, çünki onlar dildən asılı deyil.

### `keyof typeof` — mövcud obyektdən tip düzəltmək

`TabBar.tsx`-də işlək naxış:

```ts
const ICONS = {
  Home: HomeIcon,
  Search: SearchIcon,
  Profile: UserIcon,
} as const;

const INITIAL_SCREEN: Partial<Record<keyof typeof ICONS, string>> = {
  Home: 'HomeMain',
  Profile: 'ProfileMain',
};
```

Addım-addım açaq:

| İfadə | Mənası | Nəticə |
|---|---|---|
| `ICONS` | Obyektin **özü** (dəyər) | `{ Home: ..., Search: ..., Profile: ... }` |
| `typeof ICONS` | Onun **tipi** | `{ Home: ...; Search: ...; Profile: ... }` |
| `keyof typeof ICONS` | Tipin **açarları** | `'Home' \| 'Search' \| 'Profile'` |

Yəni: ayrıca tip yazmadan, mövcud obyektin açarlarından avtomatik union düzəltdik. Obyektə yeni tab əlavə etsəniz, tip **özü-özünə** yenilənir.

`Partial<...>` isə "bu açarlardan **hamısı olmaya bilər**" deməkdir — burada `Search` tabının daxili stack-i olmadığı üçün onun ilkin ekranı da yoxdur.

### `as const` — dəyəri "dondurmaq"

```ts
export const FONTS = {
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold',
} as const;
```

`as const` olmasaydı, `FONTS.regular`-ın tipi sadəcə `string` olardı — yəni "hər hansı mətn".

`as const` ilə tipi məhz `'Roboto-Regular'` olur — o konkret sətir. Üstəlik bütün obyekt `readonly` olur: `FONTS.regular = 'başqa'` yazsanız xəta.

Bu, yuxarıdakı `keyof typeof` naxışının işləməsi üçün **vacibdir**: `as const` olmasa, `keyof typeof ICONS` düzgün işləsə də, dəyər tipləri genişlənib faydasını itirir.

### Type guard — "bu blokun içində tip daha dardır"

```ts
if (isAxiosError<{ message?: string }>(error)) {
  // BU BLOKUN İÇİNDƏ TypeScript artıq bilir ki, error — AxiosError-dur
  return error.response?.data?.message ?? i18n.t('apiError.fallback');
}
```

`isAxiosError` adi `boolean` qaytaran funksiya deyil. Onun qaytarma tipi xüsusi yazılıb: `error is AxiosError<T>`. Buna **type predicate** deyilir və TypeScript-ə bunu deyir: "bu funksiya `true` qaytarırsa, arqument həqiqətən o tipdir".

Öz type guard-ınızı yazmaq istəsəniz, ən sadə forması:

```ts
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
```

Sadə `typeof` yoxlaması da type guard rolunu oynayır — `Input.tsx`-dən:

```ts
const realValue = typeof value === 'string' ? value : '';
```

(`TextInputProps`-un `value` sahəsi `string | undefined` ola bilər; bu sətir "mətndirsə götür, deyilsə boş sətir işlət" deyir.)

---

## Hissə 4: React və React Native əsasları

### Komponent nədir?

React-də **hər şey komponentdir**. Komponent — props (kənardan gələn məlumat) alıb ekranda nə görünəcəyini qaytaran bir funksiyadır.

Ən sadə forma — `InputLabel.tsx`:

```tsx
function InputLabel({ children }: InputLabelProps) {
  return <Text style={styles.label}>{children}</Text>;
}
```

`children` — React-in xüsusi prop-udur. `<InputLabel>Telefon</InputLabel>` yazanda, açılış və bağlanış teqləri **arasındakı** hər şey avtomatik `children` kimi ötürülür.

Komponentləri Lego detalları kimi düşünün: kiçik detallar (`Button`, `Input`) böyüklərə (`CheckoutForm`) yığılır, onlar da ekranlara (`CheckoutScreen`).

### JSX nədir?

```tsx
<View style={styles.header}>
  <Text style={styles.logo}>TIK TAK</Text>
</View>
```

Bu, HTML-ə oxşayır, amma HTML **deyil**. JSX adlanır və Babel tərəfindən adi JavaScript funksiya çağırışlarına çevrilir (`React.createElement(...)`).

Vacib nüans: `<View>` bir `<div>` **deyil**. O, React Native-in komponentidir və Android-də əsl `android.view.ViewGroup`, iOS-da əsl `UIView` olur.

### Props və State — fərq nədir?

Bu, React-in ən vacib ayrımıdır.

| | **Props** | **State** |
|---|---|---|
| Haradan gəlir | Kənardan (valideyn komponentdən) | Komponentin öz içindən |
| Kim dəyişə bilər | Yalnız valideyn | Komponentin özü |
| Nümunə | `<Button title="Daxil ol" />` | `const [note, setNote] = useState('')` |

Analogiya: props — sizə verilən **tapşırıq** (dəyişə bilmirsiniz, icra edirsiniz). State — sizin öz **qeyd dəftəriniz** (istədiyiniz kimi yazırsınız).

```ts
const [password, setPassword] = useState('');
```

`setPassword('abc')` çağırılanda nə olur?
1. React `password`-un yeni dəyərini yadda saxlayır.
2. Komponent funksiyasını **yenidən icra edir**.
3. Bu dəfə `password` `'abc'`-dir.
4. Yeni JSX köhnəsi ilə müqayisə olunur, yalnız **dəyişən hissə** ekranda yenilənir.

### `useEffect` — "yan təsirlər"

Komponentin render funksiyası **saf** olmalıdır: eyni giriş → eyni çıxış, başqa heç nə. Şəbəkə sorğusu göndərmək, timer qurmaq kimi işlər render zamanı **olmamalıdır**.

Niyə? Çünki React komponenti gözlədiyinizdən çox dəfə icra edə bilər. Render içində sorğu göndərsəniz, sorğu neçə dəfə gedəcəyini bilməzsiniz.

`useEffect` bu işləri render **bitdikdən sonraya** köçürür:

```ts
useEffect(() => {
  fetchBasket();
}, [fetchBasket]);
```

`AppHeader.tsx`-dəki əsl koddur: başlıq ekrana gələn kimi səbəti gətir.

**Asılılıq array-i (`[...]`) nə edir?**

React bu array-dəki dəyərləri hər render-də əvvəlkiylə müqayisə edir. Fərq varsa — effekti yenidən işə salır.

| Array | Nə vaxt işə düşür |
|---|---|
| `[]` (boş) | Yalnız bir dəfə, ilk render-də |
| `[fetchBasket]` | İlk render-də + `fetchBasket` dəyişəndə |
| Array **ümumiyyətlə yoxdursa** | **Hər** render-dən sonra (çox vaxt səhvdir) |

**Təmizləmə funksiyası** — effektin qaytardığı funksiya. Komponent ekrandan silinəndə, ya effekt təkrar işə düşməzdən əvvəl çağırılır.

`useHomeData.ts`-dən — kampaniya karuselinin avtomatik sürüşməsi:

```ts
useEffect(() => {
  if (!rawCampaigns || rawCampaigns.length <= 1) return;
  const interval = setInterval(() => {
    campaignIndexRef.current = (campaignIndexRef.current + 1) % rawCampaigns.length;
    campaignListRef.current?.scrollToIndex({
      index: campaignIndexRef.current,
      animated: true,
    });
  }, CAMPAIGN_AUTOPLAY_MS);
  return () => clearInterval(interval);
}, [rawCampaigns]);
```

`return () => clearInterval(interval);` olmasaydı nə olardı?

Hər dəfə `rawCampaigns` dəyişəndə **yeni** bir timer qurulardı, köhnəsi isə işləməyə davam edərdi. Beş dəfə dəyişsə — beş timer paralel işləyər, karusel dəli kimi sürüşərdi. Üstəlik komponent ekrandan silinəndən sonra da timer-lər işləməyə davam edərdi (yaddaş sızması).

**Burada gizli bir dərs də var.** Diqqət edin: asılılıq `rawCampaigns`-dir, `campaigns` yox. Faylda bunun səbəbi şərhlə yazılıb:

```ts
const rawCampaigns = campaignsQuery.data;
const campaigns = rawCampaigns ?? [];
```

`campaigns` **hər render-də yeni bir array obyektidir** (çünki `?? []` hər dəfə təzə boş array yaradır). Əgər effektin asılılığına `campaigns` yazsaydıq, React hər render-də "asılılıq dəyişib" deyib timeri yenidən qurardı — sonsuz döngə. `rawCampaigns` isə TanStack Query-nin verdiyi **sabit referansdır**: məlumat həqiqətən dəyişməyincə eyni obyekt qalır.

Bu, React-də ən çox yayılmış tələlərdən biridir: **asılılıq array-inə hər render-də yenidən yaranan obyekt/array qoymaq**.

### `useCallback` — funksiyanı "eyni saxlamaq"

JavaScript-də funksiya da bir dəyərdir. Hər render-də funksiya sətri yenidən icra olunur, yəni **yeni funksiya obyekti** yaranır. Görünüşü eynidir, amma React üçün "başqa funksiyadır".

Bu, yuxarıdakı asılılıq problemini yaradır. `useCallback` həlldir:

```ts
const retry = useCallback(() => {
  return Promise.all([
    profileQuery.refetch(),
    categoriesQuery.refetch(),
    campaignsQuery.refetch(),
  ]);
}, [profileQuery, categoriesQuery, campaignsQuery]);
```

`useCallback(fn, [deps])` deyir: "bu funksiyanı yadda saxla; `deps` dəyişməyincə **hər dəfə eyni obyekti** qaytar".

Bu `retry` funksiyası sonra iki yerdə işlədilir: `ErrorState`-in `onRetry` prop-unda (istifadəçi "Yenidən cəhd et" düyməsinə basanda) və `useReload` hook-unda (ekranı aşağı dartıb təzələyəndə). Hər ikisi **eyni** funksiyanı alır.

### `useRef` — "yadda saxla, amma render etmə"

`useState` dəyəri dəyişəndə komponent yenidən render olunur. Bəzən isə buna **ehtiyac yoxdur** — sadəcə bir dəyəri render-lər arası saxlamaq lazımdır.

`useHomeData.ts`-dən:

```ts
const campaignListRef = useRef<FlatList<Campaign>>(null);
const campaignIndexRef = useRef(0);
```

- `campaignListRef` — siyahı komponentinə "tutacaq". Onun vasitəsilə `scrollToIndex(...)` çağırırıq.
- `campaignIndexRef` — hazırda neçənci kampaniyanın göründüyü. Bu rəqəm dəyişəndə ekranda **heç nə dəyişmir** (sürüşdürməni siyahının özü edir), ona görə `useState` işlətmək lazımsız render-lər yaradardı.

Sadə qayda: **ekranda görünür → `useState`; sadəcə yaddaş üçündür → `useRef`**.

### `View`, `Text`, `StyleSheet` — RN-in "HTML/CSS"-i

Veb-də `<div>`, `<span>` və CSS faylları var. React Native-də:

- **`<View>`** — universal konteyner (`<div>`-in qarşılığı). **Mətn saxlaya bilməz.**
- **`<Text>`** — yalnız mətn üçün. `<View>Salam</View>` yazmaq **xətadır**, `<View><Text>Salam</Text></View>` yazılmalıdır.
- **`StyleSheet.create({...})`** — CSS-in qarşılığı, amma ayrıca fayl deyil, adi JavaScript obyekti:

```ts
export const styles = StyleSheet.create({
  flex: { flex: 1 },
  listContent: { paddingHorizontal: 20, paddingTop: 8 },
});
```

Bu layihədə çox vaxt bunun **funksiya variantı** işlədilir, çünki rənglər temadan gəlir:

```ts
export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    header: { backgroundColor: colors.surface },
    title: { color: colors.text, fontFamily: FONTS.bold },
  });
```

Səbəbi Hissə 19-da (Dark Mode) ətraflı izah olunub.

### Flexbox — yeganə layout sistemi

CSS-də `display: flex` **seçimlərdən biridir** (grid, block, inline də var). React Native-də isə başqa seçim **yoxdur**: hər `View` flexbox-dur.

Veb CSS-dən üç mühüm fərq:

1. **`flexDirection` default-u `'column'`-dur** (veb-də `'row'`). Yəni uşaq elementlər default olaraq **yuxarıdan-aşağı** düzülür. Yan-yana istəyirsinizsə, açıq şəkildə `flexDirection: 'row'` yazmalısınız.
2. **Vahid yoxdur.** `{ width: 100 }` yazılır, `'100px'` yox. Rəqəmlər "density-independent pixel" (dp) sayılır — yəni ekran sıxlığından asılı olmayaraq eyni fiziki ölçü.
3. **`gap` dəstəklənir.** `{ gap: 20 }` yazmaq, hər uşağa ayrıca `marginBottom` yazmaqdan qat-qat təmizdir. Layihədə geniş işlədilir.

### Metro — React Native-in "paketləyicisi"

Veb-də kodu Webpack/Vite bir yerə yığır. React Native-də bu işi **Metro** görür: bütün `.ts`/`.tsx` fayllarınızı, şəkilləri, `node_modules`-u bir JS paketinə çevirir.

`npm start` Metro-nu işə salır. Development zamanı telefon kodu bu serverdən **canlı** çəkir — kodu dəyişdirdiyiniz an tətbiq özü yenilənir (Fast Refresh).

Bunu bilmək praktikada vacibdir: **tətbiq açılmırsa, çox vaxt günahkar kod yox, Metro-dur.** Bu layihədə dəfələrlə belə olub (bax Hissə 23).

### Native modul nədir?

Bəzi işləri sırf JavaScript ilə görmək **mümkün deyil**: kameraya çıxmaq, faylı yaddaşa yazmaq, Keychain-ə toxunmaq. Bunlar telefonun əməliyyat sisteminin API-larını tələb edir.

Bu körpünü quran kitabxanalara **native modul** deyilir. Onların JS tərəfi ilə yanaşı Android üçün Kotlin/Java, iOS üçün Swift/Objective-C kodu da var.

Layihədəki native modullar: `react-native-mmkv`, `react-native-keychain`, `react-native-svg`, `react-native-gesture-handler`, `react-native-reanimated`, `react-native-image-picker`, `react-native-bootsplash`, `@notifee/react-native`, `@maplibre/maplibre-react-native`.

**Bunun əməli nəticəsi çox vacibdir:** paketi `npm install` etmək **kifayət deyil**. Native tərəfi tətbiqə bağlamaq və Android/iOS layihəsini **yenidən compile etmək** lazımdır:

```
cd android && ./gradlew.bat app:installDebug
```

`tsc` və `eslint`-in təmiz keçməsi paketin telefonda işlədiyini **sübut etmir**. `CLAUDE.md`-də bu xəbərdarlıq təsadüfən yazılmayıb — bu tələyə real olaraq düşülüb.

### Android və iOS — nə fərqlidir?

| Sahə | Fərq |
|---|---|
| **Qovluqlar** | `android/` (Gradle layihəsi) və `ios/` (Xcode layihəsi) ayrı-ayrı native layihələrdir |
| **Klaviatura** | Android `adjustResize` ilə ekranı sıxır, iOS isə üstünə sürüşdürür — `react-native-keyboard-controller` bu fərqi hamarlayır |
| **Splash ikonu** | Android 12+ ikonu **məcburi dairə** kəsir, iOS-da belə məhdudiyyət yoxdur |
| **Geri jesti** | iOS-da sistem səviyyəsindədir; Android-də React Navigation-un `gestureEnabled` seçimi ilə idarə olunur |

Kodda `Platform.OS === 'ios'` yazaraq budaqlanmaq olar.

> **Vacib qeyd:** bu layihə indiyə qədər **yalnız Android-də** qurulub və test edilib. İnkişaf maşını Windows-dur, `ios/` qovluğuna ilk commit-dən bəri toxunulmayıb. Yəni "kod cross-platform yazılıb" demək, "iOS-da işləyir" demək **deyil** — sınanmayıb.

### `SafeAreaProvider` və `useSafeAreaInsets`

Müasir telefonlarda ekranın hər piksəli istifadəyə yararlı deyil: yuxarıda notch/kamera deşiyi və status bar, aşağıda jest zolağı var. Kontenti bunların altında qoysanız, istifadəçi onu görməyəcək.

```ts
const insets = useSafeAreaInsets();
// ...
<View style={[styles.flex, { paddingTop: insets.top }]}>
```

`useSafeAreaInsets()` bu "toxunulmaz" zolaqların ölçüsünü qaytarır (`top`, `bottom`, `left`, `right`). Bu naxışı demək olar hər ekranda görəcəksiniz.

Niyə sabit rəqəm (məsələn `paddingTop: 44`) yazmırıq? Çünki hər telefonda fərqlidir — köhnə telefonda 20, notch-lu telefonda 44, Dynamic Island-lı telefonda daha çox. Sabit rəqəm bəzi cihazlarda düzgün, bəzilərində səhv olardı.

`SafeAreaProvider` bu məlumatı ölçən komponentdir və bütün tətbiqi əhatə etməlidir — layihədə `src/app/Providers/Providers.tsx`-dədir.

---

## Hissə 5: Qovluq strukturu

```
Tiktak/
├── index.js                   ← Əsl giriş nöqtəsi (bax Hissə 8)
├── App.tsx                    ← Nazik giriş komponenti (bax Hissə 8)
├── app.json                   ← Tətbiqin adı
├── babel.config.js            ← Babel + path alias-ları (bax Hissə 17)
├── metro.config.js            ← Metro bundler + SVG transformer
├── tsconfig.json              ← TypeScript + eyni alias-lar
├── package.json               ← Asılılıqlar və skriptlər
├── patches/                   ← patch-package düzəlişləri
├── scripts/
│   └── build-apk.js           ← Release APK skripti (bax Hissə 17)
├── android/                   ← Android native layihəsi (Gradle)
├── ios/                       ← iOS native layihəsi (hələ toxunulmayıb)
├── assets/                    ← Şəkillər, SVG-lər (@assets alias-ı bura baxır)
├── docs/
│   └── api.md                 ← Backend API sənədləşməsi (Postman-dan)
├── types/                     ← Layihə-boyu paylaşılan tiplər (bax Hissə 7)
│   ├── api.ts                 ← Backend data tipləri
│   ├── navigation.ts          ← Naviqasiya param tipləri
│   ├── svg.d.ts               ← "*.svg" import-larını tanıdır
│   └── images.d.ts            ← "*.png/.jpg" import-larını tanıdır
└── src/
    ├── app/                   ← Tətbiqin qurulma qatı (bax Hissə 8)
    │   ├── AppShell/          ← StatusBar + NavigationContainer + Toast
    │   ├── Providers/         ← Bütün provider-lərin zənciri
    │   └── hooks/
    │       └── useAppBootstrap.ts   ← Açılış "qapıları" (token + splash)
    ├── navigation/            ← Naviqasiya konfiqurasiyası (bax Hissə 9)
    │   ├── RootNavigator.tsx
    │   ├── BottomTabNavigator.tsx
    │   ├── HomeStackNavigator.tsx
    │   ├── ProfileStackNavigator.tsx
    │   ├── TabBar.tsx
    │   └── navigationRef.ts
    ├── screens/               ← Bütün ekranlar (bax Hissə 15)
    │   ├── auth/              ← Giriş-öncəsi
    │   │   ├── components/    ← WelcomeScreen, LoginScreen, RegisterScreen
    │   │   └── hooks/         ← useLoginForm, useRegisterForm, useAuthFormScroll
    │   └── protected/         ← Giriş-sonrası
    │       ├── home/          ← HomeScreen, CategoryProductsScreen, kartlar,
    │       │                     AddressEditModal, MapAddressPicker + hooks/
    │       ├── basket/        ← BasketScreen, BasketRow, BasketFooter, ...
    │       ├── checkout/      ← CheckoutScreen, CheckoutForm, PaymentMethodPicker,
    │       │                     OrderItemsBox, OrderSuccessScreen
    │       ├── campaigns/     ← CampaignsScreen, CampaignDetailSheet + hooks/
    │       ├── search/        ← SearchScreen, nəticə/tarixçə sətirləri + hooks/
    │       └── profile/       ← ProfileScreen, AccountInfo, MyLists, OrderHistory,
    │                             Settings, Support + hooks/
    ├── shared/                ← Ekranlar arasında paylaşılan hər şey
    │   ├── api/               ← httpClient, tokenStorage, queryClient,
    │   │                        queryStorage, settingsStorage (Hissə 11, 18, 19)
    │   ├── components/        ← Button, Input, ProductCard, ProductGrid,
    │   │                        BottomSheet, Skeleton, ScreenHeader... (Hissə 14)
    │   ├── config/            ← env.ts, appInfo.ts, sentry.ts
    │   ├── hooks/             ← useReload.ts, useBasketGrid.ts
    │   ├── i18n/              ← i18n/ (quraşdırma) + locales/ (Hissə 20)
    │   ├── icons/             ← Bütün SVG ikonlar, qruplara bölünmüş
    │   ├── queries/           ← queryKeys.ts (Hissə 18)
    │   ├── services/          ← Hər backend sahəsi üçün bir fayl (Hissə 12)
    │   ├── store/             ← basket.store + helpers/sync/toasts (Hissə 13)
    │   └── utils/             ← validation, apiError, toast, order,
    │                            productMeasure, notifications, searchHistory
    └── theme/
        ├── colors.ts          ← LIGHT_COLORS / DARK_COLORS (Hissə 19)
        ├── fonts.ts           ← Font adları
        ├── navigationTheme.ts ← React Navigation üçün tema obyekti
        └── ThemeContext.tsx   ← ThemeProvider / useTheme (Hissə 19)
```

### Bu strukturda üç qərar var, hər biri şüurludur

**1. `types/` niyə `src/`-in içində deyil, kökdədir?**

Çünki `types/` yalnız **bir-biri ilə əlaqəsi olmayan bir neçə fayl arasında** paylaşılan tiplər üçündür — `UserProfile` kimi (servis, ekran, store, hamısı işlədir).

Bir komponentin **öz** prop tipi (`ButtonProps`) isə həmin komponentin qovluğunda, `Button.types.ts`-də qalır. Onları `types/`-ə yığmaq səhv olardı: o zaman "bu tip haradan istifadə olunur?" sualı ağırlaşardı və `types/` faylı zamanla heç kimin başa düşmədiyi nəhəng bir zibilxanaya çevrilərdi.

**2. `src/app/` niyə `src/navigation/`-dən ayrıdır?**

`app/` — "tətbiq necə **qurulur**" (provider-lər, açılış qapıları). `navigation/` — "istifadəçi ekranlar arasında necə **gəzir**". Bunlar iki fərqli sual olduğu üçün iki fərqli qovluqdadır.

**3. `src/shared/hooks/` var, amma `src/hooks/` yoxdur.**

Əvvəllər ayrıca `src/hooks/` qovluğu var idi — içində **cəmi bir fayl**. Bu, planlaşdırılmış struktur deyildi, təsadüfən elə qalmışdı. `useReload` hook-u ekranlar arasında paylaşılan bir şeydir, yəni `shared/`-in qalan məzmunu ilə (api, services, components, utils) eyni kateqoriyadadır — ona görə oraya köçürüldü.

---

## Hissə 6: Fayl təşkili konvensiyaları

Bu layihədə fayllar necə bölünür? Üç qayda var.

### Qayda 1: Per-component qovluq

Demək olar hər komponent və ekran belə təşkil olunub:

```
ComponentName/
├── ComponentName.tsx          ← Komponentin özü (məntiq + JSX)
├── ComponentName.styles.ts    ← StyleSheet bloku
├── ComponentName.types.ts     ← Props tipi (varsa)
└── index.ts                   ← export { default } from './ComponentName';
```

**Niyə `.styles.ts` ayrıdır?**

Bir komponent üç şeyi eyni anda daşıyır: state/məntiq, JSX, stillər. Stillər çox vaxt ən uzun hissədir (40-80 sətir olur). Hamısı bir fayldadırsa, "bu komponent nə edir" sualına cavab tapmaq üçün onlarla sətir stildən **sıçrayaraq** keçməli olursunuz.

Ayıranda: `.tsx`-i açan **nə baş verdiyini** oxuyur, `.styles.ts`-i açan **necə göründüyünü**.

**Niyə `.types.ts` ayrıdır?**

Çünki props tipi komponentin **ictimai müqaviləsidir**. Bu komponenti işlətmək istəyən adam onu açıb baxır: "mənə nə ötürmək lazımdır?" — və cavabı 5 sətirlik bir faylda tapır, 100 sətirlik komponentin içində axtarmır.

**`index.ts` niyə lazımdır?**

Ona **barel fayl** deyilir. Onun sayəsində kənardan import belə qalır:

```ts
import Button from '@shared/components/Button';       // ✅
// yox:
import Button from '@shared/components/Button/Button'; // ❌
```

JavaScript modul sistemi bir qovluğa müraciət ediləndə avtomatik `index.ts` axtarır. Nəticə: daxili fayl adları dəyişsə belə, **kənardakı import-lar sınmır**.

Barel fayl adlı export-ları da ötürür. `ProductCard/index.ts`:

```ts
export { default } from './ProductCard';
export { COLUMNS, GRID_GAP, HORIZONTAL_PADDING, CARD_WIDTH } from './ProductCard.styles';
```

Niyə bu sabitlər ictimai edilib? Çünki `ProductGrid` grid-i qurarkən **eyni sütun sayını** bilməlidir. Onları ixrac etməsək, `COLUMNS = 2` rəqəmi iki fayla ayrıca yazılardı — və biri dəyişəndə o biri unudulardı.

### Qayda 2: Hər sahənin öz `hooks/` qovluğu

Ekran komponenti şişəndə, məntiq ondan **hook**-a çıxarılır:

```
screens/auth/
├── components/
│   ├── LoginScreen/
│   └── RegisterScreen/
└── hooks/
    ├── useLoginForm.ts       ← LoginScreen-in bütün state/validasiya/sorğu məntiqi
    ├── useRegisterForm.ts
    └── useAuthFormScroll.ts  ← hər iki formanın paylaşdığı klaviatura scroll-u
```

Nəticədə `LoginScreen.tsx` yalnız **görünüşü** saxlayır:

```tsx
function LoginScreen() {
  const { phone, setPhone, password, setPassword, errors, loading, handleSubmit } = useLoginForm();
  return ( /* JSX */ );
}
```

**Vacib nüans:** bu qovluq **bir dənə istifadəçisi olan hook üçün də** işlədilir (`useAvatarUpload`, `useMapAddressPicker`). Yəni "bir yerdə işlədilirsə, komponentin yanında qalsın" **etmirik**. Səbəb: yeri həmişə eyni olsun deyə — hook axtaranda hamısının harada olduğu əvvəlcədən məlumdur.

### Qayda 3: Fayl ölçüsü ~110 sətirdən çox olmasın

`src/` altındakı heç bir fayl təxminən **110 sətri keçməməlidir**. `.styles.ts` faylları bu qaydadan azaddır (stil siyahısı təbii olaraq uzun olur).

Bu qayda niyə var? Çünki uzun fayl iki şeyi gizlədir: birincisi, faylın **birdən çox iş gördüyünü**; ikincisi, hansısa hissəsinin **başqa yerdə də lazım olduğunu**. Ölçü limiti bu ikisini üzə çıxaran bir siqnaldır.

Limit aşılanda iki alət var, bu sıra ilə:
1. **Alt-komponenti öz qovluğuna çıxar.** `ProfileScreen` belə `ProfileHeader` + `ProfileMenu`-ya bölünüb.
2. **Məntiqi `hooks/`-a çıxar.** `CategoryProductsScreen` belə `useCategoryProductsScreen` + `useCategoryProductsData`-ya bölünüb.

Komponent olmayan böyük modullar isə **ölçüyə görə yox, rola görə** bölünür. `basket.store.ts` bunun nümunəsidir:

| Fayl | Rolu |
|---|---|
| `basket.store.ts` | Store-un özü və action-lar |
| `basket.helpers.ts` | Saf riyaziyyat (miqdar artır/azalt, tap, sırala) |
| `basket.sync.ts` | Şəbəkə ilə sinxronizasiya (debounce) |
| `basket.toasts.ts` | Bildiriş mətnləri |

Diqqət: "birinci 110 sətir bir fayla, qalanı o birinə" **deyil**. Hər faylın bir cümləlik izahı var.

**Yeganə bilərəkdən istisna:** `shared/components/BottomSheet/BottomSheet.tsx` — 114 sətir. Bölünsə, jest məntiqi ilə animasiya məntiqi bir-birindən ayrılardı, halbuki onlar bir-birinə sıx bağlıdır. Bölmək oxunaqlılığı **artırmayacaqdı**, ona görə toxunulmayıb.

### `.constants.ts` niyə YOXDUR?

`.styles.ts` və `.types.ts` var — məntiqən `.constants.ts` da olmalı deyilmi?

**Xeyr, və bu şüurlu şəkildə rədd edilib.**

Səbəb: bu layihədəki lokal sabitlərin əksəriyyəti **bir dəfə işlədilən, bir sətirlik** dəyərlərdir — məsələn axtarış üçün debounce müddəti, ya default şəkil URL-i. Onları ayrı fayla köçürmək oxucunu sabitin **işlədildiyi yerdən uzaqlaşdırır**. "Bu 300 rəqəmi nədir?" sualının cavabı yan sətirdə olmalıdır, başqa faylda yox.

Qayda belədir:

| Sabit növü | Yeri |
|---|---|
| Stil obyektinə birbaşa girir (`CARD_WIDTH`, `HORIZONTAL_PADDING`) | `.styles.ts` |
| Məntiqdə/JSX-də işlədilir (debounce müddəti, fallback URL) | `.tsx`-in içində |

### İkonlar niyə ayrı qovluqdadır?

`src/shared/icons/` — bütün SVG ikonlar burada, istifadə sahəsinə görə qruplaşdırılmış:

```
icons/
├── navigation.tsx   ← HomeIcon, SearchIcon, ArrowLeftIcon...
├── actions.tsx      ← PlusIcon, TrashIcon, EyeIcon...
├── shopping.tsx     ← CartIcon, HeartIcon...
├── account.tsx      ← UserIcon, SettingsIcon...
├── contact.tsx      ← WhatsAppIcon, FacebookIcon, MailIcon
├── icon.types.ts    ← IconProps
└── index.ts         ← hamısını export * edir
```

Üç qərar var:

1. **Hər ikon üçün ayrı qovluq YOXDUR.** Hər ikon cəmi 5-10 sətirdir və heç vaxt tək-tək import olunmur. 40 ikon üçün 40 qovluq açmaq mənasız bürokratiya olardı.
2. **`shared/components/` altında DEYİL.** İkonlar öz stil/tip üçlüyü olan komponentlər deyil — paylaşılan **asset dəstidir**.
3. **`@shared/icons` yeganə import yoludur.** Qrup faylını birbaşa import etmək (`@shared/icons/actions`) **qadağandır**, çünki qruplaşdırma daxili detaldır — bir ikon sabah başqa qrupa köçə bilər.

---

## Hissə 7: Tiplər sistemi

### `types/api.ts` — backend ilə "müqavilə"

Bu fayl, backend-in qaytardığı hər obyektin TypeScript güzgüsüdür. Burada yazılanlar **söz** deyil, **öhdəlikdir**: kod boyu hər yerdə bu formalara güvənilir.

```ts
export interface ApiEnvelope<T> {
  message: string;
  data: T;
  result: boolean;
}
```

Bu, backend-in ən çox işlətdiyi cavab **zərfidir**. Əsl məlumat `data` sahəsinin içindədir. Generic olması vacibdir — eyni zərf forması hər endpoint üçün yenidən yazılmır.

**Domain tipləri backend-in adlarını olduğu kimi saxlayır:**

```ts
export interface UserProfile {
  full_name: string;    // camelCase-ə çevrilməyib
  img_url: string | null;
  created_at: string;
}
```

`full_name` → `fullName` çevirməsi **qəsdən edilməyib**. Belə bir çevirmə qatı yazsaydıq, hər sahə üçün əlavə kod, əlavə test sahəsi və əlavə səhv ehtimalı yaranardı — əvəzində isə yalnız estetik bir qazanc alardıq. Kiçik layihədə bu, ödəməyə dəyməz.

### `types/navigation.ts` — ekranların xəritəsi

```ts
export type RootStackParamList = {
  Welcome: undefined;
  Register: undefined;
  Login: undefined;
  Main: NavigatorScreenParams<ProtectedTabParamList> | undefined;
  Basket: undefined;
  Checkout: undefined;
  OrderSuccess: { orderNumber: string };
  Campaigns: undefined;
};
```

Hər açar bir ekran adıdır; dəyəri isə **o ekrana keçərkən ötürülməli məlumatın tipidir**.

- `undefined` — "bu ekran heç nə gözləmir". `navigation.navigate('Basket')` kifayətdir.
- `{ orderNumber: string }` — "bu ekran məlumat **tələb edir**". `navigation.navigate('OrderSuccess')` yazsanız, TypeScript xəta verir; `navigation.navigate('OrderSuccess', { orderNumber: order.orderNumber })` yazmalısınız.

Bu, sadəcə formallıq deyil. `OrderSuccessScreen` sifariş nömrəsini ekranda göstərir və bildirişə qoyur — nömrə gəlməsə, ekran boş qalar. Tip sistemi bu səhvi **mümkünsüz** edir.

```ts
export type HomeStackParamList = {
  HomeMain: undefined;
  CategoryProducts: { categoryId: number; categoryName: string };
};
```

Faydası ekranın içində görünür: `route.params.categoryId` yazanda TypeScript bunun **mütləq** `number` olduğunu bilir. `route.params?.categoryId` kimi qorunma yazmağa ehtiyac qalmır.

**İç-içə naviqasiya necə yazılır?**

```ts
navigation.navigate('Main', {
  screen: 'Profile',
  params: { screen: 'OrderHistory' },
});
```

Oxunuşu: "kök stack-də `Main`-ə get → orada `Profile` tabına keç → o tabın stack-ində `OrderHistory` ekranını aç".

`NavigatorScreenParams<...>` tipi bu üç səviyyənin hər birini ayrıca yoxlayır. Ekran adında yazı səhvi etsəniz, compile zamanı tutulur.

### `types/svg.d.ts` və `types/images.d.ts` — "ambient" bəyanatlar

TypeScript öz-özünə `.svg` faylının nə olduğunu **bilmir** — o, kod faylı deyil axı.

```ts
declare module '*.svg' {
  import type { FC } from 'react';
  import type { SvgProps } from 'react-native-svg';
  const content: FC<SvgProps>;
  export default content;
}
```

Bu bəyanat TypeScript-ə deyir: "kimsə `.svg` import edərsə, onu React komponenti say".

Diqqət: bu, yalnız **tip tərəfidir**. Faylı həqiqətən komponentə çevirən başqa mexanizmdir — `react-native-svg-transformer`, Metro səviyyəsində (bax Hissə 17).

Yəni iki müstəqil sistem paralel işləyir:

| Sistem | Nə edir | Bilməsə nə olar |
|---|---|---|
| `svg.d.ts` | TypeScript-ə tipi deyir | Redaktorda qırmızı xətt, `tsc` xətası |
| `svg-transformer` | Faylı əsl komponentə çevirir | Tətbiq runtime-da çökər |

İkisi də lazımdır; biri o birini əvəz etmir.

---

## Hissə 8: Giriş nöqtələri

Tətbiq açılanda kod hansı sıra ilə işə düşür? Bu sual göründüyündən vacibdir, çünki bu layihədə açılış sırası bir neçə **real bug**-un səbəbi olub.

Zəncir belədir:

```
index.js  →  App.tsx  →  Providers  →  AppShell  →  RootNavigator
```

Gəlin hər halqaya ayrıca baxaq.

### 1. `index.js` — əsl başlanğıc

```js
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

Bu, React Native-in tələb etdiyi qeydiyyatdır: "tətbiqin adı budur, kök komponenti də budur".

Niyə `.js`, `.tsx` deyil? Çünki bu fayl React Native şablonundan gəlir və heç bir tip məntiqi daşımır — sadəcə iki sətir qeydiyyat.

> **Qeyd:** əgər gələcəkdə **fonda** işləyən bir bildiriş handler-i əlavə olunarsa, onun qeydiyyatı məhz burada, `registerComponent`-dən **əvvəl** olmalıdır — `App.tsx`-in içində yox. Səbəb: tətbiq tam bağlı ikən gələn bildiriş React ağacı **ümumiyyətlə qurulmamış** icra olunur, komponentin içindəki qeydiyyat isə o an hələ mövcud olmur. Hazırda layihədə belə bir handler yoxdur (bütün bildirişlər tətbiq açıq ikən planlaşdırılır, bax Hissə 21).

### 2. `App.tsx` — nazik giriş komponenti

Bu fayl qəsdən **çox qısadır**. Onun işi tətbiqi qurmaq deyil, qurulma addımlarını **sıraya düzmək**:

```tsx
import AnimatedSplashScreen from './src/shared/components/AnimatedSplashScreen';
import AppShell from './src/app/AppShell';
import Providers from './src/app/Providers';
import useAppBootstrap from './src/app/hooks/useAppBootstrap';
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
```

Burada üç şey baş verir. Hər birinə ayrıca baxaq.

#### (a) İki "yan-təsir import-u"

```ts
import './src/shared/config/sentry';
import './src/shared/i18n/i18n';
```

Diqqət edin: bu import-lar **heç nə götürmür**. Nə `{ }` var, nə də dəyişən adı. Belə import-a "yan-təsir import-u" deyilir: məqsəd faylı **işə salmaqdır**, ondan nəsə almaq yox.

Niyə belə yazılıb?

| Fayl | İçində nə var | Niyə ən əvvəldə işləməlidir |
|---|---|---|
| `sentry.ts` | `Sentry.init(...)` | Tətbiqin **ilk anlarında** baş verən çökmə də qeydə alınsın deyə. Sonra çağırılsa, o çökmələr itir |
| `i18n/i18n.ts` | `i18next.init(...)` (sinxron) | **İlk render** artıq düzgün dildə olsun deyə. Sonra qurulsa, ekran bir an ingiliscə/açarsız yanıb-sönər |

Niyə bunlar `App()` funksiyasının içində çağırılmır? Çünki funksiyanın içindəki kod yalnız komponent **render olanda** işləyir — yəni gec. Modul import-ları isə komponent kodundan **əvvəl** icra olunur. JavaScript modul sistemi bu sıralamanı **zəmanətlə** verir; biz onu təsadüfə buraxmırıq.

#### (b) `useAppBootstrap` — iki "qapı"

```ts
export default function useAppBootstrap() {
  const [tokenReady, setTokenReady] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    initTokenStorage().then(() => setTokenReady(true));
  }, []);

  const finishSplash = useCallback(() => setSplashDone(true), []);

  return { tokenReady, splashDone, finishSplash };
}
```

İki bayraq var, hər biri bir "qapı"dır:

**`tokenReady`** — token anbarı hazırdırmı?

Niyə gözləmək lazımdır? Çünki token-lər şifrələnmiş MMKV-də saxlanılır, şifrələmə açarı isə telefonun Keychain/Keystore-undadır. Keychain-dən oxumaq **asinxrondur** — dərhal cavab vermir (bax Hissə 10).

Bu gözləmə bitməmiş `getAccessToken()` çağırmaq **xəta atır**. `RootNavigator` isə ilk ekranı məhz o funksiya ilə seçir. Yəni bu qapı olmasa, tətbiq hər açılışda çökərdi.

**`splashDone`** — açılış animasiyası bitibmi?

`AnimatedSplashScreen` (səbətin cizilməsi → meyvələrin düşməsi → "TIKTAK" yazısı → sönmə) təxminən 2.5 saniyə çəkir.

#### (c) İki qapı bir-birinə necə bağlıdır?

Bu, ən zərif hissədir:

```tsx
<AnimatedSplashScreen ready={tokenReady} onFinish={finishSplash} />
```

Animasiya `ready` **doğru olana qədər başlamır**. Nəticədə:

- Keychain oxuması **sürətli** olsa (adi hal) — animasiya dərhal başlayır, istifadəçi 2.5 saniyəlik gözəl açılış görür.
- Keychain oxuması **yavaş** olsa — animasiya bir az gec başlayır, yəni gözləmə **uzanır**, amma heç nə pozulmur.

Alternativ nə olardı? Animasiya ilə Keychain oxumasını **paralel** buraxmaq. O zaman yavaş telefonda animasiya bitər, amma token hələ hazır olmazdı — və tətbiq ya çökər, ya da ağ ekranda donardı.

Burada məntiq belədir: `splashDone` **heç vaxt** `tokenReady`-dən əvvəl doğru ola bilməz. Yəni ekranda əsl UI görünəndə token anbarının hazır olduğu **zəmanətlidir**.

### 3. `Providers.tsx` — provider zənciri

"Provider" — bütün alt ağaca nəsə paylayan komponentdir. Onları **soğanın qatları** kimi düşünün: hər qat içindəkilərə bir imkan verir.

```tsx
function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
          <GestureHandlerRootView style={styles.root}>
            <KeyboardProvider>
              <SafeAreaProvider>{children}</SafeAreaProvider>
            </KeyboardProvider>
          </GestureHandlerRootView>
        </PersistQueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
```

Hər qatın işi:

| Qat | Nə verir |
|---|---|
| `ThemeProvider` | Rənglər və qaranlıq rejim (`useTheme()`) |
| `ErrorBoundary` | Çökmə tutucusu — ağ ekran əvəzinə "nəsə səhv oldu" göstərir |
| `PersistQueryClientProvider` | Server məlumatı keşi + onun diskə yazılması |
| `GestureHandlerRootView` | Jest (barmaq hərəkəti) sisteminin kökü |
| `KeyboardProvider` | Klaviatura hadisələrinin dəqiq izlənməsi |
| `SafeAreaProvider` | Notch/status bar ölçüləri |

**Sıra təsadüfi deyil.** Bir qərara xüsusi diqqət:

```
ThemeProvider → ErrorBoundary   ✅ (belədir)
ErrorBoundary → ThemeProvider   ❌ (belə deyil)
```

Niyə `ThemeProvider` **çöldədir**?

Çünki `ErrorBoundary` çökmə baş verəndə öz ehtiyat ekranını göstərir, o ekranda isə `<Button>` var, `Button` isə daxilində `useTheme()` çağırır. Əgər `ThemeProvider` `ErrorBoundary`-nin **içində** olsaydı, çökmə anında o da dağılardı — yəni **xəta ekranının özü də çökərdi**. Nəticə: istifadəçi heç nə görməzdi.

Tərsinə düzülüş bunu həll edir: tema qatı ən çöldədir, ona görə aşağıdakı hər şey dağılsa belə **sağ qalır**.

Bəs `ThemeProvider` özü çöksə? O ehtimal qəbul edilib, çünki `ThemeProvider` çox sadədir — bir neçə `useState` və `useEffect`. Onu qorumaq üçün daha bir qat əlavə etmək, qorunan şeydən daha mürəkkəb olardı.

### 4. `AppShell.tsx` — niyə ayrıca komponent?

```tsx
function AppShell() {
  const { isDark, colors } = useTheme();
  const navigationTheme = useMemo(
    () => buildNavigationTheme(isDark, colors),
    [isDark, colors],
  );

  return (
    <>
      <StatusBar translucent backgroundColor="transparent"
        barStyle={isDark ? 'light-content' : 'dark-content'} />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <RootNavigator />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}
```

Sual: bu kodu niyə birbaşa `App()`-in içinə yazmırıq?

Cavab bir sətirdədir: `const { isDark, colors } = useTheme();`

`useTheme()` yalnız `ThemeProvider`-in **içində** işləyə bilər. `App()` isə `ThemeProvider`-dən **kənardadır** (o, `Providers`-i render edən komponentdir, onun içində deyil).

Yəni `AppShell` sırf bu səbəbdən mövcuddur: temaya ehtiyacı olan kodu, temanın mövcud olduğu yerə **bir səviyyə aşağı** endirmək.

Bu komponent üç şey qurur:

1. **`StatusBar`** — yuxarıdakı saat/batareya zolağının rəngi. Qaranlıq rejimdə ağ ikonlar, işıqlıda qara.
2. **`NavigationContainer`** — bütün naviqasiyanın kökü. `theme={navigationTheme}` vacibdir: React Navigation ekran fonlarını **öz** palitrasından çəkir, ona görə bizim rəngləri ona ayrıca vermək lazımdır (`navigationTheme.ts`). Verməsək, tema dəyişəndə naviqasiyaya aid səthlər köhnə rəngdə qalar.
3. **`<Toast />`** — bildiriş komponenti. Ən sonda, hər şeyin **üstündə** durur ki, toast-lar bütün ekranların üzərində görünsün.

### `navigationRef` — komponent olmayan yerdən naviqasiya

```ts
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function resetToWelcome() {
  if (navigationRef.isReady()) {
    navigationRef.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  }
}
```

Problem belədir: `httpClient.ts` (axios konfiqurasiyası) sessiya bitəndə istifadəçini Welcome ekranına atmalıdır. Amma `httpClient.ts` bir **komponent deyil** — orada `useNavigation()` çağırmaq mümkün deyil, çünki hook-lar yalnız komponent daxilində işləyir.

Həll: naviqasiyaya modul səviyyəsində bir "tutacaq" (ref) yaratmaq və onu `NavigationContainer`-ə vermək. Bundan sonra **istənilən** fayl `resetToWelcome()` çağıra bilər.

`isReady()` yoxlaması niyə var? Çünki tətbiqin ilk millisaniyələrində naviqasiya hələ qurulmamış ola bilər. O anda `reset()` çağırsaq, xəta alarıq. Bu yoxlama isə sadəcə səssizcə keçir — və düzgün davranış budur: tətbiq hələ açılmayıbsa, istifadəçini heç yerə atmağa ehtiyac yoxdur.

---

## Hissə 9: Naviqasiya

### Əvvəlcə iki anlayış: Stack və Tab

**Stack (yığın)** — kağız dəstəsi kimi. Yeni ekran **üstünə qoyulur**, geri düyməsi üstdəkini **götürür**. Alt ekranlar yerində qalır.

**Tab (nişan)** — aşağıdakı düymələr. Hər tab **yan-yana** yaşayır, biri o birini örtmür; tab dəyişəndə heç nə "yığılmır".

Bu layihədə hər ikisi işlədilir, üstəlik **iç-içə**.

### Naviqasiya ağacı

```
RootNavigator (stack)
├── Welcome
├── Register
├── Login
├── Main  ──────────────► BottomTabNavigator (tab)
│                          ├── Home  ────────► HomeStackNavigator (stack)
│                          │                    ├── HomeMain
│                          │                    └── CategoryProducts
│                          ├── Search
│                          └── Profile ──────► ProfileStackNavigator (stack)
│                                               ├── ProfileMain
│                                               ├── AccountInfo
│                                               ├── MyLists
│                                               ├── OrderHistory
│                                               ├── Settings
│                                               └── Support
├── Basket
├── Checkout
├── OrderSuccess
└── Campaigns
```

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
      {/* ... */}
    </Stack.Navigator>
  );
}
```

**`initialRouteName` — ən vacib sətir.**

`getAccessToken()` tokeni qaytarırsa, istifadəçi əvvəlcədən daxil olub → birbaşa `Main`-ə. Yoxdursa → `Welcome`-a.

Bu, adi **sinxron** funksiya çağırışıdır. `await` yoxdur, `useEffect` yoxdur, "yüklənir" ekranı yoxdur.

Bu necə mümkündür, halbuki Hissə 8-də token anbarının **asinxron** qurulduğunu dedik?

Cavab: `App.tsx` `splashDone` doğru olana qədər `AppShell`-i (deməli `RootNavigator`-u da) **ümumiyyətlə render etmir**. Yəni bu sətir icra olunanda anbar **artıq hazırdır**. Asinxronluq bir dəfə, açılışda "ödənilib", ondan sonra bütün oxumalar sinxrondur.

Bu, layihədəki ən vacib arxitektura bağlantılarından biridir: **iki fayl bir-birindən uzaqdır, amma biri o birinin şərtinə güvənir.** Ona görə `App.tsx`-dəki qapını sökmək — burada gizli bir çökmə yaradar.

**`headerShown: false`** — React Navigation-un hazır başlıqları söndürülüb. Səbəb: layihənin öz başlıq komponentləri var (`AppHeader`, `ScreenHeader`), dizayna tam uyğun.

**`animation: 'fade_from_bottom'`** — bütün keçidlərin ortaq animasiyası.

### `BottomTabNavigator.tsx` — bir incə tələ

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

Diqqət: `tabBar={renderTabBar}` yazılıb, `tabBar={TabBar}` **yox**. Fərq həyati əhəmiyyətlidir.

React Navigation `tabBar` prop-unu **adi funksiya kimi çağırır**: `tabBar(props)`. JSX kimi render etmir.

Əgər ora birbaşa `TabBar` komponentini versəydik, o, React-in render mexanizmindən **kənarda** çağırılardı. Nəticədə `TabBar`-ın içindəki `useTheme()`, `useSafeAreaInsets()`, `useTranslation()` hook-ları "komponent xaricində çağırıldı" xətası verərdi.

`renderTabBar` isə bir sarğıdır: o, funksiya kimi çağırılır, amma **JSX qaytarır** (`<TabBar {...props} />`). JSX qaytarıldığı üçün React `TabBar`-ı öz mexanizmi ilə render edir və hook-lar düzgün işləyir.

Bir incəlik də var: `renderTabBar` **modul səviyyəsində** (komponentdən kənarda) yazılıb. Əgər `BottomTabNavigator`-un içində yazılsaydı, hər render-də yeni funksiya yaranardı və React Navigation "tab bar dəyişdi" deyib onu lazımsız yerə yenidən qurardı.

### `TabBar.tsx` — xüsusi tab paneli

Standart tab bar əvəzinə öz komponentimiz var. İçində iki maraqlı qərar var.

**1. Etiketlər komponentin İÇİNDƏ qurulur, ikonlar isə çöldə:**

```ts
const ICONS = {
  Home: HomeIcon,
  Search: SearchIcon,
  Profile: UserIcon,
} as const;                                    // ← modul səviyyəsində

function TabBar({ state, navigation }: BottomTabBarProps) {
  const { t } = useTranslation();
  const labels: Record<keyof typeof ICONS, string> = {
    Home: t('tabBar.home'),
    Search: t('tabBar.search'),
    Profile: t('tabBar.profile'),
  };                                           // ← komponent daxilində
```

Niyə fərqli yerlərdə? Çünki `t()` funksiyası **hook-dan gəlir** (`useTranslation()`), hook isə yalnız komponent daxilində çağırıla bilər.

Üstəlik bunun praktiki faydası var: dil dəyişəndə komponent yenidən render olunur və etiketlər **avtomatik** yenilənir. Modul səviyyəsində yazsaydıq, tətbiq açılan andakı dildə donub qalardı.

İkonlar isə dildən asılı deyil — ona görə bir dəfə, modul səviyyəsində qurulur.

**2. Tab-a basanda daxili stack-i sıfırlamaq:**

```ts
const INITIAL_SCREEN: Partial<Record<keyof typeof ICONS, string>> = {
  Home: 'HomeMain',
  Profile: 'ProfileMain',
};

function handlePress() {
  const initialScreen = INITIAL_SCREEN[route.name as keyof typeof INITIAL_SCREEN];
  if (initialScreen) {
    navigation.navigate(route.name, { screen: initialScreen } as never);
  } else {
    navigation.navigate(route.name);
  }
}
```

Bu, faylda şərhlə izah olunmuş real bir problemin həllidir.

Ssenari: istifadəçi Hesabım tabındadır, oradan "Sifarişlərim"ə keçib. İndi aşağıdakı **Hesabım** düyməsinə yenidən basır. Gözlənti: profil əsas səhifəsinə qayıtsın.

Amma sadə `navigate('Profile')` bunu **etmir** — tab onsuz da aktivdir, heç nə dəyişmir, istifadəçi "Sifarişlərim"də qalır.

Standart tab bar-da bu işləyir, çünki kitabxana öz `tabPress` hadisəsinə reaksiya verib stack-i sıfırlayır. Bizim öz tab bar-ımız isə sadəcə `navigate()` çağırır — o hadisə baş vermir.

Həll: hansı tabın ilkin ekranı olduğunu açıq yazmaq və birbaşa ora getmək. `Search` tabının daxili stack-i olmadığı üçün cədvəldə yoxdur — ona görə `Partial<>` işlədilib.

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

Diqqət: `<AppHeader />` `Stack.Navigator`-un **içində deyil, üstündədir**.

Niyə? Çünki "TIK TAK" logosu və səbət ikonu **bütün Home tabına** aiddir, ayrı-ayrı ekranlara yox. Navigator-un içinə qoysaydıq, hər ekran öz nüsxəsini render edərdi — ekran keçidində başlıq da **animasiya ilə sürüşərdi**, halbuki o, yerində sabit qalmalıdır.

İndiki quruluşda yalnız aşağıdakı ekran hissəsi dəyişir, başlıq tərpənmir.

`gestureEnabled: false` — `CategoryProducts` ekranında "sağa sürüşdürüb geri qayıtma" jesti söndürülüb, çünki o ekranda üfüqi sürüşən kateqoriya çipləri var və iki jest bir-birinə qarışırdı.

### `ProfileStackNavigator.tsx`

Sadə stack — altı ekran, əlavə məntiq yoxdur:

```tsx
<Stack.Screen name="ProfileMain" component={ProfileScreen} />
<Stack.Screen name="AccountInfo" component={AccountInfoScreen} />
<Stack.Screen name="MyLists" component={MyListsScreen} />
<Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
<Stack.Screen name="Settings" component={SettingsScreen} />
<Stack.Screen name="Support" component={SupportScreen} />
```

Bu ekranların hər biri `ScreenHeader` (geri düyməsi + başlıq) işlədir — `AppHeader`-dən fərqli olaraq, bu, hər ekranın **öz** başlığıdır.

### `navigate()` vs `reset()` — vacib fərq

İki metod var və birini o birinin yerinə işlətmək real bug yaradıb.

| Metod | Nə edir |
|---|---|
| `navigate('X')` | X onsuz da stack-dədirsə, ona **qayıdır**; deyilsə, üstünə **əlavə edir** |
| `reset({...})` | Bütün stack-i **atır**, yerinə yenisini qoyur |

`reset()` iki yerdə işlədilir və hər ikisində səbəb eynidir: **geriyə yol qalmamalıdır**.

**1. Girişdən sonra** (`useLoginForm.ts`):

```ts
navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
```

`navigate('Main')` yazsaydıq, Login ekranı stack-də qalardı — istifadəçi geri düyməsinə basıb yenidən giriş formasına düşərdi, halbuki artıq daxil olub.

**2. Sifariş verildikdən sonra** (`OrderSuccessScreen`):

```ts
navigation.reset({ index: 0, routes: [{ name: 'Main', params: {...} }] });
```

Bu, real bir bug-ın həllidir. Əvvəllər burada `navigate()` yazılmışdı. Nəzəri olaraq `navigate` mövcud `Main` ekranına qayıtmalı və üstündəki hər şeyi (`Basket`, `Checkout`, `OrderSuccess`) atmalı idi.

Praktikada isə **etibarlı işləmədi**: istifadəçi sifariş verdikdən, bir az gəzdikdən sonra geri düyməsinə təkrar-təkrar basanda "Sifarişiniz göndərildi" ekranına yenidən düşə bilirdi. Halbuki o ekran birdəfəlikdir — ora **qayıtmaq mümkün olmamalıdır**.

Səbəb: iç-içə navigator-larda param ötürüləndə `navigate`-in "mövcud ekrana qayıt" davranışı həmişə gözlənildiyi kimi işləmir.

**Dərs:** hər hansı "əməliyyat bitdi" ekranı üçün əvvəldən `reset()` işlədin, `navigate()`-in gizli davranışına güvənməyin.

---

## Hissə 10: Autentifikasiya

### Əvvəlcə: token nədir?

Serverə "mən Xəyyaməm" deməyin yolu var: hər sorğuda istifadəçi adı və şifrə göndərmək. Amma bu **pisdir** — şifrə hər dəfə şəbəkədən keçir, üstəlik tətbiq onu haradasa saxlamalı olur.

Əvəzinə **token** işlədilir. Məntiq belədir:

1. Bir dəfə telefon nömrəsi + şifrə göndərirsiniz.
2. Server sizə iki "bilet" verir:
   - **access token** — qısa ömürlü (məsələn 15 dəqiqə). Hər sorğuda göndərilir.
   - **refresh token** — uzun ömürlü. Yalnız yeni access token almaq üçün işlədilir.
3. Şifrə bir daha lazım olmur.

Niyə iki bilet? Çünki access token oğurlansa, oğru yalnız 15 dəqiqə istifadə edə bilər. Refresh token isə nadir hallarda şəbəkədən keçir, yəni oğurlanma ehtimalı azdır.

### `tokenStorage.ts` — token-lər harada saxlanılır?

Token-lər `react-native-mmkv` ilə telefonun yaddaşına yazılır. Amma **şifrələnmiş** şəkildə:

```ts
storage = createMMKV({
  id: 'tiktak-storage',
  encryptionKey,
  encryptionType: 'AES-256',
});
```

Burada dərhal bir sual yaranır: **şifrələmə açarını harada saxlayaq?**

Əgər açarı kodun içində sabit kimi yazsaydıq (`const KEY = 'abc123'`), şifrələmə **mənasız** olardı — APK-nı açan hər kəs açarı da tapardı, şifrələnmiş faylı da açardı. Sanki qapını kilidləyib açarı qapının üstündən asmaq.

Həll: açarın özünü telefonun **öz təhlükəsizlik anbarında** saxlamaq — Android Keystore / iOS Keychain:

```ts
async function getOrCreateEncryptionKey(): Promise<string> {
  const existing = await Keychain.getGenericPassword({ service: KEYCHAIN_SERVICE });
  if (existing) {
    return existing.password;
  }
  const key = generateEncryptionKey();
  await Keychain.setGenericPassword('tiktak', key, { service: KEYCHAIN_SERVICE });
  return key;
}
```

Məntiq: "anbarda açar varmı? Varsa götür. Yoxsa təsadüfi yeni açar yarat, anbara qoy, sonra götür."

Yəni açar **ilk açılışda bir dəfə** yaranır, sonra həmişə eyni qalır. Əgər hər dəfə yeni açar yaransaydı, əvvəlki dəfə yazılmış token-ləri oxumaq mümkün olmazdı.

### Bunun bir bahası var: modul artıq sinxron deyil

Keychain-ə müraciət **asinxrondur** — dərhal cavab vermir. Bu, bütün modulu dəyişdi:

```ts
export async function initTokenStorage(): Promise<void> {
  const encryptionKey = await getOrCreateEncryptionKey();
  storage = createMMKV({ /* ... */ });
  // ...
}

function requireStorage(): MMKV {
  if (!storage) {
    throw new Error('tokenStorage used before initTokenStorage() resolved');
  }
  return storage;
}
```

Yəni: `initTokenStorage()` **bir dəfə** gözlənilməlidir, ondan əvvəl heç bir funksiya işləmir.

`requireStorage()` bu qaydanı **açıq xəta ilə** qoruyur. Bu, şüurlu bir seçimdir: səssizcə `null` qaytarsaydı, səhv gec üzə çıxardı və səbəbi tapmaq çətin olardı. Açıq xəta isə problemi dərhal, düz yerində göstərir.

**Vacib nüans:** yalnız **quraşdırma** asinxrondur. Ondan sonra:

```ts
export function getAccessToken(): string | null {
  return requireStorage().getString(ACCESS_TOKEN_KEY) ?? null;
}
```

Bu, tam **sinxron** funksiyadır — `async` yoxdur, `await` yoxdur. Məhz buna görə `RootNavigator` ilk ekranı bir sətirdə seçə bilir (bax Hissə 9).

Yəni: **asinxronluq bir dəfə, açılışda ödənilir; qalan bütün ömür boyu oxumalar dərhaldır.**

### "Sessiyanı aktiv saxla" (Remember me) necə işləyir?

`LoginScreen`-də bir checkbox var, **default olaraq işarəsizdir**. İşarələnməsə, istifadəçi tətbiqi tam bağlayanda çıxış etmiş sayılmalıdır.

Bunu necə etmək olar? Ağla gələn ilk həll: token-ləri diskə **ümumiyyətlə yazmamaq**, yaddaşda saxlamaq. Amma bu, ayrıca bir "yalnız-yaddaş" kod yolu tələb edir — yəni iki paralel saxlama mexanizmi.

Layihədəki həll daha sadədir:

```ts
export async function initTokenStorage(): Promise<void> {
  // ...
  if (!getRememberMe()) {
    clearTokens();
  }
}
```

Tərcüməsi: "anbar hazır olan kimi yoxla — istifadəçi 'məni xatırla' deməyibsə, köhnə token-ləri sil."

Bu, niyə **düz işləyir**? Çünki `initTokenStorage()` yalnız tətbiq prosesi **yenidən başlayanda** çağırılır.

| Hadisə | JS modulu yenidən yüklənirmi? | Nəticə |
|---|---|---|
| Tətbiqi fona atmaq | Xeyr, proses yaşayır | Token qalır ✅ |
| Başqa tətbiqə keçib qayıtmaq | Xeyr | Token qalır ✅ |
| Tətbiqi tam bağlamaq və yenidən açmaq | **Bəli** | Token silinir ✅ |

Yəni "yalnız tətbiqi həqiqətən bağlayana qədər daxil qal" semantikası, **bir `if` bloku** ilə alınır.

**Bir güzəşt var və o, şüurludur:** checkbox işarəsiz olsa belə, token-lər diskə **qısa müddət yazılır** (növbəti soyuq açılışda silinir). Nəzəri olaraq bu, mükəmməl deyil. Amma "yalnız-yaddaş" alternativi iki paralel saxlama yolu deməkdir — bu tətbiqin təhlükəsizlik tələbi isə o mürəkkəbliyi əsaslandırmır. Bu, gizlədilmiş bir qüsur deyil, **açıq şəkildə qəbul edilmiş** bir güzəştdir.

### Layihədə DÖRD ayrı MMKV anbarı var — niyə?

| Anbar | Nə saxlayır | Şifrəli? | Sinxron qurulur? |
|---|---|---|---|
| `tiktak-storage` | Token-lər, remember-me | **Bəli** | Xeyr (Keychain gözləyir) |
| `tiktak-settings` | Qaranlıq rejim, dil | Xeyr | Bəli |
| `tiktak-search-history` | Son axtarışlar (max 10) | Xeyr | Bəli |
| `tiktak-query-cache` | Server cavablarının keşi | Xeyr | Bəli |

Niyə hamısı bir anbarda deyil?

**1. Şifrələmənin qiyməti var.** Şifrəli anbar Keychain gözləməsi tələb edir. Dil seçimini şifrələsəydik, tətbiqin açılışı **daha yavaş** olardı — heç bir təhlükəsizlik qazancı olmadan. Dilin hansı olduğu sirr deyil.

**2. Ömürləri fərqlidir.** Çıxış edəndə token-lər silinir, amma qaranlıq rejim seçimi **silinməməlidir** — istifadəçi çıxış etdi deyə tətbiqin rəngi dəyişməməlidir. Ayrı anbarlar bunu təbii şəkildə həll edir.

### `signup` və `login` niyə fərqli davranır?

`auth.service.ts`-də:

- **`login(payload, rememberMe)`** — cavabda token-lər gəlir, dərhal saxlanılır, istifadəçi daxil olur.
- **`signup(payload)`** — token **saxlamır**. Qeydiyyatdan sonra istifadəçi Login ekranına yönləndirilir və özü daxil olur.

Niyə belə? Çünki qeydiyyat "hesab yaratmaq"dır, "daxil olmaq" deyil. İstifadəçinin öz şifrəsi ilə bir dəfə daxil olması onun şifrəni **düzgün yadda saxladığını** təsdiqləyir — əks halda ilk çıxışdan sonra hesabına düşə bilməzdi.

---

## Hissə 11: API qatı

Bütün şəbəkə sorğuları **tək bir yerdən** keçir: `src/shared/api/httpClient.ts`.

Bu, təsadüfi deyil. Mərkəzi nöqtə olmasa, "hər sorğuya token əlavə et" qaydasını 40 fərqli yerdə təkrarlamalı olardıq — və birini unutmaq qaçılmaz olardı.

### `env.ts` — konfiqurasiya

```ts
export const BASE_URL = 'https://api.sarkhanrahimli.dev';
export const SENTRY_DSN = '...';
export const SUPPORT_WHATSAPP_NUMBER = '994702564317';
export const SUPPORT_FACEBOOK_URL = '...';
export const SUPPORT_EMAIL = '...';
```

Diqqət: `BASE_URL`-də `/api/tiktak` **yoxdur**. Onu `httpClient` özü əlavə edir. İkisini də yazsanız, ünvan `/api/tiktak/api/tiktak` olardı.

### Axios instansının qurulması

```ts
const httpClient = axios.create({
  baseURL: `${BASE_URL}/api/tiktak`,
});
```

`axios.create` bir "hazırlanmış" sorğu göndərən yaradır. Ondan sonra `httpClient.get('/basket')` yazmaq kifayətdir — tam ünvan avtomatik qurulur.

### Request interceptor — "hər sorğudan əvvəl"

**Interceptor nədir?** Sorğunun yolunun üstündə duran bir yoxlama məntəqəsi. Sorğu serverə çatmazdan əvvəl ordan keçir və dəyişdirilə bilər.

```ts
httpClient.interceptors.request.use(async config => {
  const token = await getAccessToken();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  config.headers.set('Accept-Language', getLanguage());
  return config;
});
```

İki şey əlavə edir:

1. **`Authorization: Bearer <token>`** — "mən buyam" biletini.
2. **`Accept-Language: az|en|ru`** — serverə hansı dildə cavab verməli olduğunu.

Dil hər sorğuda **təzədən oxunur**, `axios.create` anında bir dəfə deyil. Bu, faylda şərhlə də vurğulanıb. Səbəb: istifadəçi Tənzimləmələrdə dili dəyişəndə, **növbəti** sorğu artıq yeni dildə getsin. Bir dəfə "bişirilsəydi", dil dəyişikliyi yalnız tətbiq yenidən açılanda işə düşərdi.

### Response interceptor — avtomatik token yeniləməsi

Bu, faylın ən mürəkkəb və ən dəyərli hissəsidir. Problemi belə təsəvvür edin:

> İstifadəçi 20 dəqiqədir tətbiqdədir. Access token-in ömrü bitib. O, "Sifarişlərim"ə basır — server 401 (icazəsiz) qaytarır. İndi nə olmalıdır?

**Pis həll:** istifadəçini çıxarıb yenidən giriş tələb etmək. Hər 15 dəqiqədən bir yenidən şifrə yazmaq — dəhşətli təcrübə.

**Yaxşı həll:** arxa planda səssizcə yeni token almaq, həmin sorğunu **təkrarlamaq**, istifadəçinin heç nədən xəbəri olmamaq.

Kod məhz bunu edir:

```ts
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
    return httpClient(originalRequest);      // ← sorğunu təkrarla
  }

  await clearTokens();
  queryClient.clear();
  showErrorToast(i18n.t('apiError.sessionExpired'));
  resetToWelcome();
}
```

Dörd şərtin hər birinin öz səbəbi var:

**1. `status === 401`** — yalnız "icazəsiz" xətasında. 404 və ya 500 üçün token yeniləmək mənasızdır.

**2. `!originalRequest._retry`** — sonsuz döngənin qarşısını alır.

Təsəvvür edin: token yeniləndi, sorğu təkrarlandı, **yenə** 401 gəldi (məsələn server tərəfdə hesab bloklanıb). `_retry` bayrağı olmasaydı, kod yenidən yeniləyər, yenidən təkrarlayar — sonsuza qədər. Bayraq bunu bir cəhdlə məhdudlaşdırır.

**3. `!isAuthEndpoint`** — bu, faylda ən uzun şərhi olan sətirdir və real bir bug-ın həllidir.

```ts
const isAuthEndpoint = originalRequest?.url?.startsWith('/auth/');
```

Ssenari: istifadəçi giriş ekranında **səhv şifrə** yazır. Server 401 qaytarır.

Bu qorunma olmasaydı, kod bunu "sessiya bitdi" kimi başa düşərdi: token-ləri silər, "Sessiyanız bitib" toast-ı göstərər və istifadəçini Welcome ekranına atardı — halbuki o, sadəcə şifrəni səhv yazıb və hələ də giriş formasındadır.

Yəni: `/auth/*` endpoint-lərində 401 "sessiya bitdi" demək **deyil**, "məlumat səhvdir" deməkdir. İki tamam fərqli hal, tamam fərqli reaksiya tələb edir.

**4. Yeniləmə də alınmasa** — o zaman sessiya həqiqətən bitib. Dörd addım atılır:

| Addım | Niyə |
|---|---|
| `clearTokens()` | Yararsız token-lər saxlanmasın |
| `queryClient.clear()` | Keşdəki köhnə istifadəçinin məlumatı silinsin |
| `showErrorToast(...)` | İstifadəçi **niyə** çıxarıldığını bilsin |
| `resetToWelcome()` | Sınıq ekranda qalmasın |

Son iki addım sonradan əlavə olunub. Əvvəllər yalnız token-lər silinirdi — nəticədə istifadəçi işləməyən bir ekranda, heç bir izahat olmadan qalırdı. Bu, "texniki olaraq düzgün, insani olaraq yanlış" davranışın yaxşı nümunəsidir.

### Paralel 401-lər problemi və "in-flight promise" naxışı

Təsəvvür edin: əsas səhifə eyni anda **üç** sorğu göndərir (profil, kateqoriyalar, kampaniyalar). Token-in ömrü bitib — **üçü də** 401 alır.

Sadə yazılsaydı, üç ayrı yeniləmə sorğusu gedərdi. Bu pisdir: server üç dəfə yüklənir, üstəlik bəzi backend-lər refresh token-i bir dəfə işləndikdən sonra ləğv edir — yəni ikinci və üçüncü cəhd **uğursuz** olardı və istifadəçi səbəbsiz çıxarılardı.

Həll:

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

Məntiq: "yeniləmə **artıq gedirsə**, yenisini başlatma — gedənin nəticəsini gözlə".

Addım-addım:
1. Birinci 401 gəlir → `refreshPromise` boşdur → yeniləmə başlayır.
2. İkinci 401 gəlir → `refreshPromise` **doludur** → sadəcə ona qoşulur.
3. Üçüncü 401 → eyni şəkildə qoşulur.
4. Yeniləmə bitir → üçü də **eyni** yeni tokeni alır.
5. `finally` blokunda `refreshPromise` boşaldılır ki, növbəti dəfə yenidən işləsin.

Nəticə: üç sorğu, **bir** yeniləmə.

### Backend-in "sabit olmayan sabitliyi"

`docs/api.md` sənədində yazılıb ki, bəzi endpoint-lər cavabı zərfsiz (`{message, data}` olmadan) qaytarır.

**Praktikada bu doğru çıxmadı.** Üç dəfə, üç fərqli endpoint-də eyni hadisə yaşandı:

| Endpoint | Sənəd deyirdi | Əslində |
|---|---|---|
| `GET /basket` | Zərf yoxdur | Zərf **var** |
| `GET /orders/user` | Zərf yoxdur | Zərf **var** |
| `POST /orders/checkout` | Zərf yoxdur | Zərf **var** |

Hər dəfə eyni ssenari: kod sənədə güvənib yazılır → məlumat görünmür → uzun debug → xam cavabı `console.log` ilə çap edəndə zərfin orada olduğu görünür.

`GET /basket` halında simptom xüsusilə çaşdırıcı idi: məhsul əlavə edəndə say **dərhal görünürdü**, amma ekrandan çıxıb qayıdanda **yox olurdu**. Səbəb: əlavə etmə endpoint-i düzgün açılırdı, oxuma endpoint-i isə yox.

**Nəticə qayda:** yeni endpoint əlavə edəndə, sənədə güvənmək **əvəzinə**, cavabı bir dəfə xam şəkildə çap edin. Bu layihədə artıq bütün `orders/*` və `/basket` endpoint-lərinin zərfli olduğu təsdiqlənib.

---

## Hissə 12: Servislər

`src/shared/services/` — hər backend sahəsi üçün bir fayl:

| Fayl | Nəyə cavabdehdir |
|---|---|
| `auth.service.ts` | Giriş, qeydiyyat |
| `profile.service.ts` | Profili oxumaq/yeniləmək |
| `product.service.ts` | Məhsullar, favoritlər |
| `category.service.ts` | Kateqoriyalar |
| `campaign.service.ts` | Kampaniyalar |
| `basket.service.ts` | Səbət əməliyyatları |
| `order.service.ts` | Sifariş vermək, tarixçə |
| `upload.service.ts` | Fayl (avatar) yükləmək |
| `geocoding.service.ts` | Koordinatdan ünvan (Hissə 22) |

### Servis funksiyası nə edir?

Üç iş, həmişə eyni sırada:

```ts
export async function getBasket(): Promise<Basket> {
  const { data } = await httpClient.get<ApiEnvelope<Basket>>('/basket');
  return data.data;
}
```

1. Sorğunu göndərir.
2. Cavabın tipini bildirir (`<ApiEnvelope<Basket>>`).
3. **Zərfi açır** — `data.data` qaytarır, `data` yox.

Üçüncü addım vacibdir. Onun sayəsində servisi çağıran ekran zərfin varlığından **ümumiyyətlə xəbərsizdir**:

```ts
const basket = await getBasket();
basket.items;      // ✅ birbaşa
// basket.data.items — belə yazmaq lazım deyil
```

Yəni servis qatı bir **tərcüməçidir**: backend-in formasını tətbiqin gözlədiyi formaya çevirir. Sabah backend zərfi dəyişsə, düzəliş **bir faylda** edilir, 20 ekranda yox.

### `data.data` niyə iki dəfə "data"?

Bu, ilk baxışda çaşdırıcıdır. Səbəb: iki fərqli `data` var.

```ts
const { data } = await httpClient.get<ApiEnvelope<Basket>>('/basket');
//      ↑ axios-un cavab obyektinin "data" sahəsi = HTTP cavabının bədəni

return data.data;
//          ↑ zərfin öz "data" sahəsi = əsl səbət
```

Birincisi axios-dan gəlir (axios cavabı `{ data, status, headers, ... }` şəklindədir), ikincisi backend-in zərfindən.

### Bütün servislər eyni deyil

`product.service.ts`-də üç fərqli forma var:

```ts
// 1. Səhifələnmiş — zərf AÇILMIR, çünki pagination da lazımdır
export async function listProducts(params?): Promise<PaginatedEnvelope<Product>> {
  const { data } = await httpClient.get<PaginatedEnvelope<Product>>('/products', { params });
  return data;
}

// 2. Adi — zərf açılır
export async function getProduct(id: number): Promise<ProductDetail> {
  const { data } = await httpClient.get<ApiEnvelope<ProductDetail>>(`/products/${id}`);
  return data.data;
}

// 3. Cavab lazım deyil — heç nə qaytarılmır
export async function toggleFavorite(id: number): Promise<void> {
  await httpClient.post(`/products/${id}/favorite`);
}
```

Hər forma öz ehtiyacına uyğundur:
- `listProducts` — `pagination` sahəsi çağırana lazımdır, ona görə bütöv zərf qaytarılır.
- `getProduct` — yalnız məhsul lazımdır.
- `toggleFavorite` — server nəsə qaytarsa da, bizə lazım deyil; nəticəni ekran özü bilir (ürək dolu/boş).

### Admin endpoint-ləri niyə yoxdur?

`docs/api.md`-də admin endpoint-ləri (sifarişlərin idarəsi, statistika) sənədləşdirilib. Amma layihədə onlar üçün **servis faylı yoxdur**.

Səbəb sadədir: **admin ekranı da yoxdur**. İstifadə edilməyəcək kodu əvvəlcədən yazmaq — sonra köhnəlib heç kimin toxunmadığı ölü koda çevrilir. Lazım olanda yazılacaq.

---

## Hissə 13: State idarəetməsi — Zustand

### Niyə "qlobal" state lazımdır?

Səbətdəki məhsul sayı **eyni anda dörd yerdə** göstərilir:

- `AppHeader` — yuxarıdakı səbət ikonunun üstündəki rəqəm
- `ProductCard` — hər kartdakı "+ / −" sayğacı
- `BasketSummaryBar` — aşağıdakı üzən zolaq
- `BasketScreen` — səbətin özü

İstifadəçi bir yerdə "+"-a basanda **dördü də** dərhal yenilənməlidir.

Bunu adi `useState` ilə etmək olarmı? Nəzəri olaraq bəli, amma dəhşətli olardı: state ən yuxarı ortaq valideyndə (yəni demək olar tətbiqin kökündə) saxlanmalı, sonra props kimi 5-6 qat aşağı ötürülməli olardı. Buna **prop drilling** (props qazıntısı) deyilir — aralıqdakı komponentlərin heç birinə lazım olmayan məlumatı sırf "aşağı ötürmək" üçün qəbul etməsi.

**Qlobal store** bu problemi həll edir: məlumat komponent ağacından **kənarda** yaşayır, hər komponent birbaşa oradan oxuyur.

### Niyə Zustand, Redux yox?

Zustand-da store **bir funksiya çağırışıdır**:

```ts
export const useBasketStore = create<BasketState>((set, get) => ({
  basket: undefined,
  loading: false,
  error: undefined,
  fetchBasket: async () => { /* ... */ },
  addItem: async product => { /* ... */ },
  removeItem: async productId => { /* ... */ },
  clearBasket: async () => { /* ... */ },
}));
```

Redux-da eyni şey üçün action tipləri, action yaradıcıları, reducer-lər və tətbiqi əhatə edən `<Provider>` lazım olardı.

Oxumaq da sadədir:

```ts
const basket = useBasketStore(state => state.basket);
```

Buradakı `state => state.basket` hissəsinə **selector** deyilir və çox vacibdir: komponent yalnız `basket` dəyişəndə yenidən render olunur. `loading` dəyişəndə bu komponent **toxunulmur**.

React Context ilə fərq məhz budur: Context-də dəyər dəyişəndə onu işlədən **bütün** komponentlər yenidən render olunur, seçim mexanizmi yoxdur.

> **Bəs niyə tema Context-dədir?** (`ThemeContext.tsx`) Çünki tema dəyişəndə **onsuz da hər şey** yenidən render olunmalıdır — bütün rənglər dəyişir. Yəni Context-in "hamısını yenilə" davranışı orada problem deyil, **məqsəddir**. Alət seçimi ehtiyaca görədir, moda görə yox.

### Səbət niyə dörd fayla bölünüb?

```
store/
├── basket.store.ts     ← Store və action-lar
├── basket.helpers.ts   ← Saf riyaziyyat (şəbəkə yoxdur, state yoxdur)
├── basket.sync.ts      ← Şəbəkə sinxronizasiyası (debounce)
└── basket.toasts.ts    ← Bildiriş mətnləri
```

Bölgü **ölçüyə görə yox, rola görədir**. `basket.helpers.ts`-dəki funksiyalar tamamilə saf: giriş verirsən, çıxış alırsan, heç bir yan təsir yoxdur. Onları oxumaq üçün şəbəkə və ya store haqqında heç nə bilmək lazım deyil.

Bir incəlik: `quantityForProduct` funksiyası `helpers`-də yaşayır, amma store-dan **yenidən ixrac olunur**:

```ts
// basket.store.ts
export { quantityForProduct } from './basket.helpers';
```

Səbəb: bütün ekranlar onu store-dan import edirdi. Fayl bölünəndə hər ekranın import sətrini dəyişmək əvəzinə, bir sətirlik yenidən-ixrac yazıldı. Yəni **daxili yenidənqurma kənara sızmadı**.

### Optimistik yeniləmə — "əvvəlcə göstər, sonra soruş"

İstifadəçi "+"-a basanda iki yol var:

| Yanaşma | Nə olur | Hiss |
|---|---|---|
| Ənənəvi | Sorğu göndər → cavab gözlə → ekranı yenilə | Düymə "ilişir", 200-500 ms gecikmə |
| **Optimistik** | Ekranı **dərhal** yenilə → sorğunu arxada göndər | Ani |

Layihə optimistik yolu seçib:

```ts
addItem: async product => {
  const productId = product.id;
  const currentBasket = get().basket;
  const existingItem = findItem(currentBasket, productId);

  set({
    basket:
      currentBasket && existingItem
        ? adjustItemQuantity(currentBasket, productId, 1)
        : addNewItem(currentBasket, product),
  });

  scheduleBasketSync(productId, 1, currentBasket, product, set);
},
```

İki hal var:

1. **Məhsul artıq səbətdədir** → sadəcə sayını artır (`adjustItemQuantity`).
2. **Məhsul səbətdə yoxdur** → yeni sətir **uydur** (`addNewItem`).

İkinci hal `addItem`-in niyə **bütöv `Product` obyektini** aldığını izah edir, sadəcə `productId`-ni yox: yeni sətri ekranda göstərmək üçün məhsulun adı, qiyməti və şəkli lazımdır. Səbətdə olmayan məhsul haqqında store-un heç bir məlumatı yoxdur.

Əvvəllər `addItem` yalnız `id` alırdı və yeni məhsul üçün optimistik yeniləmə **ümumiyyətlə edilmirdi** — nəticədə "+"-a basanda düymə bir anlıq cavabsız qalırdı. Bütün çağırış yerləri (`CategoryProductsScreen`, `MyListsScreen`, `SearchScreen`, `BasketScreen`) indi tam məhsulu ötürür.

`addNewItem`-də bir incəlik də var:

```ts
const newItem: BasketItem = {
  id: -product.id,     // ← mənfi!
  // ...
};
```

Niyə mənfi `id`? Çünki bu sətir **uydurmadır** — əsl `id`-ni backend verir. Mənfi rəqəm seçilib ki, əsl `id`-lərlə (həmişə müsbət) heç vaxt toqquşmasın. Bir neçə saniyə sonra server cavabı gələndə onsuz da əvəz olunur.

### Debounce — sürətli tıklamaların idarəsi

Bu, layihənin ən incə məntiqlərindən biridir. Problemi anlayaq.

İstifadəçi "+"-a **beş dəfə sürətlə** basır. Sadə yazılsaydı, beş ayrı sorğu gedərdi. Üç problem:

1. Server lazımsız yüklənir.
2. Cavablar **qarışıq sıra ilə** gələ bilər — üçüncünün cavabı beşincidən sonra gəlsə, ekranda **səhv rəqəm** qalar.
3. Beş ayrı toast bildirişi çıxar.

Həll `basket.sync.ts`-dədir:

```ts
const DEBOUNCE_MS = 300;

export function scheduleBasketSync(productId, delta, currentBasket, productForToast, set) {
  const pending = pendingChanges.get(productId);
  if (pending) clearTimeout(pending.timer);

  const baselineBasket = pending ? pending.baselineBasket : currentBasket;
  const netDelta = (pending?.netDelta ?? 0) + delta;
  const timer = setTimeout(() => {
    flushBasketChange(productId, productForToast, set);
  }, DEBOUNCE_MS);

  pendingChanges.set(productId, { timer, netDelta, baselineBasket });
}
```

Məntiq belədir:

1. Hər tıklamada ekran **dərhal** yenilənir (optimistik, yuxarıda).
2. Şəbəkə sorğusu isə 300 ms **gözləyir**.
3. Bu müddətdə yeni tıklama gəlsə, köhnə taymer **ləğv edilir**, yenisi qurulur, `netDelta` isə toplanır.
4. Tıklama dayananda `flushBasketChange` işə düşür.

**`netDelta` niyə lazımdır?** Çünki istifadəçi 5 dəfə "+", sonra 2 dəfə "−" basa bilər. Xalis nəticə: `+3`. Yeddi sorğu əvəzinə üç sorğu gedir.

Niyə **bir** sorğu yox? Çünki backend-də "sayı N et" endpoint-i yoxdur — yalnız "bir artır" və "bir azalt" var. Ona görə xalis fərq qədər çağırış edilir:

```ts
for (let i = 0; i < steps; i++) {
  basket = direction > 0
    ? await addToBasket(productId)
    : await removeFromBasket(productId);
}
```

**`baselineBasket` niyə lazımdır?** Bu, ən zərif hissədir. O, **birinci** tıklamadan əvvəlki səbətdir.

Sorğu uğursuz olsa:

```ts
catch (err) {
  set({ basket: baselineBasket });
  showErrorToast(getApiErrorMessage(err));
}
```

Yəni bütün seriya **birdən** geri qaytarılır — "üçünü tətbiq et, ikisini geri al" kimi qismən düzəliş etməyə çalışmır. Qismən geri qaytarma məntiqi qat-qat mürəkkəb və səhvə açıq olardı.

Nəticədə istifadəçi görür: sürətlə basdı → rəqəmlər ani dəyişdi → şəbəkə xətası oldu → hər şey basmazdan əvvəlki halına qayıtdı + bir xəta bildirişi. Aydın və başa düşülən.

### `sortBasketItems` — kiçik amma vacib

```ts
export function sortBasketItems(basket: Basket): Basket {
  if (!basket.items) return basket;
  return { ...basket, items: [...basket.items].sort((a, b) => a.id - b.id) };
}
```

Səbəb faylda yazılıb: backend məhsulların sırasını **qorumur** — dəyişdirilmiş məhsulu bəzən siyahının əvvəlinə atır.

Onsuz nə olardı? İstifadəçi 3-cü sətirdə "+"-a basardı, o sətir birdən **1-ci sıraya sıçrayardı**, barmağı isə hələ də 3-cü sətirin üstündə olardı — və növbəti tıklama **başqa məhsulu** dəyişərdi.

`[...basket.items]` yazılışına diqqət: əvvəlcə **nüsxə** çıxarılır, sonra sıralanır. Çünki `.sort()` array-i **yerində** dəyişir; birbaşa sıralasaydıq, React-in "dəyişiklik oldumu?" müqayisəsi pozula bilərdi.

---

## Hissə 14: Paylaşılan komponentlər

`src/shared/components/` — birdən çox ekranın işlətdiyi komponentlər. Hamısını sadalamayacağıq; ən çox **öyrədici** olanlara baxacağıq.

### `Button` — sadə, amma iki incəliyi var

```ts
export type ButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'danger';
  textStyle?: StyleProp<TextStyle>;
};
```

**1. `loading` prop-u ikiqat iş görür:** həm spinner göstərir, həm də düyməni **söndürür**. Onsuz istifadəçi "Sifariş ver" düyməsinə iki dəfə basıb **iki sifariş** yarada bilərdi.

**2. `textStyle` prop-u niyə var?** Bu, i18n-dən doğan real bir problemin həllidir. Rus dilində düymə mətni uzun olub `ProductCard`-a sığmırdı.

İki həll var idi:
- Kartı böyütmək → bütün grid riyaziyyatı dəyişir, digər iki dildə də.
- **Mətni kiçiltmək** → yalnız o düyməyə toxunur.

İkincisi seçilib. `Button` daxilində `numberOfLines={1}` təhlükəsizlik toru da var. Qayda belədir: **uzun tərcümə üçün qabı böyütmə, mətni kiçilt.**

### `Input` — parol maskalaması niyə əl ilədir?

Bu, layihənin ən qeyri-adi komponentidir. Adətən parol sahəsi belə yazılır:

```tsx
<TextInput secureTextEntry />
```

Amma burada `secureTextEntry` **həmişə `false`** ötürülür və maskalama əl ilə edilir. Niyə?

**Problem:** Android-in native `secureTextEntry`-si yazılan hər hərfi **~2 saniyə açıq göstərir**, sonra nöqtəyə çevirir. Bu, əməliyyat sisteminin öz animasiyasıdır — JS-dən söndürmək mümkün deyil. Ən çox **ilk hərfdə** nəzərə çarpır, çünki adam ilk hərfdən sonra bir az fikirləşir.

`autoCorrect`, `autoComplete`, `importantForAutofill` — hamısı söndürüldü, **kömək etmədi**.

**Həll:** maskalamanı özümüz etmək.

```ts
value={visible ? realValue : MASK_CHAR.repeat(realValue.length)}
onChangeText={visible ? onChangeText : handleChangeText}
secureTextEntry={false}
```

Yəni `TextInput`-a **heç vaxt əsl parol verilmir** — ona həmişə `•••••` verilir. Android-in gizlətməyə çalışdığı bir şey yoxdur, ona görə "açıb-göstərmə" animasiyası da baş vermir.

**Bəs istifadəçinin nə yazdığını necə bilirik?**

Bu, `handleChangeText`-in işidir. Məntiq: köhnə maska ilə yeni gələn mətni **müqayisə edib fərqi tapmaq**.

```ts
const oldMasked = MASK_CHAR.repeat(realValue.length);

// 1. Baş tərəfdən neçə simvol eynidir?
let start = 0;
while (start < oldMasked.length && start < displayText.length &&
       oldMasked[start] === displayText[start]) {
  start++;
}

// 2. Son tərəfdən neçə simvol eynidir?
let oldEnd = oldMasked.length;
let newEnd = displayText.length;
while (oldEnd > start && newEnd > start &&
       oldMasked[oldEnd - 1] === displayText[newEnd - 1]) {
  oldEnd--;
  newEnd--;
}

// 3. Ortada qalan fərq = istifadəçinin yazdığı
const inserted = displayText.slice(start, newEnd);
const nextValue = realValue.slice(0, start) + inserted + realValue.slice(oldEnd);
```

Nümunə ilə: əsl parol `abc`, maska `•••`. İstifadəçi ortaya `X` yazır → gələn mətn `•X••`.

| Addım | Nəticə |
|---|---|
| Baş tərəfdən uyğunluq | 1 simvol (`•`) |
| Son tərəfdən uyğunluq | 2 simvol (`••`) |
| Ortada qalan | `X` |
| Yeni əsl dəyər | `a` + `X` + `bc` = `aXbc` |

Bu üsul yalnız yazmağı yox, **silməyi və ortadan redaktəni** də düzgün idarə edir.

**Göz ikonu:** `visible` olanda göz **açıq**, gizli olanda **bağlı**. Yəni ikon **hazırkı vəziyyəti** göstərir, "basanda nə olacağını" yox. Əvvəlcə əks konvensiya sınanıb, sonra bu seçilib.

### `ErrorBoundary` — çökməni tutan tor

React-də bir komponent render zamanı xəta atarsa, **bütün tətbiq** ağ ekrana çevrilir. `ErrorBoundary` bunun qarşısını alır.

Bu, layihədəki yeganə **class komponentdir**. Səbəb texnikidir: `getDerivedStateFromError` və `componentDidCatch` metodlarının hook qarşılığı **hələ yoxdur**.

```tsx
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null, resetKey: 0 };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Sentry.captureException(error, {
      extra: { componentStack: errorInfo.componentStack },
    });
  }

  handleRetry = () => {
    this.setState(({ resetKey }) => ({ error: null, resetKey: resetKey + 1 }));
  };

  render() {
    if (this.state.error) {
      return <ErrorBoundaryFallback error={this.state.error} onRetry={this.handleRetry} />;
    }
    return <Fragment key={this.state.resetKey}>{this.props.children}</Fragment>;
  }
}
```

**Ən maraqlı hissə `resetKey`-dir.** "Yenidən cəhd et" düyməsi sadəcə `error: null` yazsa, nə olardı?

Komponent yenidən render olunardı — **eyni pozuq state ilə**. Əgər çökmənin səbəbi bir dəfəlik render qəzası deyil, **pozuq məlumat** idisə, tətbiq dərhal yenidən çökərdi. Nəticə: sonsuz döngə.

`key` dəyişməsi isə React-ə deyir: "bu, tamam **başqa** bir ağacdır". React köhnəsini tam söküb yenisini qurur — bütün state sıfırlanır, naviqasiya da ilkin ekrana qayıdır.

Bu, React-in `key` mexanizminin nadir, amma çox güclü istifadəsidir.

### `BottomSheet` — niyə öz komponentimiz?

Aşağıdan çıxan panel (məhsul detalı, sifariş detalı, kampaniya detalı) üçün hazır kitabxana var: `@gorhom/bottom-sheet`. **İşlədilmir.**

Səbəb Hissə 23-də ətraflıdır, qısası: o kitabxana layihənin Reanimated v4 versiyası ilə **səssizcə** uyğunsuz çıxdı — heç bir xəta vermir, sadəcə panel görünmür.

Bizim variant: `Modal` + RN-in öz `Animated`-i + `PanGestureHandler` (yalnız yuxarıdakı "tutacaq"da).

İki tələ bu komponenti yazarkən üzə çıxıb, hər ikisi artıq həll olunub:

**1. Sürüşdürməni sıxmaq (clamping).** `Animated.event` ilə bağlansaydı, `translationY` **mənfi** də ola bilərdi — yəni istifadəçi aşağı dartıb yuxarı qaldıranda panel öz yerindən **yuxarı** qalxardı. Həll: dəyəri adi JS funksiyası ilə vermək və hər kadrda sıxmaq:

```ts
translateY.setValue(Math.max(0, translationY));
```

**2. `TouchableOpacity`-nin hansı versiyası.** Panelin içindəki toxunma sahələri **core RN**-in `TouchableOpacity`-si olmalıdır. Gesture-handler-in öz versiyasına dəyişdirmək layoutu səssizcə sındırıb: panel ekranın **yuxarısına** yapışıb, ağ-üstə-ağ görünməz olub və bütün tətbiqdə toxunuşları udmağa başlayıb.

Yalnız sifariş detalındakı daxili `ScrollView` gesture-handler versiyasına keçirilib — o da ayrıca bir scroll problemi üçün.

### `Skeleton` — yüklənmə pərdəsi

Məlumat gələnə qədər spinner göstərmək əvəzinə, gələcək məzmunun **formasını** boz bloklarla göstərmək daha yaxşı təcrübədir — istifadəçi nəyin gələcəyini əvvəlcədən görür.

```tsx
function Skeleton({ width = '100%', height, borderRadius = 6, style }: SkeletonProps) {
```

İki qərar faylda şərhlə izah olunub:

**1. Hər `Skeleton` öz pulsasiyasını idarə edir**, mərkəzi bir "sürücü" yoxdur. Bu layihənin siyahı ölçüləri üçün bu, həm sadədir, həm də ucuzdur. Üstəlik sonradan görünən bir sətir öz pulsasiyasına **öz mount anından** başlayır, başqalarına uyğunlaşmağa çalışmır.

**2. `height`-in default dəyəri YOXDUR.** Qəsdən `undefined` qalır. Səbəb: React Native `undefined` stil dəyərini **tətbiq etmir**. Bu isə çağırana imkan verir ki, ölçünü tamamilə `style` ilə versin (məsələn `aspectRatio: 1`) — sabit hündürlük onunla döyüşmür.

Bu primitivin üstündə qurulanlar: `ProductCardSkeleton`, `ProductGridSkeleton`, `CategoryGridSkeleton`, `SearchResultsSkeleton`, `OrderCardSkeleton`.

### `ProductGrid` və `useBasketGrid` — təkrarın aradan qaldırılması

`CategoryProductsScreen` (kateqoriya məhsulları) və `MyListsScreen` (favoritlər) demək olar **eyni** grid-i göstərir. Əvvəllər hər ikisində eyni kod ayrıca yazılmışdı.

İndi ortaq hissə iki yerə çıxarılıb:

```ts
// useBasketGrid.ts — səbətlə bağlı bütün bağlantılar
export function useBasketGrid() {
  const basket = useBasketStore(state => state.basket);
  const addItem = useBasketStore(state => state.addItem);
  const removeItem = useBasketStore(state => state.removeItem);

  const basketItemCount =
    basket?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return {
    basket, addItem, removeItem, basketItemCount,
    showSummaryBar: basketItemCount > 0,
    quantityFor: (productId: number) => quantityForProduct(basket, productId),
  };
}
```

`ProductGrid` isə görünüşü saxlayır. Hər iki ekran onu fərqli məlumatla, fərqli "boş vəziyyət" komponenti ilə çağırır.

### FlashList tələsi — `extraData`

`ProductGrid` daxilində vacib bir sətir var:

```tsx
<FlashList
  data={products}
  extraData={basket}      // ← bu olmasa bug var
  // ...
/>
```

FlashList performans üçün hüceyrələri **təkrar istifadə edir** və yalnız `data`/`extraData` dəyişəndə onları yenidən çəkir.

Səbət isə Zustand store-dadır — yəni `data`-nın bir hissəsi **deyil**. `extraData={basket}` yazılmasaydı, FlashList səbətin dəyişdiyini **bilməzdi**.

Bu, real olaraq baş verib: istifadəçi məhsul əlavə edir, başqa ekrana keçir, qayıdır — və kartlarda **köhnə** rəqəmlər görünür, halbuki store-da düzgün dəyər var. Ekran "donmuş" kimi görünür, amma səbəb sadəcə bu bir prop-un olmamasıdır.

### `ScreenHeader` və `AppHeader` — ikisi niyə ayrıdır?

| Komponent | Harada | Nə göstərir |
|---|---|---|
| `AppHeader` | Home tabının üstündə, **sabit** | "TIK TAK" logosu + səbət ikonu |
| `ScreenHeader` | İtələnən ekranlarda | Geri düyməsi + ekranın başlığı |

Fərqli məqsədlər, fərqli davranış: `AppHeader` ekran dəyişəndə **tərpənmir**, `ScreenHeader` isə hər ekranın öz hissəsidir və onunla birlikdə gəlib-gedir.

### `ErrorState` — "yenidən cəhd et" naxışı

```tsx
<ErrorState message={error} onRetry={retry} />
```

Fetch edən demək olar hər ekranda işlədilir. Faydası ondadır ki, xəta ekranı **hər yerdə eyni görünür** və istifadəçi həmişə bilir ki, nə edə bilər.

Diqqət: `onRetry`-yə ötürülən funksiya çox vaxt `useCallback` ilə sabitləşdirilmiş `retry`-dir (bax Hissə 4) — həm ilkin yükləmə, həm təkrar cəhd, həm də aşağı-dartıb-təzələmə **eyni** funksiyanı işlədir.

---

## Hissə 15: Ekranlar

### Auth axını: Welcome → Register / Login

**`WelcomeScreen`** — ən sadə ekran: loqo, qısa mətn, "Qeydiyyat" düyməsi və `AuthSwitchLink`. Heç bir server sorğusu yoxdur.

**`LoginScreen` və `RegisterScreen`** — hər ikisinin **görünüşü** komponentdə, **məntiqi** isə hook-dadır:

```
screens/auth/
├── components/LoginScreen/LoginScreen.tsx     ← yalnız JSX
└── hooks/useLoginForm.ts                      ← state, validasiya, sorğu
```

`useLoginForm.ts`-dəki `handleSubmit` bütün formaların izlədiyi naxışdır:

```ts
async function handleSubmit() {
  // 1. Əvvəlcə client tərəfdə yoxla
  const nextErrors = {
    phone: validatePhone(phone),
    password: validatePassword(password),
  };
  setErrors(nextErrors);
  if (Object.values(nextErrors).some(Boolean)) return;   // ← xəta varsa dayan

  // 2. Yalnız hamısı keçəndə serverə get
  setFormError(undefined);
  setLoading(true);
  try {
    await login({ phone, password }, rememberMe);
    showSuccessToast(t('login.successToast'));
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  } catch (error) {
    setFormError(getApiErrorMessage(error));
  } finally {
    setLoading(false);
  }
}
```

**Niyə əvvəlcə client-side validasiya?** Çünki boş formanı serverə göndərmək mənasızdır — şəbəkə gözləməsi, sonra xəta. Yerində yoxlamaq **anidir**.

Bəs server yoxlaması lazımsızdırmı? Xeyr, mütləq lazımdır — client tərəf yoxlama yalnız **rahatlıq** üçündür, təhlükəsizlik üçün yox. İstifadəçi tətbiqi dəyişdirə bilər, serveri isə yox.

**Telefon sahəsinin xüsusi davranışı:**

```ts
setPhone: (text: string) => setPhoneState(applyAzPhonePrefix(text)),
```

`applyAzPhonePrefix` üç iş görür: rəqəm olmayan hər şeyi silir, yenidən yazılmış `994` prefiksini atır, sonra `+994` əlavə edir. Sahənin başlanğıc dəyəri də `''` yox, `'+994'`-dür — prefiks ilk render-dən görünsün deyə.

`validatePhone` isə dəyər **yalnız** `+994`-dürsə, bunu "boş" sayır — "format səhvdir" yox. Fərq istifadəçi üçün vacibdir: "nömrə daxil edin" ilə "nömrə səhvdir" fərqli mesajlardır.

### Home axını

**`HomeScreen`** — `useHomeData()` hook-u üç sorğunu paralel idarə edir (profil, kateqoriyalar, kampaniyalar). Detallar Hissə 18-dədir.

**Sabit başlıq — real bir bug-ın həlli.**

Ünvan kartı və kampaniya karuseli əvvəlcə `FlatList`-in `ListHeaderComponent`-i idi. Məntiqli görünürdü: "bunlar da siyahının yuxarısındadır".

Amma `ListHeaderComponent` siyahının **sürüşən məzmununun bir hissəsidir**. Yəni kateqoriyalar aşağı sürüşəndə, ünvan kartı da onlarla birlikdə yuxarı çıxıb **ekrandan yox olurdu** — halbuki dizayn üzrə sabit qalmalı idi.

Həll: onları `FlatList`-dən **tamamilə çıxarmaq** və qardaş element etmək:

```tsx
<View style={styles.flex}>
  {!error && <HomeFixedHeader ... />}     {/* sabit qalır */}

  {error ? (
    <ErrorState ... />
  ) : loading ? (
    <View style={styles.listContent}><CategoryGridSkeleton /></View>
  ) : (
    <FlatList data={categories} ... />    {/* yalnız bu sürüşür */}
  )}
</View>
```

İkisinin **eyni valideynin uşaqları** olması vacibdir: flexbox-un `column` düzülüşü ilə başlıq yuxarıda qalır, `FlatList` isə qalan sahədə öz sürüşməsini idarə edir.

> **Ümumiləşdirilə bilən dərs:** `ListHeaderComponent` "siyahının üstündəki statik məzmun" kimi səslənir, amma **sürüşür**. Bir element "siyahı ilə yanaşı, sabit qalmalıdır" tələbi daşıyırsa, o, siyahının **kənarında** olmalıdır. Başqa ekranda "sabit qalmalı idi, amma sürüşür" bug-ı görsəniz, ilk növbədə buna baxın.

**`CategoryProductsScreen`** — layihənin ən çox qatlı ekranı, ona görə iki hook-a bölünüb:

- `useCategoryProductsData` — kateqoriyalar + məhsullar + səbət yüklənməsi.
- `useCategoryChipsScroll` — üfüqi kateqoriya çiplərinin avtomatik sürüşməsi.

İkinci hook-da **iki yarış vəziyyəti** (race condition) həll olunub, hər ikisi faylda şərhlə izah olunub:

**1. Erkən `scrollTo` səssizcə itir.**

```ts
requestAnimationFrame(() => {
  chipsScrollRef.current?.scrollTo({ x: Math.max(0, layout.x - 20), animated });
});
```

Çiplərin layout-u ilə **eyni anda** verilən sürüşmə əmri native tərəfdə itir — `ScrollView` hələ öz məzmun ölçüsünü sabitləməyib və sonradan mövqeyi sıfırlayır. `requestAnimationFrame` bir kadr gözləyir.

**2. Ölçülməmiş çipə sürüşmək mümkün deyil.**

```ts
function maybeScrollToInitialChip() {
  if (hasScrolledToInitialChip.current) return;
  if (!chipsContentReady.current) return;
  if (!chipLayouts.current[selectedCategoryId]) return;
  hasScrolledToInitialChip.current = true;
  scrollToChip(selectedCategoryId, false);
}
```

`ScrollView` **hazırda bildiyi** məzmun enindən o tərəfə sürüşə bilmir. Sona yaxın bir çipə, bütün çiplər ölçülməmiş sürüşmək istəsəniz, əmr səssizcə sıfıra sıxılır.

Ona görə **iki siqnal** gözlənilir: ümumi məzmun eni bilinsin (`onContentSizeChange`) **və** həmin çipin öz mövqeyi bilinsin (`onLayout`). Hər ikisi gələndə, bir dəfə sürüşdürülür.

**`ProductDetailSheet`** — `BottomSheet` üzərində məhsul detalı. Favorit düyməsində optimistik yeniləmə var: dəyər sorğudan **əvvəl** dəyişir, xəta olsa geri qaytarılır.

**`EmptyCategoryState`** — `ListEmptyComponent` kimi ötürülən kiçik komponent. Onun varlığı bir prinsipi göstərir: "yüklənir", "xəta", "boş" — bunlar **üç fərqli** haldır və üçü də fərqli görünməlidir. Boş siyahını spinner ilə göstərmək istifadəçini çaşdırar.

### Kampaniyalar

**`CampaignsScreen`** — kök stack-də ayrıca ekran (`Campaigns` marşrutu), `HomeScreen`-dəki karuseldən açılır.

Məlumatı `useCampaignsData` hook-u gətirir və bu hook TanStack Query-nin nə qədər boilerplate-i azaltdığını yaxşı göstərir:

```ts
export function useCampaignsData() {
  const campaignsQuery = useQuery({
    queryKey: queryKeys.campaigns,
    queryFn: listCampaigns,
  });

  return {
    campaigns: campaignsQuery.data ?? [],
    loading: campaignsQuery.isPending,
    error: campaignsQuery.error ? getApiErrorMessage(campaignsQuery.error) : undefined,
    retry: campaignsQuery.refetch,
  };
}
```

Diqqət: burada **`useState` yoxdur, `useEffect` yoxdur**. Keş, təkrar sorğu, yükləmə vəziyyəti — hamısı hazır gəlir.

Üstəlik `queryKeys.campaigns` açarı `HomeScreen`-dəki karuselin işlətdiyi açarla **eynidir** — yəni əsas səhifədə artıq yüklənmiş kampaniyalar bu ekranda **dərhal** görünür, yenidən sorğu getmir.

**`CampaignDetailSheet`** — `BottomSheet` üzərində kampaniya detalı.

### Basket və Checkout axını

**`BasketScreen`** — `useBasketStore`-dan oxuyur, `BasketRow` hər sətri göstərir.

Kiçik, amma düşünülmüş detal: `item.quantity <= 1` olanda "−" düyməsinin ikonu **zibil qutusuna** çevrilir. Yəni düymə "bu, sonuncu ədəddir, basarsan tamam siləcəm" mesajını **vizual olaraq** verir.

**Footer `position: 'absolute'` DEYİL.** Bu, uzun bir debug-ın nəticəsidir (bax Hissə 23). Onun əvəzinə footer-in hündürlüyü `onLayout` ilə ölçülür və siyahının `paddingBottom`-una əlavə edilir — beləliklə son element footer-in altında gizlənmir.

**`CheckoutScreen`** — dörd hissəyə bölünüb:

| Komponent | İşi |
|---|---|
| `CheckoutForm` | Ad/ünvan/telefon (salt-oxu) + qeyd sahəsi + ödəniş seçimi |
| `PaymentMethodPicker` | Nağd / kart radio düymələri |
| `OrderItemsBox` | Sifariş məhsullarının sürüşən qutusu |
| `CheckoutFooter` | Ümumi məbləğ + "Sifarişi tamamla" düyməsi |

Ekranın özündə yalnız **əlaqələndirmə** qalır: profil sorğusu, state-lər və `handleSubmit`.

`PaymentMethodPicker`-də `TabBar`-dakı ilə **eyni** naxış var — variant siyahısı komponentin **içində** qurulur:

```ts
// Built inside the component (not a module-level const) because t()
// needs to be called from within a component/hook.
const options: { value: PaymentMethod; label: string }[] = [
  { value: 'CASH', label: t('checkout.cashOnDelivery') },
  { value: 'CARD', label: t('checkout.cardOnDelivery') },
];
```

Səbəb eynidir: `t()` hook-dan gəlir, üstəlik dil dəyişəndə etiketlər avtomatik yenilənməlidir.

**`OrderSuccessScreen`** — 3 saniyəlik geri sayım, sonra "Sifarişlərim"ə yönləndirmə. Ekranda "Əsas səhifəyə qayıt" düyməsi də var.

Hər iki çıxış yolu `navigation.reset()` işlədir — səbəbi Hissə 9-da ətraflı izah olunub (geri düyməsi ilə bu ekrana qayıtmaq mümkün olmamalıdır).

Bu ekran həm də `notifyOrderPlaced()` çağırır (bax Hissə 21).

### Search axını

**`SearchScreen`** — iki hook işlədir: `useSearchQuery` (axtarış) və `useSearchHistory` (son axtarışlar).

**Debounce — niyə lazımdır?**

```ts
const SEARCH_DEBOUNCE_MS = 500;

useEffect(() => {
  const timeout = setTimeout(() => setDebouncedQuery(query.trim()), SEARCH_DEBOUNCE_MS);
  return () => clearTimeout(timeout);
}, [query]);
```

Onsuz, "alma" yazan istifadəçi **dörd** sorğu göndərərdi: `a`, `al`, `alm`, `alma`. Debounce ilə yalnız sonuncusu gedir.

Mexanizm: hər hərfdə taymer **yenidən qurulur** (köhnəsi `clearTimeout` ilə ləğv edilir). Yalnız 500 ms fasilə olanda sorğu göndərilir.

**Yarış vəziyyəti necə həll olunub?**

Köhnə problem belə idi: istifadəçi "al" yazır (sorğu gedir), sonra "ma" əlavə edir (ikinci sorğu gedir). Əgər **birinci** sorğu **ikincidən sonra** cavab versə, ekranda "alma" yazılıb, amma "al"-ın nəticələri görünərdi.

Əvvəllər bu, əl ilə `latestQueryRef` ilə həll olunurdu. İndi isə **avtomatik** həll olunur, çünki TanStack Query hər axtarış termini üçün **ayrı keş açarı** işlədir:

```ts
const { data: results = [], isFetching } = useQuery({
  queryKey: queryKeys.products({ search: debouncedQuery }),
  queryFn: () => { /* ... */ },
  enabled: !!debouncedQuery,
});
```

Faylda bu, şərhlə də vurğulanıb. Köhnə cavab öz açarına yazılır və cari ekranı **əvəz edə bilmir**.

**Yükləmə vəziyyətinin incəliyi:**

```ts
const isDebouncing = query.trim() !== debouncedQuery;
const loading = !!query.trim() && (isDebouncing || isFetching);
```

Yalnız `isFetching` işlətsəydik, istifadəçi yazarkən 500 ms ərzində ekran **"nəticə tapılmadı"** göstərərdi — halbuki sorğu hələ başlamayıb. `isDebouncing` bu boşluğu doldurur.

**Backend-in gözlənilməz davranışı:**

```ts
// The backend's `search` param apparently matches on more than just
// title (e.g. searching "alma" returned "Ciyelek"), so narrow to
// title-only matches client-side.
response.data.filter(product =>
  product.title.toLowerCase().includes(lowerTrimmed),
)
```

Backend axtarışı yalnız başlıqda etmir (yəqin təsvirdə də axtarır). Nəticədə "alma" axtarışı "Çiyələk" qaytarırdı. Client tərəfdə əlavə süzgəc bunu düzəldir.

**Ekrandan çıxanda təmizləmə:**

```ts
useFocusEffect(
  useCallback(() => {
    return () => {
      onLeaveRef.current(queryRef.current);
      setQuery('');
      setDebouncedQuery('');
    };
  }, []),
);
```

Tab ekranları tab dəyişəndə **söküllmür** — yaddaşda qalır. Bu təmizləmə olmasa, istifadəçi Axtarışdan çıxıb qayıdanda köhnə sorğu və nəticələr hələ də orada olardı.

Eyni anda axtarış termini **tarixçəyə** yazılır (`onLeaveRef.current(...)`). Tarixçə `searchHistory.ts`-də saxlanılır: maksimum 10 termin, ən yenisi əvvəldə, təkrarlar böyük/kiçik hərf fərqi nəzərə alınmadan silinir.

`queryRef`/`onLeaveRef` niyə var? Çünki `useFocusEffect`-in callback-i `[]` asılığı ilə **bir dəfə** qurulur — birbaşa `query` işlətsəydi, həmişə mount anındakı (boş) dəyəri görərdi. Ref isə həmişə ən son dəyəri saxlayır.

### Profile axını

**`ProfileScreen`** — üç hissəyə bölünüb: `ProfileHeader` (avatar + ad), `ProfileMenu` (menyu sətirləri), və çıxış təsdiqi (`useLogout`).

`AvatarPicker` + `useAvatarUpload` — şəkil seçimi. Seçim **anında** `maxWidth`/`maxHeight`/`quality` ilə kiçildilir. Səbəb sadəcə trafik deyil: müasir kamera şəkli bir neçə meqabaytdır, bu isə yükləməni həm yavaşladır, həm də uğursuzluq ehtimalını artırır.

**`AccountInfoScreen`** — ad, ünvan, e-poçt (sabit), telefon (sabit), şifrə dəyişikliyi.

E-poçt sahəsi haqqında: backend-in `UserProfile` tipində **e-poçt sahəsi ümumiyyətlə yoxdur** — nə oxumada, nə yazmada. Amma dizayn maketində var. Həll: `PLACEHOLDER_EMAIL` sabiti ilə **söndürülmüş**, redaktə edilə bilməyən sahə göstərmək. Serverə **heç vaxt** göndərilmir.

Bu, "dizayna sadiqlik" ilə "backend reallığı" arasında şüurlu bir güzəştdir — və kodda açıq şəkildə sənədləşdirilib ki, gələcəkdə kimsə "bu sahə niyə işləmir?" deyə axtarmasın.

**`MyListsScreen`** (favoritlər) — `useFavorites` hook-u və `ProductGrid`.

`ProductDetailSheet`-in `onFavoriteChange` callback-i ilə maraqlı bir optimallaşdırma var: istifadəçi sheet-də ürəyə basanda, ekran **bütün siyahını yenidən sorğulamır** — sadəcə lokal siyahıdan həmin məhsulu çıxarır (və ya əlavə edir). Bir şəbəkə sorğusuna qənaət, üstəlik ani reaksiya.

**`OrderHistoryScreen`** — `OrderCard` siyahısı + `OrderDetailSheet`. Status nişanının rəngi `getOrderStatusMeta()`-dan gəlir (Hissə 3-dəki `Record` nümunəsi).

**`SettingsScreen`** — dörd bölmə:

| Bölmə | Nə edir |
|---|---|
| Görünüş | Qaranlıq rejim açarı (`ThemeSwitch`), uzun-basma ilə sistemə sıfırlama |
| Dil | az/en/ru seçimi (`LanguagePicker`) |
| Yaddaş | "Keşi təmizlə" — `queryClient.clear()` |
| Versiya | `APP_VERSION` |

"Keşi təmizlə" haqqında vacib qeyd: bu, **`tokenStorage`-a toxunmur**. Yəni istifadəçi bu düyməni basmaqla **təsadüfən çıxış etmir** — sadəcə bütün ekranlar növbəti açılışda məlumatı yenidən sorğulayır.

`APP_VERSION` `package.json`-dan birbaşa oxunur:

```ts
import { version } from '../../../package.json';
export const APP_VERSION = version;
```

Native "cihaz məlumatı" paketi əlavə etmək əvəzinə bu seçilib, çünki JSON import mexanizmi layihədə onsuz da işlədilir (i18n locale faylları). Nəticə: versiyanı artırmaq üçün yalnız `package.json`-u dəyişmək kifayətdir.

> **Diqqət:** Android-in `versionCode`/`versionName` dəyərləri `package.json`-dan **avtomatik gəlmir**. Onlar `android/app/build.gradle`-də ayrıca yazılır və əl ilə sinxron saxlanmalıdır.

**`SupportScreen`** — WhatsApp / Facebook / e-poçt sətirləri, hər biri `Linking.openURL(...)` çağırır.

WhatsApp üçün `https://wa.me/<nömrə>` işlədilir, `whatsapp://` sxemi **yox**. Səbəb: `wa.me` universal veb linkdir — WhatsApp quraşdırılıbsa tətbiqi açır, quraşdırılmayıbsa brauzerdə açır. `whatsapp://` isə tətbiq yoxdursa **səssizcə uğursuz** olardı.

**Bu ekranın yerləşdirilməsi haqqında bir qərar tarixçəsi:** "Dəstək" əvvəlcə `SettingsScreen`-in bir bölməsi idi. Sonra **istifadəçi rəyi ilə** ayrıca ekrana çıxarıldı: kömək axtaran adam "Tənzimləmələr"i açmağı düşünməyə bilər. Versiya və keş təmizləmə isə Tənzimləmələrdə qaldı, çünki onlar orada **gözlənilən** yerdədir.

> **Dərs:** "bu, hardasa yerləşməlidir" ilə "bu, istifadəçinin **axtaracağı** yerdə olmalıdır" fərqli suallardır.

---

## Hissə 16: Toast bildirişləri

### İki fərqli geri-bildiriş üslubu — qəsdən

| Üsul | Nə vaxt | Niyə |
|---|---|---|
| **Toast** | Giriş/çıxış, səbətə əlavə, favorit, ünvan yeniləmə | Nəticəni bildirir, davam etmək üçün heç nə tələb etmir |
| **Sətir daxili xəta** (`formError`) | Forma göndərmə xətaları | İstifadəçi **nəyisə düzəltməlidir** — mətn ekranda **qalmalıdır** |

Toast 3-4 saniyəyə yoxa çıxır. Forma xətası isə qalır, çünki istifadəçi düyməyə basmazdan əvvəl onu oxumalıdır.

### Niyə `Alert.alert` yox?

`Alert.alert` **bloklayıcıdır** — istifadəçi "OK"-a basana qədər heç nə edə bilmir. Səbətə ard-arda üç məhsul əlavə edən adam üç dəfə "OK" basmalı olardı. Toast isə mane olmur.

### `toastConfig` — real bir çökmə və onun səbəbi

Toast-ların görünüşü `src/shared/utils/toast.tsx`-də təyin olunur. Buradakı kod, ilk baxışdan lazımsız görünən bir şəkildə yazılıb:

```tsx
export const toastConfig: ToastConfig = {
  success: props => <SuccessToastView {...props} />,
  error: props => <ErrorToastView {...props} />,
};
```

Sual: niyə birbaşa belə yazmırıq?

```tsx
// ❌ BELƏ YAZMAQ OLMAZ
export const toastConfig: ToastConfig = {
  success: props => {
    const { colors } = useTheme();      // ← hook, düz konfiqurasiyanın içində
    return <BaseToast ... />;
  },
};
```

Cavab faylda şərhlə yazılıb və çox incədir.

`react-native-toast-message` kitabxanası `config[type](props)` ifadəsini **adi funksiya çağırışı** kimi icra edir — öz `ToastUI` komponentinin **render-inin içində**. JSX kimi render etmir.

Nəticə: konfiqurasiyanın içinə yazılmış `useTheme()` **öz** komponentinə deyil, `ToastUI`-nin hook siyahısına qoşulur.

Bu, təsadüfən **işləyirdi**, çünki `success` və `error` girişlərinin hər biri **düz bir** hook çağırırdı. Amma kitabxananın öz `info` fallback-ı **heç bir** hook çağırmır. Yəni bir dəfə `info` tipli toast göstərilsəydi, hook sayı render-lər arasında dəyişərdi və React bu xəta ilə çökərdi:

```
Rendered fewer hooks than expected
```

Həll: hər girişi **əsl komponentə** çevirmək və JSX kimi render etmək. İndi `useTheme()` `SuccessToastView`-un öz hook siyahısındadır.

> **Diqqət:** ESLint-in `react-hooks/rules-of-hooks` qaydası bu problemi **düzgün göstərirdi**. Onu `// eslint-disable` ilə susdurmaq — gizli, gec partlayan bir bomba qoymaq olardı. Linter xəbərdarlığını susdurmazdan əvvəl **niyə** xəbərdarlıq etdiyini anlamaq lazımdır.

### Toast-un yeri

`<Toast config={toastConfig} />` `AppShell.tsx`-də, `NavigationContainer`-in **kənarında** yerləşdirilib.

Səbəb: toast göstərilən anda ekran keçidi baş versə belə (məsələn girişdən sonra), toast naviqasiyadan **asılı olmadan** ekranın üstündə qalmalıdır. Navigator-un içində olsaydı, ekran dəyişəndə onunla birlikdə yox olardı.

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

Alias-lar olmasa, dərin qovluqdan import belə görünərdi:

```ts
import Button from '../../../../shared/components/Button';   // ❌
import Button from '@shared/components/Button';              // ✅
```

Birinci variantın problemi təkcə çirkinlik deyil: faylı başqa qovluğa köçürəndə **bütün** nisbi yollar sınır. Alias isə faylın yerindən asılı deyil.

**Vacib: alias-lar İKİ yerdə yazılır.**

| Fayl | Kimin üçün |
|---|---|
| `babel.config.js` | Metro/Babel — kodu **işə salmaq** üçün |
| `tsconfig.json` (`paths`) | TypeScript — **tip yoxlaması** üçün |

Bunlar iki müstəqil sistemdir və bir-birindən xəbərsizdir. Birində alias əlavə edib o birində unutsanız, ya redaktor qırmızı xətt çəkər (kod işləsə də), ya da əksinə — tiplər keçər, tətbiq çökər.

**`@typings` — `@types` DEYİL.** `@types` adı TypeScript-in öz tip paketləri (`@types/react` kimi) üçün rezerv edilib. Öz alias-ınızı belə adlandırsanız, `TS6137` xətası alarsınız.

### `metro.config.js` — SVG transformer

Metro-ya deyir: "`.svg` fayllarına adi asset kimi yox, **React komponentinə çevriləcək kod** kimi yanaş".

Bu, Hissə 7-dəki `svg.d.ts` ilə **cütlükdür**: biri TypeScript-i inandırır, o biri əsl çevrilməni edir.

### ESLint və Prettier

- **ESLint** (`npm run lint`) — istifadə olunmayan dəyişən, səhv hook istifadəsi kimi problemləri tapır. RN-in rəsmi konfiqurasiyası işlədilir.
- **Prettier** — formatlaşdırma. Kod nəzərdən keçirməsində "boşluq qoy / qoyma" mübahisələrini aradan qaldırır.

**ESLint hələ 8-ci versiyadadır, 9 deyil.** Səbəb: ESLint 9 tamam yeni "flat config" formatına keçib, `@react-native/eslint-config`-in bu versiyası isə köhnə formatdadır. Keçmək üçün RN-in konfiqurasiyasını **əl ilə yenidən yazmaq** lazım gələrdi — faydası olmayan bir iş.

ESLint-in real dəyəri bu layihədə sübut olunub: yuxarıdakı toast hook-ları problemini **ilk göstərən** məhz `react-hooks/rules-of-hooks` qaydası oldu.

### Test yoxdur — və bu, şüurlu qərardır

Layihədə **heç bir avtomatlaşdırılmış test yoxdur**: nə unit test, nə E2E. `jest`, `@types/jest`, `react-test-renderer`, `jest.config.js` və `npm test` skripti — hamısı silinib.

Bu, unudulmuş bir iş deyil, **açıq qərardır**. Səbəb Hissə 23-də və `PAKET-IZAHI.md`-də ətraflıdır; qısası: qalan iki test faylı onsuz da **işləmirdi** və həmişə qırmızı olan bir test əmri, olmayan test əmrindən daha pisdir.

**Bunun bir yan təsiri var və onu bilmək vacibdir:**

```json
// tsconfig.json
"types": []
```

Bu boş massiv **qəsdəndir**. `@react-native/typescript-config` miras olaraq `"types": ["jest"]` verir; `@types/jest` silindiyinə görə TypeScript "jest tiplərini tapa bilmirəm" deyib build-i sındırır. Boş massiv o mirası əzir.

Yəni: **o massivi "təmizləmək" build-i sındırır.**

Tip yoxlaması üçün ayrıca skript yoxdur, birbaşa çağırılır:

```
npx tsc --noEmit
```

### Android build — bu maşına xas çətinliklər

**1. `npx react-native run-android` işləmir.**

Node-un yeni versiyaları (CVE-2024-27980 düzəlişindən sonra) `.bat` fayllarının birbaşa işə salınmasını məhdudlaşdırır. RN CLI isə Gradle-ı məhz belə çağırır.

İş üsulu:

```
cd android && ./gradlew.bat app:installDebug
adb shell am start -n com.tiktak/.MainActivity
```

PowerShell-də işlədilməlidir, Git Bash-də yox.

**2. `npm run apk` — release APK.**

`scripts/build-apk.js` `gradlew.bat assembleRelease` çağırır və nəticəni `android/app/build/outputs/...` dərinliyindən çıxarıb `/apk/tiktak-<tarix>.apk`-a köçürür.

Skriptdə bir incəlik var: `gradlew.bat` **tam yolla** çağırılır, sadə adla yox. Node 24 + `shell: true` kombinasiyasında `cmd.exe` faylı öz-özünə tapa bilmirdi, `cwd` düzgün olsa belə.

**Bu build ~39 dəqiqə çəkir** (dörd ABI üçün native kod yenidən qurulur). Fon rejimində işə salın və uzun sükutu "ilişib" kimi başa düşməyin.

**3. `patch-package`.**

`npm install`-dan sonra avtomatik işə düşür (`postinstall`) və `patches/` qovluğundakı düzəlişləri tətbiq edir. Hazırda bir patch var: `react-native-screens`-in generasiya olunmuş bir faylındakı tip uyğunsuzluğu.

Niyə paketi fork etmək əvəzinə patch? Çünki fork versiya yeniləmələrini əl ilə izləmək deməkdir. Patch isə orijinal paketi olduğu kimi saxlayır, yalnız bir sətri dəyişir.

---

## Hissə 18: Server state idarəetməsi — TanStack Query

### Əvvəllər necə idi və nə problem var idi?

Əvvəllər demək olar hər ekran server məlumatını **əl ilə** gətirirdi:

```ts
const [profile, setProfile] = useState<UserProfile>();
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string>();

const loadProfile = useCallback(() => {
  setLoading(true);
  setError(undefined);
  getProfile()
    .then(setProfile)
    .catch(err => setError(getApiErrorMessage(err)))
    .finally(() => setLoading(false));
}, []);

useEffect(() => { loadProfile(); }, [loadProfile]);
```

Bu **işləyirdi**, amma üç problemi var idi:

**1. Təkrar.** Yuxarıdakı 12 sətir, demək olar dəyişmədən, 10 ekranda təkrarlanırdı.

**2. Keş yoxdur.** İstifadəçi Əsas səhifədən Profilə keçib qayıdanda, kateqoriyalar **yenidən** sorğulanırdı. İki saniyə əvvəl gəlmiş məlumat olsa belə — yenidən boş ekran, yenidən spinner.

**3. Paylaşma yoxdur.** `HomeScreen` profili sorğulayırdı. `CheckoutScreen` **eyni** profili **ayrıca** sorğulayırdı. İkisi bir-birindən xəbərsiz idi.

TanStack Query hər üçünü həll edir.

### `queryClient.ts` — mərkəzi konfiqurasiya

```ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 24 * 60 * 60 * 1000,
      retry: 1,
    },
  },
});
```

Üç parametrin mənası:

| Parametr | Dəyər | Mənası |
|---|---|---|
| `staleTime` | 30 saniyə | Bu müddət ərzində məlumat "təzə" sayılır — ekran açılanda **yenidən sorğu getmir** |
| `gcTime` | 24 saat | İşlədilməyən məlumat yaddaşda bu qədər qalır, sonra silinir |
| `retry` | 1 | Sorğu uğursuz olsa, **bir dəfə** də cəhd edilir |

`staleTime` istifadəçi təcrübəsini birbaşa dəyişir: ekranlar arasında gedib-gəlmək **ani** olur, çünki 30 saniyə ərzində şəbəkəyə çıxılmır.

**`queryClient` niyə ayrıca fayldadır?**

Şərhdə yazılıb: `httpClient.ts` də ona müraciət edir. Sessiya bitəndə keş təmizlənməlidir:

```ts
await clearTokens();
queryClient.clear();     // ← başqa istifadəçi əvvəlkinin məlumatını görməsin
```

Əgər `queryClient` `App.tsx`-in içində yaradılsaydı, `httpClient.ts` ona çata bilməzdi.

### `queryStorage.ts` — keşin diskə yazılması

Keş yalnız yaddaşda qalsaydı, tətbiq bağlananda itərdi. Persister onu MMKV-yə yazır:

```ts
const cache = createMMKV({ id: 'tiktak-query-cache' });

export const queryPersister = createAsyncStoragePersister({
  storage: {
    getItem: key => cache.getString(key) ?? null,
    setItem: (key, value) => cache.set(key, value),
    removeItem: key => { cache.remove(key); },
  },
});
```

Nəticə: istifadəçi tətbiqi bağlayıb bir saat sonra açanda, əsas səhifə **dərhal** dolu görünür — arxa planda təzələnərkən.

**Bu anbar niyə şifrələnmiş `tokenStorage`-dan ayrıdır?** Şərhdə yazılıb: burada yalnız məhsul/kateqoriya cavabları var, token yoxdur. Şifrələmə əlavə etmək Keychain gözləməsi demək olardı — heç bir qazanc olmadan tətbiqin açılışını yavaşladardı.

**⚠️ İki dəyər əl ilə sinxron saxlanmalıdır:**

```ts
// queryClient.ts
gcTime: 24 * 60 * 60 * 1000,

// queryStorage.ts
maxAge: 24 * 60 * 60 * 1000,
```

Niyə? Çünki `gcTime` "istifadə olunmayan sorğu yaddaşdan nə vaxt silinir" deməkdir. Yaddaşdan silinən sorğu **diskə də yazılmır**.

Yəni `gcTime` `maxAge`-dən **qısa** olsaydı, məlumat diskə yazılmazdan əvvəl yaddaşdan silinərdi — persistlik **səssizcə** işləməzdi. Heç bir xəta, heç bir xəbərdarlıq; sadəcə keş boş qalardı.

Məhz bu təhlükəyə görə `persistOptions` **persister-in yanında** saxlanılır (əvvəllər `App.tsx`-də idi) — sinxron qalmalı olan iki sətir bir-birini görsün deyə.

### `buster` — keş formatı dəyişəndə

```ts
const CACHE_BUSTER = 'v1';
```

Təsəvvür edin: backend `title` sahəsinin adını dəyişdi. İstifadəçinin telefonunda isə **köhnə formatda** 24 saatlıq keş var. Tətbiq açılanda o köhnə məlumat bərpa olunur və yeni kod onu başa düşmür — səbəbi görünməyən çökmə.

`buster` dəyərini dəyişmək bütün köhnə keşi **atmağa** məcbur edir.

Yəni bu sabit "unudulmuş versiya nömrəsi" deyil — **cavab formatı dəyişəndə əl ilə artırılmalı** bir təhlükəsizlik klapanıdır.

### `queryKeys.ts` — açar reyestri

```ts
export const queryKeys = {
  profile: ['profile'] as const,
  categories: ['categories'] as const,
  campaigns: ['campaigns'] as const,
  favorites: ['favorites'] as const,
  orders: ['orders'] as const,
  products: (params?: { limit?: number; search?: string }) =>
    ['products', params ?? {}] as const,
};
```

Açar — keşdəki "ünvandır". Eyni açarla sorğu edən **hər ekran eyni keş yazısını** işlədir.

Buna görə `HomeScreen`, `ProfileScreen`, `AccountInfoScreen` və `CheckoutScreen` — dördü də `queryKeys.profile` işlədir və nəticədə **bir** sorğu paylaşırlar.

Açarlar niyə mərkəzi fayldadır? Çünki biri `['profile']`, o biri `['user-profile']` yazsaydı, onlar **iki fərqli keş** olardı — və heç kim səbəbini anlamazdı. Mərkəzi reyestr bu səhvi mümkünsüz edir.

`products` funksiyadır, çünki parametrdən asılıdır: hər axtarış termini öz keş yazısını alır (bax Hissə 15, axtarışdakı yarış vəziyyəti).

### `useQuery` və `useQueries` praktikada

**Bir sorğu:**

```ts
const campaignsQuery = useQuery({
  queryKey: queryKeys.campaigns,
  queryFn: listCampaigns,
});
```

**Bir neçə paralel sorğu** (`useHomeData.ts`):

```ts
const [profileQuery, categoriesQuery, campaignsQuery] = useQueries({
  queries: [
    { queryKey: queryKeys.profile, queryFn: getProfile },
    { queryKey: queryKeys.categories, queryFn: listCategories },
    { queryKey: queryKeys.campaigns, queryFn: listCampaigns },
  ],
});
```

Sonra nəticələr birləşdirilir:

```ts
const loading =
  profileQuery.isPending || categoriesQuery.isPending || campaignsQuery.isPending;
const firstError =
  profileQuery.error ?? categoriesQuery.error ?? campaignsQuery.error;
const error = firstError ? getApiErrorMessage(firstError) : undefined;
```

Yəni: **hər hansı biri** yüklənirsə — yüklənir; **ilk** xəta göstərilir.

### `useFocusEffect` ilə arxa fon yeniləməsi

`useHomeData.ts`-də incə bir hissə var:

```ts
useFocusEffect(
  useCallback(() => {
    getProfile()
      .then(data => queryClient.setQueryData(queryKeys.profile, data))
      .catch(() => {});
  }, [queryClient]),
);
```

**Problem:** `HomeScreen` tab dəyişəndə **sökülmür** — yaddaşda qalır. İstifadəçi Hesabım → Hesab məlumatlarım-da ünvanını dəyişsə, Əsas səhifədəki ünvan kartı **köhnə** qalardı.

**Həll:** ekran hər fokuslananda profili arxa planda yenidən oxu.

İki incəlik var, hər ikisi şərhdə yazılıb:

**1. `invalidateQueries` yox, birbaşa `setQueryData`.** Fərq: `invalidateQueries` sorğunu "köhnəlmiş" elan edib normal yükləmə axını başladar — yəni xəta olsa, `profileQuery.error` dolar və ekran **xəta vəziyyətinə** düşərdi. Halbuki ekranda onsuz da işlək məlumat var.

**2. `.catch(() => {})` — səssiz uduzma.** Bu, arxa fon sinxronizasiyasıdır, əsas yükləmə deyil. Uğursuz olsa, istifadəçi heç nə itirmir — köhnə (amma işlək) məlumatla davam edir.

Bu, ümumi bir prinsipdir: **arxa fon yeniləməsinin uğursuzluğu istifadəçiyə göstərilməməlidir.**

### Səbət niyə hələ də Zustand-dadır?

Məntiqli sual: madam TanStack Query var, səbət də ora keçməli deyilmi?

Xeyr, və səbəb var: **səbətin davranışı fərqlidir**.

| | TanStack Query | Səbət (Zustand) |
|---|---|---|
| Əsas iş | Serverdən **oxumaq** | Serverə **yazmaq** + ani reaksiya |
| Yeniləmə | Sorğu → cavab → göstər | Dərhal göstər → arxada sinxronla |
| Xəta | Xəta ekranı | Əvvəlki hala qaytar |

Səbətin optimistik + debounce məntiqi (Hissə 13) TanStack Query-dən **əvvəl** yazılıb və öz işini yaxşı görür. Onu köçürmək — işləyən bir şeyi, heç bir qazanc olmadan yenidən yazmaq olardı.

**Prinsip:** yeni alət gətirmək, "hər şeyi ona köçürmək" demək deyil.

---

## Hissə 19: Tema — Dark Mode

### `colors.ts` — iki palitra, eyni açarlar

```ts
export const LIGHT_COLORS = { background: '#FFFFFF', textPrimary: '#1A1A1A', /* ... */ };
export const DARK_COLORS: ThemeColors = { background: '#121212', textPrimary: '#F5F5F5', /* ... */ };
```

Hər ikisi `ThemeColors` tipini ödəməlidir. Bu, sadə amma güclü bir qorumadır: birinə yeni rəng əlavə edib o birində unutsanız, TypeScript **dərhal** xəta verir.

Yəni "qaranlıq rejimdə bir rəng unudulub" bug-ı bu layihədə **mümkün deyil**.

### `createStyles(colors)` — statik stildən niyə imtina edildi?

Əvvəllər stillər belə idi:

```ts
export const styles = StyleSheet.create({
  header: { backgroundColor: '#FFFFFF' },
});
```

Problem: bu obyekt **modul yüklənəndə bir dəfə** qurulur. Rəng orada **donub qalır**. Tema dəyişəndə heç nə olmur.

İndi belədir:

```ts
export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    header: { backgroundColor: colors.surface },
  });
```

Komponentdə:

```ts
const { colors } = useTheme();
const styles = useMemo(() => createStyles(colors), [colors]);
```

`useMemo` niyə? Çünki `createStyles(colors)` hər render-də yeni stil obyekti yaradardı. `useMemo` onu yalnız `colors` **həqiqətən dəyişəndə** yenidən qurur.

> **Faydalı əlamət:** bir `.styles.ts` faylında hələ də modul səviyyəsində `export const styles = StyleSheet.create(...)` yazılıbsa, deməli o fayl **hələ tema sisteminə keçirilməyib**.

### `ThemeContext.tsx` — üç ssenari

`ThemeProvider` üç fərqli vəziyyəti idarə etməlidir:

1. **İlk açılış** — istifadəçi heç nə seçməyib → OS-un temasını izlə.
2. **İstifadəçi açarı basıb** — onun seçimi qalib gəlsin, OS dəyişsə belə.
3. **İstifadəçi "sistemi izlə"yə qayıtmaq istəyir** — override silinsin.

Bunları ayırmaq üçün `settingsStorage.ts`-də **iki** funksiya var:

```ts
export function getDarkModeEnabled(systemPrefersDark: boolean): boolean {
  const stored = storage.getBoolean(DARK_MODE_KEY);
  return stored ?? systemPrefersDark;
}

export function hasDarkModeOverride(): boolean {
  return storage.contains(DARK_MODE_KEY);
}
```

`hasDarkModeOverride()` niyə lazımdır? Çünki `getDarkModeEnabled()` **tək başına** iki halı ayırd edə bilmir:

- "İstifadəçi heç nə seçməyib" → `false` qaytarır
- "İstifadəçi açıq-aşkar 'söndür' seçib" → **həm də** `false` qaytarır

`contains()` isə açarın **mövcud olub-olmadığını** yoxlayır, dəyərinə baxmadan. Bu, "seçim edilibmi?" sualının yeganə düzgün cavabıdır.

### Sistem temasını canlı izləmək — niyə İKİ effekt?

Bu, layihənin ən qeyri-adi hissələrindən biridir.

**Birinci effekt** — normal yol:

```ts
useEffect(() => {
  if (hasDarkModeOverride()) return;
  setIsDark(scheme === 'dark');
}, [scheme]);
```

`useColorScheme()` OS teması dəyişəndə komponenti yenidən render edir. `useState`-in başlanğıc funksiyası isə yalnız **bir dəfə** işləyir — ona görə bu effekt lazımdır.

**İkinci effekt** — ehtiyat yol:

```ts
useEffect(() => {
  const subscription = AppState.addEventListener('change', state => {
    if (state !== 'active' || hasDarkModeOverride()) return;
    setIsDark(Appearance.getColorScheme() === 'dark');
  });
  return () => subscription.remove();
}, []);
```

Niyə ikincisi lazımdır? Şərhdə yazılıb və bu, **real cihazda** (Xiaomi/MIUI) tapılmış bir problemdir:

> `useColorScheme()`-in canlı hadisəsi sessiyada **birinci** tema dəyişikliyi üçün etibarlı işləyir, amma **ikinci** dəfə səssizcə işləməyə bilər — nəticədə istifadəçi cihazı işıqlıya qaytaranda tətbiq qaranlıqda ilişib qalır.

`AppState`-in `'active'` hadisəsi daha etibarlıdır: tətbiq hər dəfə ön plana qayıdanda işə düşür (məsələn istifadəçi sürətli tənzimləmələrdən temanı dəyişib qayıdanda). O anda `Appearance.getColorScheme()` **artıq yenilənmiş** olur.

Yəni: birinci effekt normal halda işləyir, ikincisi isə onun buraxdığını tutur.

> **Ümumi dərs:** emulyator real cihazın davranışını **tam təkrarlamır**. Bu layihədə bir neçə problem yalnız əsl telefonda üzə çıxıb.

### Əl ilə override və ondan qayıdış yolu

Açarı bir dəfə basdınız — artıq override rejimindəsiniz və OS dəyişikliklərini izləmirsiniz.

Bəs necə geri qayıtmaq olar? **Açarı uzun basmaqla:**

```ts
function resetDarkModeToSystem() {
  resetDarkModeOverride();                              // MMKV-dən açarı sil
  setIsDark(Appearance.getColorScheme() === 'dark');    // dərhal OS-a uyğunlaş
}
```

Bu funksiya sonradan əlavə olunub və **əsl bir problemi** həll edir.

Əvvəllər geri yol **ümumiyyətlə yox idi**. İstifadəçi açara sadəcə "görüm nə olur" deyə bir dəfə toxunsa belə, tətbiq həmişəlik override rejimində qalırdı. Bu, **iki dəfə** "dark mode sistemi izləmir, deməli bug var" şikayətinə səbəb olub — hər ikisi araşdırılıb və hər ikisində səbəb kod xətası yox, məhz bu olub.

Ona görə həll üç hissədən ibarətdir:

1. Uzun-basma jesti (`ThemeSwitch`-in `onLongPress` prop-u).
2. Uğur toast-ı — jestin başqa görünən nəticəsi olmadığı üçün.
3. Açarın altında **daimi ipucu mətni** — jest heç kimə deyilmədən də tapılsın deyə.

> **Dərs:** əl ilə override əlavə edirsinizsə, **həmişə** ondan qayıtma yolu da əlavə edin. Üstəlik o yol **görünən** olmalıdır — gizli jest, sənədləşdirilməsə, mövcud olmamaqla eynidir.

### `navigationTheme.ts` — unudulan səth

React Navigation ekran fonlarını **öz** palitrasından çəkir. Bizim rəngləri ona ayrıca vermək lazımdır:

```ts
export function buildNavigationTheme(isDark: boolean, colors: ThemeColors): NavigationTheme {
  const base = isDark ? NavigationDarkTheme : NavigationDefaultTheme;
  return {
    ...base,
    colors: {
      ...base.colors,
      background: colors.background,
      card: colors.surface,
      border: colors.border,
      text: colors.textPrimary,
      primary: colors.primary,
    },
  };
}
```

Verməsək nə olardı? Komponentlərimiz düzgün rəngdə olardı, amma naviqasiyanın öz fonu (ekran keçidləri zamanı görünən sahə) **standart rəngdə** qalardı — yəni qaranlıq rejimdə ekranlar arasında ağ yanıb-sönmələr.

---

## Hissə 20: Beynəlxalqlaşdırma (i18n)

Tətbiq üç dildə işləyir: Azərbaycan (default), İngilis, Rus.

### Qovluq quruluşu — qəti bir qayda ilə

```
src/shared/i18n/
├── i18n/
│   ├── i18n.ts        ← quraşdırma
│   └── index.ts       ← yenidən ixrac
└── locales/
    ├── az/{shared,screens}.json
    ├── en/{shared,screens}.json
    └── ru/{shared,screens}.json
```

**Burada yalnız bu iki qovluq var — sərbəst fayl yoxdur.** Bu, açıq istifadəçi tələbidir: yeni fayl bu ikisindən birinin **içində** olmalıdır, yanında yox.

### Niyə hər dil İKİ fayla bölünüb?

Səbəb texniki deyil, **əməkdaşlıq üçündür**:

| Fayl | Kimə aiddir |
|---|---|
| `shared.json` | `src/shared/components/*` və `utils/*` |
| `screens.json` | `src/screens/*` |

İki nəfər (və ya iki agent) eyni vaxtda tərcümə üzərində işləyəndə, hər biri öz faylına toxunur — konflikt olmur.

Kod tərəfində isə fərq **görünmür**: hər ikisi eyni `translation` sahəsinə birləşir, ona görə `t('key')` yazanda açarın hansı faylda olduğunun əhəmiyyəti yoxdur.

### `deepMerge()` — və niyə sadə spread YETƏRLİ DEYİL

```ts
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
```

Niyə sadəcə `{ ...shared, ...screens }` yazmaq olmaz?

Çünki **hər iki faylda `basket` adlı bölmə var**:

```jsonc
// shared.json
{ "basket": { "addedToBasket": "{{title}} səbətə əlavə edildi" } }

// screens.json
{ "basket": { "title": "Səbətim", "empty": "Səbətiniz boşdur" } }
```

Sadə spread ilə **ikinci** obyekt birincisini **bütövlükdə əvəz edərdi**. Nəticədə `basket.addedToBasket` açarı **yox olardı** — və toast göstərmək istəyəndə tərcümə əvəzinə xam açar adı görünərdi.

`deepMerge` isə iç-içə obyektləri **birləşdirir**, əvəz etmir.

Bu, real olaraq baş verib. Simptom çaşdırıcı idi: bəzi tərcümələr işləyir, bəziləri yox — heç bir xəta olmadan.

### Niyə sinxron, komponentdən kənarda?

```ts
i18n.use(initReactI18next).init({ /* ... */ });
```

Bu kod modul yüklənən **anda** işləyir — komponent daxilində, `useEffect`-də yox.

Səbəb: **ilk render artıq düzgün dildə olmalıdır.** Əks halda tətbiq bir an açarları (`login.title` kimi) və ya səhv dili göstərib sonra düzələrdi — gözlə görünən yanıb-sönmə.

Bu, `tokenStorage`-ın sinxron oxumaları ilə eyni prinsipdir: **açılışda göstərilməli olan hər şey, göstərilməzdən əvvəl hazır olmalıdır.**

### `intl-pluralrules` — kiçik, amma lazımlı

```ts
import 'intl-pluralrules';
```

Hermes (React Native-in JS mühərriki) `Intl.PluralRules` API-sini **daşımır**. i18next isə onu **init zamanı** yoxlayır — hətta heç bir cəm forması işlədilməsə belə.

Polyfill olmasa, funksional olaraq heç nə sınmır, amma hər açılışda konsola qorxuducu bir xəbərdarlıq düşür. Bu import onu susdurur.

**Sıra vacibdir:** bu import `i18n.init()`-dən **əvvəl** olmalıdır.

### `escapeValue: false` — niyə?

```ts
interpolation: {
  escapeValue: false,
},
```

i18next default olaraq dəyərləri HTML üçün "escape" edir (məsələn `'` → `&#39;`). Bu, brauzerdə XSS-dən qorunmaq üçündür.

React Native-də isə bu **lazımsızdır** (React onsuz da mətni təhlükəsiz render edir) və **zərərlidir**: məhsul adında apostrof varsa, ekranda `&#39;` kimi görünərdi.

### Dil dəyişikliyi necə işləyir?

`SettingsScreen`-də seçim edildikdə üç şey **eyni anda** baş verir:

```ts
setLanguage(code);          // 1. MMKV-yə yaz (növbəti açılış üçün)
i18n.changeLanguage(code);  // 2. Bütün ekranları dərhal yenidən render et
setLanguageState(code);     // 3. Seçim siyahısındakı "işarəni" yenilə
```

İkinci addım `react-i18next`-in gücüdür: `useTranslation()` işlədən **hər** komponent avtomatik yenidən render olunur. Əl ilə "hər yeri yenilə" yazmaq lazım gəlmir.

Dil həm də hər API sorğusuna əlavə olunur (`Accept-Language`, bax Hissə 11) — yəni backend-dən gələn mesajlar da düzgün dildə gəlir.

### İki məhsul qərarı

**1. "AZN" tərcümə olunmur.** Üç dildə də eyni qalır — valyuta kodları beynəlxalq standartdır. Bu, unudulmuş tərcümə deyil, təsdiqlənmiş qərardır.

**2. Uzun tərcümə üçün qabı böyütmək qadağandır.** Rus dilində düymə mətni `ProductCard`-a sığmayanda, kart **böyüdülmədi** — mətn kiçildildi (`Button`-un `textStyle` prop-u + `numberOfLines={1}`).

Səbəb: kartı bir dilə görə böyütsək, grid-in bütün ölçü riyaziyyatı **üç dildə də** dəyişir. Yəni bir dilin problemi hamının layoutunu pozardı.

---

## Hissə 21: Yerli bildirişlər (Notifee)

### Əvvəlcə vacib bir aydınlıq

Bu tətbiqdə **əsl push bildiriş yoxdur.**

Fərqi bilmək vacibdir:

| | **Push bildiriş** | **Yerli (local) bildiriş** |
|---|---|---|
| Kim göndərir | Server (FCM/APNs vasitəsilə) | Telefonun özü |
| Nə lazımdır | Firebase layihəsi, server infrastrukturu | Heç nə |
| Tətbiq bağlıdırsa | İşləyir | Yalnız əvvəlcədən planlaşdırılıbsa işləyir |

Burada olan — ikincisidir. Sifariş veriləndən sonra telefon **özü-özünə** iki bildiriş göstərir. Server bunlardan xəbərsizdir.

Niyə belə? Çünki backend-də push infrastrukturu yoxdur. Firebase-ə bağlı bir paket seçmək — istifadə olunmayacaq bir ekosistemi (Firebase layihəsi, `google-services.json` idarəsi) layihəyə gətirmək olardı.

### `notifyOrderPlaced()` — addım-addım

`OrderSuccessScreen` mount olanda bir dəfə çağırılır.

**Addım 1: İcazə soruş.**

```ts
const settings = await notifee.requestPermission();
if (settings.authorizationStatus < 1) return;
```

Android 13-dən etibarən bildiriş göstərmək üçün istifadəçidən icazə almaq lazımdır.

Diqqət: icazə **tətbiq açılanda deyil, məhz burada** soruşulur. Səbəb məntiqlidir — hələ heç bir sifariş verməmiş adamdan "sifariş bildirişlərinə icazə ver" istəmək mənasızdır. İcazə **kontekst içində** soruşulanda qəbul edilmə ehtimalı da yüksək olur.

**İcazə verilməsə nə olur?** `return` — səssizcə heç nə. Bu, şüurlu qərardır: sifariş onsuz da uğurla verilib. Bildiriş çıxmadı deyə istifadəçiyə xəta göstərmək — mövcud olmayan bir problemi bildirmək olardı.

**Addım 2: Kanal yarat.**

```ts
let channelReady: Promise<void> | undefined;

function ensureOrdersChannel(): Promise<void> {
  if (!channelReady) {
    channelReady = notifee.createChannel({
      id: ORDERS_CHANNEL_ID,
      name: i18n.t('notifications.channelName'),
      importance: AndroidImportance.HIGH,
    }).then(() => undefined);
  }
  return channelReady;
}
```

**Kanal nədir?** Android 8+-da hər bildiriş bir "kanala" aid olmalıdır. İstifadəçi telefon tənzimləmələrindən kanalları ayrı-ayrı idarə edə bilir — məsələn "sifariş bildirişləri gəlsin, reklam bildirişləri gəlməsin".

Diqqət: `channelReady` dəyişəni Hissə 11-dəki "in-flight promise" naxışının **eynisidir** — kanal bir dəfə yaradılır, sonrakı çağırışlar eyni promise-i paylaşır.

**Addım 3: Dərhal bildiriş göstər.**

```ts
await notifee.displayNotification({
  title: i18n.t('notifications.orderPlacedTitle'),
  body: i18n.t('notifications.orderPlacedBody', { orderNumber }),
  android: { channelId: ORDERS_CHANNEL_ID, smallIcon: 'ic_launcher', /* ... */ },
});
```

**Addım 4: 30 saniyəlik gecikməli bildiriş planlaşdır.**

```ts
const trigger: TimestampTrigger = {
  type: TriggerType.TIMESTAMP,
  timestamp: Date.now() + PREPARING_DELAY_MS,
};
await notifee.createTriggerNotification({ /* ... */ }, trigger);
```

Bu, "sifarişiniz hazırlanır" bildirişini **simulyasiya edir** — normalda serverdən gələcək bir push. Kodda bu, şərhlə açıq yazılıb ki, kimsə gələcəkdə bunu əsl push zənn etməsin.

### Bildiriş mətnləri i18n-dən gəlir

```ts
title: i18n.t('notifications.orderPlacedTitle'),
```

Diqqət: burada `useTranslation()` **yox**, birbaşa `i18n.t()` işlədilir. Səbəb: bu fayl komponent deyil, adi funksiyadır — hook çağıra bilməz.

`i18n` obyektini birbaşa import etmək bu hallarda düzgün yoldur. Eyni naxış `basket.toasts.ts`, `validation.ts`, `order.ts` və `httpClient.ts`-də də var.

---

## Hissə 22: Xəritədən ünvan seçimi (MapLibre)

### Niyə Google Maps yox?

`react-native-maps` + Google Maps ən tanınmış həlldir. **İşlədilmir.**

Səbəb: Google Maps SDK, pulsuz limit daxilində qalsanız belə, **billing hesabına bağlı API açarı** tələb edir — yəni kredit kartı, ödəniş alınmasa da.

Bu, kod yazılmazdan **əvvəl** aşkarlandı və istifadəçi ilə müzakirə edildi. Nəticədə alternativ seçildi: **MapLibre** (Google-a bağlı olmayan açıq mənbəli render mühərriki) + **OpenFreeMap**-in pulsuz `liberty` xəritə üslubu. Nə API açarı, nə billing.

> **Bu, ümumi bir prinsipin nümunəsidir:** asılılığın **gizli tələblərini** kod yazmazdan əvvəl yoxlayın. Burada iş başlamamış yoxlanıldığı üçün, sıfır kod boşa getdi.

### Faylların yeri

```
screens/protected/home/
├── MapAddressPicker/           ← komponent
├── AddressEditModal/           ← onu açan modal
└── hooks/useMapAddressPicker.ts ← məntiq
```

Bu komponent əvvəlcə `shared/components/` altında idi, sonra `home/`-a köçürüldü.

Səbəb: onun **yeganə** istifadəçisi `AddressEditModal`-dır, o da `home/` ekran komponentidir. Bu layihədə `shared/` "bir-biri ilə əlaqəsi olmayan ekranlarda **həqiqətən** işlədilən" şeylər üçündür. Tək istifadəçisi olan bir şeyi ora qoymaq qovluğun mənasını aşındırır.

İkinci bir istifadəçi çıxsa, geri köçürmək düzgün olar.

### "Sabit pin, hərəkət edən xəritə" naxışı

Xəritədə nöqtə seçməyin iki yolu var:

| Üsul | Necə işləyir | Problem |
|---|---|---|
| Pin-i sürüşdürmək | İstifadəçi pin-i tutub dartır | Barmaq pin-i **örtür**, altını görmür |
| **Xəritəni sürüşdürmək** | Pin ekranın mərkəzində sabit qalır, xəritə altından sürüşür | Yoxdur |

Layihə ikincisini seçib. Pin əslində xəritənin bir hissəsi **deyil** — ekranın mərkəzinə yerləşdirilmiş adi bir şəkildir. Xəritə isə altından sərbəst hərəkət edir.

Təsdiq düyməsinə basılanda xəritənin **mərkəz koordinatı** oxunur — çünki pin elə orada dayanır.

### `geocoding.service.ts` — koordinatdan ünvana

Xəritədən alınan nəticə `40.3777, 49.8920` kimi rəqəmlərdir. İstifadəçi isə oxunaqlı ünvan görməlidir.

Bu çevirməyə **reverse geocoding** deyilir:

```ts
const NOMINATIM_REVERSE_URL = 'https://nominatim.openstreetmap.org/reverse';

export async function reverseGeocode(lat: number, lon: number): Promise<string> {
  const params = new URLSearchParams({
    format: 'json',
    lat: String(lat),
    lon: String(lon),
    'accept-language': 'az',
  });
  const response = await fetch(`${NOMINATIM_REVERSE_URL}?${params.toString()}`, {
    headers: { 'User-Agent': 'TikTak-Mobile-App' },
  });
  // ...
  return data.display_name;
}
```

Nominatim — OpenStreetMap-in pulsuz geocoder-idir. API açarı tələb etmir, amma istifadə qaydaları var:

1. **Həqiqi `User-Agent` başlığı** göndərilməlidir (kim olduğunuzu bildirmək üçün).
2. Saniyədə təxminən **bir** sorğudan çox olmamalıdır.

Bu layihə ikinci şərtə rahat sığır, çünki sorğu yalnız istifadəçi "təsdiqlə" düyməsinə **basanda** göndərilir — xəritə hər sürüşəndə yox. Bu, həm də sürətli hiss verir: sürüşdürərkən heç bir gözləmə olmur.

Diqqət: bu servis `httpClient`-i **işlətmir**, birbaşa `fetch` çağırır. Səbəb: bu, bizim backend-imiz deyil — nə `Authorization` başlığı lazımdır, nə də 401-də token yeniləmə məntiqi.

### "Məni tap" düyməsi

```
LocationManager.requestPermissions() → getCurrentPosition() → kameranı ora uçur
```

`AndroidManifest.xml`-də iki icazə var: `ACCESS_FINE_LOCATION` və `ACCESS_COARSE_LOCATION`.

İstifadəçinin əsl mövqeyi `<UserLocation />` komponenti ilə xəritədə göstərilir.

### Dev build-də görünən sarı zolaq

MapLibre `liberty` üslubunda işləyəndə konsola belə xəbərdarlıqlar yaza bilər:

```
[WARN] [Mbgl] Invalid geometry in line layer
```

Bu, **bizim kodumuzun problemi deyil** — xəritə üslubunun özündən gəlir, kosmetikdir, release build-də ümumiyyətlə görünmür.

Amma bir yan təsiri var və onu bilmək lazımdır: React Native-in xəbərdarlıq zolağı (LogBox) ekranın altında, **hər şeyin üstündə** görünür və altındakı düymənin toxunuşlarını **uda bilir**.

Yəni: "düymə basılmır" deyə bug axtarmazdan əvvəl, ekranın altında sarı zolağın olub-olmadığına baxın. Bu zolaq `uiautomator dump` çıxışında **görünmür**, çünki normal görünüş ağacından kənardadır.

### Deep linking — sınandı, işlədi, çıxarıldı

Bir müddət `tiktak://` sxemi ilə deep linking (kənardan linklə tətbiqin konkret ekranını açmaq) tam tətbiq olundu və **işlədi**.

Sonra istifadəçinin açıq istəyi ilə **tamamilə geri çıxarıldı**: "açılacaq real bir link olmadığına görə praktiki istifadə yeri yoxdur".

Bu qeyd sənəddə saxlanılır ki, gələcəkdə kimsə "niyə deep linking yoxdur?" deyə soruşanda cavab məlum olsun: **texniki maneə deyil, əhatə dairəsi qərarı**. Yenidən lazım olsa, sıfırdan araşdırmağa ehtiyac yoxdur.

---

## Hissə 23: Öyrənilmiş dərslər

Bu hissə, layihə boyu **real olaraq baş vermiş** problemləri və onların həllini toplayır. Məqsəd: eyni araşdırmanı iki dəfə etməmək.

### 1. `@gorhom/bottom-sheet` — səssiz uyğunsuzluq

**Simptom:** `present()` çağırılır, heç bir xəta yoxdur, konsol təmizdir — amma panel **görünmür**.

**Səbəb:** kitabxananın v5 versiyası layihənin Reanimated **v4**-ü ilə uyğun gəlmir.

**Sınanan həllər:** `enableDynamicSizing`, açıq `snapPoints`, Reanimated-i v3-ə endirmək. Sonuncusu ayrıca bir divara çırpıldı: v3-ün Android kodu RN 0.83-ün New Architecture API-ları ilə **compile olmur** (`UIManagerModuleListener` kimi siniflər artıq yoxdur).

**Nəticə:** kitabxana tamamilə çıxarıldı, öz `BottomSheet` komponentimiz yazıldı.

**Dərs:** çox yeni bir asılılıq (burada Reanimated v4) işlədirsinizsə, üçüncü tərəf kitabxanaların hələ ona **çatmamış** ola biləcəyini nəzərə alın. Üstəlik uyğunsuzluq həmişə xəta ilə özünü göstərmir — bəzən sadəcə **heç nə olmur**, bu isə debug etməyi qat-qat çətinləşdirir.

### 2. Parol maskalaması niyə əl ilədir?

**Simptom:** Android-də parol sahəsinə yazılan hər hərf ~2 saniyə **açıq görünür**.

**Səbəb:** əməliyyat sisteminin öz animasiyası. JS-dən söndürülmür.

**Sınananlar:** `autoCorrect`, `autoComplete`, `importantForAutofill` — heç biri kömək etmədi.

**Həll:** native maskalamadan tamamilə imtina (`secureTextEntry={false}`), maskanı özümüz çəkirik (bax Hissə 14).

**Dərs:** bəzən düzgün həll "problemi həll etmək" deyil, **problemli mexanizmi ümumiyyətlə işlətməməkdir**.

### 3. MMKV — iki tələ birdən

**Tələ A:** `react-native-mmkv` v4-də `new MMKV(config)` **işləmir**. v4 Nitro Modules üzərində yenidən yazılıb; `MMKV` artıq yalnız bir **tipdir**, runtime konstruktoru isə `createMMKV(config)` funksiyasıdır.

Ən pisi: səhv yazılış **tip yoxlamasından keçir**, xəta yalnız cihazda görünür:

```
Cannot read property 'prototype' of undefined
```

**Tələ B:** `react-native-nitro-modules` **real asılılıq** kimi əlavə edilməlidir. Yalnız `react-native-mmkv` quraşdırmaq Gradle build-ini sındırır:

```
Project with path ':react-native-nitro-modules' could not be found
```

### 4. `position: 'absolute'` footer-in gizli təhlükəsi

**Simptom:** qutunun **aşağı künclərinin** yuvarlaqlığı itir. Yuxarı künclər normaldır.

**İlk (səhv) diaqnoz:** "Android ScrollView-u `borderRadius`-a görə kəsmir". `overflow: 'hidden'`, `borderRadius`-u ScrollView-un özünə vermək, fonu ayrı bir `View`-a çıxarmaq — heç biri kömək etmədi.

**Əsl səbəb:** kəsmə problemi **ümumiyyətlə yox idi**. Aşağıda `position: 'absolute'` ilə yerləşdirilmiş footer var idi və o, qutunun **üstünü rəngləyirdi**.

Niyə? Çünki `marginBottom` yalnız **normal axındakı növbəti qardaşa** təsir edir. Absolut yerləşdirilmiş element axından **çıxarılıb** — onu heç bir margin itələmir.

**Həll:** footer-i normal axında saxlamaq. Onda qutu fiziki olaraq onun altına **girə bilmir**.

**Dərs:** simptom "render bug-ı" kimi görünəndə də, əvvəlcə **layout modelini** yoxlayın. Yanlış diaqnoz sizi saatlarla yanlış istiqamətdə axtarışa apara bilər.

### 5. `flex: 1` gizli şəkildə `height`-i əzir

**Simptom:** klaviatura bağlananda qutu 2-3 piksel **böyüyür**.

**Səbəb:** `flex: 1` daxildə `flexBasis: 0%` deməkdir və Yoga-nın ölçü hesabında **açıq `height`-dən üstün** tutulur. Yəni "əvvəl `flex:1`, sonra `onLayout` ilə ölçüb sabit `height` ver" naxışı, `flex`-i **təmizləmədən** işləmir.

**Həll:** ikinci mərhələdə `flex`-i açıq şəkildə sıfırlamaq, sadəcə `height` əlavə etmək kifayət deyil.

### 6. Sessiya bitmə axını — mərkəzi məntiqin istisnaları

401 xətasında avtomatik token yeniləməsi düzgün ideyadır. Amma **hər** 401 "sessiya bitdi" demək deyil.

Giriş formasında səhv şifrə də 401 verir. Ayrılmasaydı, istifadəçi şifrəni səhv yazdığı üçün "sessiyanız bitdi" mesajı ilə Welcome ekranına atılardı.

**Dərs:** mərkəzi, "hər şeyə tətbiq olunan" məntiq yazanda, ilk sual **"istisnası varmı?"** olmalıdır.

### 7. Backend cavabının "sabit olmayan sabitliyi"

`docs/api.md` üç endpoint üçün "zərf yoxdur" yazırdı. Üçü də **yanlış çıxdı** (bax Hissə 11).

**Dərs:** sənəd kod deyil — köhnəlir. Yeni endpoint əlavə edəndə cavabı **bir dəfə xam şəkildə çap edin**.

### 8. `navigate()` "geri qayıtmalıdır", amma zəmanət vermir

Sifariş uğur ekranına geri düymə ilə **qayıtmaq mümkün idi**, halbuki `navigate()` onu stack-dən atmalı idi.

**Həll:** `reset()`.

**Dərs:** "belə olmalıdır" davranışına, **qəti tələb** olanda güvənməyin. Üstəlik bu problem yalnız real cihazda, ekranlar arasında **dəfələrlə** gedib-gələrək tapıldı — bir dəfəlik sınaq kifayət etməzdi.

### 9. Metro-nun keşi — iki fərqli problem

**Problem A — haste map (fayl xəritəsi) köhnəlir.** Çoxlu fayl sürətlə yaradılıb-silinəndə (məsələn böyük yenidənqurma zamanı) Metro diskdə **mövcud olan** faylı tapa bilmir:

```
Unable to resolve module ./ComponentName.styles
```

**Problem B — transform keşi köhnəlir.** Daha gizlidir: heç bir xəta yoxdur, sadəcə **köhnə kod** işləyir. Real hallar:
- Yeni i18n açarları hər dildə Azərbaycan fallback-ı kimi göründü.
- Yeni SVG ikon **köhnə** formasını çəkməyə davam etdi.

Hər ikisi "kod səhvdir" kimi görünürdü, halbuki disk üzərində kod **düzgün** idi.

**Həll (hər ikisi üçün):**

```
# 8081 portundakı prosesi öldür, sonra:
npx react-native start --reset-cache
```

**Dərs:** `.json` və ya SVG dəyişikliyi tətbiqi tam bağlayıb açandan sonra da görünmürsə, **əvvəlcə Metro-nu şübhələndirin**, artıq düzgün olduğunu yoxladığınız kodu yenidən debug etməyin.

Metro həm də başqa səbəbdən **səssizcə ölə bilər**: fayl izləyicisi izlədiyi qovluq birdən silinəndə (Gradle-ın CMake müvəqqəti qovluqları, `npm install`-ın müvəqqəti paket qovluqları) tutulmamış `ENOENT` xətası ilə çökür. Simptom: tətbiq açılış ekranında **sonsuz ilişir**, logcat-də heç nə yoxdur. Səbəb kodda deyil — Metro sadəcə artıq işləmir.

### 10. Brend işarəsini əldən çəkməyin

WhatsApp ikonu iki dəfə freehand çəkildi. İkinci variant istifadəçiyə **"giriş qadağandır"** işarəsi kimi göründü — dairəvi baloncuq + diaqonal xətt vizual olaraq tam başqa bir tanınmış simvola çevrilir.

**Həll:** tanınmış, hazır monoxrom `<Path>` işlətmək.

**Dərs:** konkret bir brendi təmsil edən ikon üçün hazır, düzgün yolu işlədin. Ümumi anlayış ikonları (ox, səbət, tənzimləmə) üçün freehand normaldır — orada "səhv olmaq" mümkün deyil, brend markasında isə mümkündür.

### 11. Əl ilə override-ə həmişə "geri qayıt" yolu əlavə edin

Qaranlıq rejim açarına **bir dəfə** toxunmaq, tətbiqi həmişəlik override rejimində saxlayırdı. Geri yol yox idi.

Nəticə: **iki dəfə** "sistem temasını izləmir, bug var" şikayəti gəldi. Hər ikisi araşdırıldı, hər ikisində səbəb kod xətası yox, məhz bu idi.

**Həll:** uzun-basma ilə sıfırlama + uğur toast-ı + açar altında **daimi ipucu mətni**.

**Dərs:** gizli jest, sənədləşdirilməsə və ya görünən ipucu olmasa, **mövcud olmamaqla eynidir**.

### 12. Linter xəbərdarlığını susdurmazdan əvvəl anlayın

`toastConfig`-dəki hook problemi (Hissə 16) ESLint tərəfindən **düzgün göstərilirdi**. `// eslint-disable` yazmaq asan olardı — və gizli, gec partlayan bir çökmə qoyub getmək olardı.

**Dərs:** linter xəbərdarlığı sizin başa düşmədiyiniz bir şeyi göstərirsə, cavab onu susdurmaq deyil, **başa düşməkdir**.

### 13. Emulyator real cihaz deyil

Bu layihədə bir neçə problem **yalnız** əsl telefonda üzə çıxdı:

- `useColorScheme()`-in ikinci tema dəyişikliyində susması (Xiaomi/MIUI).
- Naviqasiya `reset` problemi (dəfələrlə gedib-gəlmə tələb edirdi).
- Parolun ilk hərfinin görünməsi (emulyatorda da var, amma real istifadədə daha nəzərəçarpandır).

**Dərs:** UI/layout dəyişikliyini **əsl cihazda, əsl skrinşotla** yoxlayın. "Nəzəri olaraq düzgündür" bu layihədə bir neçə dəfə səhv çıxıb.

### 14. Native asılılıq əlavə etməzdən əvvəl ön-yoxlama

`expo-image` epizodundan sonra bir qayda formalaşdı. Yeni native paket əlavə etməzdən **əvvəl**:

1. Kotlin/Java nisbətinə bax (Kotlin daha riskli — `expo-image` məhz Kotlin compile xətaları ilə uğursuz oldu).
2. `build.gradle`-də New Architecture dəstəyi göstəricilərinə bax.
3. `peerDependenciesMeta`-da `expo`-nun `optional: true` olub-olmadığına bax.
4. **Feature kodu yazmazdan əvvəl** native build-in keçdiyinə əmin ol.

Bu qayda `@notifee/react-native` və `@maplibre/maplibre-react-native`-ə tətbiq edildi — hər ikisi ilk cəhddə keçdi. `expo-image`-ə əvvəlcədən tətbiq edilsəydi, problem qat-qat tez görünərdi.

### 15. Windows-a xas build problemləri

Qısa siyahı (təfərrüat `CLAUDE.md`-dədir):

| Problem | Səbəb | Həll |
|---|---|---|
| `run-android` işləmir | Node `.bat` spawn-ını bloklayır | Birbaşa `gradlew.bat app:installDebug` |
| `Filename longer than 260 characters` | Windows MAX_PATH limiti | `buildStagingDirectory "C:/rnbuild/tiktak-cxx"` |
| SSL handshake xətası | Antivirus TLS-i MITM edir | Antivirusun kök sertifikatını Gradle-ın trust store-una əlavə etmək |
| Gradle daemon çökür | JIT compiler buq-u | `-XX:TieredStopAtLevel=1 -XX:ReservedCodeCacheSize=512m` |
| `assembleRelease` aapt2 çökməsi | Tam şəffaf PNG-lər | `crunchPngs false` (release buildType) |

Sonuncunun imzası yadda saxlanmağa dəyər: **`installDebug` işləyir, `assembleRelease` işləmir** — çünki AGP debug build-lərdə PNG sıxılmasını onsuz da söndürür.

---

## Hissə 24: Lüğət

**Alias (path alias)** — uzun nisbi yol (`../../../shared/...`) əvəzinə qısa ad (`@shared/...`). `babel.config.js` və `tsconfig.json`-da **ayrı-ayrı** təyin olunur.

**AppState** — tətbiqin ön planda/fonda olduğunu bildirən RN API-si.

**Barel fayl (`index.ts`)** — bir qovluğun məzmununu bayıra verən fayl. Import yollarını qısa və sabit saxlayır.

**Bundle** — bütün JS kodun bir fayla yığılmış hali. Metro yaradır.

**Debounce** — "hərəkət dayanana qədər gözlə, sonra bir dəfə icra et". Axtarışda və səbət sinxronizasiyasında işlədilir.

**Deep merge** — iç-içə obyektləri **birləşdirən** (əvəz etməyən) qoşma. i18n fayllarında vacibdir.

**Destructuring** — obyekt/array-in içindən dəyərləri çıxarmağın qısa sintaksisi.

**Envelope (zərf)** — backend cavabının `{ message, data, result }` sarğısı. Əsl məlumat `data`-dadır.

**Fast Refresh** — kod dəyişəndə tətbiqin state-ini itirmədən avtomatik yenilənməsi.

**Flexbox** — React Native-in **yeganə** layout sistemi. Default istiqamət: `column`.

**Generic (`<T>`)** — "tipi sonra deyəcəyəm" mexanizmi. `ApiEnvelope<UserProfile>` kimi.

**Gesture handler** — barmaq hərəkətlərini **native tərəfdə** tanıyan kitabxana.

**Haste map** — Metro-nun fayl xəritəsi. Köhnələndə "modul tapılmır" xətası verir.

**Hook** — `use` ilə başlayan funksiya. Yalnız komponent (və ya başqa hook) daxilində çağırıla bilər.

**Hermes** — React Native-in JS mühərriki. `Intl.PluralRules` kimi bəzi API-ləri daşımır.

**Interceptor** — sorğu/cavab yolunun üstündəki yoxlama məntəqəsi. Token əlavə etmək və 401-i tutmaq üçün.

**JSI (JavaScript Interface)** — New Architecture-da JS ilə native arasındakı birbaşa körpü.

**JSX** — HTML-ə oxşayan, amma JavaScript funksiya çağırışlarına çevrilən sintaksis.

**Keychain / Keystore** — telefonun öz təhlükəsizlik anbarı. Şifrələmə açarı burada saxlanılır.

**LogBox** — dev build-də görünən sarı/qırmızı xəbərdarlıq zolağı. Altındakı düymələri **örtə bilir**.

**Metro** — React Native-in paketləyicisi (Webpack-in qarşılığı).

**MMKV** — sürətli, **sinxron** yerli yaddaş. AsyncStorage-ın əvəzi.

**Native modul** — JS-dən əlçatan olmayan OS imkanlarına körpü quran kitabxana. Əlavə edildikdən sonra **native rebuild** tələb edir.

**New Architecture** — RN-in Fabric + TurboModules + JSI-ə əsaslanan yeni daxili quruluşu.

**Nominatim** — OpenStreetMap-in pulsuz geocoder-i. `User-Agent` tələb edir.

**Optimistik yeniləmə** — "əvvəlcə ekranı yenilə, sonra serverdən təsdiq al, xəta olsa geri qaytar".

**Persister** — TanStack Query keşini diskə yazan mexanizm.

**Props** — komponentə **kənardan** verilən məlumat. Komponent onu dəyişə bilməz.

**Query key** — TanStack Query keşindəki "ünvan". Eyni açar = eyni keş yazısı.

**Race condition (yarış vəziyyəti)** — iki asinxron işin gözlənilməyən sıra ilə bitməsindən doğan səhv.

**Reanimated** — animasiya məntiqini **UI thread-də** icra edən kitabxana.

**Safe area** — notch/status bar/jest zolağının tutduğu, kontent qoyulmamalı sahə.

**Selector** — store-dan yalnız lazım olan hissəni oxuyan funksiya (`state => state.basket`). Lazımsız render-lərin qarşısını alır.

**Skeleton** — məlumat gələnə qədər göstərilən boz "sümük" yer tutucusu.

**Stale (köhnəlmiş)** — keşdəki məlumatın "təzəlik" müddəti bitib, arxa planda yenilənə bilər.

**State** — komponentin öz daxili yaddaşı. Dəyişəndə komponent yenidən render olunur.

**Toast** — ekranı bloklamayan, öz-özünə yoxa çıxan bildiriş.

**Type guard** — `if` ilə TypeScript-ə "bu blokda tip daha dardır" deyən yoxlama.

**Union tip (`|`)** — "ya bu, ya o" (`'CASH' | 'CARD'`).

**Worklet** — UI thread-də icra olunan funksiya (Reanimated).

**Zustand** — sadə, Provider tələb etməyən qlobal state kitabxanası.
