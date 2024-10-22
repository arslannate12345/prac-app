import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useFetch from "../hooks/useFetch";

const HomeScreen = ({ navigation }) => {
  const {
    data: products,
    loading,
    error,
  } = useFetch(
    "https://simple-grocery-store-api.online/products",
    "productsData"
  );

  const [favorites, setFavorites] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Failed to load favorites from storage:", error);
      }
    };

    loadFavorites();
  }, []);

  const toggleLike = (item) => {
    setLikedItems((prevLikedItems) => {
      const isLiked = prevLikedItems[item.id] || false;
      const newLikedItems = { ...prevLikedItems, [item.id]: !isLiked };

      if (!isLiked) {
        setFavorites((prevFavorites) => {
          const updatedFavorites = [...prevFavorites, item];
          saveFavoritesToStorage(updatedFavorites);
          return updatedFavorites;
        });
      } else {
        setFavorites((prevFavorites) => {
          const updatedFavorites = prevFavorites.filter(
            (fav) => fav.id !== item.id
          );
          saveFavoritesToStorage(updatedFavorites);
          return updatedFavorites;
        });
      }
      return newLikedItems;
    });
  };

  const saveFavoritesToStorage = async (updatedFavorites) => {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProduct = ({ item }) => {
    const isLiked = likedItems[item.id] || false;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Detail", item)}
      >
        <Image
          source={{ uri: item.image || "https://via.placeholder.com/150" }}
          style={styles.productImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name || "N/A"}</Text>
          <Text style={styles.price}>${item.price || "N/A"} per piece</Text>
          <TouchableOpacity onPress={() => toggleLike(item)}>
            <Text style={[styles.likeButton, isLiked && styles.liked]}>
              {isLiked ? "❤️" : "🤍"}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const navigateToCart = () => {
    navigation.navigate("Cart");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  } else {
    console.log("ali is my best friend.");
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for products"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Button title="Go to Cart" onPress={navigateToCart} />
      <FlatList
        data={filteredProducts.slice(0, 50)}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  flatListContainer: {
    paddingBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 8,
  },
  textContainer: {
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  likeButton: {
    fontSize: 18,
    marginTop: 4,
  },
  liked: {
    color: "red",
  },
});

export default HomeScreen;
