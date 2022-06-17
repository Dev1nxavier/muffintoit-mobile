import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { StyleSheet  } from 'react-native';
import { Provider} from 'react-redux';
import { store } from './store/redux/store';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import { fetchPublickKey } from './helper'

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [publishkey, setPublishkey] = useState('');

  async function fetchKey(){
      const publishableKey = await fetchPublickKey()
      if(publishableKey){

        setPublishkey(publishableKey);
      }else{
        console.error("Error retrieving key");
      }
      
    }

  useEffect(()=>{
    fetchKey();
  },[])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StripeProvider publishableKey={publishkey}> 
        <Provider store={store} >
          <Navigation colorScheme={colorScheme} />
        </Provider>
        </StripeProvider>
          <StatusBar />
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
