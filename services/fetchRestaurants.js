export const fetchRestaurants = async (route, searchInput, distance, badges, types, priceRange) => {
  console.log("fetchRestaurants");

  // Construction du req.body
  const reqBody = {
    input: searchInput.trim(),
    badges,
    types,
    priceRange,
    distance: distance.replace(" km", ""),
  };
  if (route === "geolocation") reqBody.geolocation = userLocation;
  console.log("body:", reqBody);

  // Fetch
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BACKEND_URL + "/search/" + route,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
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