import { View, Text, StyleSheet } from "react-native";
import QuizResultChart from "./QuizResultChart";
import CustomButton from "./ui-kit/CustomButton";
import LottieView from "lottie-react-native";

export default function QuizResult({
  correctAnswersNumber,
  totalQuestionsNumber,
  onPress,
}) {
  return (
    <View style={styles.resultContainer}>
      {/* L'effet confetti qu'on affiche uniquement si 70% de bonnes réponses au moins */}
      {correctAnswersNumber >= 7 && (
        <View style={styles.confettiContainer}>
          <LottieView
            source={require("../assets/confetti.json")}
            autoPlay
            loop={false}
            duration={4000}
            style={{ flex: 1, width: "100%", height: "100%" }}
          />
        </View>
      )}
      {/* Le contenu visible du container */}
      <View style={styles.resultContentContainer}>
        {/* La phrase avec le résultat */}
        <View style={styles.resultLabelContainer}>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
          >
            {correctAnswersNumber >= 7
              ? "Félicitations, tu as réussi cette série 💪"
              : "Il te reste encore un peu de travail pour valider cette série 🫤"}
          </Text>
        </View>
        {/* Le graphique donut avec le résultat */}
        <View style={styles.scoreContainer}>
          <QuizResultChart
            goodAnswerNumber={correctAnswersNumber}
            totalQuestionNumber={totalQuestionsNumber}
          />
        </View>
        {/* Le bouton pour continuer */}
        <View>
          <CustomButton title="Continuer" onPress={onPress} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  resultContentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  resultLabelContainer: {
    width: "80%",
  },
  scoreContainer: {
    width: "50%",
    aspectRatio: 1,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "20",
  },
  confettiContainer: {
    position: "absolute", // Position absolue pour que ça s'affiche par dessus le reste
    top: 0,
    left: 0,
    zIndex: 1,
    pointerEvents: "none", // Pour pouvoir cliquer sur les boutons
    width: "100%",
    height: "100%",
  },
});
