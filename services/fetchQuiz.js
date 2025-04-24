// Fonction pour récupérer les quizz depuis le backend
export const fetchQuiz = async () => {
  try {
    // Récupération des quiz
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/quizzes`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

// Fonction pour récupérer les données d'un quiz à partir d'un id
export const fetchQuizById = async (quizId) => {
  try {
    // Récupération des quizz
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/quiz/${quizId}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
