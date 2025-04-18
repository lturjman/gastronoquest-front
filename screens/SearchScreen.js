import { StyleSheet, Platform, Dimensions, SafeAreaView, Text, View, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback } from "react-native";
import { Search, List, Map, ChevronsUpDown, Info, MapPin, Store } from "lucide-react-native";
import SelectDropdown from 'react-native-select-dropdown';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from 'expo-location';
import { getCenter, getBounds } from 'geolib';

import RestaurantCard from "../components/ui-kit/RestaurantCard";
import Checkbox from "../components/ui-kit/Checkbox";
import RadioButton from "../components/ui-kit/RadioButton";
import CustomButton from "../components/ui-kit/CustomButton";
import EcotableInfo from "../components/EcotableInfo";
import SearchInputComponent from "../components/SearchInputComponent";

const badgesOptions = ['Bio', 'Circuit court', 'Locavore', 'Pêche durable', 'Vegan', 'Viande durable', 'Zéro-déchet', '100% Veggie', 'Contenant accepté'];
const perimeterOptions = ['Lieu exact', '2 km', '5 km', '10 km', '20 km', '30 km', '50 km'];
const priceRangeOptions = ['Tous les prix', 'Moins de 15€', 'Entre 15€ et 30€', 'Entre 30€ et 50€', 'Entre 50€ et 100€', 'Plus de 100€'];
const typesOptions = ['Bistronomique', 'Café-restaurant', 'Traiteurs', 'Food truck', 'Gastronomique', 'Sur le pouce', 'Sandwicherie', 'Street-food', 'Salon de thé', 'Bar à vin', 'Européen'];

const test1 = {
  "_id": "6800b6036c8cbce8c4b8c025",
  "name": "Entre nous",
  "desc": "Boire, manger à l'air iodé",
  "longDesc": "Chez Entre Nous, Victoire et Sébastien mettent à l’honneur une cuisine locale et faite maison, en étroite collaboration avec une quarantaine de producteurs, majoritairement bio. Ici, on partage des plats gourmands et authentiques : acras de poisson, nems de légumes, frites maison bien dorées ou encore des langoustines cuites minute. La sélection des boissons privilégie les circuits courts, avec notamment des vins sourcés auprès de vignerons indépendants engagés. Dans ce lieu convivial et ouvert à toutes et tous, du pêcheur du coin au voyageur curieux, l’essentiel reste le plaisir des bonnes choses et des instants partagés.",
  "score": 3,
  "badges": [
    "Viande durable",
    "Bio",
    "Locavore",
    "Circuit court"
  ],
  "types": [
    "Européen",
    "Bistrot",
    "Café-restaurant"
  ],
  "priceRange": "Entre 15€ et 30€",
  "address": "35 Rue de la Marine, 29730 Guilvinec",
  "coordinates": {
    "latitude": 47.7947028,
    "longitude": -4.2823403
  },
  "imageUrl": "https://images.prismic.io/ecotable/Z-El93dAxsiBvy8__entre-nous-guilvinec-marine-burucoa-93.jpg?auto=format%2Ccompress&rect=0%2C910%2C2631%2C1842&w=4000&h=2800&dpr=0.5",
  "websiteUrl": "https://www.entrenous.bzh/",
  "bookingUrl": "https://app.overfull.fr/booking-v2/?key_id=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrZXkiOjQxNH0.k8PMgmKjFJHB7RcG-d0Q09Kih3vHS7MwWipxzD0NikI&source=Web",
}

