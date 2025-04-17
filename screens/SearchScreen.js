import { StyleSheet, Platform, Dimensions, SafeAreaView, Text, View, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback } from "react-native";
import { Search, List, Map, ChevronsUpDown, Info, MapPin, Store } from "lucide-react-native";
import SelectDropdown from 'react-native-select-dropdown';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from 'expo-location';

import RestaurantCard from "../components/ui-kit/RestaurantCard";
import Checkbox from "../components/ui-kit/Checkbox";
import CustomInput from "../components/ui-kit/CustomInput";
import RadioButton from "../components/ui-kit/RadioButton";
import CustomButton from "../components/ui-kit/CustomButton";

const badgesOptions = ['Bio', 'Circuit court', 'Locavore', 'Pêche durable', 'Vegan', 'Viande durable', 'Zéro-déchet', '100% Veggie', 'Contenant accepté'];
const perimeterOptions = ['Lieu exact', '2 km', '5 km', '10 km', '20 km', '30 km', '50 km'];
const priceRangeOptions = ['Tous les prix', 'Moins de 15€', 'Entre 15€ et 30€', 'Entre 30€ et 50€', 'Entre 50€ et 100€', 'Plus de 100€'];
const typesOptions = ['Bistronomique', 'Café-restaurant', 'Traiteurs', 'Food truck', 'Gastronomique', 'Sur le pouce', 'Sandwicherie', 'Street-food', 'Salon de thé', 'Bar à vin', 'Européen'];

const test = {
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

export default function SearchScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const selectPerimeter = useRef(null);
  const selectPriceRange = useRef(null);
  const mapRef = useRef(null);

  const [view, setView] = useState("map");
  const [searchType, setSearchType] = useState("restaurant");
  const [searchInput, setSearchInput] = useState("");
  const [badges, setBadges] = useState([]);
  const [types, setTypes] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [perimeter, setPerimeter] = useState("");
  const [searchResults, setSearchResults] = useState([test]); // test
  const [selectedRestaurant, setSelectedRestaurant] = useState({});
  const [userLocation, setUserLocation] = useState({});

  // Gestion des modales
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  // #todo Tester que ça fonctionne bien une fois la carte rendue dynamique
  const displayRestaurantCard = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setCardVisible(true);
  }

  // Markers
  const markers = searchResults.map((restaurant, i) => {
    return (<Marker key={i} coordinate={restaurant.coordinates} pinColor={selectedRestaurant === restaurant.name ? 'yellow' : 'red'} onPress={() => displayRestaurantCard(restaurant)}>
      <Callout tooltip><></></Callout> {/* Pour iOS */}
    </Marker>);
    // Trouver moyen de changer la couleur du marker sélectionné qui ne bouge pas pour le moment #todo
  });

  const resetFilters = () => {
    setSearchType("restaurant");
    setSearchInput("");
    setBadges([]);
    setTypes([]);
    setPriceRange("");
    setPerimeter("");
    setSearchResults([test]); // test
    setSelectedRestaurant({});
    if (selectPerimeter.current) selectPerimeter.current.reset();
    if (selectPriceRange.current) selectPriceRange.current.reset();
    // Et recentrer sur la géolocalisation ?
  }

  // A l'appui sur le bouton "Afficher les résultats"
  const fetchResults = async () => {
  
    // Envoyer une requête au backend en fonction du type de recherche (Pour le moment : affichage pour tests)
    // Construction de la requête

    const body = { badges, types, priceRange, perimeter: perimeter.replace(" km", "") }; // voir si faudrait pas mettre une condition avant en fonction de comment le backend reçoit ça

    if (searchType === "restaurant") {
      console.log("POST /search/restaurant");
      body.name = searchInput;

    } else if (searchType === "lieu") {

      if (perimeter && perimeter === "Lieu exact") {
        console.log("POST /search/address");
        body.address = searchInput;
      } else {
        console.log("POST /search/place");
        body.input = searchInput;
      }
    } else {
      console.log("Erreur, c'est pas supposé arriver");
    }

    console.log(body);

    // Pour le moment ça sauvegarde les paramètres de la requête, voir si on veut changer ça

    setFiltersVisible(false);   // Fermer la modale
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
        setUserLocation(location.coords);

        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }, 1000); // 1 second animation
        }
      }
    })();
  }, []);

  let searchButton;
  if (searchInput.length > 0) {
    searchButton = (
      <TouchableOpacity style={{ ...styles.searchButton, justifyContent: "flex-start" }} onPress={() => setFiltersVisible(true)}>
        { searchType === "lieu" && <MapPin size={20} color={"#173e19"} /> }
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
          { /*searchResults.length > 0 &&*/ (
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
              region={{
                latitude: 46.603354,
                longitude: 1.888334,
                latitudeDelta: 9.8,
                longitudeDelta: 14.8
              }}
              showsUserLocation
              showsMyLocationButton
              >
            { markers }
            </MapView>
          )}

          {/* List */}
          { view === 'list' && (
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10, gap: 20 }}>
              {/* Pour les tests */} <RestaurantCard  /> <RestaurantCard  /> <RestaurantCard  />
              {/* searchResults.map((restaurant, i) => <RestaurantCard key={i} restaurant={restaurant} />) */}
            </ScrollView>            
          ) }
          
          
        </View>
      </View>

      {/* Modale SearchFilters */}
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
                <Text style={styles.filterCategory}>
                  Périmètre
                </Text>
                <SelectDropdown
                  ref={selectPerimeter}
                  data={perimeterOptions}
                  onSelect={(selectedOption) => setPerimeter(selectedOption)}
                  renderButton={(selectedOption) => (
                    <View style={styles.dropdownButtonStyle}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(perimeter) || ""}
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
                  ref={selectPriceRange}
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
      <Modal visible={infoVisible} animationType="fade" transparent>
        <Text>Infos sur le score d'Ecotable</Text>
      </Modal>

      {/* Modale SelectedRestaurant (voir comment on passe les props) | la carte se ferme quand on clique en-dehors */}
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
};

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
    width: '90%',
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
