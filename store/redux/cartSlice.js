import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        cartId: '',
        uniqueItems:null,
        totalCount:null,
        subtotal: null,
        products:[],
    },
    reducers:{
        addProduct:(state, action)=>{
            state.products.push(action.payload.id);    
        },
        removeProduct: (state, action)=>{
            //This is good for array of objects:
            // state.products.splice(state.products.map(item=>item.id).indexOf(action.payload.id),1)

            //this is good for flat array:
            state.products.splice(state.products.indexOf(action.payload.id),1);
        },
    }
});

export const addProduct = cartSlice.actions.addProduct;
export const removeProduct = cartSlice.actions.removeProduct;
export default cartSlice.reducer;