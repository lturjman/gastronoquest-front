import { StyleSheet, Text, View, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ArrowLeft, Heart } from "lucide-react-native";
import { useState } from "react";

export default function RestaurantScreen() {
  const [liked, setLiked] = useState(false);
  // Récupération des données du restaurant
  const route = useRoute();

  /*
  {
    name: str, XX
    desc: str,
    longDesc: str, XX
    score: number, XX
    badges: [str], XX
    types: [str] XX
    priceRange: str, XX
    address: str, XX
    coordinates: {latitude: number, longitude: number},
    imageUrl: str, XX
    websiteUrl: str, XX
    bookingUrl: str,
  }
  */

  const {
    name,
    longDesc,
    score,
    badges,
    types,
    priceRange,
    address,
    imageUrl,
    websiteUrl,
  } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.presentationContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <ArrowLeft color={"black"} size={18} />
            <Text>{name}</Text>
          </View>
          <TouchableOpacity
            onPress={() => setLiked(!liked)}
            style={liked ? styles.liked : styles.notLiked}
          >
            <Heart color={liked ? "#red" : "#fff"} size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  presentationContainer: {
    width: "90%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    gap: 10,
  },
});
