import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from '@shared/components/Button';
import { useTheme } from '../../../theme/ThemeContext';
import { createStyles } from './ErrorState.styles';
import type { ErrorStateProps } from './ErrorState.types';

function ErrorState({ message, onRetry }: ErrorStateProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Button title={t('common.retry')} onPress={onRetry} style={styles.retryButton} />
    </View>
  );
}

export default ErrorState;
