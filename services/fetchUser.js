// Fetch la route login du backend pour connexion du user
export const fetchLogin = async (email, password) => {
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

// Fetch la route register pour inscrire le user
export const fetchRegister = async (username, email, password, guest) => {
  try {
    let reqBody = { username, email, password };
    if (guest.favorite) reqBody.favorite = guest.favorite;
    if (guest.quest) reqBody.quest = guest.quest;
    if (guest.quiz) reqBody.quiz = guest.quiz;
    console.log("body:", reqBody);

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/users/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      }
    );

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
