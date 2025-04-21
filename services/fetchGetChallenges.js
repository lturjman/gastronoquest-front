export const fetchGetChallenges = async () => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/challenges`
    );
    
    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Error getting challenges:", error);
    throw error;
  }
};