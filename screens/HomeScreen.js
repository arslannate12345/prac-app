import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import useFetch from "../hooks/useFetch";

const HomeScreen = () => {
  const {
    data: responseData,
    loading,
    error,
  } = useFetch("https://api.alquran.cloud/v1/surah", "surahData");

  const [selectedItem, setSelectedItem] = useState(null);

  const renderSurah = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          setSelectedItem(item); // Update the selected item when pressed
        }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.surahNumber}>{item.number}</Text>
          <View style={styles.surahInfo}>
            <Text style={styles.name}>{item.englishName || "N/A"}</Text>
            <Text style={styles.details}>
              {item.revelationType} - {item.numberOfAyahs} Ayahs
            </Text>
          </View>
          <Text style={styles.arabicName}>{item.name || "N/A"}</Text>
        </View>
      </TouchableOpacity>
    );
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
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Assalamu Alaikum</Text>
        <Text style={styles.userName}>Tanvir Ahassan</Text>
        <View style={styles.lastReadContainer}>
          <Text style={styles.lastReadTitle}>Current Selection</Text>
          <Text style={styles.lastReadSurah}>
            {selectedItem ? selectedItem.englishName : "No Surah Selected"}
          </Text>
          <Text style={styles.lastReadAyah}>
            {selectedItem
              ? `Ayahs: ${selectedItem.numberOfAyahs}`
              : "Select a Surah to display"}
          </Text>
          <Image
            source={{ uri: "https://example.com/book-icon.png" }} // Replace with your book icon URL or local asset
            style={styles.bookIcon}
          />
        </View>
      </View>
      <FlatList
        data={responseData?.data || []}
        renderItem={renderSurah}
        keyExtractor={(item) => item.number.toString()}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f7fd",
  },
  header: {
    padding: 16,
    backgroundColor: "#6a4bbc",
    borderRadius: 12,
    marginBottom: 16,
  },
  greeting: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 4,
  },
  userName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  lastReadContainer: {
    marginTop: 16,
    backgroundColor: "#816bce",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    position: "relative",
  },
  lastReadTitle: {
    color: "#f0e8ff",
    fontSize: 16,
    marginBottom: 4,
  },
  lastReadSurah: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  lastReadAyah: {
    color: "#f0e8ff",
    fontSize: 14,
    marginTop: 2,
  },
  bookIcon: {
    width: 40,
    height: 40,
    position: "absolute",
    top: -20,
    right: -20,
  },
  flatListContainer: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    elevation: 2,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  surahNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6a4bbc",
    marginRight: 12,
  },
  surahInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  details: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  arabicName: {
    fontSize: 18,
    color: "#6a4bbc",
    fontWeight: "bold",
  },
});

export default HomeScreen;
