import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user:{},
  roomId:"",
  checkerColor:''

};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.user = action.payload;
    },   
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    }, 
    setMyCheckerColor:(state,action)=>{
        state.checkerColor=action.payload
    }
  },
});

export const { setUsers,setRoomId,setMyCheckerColor} = userSlice.actions;

export default userSlice.reducer;
