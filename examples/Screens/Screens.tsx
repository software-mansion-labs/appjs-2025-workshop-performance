import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

export default function Screens({
  navigation,
}: NativeStackScreenProps<ParamListBase>) {
  return (
    <View style={styles.container}>
      <Button title="Push screen" onPress={() => navigation.push('Screens')} />
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
