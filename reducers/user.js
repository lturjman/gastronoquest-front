import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: null,
    email: null,
    token: null,
  },
};

export const UserSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.value = action.payload;
    },
    removeUser: (state) => {
      state.value = { username: null, email: null, token: null };
    },
  },
});

export const { updateUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;
