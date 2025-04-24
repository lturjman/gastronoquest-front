// Définition de la route pour fetch des restaurants sur SearchScreen

export const getRoute = (searchInput, searchType, distance) => {
  if (searchInput.length === 0)
    return "geolocation";

  if (searchType === "restaurant")
    return "restaurant";

  if (searchType === "ville") {
    const isExact = distance === "Lieu exact" || distance === "";
    return isExact ? "address" : "coordinates";
  }
};