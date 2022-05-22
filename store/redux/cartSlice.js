import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    cartId: '',
    uniqueItems:null,
    totalCount:null,
    subtotal: 0,
    taxes: 0,
    total:0,
    products:[],
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
               console.log("store: item exists")
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
        clearCart: (state, action)=>{
            return {...state, ...initialState}
        },
    }
});

export const addProduct = cartSlice.actions.addProduct;
export const removeProduct = cartSlice.actions.removeProduct;
export const subtractProduct = cartSlice.actions.
subtractProduct;
export const clearCart = cartSlice.actions.clearCart;
export default cartSlice.reducer;