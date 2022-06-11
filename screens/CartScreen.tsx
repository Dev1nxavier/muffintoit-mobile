import { Button, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { Image, FlatList } from "react-native";
import { RootTabScreenProps } from "../types";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from "../store/redux/cartSlice";
import { FontAwesome } from '@expo/vector-icons';
import { updateCartProduct } from '../util/eCommerce'
import LoadingOverlay from "../components/ui/LoadingOverlay";



const CartItem = ({ item }) => {
    const cartId = useSelector(state => state.cartState.cartId)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleUpdateCart = (cart: any) => {
        dispatch(setCart({ ...cart }))
        setLoading(false);
    }

    const subtractProductHandler = async () => {
        setLoading(true);
        let cart;
        if (item.qty > 1) {
            cart = await updateCartProduct(cartId, item.lineItemId, { quantity: item.qty - 1 })
        } else {
            cart = await updateCartProduct(cartId, item.lineItemId, { quantity: 0 })
        }
        handleUpdateCart(cart);
    }

    const addProductHandler = async () => {
        setLoading(true);
        const cart = await updateCartProduct(cartId, item.lineItemId, { quantity: item.qty + 1 })
        handleUpdateCart(cart);
    }

    return (

        <View style={styles.cartItem_container}>
            {loading && <LoadingOverlay message="Updating cart..."/>}
            <View
                style={styles.cartItem_inner}>
                <Pressable

                    style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                        flex:1,
                    })}>
                    <Image source={{ uri: `${item.imageUri}` }} style={styles.image} />
                </Pressable>
                <View style={styles.textContainer}>
                    <Text style={[styles.title, { marginLeft: 10 }]}>{item.title}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>${item.price}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <Pressable key={"removeItem"} onPress={subtractProductHandler}>
                        <FontAwesome name="minus-circle" size={36} color='purple' />
                    </Pressable>
                    <Text style={{ fontSize: 24, alignSelf: 'center', marginHorizontal: 5 }}>{item.qty}</Text>
                    <Pressable onPress={addProductHandler}>
                        <FontAwesome name="plus-circle" size={36} color='purple' />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const CartScreen = ({ navigation }: RootTabScreenProps<'Cart'>) => {

    const [cartItems, setCartItems] = useState(null);
    let CART_STATE = useSelector(state => state.cartState);

    let CART_STORE = [];
    let CART_TOTAL = '';

    useEffect(() => {

        async function getCartState() {
           
            setCartItems(CART_STATE);

        }

        getCartState();


    }, [CART_STATE])

    if (cartItems) {
        CART_STORE = cartItems?.products;

        CART_TOTAL = cartItems?.subtotal;
    }

    const handleSubmit = async () => {

        navigation.navigate("Checkout")
    }

    const renderItem = ({ item }) => (
        <CartItem item={item} />
    );

    if (CART_STORE.length < 1 || !CART_STORE.length) {
        return (
            <View style={styles.container}>
                <Text  style={{ fontSize: 24, fontFamily: 'merienda', textAlign:'center'}}>
                    No Items In Cart.{'\n'} Start Shopping!
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My cart</Text>
            <FlatList
                style={{ alignSelf: 'stretch' }}
                data={CART_STORE}
                renderItem={renderItem}
                keyExtractor={item => item.title} />
            <View>
                <Text style={styles.title}>Subtotal: ${CART_TOTAL}</Text>
                <Button title="Checkout" onPress={handleSubmit} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',


    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'merienda'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    cartItem_container: {
        flex: 1,
        padding: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
     
    },
    cartItem_inner: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',

    },
    image: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 15,
        margin:2,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'flex-start',
        padding: 4,
    },
    buttonsContainer:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'center', 
    }
});

export default CartScreen;