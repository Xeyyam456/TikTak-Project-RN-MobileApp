export type RootStackParamList = {
  Welcome: undefined;
  Register: undefined;
  Login: undefined;
  Main: undefined;
  Basket: undefined;
  Checkout: undefined;
  OrderSuccess: undefined;
};

export type ProtectedTabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  CategoryProducts: { categoryId: number; categoryName: string };
};
