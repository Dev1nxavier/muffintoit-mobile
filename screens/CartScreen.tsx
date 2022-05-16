import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { Image, FlatList } from "react-native";
import { RootTabScreenProps } from "../types";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct } from "../store/redux/cartSlice"; 
import { PRODUCTS } from "../data/store-data";



const CartItem = ({item, onPress})=>{


    return(
        <TouchableOpacity onPress={onPress}>
        <View
        style={{
            flexDirection:"row",
            padding:20,
            alignItems:'center',
            justifyContent:'space-between',
        }}>
            <Image source={item.imageUri} style={{width:50, height: 50}}/>
            <Text style={{marginLeft:10}}>{item.title}</Text>
            <Text style={{fontWeight:'bold', marginLeft:10}}>${item.price}</Text>
        </View>
        </TouchableOpacity>
    )
}

export default function CartScreen({ navigation }: RootTabScreenProps<'Cart'>) {

    const [selectedId, setSelectedId] = useState(null);

    const dispatch = useDispatch();

    const CART_ITEMS = useSelector((state)=>state.cartState.products);

    //return cart items from data-store matching cart state
    const CART_ITEM_LIST = PRODUCTS.filter((item)=>CART_ITEMS.includes(item.id))
    

    const handlePress = (item)=>{
        alert(item.title);
        setSelectedId(item.title)
    }

    const renderItem = ({item})=>(
        <CartItem item={item} onPress={()=>handlePress(item)}/>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My cart</Text>
            <FlatList
            style={{alignSelf:'stretch'}} 
            data={CART_ITEM_LIST}
            renderItem={renderItem}
            keyExtractor={item=>item.title}/>
            <View>
                <Text>Total: $400</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});