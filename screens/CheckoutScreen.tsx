import { Button, Keyboard, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { Text, View } from '../components/Themed';
import Payments from '../components/checkout/Payment';
import Shipping from '../components/checkout/Shipping';
import Review from '../components/checkout/Review';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCheckoutToken, getCountries, } from '../util/eCommerce';
import { useDispatch } from 'react-redux'
import { setCart } from '../store/redux/cartSlice';


const steps = [
  "shipping",
  "payment",
  "Review",
];

function stepContent(props: { activeStep: Number, handleStep: Function, checkoutToken: String, listCountries: Array<Object> }) {
  const { activeStep, handleStep, checkoutToken, listCountries } = props;

  switch (activeStep) {
    case 0:
      return <Shipping handleStep={handleStep} checkoutToken={checkoutToken} listCountries={listCountries} />
    case 1:
      return <Payments handleStep={handleStep}/>
    case 2:
      
      return <Review />
    default:
      throw new Error("Unrecognized selection");
  }
}

export default function CheckoutScreen({ navigation, route }: any) {

  const dispatch = useDispatch();
  const { cartId } = useSelector(state => state.cartState);
  const [activeStep, setActiveStep] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [checkoutToken, setCheckoutToken] = useState('');
  const [listCountries, setListCountries] = useState([]);



  useEffect(() => {
    //create checkout token
    async function generateCheckoutToken() {

      const checkoutToken = await getCheckoutToken(cartId);

      //if success, add to cartState
      if (checkoutToken?.checkout_token && checkoutToken.live.line_items) {
        setCheckoutToken(checkoutToken.checkout_token);
        dispatch(setCart(checkoutToken))
        //retrieve countries for checkout token
        const countries = await getCountries(checkoutToken.checkout_token);

        //format as {id:String, label:String, value:String}
        let countryArr = [];
        for (const key in countries) {
          countryArr.push({ id: key, label: countries[key], value: key })
        }

        setListCountries(countryArr);
      }

    }
    generateCheckoutToken();
  }, [])

  const handleBack = () => {
    setActiveStep(currentStep => (currentStep - 1));
  }

  const handleStep = () => {
    setActiveStep(currentStep => (currentStep + 1));
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.form}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {steps[activeStep]}
          </Text>
          {stepContent({ activeStep, handleStep, checkoutToken,listCountries })}
          {activeStep !== 0 && <Button title='Back' onPress={() => handleBack()} />}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-around',

  },
  title: {
    marginVertical: 8,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#234fc7',
    fontFamily: 'merienda-bold',
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
