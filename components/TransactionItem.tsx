// TransactionItem.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Ensure to install @expo/vector-icons if not already

interface TransactionItemProps {
  date: string;
  amount: number;
  type: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ date, amount, type }) => {
  const iconName = type === 'Deposit' ? 'arrow-up' : 'arrow-down';
  const iconColor = type === 'Deposit' ? '#4CAF50' : '#F44336';

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome name={iconName} size={24} color={iconColor} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.type}>{type}</Text>
        <Text style={styles.amount}>{amount.toFixed(2)} USD</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E', // Dark background for items
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  date: {
    fontSize: 16,
    color: '#FFFFFF', // Light text color
  },
  type: {
    fontSize: 14,
    color: '#CCCCCC', // Lighter text color
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // Light text color
  },
});

export default TransactionItem;
