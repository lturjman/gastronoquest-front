import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Check } from "lucide-react-native";

// Composant pour lister les quêtes à réaliser sur la page d'un restaurant
export default function CheckBox({ options, checkedValues, onChange }) {
  // Récupération des quêtes cochées dans le composant parent
  let updatedCheckedValues = [...checkedValues];

  // Lorsqu'on appuie sur une checkbox
  const handlePress = (checked, option) => {
    // Si c'était coché, on retire de la liste
    if (checked) {
      updatedCheckedValues = updatedCheckedValues.filter(
        (checkedValue) => checkedValue._id !== option._id
      );
      // On retourne la liste actualisée
      return onChange(updatedCheckedValues);
    }
    // Si pas coché, on ajoute à la liste et on retourne la liste actualisée au parent
    updatedCheckedValues.push(option);
    onChange(updatedCheckedValues);
  };

  return (
    <View style={styles.checkboxContainer}>
      {options.map((option) => {
        const checked = updatedCheckedValues.includes(option);
        return (
          <Pressable
            key={option._id}
            style={styles.container}
            onPress={() => handlePress(checked, option)}
          >
            <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
              {checked && (
                <View style={styles.innerBox}>
                  <Check color="#fff" size={20} />
                </View>
              )}
            </View>
            <Text style={[styles.label, checked && styles.labelChecked]}>
              {option.title}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    alignItems: "flex-start",
    width: "100%",
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    width: "100%",
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
    flexShrink: 1, // Important pour que le texte puisse être réduit
    flex: 1, // Prendre l'espace restant
  },
  labelChecked: {
    fontWeight: "bold",
    color: "#173e19", // dark green
  },
});
