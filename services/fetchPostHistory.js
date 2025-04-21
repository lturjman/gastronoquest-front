
export const fetchPostHistory = async (token, restaurantId, achievedChallenges) => {
  try {
    // Transformation de la liste de challenges pour ne garder que les id
    const achievedChallengesId = achievedChallenges.map(
      (achievedChallenge) => achievedChallenge._id
    );

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

    return await response.json();

  } catch (error) {
    console.error("Error saving new quest:", error);
    throw error;
  }
};