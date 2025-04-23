import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import {
  Search,
  List,
  Map,
  ChevronsUpDown,
  Info,
  MapPin,
  Store,
} from "lucide-react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useState, useRef, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";

import { getMapRegionForRadius } from "../utils/getMapRegionForRadius";
import { getMapRegionForBounds } from "../utils/getMapRegionForBounds";
import RestaurantCard from "../components/ui-kit/RestaurantCard";
import CustomButton from "../components/ui-kit/CustomButton";
import SearchFiltersCheckboxes from "../components/SearchFiltersCheckboxes";
import SearchFiltersRadioInputs from "../components/SearchFiltersRadioInputs";
import EcotableInfo from "../components/EcotableInfo";
import SearchInputComponent from "../components/SearchInputComponent";
import { SafeAreaView } from "react-native-safe-area-context";

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
const distanceOptions = [
  "Lieu exact",
  "2 km",
  "5 km",
  "10 km",
  "20 km",
  "30 km",
  "50 km",
];
const priceRangeOptions = [
  "Tous les prix",
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
  "Européen",
];

// Constantes
const ANIMATION_TIME = 1500;
const INITIAL_REGION = {
  latitude: 46.603354,
  longitude: 1.888334,
  latitudeDelta: 9.8,
  longitudeDelta: 14.8,
};

