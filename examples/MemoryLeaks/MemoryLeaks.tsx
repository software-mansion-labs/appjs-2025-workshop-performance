import React, {useEffect} from 'react';
import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';

function LeakyComponent() {
  useEffect(() => {
    const array = new Array(100_000_000).fill('string');
    const listener = Dimensions.addEventListener('change', () => {
      console.log('Dimensions changed', array.length);
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
