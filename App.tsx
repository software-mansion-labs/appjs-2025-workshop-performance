import * as React from 'react';

import {FlatList, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView, RectButton} from 'react-native-gesture-handler';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';

import {Lists} from './examples/Lists/Lists';
import Native from './examples/Native/Native';

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

export default function CustomTransitionExample() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
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
