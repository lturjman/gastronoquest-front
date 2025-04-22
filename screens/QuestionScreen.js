import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import QuizResult from "../components/QuizResult";
import QuizQuestion from "../components/QuizQuestion";
import { handleSubmitQuiz } from "../services/handleSubmitQuiz";

export default function QuestionScreen({ navigation }) {
  const dispatch = useDispatch();

  // Récupération des données du quiz dans le store redux
  const user = useSelector((state) => state.user.value);
  const quiz = useSelector((state) => state.quiz.value);

  // Si le quiz est terminé, on affiche le composant de résultat, sinon une question
  return (
    <SafeAreaView style={styles.container}>
      {quiz.isFinished ? (
        <QuizResult
          correctAnswersNumber={quiz.correctAnswers}
          totalQuestionsNumber={10}
          onPress={() => handleSubmitQuiz(dispatch, navigation, user.token, quiz.quizData._id, quiz.correctAnswers)}
        />
      ) : (
        <QuizQuestion quiz={quiz} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  }
});