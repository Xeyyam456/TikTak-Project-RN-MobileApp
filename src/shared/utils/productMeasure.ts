import type { ProductMeasure } from '@typings/api';

const PRODUCT_MEASURE_LABELS: Record<ProductMeasure, string> = {
  kg: 'kq',
  gr: 'qr',
  litre: 'litr',
  ml: 'ml',
  meter: 'metr',
  cm: 'sm',
  mm: 'mm',
  piece: 'ədəd',
  packet: 'paket',
  box: 'qutu',
};

export function formatProductMeasure(type: ProductMeasure): string {
  return PRODUCT_MEASURE_LABELS[type] ?? type;
}
