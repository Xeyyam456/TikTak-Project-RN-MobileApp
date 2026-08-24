import { Text } from 'react-native';
import { styles } from './AuthSwitchLink.styles';
import type { AuthSwitchLinkProps } from './AuthSwitchLink.types';

function AuthSwitchLink({ promptText, linkText, onPress }: AuthSwitchLinkProps) {
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
