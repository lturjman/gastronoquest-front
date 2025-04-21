import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import CustomHistoryCard from "../components/ui-kit/CustomHistoryCard";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react-native";

import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import { useDispatch } from "react-redux";

export default function HistoryScreen({ navigation }) {
  const token = useSelector((state) => state.user.value.token);

  const [quests, setQuests] = useState([]);

  useFocusEffect(
    //permet d’exécuter du code chaque fois que ton écran devient actif
    useCallback(() => {
      // Garde cette fonction en mémoire tant que ses paramètres ne changent pas.
      const fetchQuests = async () => {
        try {
          const res = await fetch(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/history`,
            {
              headers: {
                "Content-Type": "application/json",
                authorization: token,
              },
            }
          );

          const data = await res.json();
          if (data.result && data.data) {
            setQuests(data.data);
          }
        } catch (error) {
          console.error("Erreur lors du chargement des quêtes", error);
        }
      };

      fetchQuests();
    }, [token])
  );

  const hasQuest = quests && quests.length > 0;
  console.log("Quests data:", quests);
  return (
    <View>
      <View style={styles.headerLeft}>
        <TouchableOpacity
          onPress={() => navigation.navigate("User", { screen: "UserScreen" })}
        >
          <ArrowLeft color={"black"} size={23} />
        </TouchableOpacity>
        <Text style={styles.title}> Mon Historique</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 100,
        }}
      >
        <View style={styles.cardContainer}>
          {!hasQuest ? (
            <Text style={styles.message}>Pas encore d’historique !</Text>
          ) : (
            quests.map((quest, index) => (
              <CustomHistoryCard
                key={index}
                index={index}
                restaurant={quest.restaurant}
                achievedChallenges={quest.achievedChallenges}
                navigation={navigation}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    maxWidth: "100%",
    fontSize: 30,
    fontWeight: "bold",
    margin: 10,
  },
  cardContainer: {
    gap: 10,
  },
});