export default function SearchScreen() {
  // Affichage et gestion des modales
  const [view, setView] = useState("map");
  const [userLocation, setUserLocation] = useState(null);
  const [startedSearch, setStartedSearch] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const selectDistanceRef = useRef(null);
  const selectPriceRangeRef = useRef(null);
  const mapRef = useRef(null);

  // Gestion de la recherche
  const [searchType, setSearchType] = useState("restaurant");
  const [searchInput, setSearchInput] = useState("");
  const [badges, setBadges] = useState([]);
  const [types, setTypes] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [distance, setDistance] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState({});

  // Afficher la RestaurantCard correspondant au marker sélectionné
  const displayRestaurantCard = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setCardVisible(true);
  };

  // Réinitialiser les filtres de recherche
  const resetFilters = () => {
    setSearchType("restaurant");
    setSearchInput("");
    setBadges([]);
    setTypes([]);
    setPriceRange("");
    setDistance("");
    setSearchResults([]);
    setSelectedRestaurant({});
    if (selectDistanceRef.current) selectDistanceRef.current.reset();
    if (selectPriceRangeRef.current) selectPriceRangeRef.current.reset();
  };

  // Recentrer la carte sur la région initiale
  const resetMapRegion = () => {
    if (userLocation) {
      mapRef.current &&
        mapRef.current.animateToRegion(
          {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          ANIMATION_TIME
        );
    } else {
      mapRef.current &&
        mapRef.current.animateToRegion(INITIAL_REGION, ANIMATION_TIME);
    }
  };

  // Chercher des restaurants
  const fetchResults = async () => {
    console.log("fetchResults()");

    startedSearch === false && setStartedSearch(true);
    setSearchResults([]);

    // Construction du req.body
    const reqBody = {
      input: searchInput.trim(),
      badges,
      types,
      priceRange,
      distance: distance.replace(" km", ""),
    };
    console.log("body:", reqBody);

    // Définition de la route
    let route = "";
    if (searchInput.length === 0) {
      route = "geolocation";
      reqBody.geolocation = userLocation;
    } else if (searchType === "restaurant") {
      route = "restaurant";
    } else if (searchType === "ville") {
      route =
        distance === "Lieu exact" || distance === ""
          ? "address"
          : "coordinates";
    }
    console.log("route:", route);

    // FETCH BACKEND
    try {
      const response = await fetch(
        process.env.EXPO_PUBLIC_BACKEND_URL + "/search/" + route,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reqBody),
        }
      );
      const data = await response.json();

      // Si aucun résultat
      if (!data.result) {
        console.log("Pas de résultats");
        if (route !== "geolocation") {
          resetMapRegion();
        } else if (route === "geolocation" && distance !== "Lieu exact") {
          const radius = parseInt(distance.replace(" km", ""));
          mapRef.current &&
            mapRef.current.animateToRegion(
              getMapRegionForRadius(
                userLocation.latitude,
                userLocation.longitude,
                radius
              ),
              ANIMATION_TIME
            );
        } else if (route === "geolocation") {
          mapRef.current &&
            mapRef.current.animateToRegion(
              getMapRegionForRadius(
                userLocation.latitude,
                userLocation.longitude,
                5
              ),
              ANIMATION_TIME
            );
        }
        return setFiltersVisible(false);
      }

      const { restaurants, result } = data;
      setSearchResults(restaurants);

      // Affichage des résultats sur la carte

      if (result && restaurants.length === 1) {
        // Un résultat
        console.log("1 résultat");

        mapRef.current &&
          mapRef.current.animateToRegion(
            {
              latitude: restaurants[0].coordinates.latitude,
              longitude: restaurants[0].coordinates.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            ANIMATION_TIME
          );
      }

      if (result && restaurants.length > 1) {
        // Plusieurs résultats
        console.log("Plusieurs résultats");

        mapRef.current &&
          mapRef.current.animateToRegion(
            getMapRegionForBounds(restaurants),
            ANIMATION_TIME
          );
      }

      // Fermer la modale SearchFilters
      console.log("Fin de fetchResults()");
      setFiltersVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Alterner entre vue Map/List et changement de l'icône
  const switchView = () => {
    setView((view) => (view === "map" ? "list" : "map"));
  };

  useEffect(() => {
    (async () => {
      console.log("Initiation du composant SearchScreen");
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        console.log("Localisation acceptée et enregistrée");
        setUserLocation(location.coords);

        // Fetch les restaurants autour de l'utilisateur (5 km de radius)
        try {
          console.log("Envoi de la requête au backend");
          const response = await fetch(
            process.env.EXPO_PUBLIC_BACKEND_URL + "/search/geolocation",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ geolocation: location, distance: 5 }),
            }
          );
          const data = await response.json();

          // Affichage de la map en fonction des résultats
          if (data.result) {
            // Si restaurants trouvés
            console.log("Restaurants trouvés");
            setSearchResults(data.restaurants);
            setStartedSearch(true);
            mapRef.current &&
              mapRef.current.animateToRegion(
                getMapRegionForRadius(
                  location.coords.latitude,
                  location.coords.longitude,
                  5
                ),
                ANIMATION_TIME
              );
            console.log("Affichage des restaurants trouvés");
          } else {
            // Si pas de restaurants trouvés
            console.log("Pas de restaurants trouvés");
            mapRef.current &&
              mapRef.current.animateToRegion(
                {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                },
                ANIMATION_TIME
              );
            console.log("Affichage de la position de l'utilisateur");
          }
        } catch (error) {
          console.error(error);
        }
      }
    })();

    return () => {
      setCardVisible(false);
    };
  }, []);

  // Bouton de recherche
  let searchButton;
  if (searchInput.length > 0) {
    searchButton = (
      <TouchableOpacity
        style={{ ...styles.searchButton, justifyContent: "flex-start" }}
        onPress={() => setFiltersVisible(true)}
      >
        {searchType === "ville" && <MapPin size={20} color={"#173e19"} />}
        {searchType === "restaurant" && <Store size={20} color={"#173e19"} />}
        <Text style={styles.buttonText}>{searchInput}</Text>
      </TouchableOpacity>
    );
  } else {
    searchButton = (
      <TouchableOpacity
        style={{ ...styles.searchButton, justifyContent: "space-between" }}
        onPress={() => setFiltersVisible(true)}
      >
        <Text style={styles.buttonText}>Chercher un restaurant</Text>
        <Search size={20} color={"#173e19"} />
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* On force la statusbar sur cette page car sinon le composant MapView affecte sa couleur */}
      <StatusBar backgroundColor="#F9F9F9" barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.options}>
            {searchButton}
            {view === "map" && (
              <List size={40} color="#173e19" onPress={switchView} />
            )}
            {view === "list" && (
              <Map size={40} color="#173e19" onPress={switchView} />
            )}
          </View>
          {startedSearch && (
            <View
              style={{
                width: "90%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text>
                {searchResults.length}{" "}
                {searchResults.length > 1 ? "résultats" : "résultat"}
              </Text>
              <TouchableOpacity onPress={() => setInfoVisible(true)}>
                <Info size={20} color="#173e19" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.results}>
          {/* Map */}
          {view === "map" && (
            <MapView ref={mapRef} style={{ flex: 1 }} region={INITIAL_REGION}>
              {searchResults.map((restaurant, i) => (
                <Marker
                  key={i}
                  coordinate={restaurant.coordinates}
                  onPress={() => displayRestaurantCard(restaurant)}
                >
                  <Callout tooltip>
                    <>{/* Pour iOS */}</>
                  </Callout>
                </Marker>
              ))}
            </MapView>
          )}

          {/* List */}
          {view === "list" && (
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                gap: 20,
              }}
            >
              {searchResults.map((restaurant, i) => (
                <RestaurantCard key={i} restaurant={restaurant} />
              ))}
            </ScrollView>
          )}
        </View>
      </View>

      {/* Modale SearchFilters */}
      <Modal visible={filtersVisible} animationType="slide" transparent>
        <View style={styles.modalView}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.modalContent}>
              <SearchInputComponent
                placeholder={
                  searchType === "ville"
                    ? "Chercher une ville"
                    : "Chercher un restaurant"
                }
                value={searchInput}
                onChangeText={(value) => setSearchInput(value)}
              />
              <View style={styles.searchTypeContainer}>
                <Text>Chercher par :</Text>
                <SearchFiltersRadioInputs
                  options={["ville", "restaurant"]}
                  checkedValue={searchType}
                  onChange={setSearchType}
                />
              </View>
              <View style={{ width: "100%", alignItems: "start" }}>
                <Text style={styles.filterCategory}>Distance</Text>
                <SelectDropdown
                  ref={selectDistanceRef}
                  data={distanceOptions}
                  onSelect={(selectedOption) => setDistance(selectedOption)}
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
                <Text style={styles.filterCategory}>Prix</Text>
                <SelectDropdown
                  ref={selectPriceRangeRef}
                  data={priceRangeOptions}
                  onSelect={(selectedOption) => setPriceRange(selectedOption)}
                  renderButton={(selectedOption) => (
                    <View style={styles.dropdownButtonStyle}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedOption && selectedOption) || "Tous les prix"}
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
                <Text style={styles.filterCategory}>Badges</Text>
                <SearchFiltersCheckboxes
                  options={badgesOptions}
                  checkedValues={badges}
                  onChange={setBadges}
                />
                <Text style={styles.filterCategory}>Types d'établissement</Text>
                <SearchFiltersCheckboxes
                  options={typesOptions}
                  checkedValues={types}
                  onChange={setTypes}
                />
              </View>
              <View style={{ paddingVertical: 10 }}>
                <CustomButton
                  variant="outline"
                  textSize={12}
                  title="Réinitialiser les filtres"
                  onPress={resetFilters}
                />
              </View>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Afficher les résultats"
                variant="light"
                onPress={() => fetchResults()}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modale Info */}
      <EcotableInfo infoVisible={infoVisible} setInfoVisible={setInfoVisible} />

      {/* Modale SelectedRestaurant */}
      <Modal visible={cardVisible} animationType="fade" transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            paddingHorizontal: 15,
            paddingBottom: 65,
          }}
        >
          <TouchableWithoutFeedback onPress={() => setCardVisible(false)}>
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {}}>
            <RestaurantCard restaurant={selectedRestaurant} />
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "start",
  },
  header: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 13,
    borderBottomWidth: 2,
    borderBottomColor: "#E0E0E0",
  },
  options: {
    width: "90%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
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
    gap: 15,
    elevation: 3,
    width: "85%",
  },
  buttonText: {
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
    backgroundColor: "#F9F9F9",
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
    borderTopColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  buttonContainer: {
    width: "80%",
    maxWidth: "80%",
    paddingVertical: 5,
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
  filterCategory: {
    fontWeight: "bold",
    marginVertical: 10,
    fontSize: 16,
  },
});
