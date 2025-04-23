import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/ui-kit/CustomButton";

export default function EnterScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo-dark.png")}
          alt="Logo"
          resizeMode="contain"
          style={styles.logo}
        />
        <Image
          source={require("../assets/gastronoquest-darkgreen.png")}
          alt="GastronoQuest"
          resizeMode="contain"
          style={styles.title}
        />
      </View>
      <Text style={styles.text}>
        🚀 Prêt·e à relever de nouveaux défis à nos côtés ?
      </Text>
      <View style={styles.btnContainer}>
        <View style={styles.loginRegisterBtnContainer}>
          <CustomButton
            title="Inscription"
            variant="outline"
            onPress={() => navigation.navigate("Register")}
          />
          <CustomButton
            title="Connexion"
            variant="dark"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </SafeAreaView>
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
  },
  btnContainer: {
    justifyContent: "center",
    width: "80%",
  },
  loginRegisterBtnContainer: {
    gap: 10,
  },
});
