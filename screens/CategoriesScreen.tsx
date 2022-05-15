import React, { Component } from 'react'
import { Button, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Text, View, } from '../components/Themed';
import { useState } from 'react';
import { CATEGORIES } from '../data/store-data';
import { LinearGradient } from 'expo-linear-gradient';
import CategoriesGridTile from '../components/CategoriesGridTile';

const CategoriesScreen = ({ navigation, route }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const renderItem = ({ item }) => {

        const handlePress = () => {
            navigation.navigate('Products',{
                name:item.title,
                catId: item.id,
            })
        }

        return (
            <CategoriesGridTile
                title={item.title}
                id={item.id}
                color={item.color}
                onPress={handlePress} />
        )
    }


    return (
        <View>
                <FlatList
                    data={CATEGORIES}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedItem}
                    numColumns={2} />
        </View>
    )

}

const styles = StyleSheet.create({
    productContainer: {

    },
    image: {

    }
})

export default CategoriesScreen;