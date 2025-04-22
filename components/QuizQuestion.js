import { View, Text, StyleSheet } from "react-native";
import QuestionResultModal from "./questionResultModal";
import ProgressBar from "./ui-kit/ProgressBar";
import { useDispatch } from "react-redux";
import { badAnswer, goodAnswer } from "../reducers/quiz";
import { useState } from "react";
import CustomButton from "../components/ui-kit/CustomButton";
import QuizButton from "../components/QuizButton";

export default function QuizQuestion({ quiz }) {
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

  return (
    <View style={styles.globalContainer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
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
});
