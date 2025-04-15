import { StyleSheet, Text, View, Image } from "react-native";
import CustomButton from "../components/ui-kit/CustomButton";
import CustomInput from "../components/ui-kit/CustomInput";
import { useState } from "react";
import { isValidEmail } from "../utils/emailValidation.js";
import { useDispatch } from "react-redux";
import { updateUser } from "../reducers/user.js";

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
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default function LoginScreen({ navigation }) {
  // States pour synchroniser les inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // States pour afficher ou non les messages d'erreur de connexion
  const [isCorrectEmail, setIsCorrectEmail] = useState(true);
  const [isCorrectPassword, setIsCorrectPassword] = useState(true);

  const dispatch = useDispatch();

  // Gérer la demande d'inscription
  const handleSubmit = () => {
    // Vérifier qu'on a bien les éléments nécessaires
    if (email || isValidEmail(email) || password) {
      // Appel de la fonction pour fetch vers le back
      fetchLogin(email, password).then((response) => {
        if (response.result) {
          // Envoi des données en réponse dans le store redux
          dispatch(updateUser(response.data));
          // Redirection vers la home
          navigation.navigate("TabNavigator");
        }
      });
    } else if (!email || !isValidEmail) {
      // Afficher le message d'erreur pour l'email
      setIsCorrectEmail(false);
    } else {
      // Afficher le message d'erreur pour le mot de passe
      setIsCorrectPassword(false);
    }
  };

  return (
    <View style={styles.container}>
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
        {!isCorrectEmail && (
          <Text style={styles.invalidText}>
            Veuillez saisir une email valide
          </Text>
        )}
        <CustomInput
          placeholder="Mot de passe"
          password={true}
          onChangeText={(value) => setPassword(value)}
        />
        {!isCorrectPassword && (
          <Text style={styles.invalidText}>
            Veuillez saisir un mot de passe valide
          </Text>
        )}
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
  invalidText: {
    color: "red",
  },
});
