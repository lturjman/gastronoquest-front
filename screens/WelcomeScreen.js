import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  ImageBackground,
  Image,
  StatusBar,
} from "react-native";
import CustomButton from "../components/ui-kit/CustomButton";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/welcomescreen-background.jpg")}
        alt="Photo de restaurant"
        resizeMode="cover"
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <View style={styles.content}>
            <Image
              source={require("../assets/logo-light.png")}
              alt="Logo"
              resizeMode="contain"
              style={styles.logo}
            />
            <Image
              source={require("../assets/gastronoquest-duo.png")}
              alt="GastronoQuest"
              resizeMode="contain"
              style={styles.title}
            />
            <View style={styles.card}>
              <Text style={styles.text}>
                Manger, c'est un plaisir. Manger éco-responsable, c'est un acte.
              </Text>
              <Text style={styles.text}>
                Savez-vous qu'en choisissant des restaurants engagés, vous
                réduisez jusqu'à 40% l'empreinte carbone de votre repas ?
              </Text>
            </View>
            <CustomButton
              title="Je découvre, je déguste, j'agis"
              variant="light"
              textSize={13}
              onPress={() => navigation.navigate("TabNavigator")}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "rgba(0,0,0, 0.50)",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    height: "80%",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: undefined,
    aspectRatio: 1,
  },
  title: {
    maxWidth: "100%",
    height: 50,
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    gap: 8,
    marginBottom: 30,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
