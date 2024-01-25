// NavMahasiswa.jsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FormTambah from './FormTambah';
import DetailMahasiswa from './DetailMahasiswa';
import {StatusBar} from 'react-native';
import Mahasiswa from './Mahasiswa';
import FormEditMahasiswa from './FormEditMahasiswa';
import FormUpload from './FormUpload';

const Stack = createNativeStackNavigator();

export default function NavMahasiswa() {
  return (
    //iyaa paham
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#7071e8"
        translucent={true}
      />
      <Stack.Navigator initialRouteName="DataMahasiswa">
        <Stack.Screen
          name="DataMahasiswa"
          component={Mahasiswa}
          options={{
            headerTitle: 'Data Mahasiswa',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#7071e8',
            },
          }}
        />
        <Stack.Screen
          name="DetailMahasiswa"
          component={DetailMahasiswa}
          options={{
            headerTitle: 'Detail Mahasiswa',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#7071e8',
            },
          }}
        />
        <Stack.Screen
          name="FormTambah"
          component={FormTambah}
          options={{
            headerTitle: 'Tambah Mahasiswa',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#7071e8',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="FormEditMahasiswa"
          component={FormEditMahasiswa}
          options={{
            headerTitle: 'Edit Mahasiswa',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#7071e8',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="FormUpload"
          component={FormUpload}
          options={{
            headerTitle: 'Update Foto Mahasiswa',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#7071e8',
            },
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </>
  );
}
