import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ProfileStackParamList } from '@typings/navigation';
import ProfileScreen from '../screens/protected/profile/ProfileScreen';
import AccountInfoScreen from '../screens/protected/profile/AccountInfoScreen';
import MyListsScreen from '../screens/protected/profile/MyListsScreen';
import OrderHistoryScreen from '../screens/protected/profile/OrderHistoryScreen';
import SettingsScreen from '../screens/protected/profile/SettingsScreen';
import SupportScreen from '../screens/protected/profile/SupportScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="AccountInfo" component={AccountInfoScreen} />
      <Stack.Screen name="MyLists" component={MyListsScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
    </Stack.Navigator>
  );
}

export default ProfileStackNavigator;
