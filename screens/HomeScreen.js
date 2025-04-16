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
import { Platform } from "react-native";
import CustomButton from "../components/ui-kit/CustomButton";
import { useSelector } from "react-redux";

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

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const co2Container = (
    <>
      <View style={styles.co2Container}>
        <Text style={{ fontSize: 20 }}>🌱</Text>
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
            width: "80%",
            textAlign: "center",
          }}
        >
          de CO2 économisés
        </Text>
      </View>
      <View style={styles.levelContainer}>
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Mon niveau</Text>
        <Text>🌱 {user.level}</Text>
        <CustomButton
          title={"Historique de quêtes"}
          textSize={13}
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
        Connectez-vous pour consulter votre progression
      </Text>
      <CustomButton
        title={"Se connecter"}
        textSize={13}
        onPress={() => navigation.navigate("Enter")}
      />
    </View>
  );

  return (
    <View style={styles.container}>
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
            title={"Ma série quotidienne"}
            variant={"light"}
            textSize={13}
            onPress={() => navigation.navigate("Quiz")}
          />
        </View>
        <View style={styles.btn}>
          <CustomButton
            title={"En quête d'un restaurant"}
            textSize={13}
            onPress={() => navigation.navigate("Search")}
          />
        </View>
      </View>
      <View style={styles.progressCard}>
        {user.token ? co2Container : connectionContainer}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  carousel: { height: 182, width: "80%" },
  carouselImg: {
    width: width * 0.8,
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
    width: "80%",
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    fontFamily: Platform.select({
      ios: "Helvetica Neue",
      android: "Roboto",
      default: "System",
    }),
  },
  btnContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  btn: {
    width: "48%",
    flex: 1,
  },
  progressCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 7,
    backgroundColor: "#fff",
    height: 350,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
  },
  co2Container: {
    backgroundColor: "rgba(106, 196, 106, 0.5)",
    borderRadius: 75,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
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
});
