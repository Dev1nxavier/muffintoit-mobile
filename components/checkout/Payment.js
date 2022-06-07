import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Switch } from 'react-native';
import InputField from '../ui/Input';
import { Text, View } from '../../components/Themed';
import { useForm, Controller, } from 'react-hook-form'
import { updateUser } from '../../store/redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CardField, CardForm } from '@stripe/stripe-react-native';
import CustomButton from '../ui/CustomButton';

export default function Payments({ handleStep, enterPayment }) {

  //retrieve shipping details
  const userObj = useSelector(state => state.orderState);

  const { control, handleSubmit, reset, formState: { errors }, setValue } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      street: '',
      city: '',
      state: '',
      postal: '',
      country: '',

    }
  })

  const dispatch = useDispatch();

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(prevState => !prevState);

  }

  useEffect(() => {

    if (isEnabled) {

      Object.entries(userObj).forEach(([name, value]) => {
        setValue(name, value)
        console.log(name, ":", value);
      })
    } else {
      Object.entries(userObj).forEach(([name, value]) => {
        setValue(name, '');
      })
  }

  }, [isEnabled]);


  const onSubmit = (data) => {

    dispatch(updateUser({ ...data }))
    enterPayment();

  }


  return (
    <ScrollView style={{}}>
      <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center', alignSelf: 'center', marginRight: 20 }}>Same as shipping</Text>
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
          name="firstname"
          control={control}
          rules={{
            required: "First Name is required",

          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField label="First name" textInputConfig={{
              onChangeText: onChange,
              maxLength: 50,
              autoCapitalize: 'words',
              onBlur: onBlur,

            }}
              value={value}
              style={{}} />
          )}
        />


        <Controller
          name='lastname'
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

            }}
              value={value}
              style={{}} />
          )}
        />

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

              }}
              value={value}
              style={{}} />
          )} />

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

                }}
                value={value}
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

                }}
                value={value}
                style={styles.rowInputField} />
            )
            } />
        </View>

        <View style={styles.inputRow}>
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

                }}
                value={value}
                style={styles.rowInputField} />
            )} />

          <Controller
            name='country'
            rules={{
              required: true
            }}
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <InputField
                label="Country"
                textInputConfig={{
                  onChangeText: onChange,
                  onBlur: onBlur,

                }}
                value={value}
                style={[styles.rowInputField, { flex: 2 }]} />
            )} />
        </View>


      </View>
      <CustomButton handlePress={handleSubmit(onSubmit)} title="Enter Payment Details" style={{ marginVertical: 24, marginHorizontal: 24, fontFamily: 'merienda' }} />
    </ScrollView >

  );
}

const styles = StyleSheet.create({
  outerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flex: 1,

  },
  form: {
    flex: 1,
  },
  container: {
    flex: 1,

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
  },
  cardField: {
    width: '100%',
    marginVertical: 30,
    height: 150,
  },
});
