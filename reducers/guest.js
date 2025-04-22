import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    favorite: null,
    quest: null,
    quiz: null,
  },
};

export const GuestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    saveGuestFavorite: (state, action) => {
      state.value.favorite = action.payload;
    },
    saveGuestQuest: (state, action) => {
      state.value.quest = action.payload;
    },
    saveGuestQuiz: (state, action) => {
      state.value.quiz = action.payload;
    },
  },
});

export const {
  saveGuestFavorite,
  saveGuestQuest,
  saveGuestQuiz
} = GuestSlice.actions;
export default GuestSlice.reducer;