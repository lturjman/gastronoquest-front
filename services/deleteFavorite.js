export const deleteFavorite = async (token, restaurantId) => {
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
    return await response.json();
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};