import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { Image, FlatList } from "react-native";
import { RootTabScreenProps } from "../types";
import cookies from '../assets/images/cookies_nobg.png';
import icecreambar from '../assets/images/icecreambar_nobg.png';
import icecream from '../assets/images/ice-cream_nobg.png';
import cones from '../assets/images/icecreamcones_nobg.png';
import { useState } from "react";

const CART_ITEMS =[
    {
        imageUri: Image.resolveAssetSource(cookies).uri,
        title: 'Cookies',
        price: 100,
        quantity: 2,
    },
    {
        imageUri: Image.resolveAssetSource(icecreambar).uri,
        title: 'Ice cream bars',
        price: 100,
        quantity: 2,
    },
    {
        imageUri: Image.resolveAssetSource(icecream).uri,
        title: 'Ice cream sunday',
        price: 100,
        quantity: 2,
    },
    {
        imageUri: Image.resolveAssetSource(cones).uri,
        title: 'Ice cream cones',
        price: 100,
        quantity: 2,
    },
]

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
            <Image source={{uri: item.imageUri }} style={{width:50, height: 50}}/>
            <Text style={{marginLeft:10}}>{item.title}</Text>
            <Text style={{fontWeight:'bold', marginLeft:10}}>${item.price}</Text>
        </View>
        </TouchableOpacity>
    )
}

export default function CartScreen({ navigation }: RootTabScreenProps<'Cart'>) {

    const [selectedId, setSelectedId] = useState(null);

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
            data={CART_ITEMS}
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