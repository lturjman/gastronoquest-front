import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform } from "react-native";

import { Leaf } from "lucide-react-native";
import { Heart } from "lucide-react-native";

import { useState } from "react";

// import { useNavigation } from "@react-navigation/native";

const CustomCard = () => {
  const [liked, setLiked] = React.useState(false);
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

      <View style={styles.noteContainer}>
        <Leaf color="#173e19" size={20} />
        <Leaf color="#173e19" size={20} />
        <Leaf color="#173e19" size={20} />
      </View>

      {/* Adresse */}
      <Text style={styles.address}>Adresse - rue</Text>
      <Text style={styles.address}>ACode postal - Ville</Text>

      {/* Badges */}
      <View style={styles.badgeContainer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Badge 1</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Badge 2</Text>
        </View>
      </View>

      {/* Types */}
      <View style={styles.badgeContainer}>
        <View style={styles.type}>
          <Text style={styles.typeText}>Type 1</Text>
        </View>
        <View style={styles.type}>
          <Text style={styles.typeText}>Type 2</Text>
        </View>
      </View>

      {/* Gamme de prix */}
      <View style={styles.priceTag}>
        <Text style={styles.priceText}>Gamme de prix</Text>
      </View>
    </View>
  );
};

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
    fontSize: 22,
    fontWeight: "bold",
    marginRight: 30,
  },
  address: {
    fontSize: 16,
    color: "#333",
  },
  badgeContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 6,
  },
  badge: {
    backgroundColor: "#1C3B1D",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "600",
  },
  type: {
    backgroundColor: "#6ac46a",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  typeText: {
    color: "#fff",
    fontWeight: "600",
  },
  priceTag: {
    marginTop: 8,
    alignSelf: "flex-start",
    backgroundColor: "#eee", //gris
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  priceText: {
    color: "#333",
    fontWeight: "600",
  },
});

export default CustomCard;
