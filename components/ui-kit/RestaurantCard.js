import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Leaf, Heart } from "lucide-react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function RestaurantCard({ restaurant }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.value.token);
  const favorites = useSelector((state) => state.user.value.favorites);

  const [liked, setLiked] = useState(favorites.includes(restaurant._id));


  const leaves = [];
  for (let i = 0; i < restaurant.score; i++) {
    leaves.push(<Leaf key={i} color="#173e19" size={20} />);
  }

  return (
    <View style={styles.card}>
      <View style={styles.content}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.nameContainer} onPress={() => navigation.navigate("RestaurantScreen", { restaurant })}>
          <Text style={styles.name}>{restaurant.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favorite} onPress={() => setLiked(!liked)}>
          <Heart color={liked ? "#e53935" : "#173e19"} size={25} style={{ marginTop: 5 }} />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        {/* Score */}
        <View style={styles.score}>{ leaves }</View>
        <Text> - </Text>           {/* #todo enjoliver */}
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
        { restaurant.types.map((badge, i) => (
          <View key={i} style={[styles.tag, styles.type]}>
            <Text style={styles.tagText}>{badge}</Text>
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



/*
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Leaf, Heart } from "lucide-react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function RestaurantCard({ restaurant }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.value.token);
  const favorites = useSelector((state) => state.user.value.favorites);

  const [liked, setLiked] = useState(favorites.includes(restaurant._id));


  const leaves = [];
  for (let i = 0; i < restaurant.score; i++) {
    leaves.push(<Leaf key={i} color="#173e19" size={20} />);
  }

  return (
    <View style={styles.card}>
      <View style={styles.content}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.nameContainer} onPress={() => navigation.navigate("RestaurantScreen", { restaurant })}>
          <Text style={styles.name}>{restaurant.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favorite} onPress={() => setLiked(!liked)}>
          <Heart color={liked ? "#e53935" : "#173e19"} size={25} style={{ marginTop: 5 }} />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.score}>
          { leaves }
        </View>
        <Text> - </Text>           
        <Text style={styles.address}>{restaurant.priceRange}</Text>
      </View>

      <View style={styles.tagContainer}>
          <View style={[styles.tag, styles.price]}>
            <Text style={styles.priceText}>{restaurant.address}</Text>
          </View>
      </View>

      <View style={styles.tagContainer}>
        { restaurant.badges.map((badge, i) => (
          <View key={i} style={[styles.tag, styles.badge]}>
            <Text style={styles.tagText}>{badge}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tagContainer}>
      { restaurant.types.map((badge, i) => (
          <View key={i} style={[styles.tag, styles.type]}>
            <Text style={styles.tagText}>{badge}</Text>
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
    fontSize: 18,
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
  address: {
    fontSize: 15,
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
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  price: {
    backgroundColor: "#eee", //gris
  },
  priceText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
});
*/