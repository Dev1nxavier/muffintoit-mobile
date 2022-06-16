import { useState, useEffect } from 'react';
import { Text, StyleSheet, Alert } from "react-native";
import { View } from "../Themed";
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from "../ui/CustomButton";
import { useNavigation } from '@react-navigation/native';
import { handlePaymentIntent } from "../../util/Stripe";
import { checkout, saveOrderHistory } from '../../util/eCommerce';
import { useStripe } from '@stripe/stripe-react-native'
import { clearCart } from '../../store/redux/cartSlice';

export default function Review() {

    const dispatch = useDispatch();

    const { live, checkout_token } = useSelector((state) => state.cartState);

    const { localId, isAuthenticated } = useSelector(state => state.userState);
    const navigation = useNavigation();
    const shippingInfo = useSelector(state => state.orderState);

    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const [paymentIntentId, setPaymentIntentId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [orderId, setOrderId] = useState('');
    const [isCheckout, setIsCheckout] = useState(false);

    useEffect(() => {

        const initializePaymentSheet = async () => {

            try {
                const { paymentIntent, ephemeralKey, customer } = await handlePaymentIntent([], live.total?.raw);

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

            const confirmPayment = await checkout(checkout_token, shippingInfo, paymentIntentId, customerId, live);

            if (confirmPayment.status_payment) {

                if (isAuthenticated) {
                    //save order history
                    await saveOrderHistory(confirmPayment, localId)
                }

                setOrderId(confirmPayment.id);
                setIsCheckout(true);
                //reset cart
                dispatch(clearCart());
                navigation.replace('ThankYou',{
                    orderId: orderId,
                });
            
            }else{
                Alert.alert("Error processing payment. Please contact customer service");
            }

        }
    }

    const handleSubmit = () => {
        
        openPaymentSheet();

    }
    
    if(isCheckout){
        return (
            <View style={styles.container}>
              <Text style={styles.title}>Thank you for your Order!</Text>
              <Text style={styles.text}>Your order number is: {orderId}</Text>
              <View style={{ flex: 1 }}>
                <View style={{marginTop: 24}}>
                  <CustomButton title='Shop some more!' onPress={() => navigation.navigate('Root')} />
                </View>
              </View>
            </View>
          )
    }
    

    return (
        <View style={styles.container}>
            <View style={styles.lineItemsContainer}>
                <Text style={styles.text}>
                    Item Subtotal:
                </Text>
                <Text style={styles.text}>
                    ${live.subtotal?.raw}
                </Text>
            </View>

            <View style={styles.lineItemsContainer}>
                <Text style={styles.text}>
                    Shipping &amp; handling:
                </Text>
                <Text style={styles.text}>
                    ${live.shipping?.price?.raw}
                </Text>
            </View>

            <View style={styles.lineItemsContainer}>
                <Text style={styles.text}>
                    Total before taxes:
                </Text>
                <Text style={styles.text}>
                    ${live.total?.raw}
                </Text>
            </View>

            <View style={styles.lineItemsContainer}>
                <Text style={styles.text}>
                    Tax:
                </Text>
                <Text style={styles.text}>
                    ${live.tax.amount?.raw}
                </Text>
            </View>

            <View style={styles.lineItemsContainer}>
                <Text style={styles.title}>
                    Order total:
                </Text>
                <Text style={styles.title}>
                    ${live.total_with_tax?.raw}
                </Text>
            </View>
            <CustomButton title={"Enter Credit Card"} handlePress={handleSubmit} />

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },
    list: {
        alignSelf: 'stretch',
    },
    text: {
        fontSize: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'merienda'
    },
    lineItemsContainer: {
        flexDirection: 'row',
        alignItems: 'space-evenly',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 16,
    },
    button: {
        marginTop: 24,
    }

})