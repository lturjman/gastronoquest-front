import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../components/ui-kit/CustomButton";
import CustomCard from "../components/ui-kit/CustomCard";
import user from "../reducers/user";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { removeFavorite } from "../reducers/user";
import { ArrowLeft } from "lucide-react-native";

export default function FavoritesScreen({ navigation }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.user.value.favorites);
  const token = useSelector((state) => state.user.value.token);

  const hasFavorites = favorites && favorites.length > 0;

  const handleRemoveFromFavorites = async (restaurant) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/favorites`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json", authorization: token },
          body: JSON.stringify({
            restaurantId: restaurant._id,
          }),
        }
      );
      const data = await response.json();
      if (data.result) {
        dispatch(removeFavorite(restaurant));
      } else {
        throw new Error("Failed to remove favorite");
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

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
            favorites.map((restaurant, index) => (
              <View key={index} style={styles.card}>
                <CustomCard
                  restaurant={restaurant}
                  navigation={navigation}
                  favorites={favorites}
                  onPress={handleRemoveFromFavorites}
                />
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
});
