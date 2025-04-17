import {
  StyleSheet,
  Platform,
  Dimensions,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Search, List, Map, ChevronsUpDown } from "lucide-react-native";
import SelectDropdown from "react-native-select-dropdown";
// import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RestaurantCard from "../components/ui-kit/RestaurantCard";
import Checkbox from "../components/ui-kit/Checkbox";
import CustomInput from "../components/ui-kit/CustomInput";
import RadioButton from "../components/ui-kit/RadioButton";
import CustomButton from "../components/ui-kit/CustomButton";
import CustomCard from "../components/ui-kit/CustomCard";

const badgesOptions = [
  "Bio",
  "Circuit court",
  "Locavore",
  "Pêche durable",
  "Vegan",
  "Viande durable",
  "Zéro-déchet",
  "100% Veggie",
  "Contenant accepté",
];
const perimeterOptions = [
  "Lieu exact",
  "2 km",
  "5 km",
  "10 km",
  "20 km",
  "30 km",
  "50 km",
];
const priceRangeOptions = [
  "Moins de 15€",
  "Entre 15€ et 30€",
  "Entre 30€ et 50€",
  "Entre 50€ et 100€",
  "Plus de 100€",
];
const typesOptions = [
  "Bistronomique",
  "Café-restaurant",
  "Traiteurs",
  "Food truck",
  "Gastronomique",
  "Sur le pouce",
  "Sandwicherie",
  "Street-food",
  "Salon de thé",
  "Bar à vin",
];

// useNavigation ?

