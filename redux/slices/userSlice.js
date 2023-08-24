import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    image: "",
    token: "",
  },
  reducers: {
    setUserLoginDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.token = action.payload.token;
    },
    clearUserLoginDetails: (state) => {
      state.name = "";
      state.email = "";
      state.image = "";
      state.token = "";
    },
  },
});

export const { setUserLoginDetails, clearUserLoginDetails } = userSlice.actions;
export default userSlice.reducer;
