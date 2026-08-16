# Tiktak API Reference

Mənbə: `Tiktak - E-commerce Api's - Stage 3-4 Final.postman_collection.json` (Desktop). Bu fayl services qatını (`src/shared/services/` və ya `src/api/`) yazarkən referans kimi istifadə olunur — hər servis funksiyası burada göstərilən method/url/body/response şəklinə uyğun olmalıdır.

## Baza konfiqurasiya

- **Base path**: `{{BASE_URL}}/api/tiktak/...` — `BASE_URL` mühit dəyişəni Postman kolleksiyasında təyin olunmayıb, real qiymət backend komandasından və ya `.env`-dən alınmalıdır.
- **Auth**: `Authorization: Bearer {{ACCESS_TOKEN}}` — login/signup cavabından alınan `access_token`.
- **Token yenilənməsi**: `access_token` bitəndə `POST /auth/refresh` ilə `refresh_token` göndərilir, yeni cüt token qaytarılır.
- **Dil başlığı**: `Accept-Language: {{LANG}}` (məs. `az`) — demək olar bütün endpoint-lərdə istifadə olunur, optional.
- **Cavab zərfi (envelope)**: əksər endpoint-lər bu formatı qaytarır:
  ```json
  { "message": "Ok", "data": { /* ... */ }, "result": true }
  ```
  Bəzi endpoint-lər (`orders/checkout`, `orders/user`, `orders/admin` stats) bu zərfi işlətmir, birbaşa obyekt/array qaytarır — hər endpointin qeydinə bax.
- **Pagination** (list endpoint-lərində `data`-nın yanında):
  ```json
  "pagination": { "next": null, "prev": null, "current": 1, "total": 2, "totalPages": 1 }
  ```
  Dəstəklənən query param-lar (məs. `products`, `admin/products`): `limit`, `page`, `search`.

### Enum-lar

```ts
enum ProductMeasure {
  KG = 'kg', GR = 'gr', LITRE = 'litre', ML = 'ml', METER = 'meter',
  CM = 'cm', MM = 'mm', PIECE = 'piece', PACKET = 'packet', BOX = 'box',
}

enum OrderStatus {
  PENDING = 'PENDING', CONFIRMED = 'CONFIRMED', PREPARING = 'PREPARING',
  READY = 'READY', DELIVERED = 'DELIVERED', CANCELLED = 'CANCELLED',
}

enum PaymentMethod { CASH = 'CASH', CARD = 'CARD' }

enum UserRole { ADMIN = 'ADMIN', COMMERCE = 'COMMERCE' } // client user rolu "COMMERCE"
```

### Bilinən uyğunsuzluqlar (backend-də təsdiqlənməli)

- `Client > Order > list`: Postman-da url `{{BASE_URL}}/api/tiktak//orders/user` (cüt `/`) — real path ehtimal ki `/api/tiktak/orders/user`-dır, test zamanı yoxla.
- `Admin > Orders > stats`: url `list` ilə eynidir (`/orders/admin`), amma cavab fərqlidir (`{TOTAL, DELIVERED, PENDING, PREPARING, TOTAL_REVENUE}`, envelope yoxdur). Real endpoint ehtimal ki `/orders/admin/stats`-dır — kolleksiya köhnəlmiş ola bilər.
- `Admin > Orders > list/stats` request body-si (`basket_id`, `payment`, `note`) `GET` sorğusuna aid deyil, checkout body-sindən qalıq görünür — nəzərə alma.

---

## Client (mobil app-in istifadə edəcəyi endpoint-lər)

### Auth — `auth: none`

| Method | Endpoint | Body |
|---|---|---|
| POST | `/auth/signup` | `{ full_name, phone, password }` |
| POST | `/auth/login` | `{ phone, password }` |
| POST | `/auth/refresh` | `{ refresh_token }` |

**POST /auth/signup**
```json
// req
{ "password": "1234", "full_name": "John Doe", "phone": "+994516667766" }
// res 201
{ "message": "Successfully registered", "data": null, "result": true }
```

**POST /auth/login**
```json
// req
{ "phone": "+994516667766", "password": "12345" }
// res 200
{
  "message": "Ok",
  "data": {
    "tokens": { "access_token": "...", "refresh_token": "..." },
    "profile": {
      "id": 3, "full_name": "John Doe", "phone": "+994516667766",
      "address": null, "img_url": null, "role": "COMMERCE",
      "created_at": "2025-06-12T05:47:24.588Z"
    }
  },
  "result": true
}
```

**POST /auth/refresh**
```json
// req
{ "refresh_token": "{{REFRESH_TOKEN}}" }
// res 200
{ "message": "Ok", "data": { "access_token": "...", "refresh_token": "..." }, "result": true }
```

### Profile — `auth: bearer`

| Method | Endpoint | Body |
|---|---|---|
| GET | `/profile` | — |
| PUT | `/profile` | `{ full_name, img_url?, address, password?, password_repeat? }` |

