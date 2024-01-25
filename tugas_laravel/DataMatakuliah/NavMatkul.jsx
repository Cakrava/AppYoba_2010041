// NavMahasiswa.jsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import DataMatkul from './Matkul';
import DetailMatkul from './DetailMatkul';
import {StatusBar} from 'react-native';
import Matkul from './Matkul';
import FormTambah from './FormTambah';
import FormEditMatakuliah from './FormEditMatakuliah';
import FormUpload from './FormUpload';

const Stack = createNativeStackNavigator();

export default function NavMatkul() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#7071e8"
        translucent={true}
      />
      <Stack.Navigator initialRouteName="DataMatkul">
        <Stack.Screen
          name="DataMatkul"
          component={Matkul}
          options={{
            headerTitle: 'Data Matakuliah',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#7071e8',
            },
          }}
        />
        <Stack.Screen
          name="DetailMatkul"
          component={DetailMatkul}
          options={{
            headerTitle: 'Detail Matakuliah',
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
            headerTitle: 'Tambah Matakuliah',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#7071e8',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="FormEditMatakuliah"
          component={FormEditMatakuliah}
          options={{
            headerTitle: 'Edit Matakuliah',
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
            headerTitle: 'Update Foto Matkul',
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
