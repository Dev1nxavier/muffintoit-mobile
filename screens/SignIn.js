import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import AuthContent from '../components/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { loginUser, retrieveOrders } from '../util/eCommerce';
import { login, updateHistory } from '../store/redux/userSlice'

export default function Signin({navigation}) {

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();

  const handleSignin = async (email, password) => {

    setIsAuthenticating(true);
    try {
      const {idToken, localId} = await loginUser(email, password);
      console.log("SignInScreen: token:", idToken);
      dispatch(login({sessionToken: idToken, email:email, localId:localId}))
   
      navigation.navigate('OrderHistory');
    } catch (error) {
      Alert.alert("Error logging in user. Please check email or try again later");
      setIsAuthenticating(false);
    }

    
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in user..." />
  }
  return <AuthContent onAuthenticate={handleSignin} />
}
