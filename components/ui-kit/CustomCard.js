import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Leaf, Heart } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

export default function CustomCard({ restaurant, onPress }) {
  const navigation = useNavigation();

  const leaves = [];
  for (let i = 0; i < restaurant.score; i++) {
    leaves.push(<Leaf key={i} color="#173e19" size={20} />);
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RestaurantScreen", { restaurant })
            }
          >
            <Text style={styles.name}>{restaurant.name}</Text>
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.liked}
              onPress={() => onPress(restaurant)}
            >
              <Heart color={"#fff"} size={25} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.notenpricecontainer}>
          {/* Note (score de 1 à 3) */}
          <View style={styles.noteContainer}>{leaves}</View>
          <Text> • </Text>
          {/* Gamme de prix */}
          <View style={styles.priceTag}>
            <Text style={{ ...styles.tagText, color: "#173e19" }}>{restaurant.priceRange}</Text>
          </View>
        </View>

        {/* Adresse */}
        <Text style={styles.address}>{restaurant.address}</Text>

        {/* Badges */}
        <View style={styles.tagContainer}>
          {restaurant.badges.map((badge, index) => (
            <View key={index} style={{ ...styles.tag, backgroundColor: "#1C3B1D" }}>
              <Text style={{ ...styles.tagText, color: "#fff" }}>{badge}</Text>
            </View>
          ))}
        </View>

        {/* Types */}
        <View style={styles.tagContainer}>
          {restaurant.types.map((type, index) => (
            <View key={index} style={{ ...styles.tag, backgroundColor: "#6ac46a" }}>
              <Text style={{ ...styles.tagText, color: "#1C3B1D" }}>{type}</Text>
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
    gap: 15,
  },
  name: {
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
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 14,
    fontWeight: "600",
  },
  liked: {
    backgroundColor: "#e5685c",
    borderRadius: 50,
    padding: 8,
  },
});
