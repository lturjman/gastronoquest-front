import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Linking,
} from "react-native";

import CustomButton from "./ui-kit/CustomButton";

// Modale que l'on affiche une fois qu'on a répondu à une question sur un quizz
const QuestionResultModal = ({
  comment,
  rightAnswer,
  articleUrl,
  isGoodAnswer,
  onPress,
  visible = true,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            {/* Phrase qui annonce si la réponse est bonne */}
            <Text
              style={{ fontWeight: "bold", fontSize: 18, color: "#173e19" }}
            >
              {isGoodAnswer ? "Bonne réponse 🥳" : "Mauvaise Réponse ☹️"}
            </Text>
            {/* On affiche la bonne réponse si l'utilisateur s'est trompé */}
            {!isGoodAnswer && (
              <Text style={{ textAlign: "center" }}>
                La bonne réponse était : {rightAnswer}
              </Text>
            )}
            {/* Explication de la réponse */}
            <Text style={{ textAlign: "center" }}>{comment}</Text>
            {/* Lien cliquable vers la ressource web */}
            <TouchableOpacity onPress={() => Linking.openURL(articleUrl)}>
              <Text
                style={{ textDecorationLine: "underline", color: "#173e19" }}
              >
                En savoir plus
              </Text>
            </TouchableOpacity>
            {/* Bouton pour passer à la question suivante */}
            <CustomButton
              title="Question suivante"
              onPress={() => onPress(isGoodAnswer)}
              variant="light"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    margin: 20,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
export default QuestionResultModal;
