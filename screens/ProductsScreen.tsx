import { StyleSheet, FlatList, } from 'react-native';
import { View, } from '../components/Themed';
import { useState } from 'react';
import ProductGridTile from '../components/ProductGridTile';
import { useSelector } from 'react-redux';
import MyCarousel from '../components/ShopCarousel';



const ProductsScreen = ({ route, navigation }:any) => {

    const [selectedItem, setSelectedItem] = useState(null);

    const catId = route.params.catId;

    //filter for products in category
    const PRODUCTS = useSelector(state=>state.productState).loadProducts;
 
    const productsList = PRODUCTS.filter((item) => { return item.categories.indexOf(catId) >= 0; })  

    const renderItem = ({ item }) => {

        const handlePress = () => {
            
            navigation.navigate('Details', {
                id: item.id,
                title: item.title
            })
        }

        const itemProps = {
            title: item.title,
            imageUri: item.imageUri,
            onPress: handlePress,
            price: item.price,
            category: item.category,
        }
        return (
            <ProductGridTile {...itemProps} />
        )
    }



    return (
        <>
        <View style={styles.productContainer}>
            <FlatList
                data={productsList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedItem}
                numColumns={2} />
        </View>
        </>

    )

}

const styles = StyleSheet.create({
    productContainer: {
        flex: 1,
        padding: 8,
    },
})

export default ProductsScreen;