export type BasketFooterProps = {
  total: string | undefined;
  onCheckout: () => void;
  // Reported back so the list above can reserve matching bottom padding —
  // this footer is absolutely positioned and its height depends on the
  // device's safe-area inset.
  onHeightChange: (height: number) => void;
};
