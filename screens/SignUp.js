import React, { useState } from 'react'
import AuthContent from "../components/AuthContent";
import {Alert, Button, Text} from 'react-native'
import { createUser } from "../util/eCommerce";
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { useDispatch } from 'react-redux';
import { login } from '../store/redux/userSlice';

const Signup = ({navigation}) => {

    const [isAuthenticating, setIsAuthenticating] = useState(false);
    
    const dispatch = useDispatch();

    const handleSignup = async (email, password)=>{

        setIsAuthenticating(true)

        try {

          const {idToken, localId}= await createUser (email, password);
          dispatch(login({sessionToken:idToken, email:email, localId:localId}));



        } catch (error) {
            Alert.alert("Error creating account. Please try again later");

            setIsAuthenticating(false);
        }
        
        
    }

    if(isAuthenticating){
        <LoadingOverlay message="Creating account..."/>
    }

    return (
    <> 
    <Text>SIGNUP SCREEN</Text>
    <Button title='To signin-->' onPress={()=>navigation.navigate('Signin')}/>
    <AuthContent isLogin={false} onAuthenticate={handleSignup}/>
    </>)
   
}

export default Signup;