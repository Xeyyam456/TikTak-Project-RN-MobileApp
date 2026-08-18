import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '@typings/navigation';
import AppHeader from '@shared/components/AppHeader';
import HomeScreen from '../screens/protected/home/HomeScreen';
import CategoryProductsScreen from '../screens/protected/home/CategoryProductsScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <View style={styles.flex}>
      <AppHeader />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeMain" component={HomeScreen} />
        <Stack.Screen
          name="CategoryProducts"
          component={CategoryProductsScreen}
          options={{ gestureEnabled: false }}
        />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default HomeStackNavigator;
