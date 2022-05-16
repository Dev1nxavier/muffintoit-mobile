import { Button, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, } from '../components/Themed';
import { useEffect, useState } from 'react';
import { PRODUCTS } from '../data/store-data';
import { LinearGradient } from 'expo-linear-gradient';
import ProductGridTile from '../components/ProductGridTile';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../store/redux/cartSlice';


const ProductsScreen = ({ route, navigation }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const dispatch = useDispatch();
    
    const storedProducts = useSelector(state=>state.cartState.products);
    const catId = route.params.catId;

    //filter for products in category
    const productsList = PRODUCTS.filter((item) => { return item.category.indexOf(catId) >= 0; })

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
        <View style={styles.productContainer}>
            <FlatList
                data={productsList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedItem} />
        </View>
    )

}

const styles = StyleSheet.create({
    productContainer: {
        flex: 1,
        padding: 16,
    },
    image: {

    }
})

export default ProductsScreen;