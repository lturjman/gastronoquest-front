import { StyleSheet, Text, View } from "react-native";

export default function EnterScreen() {
  return (
    <View style={styles.container}>
      <Text>EnterScreen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
