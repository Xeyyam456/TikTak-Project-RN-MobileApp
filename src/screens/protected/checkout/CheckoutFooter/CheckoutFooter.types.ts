export type CheckoutFooterProps = {
  total: string | undefined;
  submitting: boolean;
  disabled: boolean;
  error: string | undefined;
  onSubmit: () => void;
};
