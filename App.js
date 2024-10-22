// App.js
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailsScreen";
import CartScreen from "./screens/CartScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  const [favorites, setFavorites] = useState(new Set());

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              setFavorites={setFavorites}
              favorites={favorites}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Cart">
          {(props) => <CartScreen {...props} favorites={favorites} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
