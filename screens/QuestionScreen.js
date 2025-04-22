import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { fetchPutQuizResults } from "../services/quizResultsServices";
import QuizResult from "../components/QuizResult";
import QuizQuestion from "../components/QuizQuestion";

export default function QuestionScreen({ navigation }) {
  // Récupération des données du quiz dans le store redux
  const user = useSelector((state) => state.user.value);
  const quiz = useSelector((state) => state.quiz.value);

  // Fonction envoyer les données vers le backend et rediriger vers la page QuizScreen
  // La fonction sera passée dans le composant de résultat
  const handleSubmitQuiz = () => {
    // Si 70% de bonnes réponses, on considère que la série est réussie
    const passed = quiz.correctAnswers >= 7;

    // Envoi des résultats au backend
    fetchPutQuizResults(
      user.token,
      quiz.quizData._id,
      quiz.correctAnswers,
      passed
    ).then((response) => {
      // Si l'ajout s'est bien passé, on redirige vers QuizScreen
      if (response.result)
        navigation.navigate("Quiz", { screen: "QuizScreen" });
    });
  };

  return (
    <View style={styles.container}>
      {/* Si le quiz est terminé, on affiche le composant de résultat, sinon une question */}
      {quiz.isFinished ? (
        <QuizResult
          correctAnswersNumber={quiz.correctAnswers}
          totalQuestionsNumber={10}
          onPress={handleSubmitQuiz}
        />
      ) : (
        <QuizQuestion quiz={quiz} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
});
