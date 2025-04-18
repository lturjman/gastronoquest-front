import { StyleSheet, Text, View, Image, Modal } from "react-native";
import CustomButton from "../components/ui-kit/CustomButton";
import CustomInput from "../components/ui-kit/CustomInput";
import ErrorModal from "../components/ErrorModal.js";
import { useState } from "react";
import { isValidEmail } from "../utils/emailValidation.js";
import { isValidPassword } from "../utils/passwordValidation.js";
import { useDispatch } from "react-redux";
import { updateUser } from "../reducers/user.js";

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
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default function LoginScreen({ navigation }) {
  // States pour synchroniser les inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // States pour la modale d'erreur
  // const [modalVisible, setModalVisible] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  // Gérer la demande de connexion
  const handleSubmit = () => {
    const newErrors = [];
    // Afficher la modale si email invalide
    if (!email || !isValidEmail(email)) {
      // setErrorMessage("・ Veuillez saisir un email valide");
      // return setModalVisible(true);
      newErrors.push("Veuillez saisir un email valide");
    }

    // Afficher la modale si password invalide
    if (!password || !isValidPassword(password)) {
      // setErrorMessage("・ Veuillez saisir un mot de passe valide");
      // return setModalVisible(true);
      newErrors.push("Mot de passe incorrect");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setModalVisible(true);
      return;
    }

    // On fetch une fois les vérifications côtés client faites
    fetchLogin(email, password).then((response) => {
      if (response.result) {
        // Envoi des données en réponse dans le store redux
        dispatch(updateUser(response.data));
        // Redirection vers la home
        navigation.navigate("TabNavigator");
      } else if (response.error) {
        setErrors(["Echec de la connexion"]);
        setModalVisible(true);
      }
      // if (result.status === 400) {
      //   // Cas d'une erreur avec un email déjà utilisé
      //   setErrorMessage("Email inconnu");
      //   return setModalVisible(true);
      // } else if (result.status === 401) {
      //   // Cas d'une erreur avec un mauvais mot de passe
      //   setErrorMessage("Mot de passe incorrect");
      //   return setModalVisible(true);
      // } else if (result.status === 200) {
      //   // Connexion réussie
      //   // Envoi des données en réponse dans le store redux
      //   dispatch(updateUser(result.response.data));
      //   // Redirection vers la home
      //   navigation.navigate("TabNavigator");
      //   return;
      // } else {
      //   // Autre erreur
      //   setErrorMessage("Echec de la connexion");
      //   return setModalVisible(true);
      // }
    });
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <ErrorModal
          // errorMessage={errorMessage}
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
          onChangeText={(value) => setEmail(value)}
        />
        <CustomInput
          placeholder="Mot de passe"
          password={true}
          onChangeText={(value) => setPassword(value)}
        />
      </View>
      <View>
        <CustomButton title="Connexion" onPress={() => handleSubmit()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
