import { useMemo } from 'react';
import { Text, View } from 'react-native';
import i18n from '@shared/i18n';
import { useTheme } from '../../../theme/ThemeContext';
import Button from '../Button';
import { createStyles } from './ErrorBoundary.styles';
import type { ErrorBoundaryFallbackProps } from './ErrorBoundary.types';

// Split out of the ErrorBoundary class itself purely so the fallback can read
// the theme through useTheme() — a class component can't. Safe because
// ThemeProvider sits above ErrorBoundary in App.tsx (see the comment there),
// so this always renders inside the provider.
function ErrorBoundaryFallback({ error, onRetry }: ErrorBoundaryFallbackProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('errorBoundary.title')}</Text>
      <Text style={styles.message}>{i18n.t('errorBoundary.message')}</Text>
      {__DEV__ ? (
        <Text style={styles.debug}>
          {error.message}
          {'\n'}
          {error.stack}
        </Text>
      ) : null}
      <Button title={i18n.t('common.retry')} onPress={onRetry} />
    </View>
  );
}

export default ErrorBoundaryFallback;
