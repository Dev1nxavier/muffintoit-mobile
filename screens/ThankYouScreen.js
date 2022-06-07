import React, { Component } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Order from '../components/checkout/Order';

export default function ThankYou({navigation, route}){

    const orderId = route.params.orderId;

    console.log("Thank you screen. OrderId:", orderId);

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Thank you for your Order!</Text>
          <View style={{ flex: 1 }}>
            <View>
              <Order orderId={orderId} />
              <Button title='Shop some more!' onPress={() => navigation.navigate('Categories')} />
            </View>
          </View>
        </View>
      )
}

const styles = StyleSheet.create({
    title: {
        marginVertical: 8,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#234fc7',
        fontFamily: 'merienda-bold',
      },
})