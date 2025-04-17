import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/ui-kit/CustomButton";

export default function UserScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <CustomButton
          title={"Mes favoris"}
          onPress={() =>
            navigation.navigate("User", { screen: "FavoritesScreen" })
          }
        />
        <CustomButton
          title={"Mon Historique"}
          onPress={() =>
            navigation.navigate("User", { screen: "HistoryScreen" })
          }
        />
      </View>
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
