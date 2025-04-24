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
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { useState, useRef, useEffect } from "react";

import RestaurantCard from "../components/ui-kit/RestaurantCard";
import CustomButton from "../components/ui-kit/CustomButton";
import SearchFiltersCheckboxes from "../components/SearchFiltersCheckboxes";
import SearchFiltersRadioInputs from "../components/SearchFiltersRadioInputs";
import EcotableInfo from "../components/EcotableInfo";
import SearchInputComponent from "../components/SearchInputComponent";
import { getMapRegionForRadius } from "../utils/getMapRegionForRadius";
import { getMapRegionForBounds } from "../utils/getMapRegionForBounds";
import { getRoute } from "../utils/getRoute";
import { fetchRestaurants } from "../services/fetchRestaurants";
import { fetchRestaurantsAroundUser } from "../services/fetchRestaurantsAroundUser";

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
};   // Vue de la France

export default function SearchScreen() {
  // Affichage et gestion des modales
  const [view, setView] = useState("map");
  const [mapRegion, setMapRegion] = useState(INITIAL_REGION);
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

  // Cacher la RestaurantCard
  const hideRestaurantCard = () => {
    setCardVisible(false);
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

  // Chercher des restaurants
  const fetchResults = async () => {
    // Indication qu'une recherche a été effectuée (fait apparaître le nombre de résultats)
    startedSearch === false && setStartedSearch(true);

    // Réinitialisation des résultats de potentielles recherches précédentes
    setSearchResults([]);

    // Return si aucun input et pas de géolocalisation
    if (searchInput.length === 0 && userLocation === null) return;

    // Définition de la route en fonction des paramètres de recherche
    const route = getRoute(searchInput, searchType, distance);

    try {
      const restaurants = await fetchRestaurants(route, searchInput, distance, badges, types, priceRange);

      // Préparation de la région à afficher sur la carte
      let region;

      // Si aucun résultat
      if (restaurants.length === 0) {
        if (route !== "geolocation") {
          // Centrer la carte sur la France
          region = INITIAL_REGION;
        } else if (route === "geolocation" && distance !== "Lieu exact" && distance !== "") {
          // Centrer la carte sur la géolocalisation de l'utilisateur avec le bon radius
          const radius = parseInt(distance.replace(" km", ""));
          region = getMapRegionForRadius(userLocation.latitude, userLocation.longitude, radius);     
        } else if (route === "geolocation") {
          // Centrer la carte sur la géolocalisation de l'utilisateur (5 km de radius par défaut)
          region = getMapRegionForRadius(userLocation.latitude, userLocation.longitude, 5);
        }
      } else {
        // Si un ou plusieurs résultats
        setSearchResults(restaurants);
        if (restaurants.length === 1) {
          // Un seul résultat = centrer sur le résultat          
          region = {
            latitude: restaurants[0].coordinates.latitude,
            longitude: restaurants[0].coordinates.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
        } else if (restaurants.length > 1) {
          // Plusieurs résultats = adopter une vue qui permet de visualiser tous les résultats
          region = getMapRegionForBounds(restaurants);
        }
      }

      // Affichage des résultats sur la carte
      if (mapRef.current) mapRef.current.animateToRegion(region, ANIMATION_TIME);
      else setMapRegion(region);

      // Fermer la modale SearchFilters
      setFiltersVisible(false);

    } catch (error) {
      console.error(error);
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
        console.log("Envoi de la requête au backend");
        try {
          const restaurants = await fetchRestaurantsAroundUser(location);

          // Préparation de l'affichage de la carte en fonction des résultats
          let region;

          if (restaurants.length > 0) {
            // Si restaurants trouvés
            console.log("Restaurants trouvés");
            setSearchResults(restaurants);
            setStartedSearch(true);
            // Centrer sur l'utilisateur à une hauteur qui permet de voir les résultats
            region = getMapRegionForRadius(location.coords.latitude, location.coords.longitude, 5);
          } else {
            // Si pas de restaurants trouvés = centrer étroitement sur l'utilisateur
            console.log("Pas de restaurants trouvés");
            region = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            };
          }

          // Affichage de la région sur la carte
          if (mapRef.current) mapRef.current.animateToRegion(region, ANIMATION_TIME);
          else setMapRegion(region);

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
            <MapView ref={mapRef} style={{ flex: 1 }} region={mapRegion}>
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
              {startedSearch === false ? (
                <Text style={styles.noSearchMessage}>
                  Aucune recherche n'a encore été effectuée
                </Text>
              ) : (
                searchResults.map((restaurant, i) => (
                  <RestaurantCard
                    key={i}
                    restaurant={restaurant}
                    onPress={hideRestaurantCard}
                  />
                ))
              )}
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

      {/* Modale RestaurantCard */}
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
    fontSize: 15,
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
  noSearchMessage: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
