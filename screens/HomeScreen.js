import { React, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Linking,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeCo2Container from "../components/HomeCo2Container";
import CustomButton from "../components/ui-kit/CustomButton";

const news = [
  {
    title:
      "Les légumineuses, une solution pour l’agriculture, la santé et l’environnement",
    url: "https://www.rfi.fr/fr/podcasts/reportage-france/20250226-les-l%C3%A9gumineuses-une-solution-pour-l-agriculture-la-sant%C3%A9-et-l-environnement",
    imageUrl:
      "https://s.rfi.fr/media/display/f72840ae-f46a-11ef-97ec-005056bf30b7/w:980/p:16x9/GettyImages-2198849515.webp",
  },
  {
    title: "L’intelligence artificielle au secours du gaspillage alimentaire",
    url: "https://www.ladepeche.fr/2025/04/22/lintelligence-artificielle-au-secours-du-gaspillage-alimentaire-12651967.php",
    imageUrl:
      "https://images.ladepeche.fr/api/v1/images/view/6807bd47eaea538c260a92b7/large/image.jpg?v=1",
  },
];

const { width, height } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value); // Récupère l'utilisateur depuis Redux

  useEffect(() => {
    //passe la stylebar en dark
    StatusBar.setBarStyle("dark-content");
  }, []);

  // Contenu si l'utilisateur n'est pas connecté
  const connectionContainer = (
    <View style={{ width: "90%", gap: 20 }}>
      <Text style={{ textAlign: "center", fontWeight: "600" }}>
        Se connecter pour consulter sa progression
      </Text>
      <CustomButton
        title={"Se connecter"}
        onPress={() => navigation.navigate("Enter")}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Carrousel d'actus */}
      <View style={styles.carousel}>
        <SwiperFlatList
          autoplay
          autoplayDelay={6}
          autoplayLoop
          showPagination
          paginationStyleItem={{ height: 8, width: 8 }}
          data={news}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <ImageBackground
              key={item.url}
              source={{ uri: item.imageUrl }}
              style={styles.carouselImg}
              imageStyle={{ borderRadius: 10 }}
              resizeMode="cover"
            >
              <View style={styles.carouselOverlay} />
              <TouchableOpacity
                style={styles.carouselContent}
                onPress={() => {
                  Linking.openURL(item.url);
                }}
              >
                <Text style={styles.carouselTitle}>{item.title}</Text>
              </TouchableOpacity>
            </ImageBackground>
          )}
        />
      </View>

      {/* Deux boutons : quiz + recherche */}
      <View style={styles.btnContainer}>
        <View style={styles.btn}>
          <CustomButton
            title={"Renforcer ses connaissances"}
            variant={"light"}
            fullHeight={true}
            onPress={() => navigation.navigate("Quiz")}
          />
        </View>
        <View style={styles.btn}>
          <CustomButton
            title={"Partir en quête d'un restaurant"}
            fullHeight={true}
            onPress={() => navigation.navigate("Search")}
          />
        </View>
      </View>

      {/* Progression ou connexion selon état utilisateur */}
      <View style={styles.progressCard}>
        {user.token ? <HomeCo2Container user={user} /> : connectionContainer}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  //CARROUSEL
  carousel: { height: height * 0.2, width: "90%" },
  carouselImg: {
    width: width * 0.9,
    height: "100%",
  },
  carouselOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 10,
  },
  carouselContent: {
    position: "absolute",
    padding: 15,
    bottom: 20,
    width: "90%",
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },

  //BOUTONS QUIZ + RECHERCHER
  btnContainer: {
    flexDirection: "row",
    width: "90%",
    height: height * 0.1,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  btn: {
    width: "48%",
    height: "100%",
  },
  // CARD DE PROGESSION COMPLÈTE
  progressCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    gap: "6%",
    padding: 20,
    minHeight: 350,
    height: height * 0.55,
  },
});
