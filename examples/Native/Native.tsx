/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

import {
  Button,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {FlashList} from '@shopify/flash-list';

import {LegendList} from '@legendapp/list';
import Animated, {LinearTransition} from 'react-native-reanimated';

import Svg, {Circle, Rect, SvgXml} from 'react-native-svg';
import {svgXmlData} from './svgXML';
import {Image} from 'expo-image';

const svg = require('./svg.svg');

const xml = `
<svg class="gingerbread" width="500" height="500" viewBox="0 0 200 200">
  <circle class="body" cx="0" cy="-50" r="30" />

  <circle class="eye" cx="-12" cy="-55" r="3" />
  <circle class="eye" cx="12" cy="-55" r="3" />
  <rect class="mouth" x="-10" y="-40" width="20" height="5" rx="2" />

  <circle class="eye" cx="-12" cy="-55" r="3" />
  <circle class="eye" cx="12" cy="-55" r="3" />
  <rect class="mouth" x="-10" y="-40" width="20" height="5" rx="2" />

  <circle class="eye" cx="-12" cy="-55" r="3" />
  <circle class="eye" cx="12" cy="-55" r="3" />
  <rect class="mouth" x="-10" y="-40" width="20" height="5" rx="2" />

  <line class="limb" x1="-40" y1="-10" x2="40" y2="-10" />
  <line class="limb" x1="-25" y1="50" x2="0" y2="-15" />
  <line class="limb" x1="25" y1="50" x2="0" y2="-15" />

  <circle class="button" cx="0" cy="-10" r="5" />
  <circle class="button" cx="0" cy="10" r="5" />
</svg>

`;

const data = Array.from({length: 60}, (_, i) => ({
  id: i,
  title: `Item ${i}`,
}));

const SVGView = () => {
  return (
    <>
      {/* <SvgXml xml={svgXmlData} /> */}
      <Image source={svg} style={styles.image} contentFit="contain" />
    </>
  );
};

const InnerView = React.memo(() => {
  return (
    <View style={styles.innerContainer}>
      <SVGView />
    </View>
  );
});

const Gallery = React.memo(() => {
  return (
    <>
      {data.map(item => (
        <InnerView key={item.id} />
      ))}
    </>
  );
});

export default function Native() {
  const [show, setShow] = React.useState(false);
  return (
    <View style={styles.mainContainer}>
      <Button
        title="Toggle"
        onPress={() => {
          setShow(!show);
        }}
      />
      <View style={styles.rowContainer}>
        {show && (
          <View style={styles.svgContainer}>
            <SVGView />
          </View>
        )}
        <View style={styles.galleryContainer}>
          <View style={styles.container}>
            <Gallery />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  svgContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  galleryContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  innerContainer: {
    backgroundColor: 'red',
    height: '10%',
    width: '20%',
    margin: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
