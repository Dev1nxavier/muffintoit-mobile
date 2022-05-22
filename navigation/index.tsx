
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import OrderHistory from '../screens/OrderHistoryScreen';
import Cart from '../screens/CartScreen';
import OrderHistoryDetails from '../screens/OrderHistoryDetailScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CustomHeader from '../components/CustomHeader';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 root stack navigator for displaying modals on top of all other content.
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#351401' },
      headerTintColor: 'white',
      contentStyle: { backgroundColor: '#3f2f25' }
    }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Products" component={ProductsScreen} options={
        ({ route, navigation }) => ({
          title: route.params?.name,
          contentStyle: { backgroundColor: '#3f2f25' }
        })} />
      <Stack.Screen name="Details" component={ProductDetailsScreen} options={({ route }) => ({ title: route.params?.title })} />
      <Stack.Screen name='OrderDetails' component={OrderHistoryDetails} />
      <Stack.Screen name='Checkout' component={CheckoutScreen} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const isLoggedIn = true;

  return (
    <BottomTab.Navigator
      initialRouteName="Categories"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerStyle: { backgroundColor: '#351401' },
        headerTintColor: 'white',
        headerTitleStyle: { fontFamily: 'merienda-bold' }

      }}>

      <BottomTab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'All categories',
          tabBarIcon: ({ color }) => <TabBarIcon name="th-large" color={color} />
        }}
      />

      <BottomTab.Screen
        name="Cart"
        component={Cart}
        options={({ navigation }: RootTabScreenProps<'Cart'>) => ({
          title: 'Cart',
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-basket" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="user-secret"
                size={25}
                color={'white'}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      {isLoggedIn ?
        <BottomTab.Screen
          name="OrderHistory"
          component={OrderHistory}
          options={{
            title: 'Order History',
            tabBarIcon: ({ color }) => <TabBarIcon name="history" color={color} />,
          }}
        /> :
        <BottomTab.Screen
          name="GoogleLogin"
          component={TabOneScreen}
          options={({ navigation }: RootTabScreenProps<'GoogleLogin'>) => ({
            title: 'Login with Google',
            tabBarIcon: ({ color }) => <TabBarIcon name="google" color={color} />,
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('Modal')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                <FontAwesome
                  name="user-secret"
                  size={25}
                  color={'white'}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            ),
          })}
        />
      }

    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
