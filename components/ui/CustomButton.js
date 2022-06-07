import { StyleSheet, Button, View, Text, TouchableOpacity } from 'react-native';

export default function CustomButton({ title, handlePress, status, style,}){

    return (
        <TouchableOpacity onPress={handlePress} disabled={status}>
            <View style={[styles.outerContainer, style]}>
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    outerContainer:{
        borderColor: '#cc9827',
        borderWidth:1,
        height: 50,
        justifyContent:'center',
        textAlign:'center',
        padding: 12,
        margin: 24,
    },
    buttonText:{
        fontWeight: 'bold',
        fontSize:20,
        textAlign:'center'
    }
})
