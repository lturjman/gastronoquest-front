import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  ArrowLeft,
  Heart,
  Leaf,
  MapPin,
  UtensilsCrossed,
  Store,
  Euro,
} from "lucide-react-native";
import { useState } from "react";

const { width } = Dimensions.get("window");

export default function RestaurantScreen({ navigation }) {
  // State pour le bouton like
  const [liked, setLiked] = useState(false);
  // State pour l'onglet sélectionné
  // Soit challenges, soit description
  const [selectedTab, setSelectedTab] = useState("description");
  // Récupération des données du restaurant
  const route = useRoute();

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
  } = route.params.restaurant;

  // Conversion du score Ecotable en feuilles
  const leaves = [];
  for (let i = 0; i < score; i++) {
    leaves.push(<Leaf key={i} color="#173e19" size={20} />);
  }

  return (
    <View style={styles.container}>
      {/*Partie haute de la page  avec la présentation du restaurant sans les onglets*/}
      <View style={styles.presentationContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft color={"black"} size={23} />
            </TouchableOpacity>
            <Text style={{ fontSize: 23, fontWeight: 500 }}>{name}</Text>
          </View>
          <TouchableOpacity
            onPress={() => setLiked(!liked)}
            style={liked ? styles.liked : styles.notLiked}
          >
            <Heart color={liked ? "red" : "black"} size={25} />
          </TouchableOpacity>
        </View>
        {/*Image du restaurant*/}
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        {/* Bloc qui contient les métadonnées (prix, types, addresse, etc.) */}
        <View style={styles.metadataContainer}>
          <View style={styles.score}>
            {leaves}
            <Text style={styles.scoreLabel}>Label Ecotable</Text>
          </View>
          <View style={styles.itemPresentationContainer}>
            <MapPin size={20} color={"black"} />
            <Text>{address}</Text>
          </View>
          <View style={styles.itemPresentationContainer}>
            <UtensilsCrossed size={20} color={"black"} />
            <View style={styles.tagContainer}>
              {badges.map((badge, i) => (
                <View key={i} style={[styles.tag, styles.badge]}>
                  <Text style={styles.tagText}>{badge}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.itemPresentationContainer}>
            <Store size={20} color={"black"} />
            <View style={styles.tagContainer}>
              {types.map((badge, i) => (
                <View key={i} style={[styles.tag, styles.type]}>
                  <Text style={styles.tagText}>{badge}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.itemPresentationContainer}>
            <Euro size={20} color={"black"} />
            <Text>{priceRange}</Text>
          </View>
        </View>
      </View>
      {/* Barre avec les onglets */}
      <View>
        <TouchableOpacity>
          <Text></Text>
        </TouchableOpacity>
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
    paddingTop: 20,
  },
  presentationContainer: {
    width: "90%",
    gap: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  image: {
    width: width * 0.9,
    height: 200,
    borderRadius: 10,
  },
  metadataContainer: {
    gap: 9,
  },
  score: {
    flexDirection: "row",
  },
  scoreLabel: {
    marginLeft: 10,
  },
  itemPresentationContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
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
  },
});
