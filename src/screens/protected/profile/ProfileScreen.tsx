import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '@shared/components/Button';
import { logout } from '@shared/services/auth.service';
import { getProfile } from '@shared/services/profile.service';
import type { RootStackParamList } from '@typings/navigation';
import type { UserProfile } from '@typings/api';
import { FONTS } from '../../../theme/fonts';

function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [profile, setProfile] = useState<UserProfile>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await logout();
    navigation
      .getParent<NativeStackNavigationProp<RootStackParamList>>()
      ?.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 24 }]}>
      <Text style={styles.title}>Hesabım</Text>

      {loading ? (
        <ActivityIndicator color="#7BC043" style={styles.loader} />
      ) : (
        <View style={styles.card}>
          <Text style={styles.name}>{profile?.full_name}</Text>
          <Text style={styles.detail}>{profile?.phone}</Text>
          <Text style={styles.detail}>
            {profile?.address ?? 'Ünvan seçilməyib'}
          </Text>
        </View>
      )}

      <Button title="Çıxış et" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
  },
  loader: {
    marginVertical: 32,
  },
  card: {
    marginTop: 24,
    marginBottom: 32,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F1F0F7',
    gap: 4,
  },
  name: {
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: FONTS.semiBold,
  },
  detail: {
    fontSize: 13,
    color: '#333333',
    fontFamily: FONTS.regular,
  },
});

export default ProfileScreen;