```json
// GET /profile — res 200
{
  "message": "Ok",
  "data": {
    "id": 3, "full_name": "John Doe", "phone": "+994516667766",
    "address": null, "img_url": null, "role": "COMMERCE",
    "created_at": "2025-06-12T05:47:24.588Z"
  },
  "result": true
}

// PUT /profile — req (password/password_repeat yalnız parol dəyişəndə)
{
  "full_name": "John Doe",
  "img_url": "https://.../avatar.png",
  "address": "Aga Neymatulla 80"
}
// res 200 — eyni shape yuxarıdakı kimi, yenilənmiş `address`/`img_url` ilə
```

### Products — `auth: bearer`

| Method | Endpoint | Body / Query |
|---|---|---|
| GET | `/products` | query: `limit`, `page`, `search` (hamısı optional) |
| GET | `/products/:id` | — |
| POST | `/products/:id/favorite` | — |
| GET | `/products/favorites` | — |

```json
// GET /products — res 200
{
  "message": "Ok",
  "data": [
    {
      "id": 3, "title": "Producty-2 Icki", "img_url": "",
      "description": "Lorem ipsum", "price": "12.90", "type": "litre",
      "created_at": "2025-06-12T06:49:09.440Z",
      "category": { "id": 1, "name": "Elektronika" }
    }
  ],
  "pagination": { "next": null, "prev": null, "current": 1, "total": 2, "totalPages": 1 },
  "result": true
}

// GET /products/:id — res 200 (tək məhsulda `category` tam obyekt yox, qısa + `is_favorite` var)
{
  "message": "Ok",
  "data": {
    "id": 1, "title": "Producty-1", "img_url": "", "description": "Lorem ipsum",
    "price": "12.90", "type": "kg", "created_at": "2025-06-12T06:38:08.292Z",
    "category": { "id": 1, "name": "Elektronika" },
    "is_favorite": false
  },
  "result": true
}

// POST /products/:id/favorite — res 201
{ "message": "Successfully added favorites", "data": null, "result": true }

// GET /products/favorites — res 200: /products list-dəki eyni məhsul shape-i, array olaraq
```

### Basket — `auth: bearer`

| Method | Endpoint | Body |
|---|---|---|
| GET | `/basket` | — |
| POST | `/basket/:productId/add` | — (miqdar backend-də avtomatik artırılır) |
| POST | `/basket/:productId/remove` | — (1 ədəd azaldır) |
| DELETE | `/basket/:productId/remove-all` | — (məhsulu tamam çıxarır) |
| DELETE | `/basket/clear` | — |

```json
// GET /basket — res 200 (BAŞQA endpoint-lərdən fərqli olaraq envelope YOXDUR)
{ "items": [], "total": "0.00", "count": 0 }

// POST /basket/:id/add — res 201 (BURADA envelope VAR)
{
  "message": "Ok",
  "data": {
    "items": [
      {
        "id": 2, "quantity": 9, "total_price": "116.10",
        "product": {
          "id": 5, "title": "Producty-2 Icki", "img_url": "",
          "description": "Lorem ipsum", "price": "12.90", "type": "litre",
          "created_at": "2025-06-13T04:54:05.529Z",
          "category": { "id": 1, "name": "Elektronika", "img_url": "...", "description": "...", "created_at": "..." }
        }
      }
    ],
    "total": "133.90",
    "count": 11
  },
  "result": true
}

// POST /basket/:id/remove, DELETE /basket/:id/remove-all, DELETE /basket/clear
// — eyni { message, data: { items, total, count }, result } shape-i qaytarır
```

> Qeyd: `GET /basket` cavabında `message`/`result` yoxdur, digər basket əməliyyatlarında var — service qatında iki fərqli tip kimi işlə (`BasketState` vs `{ message, data: BasketState, result }`).

### Category / Campaign — `auth: bearer`

| Method | Endpoint |
|---|---|
| GET | `/categories` |
| GET | `/campaigns` |

Hər ikisi eyni sadə list shape-i qaytarır:
```json
{
  "message": "Ok",
  "data": [
    { "id": 1, "name": "Elektronika", "img_url": "https://...", "description": "...", "created_at": "..." }
  ],
  "result": true
}
```
(`campaigns`-da sahə adı `name` yox, `title`-dır: `{ id, title, description, img_url, created_at }`.)

### Order — `auth: bearer`

| Method | Endpoint | Body |
|---|---|---|
| POST | `/orders/checkout` | `{ paymentMethod, note?, address, phone }` |
| GET | `/orders/user` | — (⚠️ url-də cüt `/` var, yuxarı qeydə bax) |
| GET | `/orders/user/:id` | — |

