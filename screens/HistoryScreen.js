import { StyleSheet, Text, View } from "react-native";
import CustomHistoryCard from "../components/ui-kit/CustomHistoryCard";

const restaurant = {
  name: "Restaurant Name",
  imageUrl: "https://example.com/image.jpg",
};

const challenges = [
  { name: "Challenge 1", completed: true, co2Saved: 10 },
  { name: "Challenge 2", completed: false, co2Saved: 3 },
];

// Fonction pour récupérer l'historique de l'utilisateur
const fetchHistory = async (token) => {
  // Récupération de l'historique
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/history`,
    {
      headers: { authorization: token },
    }
  );
  const data = await response.json();
  return data;
};

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Mon Historique</Text>
      <CustomHistoryCard />
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
  title: {
    maxWidth: "100%",
    fontSize: 30,
    fontWeight: "bold",
    margin: 10,
  },
});
