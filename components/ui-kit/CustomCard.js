import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { Leaf, Heart } from "lucide-react-native";
// import { useNavigation } from "@react-navigation/native";


export default function CustomCard() {
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.card}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Nom du restaurant</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => setLiked(!liked)}>
            <Heart color={liked ? "#e53935" : "#173e19"} size={30} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Score Ecotables */}
      <View style={styles.noteContainer}>
        <Leaf color="#173e19" size={20} />
        <Leaf color="#173e19" size={20} />
        <Leaf color="#173e19" size={20} />
      </View>

      {/* Adresse */}
      <Text style={styles.address}>Adresse</Text>

      {/* Badges */}
      <View style={styles.tagContainer}>
        <View style={[styles.tag, styles.badge]}>
          <Text style={styles.tagText}>Badge 1</Text>
        </View>
        <View style={[styles.tag, styles.badge]}>
          <Text style={styles.tagText}>Badge 2</Text>
        </View>
      </View>

      {/* Types */}
      <View style={styles.tagContainer}>
        <View style={[styles.tag, styles.type]}>
          <Text style={styles.tagText}>Type 1</Text>
        </View>
        <View style={[styles.tag, styles.type]}>
          <Text style={styles.tagText}>Type 2</Text>
        </View>
      </View>

      {/* Gamme de prix */}
      <View style={styles.tagContainer}>
        <View style={[styles.tag, styles.price]}>
          <Text style={styles.priceText}>Gamme de prix</Text>
        </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    margin: 20,
    gap: 8,
    fontFamily: Platform.select({
      ios: "Helvetica Neue",
      android: "Roboto",
      default: "System",
    }),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  noteContainer: {
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 30,
  },
  address: {
    fontSize: 15,
    color: "#333",
  },
  tagContainer: {
    flexDirection: "row",
    gap: 8,
  },
  tag: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  badge: {
    backgroundColor: "#1C3B1D",
  },
  type: {
    backgroundColor: "#6ac46a",
  },
  tagText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  price: {
    backgroundColor: "#eee", //gris
  },
  priceText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
});


// const CustomCard = ({ restaurant }) => {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.card}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Pressable
//           onPress={() =>
//             navigation.navigate("RestaurantScreen", { restaurant })
//           }
//         >
//           <Text style={styles.title}>{restaurant.name}</Text>
//         </Pressable>
//         <View style={styles.headerRight}>
//           <TouchableOpacity>
//             <Heart color="#173e19" size={30} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.noteContainer}>
//         <Leaf color="#173e19" size={20} />
//         <Leaf color="#173e19" size={20} />
//         <Leaf color="#173e19" size={20} />
//       </View>

//       {/* Adresse */}
//       <Text style={styles.address}>{restaurant.address}</Text>

//       {/* Badges */}
//       <View style={styles.badgeContainer}>
//         <View style={styles.badge}>
//           <Text style={styles.badgeText}>Badge 1</Text>
//         </View>
//         <View style={styles.badge}>
//           <Text style={styles.badgeText}>Badge 2</Text>
//         </View>
//       </View>

//       {/* Types */}
//       <View style={styles.badgeContainer}>
//         <View style={styles.type}>
//           <Text style={styles.typeText}>Type 1</Text>
//         </View>
//         <View style={styles.type}>
//           <Text style={styles.typeText}>Type 2</Text>
//         </View>
//       </View>

//       {/* Gamme de prix */}
//       <View style={styles.priceTag}>
//         <Text style={styles.priceText}>G{restaurant.priceRange}</Text>
//       </View>
//     </View>
//   );
// };