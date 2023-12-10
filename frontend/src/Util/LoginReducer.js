import { createSlice } from "@reduxjs/toolkit";
import { cache }  from "./cache.js"

const initialState = {
  userDetails: {...cache.getItem("User")}
};


const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = {...action.payload}
    },

    resetUser: (state, action) => {
        state.userDetails = {}
    }
  },
});


export const { setUserDetails, resetUser } = loginSlice.actions;
export default loginSlice.reducer;