import { StyleSheet, Text, View } from "react-native";

export default function FavoritesScreen() {
  if (FavoritesScreen.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Aucun restaurant n'a encore été ajouté en favoris</Text>
        <CustomButton
          title="Rechercher des restaurants"
          onPress={onPress}
          textSize={13}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>FavoritesScreen</Text>
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
});
