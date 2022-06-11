import { Button, Keyboard, StyleSheet, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { Text, View } from '../components/Themed';
import Payments from '../components/checkout/Payment';
import Shipping from '../components/checkout/Shipping';
import Review from '../components/checkout/Review';
import { useEffect, useState } from 'react';
// import Order from '../components/checkout/Order';
import { useSelector } from 'react-redux';
import { handlePaymentIntent } from '../util/Stripe';
import { useConfirmPayment, useStripe } from '@stripe/stripe-react-native'
import { checkout, getCheckoutToken, getCountries, saveOrderHistory, } from '../util/eCommerce';
import { useDispatch } from 'react-redux'
import { clearCart, setCart } from '../store/redux/cartSlice';


const steps = [
  "shipping",
  "payment",
  "Review",
];

function stepContent(props: { activeStep: Number, handleStep: Function, openPaymentSheet: Function, checkoutToken: String, listCountries: Array<Object> }) {
  const { activeStep, handleStep, openPaymentSheet, checkoutToken, listCountries } = props;

  switch (activeStep) {
    case 0:
      return <Shipping handleStep={handleStep} checkoutToken={checkoutToken} listCountries={listCountries} />
    case 1:
      return <Review handleStep={handleStep} />
    case 2:
      return <Payments handleStep={handleStep} enterPayment={openPaymentSheet} />
    default:
      throw new Error("Unrecognized selection");
  }
}

export default function CheckoutScreen({ navigation, route }: any) {

  const isAuthenticated = useSelector(state=>state.userState.isAuthenticated);
  const dispatch = useDispatch();

  const { localId } = useSelector(state => state.userState);
  const { cartId, checkout_token, live } = useSelector(state => state.cartState);
  const [activeStep, setActiveStep] = useState(0);
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const shippingInfo = useSelector(state => state.orderState);
  const [checkoutToken, setCheckoutToken] = useState('');
  const [listCountries, setListCountries] = useState([]);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();


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


  useEffect(() => {

    const initializePaymentSheet = async () => {

      try {
        const { paymentIntent, ephemeralKey, customer }: any = await handlePaymentIntent([], live.total?.raw);

        if (paymentIntent) {
          setPaymentIntentId(paymentIntent);
        }
        if (customer) {
          setCustomerId(customer);
        }

        const { error, paymentOption } = await initPaymentSheet({
          merchantDisplayName: "Muffin To It!",
          customerId: customer,
          customerEphemeralKeySecret: ephemeralKey,
          paymentIntentClientSecret: paymentIntent,
          allowsDelayedPaymentMethods: false,

        });
      } catch (error) {
        console.error("Error setting up payments:", error);
      }


    };

    initializePaymentSheet();

  }, [live]);

  const openPaymentSheet = async () => {

    const paymentSheet = await presentPaymentSheet();

    if (paymentSheet.error) {
      Alert.alert(`Error code: ${paymentSheet.error.code}`, paymentSheet.error.message);
    } else {
      //TODO: handle checkout  
      const confirmPayment = await checkout(checkout_token, shippingInfo, paymentIntentId, customerId, live);

      if (confirmPayment.status_payment) {
        setIsPaid(true);

        if(isAuthenticated){
          //save order history
        await saveOrderHistory(confirmPayment, localId)
      }

        //reset cart
        dispatch(clearCart());
        navigation.replace('ThankYou', {
          orderId: confirmPayment.id
        });
      }

    }
  }


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
          {stepContent({ activeStep, handleStep, checkoutToken, openPaymentSheet, listCountries })}
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
