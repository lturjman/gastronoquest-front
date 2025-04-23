import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Linking,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { Animated } from "react-native";
import CustomButton from "../components/ui-kit/CustomButton";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useRef } from "react";

const news = [
  {
    title: "Comment épaissir une sauce ?",
    url: "https://www.cuisineaz.com/articles/comment-epaissir-une-sauce-10235.aspx",
    imageUrl:
      "https://img.cuisineaz.com/1200x675/2013/12/20/i107529-sauce-roquefort.webp",
  },
  {
    title: "What is Fairtrade?",
    url: "https://www.fairtrade.net/en/why-fairtrade/what-we-do/what-is-fairtrade.html",
    imageUrl:
      "https://www.fairtrade.net/content/dam/fairtrade/global/what-is-fairtrade/Karen%20Roses%2C%20Ravine%20Roses%20Kenya%202020_edited.jpg/_jcr_content/renditions/21x9_1920w.webp",
  },
];

const { width, height } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value); // Récupère l'utilisateur depuis Redux
  const progress = useRef(new Animated.Value(0)).current; // Animation du niveau de progression

  const totalSaved = user.totalSavedCo2;
  const userLevel = user.level.currentLevel.level;
  const levelIcon = user.level.currentLevel.icon;
  const nextLevelInfo = user.level.nextLevel;
  const progressPercentage = user.level.progressPercentage;

  // À chaque changement de CO2 économisé, anime la barre de progression
  useEffect(() => {
    Animated.timing(progress, {
      toValue: progressPercentage,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progressPercentage]);

  // Contenu affiché si l'utilisateur est connecté
  const co2Container = (
    <>
      {/* Infos CO2 + icône de niveau */}
      <View style={styles.co2Section}>
        <View style={styles.roundWrapper}>
          <View style={styles.co2StatsWrapper}>
            <View style={styles.co2ValueText}>
              <Text style={{ fontSize: 26, fontWeight: "bold" }}>
                {totalSaved}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "700" }}>kg</Text>
            </View>
            <Text style={styles.co2SavedTextInRound}>de CO2 économisés</Text>
          </View>

          {/* Icone plante */}

          <Text style={styles.bigPlantLevelIcon}>{levelIcon}</Text>
        </View>

        {/* Texte explicatif */}

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Relever des défis, collecter du CO₂ et faire grandir sa plante à
            chaque palier atteint !
          </Text>
        </View>
      </View>

      {/* Affichage du niveau + barre de progression */}

      <View style={styles.levelLabelSection}>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={styles.levelLabel}>
            Niveau : {levelIcon} {userLevel}
          </Text>
        </View>

        {/* Barre animée */}

        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: progress.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>

        {/* Message pour prochain niveau */}
        {nextLevelInfo && (
          <Text style={styles.nextLevelLabel}>
            Plus que {nextLevelInfo.remaining}kg pour atteindre{" "}
            {nextLevelInfo.nextLevel} {nextLevelInfo.icon}
          </Text>
        )}
      </View>
    </>
  );

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
          renderItem={({ item }) => (
            <ImageBackground
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
        {user.token ? co2Container : connectionContainer}
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

  co2Section: {
    alignItems: "center",
    gap: 20,
  },
  // alignement horizontal des deux ronds (C02 + plante)
  roundWrapper: {
    flexDirection: "row",
  },
  co2StatsWrapper: {
    borderColor: "#6AC46A",
    borderWidth: 2,
    borderRadius: 75,
    aspectRatio: 1,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    padding: 20,
  },

  co2ValueText: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 3,
  },
  co2SavedTextInRound: {
    color: "#565656",
    fontSize: 14,
    width: "90%",
    textAlign: "center",
  },

  // icon de la grande plante à faire pousser (icon niveau actuel)
  bigPlantLevelIcon: {
    fontSize: 50,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#DBF2D6",
    paddingVertical: 15,
    borderRadius: 150,
    marginLeft: -15,
    height: 130,
    aspectRatio: 1,
  },
  // encars gris de description
  description: {
    fontSize: 13,
    color: "#333333",
    textAlign: "center",
  },
  descriptionContainer: {
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    padding: 10,
  },

  // Niveau actuel
  levelLabelSection: {
    justifyContent: "center",
    alignItems: "center",
    gap: 13,
  },
  levelLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },
  nextLevelLabel: {
    fontSize: 14,
    color: "#565656",
    textAlign: "center",
  },
  // BAR DE PROGRESSION DYNAMIQUE
  progressBarBackground: {
    width: 200,
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 5,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#6AC46A",
    borderRadius: 10,
  },
});
