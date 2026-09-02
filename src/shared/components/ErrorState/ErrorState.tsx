import { useMemo } from 'react';
import { Text, View } from 'react-native';
import Button from '@shared/components/Button';
import { useTheme } from '../../../theme/ThemeContext';
import { createStyles } from './ErrorState.styles';
import type { ErrorStateProps } from './ErrorState.types';

function ErrorState({ message, onRetry }: ErrorStateProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Button title="Yenidən cəhd et" onPress={onRetry} style={styles.retryButton} />
    </View>
  );
}

export default ErrorState;
