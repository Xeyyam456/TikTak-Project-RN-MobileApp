import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ProfileStackParamList } from '@typings/navigation';
import ProfileScreen from '../screens/protected/profile/ProfileScreen';
import AccountInfoScreen from '../screens/protected/profile/AccountInfoScreen';
import MyListsScreen from '../screens/protected/profile/MyListsScreen';
import OrderHistoryScreen from '../screens/protected/profile/OrderHistoryScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="AccountInfo" component={AccountInfoScreen} />
      <Stack.Screen name="MyLists" component={MyListsScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
    </Stack.Navigator>
  );
}

export default ProfileStackNavigator;
