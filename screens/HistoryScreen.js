import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import CustomHistoryCard from "../components/ui-kit/CustomHistoryCard";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft } from "lucide-react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function HistoryScreen({ navigation }) {
  const token = useSelector((state) => state.user.value.token);

  const [quests, setQuests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle
  const questsPerPage = 3; // Nombre de quêtes à afficher par Page

  const scrollViewRef = useRef(null); // prépare la référence du scrollView pour afficher le haut de la page lors du clic sur le bouton de pagination

  useFocusEffect(
    //exécute le code à chaque fois que l'écran devient actif
    useCallback(() => {
      // ne réexécute la fonction que si le token change
      const fetchQuests = async () => {
        //récupérer l'historique des quêtes
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
            // Tri des quêtes du plus ancien au plus récent (inverse de la logique précédente)
            setQuests(data.data.reverse());
          }
        } catch (error) {
          console.error("Erreur lors du chargement des quêtes", error);
        }
      };

      fetchQuests();
    }, [token])
  );

  const hasQuest = quests && quests.length > 0;

  // Pagination: Calcul des quêtes à afficher
  const indexOfLastQuest = currentPage * questsPerPage; //calcule l'index de la dernière quête de la page actuelle
  const indexOfFirstQuest = indexOfLastQuest - questsPerPage; //calcule l'index de la première quête de la page actuelle
  const currentQuests = quests.slice(indexOfFirstQuest, indexOfLastQuest); //extrait les quêtes à afficher sur la page actuelle

  // Fonction pour naviguer entre les pages
  const goToNextPage = () => {
    //passe à la page suivante si la page actuelle n'affiche pas déjà les dernières quêtes.
    if (currentPage * questsPerPage < quests.length) {
      setCurrentPage(currentPage + 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true }); //fait défiler la vue vers le haut
    }
  };

  const goToPreviousPage = () => {
    //revient à la page précédente si la page actuelle n'est pas la première.
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true }); //fait défiler la vue vers le haut
    }
  };

  return (
    <View>
      <View style={styles.headerLeft}>
        <TouchableOpacity
          onPress={() => navigation.navigate("User", { screen: "UserScreen" })}
        >
          <ArrowLeft color={"black"} size={23} />
        </TouchableOpacity>
        <Text style={styles.title}>Mon Historique</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 100,
        }}
      >
        <View style={styles.cardContainer}>
          {!hasQuest ? (
            <Text style={styles.message}>Pas encore d’historique !</Text>
          ) : (
            currentQuests.map(
              (
                quest,
                index //Affiche les quêtes actuelles sur la page
              ) => (
                <CustomHistoryCard
                  key={index}
                  index={index}
                  restaurant={quest.restaurant}
                  achievedChallenges={quest.achievedChallenges}
                  navigation={navigation}
                />
              )
            )
          )}
        </View>

        {/* Pagination controls */}
        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={goToPreviousPage}
            disabled={currentPage === 1}
            style={[
              styles.paginationButton,
              currentPage === 1 ? styles.disabledButton : styles.activeButton, // Applique le style en fonction de l'état
            ]}
          >
            <Text style={styles.paginationButtonText}>Précédent</Text>
          </TouchableOpacity>

          {/* Affiche le numéro de la page actuelle et le nombre total de pages */}
          <Text style={styles.pageIndicator}>
            Page {currentPage} sur {Math.ceil(quests.length / questsPerPage)}
          </Text>

          <TouchableOpacity
            onPress={goToNextPage}
            disabled={currentPage * questsPerPage >= quests.length}
            style={[
              styles.paginationButton,
              currentPage * questsPerPage >= quests.length
                ? styles.disabledButton
                : styles.activeButton, // Applique le style en fonction de l'état
            ]}
          >
            <Text style={styles.paginationButtonText}>Suivant</Text>
          </TouchableOpacity>
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
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  paginationButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "#6ac46a", // Vert pour les boutons fonctionnels
  },
  disabledButton: {
    backgroundColor: "#c4c4c4", // Gris pour les boutons désactivés
  },
  paginationButtonText: {
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  pageIndicator: {
    marginHorizontal: 10,
  },
});
