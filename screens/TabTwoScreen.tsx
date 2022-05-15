import { Button, StyleSheet } from 'react-native';
import * as Facebook from 'expo-auth-session/providers/facebook'
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';

export default function TabTwoScreen() {

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    expoClientId: '415066556812293',
    webClientId: '415066556812293',
    clientId: '415066556812293',
  })

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button
        title='Login with Facebook'
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      />
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
