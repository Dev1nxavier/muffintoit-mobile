import React, { Component, useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { registerUser } from '../util/eCommerce';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store/redux/userSlice';
import InputField, { FormError } from '../components/ui/Input';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from './ui/LoadingOverlay';
import CustomButton from './ui/CustomButton';

export default function AuthContent({ isLogin, onAuthenticate }) {

    const { control, handleSubmit, reset, formState: { errors }, getValues } = useForm({
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            password:'',
            confirmPassword: '',
        },
    })

    const navigation =useNavigation();


    const handleRegister = async (data) => {
        console.log("Clicked handleRegister button")
        //only called after react-hook-form validation
        onAuthenticate(data.email, data.password);
    }

    const switchAuthModeHandler = ()=>{

        if(isLogin){
            navigation.navigate('Signup')
        }else{
            navigation.navigate('Signin')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isLogin ? "Sign in!" : "Sign up!"}</Text>
           <View style={styles.innerContainer}>
                {!isLogin && <>
                <View style={styles.inputRow}>
                        <Controller
                            name='firstname'
                            control={control}
                            rules={{
                                required: "First name is required",

                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <InputField
                                    label="First name"
                                    textInputConfig={{
                                        onBlur: onBlur,
                                        autoCapitalize: 'words',
                                        onChangeText: onChange
                                    }}
                                    value={value}
                                    style={styles.rowInputField} />
                            )}
                        />
                </View>
                {errors?.firstname && <FormError error={errors.firstname} message={errors.firstname.message}/>}
                <View style={styles.inputRow}>
                    <Controller
                        name='lastname'
                        control={control}
                        rules={{
                            required: "Last name is required"
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputField
                                label="Last name"
                                textInputConfig={{
                                    onChangeText: onChange,
                                    maxLength: 50,
                                    autoCapitalize: 'words',
                                    onBlur: onBlur,
                                }}
                                value={value}
                                style={styles.rowInputField} />
                        )}
                    />
                </View>
                {errors?.lastname && <FormError error={errors.lastname} message={errors.lastname.message}/>}
                </>}
                <View style={styles.inputRow}>
                    <Controller
                        name='email'
                        control={control}
                        rules={{
                            required: "email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                message: "invalid email entered"
                            }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputField
                                label="Email"
                                textInputConfig={{
                                    onChangeText: onChange,
                                    autoCapitalize: 'none',
                                    onBlur: onBlur,
                                }}
                                value={value}
                                style={styles.rowInputField} />
                        )}
                    />
                    
                </View>
                {errors?.email && <FormError error={errors.email} message={errors.email.message}/>}
                <View style={styles.inputRow}>
                    <Controller
                        name='password'
                        control={control}
                        rules={{
                            required: "password is required",
                            minLength:{
                                value: 8,
                                message:"Passwords must be at least 8 characters"
                            }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputField
                                label="password"
                                textInputConfig={{
                                    onChangeText: onChange,
                                    autoCapitalize: 'none',
                                    onBlur: onBlur,
                                    secureTextEntry: true,
                                }}
                                value={value}
                                style={styles.rowInputField} />
                        )}
                    />
                    
                </View>
                {errors?.password && <FormError error={errors.password} message={errors.password.message}/>}


                {!isLogin && <> 
                 <View style={styles.inputRow}>
                    <Controller
                        name='confirmPassword'
                        control={control}
                        rules={{
                            required: "please confirm password",
                            validate:{
                                passwordEqual: value=>value === getValues('password') || "Passwords do not match" 
                            }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputField
                                label="Confirm password"
                                textInputConfig={{
                                    onChangeText: onChange,
                                    autoCapitalize: 'none',
                                    onBlur: onBlur,
                                    secureTextEntry: true,
                                }}
                                value={value}
                                style={styles.rowInputField} />
                        )}
                    />
                    
                </View>
                {errors?.confirmPassword && <FormError error={errors.confirmPassword} message={errors.confirmPassword.message}/>}
                </>
                }
            </View>
            <CustomButton title={isLogin? "Login":"Signup"} handlePress={handleSubmit(handleRegister)} />
            <Button title={isLogin? "No account? Sign up here" : "Already registered? Sign in here"} onPress={switchAuthModeHandler}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 24,
        marginHorizontal: 32,
        padding: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 16,
        backgroundColor: 'white',

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'merienda',
        alignSelf: 'center',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    inputRow: {
        flexDirection: 'row',
    },
    rowInputField: {
        flex: 1,
    },
});
