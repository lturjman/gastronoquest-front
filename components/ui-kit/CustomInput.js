import React, { useState } from "react";
import { TextInput, StyleSheet, View, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  type = "text",
  password = false,
}) => {
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
        inputMode={type}
        secureTextEntry={password}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)} // se défocus lorsqu'on clique ailleurs
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: width * 0.8, // 80% de la largeur de l'écran
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginVertical: 10,
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

export default CustomInput;
