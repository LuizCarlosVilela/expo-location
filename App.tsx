import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as Location from "expo-location";

interface localizacao {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

export default function App() {
  const [location, setLocation] = useState<localizacao>();
  const [errorMsg, setErrorMsg] = useState("");

  const [status, setStatus] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      setStatus(status);
    })();
  }, []);

  const getLocation = async () => {
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }

    const data: Location.LocationObject = await Location.getCurrentPositionAsync(
      {}
    );
    const { coords } = data;
    setLocation(coords);
  };

  return (
    <View style={styles.container}>
      <Text>{location?.latitude}</Text>
      <Text>{location?.longitude}</Text>
      <TouchableOpacity
        onPress={() => getLocation()}
        style={{
          padding: 20,
          backgroundColor: "blue",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text>Toque aqui</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
});
