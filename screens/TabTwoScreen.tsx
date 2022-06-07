import { Button, StyleSheet, View, Text } from 'react-native';
import { registerUser } from '../util/eCommerce';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store/redux/userSlice';
import InputField from '../components/ui/Input';
import { Controller, useForm } from 'react-hook-form';

export default function TabTwoScreen() {

  const { control, handleSubmit, reset, formState: { errors }, setValue } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      confirmPasswordd:'',
    },
  })

  const dispatch = useDispatch();

  const customerId = useSelector(state => state.userState.customerid);

  const handleRegister = async (data) => {

    console.log("New User Data: ", data);

    const register = await registerUser(data.email);
    console.log('saving customerID:', register.data);
    dispatch(updateUser({ customerid: register.data.id }))
  }

  // const handleLogin = async()=>{

  //   const jwt = await loginUser();

  //   console.log("Customer ID:", customerId, "token:", jwt);

  //   const emailToken = await emailLoginToken("seangreenebrandeis@gmail.com");

  //   console.log("Email token:", emailToken);

  // }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup!</Text>
      <View style={styles.innerContainer}>
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
        <View style={styles.inputRow}>
        <Controller
          name='lastname'
          control={control}
          rules={{
            required: "Last Name is required"
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
        <View style={styles.inputRow}>
        <Controller
          name='email'
          control={control}
          rules={{
            required: "email is required",
            pattern:{
              value:/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message:"invalid email entered"
            } 
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label="Email"
              textInputConfig={{
                onChangeText: onChange,
                autoCapitalize:'none',
                onBlur: onBlur,
              }}
              value={value}
              style={styles.rowInputField} />
          )}
        />
        {errors?.email && <Text style={{flex:1}}>{errors.email.message}</Text>}
        </View>
      </View>
      <Button title='Register' onPress={handleSubmit(handleRegister)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 64,
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
  innerContainer:{
    flex:1,
    justifyContent:'flex-start',
    alignItems: 'center',
    margin:16,
    backgroundColor: 'white',

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily:'merienda',
    alignSelf:'center',
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
    flex:1,
  },
});
