import { StyleSheet, Platform, Text, View, SafeAreaView, ImageBackground, Image } from "react-native";
import CustomButton from "../components/ui-kit/CustomButton";

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/logo-light.png')} alt="Logo GastronoQuest" resizeMode="cover" style={{ height: 200, width: 200 }} />
      <Text>GastronoQuest</Text>
      <View style={styles.card}>
        <Text style={styles.text}>Manger, c'est un plaisir. Manger éco-responsable, c'est un acte.</Text>
        <Text style={styles.text}>Savez-vous qu'en choisissant des restaurants engagés, vous réduisez jusqu'à 40% l'empreinte carbone de votre repas ?</Text>
      </View>
      <CustomButton
        title="Je découvre, je déguste, j'agis"
        variant="light"
        textSize={14}
        onPress={() => navigation.navigate("TabNavigator")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    fontFamily: Platform.select({
      ios: "Helvetica Neue",
      android: "Roboto",
      default: "System",
    }),
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
