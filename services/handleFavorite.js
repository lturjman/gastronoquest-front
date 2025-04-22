import { saveGuestFavorite } from "../reducers/guest";
import { addFavorite, removeFavorite } from "../reducers/user";

export const handleFavorite = async (dispatch, navigation, token, restaurant, restaurantId, isFavorite) => {

  // Si l'utilisateur n'est pas connecté
  if (token === null) {
    console.log("Utilisateur pas connecté");
    dispatch(saveGuestFavorite(restaurantId));
    return navigation.navigate("Enter");
  }

  // Si l'utilisateur est connecté
  console.log("Utilisateur connecté");
  if (isFavorite) {
    // Le restaurant est déjà un favori et doit être supprimé des favoris
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/favorites`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json", authorization: token },
          body: JSON.stringify({ restaurantId }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`Fetch failed with status: ${response.status}`);
      }
  
      const data = await response.json();

      if (data.result) {
        dispatch(removeFavorite(restaurant));
      } else {
        throw new Error("Failed to delete favorite");
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
      throw error;
    }
  } else {
    // Le restaurant n'est pas déjà un favori et doit être ajouté aux favoris
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/favorites`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", authorization: token },
          body: JSON.stringify({ restaurantId }),
        }
      );

      if (!response.ok) {
        throw new Error(`Fetch failed with status: ${response.status}`);
      }
      
      const data = await response.json();

      if (data.result) {
        dispatch(addFavorite(restaurant));
      } else {
        throw new Error("Failed to save favorite");
      }
    
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  }
};