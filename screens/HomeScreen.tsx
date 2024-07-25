import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const initialData = {
  labels: ['April', 'May', 'June', 'July'],
  datasets: [
    {
      data: [100, 200, 150, 300],
      color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
      strokeWidth: 2,
    },
    {
      data: [120, 210, 180, 290],
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      strokeWidth: 2,
      withDots: false,
    },
  ],
  legend: ['Portfolio Performance', 'Benchmark'],
};

const cryptoData = [
  { name: 'Bitcoin', amount: 1.5, purchasePrice: 30000, currentPrice: 31000 },
  { name: 'Ethereum', amount: 10, purchasePrice: 2000, currentPrice: 1950 },
  { name: 'Ripple', amount: 5000, purchasePrice: 0.5, currentPrice: 0.55 },
  { name: 'Litecoin', amount: 30, purchasePrice: 150, currentPrice: 155 },
];

const HomeScreen: React.FC = () => {
  const [portfolioValue, setPortfolioValue] = React.useState(150000);
  const [animatedValue] = React.useState(new Animated.Value(portfolioValue));

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: portfolioValue,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [portfolioValue]);

  const animatedValueInterpolation = animatedValue.interpolate({
    inputRange: [0, portfolioValue],
    outputRange: ['#fff', '#0f0'],
  });

  const data = {
    ...initialData,
    datasets: [
      {
        data: [100, 200, 150, 300],
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [120, 210, 180, 290],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
        withDots: false,
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePic}
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} // Use the same profile image as ProfileScreen
          />
          <View style={styles.profileText}>
            <Text style={styles.greetingText}>Hello</Text>
            <Text style={styles.nameText}>John Doe</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.bellIcon}>
          <Entypo name="bell" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.balanceSection}>
        <Text style={styles.balanceTitle}>Current Balance</Text>
        <Text style={styles.balanceAmount}>$12,345.67</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.button, styles.activeButton]}>
          <Text style={styles.buttonText}>Buy Crypto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sell Crypto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Transfer</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.performanceSection}>
        <LineChart
          data={data}
          width={320}
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#1f1f1f',
            backgroundGradientFrom: '#121212',
            backgroundGradientTo: '#121212',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#fff',
            },
            propsForBackgroundLines: {
              strokeWidth: 0.5,
              stroke: '#444',
            },
          }}
          bezier
        />
        <Animated.Text style={[styles.performanceText, { color: animatedValueInterpolation }]}>
          Current Value: ${portfolioValue.toLocaleString()}
        </Animated.Text>
      </View>

      <View style={styles.cryptoSection}>
        <View style={styles.gridContainer}>
          {cryptoData.map((crypto, index) => {
            const profitLoss = ((crypto.currentPrice - crypto.purchasePrice) / crypto.purchasePrice) * 100;
            return (
              <View key={index} style={styles.cryptoBox}>
                <View style={styles.cryptoHeaderContainer}>
                  <MaterialCommunityIcons name="bitcoin" size={24} color="#f39c12" />
                  <Text style={styles.cryptoName}>{crypto.name}</Text>
                </View>
                <View style={styles.cryptoDetails}>
                  <Text style={styles.cryptoAmount}>Amount: {crypto.amount}</Text>
                  <Text style={styles.cryptoPurchasePrice}>Purchase Price: ${crypto.purchasePrice.toFixed(2)}</Text>
                  <Text style={styles.cryptoCurrentPrice}>Current Price: ${crypto.currentPrice.toFixed(2)}</Text>
                  <Text style={[styles.cryptoProfitLoss, { color: profitLoss >= 0 ? '#0f0' : '#f00' }]}>
                    {profitLoss.toFixed(2)}% {profitLoss >= 0 ? 'Profit' : 'Loss'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#bbb',
    marginRight: 10,
  },
  profileText: {
    flexDirection: 'column',
  },
  greetingText: {
    color: '#aaa',
    fontSize: 14,
  },
  nameText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bellIcon: {
    borderWidth: 2,
    padding: 4,
  },
  balanceSection: {
    padding: 20,
    backgroundColor: '#000000',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  balanceTitle: {
    fontSize: 20,
    color: '#aaa',
  },
  balanceAmount: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#000000',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 12,
    backgroundColor: '#6200ee',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  activeButton: {
    backgroundColor: '#3700b3',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  performanceSection: {
    padding: 20,
    backgroundColor: '#000000',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 10,
  },
  performanceText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cryptoSection: {
    padding: 20,
    backgroundColor: '#000000',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cryptoBox: {
    width: '48%',
    padding: 15,
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cryptoHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cryptoName: {
    marginLeft: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  cryptoDetails: {
    marginTop: 10,
  },
  cryptoAmount: {
    color: '#fff',
  },
  cryptoPurchasePrice: {
    color: '#aaa',
  },
  cryptoCurrentPrice: {
    color: '#aaa',
  },
  cryptoProfitLoss: {
    fontWeight: 'bold',
  },
});

export default HomeScreen;
