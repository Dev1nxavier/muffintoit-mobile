/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          GoogleLogin: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          Products: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
          Cart:{
            screens:{
              CartScreen: 'three'
            }
          },
          Details:{
            screens:{
              ProductDetailsScreen: 'four'
            }
          },
          Signup:{
            screens:{
              Signup : 'five'
            }
          },
          Signin:{
            screens:{
              Signin:'six'
            }
          },
          Checkout:{
            screens:{
              CheckoutScreen: 'seven'
            }
          },
          ThankYou:{
            screens:{
              ThankYouScreen:'eight'
            }
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
