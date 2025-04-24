import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HistoryCard from "../components/HistoryCard";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { fetchHistory } from "../services/fetchHistory";

export default function HistoryScreen({ navigation }) {
  const token = useSelector((state) => state.user.value.token);
  const [quests, setQuests] = useState([]);
  const hasQuest = quests && quests.length > 0;

  const [currentPage, setCurrentPage] = useState(1);   // État pour la page actuelle
  const questsPerPage = 3;   // Nombre de quêtes à afficher par Page
  const scrollViewRef = useRef(null);   // prépare la référence du scrollView pour afficher le haut de la page lors du clic sur le bouton de pagination

  // Pagination : calcul des quêtes à afficher
  const indexOfLastQuest = currentPage * questsPerPage;   // calcule l'index de la dernière quête de la page actuelle
  const indexOfFirstQuest = indexOfLastQuest - questsPerPage;   // calcule l'index de la première quête de la page actuelle
  const currentQuests = quests.slice(indexOfFirstQuest, indexOfLastQuest);   // extrait les quêtes à afficher sur la page actuelle

  // Fonctions pour naviguer entre les pages
  const goToNextPage = () => {
    // Passer à la page suivante si la page actuelle n'affiche pas déjà les dernières quêtes
    if (currentPage * questsPerPage < quests.length) {
      setCurrentPage(currentPage + 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });   // fait défiler la vue vers le haut
    }
  };

  const goToPreviousPage = () => {
    // Revenir à la page précédente si la page actuelle n'est pas la première
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });   // fait défiler la vue vers le haut
    }
  };

  // Récupération de l'historique à l'initialisation du composant
  useEffect(() => {
    fetchHistory(token)
    .then((data) => {
      if (data.result && data.data) {
        // Tri des quêtes de la plus récente à la plus ancienne
        setQuests(data.data.reverse());
      }
    })
    .catch((error) => console.error(error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
          paddingBottom: 20,
          paddingTop: 2,
        }}
      >
        <View style={styles.cardContainer}>
          {!hasQuest ? (
            <Text style={styles.noHistoryMessage}>
              Pas encore d’historique !
            </Text>
          ) : (
            currentQuests.map(
              (
                quest,
                index //Affiche les quêtes actuelles sur la page
              ) => (
                <HistoryCard
                  key={index}
                  index={index}
                  restaurant={quest.restaurant}
                  date={quest.date}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
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
  noHistoryMessage: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
