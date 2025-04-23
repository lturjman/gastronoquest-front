import React from "react";
import { StyleSheet, View } from "react-native";

// Composant barre de progression affichée dans le quizz
function ProgressBar({ currentNumber, total }) {
  const steps = [];

  for (let i = 1; i <= total; i++) {
    i <= currentNumber
      ? steps.push(
          <View
            key={i}
            style={[styles.steps, { backgroundColor: "#6ac46a" }]}
          ></View>
        )
      : steps.push(<View key={i} style={styles.steps}></View>);
  }

  return <View style={styles.ProgressBarContainer}>{steps}</View>;
}

const styles = StyleSheet.create({
  ProgressBarContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#6ac46a",
    flexDirection: "row",
  },
  steps: {
    height: "100%",
    width: "10%",
  },
});

export default ProgressBar;
