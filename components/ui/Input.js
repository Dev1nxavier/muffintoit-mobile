import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import PropTypes from 'prop-types';


const InputField = ({ label, textInputConfig, style, value})=>{
    const inputStyles = [styles.input];

    if(textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline)
    };

    return (<View style={[styles.outerContainer, style]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput 
        style={inputStyles} {...textInputConfig}
        value={value}
        />
    </View>)
}

const FormError = ({error, message})=>{
    return(
        <Text style={styles.errors}>{message}</Text>
    )
}

const styles= StyleSheet.create({
    outerContainer:{
        marginHorizontal: 4,
        marginVertical: 8,

    },
    label:{
        fontSize: 12,
        marginBottom: 4,
        color:Colors.light.text,
    },
    input:{
        padding: 6,
        borderRadius: 6,
        fontSize: 14,
        borderBottomColor: Colors.dark.background,
        borderBottomWidth:1,
    },
    inputMultiline:{
        minHeight: 100,
        textAlignVertical: 'top',
    },
    errors:{
        color: 'red',
        fontSize: 10,
        fontStyle:'italic',
        alignSelf:'flex-start',
    }
})

export default InputField;
export {FormError};