import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import CustomButton from "../components/ui-kit/CustomButton";
import { useDispatch } from "react-redux";
import { removeUser } from "../reducers/user";

export default function UserScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser()); // Réinitialise les informations de l'utilisateur
    navigation.navigate("User", { screen: "HomeScreen" }); // Redirige vers l'écran de connexion
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Mes informations</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.customContainer}>
          <CustomButton
            title={"❤️  Mes favoris"}
            onPress={() =>
              navigation.navigate("User", { screen: "FavoritesScreen" })
            }
          />
          <CustomButton
            title={"✅  Mon historique"}
            onPress={() =>
              navigation.navigate("User", { screen: "HistoryScreen" })
            }
          />
        </View>
      </View>
      <View style={styles.logoutContainer}>
        <CustomButton
          title={"⬅️  Se déconnecter"}
          onPress={handleLogout}
          variant="outline"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
  },
  title: {
    maxWidth: "100%",
    fontSize: 30,
    fontWeight: "bold",
    margin: 20,
    textAlign: "center",
  },
  buttonContainer: {
    width: "90%",
  },
  customContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  logoutContainer: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
    width: "90%",
  },
});
