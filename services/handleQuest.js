import { saveGuestQuest } from "../reducers/guest";
import { addSavedCo2 } from "../reducers/user";
import { updateUserLevel } from "../reducers/user";

export const handleQuest = async (dispatch, navigation, token, restaurantId, achievedChallenges) => {
  // Transformation de la liste de challenges pour ne garder que les id
  const achievedChallengesId = achievedChallenges.map(
    (achievedChallenge) => achievedChallenge._id
  );

  // Si l'utilisateur n'est pas connecté
  if (!token || token === null) {
    console.log("Utilisateur pas connecté");
    const quest = {
      restaurant: restaurantId,
      achievedChallenges: achievedChallengesId,
      date: Date.now()
    };
    dispatch(saveGuestQuest(quest));
    console.log("dispatched");
    return navigation.navigate("UserScreen", { screen: "EnterScreen" });
    console.log("did not return");
  }

  // Si l'utilisateur est connecté
  console.log("Utilisateur connecté");
  try {
    // Envoi des défis
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/history`,
      {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurant: restaurantId,
          achievedChallenges: achievedChallengesId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (data.result) {
      // Si le fetch est réussi, on ajoute le CO2 économisé dans le store et redirection vers la home
      dispatch(addSavedCo2(data.totalSavedCo2));
      dispatch(updateUserLevel(data.level));
    } else {
      throw new Error("Failed to save new quest");
    }
  } catch (error) {
    console.error("Error saving new quest:", error);
    throw error;
  }
};