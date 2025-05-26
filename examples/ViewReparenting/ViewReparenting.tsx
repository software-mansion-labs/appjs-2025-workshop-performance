import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function ViewReparenting() {
  return (
    // TODO: add collapsable={false}
    <View style={styles.outer}>
      <View style={styles.middle}>
        <View style={styles.inner} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: 300,
    height: 300,
    backgroundColor: 'gold',
  },
  middle: {
    width: 200,
    height: 200,
    backgroundColor: 'darkorange',
  },
  inner: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});
