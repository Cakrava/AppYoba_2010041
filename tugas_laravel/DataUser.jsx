import React from 'react';
import {View, StyleSheet, Alert, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export default function DataUser({setUserToken}) {
  const navigation = useNavigation();

  const confirmLogout = () => {
    Alert.alert(
      'Logout',
      'Apakah anda yakin ingin logout?',
      [
        {
          text: 'Batal',
          onPress: () => console.log('Logout dibatalkan'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => handleLogout()},
      ],
      {cancelable: false},
    );
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setUserToken(null);
      navigation.navigate('Login');
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoutButton: {
    backgroundColor: '#e74c3c', // Red button for logout
    padding: 16,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff', // White text color
    fontWeight: 'bold',
  },
});
