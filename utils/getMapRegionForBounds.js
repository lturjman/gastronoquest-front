import { getCenter, getBounds } from 'geolib';

// #todo

export const getMapRegionForBounds = (restaurants) => {
  const coordinates = restaurants.map(restaurant => restaurant.coordinates);
  const center = getCenter(coordinates);
  const bounds = getBounds(coordinates);
  const region = {
    latitude: center.latitude,
    longitude: center.longitude,
    latitudeDelta: Math.abs(bounds.maxLat - bounds.minLat) * 1.5,
    longitudeDelta: Math.abs(bounds.maxLng - bounds.minLng) * 1.5
  };
}