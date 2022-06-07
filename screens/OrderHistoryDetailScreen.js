import { Button, Text, FlatList, StyleSheet, Image } from "react-native";
import { View } from 'react-native';
import { useSelector } from 'react-redux';

const CartItem = ({ item }) => {

    console.log("Inside CartItem", item);
    return (
        <View style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginVertical: 12,
        }}>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: 'flex-start',

                }}>
                <Image source={{uri: `${item.imageUri}`}} style={{ width: 100, height: 100, borderRadius: 15 }} />

                <View style={{ height: 100, flex: 1, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                    <Text style={{ marginLeft: 10, fontFamily:'merienda-bold', fontWeight:'bold', fontSize: 20 }}>{item.title}</Text>
                    <View style={{flexDirection:'row'}}>
                       <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>${item.price}</Text> 
                       <Text style={{fontSize: 20, marginLeft: 10 }}>Qty: {item.qty}</Text> 
                    </View>
                    
                </View>
            </View>
        </View>
    )
}

const OrderHistoryDetails = ({navigation, route})=>{
    
    //retrieve all user orders from state
    const ORDER_LIST = useSelector((state) => state.userState).orderHistory;

    //filter list on orderId
    const id = route.params.orderId

    const selectOrder = ORDER_LIST.filter(item=>item.orderId===id)[0];

    const { subtotal, products, ...others  } = selectOrder;

    const renderItem = ({item})=>{
        return <CartItem item={item}/>
    }

    return (
        <View style={styles.container}>
            <View style={styles.lineItemsContainer}>
                <Text style={styles.text}>
                    Item Subtotal:
                </Text>
                <Text style={styles.text}>
                    ${subtotal}
                </Text>
            </View>

            <View style={styles.lineItemsContainer}>
                <Text style={styles.text}>
                    Shipping &amp; handling:
                </Text>
                <Text style={styles.text}>
                    $0.00
                </Text>
            </View>

            <View style={styles.lineItemsContainer}>
                <Text style={styles.text}>
                    Total before taxes:
                </Text>
                <Text style={styles.text}>
                    ${subtotal}
                </Text>
            </View>

            <View style={styles.lineItemsContainer}>
                <Text style={styles.text}>
                    Tax:
                </Text>
                <Text style={styles.text}>
                    $0.00
                </Text>
            </View>

            <View style={styles.lineItemsContainer}>
                <Text style={[styles.text,{fontWeight:"bold"}]}>
                    Order total:
                </Text>
                <Text style={[styles.text,{fontWeight:'bold'}]}>
                    ${subtotal}
                </Text>
            </View>
            <Text style={[styles.title,{margin: 24}]}>Ordered items</Text>
            <FlatList 
                style={styles.list}
                data={products}
                renderItem={renderItem}
                numColumns={1}
                keyExtractor={item=>item.id}
            />
        </View>
    )

}

export default OrderHistoryDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white',

    },
    list: {
        alignSelf: 'stretch',
    },
    text:{
        fontSize: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'merienda'
    },
    lineItemsContainer: {
        flexDirection: 'row',
        alignItems:'space-evenly',
        justifyContent: 'space-between',
        width:'100%',
        marginVertical: 8,
    }

})