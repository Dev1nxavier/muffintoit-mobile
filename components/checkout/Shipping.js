import { StyleSheet, ScrollView } from 'react-native';
import InputField, { FormError } from '../ui/Input';
import { View } from '../../components/Themed';
import { useForm, Controller, } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { updateShipping } from '../../store/redux/orderSlice';
import { getStates, shippingOptions, updateTokenShipping, } from '../../util/eCommerce';
import CustomModal from '../MyCustomModal';
import CustomButton from '../ui/CustomButton';


const countries = [
    { id: "US", label: "United States", value: "US" },
    { id: "MX", label: "Mexico", value: "MX" },
    { id: "CA", label: "Canada", value: "CA" },
]


export default function Shipping({ handleStep, checkoutToken, listCountries }) {

    const [selectShipping, setSelectShipping] = useState('');
    const [country, setSelectCountry] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [shippingMethods, setShippingMethods] = useState([]);
    const [selectState, setSelectState] = useState('');
    const [states, setStates] = useState([]);

    const { control, handleSubmit, reset, formState: { errors }, setValue } = useForm({
        defaultValues: {
            firstname: '',
            lastname: '',
            street: '',
            city: '',
            state: '',
            postal: '',
            country: '',
            shippingMethodId: '',
        }
    })

    const dispatch = useDispatch();

    const onSubmit = (data) => {

        dispatch(updateShipping({ ...data }))
        handleStep();
    }

    useEffect(() => {

        console.log("Setting:", selectState.value, country.value, selectShipping.value)
        setValue('shippingMethodId', selectShipping.value)
        setValue('country', country.value)
        setValue('state', selectState.value);

        if(selectShipping && selectShipping.value!==''){
            updateTokenShipping(selectShipping.value, country.value, checkoutToken);
        }
        
    }, [selectShipping, selectState, country])

    useEffect(() => {
        setValue('country', country.value)

        async function getShippingOptions() {
            //on country select, retrieve shipping options
            //get available shipping methods for token
            if (!country || country === '') {
                return;
            }
            const shipping = await shippingOptions(checkoutToken, country.value);

            //format as {label:String, value: String}
            let shippingArr = [];
            for (const e of shipping) {
                shippingArr.push({ id: e.id, label: e.description, value: e.id })
            }

            setShippingMethods(shippingArr);
        }

        getShippingOptions();

    }, [country])

    useEffect(() => {
        async function getAvailableSubdivisions() {
            if (!country || country === '') return;
            const subdivisions = await getStates(checkoutToken, country.value)

            //format as {label:String, value: String}
            let StateArr = [];
            for (const key in subdivisions) {
                StateArr.push({ id: key, label: subdivisions[key], value: key })
            }

            setStates(StateArr);
        }

        getAvailableSubdivisions();

    }, [country])

  
    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <CustomModal text={{ buttonTitle: country ? country.value : "Choose Country", confirm: "Confirm" }} setSelectOption={setSelectCountry} radioButtonsData={listCountries}
                        selectOption={country} />
                </View>

                {country !== '' && <View style={{ marginVertical: 8 }}>
                    <CustomModal text={{ buttonTitle: selectState ? selectState.label : "Choose Subdivision", confirm: "Confirm" }} setSelectOption={setSelectState} radioButtonsData={states}
                        selectOption={selectState}
                    />
                </View>}

                {selectState !== '' && <View style={{ marginVertical: 8 }}>
                    <CustomModal text={{ buttonTitle: selectShipping ? selectShipping.label : "Choose shipping", confirm: "Confirm" }} setSelectOption={setSelectShipping} radioButtonsData={shippingMethods}
                        selectOption={selectShipping}
                        isDisabled={isDisabled} />
                </View>}


                {selectShipping !== '' &&
                    <>

                        <InputField
                            label="Shipping"
                            value={selectShipping.label}
                        />

                        <View style={styles.inputRow}>
                            <View style={styles.form}>
                                <Controller
                                    name="firstname"
                                    control={control}
                                    rules={{
                                        required: "First Name is required",

                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputField label="First name" textInputConfig={{
                                            onBlur: onBlur,
                                            maxLength: 20,
                                            autoCapitalize: 'words',
                                            onChangeText: onChange,
                                        }}
                                            value={value}
                                            style={styles.rowInputField} />
                                    )}
                                />
                                {errors?.firstname && <FormError error={errors.firstname} message={errors.firstname.message} />}
                            </View>
                            <View style={styles.form}>
                                <Controller
                                    name='lastname'
                                    control={control}
                                    rules={{
                                        required: "Last Name is required"
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputField label="Last name" textInputConfig={{
                                            onChangeText: onChange,
                                            maxLength: 50,
                                            autoCapitalize: 'words',
                                            onBlur: onBlur,
                                            value: value,
                                        }}
                                            style={styles.rowInputField} />
                                    )}
                                />
                                {errors?.lastname && <FormError error={errors.lastname} message={errors.lastname.message} />}
                            </View>
                        </View>
                        <View style={styles.form}>
                            <Controller
                                name='street'
                                rules={{
                                    required: "Street Address required",
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
                            {errors?.street && <FormError error={errors.street} message={errors.street.message} />}
                        </View>

                        <View style={styles.inputRow}>
                            <View style={styles.form}>
                                <Controller
                                    name='city'
                                    control={control}
                                    key={"city"}
                                    rules={{
                                        required: "City is required",
                                    }}
                                    render={({ field: { value, onBlur, onChange } }) => (
                                        <InputField
                                            label="City"
                                            textInputConfig={{
                                                maxLength: 50,
                                                onChangeText: onChange,
                                                onBlur: onBlur,
                                                value: value,
                                            }}
                                            style={styles.rowInputField} />
                                    )
                                    } />

                                {errors?.city && <FormError error={errors.city} message={errors.city.message} />}
                            </View>
                            <View style={styles.form}>
                                <View style={styles.form}>
                                    <Controller
                                        name='postal'
                                        rules={{
                                            required: "Zip/Postal Code is required"
                                        }}
                                        control={control}
                                        render={({ field: { onBlur, onChange, value } }) => (
                                            <InputField
                                                label="Postal"
                                                textInputConfig={{
                                                    keyboardType: 'numeric',
                                                    maxLength: 5,
                                                    onChangeText: onChange,
                                                    onBlur: onBlur,
                                                    value: value,
                                                }}
                                                style={styles.rowInputField} />
                                        )} />
                                    {errors?.postal && <FormError error={errors.postal} message={errors.postal.message} />}
                                </View>
                            </View>
                        </View>
                        <View style={styles.inputRow}>



                        </View>
                        <CustomButton handlePress={handleSubmit(onSubmit)} title="Next" />
                    </>}
            </ScrollView>
        </View>

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
        marginTop: 16,
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
    },

});
