// DetailScreen.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const DetailScreen = ({ route, navigation }) => {
  // Get the data passed from the previous screen
  const { name, phone, title, car } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.car}>{car}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Contact Owner" onPress={() => {}} />
        <Button title="View More Images" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailContainer: {
    flex: 0.75,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  phone: {
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    fontStyle: "italic",
  },
  car: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
});

export default DetailScreen;
