import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiImage} from './config';

export default function Login({navigation, setUserToken}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const saveToken = async token => {
    try {
      await AsyncStorage.setItem('userToken, token');
      setUserToken(token);
    } catch (e) {
      //Menyimpan token gagal
      console.log('Token gagal di-simpan');
    }
  };
  const ActionLogin = async () => {
    setLoading(true);
    fetch(`${apiImage}/api/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(async response => {
      const json = await response.json();
      if (json.status == 'success') {
        console.log(json.data.token);
        await AsyncStorage.setItem('userToken', json.data.token);
        setUserToken(json.data.token);
        navigation.navigate('Index');
      } else {
        if (response.status == 403) {
          setErrorEmail(json.data.email ? json.data.email[0] : '');
          setErrorPassword(json.data.password ? json.data.password[0] : '');
        }
        if (response.status == 401) {
          Alert.alert('Gagal', `${json.message}`);
          setEmail('');
          setPassword('');
          setErrorEmail('');
          setErrorPassword('');
        }
      }
      setLoading(false);
    });
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={styles.container}>
      <View style={styles.form}>
        <Image source={require('./img/avatar16.png')} style={styles.img} />
        <Text style={styles.label}>E-Mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        {errorEmail ? <Text style={styles.errorText}>{errorEmail}</Text> : null}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errorPassword ? (
          <Text style={styles.errorText}>{errorPassword}</Text>
        ) : null}
        <Button
          title={loading ? 'Tunggu...' : 'Login'}
          onPress={ActionLogin}
          disabled={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 5,
    padding: 10,
    borderRadius: 5,
  },
  img: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 50,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 5,
  },
});
