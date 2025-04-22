import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default function QuizResultChart({
  goodAnswerNumber,
  totalQuestionNumber,
}) {
  const goodAnswerPercentage = goodAnswerNumber * 10;
  const badAnswerPercentage = (totalQuestionNumber - goodAnswerNumber) * 10;
  const goodAnswerColor = goodAnswerNumber >= 7 ? "#6AC46A" : "#e5685c";
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
