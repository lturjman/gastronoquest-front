import { SafeAreaView, StyleSheet } from "react-native";
import { House, Utensils, Brain, CircleUserRound } from "lucide-react-native";

// Imports pour la tab navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import QuizScreen from "./screens/QuizScreen";
import UserScreen from "./screens/UserScreen";

// Imports pour la stack navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EnterScreen from "./screens/EnterScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import HistoryScreen from "./screens/HistoryScreen";
import LoginScreen from "./screens/LoginScreen";
import QuestionScreen from "./screens/QuestionScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

// Imports pour le store redux
import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";

// Configuration de la naviguation
// Création de "groupes d'écrans" pour garder l'icône active sur des sous-écrans
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const SearchStack = createNativeStackNavigator();
const QuizStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();

const SearchStackScreens = () => (
  <SearchStack.Navigator screenOptions={{ headerShown: false }}>
    <SearchStack.Screen name="SearchScreen" component={SearchScreen} />
    <SearchStack.Screen name="RestaurantScreen" component={RestaurantScreen} />
  </SearchStack.Navigator>
);

const QuizStackScreens = () => (
  <QuizStack.Navigator screenOptions={{ headerShown: false }}>
    <QuizStack.Screen name="QuizScreen" component={QuizScreen} />
    <QuizStack.Screen name="QuestionScreen" component={QuestionScreen} />
  </QuizStack.Navigator>
);

const UserStackScreens = () => (
  <UserStack.Navigator screenOptions={{ headerShown: false }}>
    <UserStack.Screen name="UserScreen" component={UserScreen} />
    <UserStack.Screen name="EnterScreen" component={EnterScreen} />
    <UserStack.Screen name="FavoritesScreen" component={FavoritesScreen} />
    <UserStack.Screen name="HistoryScreen" component={HistoryScreen} />
  </UserStack.Navigator>
);

const TabNavigator = () => {
  const user = useSelector((state) => state.user.value);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") {
            return <House size={size} color={color} />;
          } else if (route.name === "Search") {
            return <Utensils size={size} color={color} />;
          } else if (route.name === "Quiz") {
            return <Brain size={size} color={color} />;
          } else if (route.name === "User") {
            return <CircleUserRound size={size} color={color} />;
          } else if (route.name === "Enter") {
            return <CircleUserRound size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "#6ac46a",
        tabBarInactiveTintColor: "#173e19",
        tabBarShowLabel: false, // Enlever l'affichage des labels
        tabBarItemStyle: {
          paddingTop: 5, // Ajout de padding pour centrer les icônes (le flex n'a pas l'air de fonctionner...)
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchStackScreens} />
      <Tab.Screen name="Quiz" component={QuizStackScreens} />
      {user.token === null ? (
        <Tab.Screen
          name="Enter"
          component={EnterScreen}
          options={{ tabBarStyle: { display: "none" } }}
        />
      ) : (
        <Tab.Screen name="User" component={UserStackScreens} />
      )}
    </Tab.Navigator>
  );
};

// Configuration du store redux
const store = configureStore({
  reducer: { user },
});

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
