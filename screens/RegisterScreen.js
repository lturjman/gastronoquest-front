import { StyleSheet, Text, View, Image, Modal } from "react-native";
import CustomButton from "../components/ui-kit/CustomButton";
import CustomInput from "../components/ui-kit/CustomInput";
import { useState } from "react";
import ErrorModal from "../components/ErrorModal.js";
import { isValidEmail } from "../utils/emailValidation.js";
import { isValidPassword } from "../utils/passwordValidation.js";
import { useDispatch } from "react-redux";
import { updateUser } from "../reducers/user.js";

const fetchRegister = async (username, email, password) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/users/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default function RegisterScreen({ navigation }) {
  // States pour synchroniser les inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // States pour afficher ou non les messages d'erreur de connexion
  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  // Gérer la demande d'inscription
  const handleSubmit = () => {
    const newErrors = [];

    if (!username) {
      newErrors.push("Veuillez saisir un nom d'utilisateur");
    }
    if (!email || !isValidEmail(email)) {
      newErrors.push("Veuillez saisir un email valide");
    }
    if (!password || !isValidPassword(password)) {
      newErrors.push(
        "Veuillez saisir un mot de passe contenant au moins 8 caractères, une majuscule, une minuscule et un caractère spécial"
      );
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setModalVisible(true);
      return;
    }
    const handleApiErrors = (responseError) => {
      const apiErrors = [];

      if (responseError === "Email already exists") {
        apiErrors.push("Cette adresse email est déjà utilisée");
      } else {
        apiErrors.push("Une erreur est survenue lors de l'inscription");
      }

      return apiErrors;
    };

    // Appel de la fonction pour fetch vers le back
    fetchRegister(username, email, password).then((response) => {
      if (response.result) {
        // Envoi des données en réponse dans le store redux
        dispatch(updateUser(response.data));
        // Redirection vers la home
        navigation.navigate("TabNavigator");
      } else if (response.error) {
        setErrors(["Cet email est déjà utilisé"]);
        setModalVisible(true);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <ErrorModal
          errorMessage={errors.join("\n")}
          onPress={() => setModalVisible(false)}
          visible={modalVisible}
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
          placeholder="Nom d'utilisateur"
          type="username"
          onChangeText={(value) => setUsername(value)}
        />
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
        <CustomButton title="Inscription" onPress={() => handleSubmit()} />
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
  invalidText: {
    color: "red",
  },
});
