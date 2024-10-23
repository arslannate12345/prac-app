import React, { useState } from "react";
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

  const [selectedSurahNumber, setSelectedSurahNumber] = useState(null);
  const [ayahs, setAyahs] = useState([]);

  // Function to fetch Ayahs for a selected Surah
  const fetchAyahs = async (surahNumber) => {
    try {
      const response = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}`
      );
      const data = await response.json();
      if (data && data.data) {
        // Display the first 6 Ayahs
        setAyahs(data.data.ayahs.slice(0, 6));
      }
    } catch (error) {
      console.error("Error fetching Ayahs:", error);
    }
  };

  // Handle Surah selection
  const handleSurahPress = (item) => {
    if (selectedSurahNumber === item.number) {
      // If already selected, deselect
      setSelectedSurahNumber(null);
      setAyahs([]);
    } else {
      // Select and fetch Ayahs
      setSelectedSurahNumber(item.number);
      fetchAyahs(item.number);
    }
  };

  const renderSurah = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleSurahPress(item)} // Update the selected item and fetch Ayahs
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
        {selectedSurahNumber === item.number && (
          <View style={styles.ayahListContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => handleSurahPress(item)} // Close the Ayah list
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <FlatList
              data={ayahs}
              renderItem={({ item }) => (
                <View style={styles.ayahContainer}>
                  <Text style={styles.ayahText}>{item.text}</Text>
                </View>
              )}
              keyExtractor={(ayah) => ayah.number.toString()}
              contentContainerStyle={styles.ayahFlatListContainer}
            />
          </View>
        )}
      </View>
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
            {selectedSurahNumber
              ? `Surah ${selectedSurahNumber}`
              : "No Surah Selected"}
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
  bookIcon: {
    width: 40,
    height: 40,
  },
  flatListContainer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  surahNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6a4bbc",
  },
  surahInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  details: {
    fontSize: 12,
    color: "#666",
  },
  arabicName: {
    fontSize: 18,
    color: "#6a4bbc",
    fontWeight: "bold",
  },
  ayahListContainer: {
    backgroundColor: "#f3f1f9",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  closeButtonText: {
    color: "#6a4bbc",
    fontSize: 16,
  },
  ayahContainer: {
    marginBottom: 8,
  },
  ayahText: {
    fontSize: 14,
    color: "#333",
  },
});

export default HomeScreen;
