import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFetch = (url, storageKey) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
      await AsyncStorage.setItem(storageKey, JSON.stringify(result)); // Save fetched data to AsyncStorage
    } catch (err) {
      setError(err.message);
      // If fetching fails, try to load from local storage
      try {
        const storedData = await AsyncStorage.getItem(storageKey);
        if (storedData) {
          setData(JSON.parse(storedData)); // Load from AsyncStorage if available
        }
      } catch (storageError) {
        console.error("Failed to load data from storage:", storageError);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
