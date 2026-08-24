import { useRef } from 'react';
import { ScrollView } from 'react-native';

type ChipLayout = { x: number; width: number };

export function useCategoryChipsScroll(selectedCategoryId: number) {
  const chipsScrollRef = useRef<ScrollView>(null);
  const chipLayouts = useRef<Record<number, ChipLayout>>({});
  const hasScrolledToInitialChip = useRef(false);
  const chipsContentReady = useRef(false);

  function scrollToChip(categoryId: number, animated: boolean) {
    const layout = chipLayouts.current[categoryId];
    if (!layout) return;
    // A scrollTo issued in the same commit as the chips' own layout can be
    // silently dropped — the native ScrollView hasn't settled its content
    // size yet and resets the offset once it does. Defer one frame so the
    // native layout is stable before applying the offset.
    requestAnimationFrame(() => {
      chipsScrollRef.current?.scrollTo({
        x: Math.max(0, layout.x - 20),
        animated,
      });
    });
  }

  // The ScrollView won't scroll past its currently-known content width, so
  // scrolling to a chip near the end before every chip has been measured
  // (onContentSizeChange not fired yet) silently clamps to a no-op. Wait for
  // both signals — full content width settled AND this chip's own position
  // known — before attempting the one-time initial scroll.
  function maybeScrollToInitialChip() {
    if (hasScrolledToInitialChip.current) return;
    if (!chipsContentReady.current) return;
    if (!chipLayouts.current[selectedCategoryId]) return;
    hasScrolledToInitialChip.current = true;
    scrollToChip(selectedCategoryId, false);
  }

  function onChipsContentSizeChange() {
    chipsContentReady.current = true;
    maybeScrollToInitialChip();
  }

  function onChipLayout(categoryId: number, layout: ChipLayout) {
    chipLayouts.current[categoryId] = layout;
    maybeScrollToInitialChip();
  }

  return { chipsScrollRef, onChipsContentSizeChange, onChipLayout, scrollToChip };
}
