import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {
  createWorkletRuntime,
  runOnJS,
  runOnRuntime,
  runOnUI,
} from 'react-native-worklets';

export default function Threads() {
  return (
    <View style={styles.container}>
      <Button
        title="runOnUI"
        onPress={() => {
          runOnUI(() => {
            console.log('Hello from the UI thread!', {_WORKLET});
          })();
        }}
      />
      <Button
        title="runOnJS"
        onPress={() => {
          function hello() {
            console.log('Hello from the JS thread!', {_WORKLET});
          }
          runOnUI(() => {
            runOnJS(hello)();
          })();
        }}
      />
      <Button
        title="runOnBackground"
        onPress={() => {
          runOnRuntime(createWorkletRuntime('foo'), () => {
            'worklet';
            console.log('Hello from a background thread!', {_WORKLET});
          })();
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
