import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Leaf, Heart } from "lucide-react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { handleFavorite } from "../../services/handleFavorite";

export default function RestaurantCard({ restaurant }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const isFavorite = user.favorites.some(
    (favorite) => favorite._id === restaurant._id
  );

  const leaves = [];
  for (let i = 0; i < restaurant.score; i++) {
    leaves.push(<Leaf key={i} color="#173e19" size={20} />);
  }

  return (
    <View style={styles.card}>
      <View style={{ gap: 8 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={{ flexShrink: 1 }}
            onPress={() =>
              navigation.navigate("Search", {
                screen: "RestaurantScreen",
                params: { restaurant },
              })
            }
          >
            <Text style={styles.name}>{restaurant.name}</Text>
          </TouchableOpacity>
          <Pressable
            style={{
              height: 37,
              marginTop: -5,
              borderRadius: 50,
              padding: 7,
              backgroundColor: isFavorite ? "#e5685c" : "#C4C4C4",
            }}
            onPress={() =>
              handleFavorite(
                dispatch,
                navigation,
                user.token,
                restaurant,
                restaurant._id,
                isFavorite
              )
            }
          >
            <Heart color="#FFFFFF" size={23} />
          </Pressable>
        </View>

        {/* Score et gamme de prix */}
        <View style={styles.row}>
          <View style={{ flexDirection: "row" }}>{leaves}</View>
          <Text style={styles.priceText}> • {restaurant.priceRange}</Text>
        </View>

        {/* Adresse */}
        <View style={styles.tagContainer}>
          <Text style={{ fontSize: 14, color: "#333" }}>
            {restaurant.address}
          </Text>
        </View>

        <View style={styles.tagContainer}>
          {/* Badges */}
          {restaurant.badges.map((badge, i) => (
            <View key={i} style={{ ...styles.tag, backgroundColor: "#1C3B1D" }}>
              <Text style={{ fontSize: 12, color: "#FFFFFF" }}>{badge}</Text>
            </View>
          ))}
          {/* Types */}
          {restaurant.types.map((type, i) => (
            <View key={i} style={{ ...styles.tag, backgroundColor: "#6ac46a" }}>
              <Text style={{ fontSize: 12, color: "#1C3B1D" }}>{type}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    padding: 20,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "start",
    gap: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -5,
  },
  tagContainer: {
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
  },
  tag: {
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 3,
  },
  priceText: {
    fontSize: 14,
    color: "#173e19",
    fontWeight: "600",
  },
});
