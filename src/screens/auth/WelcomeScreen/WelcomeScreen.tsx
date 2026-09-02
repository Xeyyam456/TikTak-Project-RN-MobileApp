import { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AuthSwitchLink from '@shared/components/AuthSwitchLink';
import Button from '@shared/components/Button';
import FruitImage from '@assets/images/images1.svg';
import type { RootStackParamList } from '@typings/navigation';
import { useTheme } from '../../../theme/ThemeContext';
import { createStyles } from './WelcomeScreen.styles';

function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top + 24 },
      ]}
    >
      <FruitImage width={260} height={260} style={styles.image} />

      <View style={styles.footer}>
        <Text style={styles.description}>{t('welcome.description')}</Text>

        <Button
          title={t('welcome.register')}
          onPress={() => navigation.navigate('Register')}
        />

        <AuthSwitchLink
          promptText={t('welcome.haveAccount')}
          linkText={t('welcome.login')}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </ScrollView>
  );
}

export default WelcomeScreen;
