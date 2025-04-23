import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Linking,
  Image,
} from "react-native";

import CustomButton from "../components/ui-kit/CustomButton";

// #todo lien externe vers le site d'Ecotable ? faudra importer expo-linking

export default function SearchScreen({ infoVisible, setInfoVisible }) {
  return (
    <Modal visible={infoVisible} animationType="fade" transparent>
      <View style={styles.centerView}>
        <TouchableWithoutFeedback onPress={() => setInfoVisible(false)}>
          <View style={styles.absoluteFill} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.card}>
            <Image
              source={{
                uri: "https://cdn.jaimelesstartups.fr/wp-content/uploads/2023/04/logo-ecotable-1500x300.png",
              }}
              style={{
                width: "80%",
                height: 30,
                alignSelf: "center",
                marginVertical: 15,
              }}
              resizeMode="contain"
            />
            <Text style={styles.title}>
              Comment sont sélectionnés les restaurants ?
            </Text>
            <Text style={styles.text}>
              Écotable est un label français qui valorise les restaurants
              engagés dans une démarche écoresponsable.
            </Text>
            <Text style={styles.text}>
              Les établissements sont évalués selon des critères tels que
              l’approvisionnement en produits locaux et de saison, la gestion
              des déchets, la réduction de l’empreinte carbone, et la
              sensibilisation à l’alimentation durable.
            </Text>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL("https://ecotable.fr/a-propos")}
            >
              En savoir plus
            </Text>
            <View>
              <CustomButton
                variant="outline"
                textSize={12}
                title="Retour"
                onPress={() => setInfoVisible(false)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  absoluteFill: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  card: {
    width: "90%",
    gap: 5,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1C3B1D",
  },
  text: {
    fontSize: 13,
    marginBottom: 10,
  },
  link: {
    fontSize: 13,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginBottom: 10,
    color: "#1C3B1D",
    textAlign: "right",
  },
});
