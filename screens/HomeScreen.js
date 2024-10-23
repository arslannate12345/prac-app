import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
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
          setSelectedItem(item);
        }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.englishName || "N/A"}</Text>
          <Text style={styles.translation}>
            {item.englishNameTranslation || "N/A"}
          </Text>
          <Text style={styles.details}>
            {item.revelationType} - {item.numberOfAyahs} Ayahs
          </Text>
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
      <View style={styles.widgetContainer}>
        {selectedItem ? (
          <View style={styles.selectedItemWidget}>
            <Text style={styles.widgetTitle}>Current Selection</Text>
            <Text style={styles.selectedItemName}>
              {selectedItem.englishName || "N/A"}
            </Text>
          </View>
        ) : (
          <Text style={styles.widgetTitle}>No item selected</Text>
        )}
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
    backgroundColor: "#f2f2f2",
  },
  flatListContainer: {
    paddingBottom: 16,
  },
  widgetContainer: {
    backgroundColor: "#e0e0e0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  selectedItemWidget: {
    alignItems: "center",
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  selectedItemName: {
    fontSize: 16,
    color: "#555",
    marginTop: 8,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  textContainer: {
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  translation: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  details: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
});

export default HomeScreen;
