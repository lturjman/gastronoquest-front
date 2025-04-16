import React from "react";

import { View, Text, StyleSheet, Platform } from "react-native";

import CustomButton from "./ui-kit/CustomButton";

const ErrorModal = ({ errorMessage, onPress }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalCard}>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <CustomButton title="Compris" onPress={onPress} textSize={13} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    margin: 20,
    gap: 30,
    fontFamily: Platform.select({
      ios: "Helvetica Neue",
      android: "Roboto",
      default: "System",
    }),
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  errorMessage: {
    fontWeight: 700,
    fontSize: 15,
  },
});

export default ErrorModal;
