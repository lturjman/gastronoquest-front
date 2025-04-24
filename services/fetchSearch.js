// Fetch dynamique pour récupérer des résultats de recherche de restaurants
export const fetchSearch = async (route, body) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BACKEND_URL + "/search/" + route,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Recherche un restaurant par géolocalisation
export const fetchSearchGeolocalisation = async (location) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BACKEND_URL + "/search/geolocation",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ geolocation: location, distance: 5 }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
