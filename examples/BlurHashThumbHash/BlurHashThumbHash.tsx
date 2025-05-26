import {Image} from 'expo-image';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const WIDTH = 250;
const HEIGHT = 250;

const uri =
  'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg';

const blurhash = 'eAE3JD_4004oW8DhjY%hWXM{00ITRNxaxv-=ofIUofoe00Rj?ct7%N';

const thumbhash = 'l/cRDwAJZmiHeIdzh4l4SJeIhoz4jJ0P';

function BlurHash() {
  return (
    <Image
      source={{uri: `${uri}?t=${Date.now()}`}}
      placeholder={{blurhash}}
      style={styles.image}
    />
  );
}

function ThumbHash() {
  return (
    <Image
      source={{uri: `${uri}?t=${Date.now()}`}}
      placeholder={{thumbhash}}
      style={styles.image}
    />
  );
}

export default function BlurHashThumbHash() {
  return (
    <View style={styles.container}>
      <BlurHash />
      <ThumbHash />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: WIDTH,
    height: HEIGHT,
    marginBottom: 50,
  },
});
