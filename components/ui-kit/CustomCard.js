import { useSelector, useDispatch } from "react-redux";
import { removeFavorite, addFavorite } from "../../reducers/user.js";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";

import { Leaf, Heart } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

export default function CustomCard({ restaurant }) {
  const favorites = useSelector((state) => state.user.favorites);
  const token = useSelector((state) => state.user.value.token);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isFavorite, setIsFavorite] = useState(
    favorites.some((fav) => fav._id === restaurant._id)
  );

  const leaves = [];
  for (let i = 0; i < restaurant.score; i++) {
    leaves.push(<Leaf key={i} color="#173e19" size={20} />);
  }

  const handleRemoveFromFavorites = async (restaurant) => {
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
    console.log("restaurant", restaurant);

    if (data.result) {
      console.log(restaurant);

      dispatch(removeFavorite(restaurant));
      setIsFavorite(false);
    }
  };

  const handleAddFromFavorites = async (restaurant) => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/favorites`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: token },
        body: JSON.stringify({
          restaurantId: restaurant._id,
        }),
      }
    );

    const data = await response.json();
    console.log("data", data);

    if (data.result) {
      dispatch(addFavorite(restaurant));
      setIsFavorite(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RestaurantScreen", { restaurant })
            }
          >
            <Text style={styles.title}>{restaurant.name}</Text>
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={isFavorite ? styles.liked : styles.notLiked}
              onPress={() => {
                if (isFavorite) {
                  handleRemoveFromFavorites(restaurant);
                } else {
                  handleAddFromFavorites(restaurant);
                }
              }}
            >
              <Heart color={"#fff"} size={25} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.notenpricecontainer}>
          {/* Note (score de 1 à 3) */}
          <View style={styles.noteContainer}>{leaves}</View>
          {/* Gamme de prix */}
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>{restaurant.priceRange}</Text>
          </View>
        </View>

        {/* Adresse */}
        <Text style={styles.address}>{restaurant.address}</Text>

        {/* Badges */}
        <View style={styles.tagContainer}>
          {restaurant.badges.map((badge, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{badge}</Text>
            </View>
          ))}
        </View>

        {/* Types */}
        <View style={styles.tagContainer}>
          {restaurant.types.map((type, index) => (
            <View key={index} style={styles.type}>
              <Text style={styles.typeText}>{type}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    margin: 20,
    gap: 8,
    fontFamily: Platform.select({
      ios: "Helvetica Neue",
      android: "Roboto",
      default: "System",
    }),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  noteContainer: {
    flexDirection: "row",
  },
  notenpricecontainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 30,
  },
  address: {
    fontSize: 15,
    color: "#333",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#1C3B1D",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    height: 30,
  },
  tagText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  type: {
    backgroundColor: "#6ac46a",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    height: 30,
  },
  typeText: {
    color: "#fff",
    fontWeight: "600",
  },

  priceText: {
    fontSize: 14,
    color: "#173e19",
    fontWeight: "600",
  },
  liked: {
    backgroundColor: "#e5685c",
    borderRadius: 50,
    padding: 8,
  },
  notLiked: {
    backgroundColor: "#C4C4C4",
    borderRadius: 50,
    padding: 8,
  },
});
