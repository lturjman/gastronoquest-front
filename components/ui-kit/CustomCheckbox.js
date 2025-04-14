import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Check } from "lucide-react-native";

const CustomCheckbox = ({ label, checked, onPress }) => {
  return (
    <View style={styles.checkboxContainer}>
      <Pressable style={styles.container} onPress={onPress}>
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
          {checked && (
            <View style={styles.innerBox}>
              <Check color="#fff" size={20} />
            </View>
          )}
        </View>
        <Text style={[styles.label, checked && styles.labelChecked]}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    alignItems: "flex-start",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#E0E0E0", // light grey
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: "#6ac46a", // light green
    borderWidth: 0,
  },
  innerBox: {
    borderRadius: 3,
    padding: 2,
  },
  label: {
    fontSize: 16,
    color: "#333", // dark grey
  },
  labelChecked: {
    fontWeight: "bold",
    color: "#173e19", // dark green
  },
});

export default CustomCheckbox;
