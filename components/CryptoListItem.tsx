import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { formatCurrency } from '../utils/formatCurrency';

interface CryptoListItemProps {
  name: string;
  symbol: string;
  iconUrl: string;
  price: number;
  change: number;
  value:string,
  onFavoritePress: () => void; 
  onPress: () => void;
}

const CryptoListItem: React.FC<CryptoListItemProps> = ({ name, symbol, iconUrl, price, change, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={{ uri: iconUrl }} style={styles.icon} />
        <Text style={styles.name}>{name} ({symbol.toUpperCase()})</Text>
        <Text style={styles.price}>{formatCurrency(price)}</Text>
        <Text style={[styles.change, { color: change > 0 ? '#00FF00' : '#FF0000' }]}>
          {change.toFixed(2)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444444',
    backgroundColor: '#111111',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  price: {
    color: '#AAAAAA',
    fontSize: 16,
    marginRight: 10,
  },
  change: {
    fontSize: 16,
  },
});

export default CryptoListItem;
