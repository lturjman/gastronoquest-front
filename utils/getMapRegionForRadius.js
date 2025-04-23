// Calcul de la région vers laquelle naviguer sur MapView pour afficher tous les résultats de la recherche de restaurants à une certaine distance d'un point

export const getMapRegionForRadius = (latitude, longitude, radiusInKm, marginFactor = 1.5) => {
  const diameter = radiusInKm * 2 * marginFactor;
  const latitudeDelta = diameter / 111;
  const longitudeDelta = diameter / (111 * Math.cos(latitude * Math.PI / 180));
  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta
  };
};