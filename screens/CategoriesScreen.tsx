import React, { Component, useEffect } from 'react'
import { Button, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Text, View, } from '../components/Themed';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../store/redux/productsSlice';
import { getCategories } from '../util/eCommerce'
import CategoriesGridTile from '../components/CategoriesGridTile';

const CategoriesScreen = ({ navigation, route }: any) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const dispatch = useDispatch();
    const CATEGORIES = useSelector(state=>state.productState).loadCategories;


    const renderItem = ({ item }: any) => {

       
        const handlePress = () => {
            navigation.navigate('Products', {
                name: item.title,
                catId: item.id,
            })
        }

        return (
            <CategoriesGridTile
                title={item.title}
                id={item.id}
                color={item.color}
                image={{uri:`${item.image}`}}
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