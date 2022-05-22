import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState:{
        firstName:'',
        lastName: '',
        city: '',
        state:'',
        postal:'',
        comments:'',
        isGift: false,
        cartId:null,
    },
    reducers:{
        udpateShipping:(state, action)=>{
            return state = {...state, ...action.payload};
        },
    }
})

export const updateShipping = orderSlice.actions.udpateShipping;

export default orderSlice.reducer;