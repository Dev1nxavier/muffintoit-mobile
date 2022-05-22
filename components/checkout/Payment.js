import { Button, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import InputField from '../../components/Input';
import { Text, View } from '../../components/Themed';
import { useForm, Controller, } from 'react-hook-form'
import { updateUser } from '../../store/redux/userSlice';
import { useDispatch } from 'react-redux';

export default function Payments({handleStep}) {

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

  const onSubmit = (data) => {
    console.log(data);
    dispatch(updateUser({ ...data }))
    handleStep();
  }


  return (
        <View >
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
                value: value
              }}
                style={{}} />
            )}
            name='firstName' />
         

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