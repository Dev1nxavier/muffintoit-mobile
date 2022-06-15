import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateHistory } from '../store/redux/userSlice';
import { retrieveOrders } from '../util/eCommerce';
import LoadingOverlay from '../components/ui/LoadingOverlay'

interface ListItem {
    order: {
        date: Date,
        subtotal: string,
        id: string,
    },
    handlePress: Function,
}

const ListItem = ({ order, handlePress }: ListItem) => {

    const calDate = new Date(order.orderDate).toDateString();

    return (

        <View style={styles.itemContainer}>
            <Pressable
                style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                })}
                onPress={() => handlePress(order)}
            >
                <Text style={[styles.title, styles.date]}>Date: {calDate}</Text>
                <View style={styles.innerContainer}>

                    <Text style={styles.text}>Subtotal: ${order.subtotal}</Text>
                    <Text style={styles.text}>Total: ${order.total}</Text>
                    <Text style={styles.text}>Order number: {order.orderId}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default function OrderHistory({ navigation, route }) {
    const dispatch = useDispatch();
    const localId = useSelector(state => state.userState.localId);

    const checkout_token = useSelector(state => state.cartState.checkout_token);

    interface stateObject {
        userState: {
            orderHistory?: Array<String>
        }
    }

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getUserOrders() {
            
            if(!isAuthenticated) return;

            setIsLoading(true);
            
            try {
                const orders = await retrieveOrders(localId);
                dispatch(updateHistory([...orders]))
            } catch (error) {
                console.error("Unable to retrieve order history for user:", error);
            }

            setIsLoading(false);

        }

        getUserOrders();

    }, [localId, checkout_token])

    const handlePress = (order: { orderId: string, }) => {
        navigation.navigate('OrderDetails', {
            orderId: order.orderId,
        })

    }

    const {orderHistory:ORDERS, isAuthenticated} = useSelector((state: stateObject) => state.userState);

    console.log("OrderHistory: ORDERS:", ORDERS);

    if(isLoading){
        return(
            <LoadingOverlay message="Loading Order History..."/>
        )
    }

    if (!ORDERS || ORDERS.length < 1) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>No orders found. Start Shopping!</Text>
            </View>)
    }

    const renderItem = ({ item }: { item: object }) => <ListItem order={item} handlePress={handlePress} />

    return (
        <View style={styles.container}>
            <FlatList
                numColumns={1}
                data={ORDERS}
                renderItem={renderItem}
                keyExtractor={item => item.orderId}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: 'black',
        margin: 16,
        borderRadius: 8,
        elevation: 4,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        width: '100%',
        maxWidth: 350,
    },
    innerContainer: {
        margin: 16,

    },
    text: {
        fontSize: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'merienda',
        alignSelf: 'center',
    },
    list: {
        alignSelf: 'stretch',
    },
    pageTitle: {
        margin: 24,
        color: '#255994'
    },
    date: {
        margin: 16,
    }

})