import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Serie from "../components/Serie";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { updateQuiz } from "../reducers/quiz";
import { fetchGetQuizResults } from "../services/quizResultsServices";
import { useFocusEffect } from "@react-navigation/native";

// Fonction pour récupérer les quizz depuis le backend
const fetchQuiz = async () => {
  try {
    // Récupération des quiz
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/quizzes`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

// Fonction pour transformer les quizz récupérer et débloquer uniquement le premier quizz
const getQuizWithoutConnection = async () => {
  const quizData = await fetchQuiz();

  // Remise en ordre des quiz
  const quizDataSorted = quizData.quizzes.sort(
    (a, b) => a.quizNumber - b.quizNumber
  );

  // Modification des données à retourner pour spécifier le status du quiz
  return quizDataSorted.map((quiz) => {
    const { _id, title, difficulty, quizNumber } = quiz;
    // Comme l'utilisateur n'est pas connecté, on débloque uniquement le premier quizz
    let status = quizNumber === 1 ? "todo" : "blocked";
    return { _id, title, difficulty, quizNumber, status, score: 0 };
  });
};

// Fonction pour transformer les quizz en fonction des quiz réalisés par l'utilisateur
const getQuizWithConnection = async (token) => {
  // Récupération des quizz et des résultats de l'utilisateur
  const quizData = await fetchQuiz();
  const quizResultsData = await fetchGetQuizResults(token);

  // Remise en ordre des quizz pour avoir le bon ordre d'affichage
  const quizDataSorted = quizData.quizzes.sort(
    (a, b) => a.quizNumber - b.quizNumber
  );

  // Retourne une liste de quizz enrichie en fonction des données utilisateur
  return quizDataSorted.map((quiz) => {
    const { _id, title, difficulty, quizNumber } = quiz;
    let status;
    let score = 0;
    // Calcul du nombre de quizz réalisés pour savoir lequel doit être débloqué
    const quizzesNumberRealized = quizResultsData.data.filter(
      (quizResult) => quizResult.passed === true
    ).length;

    // Filtrage des résultats pour voir si le quizz qu'on cherche est mentionné
    const quizResultsFiltered = quizResultsData.data.filter(
      (quizResult) => quiz._id === quizResult.quiz
    );

    // Si le quizz est mentionné, il peut être uniquement en status validated ou toImprove
    if (quizResultsFiltered.length) {
      // Si le quizz est noté comme passed, il est validated, sinon on lui met un status toImprove
      status = quizResultsFiltered[0].passed ? "validated" : "toImprove";
      // On actualise le score en fonction des résultats
      score = quizResultsFiltered[0].score;
    } else {
      // Si on ne trouve pas le quizz dans les résultats, il doit être soit en blocked soit en todo
      if (quiz.quizNumber === quizzesNumberRealized + 1) {
        // On met un status todo au prochain quizz qui doit être réalisé
        status = "todo";
      } else {
        // Les autres quizz sont mis en blocked pour empêcher l'utilisateur de les réaliser
        status = "blocked";
      }
    }
    return { _id, title, difficulty, quizNumber, status, score };
  });
};

// Fonction pour récupérer les données d'un quiz à partir d'un id
const fetchQuizById = async (quizId) => {
  try {
    // Récupération des quizz
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/quiz/${quizId}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export default function QuizScreen({ navigation }) {
  // Récupérer les données de l'utilisateur
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  // State pour stocker les quizz et l'avancée
  const [quizzes, setQuizzes] = useState([]);

  // Redirection vers la page de question
  const handlePress = (quizId) => {
    fetchQuizById(quizId).then((response) => {
      if (response.result) {
        dispatch(updateQuiz(response.data));
        navigation.navigate("QuestionScreen");
      }
    });
  };

  // Chargement des quizz
  useFocusEffect(
    useCallback(() => {
      // Si l'utilisateur n'est pas connecté
      if (!user.token) {
        // On charge simplement les quiz et on débloque uniquement le premier
        getQuizWithoutConnection().then((dataQuizzes) =>
          setQuizzes(dataQuizzes)
        );
      } else {
        // Sinon on appelle la fonction qui charge les quizz et les résultats de l'utilisateur
        getQuizWithConnection(user.token).then((dataQuizzes) => {
          setQuizzes(dataQuizzes);
        });
      }
    }, [])
  );

  // Variable pour stocker le nombre de quizz réalisés
  const seriesNumberRealized = quizzes.filter(
    (quiz) => quiz.status === "validated"
  ).length;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mes Quizz</Text>
      <View style={styles.presentationContainer}>
        <View style={styles.seriesNumberContainer}>
          <Text style={{ fontSize: 20 }}>✅</Text>
          <Text style={{ fontWeight: 600, fontSize: 50 }}>
            {seriesNumberRealized}
          </Text>
          <View>
            <Text style={{ fontSize: 18 }}>
              {seriesNumberRealized > 1 ? "séries" : "série"}
            </Text>
            <Text style={{ fontSize: 18 }}>
              {seriesNumberRealized > 1 ? "réalisées" : "réalisée"}
            </Text>
          </View>
        </View>
        {user.token ? (
          <Text style={{ fontSize: 15, textAlign: "center" }}>
            {/* {levelIcons[user.level]} {user.level} */}
            Faire une série pour renforcer ses connaissances
          </Text>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("Enter")}>
            <Text
              style={{ textAlign: "center", textDecorationLine: "underline" }}
            >
              Se connecter pour sauvegarder son avancée
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        contentContainerStyle={{
          width: Dimensions.get("window").width,
          alignItems: "center",
        }}
      >
        <View style={styles.seriesContainer}>
          {quizzes.map((quiz) => (
            <Serie
              key={quiz._id}
              serieTitle={quiz.title}
              serieLevel={quiz.difficulty}
              serieId={quiz._id}
              score={quiz.score}
              variant={quiz.status}
              onPress={handlePress}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    maxWidth: "100%",
    fontSize: 30,
    fontWeight: "bold",
    margin: 10,
    textAlign: "center",
  },
  presentationContainer: {
    width: "70%",
    paddingBottom: 30,
    marginBottom: 30,
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
    alignItems: "center",
    gap: 20,
  },
  seriesContainer: {
    width: "90%",
    paddingBottom: 20,
  },
  seriesNumberContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
