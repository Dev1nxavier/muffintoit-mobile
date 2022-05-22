import { Button, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { Image, FlatList } from "react-native";
import { RootTabScreenProps } from "../types";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, subtractProduct } from "../store/redux/cartSlice";
import { FontAwesome } from '@expo/vector-icons';



const CartItem = ({ item }) => {

    const dispatch = useDispatch();

    const subtractProductHandler = () => {
        dispatch(subtractProduct({ ...item }));
    }

    const addProductHandler = () => {
        dispatch(addProduct({ ...item }));
    }

    const handlePress = (item) => {
        console.log("data:", item);
    }

    return (

        <View style={{
            padding: 20,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        }}>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: 'flex-start',

                }}>
                <Pressable
                    onPress={() => handlePress(item)}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                    })}>
                    <Image source={item.imageUri} style={{ width: 100, height: 100, borderRadius: 15 }} />
                </Pressable>
                <View style={{ height: 100, flex: 1, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                    <Text style={[styles.title, { marginLeft: 10 }]}>{item.title}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>${item.price}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
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

const CartScreen = ({ navigation }: RootTabScreenProps<'Cart'>)=>{

    const [cartItems, setCartItems] = useState(null);
    let CART_STATE = useSelector(state => state.cartState);

    let CART_STORE = [];
    let CART_TOTAL = '';

    useEffect(() => {
        function getCartState() {
            setCartItems(CART_STATE);
        }
    
        getCartState();
       

    }, [CART_STATE])

    if (cartItems) {
        CART_STORE = cartItems?.products;

        CART_TOTAL = cartItems?.subtotal;
    }


    const handleSubmit = () => {
        navigation.navigate("Checkout")
    }

    const renderItem = ({ item }) => (
        <CartItem item={item} />
    );

    if (CART_STORE.length < 1 || !CART_STORE.length) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontFamily: 'merienda' }}>
                    No Items In Cart
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
});

export default CartScreen;