import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, Text} from 'react-native';
import {MARKERS} from './common';

const initialRegion = {
  latitude: 52,
  longitude: 19,
  latitudeDelta: 11,
  longitudeDelta: 11,
};

export function ReactNativeMaps() {
  return (
    <MapView initialRegion={initialRegion} style={styles.container}>
      {MARKERS.map((marker, index) => (
        <Marker key={index} coordinate={marker}>
          <Text>{index}</Text>
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
