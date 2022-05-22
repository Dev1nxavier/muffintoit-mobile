import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        firstName: '',
        lastName: '',
        creditCard: '',
        cid: '',
        city: '',
        state:'',
        street: '',
        postal: '',
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