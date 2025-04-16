import { StyleSheet, Platform, Dimensions, SafeAreaView, Text, View, TouchableOpacity, TextInput, ScrollView, Modal } from "react-native";
import { Search, List, Map } from "lucide-react-native";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import CustomCheckbox from "../components/ui-kit/CustomCheckbox";
import Checkbox from "../components/ui-kit/Checkbox";
import CustomInput from "../components/ui-kit/CustomInput";
import RadioButton from "../components/ui-kit/RadioButton";
import CustomButton from "../components/ui-kit/CustomButton";
import CustomCard from "../components/ui-kit/CustomCard";

export default function SearchScreen() {
  const dispatch = useDispatch();

  const [view, setView] = useState('map');
  const [searchType, setSearchType] = useState('restaurant');
  const [searchInput, setSearchInput] = useState('');
  const [badges, setBadges] = useState([]);
  const [types, setTypes] = useState([]);
  const [priceRange, setPriceRange] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const badgesOptions = ['Bio', 'Circuit court', 'Locavore', 'Pêche durable', 'Vegan', 'Viande durable', 'Zéro-déchet', '100% Veggie', 'Contenant accepté'];
  const perimeterOptions = ['Lieu exact', '2 km', '5 km', '10 km', '20 km', '30 km', '50 km'];
  const priceRangeOptions = ['Moins de 15€', 'Entre 15€ et 30€', 'Entre 30€ et 50€', 'Entre 50€ et 100€', 'Plus de 100€'];
  const typesOptions = ['Bistronomique', 'Café-restaurant', 'Traiteurs', 'Food truck', 'Gastronomique', 'Sur le pouce', 'Sandwicherie', 'Street-food', 'Salon de thé', 'Bar à vin'];

  const switchView = () => {
    setView(view => view === 'map' ? 'list' : 'map');
  };

  /* Rajouter un useEffect pour la géolocalisation */

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Trouver un restaurant</Text>
          <View style={styles.options}>
            <TouchableOpacity style={styles.searchButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.buttonText}>Chercher un restaurant</Text>
              <Search size={20} color={'#173e19'} />
            </TouchableOpacity>
            { view === 'map' && <List size={40} color={'#173e19'} onPress={switchView} /> }
            { view === 'list' && <Map size={40} color={'#173e19'} onPress={switchView} /> }
          </View>
        </View>
        <View style={styles.results}>
          { view === 'map' && <Text>Map</Text> }
          { view === 'list' && <Text>List</Text> }
          <CustomCard />
        </View>
      </View>

    {/* "Drawer" SearchFilters pour le moment sous forme de modale */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalView}>
          <ScrollView contentContainerStyle={{ width: '100%' }}>
            <View style={styles.modalContent}>
              <CustomInput placeholder="Chercher un restaurant" value={searchInput} onChangeText={(value) => setSearchInput(value)} />
              <View style={styles.searchTypeContainer}>
                <Text>Je cherche un</Text>
                <RadioButton options={['lieu', 'restaurant']} checkedValue={searchType} onChange={setSearchType} />
              </View>
              <View style={{ width: '100%', alignItems: 'start' }}>
                <Text style={{ fontWeight: 'bold', marginVertical: 10, fontSize: 16 }}>Périmètre</Text>
                <Text>PERIMETER SELECT-DOWN</Text>
                <Text style={{ fontWeight: 'bold', marginVertical: 10, fontSize: 16 }}>Prix</Text>
                <Text>PRICE RANGE SELECT-DOWN</Text>
                <Text style={{ fontWeight: 'bold', marginVertical: 10, fontSize: 16 }}>Badges</Text>
                <Checkbox options={badgesOptions} checkedValues={badges} onChange={setBadges} />
                <Text style={{ fontWeight: 'bold', marginVertical: 10, fontSize: 16 }}>Types d'établissement</Text>
                <Checkbox options={typesOptions} checkedValues={types} onChange={setTypes} />
              </View>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.buttonContainer}>
              <CustomButton title="Afficher les résultats" variant="light" textSize={14} onPress={() => setModalVisible(false)} />
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
    width: '100%',
    height: 170,
    alignItems: "center"
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    marginTop: 40,
    marginBottom: 10
  },
  options: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: 'red'
  },
  searchButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#173e19",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    elevation: 3
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
    width: '100%',
    flex: 1,
    borderWidth: 1,
    borderColor: 'red'
  },
  searchTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'no-wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    marginTop: 5,
    marginBottom: 10
  },
  modalView: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'blue',
    alignItems: "center",
    justifyContent: "start"
  },
  modalContent: {
    maxWidth: '90%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red'
  },
  footer: {
    width: '100%',
    borderTopWidth: 2,
    borderTopColor: 'lightgrey',
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5
  },
  buttonContainer: {
    width: '80%',
    maxWidth: '80%',
  }
});


/*
<CustomCheckbox label="Test" checked={false} onPress={handleCheck} />
  const handleCheck = () => {
    console.log("check");
  };
*/