import React, {useCallback, useEffect} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

function sleep(ms: number) {
  const start = performance.now();
  while (performance.now() - start < ms) {}
}

export default function TextInputs() {
  const [value, setValue] = React.useState('');

  useEffect(() => {
    sleep(1000);
  }, [value]);

  const onChangeText = useCallback((text: string) => {
    setValue(text);
    // setValue(text.toLocaleUpperCase());
  }, []);

  return (
    <View style={styles.container}>
      <Text>Render time: {performance.now()}</Text>
      <TextInput
        multiline
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
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
  input: {
    width: 300,
    borderWidth: 1,
    fontSize: 20,
    lineHeight: 20,
  },
});
