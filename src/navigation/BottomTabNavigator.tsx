import {
  createBottomTabNavigator,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import type { ProtectedTabParamList } from '@typings/navigation';
import HomeStackNavigator from './HomeStackNavigator';
import SearchScreen from '../screens/protected/search/SearchScreen';
import ProfileStackNavigator from './ProfileStackNavigator';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator<ProtectedTabParamList>();

// `tabBar` is a render prop invoked as a plain function (not JSX) by
// BottomTabView, so it must stay a stable module-level reference that
// returns an element — passing the component itself would call TabBar()
// outside of React's render pipeline and break its hooks.
function renderTabBar(props: BottomTabBarProps) {
  return <TabBar {...props} />;
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={renderTabBar}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
