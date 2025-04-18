import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    firstConnection: false,
    username: null,
    email: null,
    token: null,
    level: null,
    totalSavedCo2: null,
    favorites: [],
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
    addFavorite: (state, action) => {
      state.value.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.value.favorites = state.value.favorites.filter(
        (restaurant) => restaurant._id !== action.payload._id
      );
    },
  },
});

export const { updateUser, removeUser, removeFavorite, addFavorite } =
  UserSlice.actions;
export default UserSlice.reducer;
