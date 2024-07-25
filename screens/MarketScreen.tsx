import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Animated } from 'react-native';
import axios from 'axios';
import CryptoListItem from '../components/CryptoListItem';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';

const ExchangeScreen: React.FC = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [favorites, setFavorites] = useState<Array<any>>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<any | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [selectedTab, setSelectedTab] = useState<string>('Markets');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
      },
    }).then(response => {
      setData(response.data);
      // Adding some items to favorites for demonstration
      setFavorites([response.data[0], response.data[1]]);
    }).catch(error => {
      console.error(error);
    });
  }, [fadeAnim]);

  const handleExchange = () => {
    if (selectedCrypto && amount) {
      alert(`Exchanging ${amount} of ${selectedCrypto.name}`);
    }
  };

  const toggleFavorite = (crypto: any) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.find(item => item.id === crypto.id)) {
        return prevFavorites.filter(item => item.id !== crypto.id);
      } else {
        return [...prevFavorites, crypto];
      }
    });
  };

  const renderItem = ({ item }: { item: any }) => (
    <CryptoListItem
      name={item.name}
      price={item.current_price}
      symbol={item.symbol}
      iconUrl={item.image}
      change={item.price_change_percentage_24h ?? 0}
      onPress={() => setSelectedCrypto(item)}
      onFavoritePress={() => toggleFavorite(item)}
      isFavorite={favorites.some(fav => fav.id === item.id)}
    />
  );

  const filteredData = selectedTab === 'Favorites' ? favorites : data;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesomeIcon icon={faStar} style={styles.icon} size={20} />
        <FontAwesomeIcon icon={faSearch} style={styles.icon} size={20} />
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, { width: selectedTab === 'Favorites' ? '70%' : '30%' }, selectedTab === 'Favorites' && styles.activeTab]}
          onPress={() => setSelectedTab('Favorites')}
        >
          <Text style={[styles.tabText, selectedTab === 'Favorites' && styles.activeTabText]}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, { width: selectedTab === 'Markets' ? '70%' : '30%' }, selectedTab === 'Markets' && styles.activeTab]}
          onPress={() => setSelectedTab('Markets')}
        >
          <Text style={[styles.tabText, selectedTab === 'Markets' && styles.activeTabText]}>Markets</Text>
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.listContainer, { opacity: fadeAnim }]}>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  listContainer: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 50,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 20, 
  },
  tab: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  activeTab: {
    borderColor: '#6200EE', 
    backgroundColor: '#6200EE', 
    borderWidth: 2,
  },
  activeTabText: {
    color: '#FFFFFF', 
    fontWeight: 'bold',
  },
  tabText: {
    color: '#AAAAAA', 
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6200EE',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default ExchangeScreen;
