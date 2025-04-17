import { StyleSheet, Text, View, ScrollView } from "react-native";
import CustomButton from "../components/ui-kit/CustomButton";
import CustomCard from "../components/ui-kit/CustomCard";
import user from "../reducers/user";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function FavoritesScreen({ navigation }) {
  const favorites = useSelector((state) => state.user.value.favorites);

  const hasFavorites = favorites && favorites.length > 0;

  return (
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
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
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
  // card.Heart: {
  //   color: "#e53935"
  // }
});
