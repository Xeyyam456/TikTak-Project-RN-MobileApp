import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';
import BasketScreen from '../screens/protected/basket/BasketScreen';
import CheckoutScreen from '../screens/protected/checkout/CheckoutScreen';
import OrderSuccessScreen from '../screens/protected/checkout/OrderSuccessScreen';
import { RootStackParamList } from '@typings/navigation';
import { getAccessToken } from '@shared/api/tokenStorage';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const initialRouteName = getAccessToken() ? 'Main' : 'Welcome';

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="Basket" component={BasketScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
