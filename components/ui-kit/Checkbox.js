
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Check } from "lucide-react-native";

export default function CheckBox({ options, checkedValues, onChange }) {
  let updatedCheckedValues = [... checkedValues];

  const handlePress = (checked, option) => {
    if (checked) {
      updatedCheckedValues = updatedCheckedValues.filter(checkedValue => checkedValue !== option);
      return onChange(updatedCheckedValues);
    }
    updatedCheckedValues.push(option);
    onChange(updatedCheckedValues);
  }

  return (
    <View style={styles.checkboxContainer}>
      { options.map((option, i) => {
        const checked = updatedCheckedValues.includes(option);
        return (
        <Pressable key={i} style={styles.container} onPress={() => handlePress(checked, option)}>
            <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
            { checked && (
              <View style={styles.innerBox}>
                <Check color="#fff" size={20} />
              </View>
            )}
            </View>
            <Text style={[styles.label, checked && styles.labelChecked]}>
              {option}
            </Text>
        </Pressable>
        )
      } )}
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    alignItems: "flex-start",
    paddingHorizontal: 8
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
    fontSize: 14,
    color: "#333", // dark grey
  },
  labelChecked: {
    fontWeight: "bold",
    color: "#173e19", // dark green
  },
});
