// Récupérer les résultats des quiz
export const fetchGetQuizResults = async (token) => {
  try {
    // Récupération des résultats de quizz
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/quizResults`,
      {
        method: "GET",
        headers: { authorization: token },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
