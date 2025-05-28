import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ReactCompiler() {
  const [data, setData] = useState<ItemData[]>([]);
  const newData = useRef<ItemData[]>([]);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [userFilter, setUserFilter] = useState({maxPrice: priceHigh});

  const getData = (): ItemData[] => {
    // Simulate fetching data from a web service.
    const shops = getShops();
    const shopsWithPrices = shops.map(shop => ({
      provider: shop,
      price: getPrice(),
    }));
    return shopsWithPrices.sort(
      (a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)),
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate a web update coming to the user periodically.
      newData.current = getData();
      setHasUpdate(true);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getItemBackgroundColor = useCallback(
    (price: string) => {
      const priceValue = parseFloat(price.slice(1));
      const maxValue = data.reduce(
        (max, item) => Math.max(max, parseFloat(item.price.slice(1))),
        0,
      );
      const minValue = data.reduce(
        (min, item) => Math.min(min, parseFloat(item.price.slice(1))),
        100,
      );
      const range = maxValue === minValue ? 1 : maxValue - minValue;
      const normalizedValue = (priceValue - minValue) / range;
      const hue = Math.round(120 - normalizedValue * 120);
      return `hsl(${hue}, 50%, 50%)`;
    },
    [data],
  );

  const onPress = useCallback(() => {
    setData(newData.current);
    setHasUpdate(false);
  }, [setHasUpdate, setData]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const priceValue = parseFloat(item.price.slice(1));
      return priceValue <= userFilter.maxPrice;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, fontWeight: 'bold'}}>
        Volatile Apple Market
      </Text>
      <FlatList
        data={filteredData}
        renderItem={({item}) => (
          <Column
            provider={item.provider}
            price={item.price}
            getItemBackgroundColor={getItemBackgroundColor}
          />
        )}
        ListEmptyComponent={
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 20}}>No offers available</Text>
          </View>
        }
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Button
                title="Lower"
                onPress={() =>
                  setUserFilter(prev => ({maxPrice: prev.maxPrice - 1}))
                }
              />
              <Button
                title="Higher"
                onPress={() =>
                  setUserFilter(prev => ({maxPrice: prev.maxPrice + 1}))
                }
              />
              <Text>Filter: ${userFilter.maxPrice.toFixed(2)}</Text>
            </View>
            <View style={hasUpdate ? {opacity: 1} : {opacity: 0}}>
              <Button title="Click here to view new offers" onPress={onPress} />
            </View>
          </View>
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

function Column({provider, price, getItemBackgroundColor}: ColumnProps) {
  return (
    <View
      style={[styles.row, {backgroundColor: getItemBackgroundColor(price)}]}>
      <PseudoImage />
      <View style={styles.shopPriceColumn}>
        <Text style={styles.shop}>{provider}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.buyIcon}>🛒</Text>
      </TouchableOpacity>
    </View>
  );
}

function PseudoImage() {
  return <Text style={styles.pseudoImage}>🍎</Text>;
}

const shops = [
  'BestAppl',
  'FreshFru',
  'Organics',
  'LocalProd',
  'Harvest',
  'NatureBty',
  'GreenGro',
  'FruitBsk',
  'AppleEmp',
  'CrispJcy',
  'Orchard',
  'SwOrchard',
  'ApplDlt',
];

const priceLow = 0.29;
const priceHigh = 5.99;

type ItemData = {
  provider: string;
  price: string;
};

type ColumnProps = ItemData & {
  getItemBackgroundColor: (price: string) => string;
};

function getShops(): string[] {
  const shuffledShops = [...shops].sort(() => Math.random() - 0.5);
  const randomLength = Math.floor(Math.random() * shops.length) + 1;
  return shuffledShops.slice(0, randomLength);
}

function getPrice(): string {
  const price = (Math.random() * (priceHigh - priceLow) + priceLow).toFixed(2);
  return `$${price}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: '10',
    paddingTop: 10,
  },
  listContainer: {
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pseudoImage: {
    fontSize: 100,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  row: {
    width: '100%',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  shopPriceColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shop: {
    fontSize: 30,
  },
  price: {
    fontSize: 40,
  },
  buyIcon: {
    fontSize: 40,
    backgroundColor: '#cfc',
    borderWidth: 2,
    borderRadius: 15,
    padding: 5,
    borderColor: '#0f0',
  },
});
