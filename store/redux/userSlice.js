import { createSlice } from '@reduxjs/toolkit';

//reducer desc: user details
const userSlice = createSlice({
    name: 'user',
    initialState: {
        customerid:'',
        firstname: '',
        lastname: '',
        city: '',
        state:'',
        street: '',
        country:'',
        postal: '',
        email: '',
        comments: '',
        orderHistory:[],
        isAuthenticated: false,
        sessionToken:'',
        localId:'',
    },
    reducers:{
        updateUser:(state, action)=>{
            //update or add
            return state = {...state, ...action.payload}
        },
        updateHistory:(state, action)=>{
  
            state.orderHistory = action.payload;
        },
        login:(state, action)=>{

            return state = {...state, sessionToken: action.payload.sessionToken, isAuthenticated:true, email:action.payload.email, localId:action.payload.localId};
        },
        logout:(state)=>{
            return state = {...state, sessionToken:null, isAuthenticated:false, orderHistory:[]};
        },
    }
})

export const updateUser = userSlice.actions.updateUser;
export const updateHistory = userSlice.actions.updateHistory;
export const logout = userSlice.actions.logout;
export const login = userSlice.actions.login;
export default userSlice.reducer;