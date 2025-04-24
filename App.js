import { StatusBar } from "react-native";
import { House, Utensils, Brain, CircleUserRound } from "lucide-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import user from "./reducers/user";
import quiz from "./reducers/quiz";
import guest from "./reducers/guest";

// Imports pour la persistance du store
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configuration de la naviguation
// Création de "groupes d'écrans" pour garder l'icône active (avec sa couleur vert clair) sur des sous-écrans
// L'application est basée sur une nested naviguation, et la partie Tab navigation est découpée par groupe d'écrans pour la raison évoquée ci-dessus
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const SearchStack = createNativeStackNavigator();
const QuizStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();

// Groupe d'écrans lié à la recherche de restaurants
const SearchStackScreens = () => (
  <SearchStack.Navigator screenOptions={{ headerShown: false }}>
    <SearchStack.Screen name="SearchScreen" component={SearchScreen} />
    <SearchStack.Screen name="RestaurantScreen" component={RestaurantScreen} />
  </SearchStack.Navigator>
);

// Groupe d'écrans lié aux quizz
const QuizStackScreens = () => (
  <QuizStack.Navigator screenOptions={{ headerShown: false }}>
    <QuizStack.Screen name="QuizScreen" component={QuizScreen} />
    <QuizStack.Screen name="QuestionScreen" component={QuestionScreen} />
  </QuizStack.Navigator>
);

// Groupe d'écrans utilisateurs
const UserStackScreens = () => (
  <UserStack.Navigator screenOptions={{ headerShown: false }}>
    <UserStack.Screen name="UserScreen" component={UserScreen} />
    <UserStack.Screen name="EnterScreen" component={EnterScreen} />
    <UserStack.Screen name="FavoritesScreen" component={FavoritesScreen} />
    <UserStack.Screen name="HistoryScreen" component={HistoryScreen} />
  </UserStack.Navigator>
);

/*
La tab navigation n'est pas la même si on est connecté ou non
On est obligé créer deux tab nav différentes car si on met une condition qui dépend du store redux à l'intérieur de la tab nav,
toute la navigation ne s'actualise pas, ce qui cause des comportements non voulus
*/
const TabNavigatorConnected = () => {
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
      <Tab.Screen name="User" component={UserStackScreens} />
    </Tab.Navigator>
  );
};

const TabNavigatorNotConnected = () => {
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
      <Tab.Screen
        name="Enter"
        component={EnterScreen}
        options={{ tabBarStyle: { display: "none" } }}
      />
    </Tab.Navigator>
  );
};

// La naviguation finale qui sera insérée dans App
// on passe par un RootNavigator car le useSelector ne peut pas être mis dans App car il ne peut pas être lu avant le provider store
const RootNavigator = () => {
  const user = useSelector((state) => state.user.value);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Enter" component={EnterScreen} />
      {user.token ? (
        <Stack.Screen name="TabNavigator" component={TabNavigatorConnected} />
      ) : (
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigatorNotConnected}
        />
      )}
    </Stack.Navigator>
  );
};

// Configuration du store redux
// Les 3 reducers sont persistants pour éviter d'avoir un persistedReducer + un rootReducer (ce qui demanderait de personnaliser certains useSelector par la suite)
const reducers = combineReducers({ user, quiz, guest });

const persistConfig = {
  key: "gastronoquest",
  storage: AsyncStorage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar
            backgroundColor="transparent"
            translucent={true}
            barStyle="dark-content"
          />
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
