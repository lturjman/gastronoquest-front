import React from "react";

import { View, Text, StyleSheet, Platform, Pressable } from "react-native";

import { Lock, ArrowRight } from "lucide-react-native";

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

const Serie = ({ serieTitle, serieLevel, variant, score = 0, onPress }) => {
  const selectedVariant = variantStyles[variant];

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
      onPress={onPress}
    >
      <View style={styles.presentationSerieContainer}>
        <Text style={[styles.serieTitle, selectedVariant.fontColor]}>
          {serieTitle}
        </Text>
        <Text style={selectedVariant.fontColor}>{serieLevel}</Text>
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
    height: 80,
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