```json
// POST /orders/checkout — req
{
  "paymentMethod": "CARD",
  "note": "Lorem ipsum",
  "address": "Aga Neymatulla",
  "phone": "+994103193897"
}
// res 201 — ENVELOPE YOXDUR, birbaşa order obyekti
{
  "id": 1, "orderNumber": "ORD-20250613-630", "total": "18.89",
  "deliveryFee": "0.00", "paymentMethod": "CARD", "status": "PENDING",
  "note": "Lorem ipsum", "address": "Aga Neymatulla", "phone": "+994103193897",
  "createdAt": "...", "updatedAt": "...",
  "user": { "id": 3, "full_name": "John Doe", "...": "..." },
  "items": [
    { "id": 1, "quantity": 1, "total_price": "12.90", "product": { "...": "product shape (yuxarı bax)" } }
  ]
}

// GET /orders/user — res 200 — ENVELOPE YOXDUR, birbaşa array (yuxarıdakı order shape-i, `user` sahəsi olmadan)
// GET /orders/user/:id — res 200 — ENVELOPE YOXDUR, tək order obyekti
```

### Upload — `auth: bearer`

| Method | Endpoint | Body |
|---|---|---|
| POST | `/upload` | `multipart/form-data`, field: `file` |

```json
// res 201
{
  "message": "File uploaded successfully",
  "data": { "url": "https://uploads.sarkhanrahimli.dev/onlearn/images/....webp" },
  "result": true
}
```
Qaytarılan `url` sonra `img_url` kimi profile/product/category body-lərində istifadə olunur.

---

## Admin (yalnız admin panel/ekran qurulsa lazımdır)

### Auth — `auth: none`

| Method | Endpoint | Body |
|---|---|---|
| POST | `/auth/admin/login` | `{ phone, password }` |

Cavab shape-i client login ilə eynidir (`tokens` + `profile`, `profile.role: "ADMIN"`).

### Profile / Users — `auth: bearer`

| Method | Endpoint |
|---|---|
| GET | `/admin/profile` |
| GET | `/admin/users` |

`/admin/users` list-i user obyektinə əlavə olaraq hash-lənmiş `password` sahəsini də qaytarır (UI-da göstərilməməlidir).

### Category — `auth: bearer`

| Method | Endpoint | Body |
|---|---|---|
| POST | `/admin/category` | `{ name, description, img_url? }` |
| PUT | `/admin/categories/:id` | `{ name, description, img_url? }` |
| DELETE | `/admin/categories/:id` | — |
| GET | `/admin/categories` | — |

`remove` cavabı: `{ "message": "Successfully removed", "data": null, "result": true }` — bu pattern bütün admin `remove` endpoint-lərində təkrarlanır (Products, Campaign).

### Products — `auth: bearer`

| Method | Endpoint | Body / Query |
|---|---|---|
| POST | `/admin/product` | `{ title, description, price, type: ProductMeasure, img_url?, category_id }` |
| PUT | `/admin/products/:id` | eyni body |
| DELETE | `/admin/products/:id` | — |
| GET | `/admin/products` | query: `limit`, `page`, `search` |

Cavab (create/update) `category` sahəsini tam obyekt kimi qaytarır (bax yuxarı Client Products nümunəsi).

### Campaign — `auth: bearer`

| Method | Endpoint | Body |
|---|---|---|
| POST | `/admin/campaign` | `{ title, description, img_url? }` |
| PUT | `/admin/campaigns/:id` | eyni body |
| DELETE | `/admin/campaigns/:id` | — |
| GET | `/admin/campaigns` | — |

### Orders — `auth: bearer`

| Method | Endpoint | Body |
|---|---|---|
| GET | `/orders/admin` | — (list, envelope var: `{ message, data: Order[], result }`) |
| GET | `/orders/admin` *("stats" adlanır, url eynidir — yoxlanmalı)* | — |
| PUT | `/orders/admin/:id/status` | `{ status: OrderStatus }` |

```json
// GET /orders/admin ("stats" adlı sorğunun cavabı, envelope yoxdur)
{ "TOTAL": 1, "DELIVERED": 0, "PENDING": 0, "PREPARING": 1, "TOTAL_REVENUE": 0 }

// PUT /orders/admin/:id/status — req
{ "status": "PREPARING" }
// res 200
{ "message": "Order created successfully", "data": { /* order shape, `user` sahəsi yoxdur */ }, "result": true }
```

---

## Services qatı üçün tövsiyələr (növbəti addım)

- Layihədə hələ `axios`/`fetch` wrapper, token saxlama (`AsyncStorage`/`react-native-keychain`) və `services/` qovluğu yoxdur — servis fayllarını yazmazdan əvvəl bunlar qurulmalıdır.
- Tövsiyə olunan struktur: `src/shared/api/client.ts` (base axios instance + `Authorization`/`Accept-Language` interceptor + 401-də `/auth/refresh` ilə avtomatik yenilənmə) və hər domain üçün ayrı fayl: `src/shared/services/auth.service.ts`, `product.service.ts`, `basket.service.ts`, `order.service.ts`, `category.service.ts`, `campaign.service.ts`, `upload.service.ts`.
- Cavab tiplərini yuxarıdakı shape-lərə əsasən `types/api.ts`-də (və ya `src/shared/types/`) TS interface kimi tərif et — xüsusilə "envelope var/yox" fərqinə diqqət et (Basket `GET`, Order `checkout`/`list`/`:id`).
