import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../components/ui-kit/CustomButton";
import RestaurantCard from "../components/ui-kit/RestaurantCard";

import { useSelector } from "react-redux";

import { ArrowLeft } from "lucide-react-native";

export default function FavoritesScreen({ navigation }) {
  const favorites = useSelector((state) => state.user.value.favorites);
  const hasFavorites = favorites && favorites.length > 0;

  return (
    <View>
      <View style={styles.headerLeft}>
        <TouchableOpacity
          onPress={() => navigation.navigate("User", { screen: "UserScreen" })}
        >
          <ArrowLeft color={"black"} size={23} />
        </TouchableOpacity>
        <Text style={styles.title}> Mes Favoris</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.messageContainer}>
          {!hasFavorites ? (
            <Text style={styles.message}>
              Aucun restaurant n'a encore été ajouté aux favoris
            </Text>
          ) : (
            favorites.map((restaurant) => (
              <View key={restaurant._id} style={styles.card}>
                <RestaurantCard restaurant={restaurant} />
              </View>
            ))
          )}
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Rechercher des restaurants"
              onPress={() =>
                navigation.navigate("Search", { screen: "SearchScreen" })
              }
              textSize={13}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 80,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    maxWidth: "100%",
    fontSize: 30,
    fontWeight: "bold",
    margin: 10,
    textAlign: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  messageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    margin: 20,
    fontSize: 16,
    color: "grey",
    alignItems: "center",
    flex: 1,
  },
  card: {
    width: "90%",
    marginBottom: 20,
  },
});
