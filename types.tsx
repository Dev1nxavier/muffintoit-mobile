/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Products: undefined;
  Categories: undefined;
  Details: undefined;
  Checkout: undefined;
  OrderDetails:undefined;
  Signin:undefined;
  Signup:undefined;
  ThankYou: undefined;
  FireBase: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

//specify type if has params. 
export type RootTabParamList = {
  GoogleLogin: undefined;
  Products: undefined;
  Cart: undefined;
  Categories: undefined;
  Details: undefined;
  Checkout: undefined;
  OrderHistory: undefined;
  Signup:undefined;
  Signin: undefined;
  ThankYou: undefined;
  Firebase: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
