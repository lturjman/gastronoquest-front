import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";

// Composant qui retourne un graphique en donut
// Utilisé pour afficher le résultat de l'utilisateur à un quizz
export default function QuizResultChart({
  goodAnswerNumber,
  totalQuestionNumber,
}) {
  // Calcul des pourcentages de bonnes et mauvaises réponses
  const goodAnswerPercentage = goodAnswerNumber * 10;
  const badAnswerPercentage = (totalQuestionNumber - goodAnswerNumber) * 10;

  // Si 70% de bonnes réponses au moins, le graphique est vert, sinon rouge
  const goodAnswerColor = goodAnswerNumber >= 7 ? "#6AC46A" : "#e5685c";

  // Données du graphique
  const pieData = [
    { value: goodAnswerPercentage, color: goodAnswerColor },
    { value: badAnswerPercentage, color: "#e0e0e0" },
  ];

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PieChart
        donut
        innerRadius={85}
        data={pieData}
        radius={90}
        innerCircleColor={"#F9F9F9"}
        isAnimated
        centerLabelComponent={() => {
          return (
            <Text style={{ fontSize: 40, fontWeight: "bold" }}>
              {goodAnswerPercentage}%
            </Text>
          );
        }}
      />
    </View>
  );
}
