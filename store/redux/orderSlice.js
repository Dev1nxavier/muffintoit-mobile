import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState:{
        firstname:'',
        lastname: '',
        street:'',
        city: '',
        state:'',
        postal:'',
        country:'',
        comments:'',
        isGift: false,
        shippingMethodId:''
    },
    reducers:{
        udpateShipping:(state, action)=>{
            return state = {...state, ...action.payload};
        },
    }
})

export const updateShipping = orderSlice.actions.udpateShipping;

export default orderSlice.reducer;