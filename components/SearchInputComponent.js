import { TextInput, StyleSheet, View, Dimensions } from "react-native";
import { useState } from "react";

export default function SearchInput({ placeholder, value, onChangeText}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.inputContainer,
        isFocused ? styles.inputContainerFocused : styles.inputContainerDefault,
      ]}
    >
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        inputMode="text"
        secureTextEntry={false}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: Dimensions.get("window").width * 0.9,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginTop: 20,
    marginBottom: 10,
    alignItems: "left",
  },
  inputContainerDefault: {
    borderColor: "#E0E0E0", // gris
  },
  inputContainerFocused: {
    borderColor: "#6ac46a", // vert
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
});