import { Button, Switch, StyleSheet, Text } from 'react-native';
import InputField from '../../components/Input';
import { View } from '../../components/Themed';
import { useForm, Controller, } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateShipping } from '../../store/redux/orderSlice';

export default function Shipping({ handleStep }) {

    const {firstName, lastName, street, city, state, postal} = useSelector((state) => state.userState)

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(prevState => !prevState);

    }

    useEffect(()=>{

        setValue('firstName', isEnabled?firstName:'');
        setValue('lastName', isEnabled? lastName:'');
        setValue('city',isEnabled? city:'');
        setValue('state', isEnabled? state:'');
        setValue('postal', isEnabled? postal:'');
        setValue('street', isEnabled? street:'');

    }, [isEnabled]);

    const { control, handleSubmit, reset, formState: { errors }, setValue } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            street: '',
            city: '',
            state: '',
            postal: '',
        }
    })

    const dispatch = useDispatch();

    const onSubmit = (data) => {
        console.log(data);
        dispatch(updateShipping({ ...data }))
        handleStep();
    }

    return (
        <View>

            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', alignSelf: 'center', marginRight: 20 }}>Same as Payment</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>

            <View>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField label="First name" textInputConfig={{
                            onBlur: onBlur,
                            onChangeText: onChange,
                            maxLength: 20,
                            autoCapitalize: 'words',
                            value: value,

                        }}
                            style={{}} />
                    )}
                    name='firstName' />
                {errors.firstName && alert("Please enter a first name")}

                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField label="Last name" textInputConfig={{
                            onChangeText: onChange,
                            maxLength: 50,
                            autoCapitalize: 'words',
                            onBlur: onBlur,
                            value: value,
                        }}
                            style={{}} />
                    )}
                    name='lastName' />
                {errors.lastName && alert("Please enter a last name")}
                <Controller
                    name='street'
                    rules={{
                        required: true,
                    }}
                    control={control}
                    render={({ field: { value, onBlur, onChange } }) => (
                        <InputField
                            label="Street"
                            textInputConfig={{
                                maxLength: 50,
                                onChangeText: onChange,
                                onBlur: onBlur,
                                value: value,
                            }}
                            style={{}} />
                    )} />
                {errors.lastName && alert("Please enter a Street name")}

                <View style={styles.inputRow}>
                    <Controller
                        name='city'
                        control={control}
                        key={"city"}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { value, onBlur, onChange } }) => (
                            <InputField
                                label="City"
                                textInputConfig={{
                                    maxLength: 50,
                                    onChangeText: onChange,
                                    onBlur: onBlur,
                                    value:value,
                                }}
                                style={styles.rowInputField} />
                        )
                        } />


                    <Controller
                        name='state'
                        control={control}
                        key={"state"}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { value, onBlur, onChange } }) => (
                            <InputField
                                label="State"
                                textInputConfig={{
                                    maxLength: 50,
                                    onChangeText: onChange,
                                    onBlur: onBlur,
                                    value:value,
                                }}
                                style={styles.rowInputField} />
                        )
                        } />
                    <Controller
                        name='postal'
                        rules={{
                            required: true
                        }}
                        control={control}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <InputField
                                label="Postal"
                                textInputConfig={{
                                    keyboardType: 'numeric',
                                    maxLength: 10,
                                    onChangeText: onChange,
                                    onBlur: onBlur,
                                    value: value,
                                }}
                                style={styles.rowInputField} />
                        )} />
                </View>
            </View>
            <Button title='Next' onPress={handleSubmit(onSubmit)} />
        </View >

    );
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        marginVertical: 24,

    },
    switch: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        marginTop: 24,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#234fc7',
        fontFamily: 'merienda-bold'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInputField: {
        flex: 1,
    }
});
