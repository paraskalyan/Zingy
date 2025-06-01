import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    signIn: (state, action) => {
      console.log("HIIIIIIIIII");
      state.currentUser = action.payload;
      console.log(state.currentUser);
    },
    signOut: (state, action) => {
      state.currentUser = null;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
