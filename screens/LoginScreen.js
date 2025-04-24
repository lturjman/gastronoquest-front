import {
  StyleSheet,
  View,
  Image,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CustomButton from "../components/ui-kit/CustomButton";
import CustomInput from "../components/ui-kit/CustomInput";
import ErrorModal from "../components/ErrorModal.js";
import { useState } from "react";
import { isValidEmail } from "../utils/emailValidation.js";
import { isValidPassword } from "../utils/passwordValidation.js";
import { useDispatch } from "react-redux";
import { updateUser } from "../reducers/user.js";
import { SafeAreaView } from "react-native-safe-area-context";

// Fetch la route login du backend
const fetchLogin = async (email, password) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    // Retourne le status de la réponse en plus pour ajuster les messages d'erreur en fonction
    return { status: response.status, data };
  } catch (error) {
    console.error(error);
  }
};

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  // States pour synchroniser les inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // States pour la modale d'erreur
  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState([]);

  // Gérer la demande de connexion
  const handleLogin = () => {
    const newErrors = [];

    // Afficher la modale si email invalide
    if (!email || !isValidEmail(email)) {
      newErrors.push("Veuillez saisir un email valide");
    }

    // Afficher la modale si password invalide
    if (!password || !isValidPassword(password)) {
      newErrors.push("Mot de passe incorrect");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setModalVisible(true);
      return;
    }

    // On fetch une fois les vérifications côtés client faites
    fetchLogin(email, password).then((response) => {
      const { status, data } = response;

      if (status === 200 && data.result) {
        dispatch(updateUser(data.data));
        navigation.navigate("TabNavigator");
      } else {
        // Gère les erreurs backend avec le même tableau newErrors
        if (status === 400) {
          newErrors.push("Email inconnu");
        } else if (status === 401) {
          newErrors.push("Mot de passe incorrect");
        } else {
          newErrors.push("Échec de la connexion");
        }

        setErrors(newErrors);
        setModalVisible(true);
      }
    });
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.mainContainer}
      >
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <ErrorModal
            errorMessage={errors.join("\n")}
            onPress={() => setModalVisible(false)}
          />
        </Modal>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo-dark.png")}
            alt="Logo GastronoQuest"
            resizeMode="contain"
            style={styles.logo}
          />
          <Image
            source={require("../assets/gastronoquest-darkgreen.png")}
            alt="Logo GastronoQuest"
            resizeMode="contain"
            style={styles.title}
          />
        </View>
        <View>
          <CustomInput
            placeholder="Email"
            type="email"
            autoCapitalize="none"
            onChangeText={(value) => setEmail(value)}
          />
          <CustomInput
            placeholder="Mot de passe"
            password={true}
            onChangeText={(value) => setPassword(value)}
          />
        </View>
        <View>
          <CustomButton title="Connexion" onPress={() => handleLogin()} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: undefined,
    aspectRatio: 1,
  },
  title: {
    maxWidth: "100%",
    height: 30,
  },
});
