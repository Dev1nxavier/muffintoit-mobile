import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';


const ProductGridTile = ({ title, imageUri, onPress, price, }) => {
    return (
        <View style={styles.gridItem}>
            <TouchableOpacity onPress={() => onPress(title)}>
                <View style={styles.innerContainer}>
                    <Image
                        source={imageUri}
                        style={styles.Image}

                    />
                    <Text style={[styles.title, { textAlign: 'center' }]}>{title}</Text>
                </View>
                <View>
                    <Text style={[styles.title, styles.priceText]}>
                        ${price}
                    </Text>
                </View>


            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    gridItem: {
        backgroundColor: 'white',
        flex: 1,
        margin: 16,
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS==='android'? 'hidden':'visible',
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressable: {
        flex: 1,
    },
    title: {
        fontFamily: 'merienda-bold',
        fontWeight: 'bold',
        margin: 8,
    },
    priceText:{
        textAlign:'center',
        fontSize: 24,

    },
    buttonPressed: {
        opacity: 0.5,
    },
    Image: {
        width: '100%',
        height: 200,
    }
})

export default ProductGridTile;