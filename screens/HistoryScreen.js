import { StyleSheet, Text, View, ScrollView } from "react-native";
import CustomHistoryCard from "../components/ui-kit/CustomHistoryCard";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

export default function HistoryScreen() {
  const token = useSelector((state) => state.user.value.token);

  const [quests, setQuests] = useState([]);

  useEffect(() => {
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
  }, []);

  const hasQuest = quests && quests.length > 0;
  console.log("Quests data:", quests);
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <View style={styles.container}>
        <Text style={styles.title}> Mon Historique</Text>
        <CustomHistoryCard />
      </View>

      <View>
        {!hasQuest ? (
          <Text style={styles.message}>Pas encore d’historique !</Text>
        ) : (
          quests.map((quest, index) => (
            <CustomHistoryCard
              key={index}
              index={index}
              restaurant={quest.data.restaurant}
              achievedChallenges={quest.data.achievedChallenges}
              navigation={navigation}
            />
          ))
        )}
      </View>
    </ScrollView>
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
