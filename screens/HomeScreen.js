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

const news = [
  {
    title: "Comment épaissir une sauce ?",
    desc: "Louper sa sauce au poivre ou sa sauce hollandaise, ça arrive même aux meilleurs. Trop liquide, vous dites ? Il suffit de quelques bonnes astuces pour rattraper le coup. Inventaire des ruses à connaître pour épaissir une sauce en un tournemain.",
    url: "https://www.cuisineaz.com/articles/comment-epaissir-une-sauce-10235.aspx",
    imageUrl:
      "https://img.cuisineaz.com/1200x675/2013/12/20/i107529-sauce-roquefort.webp",
  },
  {
    title: "What is Fairtrade?",
    desc: "Fairtrade is the most recognised and trusted sustainability label working to make trade fairer for the people who grow our food.",
    url: "https://www.fairtrade.net/en/why-fairtrade/what-we-do/what-is-fairtrade.html",
    imageUrl:
      "https://www.fairtrade.net/content/dam/fairtrade/global/what-is-fairtrade/Karen%20Roses%2C%20Ravine%20Roses%20Kenya%202020_edited.jpg/_jcr_content/renditions/21x9_1920w.webp",
  },
];

const { width } = Dimensions.get("window");

export default function HomeScreen() {
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
              style={styles.img}
              resizeMode="cover"
            >
              <View style={styles.overlay} />
              <TouchableOpacity
                style={styles.content}
                onPress={() => {
                  Linking.openURL(item.url);
                }}
              >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
              </TouchableOpacity>
            </ImageBackground>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  carousel: { height: 182, width: "80%" },
  img: {
    width: width * 0.8,
    height: "100%",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },

  // Conteneur du texte
  content: {
    position: "absolute",
    padding: 15,
    bottom: 20,
    width: "80%",
  },
  title: {
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
  desc: {
    color: "white",
    fontSize: 10,
    fontFamily: Platform.select({
      ios: "Helvetica Neue",
      android: "Roboto",
      default: "System",
    }),
  },
});
