import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '@shared/components/Button';
import FruitImage from '@assets/images/images1.svg';
import type { RootStackParamList } from '@typings/navigation';
import useReload from '../../../hooks/useReload';
import { styles } from './WelcomeScreen.styles';

function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { refreshing, onRefresh } = useReload();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top + 24 },
      ]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <FruitImage width={260} height={260} style={styles.image} />

      <View style={styles.footer}>
        <Text style={styles.description}>
          Sizə daha əlçatan olması üçün qeydiyyatdan keçərək davam edə
          bilərsiniz 🥰
        </Text>

        <Button
          title="Qeydiyyat"
          onPress={() => navigation.navigate('Register')}
        />

        <Text style={styles.loginText}>
          Hesabınız varsa {' '}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
          >
            Daxil olun
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

export default WelcomeScreen;
