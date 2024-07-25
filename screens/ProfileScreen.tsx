import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const transactions = [
  { id: 1, date: '2024-07-20', type: 'Paid to', name: 'John Doe', amount: '$500', status: 'Completed' },
  { id: 2, date: '2024-07-18', type: 'Received from', name: 'Jane Smith', amount: '$300', status: 'Completed' },
  { id: 3, date: '2024-07-15', type: 'Transfer', name: 'Bank Account', amount: '$200', status: 'Pending' },
  { id: 4, date: '2024-07-10', type: 'Paid to', name: 'Alice Johnson', amount: '$800', status: 'Completed' },
];

const ProfileScreen: React.FC = () => {
  const investmentGoal = 10000; 
  const currentInvestment = 6000; 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.dotsContainer}>
          <View style={styles.dotsBorder}>
            <Text style={styles.dotsText}>•••</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.bellIcon}>
          <Entypo name="bell" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
        />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>johndoe@example.com</Text>
      </View>

      <View style={styles.transactionHistorySection}>
        <Text style={styles.transactionHistoryTitle}>Transaction History</Text>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionCard}>
            <View style={styles.transactionHeader}>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
              <View style={styles.transactionTypeContainer}>
                {transaction.type === 'Paid to' ? (
                  <Ionicons name="arrow-up-circle-outline" size={20} color="red" />
                ) : (
                  <Ionicons name="arrow-down-circle-outline" size={20} color="green" />
                )}
                <Text style={styles.transactionType}>{transaction.type}</Text>
              </View>
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}>{transaction.name}</Text>
              <Text style={styles.transactionAmount}>{transaction.amount}</Text>
            </View>
            <Text style={transaction.status === 'Completed' ? styles.statusCompleted : styles.statusPending}>
              {transaction.status}
            </Text>
          </View>
        ))}
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
    marginTop:15,
  },
  dotsContainer: {
    marginLeft: 10,
  },
  dotsBorder: {
    borderColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dotsText: {
    color: '#fff',
    fontSize: 16,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  bellIcon: {
    marginRight: 10,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000000',
    borderRadius: 10,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    color: '#fff',
    fontSize: 22,
    marginVertical: 10,
  },
  profileEmail: {
    color: '#ccc',
    fontSize: 16,
  },
  investmentSection: {
    padding: 20,
    backgroundColor: '#000000',
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  transactionHistorySection: {
    padding: 15,
    backgroundColor: '#000000',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  transactionHistoryTitle: {
    fontSize: 20,
    color: '#aaa',
    marginBottom: 10,
  },
  transactionCard: {
    backgroundColor: '#1c1c1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  transactionDate: {
    color: '#ccc',
    fontSize: 14,
  },
  transactionTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionType: {
    color: '#eee',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  transactionDetails: {
    marginBottom: 5,
  },
  transactionName: {
    color: '#fff',
    fontSize: 14,
  },
  transactionAmount: {
    color: '#aaa',
    fontSize: 14,
  },
  statusCompleted: {
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  statusPending: {
    color: 'orange',
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default ProfileScreen;
