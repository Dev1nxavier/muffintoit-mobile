
import React, { Fragment } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { View, Text, Button } from 'react-native';

export default function Order({orderId}) {

    //get user state for signed in user
    const ORDER_HISTORY = useSelector(state=>state.userState).orderHistory;

    
    if(!ORDER_HISTORY|| ORDER_HISTORY.length<1){
        return(
            <View>
                <Text>No orders found</Text>
            </View>
        )
    }

    return (
        <Fragment>
            <Text>
                Thank you for your order.
            </Text>
            <Text>
                Your order number is {orderId}. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
            </Text>
        </Fragment>
    )
}