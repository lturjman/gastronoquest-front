import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Linking,
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
import { useEffect, useState } from "react";
import CustomButton from "../components/ui-kit/CustomButton";
import ChallengesChexBox from "../components/ChallengesCheckbox";
import { useSelector, useDispatch } from "react-redux";
import { addSavedCo2 } from "../reducers/user";

// Fonction pour récupérer les défis
const fetchGetChallenges = async () => {
  try {
    // Récupération des défis
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/challenges`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const fetchPostHistory = async (token, restaurantId, achievedChallenges) => {
  try {
    // Transformation de la liste de challenges pour ne garder que les id
    const achievedChallengesId = achievedChallenges.map(
      (achievedChallenge) => achievedChallenge._id
    );

    // Envoi des défis
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/history`,
      {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurant: restaurantId,
          achievedChallenges: achievedChallengesId,
        }),
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

// On prend les dimensions de l'écran pour l'affichage de l'image
const { width } = Dimensions.get("window");

export default function RestaurantScreen({ navigation }) {
  // State pour le bouton like
  const [liked, setLiked] = useState(false);
  // State pour l'onglet sélectionné
  // Soit challenges, soit description
  const [selectedTab, setSelectedTab] = useState("description");
  // States de challenges
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenges, setSelectedChallenges] = useState([]);
  // Récupération des données utilisateur
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  // Récupération des données du restaurant
  const route = useRoute();

  const {
    _id,
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

  // Initialisation des défis
  useEffect(() => {
    // On récupère la liste des challenges via la fonction dédiée et on l'insère dans le state
    fetchGetChallenges().then((data) => {
      data.result && setChallenges(data.challenges);
    });
  }, []);

  // Conversion du score Ecotable en feuilles
  const leaves = [];
  for (let i = 0; i < score; i++) {
    leaves.push(<Leaf key={i} color="#173e19" size={20} />);
  }

  // Contenu à afficher dans l'onglet description
  const restaurantDescContainer = (
    <View style={styles.tabContentContainer}>
      <Text style={{ marginBottom: 10 }}>{longDesc}</Text>
      <View style={{ width: "100%" }}>
        <CustomButton
          title={"Site web du restaurant"}
          textSize={15}
          onPress={() => Linking.openURL(websiteUrl)}
        />
      </View>
    </View>
  );

  // Contenu à afficher dans l'onglet défis
  const challengesList = (
    <View style={styles.tabContentContainer}>
      <View style={{ width: "100%" }}>
        {/* La liste des challenges à relever sous forme de chexbox */}
        <ChallengesChexBox
          options={challenges}
          checkedValues={selectedChallenges}
          onChange={(updatedValues) => setSelectedChallenges(updatedValues)}
        />
      </View>
      {/* Le bouton de validation, qui redirige vers enter screen si le user n'est pas connecté */}
      <CustomButton
        title={"Valider mes défis"}
        textSize={15}
        disabled={selectedChallenges.length ? false : true}
        onPress={() => {
          if (user.token) {
            // Envoi des défis relevés via la fonction dédiée
            fetchPostHistory(user.token, _id, selectedChallenges).then(
              (data) => {
                if (data.result) {
                  // Si le fetch est réussi, on ajoute le CO2 économisé dans le store
                  // et redirection vers la home
                  dispatch(addSavedCo2(data.totalSavedCo2));
                  navigation.navigate("Home");
                }
              }
            );
          } else {
            navigation.navigate("Enter");
          }
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
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
      {/*Partie haute de la page  avec la présentation du restaurant sans les onglets*/}
      <ScrollView
        style={{ flex: 1, width: "90%", marginTop: 20 }}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <View style={styles.presentationContainer}>
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
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setSelectedTab("description")}
            style={
              selectedTab === "description" && styles.tabTitleContainerSelected
            }
          >
            <Text
              style={
                selectedTab === "description"
                  ? styles.tabLabelSelected
                  : styles.tabLabelNotSelected
              }
            >
              Description
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedTab("challenges")}
            style={
              selectedTab === "challenges" && styles.tabTitleContainerSelected
            }
          >
            <Text
              style={
                selectedTab === "challenges"
                  ? styles.tabLabelSelected
                  : styles.tabLabelNotSelected
              }
            >
              Défis
            </Text>
          </TouchableOpacity>
        </View>
        {selectedTab === "description"
          ? restaurantDescContainer
          : challengesList}
      </ScrollView>
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
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  headerLeft: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  image: {
    width: width * 0.9,
    height: 170,
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
    fontSize: 13,
    color: "#fff",
  },
  price: {
    backgroundColor: "#eee", //gris
  },
  tabContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  tabLabelSelected: {
    color: "#173e19",
    fontWeight: "bold",
    fontSize: 17,
  },
  tabLabelNotSelected: {
    fontSize: 17,
  },
  tabTitleContainerSelected: {
    borderBottomColor: "#173e19",
    borderBottomWidth: 3,
    paddingBottom: 5,
  },
  tabContentContainer: {
    marginTop: 15,
    alignItems: "center",
    gap: 10,
  },
});
