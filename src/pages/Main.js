import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

function Main({navigation}) {
  const [currentRegion, setcurrentRegion] = useState(null);
  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        const { latitude, longitude } = coords;
        setcurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    }
    loadInitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }

  return (
    <MapView initialRegion={currentRegion} style={styles.map}>
      <Marker coordinate={{ latitude: -5.8702, longitude: -35.2037 }}>
        <Image
          style={styles.avatar}
          source={{
            uri:
              "https://avatars2.githubusercontent.com/u/39492830?s=460&u=48eb20a9520d5605fd31282c101320df86c4641e&v=4",
          }}
        />
        <Callout onPress={()=>{
navigation.navigate("Profile",{github_username:"Gabriel-Oliver"})
        }}>
          <View style={styles.callout}>
            <Text style={styles.devName}>Gabriel Óliver</Text>
            <Text style={styles.devBio}>
              Starter developer searching for knowledge.
            </Text>
            <Text style={styles.devTechs}>Js, ReactJS, ReactNative</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#FFF",
  },
  callout: {
    width: 260,
  },
  devName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  devBio: {
    color: "#666",
    marginTop: 5,
  },
  devTechs: {
    marginTop: 5,
  },
});

export default Main;
