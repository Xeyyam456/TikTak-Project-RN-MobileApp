import type { RefObject } from 'react';
import type { ScrollView } from 'react-native';
import type { Category } from '@typings/api';

export type ChipLayout = { x: number; width: number };

export type CategoryChipsRowProps = {
  categories: Category[];
  selectedCategoryId: number;
  onSelect: (categoryId: number) => void;
  chipsScrollRef: RefObject<ScrollView | null>;
  onChipsContentSizeChange: () => void;
  onChipLayout: (categoryId: number, layout: ChipLayout) => void;
};
