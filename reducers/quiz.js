import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    quizData: null,
    questionNumber: 1,
    correctAnswers: 0,
    isFinished: false,
  },
};

export const QuizSlice = createSlice({
  name: "quiz",

  initialState,
  reducers: {
    updateQuiz: (state, action) => {
      const newState = {
        quizData: action.payload,
        questionNumber: 1,
        correctAnswers: 0,
        isFinished: false,
      };
      state.value = newState;
    },
    goodAnswer: (state) => {
      state.value.correctAnswers += 1;
      if (state.value.questionNumber === 10) {
        state.value.isFinished = true;
      } else {
        state.value.questionNumber += 1;
      }
    },
    badAnswer: (state) => {
      if (state.value.questionNumber === 10) {
        state.value.isFinished = true;
      } else {
        state.value.questionNumber += 1;
      }
    },
  },
});

export const { updateQuiz, goodAnswer, badAnswer } = QuizSlice.actions;
export default QuizSlice.reducer;
