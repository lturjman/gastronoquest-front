// Chercher les restaurants dans un radius de 5km de l'utilisateur à l'initialisation du composant MapView

export const fetchRestaurantsAroundUser = async (location) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BACKEND_URL + "/search/geolocation",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ geolocation: location, distance: 5 }),
      }
    );

    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (data.result) {
      return data.restaurants;
    } else {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }

  } catch (error) {
    throw error;
  }
};
