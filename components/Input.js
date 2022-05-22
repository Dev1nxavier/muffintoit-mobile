import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import PropTypes from 'prop-types';


const InputField = ({ label, textInputConfig, style})=>{
    const inputStyles = [styles.input];

    if(textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline)
    };

    return (<View style={[styles.outerContainer, style]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={inputStyles} {...textInputConfig}/>
    </View>)
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
        fontSize: 18,
        backgroundColor: Colors.dark.background,
        color: Colors.dark.text,
    },
    inputMultiline:{
        minHeight: 100,
        textAlignVertical: 'top',
    }
})

export default InputField;