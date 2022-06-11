import React, { useState } from 'react';
import { Alert, Button, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import AuthContent from '../components/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../store/redux/userSlice'
import { loginUser } from '../util/eCommerce';

export default function Signin({navigation}) {

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();

  const handleSignin = async (email, password) => {

    setIsAuthenticating(true);
    try {
      
      const {idToken, localId} = await loginUser(email, password);
      console.log("Signin: localId:", localId);
      dispatch(login({sessionToken: idToken, email:email, localId:localId}))
      
    } catch (error) {
      Alert.alert("Error logging in user. Please check email or try again later");
      setIsAuthenticating(false);
    }

    
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in user..." />
  }
  return (<>
  <Text>SIGN-IN SCREEN</Text>
  <Button title='To Signup-->' onPress={()=>navigation.navigate('Signup')}/>
  <AuthContent isLogin={true} onAuthenticate={handleSignin} />
  </>)
}
