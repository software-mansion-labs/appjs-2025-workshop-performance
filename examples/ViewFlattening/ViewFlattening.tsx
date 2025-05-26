import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function ViewFlattening() {
  return (
    <View style={styles.outer}>
      <View>
        <View style={styles.margin}>
          <View style={styles.padding}>
            <View style={styles.inner} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: 300,
    height: 300,
    backgroundColor: 'limegreen',
  },
  margin: {
    margin: 20,
  },
  padding: {
    padding: 30,
  },
  inner: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
  },
});
