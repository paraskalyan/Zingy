import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchQuery",
  initialState: {
    searchQuery: "",
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
