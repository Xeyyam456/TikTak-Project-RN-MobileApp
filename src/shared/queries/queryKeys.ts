// Central query key registry so screens sharing the same data (e.g. profile
// is read on Home, Profile, AccountInfo, and Checkout) hit the same cache
// entry instead of each keeping its own separately-fetched copy.
export const queryKeys = {
  profile: ['profile'] as const,
  categories: ['categories'] as const,
  campaigns: ['campaigns'] as const,
  favorites: ['favorites'] as const,
  orders: ['orders'] as const,
  products: (params?: { limit?: number; search?: string }) =>
    ['products', params ?? {}] as const,
};
