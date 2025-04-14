import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import CustomButton from "./components/ui-kit/CustomButton";
import CustomCard from "./components/ui-kit/CustomCard";
import CustomInput from "./components/ui-kit/CustomInput";
import CustomCheckbox from "./components/ui-kit/CustomCheckbox";

//imports for tab navigation
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomeScreen from "./screens/HomeScreen";
// import SearchScreen from "./screens/SearchScreen";
// import QuizScreen from "./screens/QuizScreen";
// import UserScreen from "./screens/UserScreen";

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <CustomButton title="Container Button" variant="light" />
        <CustomButton title="Container Button" variant="dark" />
        <CustomButton title="Container Button" variant="outline" />
        <CustomCard />
        <CustomCheckbox />

        <CustomInput
          placeholder="Placeholder"
          // value={text}
          // onChangeText={setText}
        />
      </SafeAreaView>
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
