import React, { Component, Key, useLayoutEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View, Platform, Button } from 'react-native';
import { PRODUCTS } from '../data/store-data';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, removeProduct, setCart } from '../store/redux/cartSlice';
import { addCartProduct } from '../util/eCommerce'

function ProductDetailsScreen({ route, navigation } : any) {
    type itemObj = {
        id: string,
    }

    type stateObj = {
        cartState: object,
        products: any,
    }
    

    const productId = route.params.id;

    const PRODUCTS = useSelector(state=>state.productState.loadProducts);

    const cartId = useSelector(state=>state.cartState.cartId)
    console.log("Current Cart State:",cartId);

    const [productDetails] = PRODUCTS.filter(item => item.id === productId);

    const { id, title, price, imageUri } = productDetails;

    const dispatch = useDispatch();

    //retrieve products from store
    const cartItems = useSelector((state : stateObj) => state.cartState.products);

    const cartItemStatus = cartItems.find((item:itemObj)=>item.id === id);

    const headerButtonPressHandler = async () => {
        
        if(cartItemStatus){
            dispatch(removeProduct({...productDetails}));

        }else{
            //POST to CMS
            const cart = await addCartProduct(cartId,productId)
        
            dispatch(setCart({...cart}));
            
        }
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
                        {!cartItemStatus ? <FontAwesome5 name= "cart-plus" size={24} color='white' /> :
                        <Text style={{fontSize:12, color:'white'}}>Remove</Text>}
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
                    <Image
                        source={{uri:`${imageUri}`}}
                        style={styles.image} />
                    <Text style={styles.title}>
                        {title}
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Text style={styles.text}>
                            {id}
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
    image: {
        width: '100%',
        height: 350,
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
})


export default ProductDetailsScreen;

