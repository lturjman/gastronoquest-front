import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const variantStyles = {
  selected: {
    button: {
      backgroundColor: "#6ac46a",
    },
    text: {
      color: "#173e19",
    },
  },
  notSelected: {
    button: {
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: "#173e19",
    },
    text: {
      color: "#173e19",
    },
  },
};

// Composant bouton utilisé sur chaque question du quizz
const QuizButton = ({ title, variant, textSize = 14, onPress }) => {
  // Style variable en fonction de la sélection du bouton ou non
  const selectedVariant = variantStyles[variant];

  return (
    <TouchableOpacity
      style={[styles.baseButton, selectedVariant.button]}
      onPress={() => onPress(title)}
    >
      <Text
        style={[styles.baseText, selectedVariant.text, { fontSize: textSize }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    width: "100%",
  },
  baseText: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default QuizButton;
