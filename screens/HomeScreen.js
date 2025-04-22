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

const levelIcons = {
  "Jeune pousse": "🌱",
  "Petit arbuste": "🪴",
  "Arbre fruitier": "🍎",
  "Grand arbre": "🌴",
  "Chêne centenaire": "🌳",
};

const getUserLevel = (co2) => {
  if (co2 >= 100) return "Chêne centenaire";
  if (co2 >= 75) return "Grand arbre";
  if (co2 >= 50) return "Arbre fruitier";
  if (co2 >= 20) return "Petit arbuste";
  return "Jeune pousse";
};

const levelThresholds = [
  { level: "jeune pousse", icon: "🌱", co2: 10 },
  { level: "Petit arbuste", icon: "🪴", co2: 20 },
  { level: "Arbre fruitier", icon: "🍎", co2: 50 },
  { level: "Grand arbre", icon: "🌴", co2: 75 },
  { level: "Chêne centenaire", icon: "🌳", co2: 100 },
];

const getNextLevelInfo = (co2) => {
  for (let i = 0; i < levelThresholds.length; i++) {
    if (co2 < levelThresholds[i].co2) {
      return {
        nextLevel: levelThresholds[i].level,
        icon: levelThresholds[i].icon,
        remaining: levelThresholds[i].co2 - co2,
      };
    }
  }
  return null;
};

const getProgressPercentage = (co2) => {
  let previous = 0;
  for (let i = 0; i < levelThresholds.length; i++) {
    if (co2 < levelThresholds[i].co2) {
      const currentThreshold = levelThresholds[i].co2;
      const percentage =
        ((co2 - previous) / (currentThreshold - previous)) * 100;
      return Math.min(Math.max(percentage, 0), 100);
    }
    previous = levelThresholds[i].co2;
  }
  return 100; // max atteint
};

export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const percentage = getProgressPercentage(user.totalSavedCo2);
    Animated.timing(progress, {
      toValue: percentage,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [user.totalSavedCo2]);

  const co2Container = (
    <>
      <View style={styles.co2ntextContainer}>
        <View style={styles.plantContainer}>
          <View style={styles.co2Container}>
            <View style={styles.co2Kpi}>
              <Text style={{ fontSize: 26, fontWeight: "bold" }}>
                {user.totalSavedCo2}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "700" }}>kg</Text>
            </View>
            <Text
              style={{
                color: "#565656",
                fontSize: 14,
                width: "90%",
                textAlign: "center",
              }}
            >
              de CO2 économisés
            </Text>
          </View>
          <Text
            style={{
              fontSize: 50,
              textAlign: "center",
              textAlignVertical: "center",
              backgroundColor: "#DBF2D6",
              paddingVertical: 15,
              borderRadius: 150,
              marginLeft: -20,
              height: 130,
              aspectRatio: 1,
            }}
          >
            {" "}
            {levelIcons[getUserLevel(user.totalSavedCo2)]}{" "}
          </Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Relever des défis, collecter du CO₂ et faire grandir sa plante à
            chaque palier atteint !
          </Text>
        </View>
      </View>

      <View style={styles.levelContainer}>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={styles.levelText}>
            <Text>Niveau :</Text>
            {levelIcons[getUserLevel(user.totalSavedCo2)]}{" "}
            {getUserLevel(user.totalSavedCo2)}
          </Text>
        </View>

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
        {(() => {
          const next = getNextLevelInfo(user.totalSavedCo2);
          if (next) {
            return (
              <Text
                style={{ fontSize: 14, color: "#565656", textAlign: "center" }}
              >
                Plus que {next.remaining}kg pour atteindre {next.nextLevel}{" "}
                {next.icon}
              </Text>
            );
          }
          return null;
        })()}
      </View>
      <View style={{ width: "90%" }}>
        <CustomButton
          title={"Historique de quêtes"}
          onPress={() =>
            navigation.navigate("User", { screen: "HistoryScreen" })
          }
        />
      </View>
    </>
  );

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
    gap: 20,
    padding: 20,
    minHeight: 350,
    height: height * 0.55,
  },
  plantContainer: {
    flexDirection: "row",
  },
  co2Container: {
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
  co2ntextContainer: {
    alignItems: "center",
    gap: 20,
  },
  text: {
    fontSize: 13,
    color: "#333333",
    textAlign: "center",
  },
  textContainer: {
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    padding: 10,
  },
  levelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },
  co2Kpi: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 3,
  },
  levelContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 13,
  },
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
