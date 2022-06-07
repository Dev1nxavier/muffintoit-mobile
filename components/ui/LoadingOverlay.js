import { View, ActivityIndicator, StyleSheet, Text} from 'react-native'

export default function LoadingOverlay({message}){
    return (
    <View style={styles.container}>
        <ActivityIndicator color='purple' size='large' style={styles.spinner}/>
        <Text>{message}</Text>
    </View>)
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        zIndex: 2,
        right:'50%',
        top:'50%',
    },
    spinner:{
        
    }
})