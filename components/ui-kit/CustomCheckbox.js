import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Check } from "lucide-react-native";

const CustomCheckbox = ({ label, checked, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && (
          <View style={styles.innerBox}>
            <Check color="#blue" size={20} />
          </View>
        )}
      </View>
      <Text style={[styles.label, checked && styles.labelChecked]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#9CA3AF", // gray-400
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: "#D1FAE5", // green-100
    borderColor: "#047857", // green-700
  },
  innerBox: {
    backgroundColor: "#047857", // green-700
    borderRadius: 4,
    padding: 2,
  },
  label: {
    fontSize: 16,
    color: "#1F2937", // gray-800
  },
  labelChecked: {
    fontWeight: "bold",
    color: "#065F46", // green-800
  },
});

export default CustomCheckbox;
