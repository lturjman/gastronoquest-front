import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function RadioButton({ options, checkedValue, onChange }) {
  return (
    <View style={styles.radioContainer}>
    { options.map((option, i) => {
        const selected = checkedValue === option;
        return (
            <TouchableOpacity key={i} onPress={() => onChange(option)}
              style={[styles.container, selected && styles.selectedContainer]}>
              <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
                {selected && <View style={styles.radioInner} />}
              </View>
              <Text style={[styles.label, selected && styles.labelSelected]}>
                {option}
              </Text>
          </TouchableOpacity>
        )
    })}
    </View>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row'
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#888",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioOuterSelected: {
    borderColor: "#6ac46a", // Light Green
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#6ac46a", // Light Green
  },
  label: {
    fontSize: 14,
    color: "#333", // Dark Grey
  },
  labelSelected: {
    fontWeight: "bold",
    color: "#173e19", // Vert foncé
  },
});