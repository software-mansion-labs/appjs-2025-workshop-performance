import {Image} from 'expo-image';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {LocalSvg} from 'react-native-svg/css';

// @ts-expect-error fix type declarations
import WikipediaLogo from '../../assets/wikipedia.svg';

const WIDTH = 103;
const HEIGHT = 94;

function ExpoImageRemote() {
  return (
    <>
      <Text style={styles.heading}>expo-image remote</Text>
      <Image
        source={{
          uri: `https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg?t=${Date.now()}`,
        }}
        style={styles.image}
      />
    </>
  );
}

function ExpoImageLocal() {
  return (
    <>
      <Text style={styles.heading}>expo-image local</Text>
      {typeof require('../../assets/wikipedia.svg') === 'number' ? (
        <Image
          source={require('../../assets/wikipedia.svg')}
          style={styles.image}
        />
      ) : (
        <Text style={styles.error}>
          react-native-svg-transformer must be disabled
        </Text>
      )}
    </>
  );
}

function ReactNativeLocalSvg() {
  return (
    <>
      <Text style={styles.heading}>react-native-svg LocalSvg</Text>
      {typeof require('../../assets/wikipedia.svg') === 'number' ? (
        <LocalSvg
          asset={require('../../assets/wikipedia.svg')}
          width={WIDTH}
          height={HEIGHT}
        />
      ) : (
        <Text style={styles.error}>
          react-native-svg-transformer must be disabled
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
      <Text style={styles.heading}>react-native-svg-transformer</Text>
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
      <ExpoImageRemote />
      <ExpoImageLocal />
      <ReactNativeLocalSvg />
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
    width: 330,
    height: HEIGHT,
    lineHeight: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(255,0,0,0.2)',
  },
});
