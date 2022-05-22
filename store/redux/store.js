import {configureStore} from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import userSlice from './userSlice';
import orderSlice from './orderSlice';

export const store = configureStore({
    reducer:{
        cartState: cartSlice,
        userState: userSlice,
        orderState: orderSlice,
    }
})

