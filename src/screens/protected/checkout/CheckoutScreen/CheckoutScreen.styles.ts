import { StyleSheet } from 'react-native';
import type { ThemeColors } from '../../../../theme/colors';

// Form, payment picker and footer styles live with their own components in
// CheckoutForm/, PaymentMethodPicker/ and CheckoutFooter/.
export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loader: {
      marginTop: 32,
    },
  });