const test2 = [
  {
    "_id": "6800b6036c8cbce8c4b8c067",
    "name": "Case.",
    "desc": "Carrément délicieux !",
    "longDesc": "Case., c'est le projet de Rodolphe et Mélanie, un couple qui a su allier ses forces pour créer un restaurant gastronomique à la cuisine innovante et où le végétal est à l'honneur. En cuisine, Rodolphe travaille des produits bruts qu'il déniche auprès de producteurs en circuit court, et les sublime dans les assiettes en céramique créées par sa compagne. Lacto-fermentation, koso, poudres ou encore jus : toutes les techniques sont bonnes pour utiliser les produits des feuilles à la racine et adopter une démarche zéro déchet ! ",
    "score": 2,
    "badges": [
      "Circuit court"
    ],
    "types": [
      "Gastronomique"
    ],
    "priceRange": "Entre 50€ et 100€",
    "address": "37 Rue Étienne Marcel, 37000 Tours",
    "coordinates": {
      "latitude": 47.3944484,
      "longitude": 0.6715814
    },
    "imageUrl": "https://images.prismic.io/ecotable/ZtGGO0aF0TcGJkQ9_Re_avril_5812-d81179.jpg?auto=format%2Ccompress&rect=48%2C0%2C1904%2C1333&w=4000&h=2800&dpr=0.5",
    "websiteUrl": "https://www.instagram.com/case.restaurant_tours/?hl=fr",
    "bookingUrl": "https://www.google.com/maps/reserve/v/dine/c/A2WsrHkVOiI?source=pa&opi=89978449&hl=fr-FR&gei=nqDrZ9S8I6jtkdUPx56q4A8&sourceurl=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dcase%2Brestaurant%2Btours%26rlz%3D1C1GCEA_enFR1116FR1116%26oq%3Dcase%2Bres%26pf%3Dcs%26sourceid%3Dchrome%26ie%3DUTF-8&ihs=1"
  },
  {
    "_id": "6800b6036c8cbce8c4b8c0fb",
    "name": "La Cantine Arkose Tours",
    "desc": "Camp de base du locavorisme",
    "longDesc": "Ouverte en 2018, l'adresse tourangelle du groupe Arkose, est fidèle aux codes de la maison. Ancien entrepôt réhabilité, murs d'escalade colorés et cantine éthique. Celle-ci a d'ailleurs un autre avantage : une terrasse ombragée ! Mais c'est surtout l'assiette qui plaît. Car si elle est simple dans la forme, la cuisine mise sur la qualité et la fraîcheur. Le reste de la carte fait la part belle aux légumes de saison, épices et herbes aromatiques.",
    "score": 1,
    "badges": [
      "Contenant accepté"
    ],
    "types": [],
    "priceRange": "",
    "address": "15 Av. du Danemark, 37100 Tours",
    "coordinates": {
      "latitude": 47.43203558473964,
      "longitude": 0.6908994913101197
    },
    "imageUrl": "https://images.prismic.io/ecotable/1f7eeec6-eeb3-499b-a520-ecd42016473c_arkose_tours23.jpeg?auto=compress,format&rect=162,0,6400,4480&w=4000&h=2800&dpr=0.5",
    "websiteUrl": "https://arkose.com/tours/cantine",
    "bookingUrl": "https://module.lafourchette.com/fr_FR/module/414395-3b4fa"
  }
]

// Constantes
const INITIAL_REGION = {
  latitude: 46.603354,
  longitude: 1.888334,
  latitudeDelta: 9.8,
  longitudeDelta: 14.8
};
const ANIMATION_TIME = 1500;


// A isoler dans module ou côté back ???
const getMapRegionForRadius = (latitude, longitude, radiusInKm, marginFactor = 1.5) => {
  const diameter = radiusInKm * 2 * marginFactor;
  const latitudeDelta = diameter / 111;
  const longitudeDelta = diameter / (111 * Math.cos(latitude * Math.PI / 180));
  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta
  };
};
//

