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
  Profile: NavigatorScreenParams<ProfileStackParamList> | undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  CategoryProducts: { categoryId: number; categoryName: string };
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  AccountInfo: undefined;
  MyLists: undefined;
  OrderHistory: undefined;
  Settings: undefined;
};
