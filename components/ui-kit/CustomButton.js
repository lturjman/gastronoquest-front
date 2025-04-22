import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const variantStyles = {
  light: {
    button: {
      backgroundColor: "#6ac46a",
    },
    text: {
      color: "#173e19",
    },
  },
  dark: {
    button: {
      backgroundColor: "#173e19",
    },
    text: {
      color: "#FFFFFF",
    },
  },
  outline: {
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

const CustomButton = ({
  title,
  variant = "dark",
  textSize = 14,
  onPress,
  disabled = false,
  fullHeight = false,
}) => {
  const selectedVariant = variantStyles[variant] || variantStyles.dark;

  const height = fullHeight ? { height: "100%" } : { height: undefined };
  return (
    <TouchableOpacity
      style={[styles.baseButton, selectedVariant.button, height]}
      onPress={onPress}
      disabled={disabled}
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

export default CustomButton;