export default function SearchScreen() {
  const user = useSelector((state) => state.user.value); // s'en servir pour le token et pour les favoris ? ou direct dans la carte ?

  const selectPerimeterRef = useRef(null);
  const selectPriceRangeRef = useRef(null);
  const mapRef = useRef(null);

  // Affichage et gestion des modales
  const [view, setView] = useState("map");
  const [userLocation, setUserLocation] = useState({});   // ???
  const [startedSearch, setStartedSearch] = useState(false);    // ???
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  // Gestion de la recherche
  const [searchType, setSearchType] = useState("restaurant");
  const [searchInput, setSearchInput] = useState("");
  const [badges, setBadges] = useState([]);
  const [types, setTypes] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [perimeter, setPerimeter] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState({});

  // Afficher la RestaurantCard correspondant au marker sélectionné
  const displayRestaurantCard = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setCardVisible(true);
  }

  // Réinitialiser les filtres de recherche
  const resetFilters = () => {
    setSearchType("restaurant");
    setSearchInput("");
    setBadges([]);
    setTypes([]);
    setPriceRange("");
    setPerimeter("");
    setSearchResults([]);
    setSelectedRestaurant({});
    if (selectPerimeterRef.current) selectPerimeterRef.current.reset();
    if (selectPriceRangeRef.current) selectPriceRangeRef.current.reset();
  }

  // Chercher des restaurants
  const fetchResults = async () => {
    setStartedSearch === false && setStartedSearch(true);

    // Construction de la requête (voir si faudrait pas mettre une condition avant en fonction de comment le backend reçoit ça) #todo
    let route = "";
    const reqBody = {
      badges,
      types,
      priceRange,
      distance: perimeter.replace(" km", "")
    };

    if (searchType === "restaurant") {
      route = "restaurant";
      reqBody.name = searchInput;
    }
    
    if (searchType === "ville") {
      if (perimeter && perimeter === "Lieu exact") {
        route = "address";
        body.address = searchInput;
      } else {
        route = "city";
        body.city = searchInput;
      }
    }

    console.log(reqBody); // #test

    // FETCH BACKEND
    const response = await fetch(EXPO_PUBLIC_BACKEND_URL + 'search/' + route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody)
    });
    const data = await response.json();

    console.log(data); // #test

    // Si aucun résultat
    if (!data.result) {
      console.log("Pas de résultats"); // #test
      // Fermer la modale SearchFilters
      setFiltersVisible(false);
      return;
    }

    const { restaurants, result } = data;
    setSearchResults(restaurants);

    // Affichage des résultats sur la carte

    if (result && restaurants.length === 1) {
      console.log("1 résultat"); // #test

      mapRef.current && mapRef.current.animateToRegion({
        latitude: restaurants[0].coordinates.latitude,
        longitude: restaurants[0].coordinates.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, ANIMATION_TIME);
    }
    
    if (result && restaurants.length > 1) {
      console.log("Plusieurs résultats"); // #test

      // (à mettre dans un module ?) #todo
      const coordinates = restaurants.map(restaurant => restaurant.coordinates);
      const center = getCenter(coordinates);
      const bounds = getBounds(coordinates);
      const region = {
        latitude: center.latitude,
        longitude: center.longitude,
        latitudeDelta: Math.abs(bounds.maxLat - bounds.minLat) * 1.5,
        longitudeDelta: Math.abs(bounds.maxLng - bounds.minLng) * 1.5
      };
      
      mapRef.current && mapRef.current.animateToRegion(region, ANIMATION_TIME);
    }
    
    // Fermer la modale SearchFilters
    setFiltersVisible(false);
  };

  // Alterner entre vue Map/List et changement de l'icône
  const switchView = () => {   
    setView(view => view === 'map' ? 'list' : 'map');
  }

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        /*
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            const { latitude, longitude } = location.coords;
            setUserLocation({ latitude, longitude });
          });
        */

        const location = await Location.getCurrentPositionAsync({});

        setUserLocation(location.coords);    // ???

        // Fetch les restaurants autour de l'utilisateur (5 km de radius)
        const response = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "search/geolocation", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ geolocation: location, distance: 5 })
        });
        const data = await response.json();

        // Affichage de la map en fonction des résultats
        if (data.result) {   // Si restaurants trouvés
          console.log("Restaurants trouvés"); // #test
          setSearchResults(data.restaurants);
          setStartedSearch(true);
          mapRef.current.animateToRegion(
            getMapRegionForRadius(location.coords.latitude, location.coords.longitude, 5), // #todo module ?
            ANIMATION_TIME
          );
        } else {   // Si pas de restaurants trouvés
          console.log("Pas de restaurants trouvés"); //
          mapRef.current.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }, ANIMATION_TIME);
        }
      }
      
    })();
  }, []);

  // Bouton de recherche
  let searchButton;
  if (searchInput.length > 0) {
    searchButton = (
      <TouchableOpacity style={{ ...styles.searchButton, justifyContent: "flex-start" }} onPress={() => setFiltersVisible(true)}>
        { searchType === "ville" && <MapPin size={20} color={"#173e19"} /> }
        { searchType === "restaurant" && <Store size={20} color={"#173e19"} /> }
        <Text style={styles.buttonText}>{searchInput}</Text>
      </TouchableOpacity>
    );
  } else {
    searchButton = (
      <TouchableOpacity style={{ ...styles.searchButton, justifyContent: "space-between" }} onPress={() => setFiltersVisible(true)}>
        <Text style={styles.buttonText}>Chercher un restaurant</Text>
        <Search size={20} color={"#173e19"} />
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.options}>
            { searchButton }
            { view === "map" && (<List size={40} color="#173e19" onPress={switchView} />) }
            { view === "list" && (<Map size={40} color="#173e19" onPress={switchView} />) }
          </View>
          { startedSearch && (
            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
              <Text>{searchResults.length} {searchResults.length > 1 ? "résultats" : "résultat"}</Text>
              <Info size={20} color="#173e19" onPress={() => setInfoVisible(true)} />
            </View>
          ) }
        </View>

        <View style={styles.results}>

          {/* Map */}
          { view === 'map' && (
            <MapView
              ref={mapRef}
              style={{ flex: 1 }}
              region={INITIAL_REGION}
            >
              { searchResults.map((restaurant, i) => (
                <Marker key={i} coordinate={restaurant.coordinates} onPress={() => displayRestaurantCard(restaurant)}>
                  <Callout tooltip><></></Callout> {/* Pour iOS */}
                </Marker>
              ))}
            </MapView>
          )}

          {/* List */}
          { view === 'list' && (
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10, gap: 20 }}>
              { searchResults.map((restaurant, i) => <RestaurantCard key={i} restaurant={restaurant} />) }
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
                placeholder={ searchType === "ville" ? "Chercher une ville" : "Chercher un restaurant" }
                value={searchInput}
                onChangeText={(value) => setSearchInput(value)}
              />
              <View style={styles.searchTypeContainer}>
                <Text>Chercher par :</Text>
                <RadioButton
                  options={["ville", "restaurant"]}
                  checkedValue={searchType}
                  onChange={setSearchType}
                />
              </View>
              <View style={{ width: "100%", alignItems: "start" }}>
                <Text style={styles.filterCategory}>
                  Périmètre
                </Text>
                <SelectDropdown
                  ref={selectPerimeterRef}
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
                <Text style={styles.filterCategory}>
                  Prix
                </Text>
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
                <Text style={styles.filterCategory}>
                  Badges
                </Text>
                <Checkbox
                  options={badgesOptions}
                  checkedValues={badges}
                  onChange={setBadges}
                />
                <Text style={styles.filterCategory}>
                  Types d'établissement
                </Text>
                <Checkbox
                  options={typesOptions}
                  checkedValues={types}
                  onChange={setTypes}
                />
              </View>
              <View style={{ paddingVertical: 10 }}>
                <CustomButton variant="outline" textSize={12} title="Réinitialiser les filtres" onPress={resetFilters} />
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

      {/* Modale Info */}
      <EcotableInfo infoVisible={infoVisible} setInfoVisible={setInfoVisible} />

      {/* Modale SelectedRestaurant */}
      <Modal visible={cardVisible} animationType="fade" transparent>
          <View style={{ flex: 1, justifyContent: "flex-end", paddingHorizontal: 15, paddingBottom: 65 }}>
          <TouchableWithoutFeedback onPress={() => setCardVisible(false)}>
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
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
    backgroundColor: "#fff",
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
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: '85%'
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
    borderTopColor: "#E0E0E0",
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
  filterCategory: {
    fontWeight: "bold",
    marginVertical: 10,
    fontSize: 16,
  }
});
