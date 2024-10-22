import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from AsyncStorage
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);
          // Ensure all items have an id before setting the state
          const validFavorites = parsedFavorites.filter(
            (item) => item && item.id
          );
          setFavorites(validFavorites);
        }
      } catch (error) {
        console.error("Failed to load favorites from storage:", error);
      }
    };

    loadFavorites();
  }, []);

  // Remove a product from favorites
  const removeFavorite = async (itemToRemove) => {
    const updatedFavorites = favorites.filter(
      (item) => item.id !== itemToRemove.id
    );
    setFavorites(updatedFavorites);
    await saveFavoritesToStorage(updatedFavorites);
  };

  // Save updated favorites to AsyncStorage
  const saveFavoritesToStorage = async (updatedFavorites) => {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  };

  // Confirm removal with an alert before removing
  const confirmRemoval = (item) => {
    Alert.alert(
      "Remove Favorite",
      `Are you sure you want to remove ${item.name} from favorites?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => removeFavorite(item) },
      ]
    );
  };

  // Render each product in the favorites list
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemCategory}>{item.category}</Text>
      <TouchableOpacity
        onPress={() => confirmRemoval(item)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={favorites} // Pass the favorites list to the FlatList
      renderItem={renderItem}
      keyExtractor={(item) =>
        item.id ? item.id.toString() : Math.random().toString()
      } // Use a fallback key if id is not present
      contentContainerStyle={styles.flatListContent}
      numColumns={1} // Ensure single column layout
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa", // Light background color
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  flatListContent: {
    paddingBottom: 16,
  },
  itemContainer: {
    width: "100%", // Make each item take the full width
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#ffffff", // White background for items
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4, // For Android shadow
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemCategory: {
    fontSize: 14,
    color: "#555",
  },
  removeButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "blue",
    borderRadius: 5,
    alignItems: "center",
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CartScreen;
