/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const data = Array.from({length: 50}, (_, i) => ({
  id: i,
  title: `Item ${i}`,
}));

const Item = () => {
  const newYorkTime = dayjs().tz('America/New_York').millisecond();
  return <Text>{newYorkTime.toString()}</Text>;
};

const InnerView = () => {
  return (
    <View style={styles.innerContainer}>
      {data.map(item => (
        <Item key={item.id} />
      ))}
    </View>
  );
};

export default function JSProfiler() {
  const [flex, setHeight] = React.useState(1);
  return (
    <View style={[styles.container, {flex}]}>
      <InnerView />
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 0.5,
    flexDirection: 'row',
  },
  item: {
    backgroundColor: 'red',
    flex: 1,
    width: 10,
    margin: 1,
  },
});
