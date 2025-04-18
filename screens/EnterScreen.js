import { StyleSheet, Text, View, Image, Platform } from "react-native";
import CustomButton from "../components/ui-kit/CustomButton";

export default function EnterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo-dark.png")}
          alt="Logo GastronoQuest"
          resizeMode="contain"
          style={styles.logo}
        />
        <Image
          source={require("../assets/gastronoquest-darkgreen.png")}
          alt="Logo GastronoQuest"
          resizeMode="contain"
          style={styles.title}
        />
      </View>
      <Text style={styles.text}>
        🚀 Prêt à relever de nouveaux défis à nos côtés ?
      </Text>
      <View style={styles.btnContainer}>
        <View style={styles.loginRegisterBtnContainer}>
          <CustomButton
            title="Inscription"
            variant="outline"
            textSize={15}
            onPress={() => navigation.navigate("Register")}
          />
          <CustomButton
            title="Connexion"
            variant="outline"
            textSize={15}
            onPress={() => navigation.navigate("Login")}
          />
        </View>
        <View style={styles.googleBtnContainer}>
          <CustomButton
            title="Continuer avec Google"
            variant="dark"
            textSize={15}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: undefined,
    aspectRatio: 1,
  },
  title: {
    maxWidth: "100%",
    height: 30,
  },
  text: {
    fontWeight: "bold",
    width: "80%",
    textAlign: "center",
    fontFamily: Platform.select({
      ios: "Helvetica Neue",
      android: "Roboto",
      default: "System",
    }),
  },
  btnContainer: {
    justifyContent: "center",
    width: "80%",
  },
  loginRegisterBtnContainer: {
    gap: 10,
  },
  googleBtnContainer: {
    borderTopColor: "lightgray",
    borderTopWidth: 1,
    paddingTop: 30,
    marginTop: 30,
  },
});
