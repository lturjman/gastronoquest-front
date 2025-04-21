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
import ChallengesCheckBox from "../components/ChallengesCheckbox";
import { useSelector, useDispatch } from "react-redux";
import { addSavedCo2, addFavorite, removeFavorite } from "../reducers/user";
import { fetchPostFavorites } from "../services/fetchPostFavorites";
import { fetchDeleteFavorites } from "../services/fetchDeleteFavorites";
import { fetchGetChallenges } from "../services/fetchGetChallenges";
import { fetchPostHistory } from "../services/fetchPostHistory";

export default function RestaurantScreen({ navigation }) {
  const dispatch = useDispatch();

  // Récupération des données du restaurant
  const route = useRoute();
  const restaurant = route.params.restaurant;
  const {
    _id,
    name,
    desc,
    longDesc,
    score,
    badges,
    types,
    priceRange,
    address,
    imageUrl,
    websiteUrl,
    bookingUrl,
  } = route.params.restaurant;

  // State pour l'onglet sélectionné (soit challenges, soit description)
  const [selectedTab, setSelectedTab] = useState("description");
  // States de challenges
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenges, setSelectedChallenges] = useState([]);
  // Récupération des données utilisateur
  const user = useSelector((state) => state.user.value);

  const isFavorite = user.favorites.some((favorite) => favorite._id === _id);

  const handleFavorite = async () => {
    if (!user.token) return navigation.navigate("Enter");

    if (isFavorite) {
      try {
        const data = await fetchDeleteFavorites(user.token, restaurant._id);
        if (data.result) {
          dispatch(removeFavorite(restaurant));
        } else {
          throw new Error("Failed to delete favorite");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const data = await fetchPostFavorites(user.token, restaurant._id);
        if (data.result) {
          dispatch(addFavorite(restaurant));
        } else {
          throw new Error("Failed to save favorite");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChallenges = async () => {
    if (!user.token) return navigation.navigate("Enter");

    try {
      // Envoi des défis relevés via la fonction dédiée
      const data = await fetchPostHistory(user.token, _id, selectedChallenges);
      if (data.result) {
        // Si le fetch est réussi, on ajoute le CO2 économisé dans le store et redirection vers la home
        dispatch(addSavedCo2(data.totalSavedCo2));
        setSelectedChallenges([]);
        navigation.navigate("Home");
      } else {
        throw new Error("Failed to save new quest");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      <Text style={{ width: "100%", fontStyle: "italic" }}>{desc}</Text>
      <Text style={{ marginBottom: 10 }}>{longDesc}</Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <View style={{ flexShrink: 1, minWidth: "45%", maxWidth: "45%" }}>
          <CustomButton
            title={"Site web"}
            variant="dark"
            textSize={14}
            onPress={() => Linking.openURL(websiteUrl)}
          />
        </View>
        {bookingUrl && (
          <View style={{ flexShrink: 1, minWidth: "45%", maxWidth: "45%" }}>
            <CustomButton
              title={"Réserver"}
              variant="light"
              textSize={14}
              onPress={() => Linking.openURL(bookingUrl)}
            />
          </View>
        )}
      </View>
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
        <ChallengesCheckBox
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
        onPress={() => handleChallenges()}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color="black" size={25} />
          </TouchableOpacity>
          <Text style={{ fontSize: 23, fontWeight: 500 }}>{name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleFavorite()}
          style={{
            borderRadius: 50,
            padding: 8,
            backgroundColor: isFavorite ? "#e5685c" : "#C4C4C4",
          }}
        >
          <Heart color="#FFFFFF" size={25} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          width: Dimensions.get("window").width,
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        {/* Présentation du restaurant sans les onglets */}
        <View style={styles.presentationContainer}>
          {/*Image du restaurant*/}
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          {/* Bloc qui contient les métadonnées (prix, types, addresse, etc.) */}
          <View style={{ gap: 9 }}>
            <View style={{ ...styles.itemContainer, alignItems: "center" }}>
              <View style={{ flexDirection: "row" }}>{leaves}</View>
              <Text>Label Écotable</Text>
            </View>
            <View style={styles.itemContainer}>
              <MapPin
                size={20}
                color={"black"}
                style={styles.presentationIcon}
              />
              <Text style={{ flex: 1 }}>{address}</Text>
            </View>
            <View style={styles.itemContainer}>
              <UtensilsCrossed
                size={20}
                color={"black"}
                style={styles.presentationIcon}
              />
              <View style={styles.tagContainer}>
                {badges.map((badge, i) => (
                  <View
                    key={i}
                    style={{ ...styles.tag, backgroundColor: "#1C3B1D" }}
                  >
                    <Text style={styles.tagText}>{badge}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.itemContainer}>
              <Store
                size={20}
                color={"black"}
                style={styles.presentationIcon}
              />
              <View style={styles.tagContainer}>
                {types.map((badge, i) => (
                  <View
                    key={i}
                    style={{ ...styles.tag, backgroundColor: "#6AC46A" }}
                  >
                    <Text style={styles.tagText}>{badge}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.itemContainer}>
              <Euro size={20} color={"black"} style={styles.presentationIcon} />
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
        {/* Contenu des onglets */}
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
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  headerLeft: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  presentationContainer: {
    width: "90%",
    gap: 15,
    marginBottom: 20,
  },
  image: {
    width: Dimensions.get("window").width * 0.9,
    height: 170,
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: "row",
    gap: 10,
  },
  tagContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
  },
  tag: {
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 3,
  },
  tagText: {
    fontSize: 13,
    color: "#fff",
  },
  presentationIcon: {
    marginTop: 3,
  },
  tabContainer: {
    width: "90%",
    flexDirection: "row",
    gap: 15,
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
    width: "90%",
    marginTop: 15,
    alignItems: "center",
    gap: 10,
  },
});
