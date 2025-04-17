import { StyleSheet, Text, View, ScrollView } from "react-native";
import Serie from "../components/Serie";
import { useSelector } from "react-redux";

const levelIcons = {
  "jeune pousse": "🌱",
  curieux: "🍪",
  padawan: "🧑‍🎓",
  "maître jedi": "✨",
  "vieille branche": "🌳",
};

export default function QuizScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const handlePress = () => {
    navigation.navigate("QuestionScreen");
  };
  return (
    <View style={styles.container}>
      <View style={styles.presentationContainer}>
        <View style={styles.seriesNumberContainer}>
          <Text style={{ fontSize: 20 }}>✅</Text>
          <Text style={{ fontWeight: 600, fontSize: 50 }}>3</Text>
          <View>
            <Text style={{ fontSize: 18 }}>séries</Text>
            <Text style={{ fontSize: 18 }}>réalisées</Text>
          </View>
        </View>
        <Text style={{ fontSize: 15 }}>
          {levelIcons[user.level]} {user.level}
        </Text>
      </View>
      <ScrollView style={styles.seriesContainer}>
        <Serie
          serieTitle={"Cuisine écoresponsable"}
          serieLevel={"🔴 Difficile"}
          variant={"toImprove"}
          score={5}
          onPress={handlePress}
        />
        <Serie
          serieTitle={"Cuisine écoresponsable"}
          serieLevel={"🔴 Difficile"}
          variant={"validated"}
          score={10}
          onPress={handlePress}
        />
        <Serie
          serieTitle={"Cuisine écoresponsable"}
          serieLevel={"🔴 Difficile"}
          variant={"todo"}
          onPress={handlePress}
        />
        <Serie
          serieTitle={"Cuisine écoresponsable"}
          serieLevel={"🔴 Difficile"}
          variant={"blocked"}
          onPress={handlePress}
        />
        <Serie
          serieTitle={"Cuisine écoresponsable"}
          serieLevel={"🔴 Difficile"}
          variant={"blocked"}
          onPress={handlePress}
        />
        <Serie
          serieTitle={"Cuisine écoresponsable"}
          serieLevel={"🔴 Difficile"}
          variant={"blocked"}
          onPress={handlePress}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  presentationContainer: {
    width: "70%",
    paddingTop: 30,
    paddingBottom: 30,
    marginBottom: 30,
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
    alignItems: "center",
    gap: 20,
  },
  seriesContainer: {
    width: "90%",
    paddingLeft: 1,
    paddingRight: 1,
  },
  seriesNumberContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
