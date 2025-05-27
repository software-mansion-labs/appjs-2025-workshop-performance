import * as React from 'react';

import {FlatList, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView, RectButton} from 'react-native-gesture-handler';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  InitialState,
  NavigationContainer,
  ParamListBase,
} from '@react-navigation/native';

import {Lists} from './examples/Lists/Lists';
import Native from './examples/Native/Native';
import Fps from './examples/Fps/Fps';
import Threads from './examples/Threads/Threads';
import ViewReparenting from './examples/ViewReparenting/ViewReparenting';
import ViewFlattening from './examples/ViewFlattening/ViewFlattening';
import ViewRecycling from './examples/ViewRecycling/ViewRecycling';
import TextInputs from './examples/TextInputExample/TextInputs';
import MemoryLeaks from './examples/MemoryLeaks/MemoryLeaks';
import Svg from './examples/Svg/Svg';
import BlurHashThumbHash from './examples/BlurHashThumbHash/BlurHashThumbHash';
import {useMMKVObject} from 'react-native-mmkv';
import Persistence from './examples/Persistence/Persistence';
import AnimatedSvg from './examples/AnimatedSvg/AnimatedSvg';

declare global {
  var performance: {
    now: () => number;
  };
}

const Stack = createNativeStackNavigator();
const screens = [
  {
    icon: '📜',
    name: 'Lists',
    screen: Lists,
  },
  {
    icon: '📱',
    name: 'Native',
    screen: Native,
  },
  {
    icon: '🎞️',
    name: 'FPS',
    screen: Fps,
  },
  {
    icon: '🧵',
    name: 'Threads',
    screen: Threads,
  },
  {
    icon: '🔝',
    name: 'View reparenting',
    screen: ViewReparenting,
  },
  {
    icon: '🚜',
    name: 'View flattening',
    screen: ViewFlattening,
  },
  {
    icon: '♻️',
    name: 'View recycling',
    screen: ViewRecycling,
  },
  {
    icon: '⌨️',
    name: 'Text inputs',
    screen: TextInputs,
  },
  {
    icon: '🚰',
    name: 'Memory leaks',
    screen: MemoryLeaks,
  },
  {
    icon: '🖼️',
    name: 'SVG',
    screen: Svg,
  },
  {
    icon: '🐎',
    name: 'Animated SVG',
    screen: AnimatedSvg,
  },
  {
    icon: '#️⃣',
    name: 'BlurHash / ThumbHash',
    screen: BlurHashThumbHash,
  },
  {
    icon: '💾',
    name: 'Persistence',
    screen: Persistence,
  },
];

interface ItemProps {
  icon: string;
  title: string;
  description?: string;
  onPress: () => void;
}

function Item({icon, title, onPress}: ItemProps) {
  return (
    <View style={styles.separator}>
      <RectButton style={styles.item} onPress={onPress}>
        <Text style={styles.title}>
          {icon}
          {'  '}
          {title}
        </Text>
      </RectButton>
    </View>
  );
}

function Menu({navigation}: NativeStackScreenProps<ParamListBase>) {
  return (
    <FlatList
      data={screens}
      initialNumToRender={screens.length}
      renderItem={({item}) => (
        <Item
          icon={item.icon}
          title={item.name}
          onPress={() => navigation.navigate(item.name)}
        />
      )}
    />
  );
}

export default function App() {
  const [initialState, setInitialState] =
    useMMKVObject<InitialState>('initialState');

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer
        initialState={initialState}
        onStateChange={setInitialState}>
        <Stack.Navigator>
          <Stack.Screen name="App.js" component={Menu} />
          {screens.map(({name, screen}) => (
            <Stack.Screen key={name} name={name} component={screen} />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  item: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
});
