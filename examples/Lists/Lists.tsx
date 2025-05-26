/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';

import {FlashList} from '@shopify/flash-list';

import {LegendList} from '@legendapp/list';

const DATA = new Array(5000).fill(0).map((_, i) => i);

function Item({value}: {value: string}) {
  return <Text style={styles.item}>{value}</Text>;
}

function renderItem({item}: {item: number}) {
  return <Item value={item.toString()} />;
}

function keyExtractor(item: number) {
  return item.toString();
}

function ScrollViewExample() {
  return (
    <ScrollView>
      {DATA.map(item => (
        <Item key={item} value={item.toString()} />
      ))}
    </ScrollView>
  );
}

function FlatListExample() {
  return <FlatList data={DATA} renderItem={renderItem} />;
}

function FlashListExample() {
  return (
    <FlashList data={DATA} renderItem={renderItem} estimatedItemSize={50} />
  );
}

function LegendListExample() {
  return (
    <LegendList
      // Required props
      data={DATA}
      renderItem={renderItem}
      // Recommended props (improves performance)
      keyExtractor={keyExtractor}
      recycleItems
      // Optional props
      estimatedItemSize={50}
    />
  );
}

export function Lists() {
  return (
    <View style={styles.container}>
      <ScrollViewExample />
      {/* <FlatListExample /> */}
      {/* <FlashListExample /> */}
      {/* <LegendListExample /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'lightblue',
    borderWidth: 1,
  },
});
