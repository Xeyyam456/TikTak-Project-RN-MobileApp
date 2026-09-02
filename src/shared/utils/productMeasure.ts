import i18n from '@shared/i18n/i18n';
import type { ProductMeasure } from '@typings/api';

const PRODUCT_MEASURE_KEYS: Record<ProductMeasure, string> = {
  kg: 'productMeasure.kg',
  gr: 'productMeasure.gr',
  litre: 'productMeasure.litre',
  ml: 'productMeasure.ml',
  meter: 'productMeasure.meter',
  cm: 'productMeasure.cm',
  mm: 'productMeasure.mm',
  piece: 'productMeasure.piece',
  packet: 'productMeasure.packet',
  box: 'productMeasure.box',
};

export function formatProductMeasure(type: ProductMeasure): string {
  const key = PRODUCT_MEASURE_KEYS[type];
  return key ? i18n.t(key) : type;
}
