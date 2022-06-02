import React, { } from 'react'
import { StyleSheet, FlatList, Dimensions  } from 'react-native';
import { View, } from '../components/Themed';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoriesGridTile from '../components/CategoriesGridTile';


const {width: windowWidth} = Dimensions.get('window');

const ITEM_WIDTH = windowWidth;

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
        <View style={styles.productContainer}>
            <FlatList
                data={CATEGORIES}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedItem}
                numColumns={2}
               />
        </View>
    )

}

const styles = StyleSheet.create({
    productContainer: {
        width: ITEM_WIDTH,
    },

})

export default CategoriesScreen;