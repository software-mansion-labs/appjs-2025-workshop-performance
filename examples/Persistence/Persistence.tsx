import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {MMKV} from 'react-native-mmkv';

const mmkv = new MMKV();

export default function Persistence() {
  return (
    <View style={styles.container}>
      <Button
        title="Async Storage 1 get"
        onPress={() => {
          const start = performance.now();
          (async () => {
            await AsyncStorage.getItem('foo');
            const end = performance.now();
            console.log(`[Async Storage 1 get] ${end - start} ms`);
          })();
        }}
      />
      <Button
        title="MMKV async 1 get"
        onPress={() => {
          const start = performance.now();
          (async () => {
            mmkv.getString('foo');
            const end = performance.now();
            console.log(`[MMKV async 1 get] ${end - start} ms`);
          })();
        }}
      />
      <Button
        title="MMKV sync 1 get"
        onPress={() => {
          const start = performance.now();
          mmkv.getString('foo');
          const end = performance.now();
          console.log(`[MMKV sync 1 get] ${end - start} ms`);
        }}
      />
      <Button
        title="Async Storage 1000 set+get"
        onPress={() => {
          (async () => {
            const start = performance.now();
            for (let i = 0; i < 1000; i++) {
              await AsyncStorage.setItem(`foo${i}`, `bar${i}`);
              await AsyncStorage.getItem('foo');
            }
            const end = performance.now();
            console.log(`[Async Storage 1000 set+get] ${end - start} ms`);
          })();
        }}
      />
      <Button
        title="MMKV sync 1000 set+get"
        onPress={() => {
          const start = performance.now();
          for (let i = 0; i < 1000; i++) {
            mmkv.getString('foo');
            mmkv.set('foo', `bar${i}`);
          }
          const end = performance.now();
          console.log(`[MMKV sync 1000 set+get] ${end - start} ms`);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
