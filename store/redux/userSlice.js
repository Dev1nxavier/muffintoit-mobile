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
    },
    reducers:{
        updateUser:(state, action)=>{
            //update or add
            return state = {...state, ...action.payload}
        },
        updateHistory:(state, action)=>{
  
            state.orderHistory.push(action.payload)
        }
    }
})

export const updateUser = userSlice.actions.updateUser;
export const updateHistory = userSlice.actions.updateHistory;
export default userSlice.reducer;