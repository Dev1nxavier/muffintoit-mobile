import { useEffect } from 'react';
import { Button, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import WebBrowser from 'expo-web-browser';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'GoogleLogin'>) {

  // WebBrowser.maybeCompleteAuthSession();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:'639060091344-pnqrb3tqatejq0qermb1836f7hoi1lrp.apps.googleusercontent.com',
    iosClientId:'GOOGLE_GUID.apps.googleusercontent.com',
    androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    webClientId: '639060091344-pnqrb3tqatejq0qermb1836f7hoi1lrp.apps.googleusercontent.com',
  });

  useEffect(()=>{
    if(response?.type==='success'){
      const {authentication} = response;
    }
  },[response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button
        disabled={!request}
        title="Login with Google"
        onPress={()=>{
          promptAsync();
        }}
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
