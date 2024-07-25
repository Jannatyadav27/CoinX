// TransactionHistoryScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, RefreshControl } from 'react-native';
import TransactionItem from '../components/TransactionItem';

const TransactionHistoryScreen: React.FC = () => {
  // Hardcoded data
  const [transactions, setTransactions] = useState<Array<any>>([
    { id: '1', date: '2024-07-21', amount: 150.00, type: 'Deposit' },
    { id: '2', date: '2024-07-20', amount: -50.00, type: 'Withdrawal' },
    { id: '3', date: '2024-07-19', amount: 200.00, type: 'Deposit' },
    { id: '4', date: '2024-07-18', amount: -30.00, type: 'Withdrawal' },
    { id: '5', date: '2024-07-17', amount: 75.00, type: 'Deposit' },
  ]);

  // Refresh control (for pull-to-refresh)
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a refresh by waiting for 1 second
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transaction History</Text>
      </View>
      {transactions.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No transactions available</Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionItem
              date={item.date}
              amount={item.amount !== undefined ? item.amount : 0}
              type={item.type}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Black background
  },
  header: {
    backgroundColor: '#1F1F1F',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginTop:50,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#CCCCCC', // Light gray text
  },
});

export default TransactionHistoryScreen;
