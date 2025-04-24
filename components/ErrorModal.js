import React from "react";
import { View, Text, StyleSheet, Modal } from "react-native";

import CustomButton from "./ui-kit/CustomButton";

const ErrorModal = ({ errorMessage, onPress, visible = true }) => {
  const errorLines = errorMessage.split("\n");

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            {errorLines.map((line, index) => (
              <Text key={index} style={styles.errorText}>
                • {line}
              </Text>
            ))}

            <View style={styles.buttonSpacing} />
            <CustomButton title="Compris" onPress={onPress} variant="light" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    margin: 20,
    gap: 30,
  },
  content: {
    justifyContent: "center",
    alignItems: "stretch",
  },
  errorText: {
    fontWeight: 700,
    fontSize: 15,
    paddingVertical: 3,
  },
  buttonSpacing: {
    height: 20,
  },
});
export default ErrorModal;
