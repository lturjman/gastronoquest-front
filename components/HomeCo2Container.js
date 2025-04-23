import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import { Animated } from "react-native";
import CustomButton from "../components/ui-kit/CustomButton";

import { useEffect, useRef } from "react";

const { width, height } = Dimensions.get("window");

export default function HomeCo2Container({ user }) {
  const progress = useRef(new Animated.Value(0)).current; // Animation du niveau de progression

  const totalSaved = user.totalSavedCo2; // total CO2 éonomisé par l'utilisateur
  const userLevel = user.level.currentLevel.level; // Niveau actuel
  const levelIcon = user.level.currentLevel.icon; // Icône correspondante
  const nextLevelInfo = user.level.nextLevel; // Prochain niveau
  const progressPercentage = user.level.progressPercentage; // Pourcentage progression

  // À chaque changement de CO2 économisé, anime la barre de progression
  useEffect(() => {
    Animated.timing(progress, {
      toValue: progressPercentage,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progressPercentage]);
  return (
    <>
      {/* Infos CO2 + icône de niveau */}
      <View style={styles.co2Section}>
        <View style={styles.roundWrapper}>
          <View style={styles.co2StatsWrapper}>
            <View style={styles.co2ValueText}>
              <Text style={{ fontSize: 26, fontWeight: "bold" }}>
                {totalSaved}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "700" }}>kg</Text>
            </View>
            <Text style={styles.co2SavedTextInRound}>de CO2 économisés</Text>
          </View>

          {/* Icone plante */}

          <Text style={styles.bigPlantLevelIcon}>{levelIcon}</Text>
        </View>

        {/* Texte explicatif */}

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Relever des défis, collecter du CO₂ et faire grandir sa plante à
            chaque palier atteint !
          </Text>
        </View>
      </View>

      {/* Affichage du niveau + barre de progression */}

      <View style={styles.levelLabelSection}>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={styles.levelLabel}>
            Niveau : {levelIcon} {userLevel}
          </Text>
        </View>

        {/* Barre animée */}

        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: progress.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>

        {/* Message pour prochain niveau */}
        {nextLevelInfo && (
          <Text style={styles.nextLevelLabel}>
            Plus que {nextLevelInfo.remaining}kg pour atteindre{" "}
            {nextLevelInfo.nextLevel} {nextLevelInfo.icon}
          </Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  co2Section: {
    alignItems: "center",
    gap: 20,
  },
  // alignement horizontal des deux ronds (C02 + plante)
  roundWrapper: {
    flexDirection: "row",
  },
  co2StatsWrapper: {
    borderColor: "#6AC46A",
    borderWidth: 2,
    borderRadius: 75,
    aspectRatio: 1,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    padding: 20,
  },

  co2ValueText: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 3,
  },
  co2SavedTextInRound: {
    color: "#565656",
    fontSize: 14,
    width: "90%",
    textAlign: "center",
  },

  // icon de la grande plante à faire pousser (icon niveau actuel)
  bigPlantLevelIcon: {
    fontSize: 50,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#DBF2D6",
    paddingVertical: 15,
    borderRadius: 150,
    marginLeft: -15,
    height: 130,
    aspectRatio: 1,
  },
  // encars gris de description
  description: {
    fontSize: 13,
    color: "#333333",
    textAlign: "center",
  },
  descriptionContainer: {
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    padding: 10,
  },

  // Niveau actuel
  levelLabelSection: {
    justifyContent: "center",
    alignItems: "center",
    gap: 13,
  },
  levelLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },
  nextLevelLabel: {
    fontSize: 14,
    color: "#565656",
    textAlign: "center",
  },
  // BAR DE PROGRESSION DYNAMIQUE
  progressBarBackground: {
    width: 200,
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 5,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#6AC46A",
    borderRadius: 10,
  },
});
