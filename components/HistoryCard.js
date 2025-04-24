import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Check } from "lucide-react-native";
import { formatDate } from "../utils/formatDate";

export default function HistoryCard({
  restaurant,
  achievedChallenges,
  index,
  date,
  navigation,
}) {
  const totalCo2 = (achievedChallenges ?? []).reduce(
    (acc, quest) => acc + (quest.savedCo2 ?? 0),
    0
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Search", {
              screen: "RestaurantScreen",
              params: { restaurant: restaurant },
            })
          }
        >
          <Text style={styles.title}>{restaurant.name}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.imagePlaceholder}>
          <Image
            source={{ uri: restaurant.imageUrl }}
            alt="Restaurant"
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.info}>
          <Text style={{ fontSize: 14, color: "#37474f" }}>
            {formatDate(date)}
          </Text>

          <Text style={styles.co2}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {totalCo2.toFixed(2)}
            </Text>
            <Text style={{ fontWeight: "bold" }}>kg de CO₂ économisés</Text>
          </Text>

          {achievedChallenges.map((challenge, i) => (
            <View key={i} style={styles.checkItem}>
              <View style={styles.check}>
                <Check color="#fff" size={12} />
              </View>
              <Text style={styles.checkText}>{challenge.title}</Text>
            </View>
          ))}
          <View style={styles.messageContainer}>
            <Text style={styles.message}>Bravo ! 🎉</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    width: "90%",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
    marginLeft: 3,
    color: "#263238",
  },
  content: {
    flexDirection: "row",
    width: "100%",
  },
  imagePlaceholder: {
    width: 125,
    height: "100%",
  },
  image: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: "#eee",
  },
  info: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
    gap: 8,
  },
  co2: {
    fontSize: 16,
    color: "#263238",
  },
  checkItem: {
    flexDirection: "row",
  },
  checkText: {
    marginLeft: 10,
    color: "#37474f",
    fontSize: 14,
    flexShrink: 1,
  },
  check: {
    backgroundColor: "#6ac46a",
    width: 15,
    height: 15,
    borderRadius: 50,
    textAlign: "center",
    alignItems: "center",
    padding: 2,
    marginTop: 3,
  },
  nonCheck: {
    backgroundColor: "#e5685c",
    borderRadius: 50,
    padding: 2,
  },
  messageContainer: {
    marginLeft: "auto",
  },
  message: {
    fontSize: 18,
    fontWeight: "600",
    margin: 5,
  },
  liked: {
    backgroundColor: "#e5685c",
    borderRadius: 50,
    padding: 8,
  },
  notLiked: {
    backgroundColor: "#C4C4C4",
    borderRadius: 50,
    padding: 8,
  },
});
