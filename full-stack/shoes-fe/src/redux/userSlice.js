import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  id: null,
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      console.log(state);
      state.username = action.payload.username;
      state.id = action.payload.id;
      state.email = action.payload.email;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login } = userSlice.actions;

export default userSlice.reducer;
