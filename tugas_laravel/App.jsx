import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Import Screens

import LoginScreen from './Login';
import Index from './Index';
import NavMahasiswa from './DataMahasiswa/NavMahasiswa';
import NavDosen from './DataDosen/NavDosen';
import NavMatkul from './DataMatakuliah/NavMatkul';

const stack = createNativeStackNavigator();

const App = () => {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    //Periksa Token saat aplikasi dimuat
    const checkTokenUser = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      setUserToken(userToken);
    };
    checkTokenUser();
  }, []);
  const handleSetUserToken = token => {
    setUserToken(token);
  };

  return (
    <NavigationContainer>
      <stack.Navigator>
        {userToken == null ? (
          <stack.Screen name="Login" options={{headerShown: false}}>
            {props => (
              <LoginScreen {...props} setUserToken={handleSetUserToken} />
            )}
          </stack.Screen>
        ) : (
          <>
            <stack.Screen name="Index" options={{headerShown: false}}>
              {props => <Index {...props} setUserToken={setUserToken} />}
            </stack.Screen>
            <stack.Screen
              name="Mahasiswa"
              component={NavMahasiswa}
              options={{headerShown: false}}
            />
            <stack.Screen
              name="Dosen"
              component={NavDosen}
              options={{headerShown: false}}
            />
            <stack.Screen
              name="Matakuliah"
              component={NavMatkul}
              options={{headerShown: false}}
            />
          </>
        )}
      </stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
