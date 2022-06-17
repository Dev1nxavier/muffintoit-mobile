import { StatusBar } from 'expo-status-bar';
import { Button, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import InputField from '../components/Input';
import { Text, View } from '../components/Themed';
import { useForm, Controller, } from 'react-hook-form'
import { updateUser } from '../store/redux/userSlice';
import { useDispatch } from 'react-redux';

export default function ModalScreen({ navigation, route }: any) {

  const { control, handleSubmit, reset, formState: { errors }, setValue } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      creditCard: '',
      cid: '',
      street: '',
      city: '',
      state: '',
      postal: '',
      comments: '',
    }
  })

  const dispatch = useDispatch();

  const onSubmit = (data: any) => {

    dispatch(updateUser({ ...data }))
  }


  return (

    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <TouchableWithoutFeedback>
        <View style={{ justifyContent: 'flex-end', flex: 1 }}>
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
                value: value
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
                      value: value,
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
                      value: value,
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

            <View style={styles.inputRow}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onBlur, value, onChange } }) => (
                  <InputField
                    label="Credit Card Number"
                    textInputConfig={{
                      keyboardType: 'numeric',
                      maxLength: 19,
                      onBlur: onBlur,
                      value: value,
                      onChangeText: onChange
                    }}
                    style={{ flex: 2 }}
                  />
                )}
                name='creditCard' />
              {errors.creditCard && alert("Please enter Credit Card Number")}


              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onBlur, value, onChange } }) => (
                  <InputField label="CID" textInputConfig={{
                    keyboardType: 'numeric',
                    maxLength: 4,
                    onBlur: onBlur,
                    value: value,
                    onChangeText: onChange,
                  }}
                    style={styles.rowInputField} />
                )}
                name='cid' />
              {errors.cid && <Text>This is required.</Text>}

            </View>
            <Controller
              name='comments'
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <InputField label="Special instructions" textInputConfig={{
                  multiline: true,
                  autoCapitalize: 'sentences',
                  maxLength: 100,
                  onTextChange: onChange,
                  onBlur: onBlur,
                  value: value,
                }}
                  style={{}} />
              )} />
        </View>
      </TouchableWithoutFeedback>
      <Button title='Submit' onPress={handleSubmit(onSubmit)} />
      <Button title='Cancel' onPress={() => navigation.goBack()} />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      {/* <View style={{ flex: 1 }} /> */}
    </View >

  );
}

const styles = StyleSheet.create({
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
  }
});
