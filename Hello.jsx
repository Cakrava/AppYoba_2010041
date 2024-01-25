import React from 'react';
import {Text, View} from 'react-native';

function Hello() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black', // Menambahkan warna background biru langit
        borderRadius: 10, // Mengatur border radius ke 10 untuk membuat sudut bulat
        padding: 20, // Menambahkan jarak antara teks dan batas kotak
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 24,
          color: 'pink', // Mengatur warna teks ke oren
        }}>
        Selamat Datang Yoba Ganteng
      </Text>
    </View>
  );
}

export default Hello;
