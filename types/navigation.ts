import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Welcome: undefined;
  Register: undefined;
  Login: undefined;
  Main: NavigatorScreenParams<ProtectedTabParamList> | undefined;
  Basket: undefined;
  Checkout: undefined;
  OrderSuccess: undefined;
};

export type ProtectedTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList> | undefined;
  Search: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  CategoryProducts: { categoryId: number; categoryName: string };
};
