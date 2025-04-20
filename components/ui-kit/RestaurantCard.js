import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Leaf, Heart } from "lucide-react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addFavorite, removeFavorite } from "../../reducers/user";

export default function RestaurantCard({ restaurant }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.user.value.favorites);
  const token = useSelector((state) => state.user.value.token);
  const isFavorite = favorites.includes(restaurant._id);

  const leaves = [];
  for (let i = 0; i < restaurant.score; i++) {
    leaves.push(<Leaf key={i} color="#173e19" size={20} />);
  }

  const handleFavorite = async () => {
    
    if (!token) {
      navigation.navigate('EnterScreen');
      return;
    }

    if (isFavorite) {
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
    } else {
      try {
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
        if (data.result) {
          dispatch(addFavorite(restaurant));
        } else {
          throw new Error("Failed to add favorite");
        }
      } catch (error) {
        console.error("Error adding favorite:", error);
      }
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.content}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.nameContainer} onPress={() => navigation.navigate("RestaurantScreen", { restaurant })}>
          <Text style={styles.name}>{restaurant.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favorite} onPress={() => handleFavorite()}>
          <Heart color={isFavorite ? "#e53935" : "#173e19"} size={25} style={{ marginTop: 5 }} />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        {/* Score */}
        <View style={styles.score}>{ leaves }</View>
        <Text> • </Text>
        {/* Gamme de prix */}
        <Text style={styles.text}>{restaurant.priceRange}</Text>
      </View>

      {/* Adresse */}
      <View style={styles.tagContainer}>
        <Text style={styles.text}>{restaurant.address}</Text>
      </View>

      <View style={styles.tagContainer}>
        {/* Badges */}
        { restaurant.badges.map((badge, i) => (
          <View key={i} style={[styles.tag, styles.badge]}>
            <Text style={styles.tagText}>{badge}</Text>
          </View>
        ))}
        {/* Types */}
        { restaurant.types.map((type, i) => (
          <View key={i} style={[styles.tag, styles.type]}>
            <Text style={styles.tagText}>{type}</Text>
          </View>
        ))}
      </View>

      </View>
    </View>
  );
};

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
    fontFamily: Platform.select({
      ios: "Helvetica Neue",
      android: "Roboto",
      default: "System",
    }),
  },
  content: {
    gap: 8,
  },
  header: {
    maxWidth: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "start",
    gap: 15,
  },
  nameContainer: {
    flexShrink: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -5
  },
  score: {
    flexDirection: "row",
  },
  text: {
    fontSize: 13,
    color: "#333",
  },
  tagContainer: {
    flexDirection: "row",
    gap: 5,
    flexWrap: 'wrap'
  },
  tag: {
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 3,
  },
  badge: {
    backgroundColor: "#1C3B1D",
  },
  type: {
    backgroundColor: "#6ac46a",
  },
  tagText: {
    fontSize: 10,
    color: "#fff",
  },
  price: {
    backgroundColor: "#eee", //gris
  }
});