import {
  StyleSheet,
  View,
  Image,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import CustomButton from "../components/ui-kit/CustomButton";
import CustomInput from "../components/ui-kit/CustomInput";
import ErrorModal from "../components/ErrorModal.js";
import { isValidEmail } from "../utils/emailValidation.js";
import { isValidPassword } from "../utils/passwordValidation.js";
import { updateUser } from "../reducers/user.js";
import { clearGuestData } from "../reducers/guest.js";
import { fetchRegister } from "../services/fetchUser.js";

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const guest = useSelector((state) => state.guest.value);

  // States pour synchroniser les inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // States pour afficher ou non les messages d'erreur de connexion
  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState([]);

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

    // Appel de la fonction pour fetch vers le back
    fetchRegister(username, email, password, guest).then((response) => {
      if (response.result) {
        // Envoi des données en réponse dans le store Redux
        dispatch(updateUser(response.data));
        dispatch(clearGuestData());
        // Redirection vers la home
        navigation.navigate("TabNavigator");
      } else if (response.error) {
        setErrors(["Cet email est déjà utilisé"]);
        setModalVisible(true);
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
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
          <CustomButton title="Inscription" onPress={() => handleSubmit()} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
