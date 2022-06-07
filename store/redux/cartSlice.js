import React, { useEffect } from 'react'
import { createSlice } from '@reduxjs/toolkit'

//reducer desc:  state of current cart
const initialState ={
    cartId: '',
    checkout_token:'',
    uniqueItems:null,
    totalCount:null,
    subtotal: 0,
    taxes: 0,
    total:0,
    products:[],
    live:[],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addProduct:(state, action)=>{
            //check if item exists
            const item = state.products.find(product=>product.id === action.payload.id);

            if(item){
                /* 
                NOTE: redux toolkit. This does not mutate state. 
                */
                item.qty ++;
            }else{

                state.products.push(action.payload);
            }

            state.totalCount++;
            state.subtotal +=action.payload.price;

        },
        subtractProduct: (state, action)=>{
            //check that product exists in cart
            const item = state.products.find(product=>product.id === action.payload.id);

            //if exists, decrement
            if(item){
                if(item.qty>1){
                    item.qty--;
                }else{
                    state.products.splice(state.products.map(item=>item.id).indexOf(action.payload.id),1)
                }

                state.totalCount--;
                state.subtotal-=action.payload.price;
            }else{
                state
            }
        },
        removeProduct: (state, action)=>{

            // This is good for array of objects:
            state.products.splice(state.products.map(item=>item.id).indexOf(action.payload.id),1)

            state.totalCount--;
            state.subtotal-=action.payload.price;
        },
        clearCart: (state)=>{
            return {...state, ...initialState}
        },
        setCart:(state, action)=>{

            return {...state, ...action.payload}
        }
    },
});

export const addProduct = cartSlice.actions.addProduct;
export const removeProduct = cartSlice.actions.removeProduct;
export const subtractProduct = cartSlice.actions.
subtractProduct;
export const clearCart = cartSlice.actions.clearCart;
export const setCart = cartSlice.actions.setCart;
export default cartSlice.reducer;