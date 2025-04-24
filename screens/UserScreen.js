import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserRound, Mail, Star } from "lucide-react-native";

import CustomButton from "../components/ui-kit/CustomButton";
import { removeUser } from "../reducers/user";
import { clearGuestData } from "../reducers/guest";

export default function UserScreen({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);

  const name = user.username;
  const email = user.email;
  const level = user.level.currentLevel.level;
  const levelIcon = user.level.currentLevel.icon;

  console.log(user);

  const handleLogout = () => {
    dispatch(clearGuestData()); // Réinitialise le reducer Guest pour éviter des ajouts non souhaités par la suite
    dispatch(removeUser()); // Réinitialise les informations de l'utilisateur
    navigation.navigate("Home"); // Redirige vers l'écran de connexion
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Mes informations</Text>

      <View style={styles.header}>
        <View style={styles.circleUser}>
          <UserRound size={40} color={"#173e19"} />
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.userContainer}>
        <View style={styles.infoSection}>
          <View style={styles.infoContainer}>
            <Mail size={15} color={"#173e19"} />
            <Text>
              <Text style={styles.infoTitle}> Email : </Text>{" "}
              <Text style={styles.info}> {email}</Text>
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Star size={15} color={"#173e19"} />
            <Text>
              <Text style={styles.infoTitle}> Niveau : </Text>
              <Text style={styles.info}>{`${level} ${levelIcon}`}</Text>
            </Text>
          </View>
        </View>
      </View>

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
    gap: 10,
  },
  title: {
    maxWidth: "100%",
    fontSize: 23,
    fontWeight: "bold",
    margin: 20,
    textAlign: "center",
  },
  circleUser: {
    borderColor: "#6AC46A",
    borderWidth: 2,
    borderRadius: 50,
    aspectRatio: 1,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    padding: 20,
  },
  header: {
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "90%",
  },
  customContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  userContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoSection: {
    gap: 5,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  info: {
    fontSize: 14,
  },

  logoutContainer: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
    width: "90%",
  },
});
