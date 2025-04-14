import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Platform } from "react-native";

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

const CustomButton = ({ title, variant = "dark", onPress }) => {
  const selectedVariant = variantStyles[variant] || variantStyles.dark;

  return (
    <TouchableOpacity
      style={[styles.baseButton, selectedVariant.button]}
      onPress={onPress}
    >
      <Text style={[styles.baseText, selectedVariant.text]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    elevation: 3,
  },
  baseText: {
    fontFamily: Platform.select({
      ios: "Helvetica Neue",
      android: "Roboto",
      default: "System",
    }),
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default CustomButton;
