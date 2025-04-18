import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Check } from "lucide-react-native";

const CustomHistoryCard = ({
  restaurant,
  achievedChallenges,
  indexn,
  navigation,
}) => {
  const totalCo2 = (achievedChallenges ?? []).reduce(
    (acc, quest) => acc + (quest.savedCo2 ?? 0),
    0
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("RestaurantScreen", { restaurant })
          }
        >
          <Text style={styles.title}>{restaurant.name}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.imagePlaceholder}>
          <Image
            source={{ uri: restaurant.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.co2}>
            <Text style={{ fontWeight: "bold" }}>
              {totalCo2.toFixed(2)} kg de CO₂ économisés
            </Text>
          </Text>

          {achievedChallenges.map((challenge, i) => (
            <View key={i} style={styles.checkItem}>
              <View style={styles.check}>
                <Check color="#fff" size={14} />
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
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#cfd8dc",
    borderRadius: 10,
    padding: 16,
    width: "90%",
    position: "relative",
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
    marginBottom: 12,
    color: "#263238",
  },
  content: {
    flexDirection: "row",
  },
  imagePlaceholder: {
    width: 125,
    height: 175,
  },
  image: {
    width: "90%",
    height: "100%",
    borderRadius: 4,
    backgroundColor: "#eee",
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  co2: {
    fontSize: 16,
    color: "#263238",
    marginBottom: 8,
  },
  checkItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  checkText: {
    marginLeft: 6,
    color: "#37474f",
    fontSize: 14,
  },
  messageContainer: {
    position: "absolute",
    bottom: 0,
    right: 10,
  },
  message: {
    fontSize: 18,
    fontWeight: "600",
    margin: 10,
  },
  check: {
    backgroundColor: "#6ac46a",
    borderRadius: 50,
    padding: 2,
  },
  nonCheck: {
    backgroundColor: "#e5685c",
    borderRadius: 50,
    padding: 2,
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

export default CustomHistoryCard;
