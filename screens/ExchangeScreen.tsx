import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Dimensions, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure react-native-vector-icons is installed

const screenWidth = Dimensions.get('window').width;

type Currency = 'BTC' | 'ETH' | 'USDT' | 'BNB';

const ExchangeScreen: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<Currency>('BTC');
  const [toCurrency, setToCurrency] = useState<Currency>('USDT');
  const [balance, setBalance] = useState<Record<Currency, number>>({
    BTC: 1.234,
    USDT: 5000,
    ETH: 10,
    BNB: 20,
  });
  const [amount, setAmount] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [showTransactions, setShowTransactions] = useState<boolean>(false);
  const [chartData, setChartData] = useState<number[]>([120, 115, 130, 125, 140, 160]); // Default data

  // Ref for the chart to manage the data
  const chartRef = useRef<any>(null);

  useEffect(() => {
    // Simulate fetching new data based on selected currencies
    const fetchChartData = () => {
      // Replace this with actual API calls or data fetch logic
      // Example data based on selected currencies
      const newChartData = [
        Math.random() * 100 + 100,
        Math.random() * 100 + 100,
        Math.random() * 100 + 100,
        Math.random() * 100 + 100,
        Math.random() * 100 + 100,
        Math.random() * 100 + 100
      ];

      // Using setTimeout to create a smooth transition effect
      setTimeout(() => {
        setChartData(newChartData);
      }, 500); // Adjust the delay as needed for smoother effect
    };

    fetchChartData();
  }, [fromCurrency, toCurrency]);

  const handleExchange = () => {
    const amountNumber = parseFloat(amount);
    const priceNumber = parseFloat(price);

    if (isNaN(amountNumber) || (orderType === 'limit' && isNaN(priceNumber))) {
      console.error('Invalid amount or price');
      return;
    }

    console.log(`Exchange: ${amountNumber} ${fromCurrency} to ${toCurrency} at ${priceNumber} (Order Type: ${orderType})`);
  };

  return (
    <ScrollView style={styles.container}>

      {/* Header Section */}

      {/* Trading Pair Selection */}
      <View style={styles.selectionContainer}>
        <View style={styles.pickerSection}>
          <Text style={styles.sectionTitle}>From</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={fromCurrency}
              style={styles.picker}
              onValueChange={(itemValue) => setFromCurrency(itemValue as Currency)}
            >
              <Picker.Item label="BTC" value="BTC" />
              <Picker.Item label="ETH" value="ETH" />
              <Picker.Item label="USDT" value="USDT" />
              <Picker.Item label="BNB" value="BNB" />
            </Picker>
          </View>
          <Text style={styles.balanceText}>{fromCurrency} Balance: {balance[fromCurrency]}</Text>
        </View>
        <View style={styles.pickerSection}>
          <Text style={styles.sectionTitle}>To</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={toCurrency}
              style={styles.picker}
              onValueChange={(itemValue) => setToCurrency(itemValue as Currency)}
            >
              <Picker.Item label="USDT" value="USDT" />
              <Picker.Item label="BNB" value="BNB" />
              <Picker.Item label="BTC" value="BTC" />
              <Picker.Item label="ETH" value="ETH" />
            </Picker>
          </View>
          <Text style={styles.balanceText}>{toCurrency} Balance: {balance[toCurrency]}</Text>
        </View>
      </View>

      {/* Chart Section */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Price Chart ({fromCurrency}/{toCurrency})</Text>
        <LineChart
          ref={chartRef}
          data={{
            labels: ['1h', '1d', '1w', '1m', '6m', '1y'],
            datasets: [
              {
                data: chartData,
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#1E1E1E',
            backgroundGradientFrom: '#1E1E1E',
            backgroundGradientTo: '#1E1E1E',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#FFA726',
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Transactions Toggle */}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>Show Recent Transactions</Text>
        <Switch
          value={showTransactions}
          onValueChange={(value) => setShowTransactions(value)}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={showTransactions ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      {showTransactions && (
        <View style={styles.transactionsContainer}>
          <Text style={styles.transactionsTitle}>Recent Transactions</Text>
          <View style={styles.transaction}>
            <Icon name="exchange" size={16} color="#B0B0B0" />
            <Text style={styles.transactionText}>0.5 BTC to 500 USDT</Text>
          </View>
          <View style={styles.transaction}>
            <Icon name="exchange" size={16} color="#B0B0B0" />
            <Text style={styles.transactionText}>1 ETH to 1500 USDT</Text>
          </View>
          <View style={styles.transaction}>
            <Icon name="exchange" size={16} color="#B0B0B0" />
            <Text style={styles.transactionText}>0.2 BNB to 200 USDT</Text>
          </View>
        </View>
      )}

      {/* Trading Panel */}
      <View style={styles.tradingPanel}>
        <Text style={styles.panelTitle}>Trade</Text>
        <View style={styles.orderEntry}>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholderTextColor="#B0B0B0"
          />
          {orderType === 'limit' && (
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
              placeholderTextColor="#B0B0B0"
            />
          )}
          <Picker
            selectedValue={orderType}
            style={styles.picker}
            onValueChange={(itemValue) => setOrderType(itemValue as 'market' | 'limit')}
          >
            <Picker.Item label="Market Order" value="market" />
            <Picker.Item label="Limit Order" value="limit" />
          </Picker>
        </View>
        <View style={styles.estimatedCost}>
          <Text style={styles.estimatedCostText}>
            Estimated Cost: ${(parseFloat(amount) * parseFloat(price)).toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.exchangeButton} onPress={handleExchange}>
          <Text style={styles.buttonText}>Exchange</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: '#E0E0E0',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop:20,
  },
  pickerSection: {
    flex: 1,
    marginHorizontal: 10,
  },
  pickerContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#E0E0E0',
  },
  balanceText: {
    fontSize: 14,
    color: '#B0B0B0',
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    color: '#E0E0E0',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  chart: {
    borderRadius: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleText: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  transactionsContainer: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  transactionsTitle: {
    fontSize: 18,
    color: '#E0E0E0',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  transactionText: {
    fontSize: 14,
    color: '#B0B0B0',
    marginLeft: 10,
  },
  tradingPanel: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
    marginBottom:40,
  },
  panelTitle: {
    fontSize: 18,
    color: '#E0E0E0',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  orderEntry: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#2E2E2E',
    borderRadius: 8,
    padding: 10,
    color: '#E0E0E0',
    marginBottom: 10,
  },
  estimatedCost: {
    marginBottom: 20,
  },
  estimatedCostText: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  exchangeButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ExchangeScreen;
