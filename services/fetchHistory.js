export const fetchHistory = async () => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/history`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Erreur lors du chargement des quêtes", error);
    throw error;
  }
};