import React, { useLayoutEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../store/redux/cartSlice';
import { addCartProduct, removeCartProduct } from '../util/eCommerce'
import MyCarousel from '../components/ShopCarousel';

const { height, width } = Dimensions.get('window')
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

function ProductDetailsScreen({ route, navigation }: any) {

    type itemObj = {
        id: string,
        lineItemId: string,
    }

    type stateObj = {
        cartState: {
            cartId: String,
            products: Array<any>
        },
        productState: {
            loadProducts: any
        }
    }


    const productId = route.params.id;

    const PRODUCTS = useSelector((state: stateObj) => state.productState.loadProducts);

    const cartId = useSelector((state: stateObj) => state.cartState.cartId)
    console.log("Current Cart State:", cartId);

    const [productDetails] = PRODUCTS.filter((item: itemObj) => item.id === productId);
    const [loading, setIsLoading] = useState(false);
    const [addedItem, setAddedItem] = useState({});

    const { id, title, price, description, productImages } = productDetails;

    const dispatch = useDispatch();

    //retrieve products from store
    const cartItems = useSelector((state: stateObj) => state.cartState.products);

    const cartItemStatus = cartItems.find((item: itemObj) => item.id === id);

    const DescToString = (desc) => {
        if (desc === null || desc === '') return false;
        else {
            desc = desc.toString();
            return desc.replace(/(<([^>]+)>)/ig, '');
        }
    }

    const headerButtonPressHandler = async () => {
        setIsLoading(true);
        let cart;

        if (cartItemStatus) {
            //retrieve line item id for matching product
            const lineId = cartItems.find((item: itemObj) => {
                if (item.id === productId) return item;
            })

            console.log("Retrieved Line Item ID:", lineId.lineItemId);

            // dispatch(removeProduct({ ...productDetails }));
            cart = await removeCartProduct(cartId, lineId.lineItemId)

        } else {

            //POST to CMS
            cart = await addCartProduct(cartId, productId)
        }

        setIsLoading(false);

        dispatch(setCart({ ...cart }));
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <Pressable
                        onPress={headerButtonPressHandler}
                        style={({ pressed }) => ({
                            opacity: pressed ? 0.5 : 1,
                        })}>
                        {!cartItemStatus ? <FontAwesome5 name="cart-plus" size={24} color='white' /> :
                            <Text style={{ fontSize: 12, color: 'white' }}>Remove</Text>}
                    </Pressable>
                )
            }
        }
        );

        navigation.setOptions
    }, [navigation, productId, headerButtonPressHandler])


    return (
        <View style={styles.OuterContainer}>
            <Pressable style={styles.pressable}>
                <View style={styles.innerContainer}>
                    <MyCarousel productImages={productImages} loading={loading} />
                    <Text style={styles.title}>
                        {title}
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Text style={styles.text}>
                            {DescToString(description)}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.priceText, styles.title]}>
                            ${price}
                        </Text>
                    </View>
                </View>


            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    OuterContainer: {
        flex: 1,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',

    },

    pressable: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontFamily: 'merienda-bold',
        fontWeight: 'bold',
        margin: 8,
        color: 'white',
    },
    text: {
        color: 'white',
        margin: 8,

    },
    priceText: {
        textAlign: 'center',
    },
    indicator: {
        position: 'absolute',
        zIndex: 2,
        top: SCREEN_HEIGHT / 4,
        left: SCREEN_WIDTH / 2
    }
})


export default ProductDetailsScreen;

