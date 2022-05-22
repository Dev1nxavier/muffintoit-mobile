import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useSelector } from 'react-redux';

interface ListItem{
    order: {
        date: Date,
        subtotal: string,
        id: string,
    },
    handlePress: Function,
}

const ListItem = ({ order, handlePress }:ListItem) => {

    return (

        <View style={styles.itemContainer}>
            <Pressable
            style={({pressed})=>({
                opacity: pressed? 0.5:1,
            })}
            onPress={()=>handlePress(order)}
            >
            <Text style={[styles.title, styles.date]}>Date: {order.date}</Text>
            <View style={styles.innerContainer}>
                
                <Text style={styles.text}>Subtotal: ${order.subtotal}</Text>
                <Text style={styles.text}>Order number: {order.id}</Text>
            </View>
            </Pressable>
        </View>
    )
}

export default function OrderHistory({ navigation, route }) {

    interface stateObject {
        userState: {
            orderHistory?: Array<String>
        }
    }

    const handlePress =(order:{id:string,})=>{
        navigation.navigate('OrderDetails',{
            orderId: order.id,
        })

    }

    const ORDERS = useSelector((state: stateObject) => state.userState.orderHistory);

    if (!ORDERS || ORDERS.length < 1) {
        return <Text>Please login to see your orders</Text>
    }

    const renderItem = ({ item }:{item:object}) => <ListItem order={item} handlePress={handlePress} />

    return (
        <View>
           
            <FlatList
                numColumns={1}
                data={ORDERS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({

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
    innerContainer:{
        margin: 16,

    },
    text:{
        fontSize:16,
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
    pageTitle:{
        margin:24,
        color:'#255994'
    },
    date:{
        margin: 16,
    }

})