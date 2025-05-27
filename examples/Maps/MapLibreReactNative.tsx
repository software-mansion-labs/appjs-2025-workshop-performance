import {
  Camera,
  MapView,
  MarkerView,
  ShapeSource,
  SymbolLayer,
  SymbolLayerStyle,
} from '@maplibre/maplibre-react-native';
import {StyleSheet, Text} from 'react-native';
import {MARKERS} from './common';
import {featureCollection, point} from '@turf/helpers';

const centerCoordinate = [19, 52];
const zoomLevel = 4.5;

const geojson = featureCollection(
  MARKERS.map((marker, index) =>
    point([marker.longitude, marker.latitude], {index: String(index)}),
  ),
);

const style = {
  textField: ['get', 'index'],
  textFont: ['Noto Sans Regular'],
  textAllowOverlap: true,
} as SymbolLayerStyle;

function ViewMarkers() {
  return (
    <>
      {MARKERS.map((marker, index) => (
        <MarkerView
          key={index}
          coordinate={[marker.longitude, marker.latitude]}>
          <Text>{index}</Text>
        </MarkerView>
      ))}
    </>
  );
}

function SourceMarkers() {
  return (
    <ShapeSource id="source" shape={geojson}>
      <SymbolLayer id="layer" style={style} />
    </ShapeSource>
  );
}

export function MapLibreReactNative() {
  return (
    <MapView
      style={styles.container}
      mapStyle="https://tiles.openfreemap.org/styles/liberty">
      <Camera centerCoordinate={centerCoordinate} zoomLevel={zoomLevel} />
      <ViewMarkers />
      {/* <SourceMarkers /> */}
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