export default function SearchScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [view, setView] = useState("map");
  const [searchType, setSearchType] = useState("restaurant");
  const [searchInput, setSearchInput] = useState("");
  const [badges, setBadges] = useState([]);
  const [types, setTypes] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [perimeter, setPerimeter] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false); // Modale pour les filtres de recherche
  const [cardVisible, setCardVisible] = useState(false); // Modale carte du restaurant (pour vue par carte)
  const [searchResults, setSearchResults] = useState([]);

  const markers = searchResults.map((restaurant, i) => {
    const { latitude, longitude } = restaurant.coordinates;
    return (
      <Marker
        key={i}
        coordinate={{ latitude, longitude }}
        onPress={() => console.log(data.name)}
      />
    );
    // Trouver moyen de cacher le callout, changer la couleur du marker sélectionné
    // Sur le onPress, passer toutes les informations du restaurant à RestaurantCard (à dynamiser avec notamment lien du resto qui navigue vers RestaurantScreen avec les infos correspondantes
  });
  /*
  name: String,
  desc: String,
  longDesc: String,
  score: Number,
  badges: [{ type: String, enum: ['', 'Bio', 'Circuit court', 'Locavore', 'Pêche durable', 'Vegan', 'Viande durable', 'Zéro-déchet', '100% Veggie', 'Contenant accepté'] }],
  types: [{ type: String, enum: ['', 'Bistronomique', 'Café-restaurant', 'Traiteurs', 'Food truck', 'Gastronomique', 'Sur le pouce', 'Sandwicherie', 'Street-food', 'Salon de thé', 'Bar à vin'] }],
  priceRange: { type: String, enum: ['', 'Moins de 15€', 'Entre 15€ et 30€', 'Entre 30€ et 50€', 'Entre 50€ et 100€', 'Plus de 100€'] },
  address: String,
  coordinates: coordinatesSchema,
  imageUrl: String,
  websiteUrl: String,
  bookingUrl: String,
  */

  const fetchResults = async () => {
    // A l'appui sur le bouton "Afficher les résultats"
    setFiltersVisible(false); // Fermer la modale (voir si on le met avant ou après les requêtes)

    // Envoyer une requête au backend en fonction du type de recherche (Pour le moment : affichage pour tests)

    // Construction de la requête
    const body = { badges, types, priceRange }; // voir si faudrait pas mettre une condition avant en fonction de comment le backend reçoit ça
    if (searchType === "restaurant") {
      console.log("POST /search/restaurant");
      body.name = searchInput;
    } else if (searchType === "lieu") {
      console.log("POST /search/place ou address (à mieux définir)");
      if (perimeter === "Lieu exact") body.address = searchInput;
      if (perimeter && perimeter !== "Lieu exact") {
        body.input = searchInput;
        body.perimeter = perimeter.replace(" km", "");
      }
      if (!perimeter) {
        body.input = searchInput;
        body.perimeter = "default";
      }
    } else {
      console.log("Erreur, c'est pas supposé arriver");
    }

    console.log(body);

    // Pour le moment ça sauvegarde les paramètres de la requête, voir si on veut changer ça
  };

  const switchView = () => {
    // Alterner entre vue Map/List et changement de l'icône
    setView((view) => (view === "map" ? "list" : "map"));
  };

  /*
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            const { latitude, longitude } = location.coords;
            setUserLocation({ latitude, longitude });
          });
      }
    })();
  }, []);
  */

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.options}>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => setFiltersVisible(true)}
            >
              <Text style={styles.buttonText}>Chercher un restaurant</Text>
              <Search size={20} color={"#173e19"} />
            </TouchableOpacity>
            {view === "map" && (
              <List size={40} color={"#173e19"} onPress={switchView} />
            )}
            {view === "list" && (
              <Map size={40} color={"#173e19"} onPress={switchView} />
            )}
          </View>
          {searchResults && <Text>Nombre de résultats</Text>}
        </View>

        <View style={styles.results}>
          {/* Map */}
          {view === "map" && <Text>Map</Text>}
          {/* view === 'map' && <MapView></MapView> */}
          {view === "map" && <RestaurantCard restaurant={restaurant} />}{" "}
          {/* A mettre dans la vue en carte en position fixe en bas de l'écran avec une modale */}
          {/* List */}
          {view === "list" && <Text>List</Text>}
        </View>
      </View>

      {/* SearchFilters sous forme de modale */}
      <Modal visible={filtersVisible} animationType="slide" transparent>
        <View style={styles.modalView}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.modalContent}>
              <CustomInput
                placeholder="Chercher un restaurant"
                value={searchInput}
                onChangeText={(value) => setSearchInput(value)}
              />
              <View style={styles.searchTypeContainer}>
                <Text>Je cherche un</Text>
                <RadioButton
                  options={["lieu", "restaurant"]}
                  checkedValue={searchType}
                  onChange={setSearchType}
                />
              </View>
              <View style={{ width: "100%", alignItems: "start" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginVertical: 10,
                    fontSize: 16,
                  }}
                >
                  Périmètre
                </Text>
                <SelectDropdown
                  data={perimeterOptions}
                  onSelect={(selectedOption) => setPerimeter(selectedOption)}
                  renderButton={(selectedOption) => (
                    <View style={styles.dropdownButtonStyle}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedOption && selectedOption) || ""}
                      </Text>
                      <ChevronsUpDown size={20} color="black" />
                    </View>
                  )}
                  renderItem={(item, index, isSelected) => {
                    return (
                      <View
                        style={{
                          ...styles.dropdownItemStyle,
                          ...(isSelected && { backgroundColor: "#D2D9DF" }),
                        }}
                      >
                        <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                      </View>
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                  dropdownStyle={styles.dropdownMenuStyle}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    marginVertical: 10,
                    fontSize: 16,
                  }}
                >
                  Prix
                </Text>
                <SelectDropdown
                  data={priceRangeOptions}
                  onSelect={(selectedOption) => setPriceRange(selectedOption)}
                  renderButton={(selectedOption) => (
                    <View style={styles.dropdownButtonStyle}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedOption && selectedOption) || ""}
                      </Text>
                      <ChevronsUpDown size={20} color="black" />
                    </View>
                  )}
                  renderItem={(item, index, isSelected) => {
                    return (
                      <View
                        style={{
                          ...styles.dropdownItemStyle,
                          ...(isSelected && { backgroundColor: "#D2D9DF" }),
                        }}
                      >
                        <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                      </View>
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                  dropdownStyle={styles.dropdownMenuStyle}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    marginVertical: 10,
                    fontSize: 16,
                  }}
                >
                  Badges
                </Text>
                <Checkbox
                  options={badgesOptions}
                  checkedValues={badges}
                  onChange={setBadges}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    marginVertical: 10,
                    fontSize: 16,
                  }}
                >
                  Types d'établissement
                </Text>
                <Checkbox
                  options={typesOptions}
                  checkedValues={types}
                  onChange={setTypes}
                />
              </View>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Afficher les résultats"
                variant="light"
                textSize={14}
                onPress={() => fetchResults()}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
  },
  header: {
    width: "100%",
    height: 170,
    alignItems: "center",
  },
  options: {
    width: "90%",
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center", // 'space-between' à tester
    alignItems: "center",
    gap: 10,
  },
  searchButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#173e19",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    elevation: 3,
    // width: '80%' à tester
  },
  buttonText: {
    fontFamily: Platform.select({
      ios: "Helvetica Neue",
      android: "Roboto",
      default: "System",
    }),
    fontWeight: "bold",
    textAlign: "center",
    color: "#173e19",
  },
  results: {
    width: "100%",
    flex: 1,
  },
  searchTypeContainer: {
    flexDirection: "row",
    flexWrap: "no-wrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  modalView: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "start",
  },
  modalContent: {
    minWidth: "90%",
    maxWidth: "90%",
    alignItems: "center",
  },
  footer: {
    width: "100%",
    borderTopWidth: 2,
    borderTopColor: "lightgrey",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  buttonContainer: {
    width: "80%",
    maxWidth: "80%",
  },
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: "#E9ECEF",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    color: "#151E26",
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 14,
    color: "#151E26",
  },
});
