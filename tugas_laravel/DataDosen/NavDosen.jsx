// NavMahasiswa.jsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailDosen from './DetailDosen';
import {StatusBar} from 'react-native';
import Dosen from './Dosen';
import FormTambah from './FormTambah';
import FormEditDosen from './FormEditDosen';
import FormUpload from './FormUpload';

const Stack = createNativeStackNavigator();

export default function NavDosen() {
  return (
    //iyaa paham
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#7071e8"
        translucent={true}
      />
      <Stack.Navigator initialRouteName="DataDosen">
        <Stack.Screen
          name="DataDosen"
          component={Dosen}
          options={{
            headerTitle: 'Data Dosen',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#7071e8',
            },
          }}
        />
        <Stack.Screen
          name="DetailDosen"
          component={DetailDosen}
          options={{
            headerTitle: 'Detail Dosen',
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
            headerTitle: 'Tambah Dosen',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#7071e8',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="FormEditDosen"
          component={FormEditDosen}
          options={{
            headerTitle: 'Edit Dosen',
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
            headerTitle: 'Update Foto Dosen',
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
