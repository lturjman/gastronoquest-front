import { StyleSheet, Text, View } from "react-native";

export default function RestaurantScreen() {
  return (
    <View style={styles.container}>
      <Text>RestaurantScreen</Text>
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
