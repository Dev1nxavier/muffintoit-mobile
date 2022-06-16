import * as React from 'react';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { Button } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyCL-3pWGcx8T8CbxsIjVoWZNUtjA1W03sw",
  authDomain: "muffintoit-a5c0a.firebaseapp.com",
  databaseURL: "https://muffintoit-a5c0a-default-rtdb.firebaseio.com",
  projectId: "muffintoit-a5c0a",
  storageBucket: "muffintoit-a5c0a.appspot.com",
  messagingSenderId: "575224364422",
  appId: "1:575224364422:web:eb99e87483ac39511d4007",
  measurementId: "G-KVR6NXL8VP"
};

// Initialize Firebase
const app = initializeApp();

const FirebaseSignIn = (props) => {
    
    // Initialize Firebase
    initializeApp({
      /* Config */
    });
    
      const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
          clientId: 'Your-Web-Client-ID.apps.googleusercontent.com',
          },
      );
    
      React.useEffect(() => {
        if (response?.type === 'success') {
          const { id_token } = response.params;
          
          const auth = getAuth();
          const provider = new GoogleAuthProvider();
          const credential = provider.credential(id_token);
          signInWithCredential(auth, credential);
        }
      }, [response]);
    
      return (
        <Button
          disabled={!request}
          title="Login"
          onPress={() => {
            promptAsync();
            }}
        />
      );
    }


export default FirebaseSignIn;