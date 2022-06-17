import { Button, Text, FlatList, StyleSheet, Image } from "react-native";
import { View } from "../Themed";
import { useSelector, useDispatch } from 'react-redux';
import { updateHistory } from '../../store/redux/userSlice'
import { clearCart } from '../../store/redux/cartSlice';
import Order from "../../models/order";
import CustomButton from "../CustomButton";

export default function Review({ handleStep, setOrderId}) {

    const CART_STATE = useSelector((state) => state.cartState);

    const CART_STORE = CART_STATE.products;

    const subtotal = CART_STATE.subtotal;

    const dispatch = useDispatch();

    const handleSubmit = () => {
        //dispatch order to store
        const orderId = (""+Math.random()).substring(2,8);
        setOrderId(orderId);
        const orderDate = new Date().toISOString().slice(0,10);
        const order = new Order(
            orderId,
            orderDate,
            CART_STORE,
            subtotal,
            subtotal);
        
        dispatch(updateHistory({...order}))
        handleStep()

        
    }

    return (
        <View style={styles.container}>
            <View style={styles.lineItemsContainer}>
                <Text style={styles.text}>
                    Item Subtotal:
                </Text>
                <Text style={styles.text}>
                    ${subtotal}
                </Text>
            </View>

            <View style={styles.lineItemsContainer}>
                <Text style={styles.text}>
                    Shipping &amp; handling:
                </Text>
                <Text style={styles.text}>
                    $0.00
                </Text>
            </View>

            <View style={styles.lineItemsContainer}>
                <Text style={styles.text}>
                    Total before taxes:
                </Text>
                <Text style={styles.text}>
                    ${subtotal}
                </Text>
            </View>

            <View style={styles.lineItemsContainer}>
                <Text style={styles.text}>
                    Tax:
                </Text>
                <Text style={styles.text}>
                    $0.00
                </Text>
            </View>

            <View style={styles.lineItemsContainer}>
                <Text style={styles.title}>
                    Order total:
                </Text>
                <Text style={styles.title}>
                    ${subtotal}
                </Text>
            </View>
            <CustomButton title={"Enter Shipping"} handlePress={handleSubmit}/>

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
    text:{
        fontSize: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'merienda'
    },
    lineItemsContainer: {
        flexDirection: 'row',
        alignItems:'space-evenly',
        justifyContent: 'space-between',
        width:'100%',
        marginVertical: 16,
    },
    button:{
        marginTop:24,
    }

})