import { useMemo } from 'react';
import { Text } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { createStyles } from './AuthSwitchLink.styles';
import type { AuthSwitchLinkProps } from './AuthSwitchLink.types';

function AuthSwitchLink({ promptText, linkText, onPress }: AuthSwitchLinkProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <Text style={styles.text}>
      {promptText} {' '}
      <Text style={styles.link} onPress={onPress}>
        {linkText}
      </Text>
    </Text>
  );
}

export default AuthSwitchLink;
