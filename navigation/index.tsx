
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import CheckoutScreen from '../screens/CheckoutScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import Signup from '../screens/SignUp';
import Signin from '../screens/SignIn';
import ProductsScreen from '../screens/ProductsScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import OrderHistory from '../screens/OrderHistoryScreen';
import Cart from '../screens/CartScreen';
import OrderHistoryDetails from '../screens/OrderHistoryDetailScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import { useSelector } from 'react-redux'
import { setCart } from '../store/redux/cartSlice';
import { useDispatch } from 'react-redux';
import { setCategories, setProducts } from '../store/redux/productsSlice';
import { getCategories, getProducts, retrieveCart } from '../util/eCommerce';
import ThankYou from '../screens/ThankYouScreen';
import { logout, updateUser } from '../store/redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {

  const dispatch = useDispatch();

  const cartId = useSelector(state => state.cartState.cartId)

  React.useEffect(() => {

    async function fetchCategories() {
      const categories = await getCategories();
      dispatch(setCategories(categories));
    }

    async function fetchProducts() {
      const data = await getProducts();
      dispatch(setProducts(data));
    }

    fetchCategories();
    fetchProducts();


  }, [])

  React.useEffect(() => {

    //fetch cart
    async function fetchCart() {
      const cart = await retrieveCart();
      dispatch(setCart({ ...cart }));
    }

    fetchCart();


  }, [cartId])

  React.useEffect(() => {

    async function autoLogin() {
      //check for token
      const sessionToken = await AsyncStorage.getItem('@sessionToken');
      const localId = await AsyncStorage.getItem('@localId');

      if (!!sessionToken && sessionToken !== '') {
        const isAuthenticated = true;
        dispatch(updateUser({ isAuthenticated: isAuthenticated, sessionToken: sessionToken, localId: localId}));
      }
    }

    autoLogin();

  }, [])


  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {

  const {isAuthenticated, sessionToken, localId} = useSelector(state => state.userState);

  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#351401' },
      headerTintColor: 'white',
      contentStyle: { backgroundColor: '#3f2f25' },

    }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Products" component={ProductsScreen} options={
        ({ route, navigation }) => ({
          title: route.params?.name,
          contentStyle: { backgroundColor: '#3f2f25' }
        })} />
      <Stack.Screen name="Details" component={ProductDetailsScreen} options={({ route }) => ({ title: route.params?.title })} />
      {!isAuthenticated && <Stack.Screen name='Signin' component={Signin} />}
      {!isAuthenticated && <Stack.Screen name='Signup' component={Signup} />}
      <Stack.Screen name='OrderDetails' component={OrderHistoryDetails} />
      <Stack.Screen name='Checkout' component={CheckoutScreen} />
      <Stack.Screen name='ThankYou' component={ThankYou} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {

  const dispatch = useDispatch();
  const authenticated = useSelector(state => state.userState.isAuthenticated);

  const colorScheme = useColorScheme();

  const handleLogout = () => {
    //remove token from storage
    AsyncStorage.removeItem('@sessionToken');

    //update state
    dispatch(logout(null));
  }
  console.log("authenicated? ", authenticated);

  return (
    <BottomTab.Navigator
      initialRouteName="Categories"
      screenOptions={({navigation})=>({
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerStyle: { backgroundColor: '#351401' },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontFamily: 'merienda-bold',
        },
        headerRight: () => (authenticated ? <Pressable
          onPress={() => handleLogout()}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}>
          <TabBarIcon name={'sign-out'} color={'white'} />
        </Pressable> :
          <Pressable
            onPress={() => (navigation.navigate('Signup'))}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}>
            <TabBarIcon name={'sign-in'} color={'white'} />
          </Pressable>
        )

      })}>
      
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
        })}
      />
        <BottomTab.Screen
          name="OrderHistory"
          component={OrderHistory}
          options={{
            title: 'Order history',
            tabBarIcon: ({ color }) => <TabBarIcon name="history" color={color} />,
          }}
        />
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

function TabBarIcon5(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={30} style={{ marginBottom: -3, }} {...props} />;
}
