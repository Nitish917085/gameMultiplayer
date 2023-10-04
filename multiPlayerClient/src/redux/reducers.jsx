import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user:{},
  roomId:"",

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
  },
});

export const { setUsers,setRoomId} = userSlice.actions;

export default userSlice.reducer;
