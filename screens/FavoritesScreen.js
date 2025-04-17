import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/ui-kit/CustomButton";
import CustomCard from "../components/ui-kit/CustomCard";
import user from "../reducers/user";

// const fetchFavorites = async () => {
//   const response = await fetch(
//     `${process.env.EXPO_PUBLIC_BACKEND_URL}/favorites`,
//     {
//       headers: { authorization: user.token },
//     }
//   );
//   const data = await response.json();
//   return data;
// };

export default function FavoritesScreen({ navigation }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const favorites = await fetchFavorites();
      setData(favorites);
      setLoading(false);
    };
    fetchData();
  }, []);

  let Message;
  if (!data || data.length === 0) {
    Message = "Aucun restaurant n'a encore été ajouté aux favoris";
  } else {
    Message = null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {Message ? (
          <Text>{Message}</Text>
        ) : (
          data.map((restaurant, index) => (
            <CustomCard
              key={index}
              title={restaurant.name}
              description={restaurant.description}
              image={restaurant.image}
              onPress={() =>
                navigation.navigate("RestaurantDetails", {
                  restaurantId: restaurant.id,
                })
              }
            />
          ))
        )}
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Rechercher des restaurants"
            onPress={() =>
              navigation.navigate("Search", { screen: "SearchScreen" })
            }
            textSize={13}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
