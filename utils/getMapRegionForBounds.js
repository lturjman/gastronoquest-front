import { getCenter, getBounds } from 'geolib';

// Calcul de la région vers laquelle naviguer sur MapView pour afficher tous les résultats de la recherche de restaurant

export const getMapRegionForBounds = (restaurants) => {
  const coordinates = restaurants.map(restaurant => restaurant.coordinates);
  const center = getCenter(coordinates);
  const bounds = getBounds(coordinates);
  return {
    latitude: center.latitude,
    longitude: center.longitude,
    latitudeDelta: Math.abs(bounds.maxLat - bounds.minLat) * 1.5,
    longitudeDelta: Math.abs(bounds.maxLng - bounds.minLng) * 1.5
  };
};