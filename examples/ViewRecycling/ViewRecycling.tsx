import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function ViewRecycling() {
  const [visible, setVisible] = React.useState(true);

  const [color, setColor] = React.useState('red');

  return (
    <View style={styles.container}>
      <Button title="Toggle visibility" onPress={() => setVisible(!visible)} />
      <Text>Visible: {String(visible)}</Text>
      <Button
        title="Toggle color"
        onPress={() => setColor(c => (c === 'red' ? 'blue' : 'red'))}
      />
      <Text>Color: {color}</Text>
      {visible && <View style={[styles.box, {backgroundColor: color}]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  box: {
    width: 100,
    height: 100,
  },
});
