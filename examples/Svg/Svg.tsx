import {Image} from 'expo-image';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import WikipediaLogo from '../../assets/wikipedia.svg';

const WIDTH = 1.5 * 103;
const HEIGHT = 1.5 * 94;

function ExpoImage() {
  return (
    <>
      <Text style={styles.heading}>expo-image</Text>
      {typeof WikipediaLogo === 'number' ? (
        <Image source={WikipediaLogo} style={styles.image} />
      ) : (
        <Text style={styles.error}>
          react-native-svg-transformer must be disabled{'\n'}
          babel-plugin-inline-import must be disabled
        </Text>
      )}
    </>
  );
}

function ReactNativeSvgXml() {
  return (
    <>
      <Text style={styles.heading}>react-native-svg SvgXml</Text>
      {typeof WikipediaLogo === 'string' ? (
        <SvgXml xml={WikipediaLogo} width={WIDTH} height={HEIGHT} />
      ) : (
        <Text style={styles.error}>
          babel-plugin-inline-import must be enabled
        </Text>
      )}
    </>
  );
}

function ReactNativeSvgTransformer() {
  return (
    <>
      <Text style={styles.heading}>react-native-svg</Text>
      {typeof WikipediaLogo === 'function' ? (
        <WikipediaLogo width={WIDTH} height={HEIGHT} />
      ) : (
        <Text style={styles.error}>
          babel-plugin-inline-import must be disabled{'\n'}
          react-native-svg-transformer must be enabled
        </Text>
      )}
    </>
  );
}

export default function Svg() {
  return (
    <View style={styles.container}>
      <ExpoImage />
      <ReactNativeSvgXml />
      <ReactNativeSvgTransformer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  image: {
    width: WIDTH,
    height: HEIGHT,
  },
  error: {
    width: 2 * WIDTH,
    height: HEIGHT,
    lineHeight: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(255,0,0,0.2)',
  },
});
