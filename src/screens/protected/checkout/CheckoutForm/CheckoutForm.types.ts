import type { PaymentMethod, UserProfile } from '@typings/api';

export type CheckoutFormProps = {
  profile: UserProfile | undefined;
  note: string;
  onNoteChange: (note: string) => void;
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
};
