import { saveGuestQuiz } from "../reducers/guest";

export const handleSubmitQuiz = async (
  dispatch,
  navigation,
  token,
  quizId,
  score
) => {
  // Si 70% de bonnes réponses, la série est réussie
  const passed = score >= 7;

  // Si l'utilisateur n'est pas connecté
  if (!token || token === null) {
    console.log("Utilisateur pas connecté");
    // Sauvegarde du résultat dans le reducer guest
    const quizResult = {
      quizId,
      score,
      passed,
      passedAt: Date.now(),
    };
    dispatch(saveGuestQuiz(quizResult));
    // Redirection vers la page EnterScreen
    return navigation.navigate("Enter");
  }

  // Si l'utilisateur est connecté, envoi des résultats au backend
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/quizResults`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json", authorization: token },
        body: JSON.stringify({ quizId, score, passed }),
      }
    );

    const data = await response.json();

    // Si l'ajout s'est bien passé
    if (data.result) {
      // Redirection vers la page QuizScreen
      navigation.navigate("Quiz", { screen: "QuizScreen" });
    } else {
      throw new Error("Failed to save quiz result");
    }
  } catch (error) {
    console.error(error);
  }
};
