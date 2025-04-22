import React from "react";

import { View, Text, StyleSheet, Pressable } from "react-native";

import { Lock, ArrowRight } from "lucide-react-native";

// Liste des styles variables en fonction du status du quizz
const variantStyles = {
  validated: {
    backgroundSerie: {
      backgroundColor: "white",
    },
    backgroundScore: {
      backgroundColor: "#6ac46a",
    },
    fontColor: {
      color: "black",
    },
  },
  toImprove: {
    backgroundSerie: {
      backgroundColor: "white",
    },
    backgroundScore: {
      backgroundColor: "#e5685c",
    },
    fontColor: {
      color: "black",
    },
  },
  todo: {
    backgroundSerie: {
      backgroundColor: "white",
    },
    backgroundScore: {
      backgroundColor: "white",
    },
    fontColor: {
      color: "black",
    },
  },
  blocked: {
    backgroundSerie: {
      backgroundColor: "#F9F9F9",
    },
    backgroundScore: {
      backgroundColor: "#F9F9F9",
    },
    fontColor: {
      color: "gray",
    },
  },
};

// Liste des labels à afficher en fonction de la difficulté
const seriesLevelLabels = {
  Facile: "🟢 Facile",
  Moyen: "🟠 Moyen",
  Difficile: "🔴 Difficile",
};

const Serie = ({
  serieTitle,
  serieLevel,
  serieId,
  variant,
  score = 0,
  onPress,
}) => {
  // Récupération du style variable
  const selectedVariant = variantStyles[variant];

  // Gestion de l'affichage du score en fonction du status du quizz
  const scoreToDisplay = () => {
    if (variant === "blocked") {
      return <Lock size={20} color={"gray"} />;
    } else if (variant === "todo") {
      return <ArrowRight size={20} color={"black"} />;
    } else {
      return <Text style={styles.serieScore}>{score}/10</Text>;
    }
  };
  return (
    <Pressable
      style={[styles.serieContainer, selectedVariant.backgroundSerie]}
      disabled={variant === "blocked" ? true : false}
      onPress={() => onPress(serieId)}
    >
      <View style={styles.presentationSerieContainer}>
        <Text style={[styles.serieTitle, selectedVariant.fontColor]}>
          {serieTitle}
        </Text>
        <Text style={selectedVariant.fontColor}>
          {seriesLevelLabels[serieLevel]}
        </Text>
      </View>
      <View
        style={[styles.scoreSerieContainer, selectedVariant.backgroundScore]}
      >
        {scoreToDisplay()}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  serieContainer: {
    width: "100%",
    height: 70,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  presentationSerieContainer: {
    height: "100%",
    width: "75%",
    justifyContent: "center",
    paddingLeft: 20,
    gap: 5,
  },
  scoreSerieContainer: {
    width: "25%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
  },
  serieTitle: {
    fontWeight: 600,
    fontSize: 15,
  },
  serieScore: {
    fontSize: 15,
    fontWeight: 500,
  },
});

export default Serie;
