import * as React from 'react';

import {
  ActivityIndicator,
  FlatList,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GestureHandlerRootView, RectButton} from 'react-native-gesture-handler';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  NavigationState,
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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    icon: '#️⃣',
    name: 'BlurHash / ThumbHash',
    screen: BlurHashThumbHash,
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

// Copied from https://reactnavigation.org/docs/state-persistence/#usage
const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

export default function App() {
  const [isReady, setIsReady] = React.useState(Platform.OS === 'web'); // Don't persist state on web since it's based on URL
  const [initialState, setInitialState] = React.useState();

  const onStateChange = React.useCallback(
    (state: Readonly<NavigationState> | undefined) =>
      AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state)),
    [],
  );

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (initialUrl == null) {
          // Only restore state if there's no deep link
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return <ActivityIndicator style={styles.container} />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer
        initialState={initialState}
        onStateChange={onStateChange}>
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
