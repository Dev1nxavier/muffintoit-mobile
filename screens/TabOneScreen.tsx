import { useEffect } from 'react';
import { Button, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import WebBrowser from 'expo-web-browser';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'GoogleLogin'>) {

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_GOOGLE_CLIENT_ID,
    iosClientId: process.env.IOS_GOOGLE_CLIENT_ID,
    androidClientId: process.env.ANDROID_GOOGLE_CLIENT_ID,
    webClientId: process.env.WEB_CLIENT_ID,
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
