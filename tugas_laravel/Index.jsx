import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import DataUser from './DataUser';
import NavMahasiswa from './DataMahasiswa/NavMahasiswa';
import NavDosen from './DataDosen/NavDosen';
import NavMatkul from './DataMatakuliah/NavMatkul';

const Tab = createBottomTabNavigator();
export default function Index(props) {
  const {setUserToken} = props;
  return (
    // <NavigationContainer>
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Mahasiswa') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Dosen') {
            iconName = focused ? 'happy' : 'happy-outline';
          } else if (route.name === 'Matakuliah') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'UserAccount') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },

        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Mahasiswa"
        component={NavMahasiswa}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#39A7FF',
        }}
      />
      <Tab.Screen
        name="Dosen"
        component={NavDosen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: 'tomato',
        }}
      />
      <Tab.Screen
        name="Matakuliah"
        component={NavMatkul}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#03C988',
        }}
      />

      <Tab.Screen
        name="UserAccount"
        options={{headerShown: false, title: 'User'}}>
        {props => <DataUser {...props} setUserToken={setUserToken} />}
      </Tab.Screen>
    </Tab.Navigator>
    // </NavigationContainer>
  );
}
