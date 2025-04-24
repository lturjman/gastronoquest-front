import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    favorite: undefined,
    quest: undefined,
    quiz: undefined,
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
    clearGuestData: (state, action) => {
      state.value = initialState.value;
    },
  },
});

export const {
  saveGuestFavorite,
  saveGuestQuest,
  saveGuestQuiz,
  clearGuestData
} = GuestSlice.actions;
export default GuestSlice.reducer;