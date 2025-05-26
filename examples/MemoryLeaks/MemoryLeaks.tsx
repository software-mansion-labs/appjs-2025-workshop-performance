import React, {useEffect} from 'react';
import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';

class HeavyObject {
  #data: string[];

  constructor() {
    this.#data = new Array(25_000_000).fill('string');
  }

  get length() {
    return this.#data.length;
  }
}

function LeakyComponent() {
  useEffect(() => {
    const heavyObject = new HeavyObject();
    const listener = Dimensions.addEventListener('change', () => {
      console.log('Dimensions changed', heavyObject.length);
    });
    // return () => listener.remove();
  }, []);

  return <Text>This is a leaky component</Text>;
}

export default function MemoryLeaks() {
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <Button
        title="Toggle leaky component"
        onPress={() => setVisible(v => !v)}
      />
      {visible && <LeakyComponent key={performance.now()} />}
      <Button
        title="Trigger garbage collector"
        onPress={() => (globalThis as any).gc()}
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
