import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ClockIcon,
  DocumentIcon,
  HeartIcon,
  HelpIcon,
  LogoutIcon,
  SettingsIcon,
} from '@shared/icons';
import type { ProfileStackParamList } from '@typings/navigation';
import MenuRow from '../MenuRow';
import { styles } from './ProfileMenu.styles';
import type { ProfileMenuProps } from './ProfileMenu.types';

function ProfileMenu({ onLogoutPress }: ProfileMenuProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const { t } = useTranslation();

  return (
    <View style={styles.menu}>
      <MenuRow
        icon={<DocumentIcon size={22} />}
        label={t('profile.accountInfo')}
        onPress={() => navigation.navigate('AccountInfo')}
      />
      <MenuRow
        icon={<HeartIcon size={22} />}
        label={t('profile.myLists')}
        onPress={() => navigation.navigate('MyLists')}
      />
      <MenuRow
        icon={<ClockIcon size={22} />}
        label={t('profile.orderHistory')}
        onPress={() => navigation.navigate('OrderHistory')}
      />
      <MenuRow
        icon={<HelpIcon size={22} />}
        label={t('profile.support')}
        onPress={() => navigation.navigate('Support')}
      />
      <MenuRow
        icon={<SettingsIcon size={22} />}
        label={t('settings.title')}
        onPress={() => navigation.navigate('Settings')}
      />
      <MenuRow
        icon={<LogoutIcon size={22} />}
        label={t('profile.logout')}
        onPress={onLogoutPress}
      />
    </View>
  );
}

export default ProfileMenu;
