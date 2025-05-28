import React, {useMemo} from 'react';
import {Button, StyleSheet, View} from 'react-native';

function Component({color}: {color: {r: number; g: number; b: number}}) {
  console.log(`Render <Component color={${JSON.stringify(color)}}/>`);

  const backgroundColor = `rgb(${color.r},${color.g},${color.b})`;

  return <View style={[styles.box, {backgroundColor}]} />;
}

const MemoComponent = React.memo(Component);

export default function Rerenders() {
  console.log('Render');

  const [count, setCount] = React.useState(0);

  const state = useMemo(() => count % 6 < 3, [count]);

  const color = useMemo(
    () => (state ? {r: 255, g: 0, b: 0} : {r: 0, g: 0, b: 255}),
    [state],
  );

  return (
    <View style={styles.container}>
      <Button title="Re-render" onPress={() => setCount(count + 1)} />
      <MemoComponent color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
  },
});
