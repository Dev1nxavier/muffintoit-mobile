import { createSlice} from '@reduxjs/toolkit' ;

const productsSlice= createSlice({
    name: 'products',
    initialState:{
        loadProducts: [],
        loadCategories:[],
    },
    reducers:{
        setProducts:(state,action)=>{

            state.loadProducts =  action.payload;
        },
        setCategories:(state, action)=>{

            state.loadCategories = action.payload;
        }
    }
});

export const setProducts = productsSlice.actions.setProducts;
export const setCategories = productsSlice.actions.setCategories;
export default productsSlice.reducer;