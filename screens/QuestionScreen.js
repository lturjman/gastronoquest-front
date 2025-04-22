import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../components/ui-kit/CustomButton";
import QuizButton from "../components/QuizButton";
import { useState } from "react";
import QuestionResultModal from "../components/questionResultModal";
import { badAnswer, goodAnswer } from "../reducers/quiz";
import ProgressBar from "../components/ui-kit/ProgressBar";
import { fetchPutQuizResults } from "../services/quizResultsServices";

export default function QuestionScreen({ navigation }) {
  // Récupération des données du quiz dans le store redux
  const user = useSelector((state) => state.user.value);
  const quiz = useSelector((state) => state.quiz.value);
  const dispatch = useDispatch();

  // Récupérer les données de la question actuelle
  const currentQuestion = quiz.quizData.questions.filter(
    (question) => question.questionNumber === quiz.questionNumber
  )[0];

  // State pour stocker la réponse actuelle
  const [currentAnswer, setCurrentAnswer] = useState("");

  // States pour l'affichage de la modale de résultat
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fonction pour afficher la modal dès qu'une réponse est validée
  const handleSubmitAnswer = () => {
    currentAnswer && setIsModalVisible(!isModalVisible);
  };

  // Fonction pour passer à la question suivante une fois qu'on clique sur "question suivante" dans la modale
  const handleNextQuestion = (isGoodAnswer) => {
    isGoodAnswer ? dispatch(goodAnswer()) : dispatch(badAnswer());
    setCurrentAnswer("");
    setIsModalVisible(!isModalVisible);
  };

  const handleSubmitQuiz = () => {
    const passed = quiz.correctAnswers >= 7;

    fetchPutQuizResults(
      user.token,
      quiz.quizData._id,
      quiz.correctAnswers,
      passed
    ).then((response) => {
      if (response.result)
        navigation.navigate("Quiz", { screen: "QuizScreen" });
    });
  };

  const questionContainer = (
    <>
      {/*Modal pour l'affichage des résultats*/}
      <QuestionResultModal
        comment={currentQuestion.comment}
        rightAnswer={currentQuestion.rightAnswer}
        articleUrl={currentQuestion.articleUrl}
        isGoodAnswer={currentAnswer === currentQuestion.rightAnswer}
        onPress={handleNextQuestion}
        visible={isModalVisible}
      />
      {/* Contenu et numéro de la question */}
      <View style={styles.questionContainer}>
        <View style={{ width: "50%", height: 10 }}>
          <ProgressBar
            currentNumber={currentQuestion.questionNumber}
            total={10}
          />
        </View>
        <Text>{currentQuestion.questionNumber} / 10</Text>
        <Text style={{ fontSize: 18, textAlign: "center" }}>
          {currentQuestion.question}
        </Text>
      </View>
      {/* Liste des réponses */}
      <View style={styles.answersContainer}>
        {currentQuestion.answers.map((answer, i) => (
          <QuizButton
            key={i}
            title={answer}
            variant={answer === currentAnswer ? "selected" : "notSelected"}
            onPress={(answerSelected) => setCurrentAnswer(answerSelected)}
          />
        ))}
      </View>
      {/* Bouton de validation, activé uniquement si une question est sélectionnée */}
      <View style={styles.validateAnswerContainer}>
        <CustomButton
          title="Valider ma réponse"
          disabled={currentAnswer ? false : true}
          onPress={handleSubmitAnswer}
        />
      </View>
    </>
  );

  // Ce qui est affiché lorsque qu'on a terminé le quizz
  const quizResultContainer = (
    <>
      <View style={styles.resultContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          {quiz.correctAnswers >= 7
            ? "Félicitations, tu as réussi cette série 💪"
            : "Il te reste encore un peu de travail pour valider cette série 🫤"}
        </Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={{ fontSize: 17 }}>Ton score :</Text>
        <Text style={{ fontWeight: "bold", fontSize: 50 }}>
          {quiz.correctAnswers * 10}%
        </Text>
      </View>
      <View>
        <CustomButton title="Continuer" onPress={handleSubmitQuiz} />
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {quiz.isFinished ? quizResultContainer : questionContainer}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  questionContainer: {
    gap: 10,
    alignItems: "center",
    width: "90%",
  },
  answersContainer: {
    width: "90%",
    gap: 10,
  },
  validateAnswerContainer: {
    width: "90%",
  },
  resultContainer: {
    width: "90%",
  },
  scoreContainer: {
    backgroundColor: "#e5685c",
    width: "50%",
    aspectRatio: 1,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "20",
  },
});
