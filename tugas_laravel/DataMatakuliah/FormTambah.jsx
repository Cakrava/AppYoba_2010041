import React, {useState} from 'react';
import {ScrollView, StyleSheet, Alert, View, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {apiUrl} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormTambah = () => {
  const [kd, setKd] = useState('');
  const [namaMatkul, setNamaMatkul] = useState('');
  const [sks, setSks] = useState('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const navigation = useNavigation();
  const [validationErrors, setValidationErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const submitForm = async () => {
    setIsSaving(true);
    setValidationErrors({});
    const formData = {
      kdmatkul2010041: kd,
      namamat2010041: namaMatkul,
      sks2010041: sks,
    };
    let token = await AsyncStorage.getItem('userToken');
    fetch(`${apiUrl}matakuliah`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) {
          setIsSaving(false);
          //jika ada kesalahan validasi,akan masuk ke sini
          if (response.status === 422) {
            //Handle validation errors
            let errors = {};
            Object.keys(data.errors).forEach(key => {
              errors[key] = data.errors[key][0]; //Ambil hanya pesan pertama untuk setiap field
            });
            setValidationErrors(errors);
          } else {
            //JIKA ada jenis error lain,throw error untuk menangkap di catch block
            throw new Error(
              data.message || 'Terjadi kesalahan saat menyimpan data.',
            );
          }
          //jangan lupa untuk return disini untuk menghentikan eksekusi lebih lanjut
          return;
        }
        setIsSaving(false);
        //jika tidak ada error,maka tampilkan pesan sukse
        Alert.alert('Success', 'Data mahasiswa berhasil ditambahkan', [
          {
            text: 'ok',
            onPress: () => navigation.navigate('DataMatkul', {dataAdded: true}),
          },
        ]);
      })
      .catch(error => {
        //handle failure
        setIsSaving(false);
        Alert.alert('Error', error.toString());
      });
  };

  const formatDate = date => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Input
        placeholder="Kode Matakuliah"
        value={kd}
        onChangeText={setKd}
        placeholderTextColor="#ccc"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        leftIcon={<Icon name="folder" size={24} color="#007BFF" />}
        errorMessage={validationErrors.kdmatkul2010041}
      />

      <Input
        placeholder="Nama Matakuliah"
        value={namaMatkul}
        onChangeText={setNamaMatkul}
        placeholderTextColor="#ccc"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        leftIcon={<Icon name="bookmark" size={24} color="#007BFF" />}
        errorMessage={validationErrors.namamat2010041}
      />

      <Input
        placeholder="Jumlah SKS"
        value={sks}
        onChangeText={setSks}
        leftIcon={<Icon name="book" size={24} color="#007BFF" />}
        placeholderTextColor="#ccc"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        errorMessage={validationErrors.sks2010041}
      />

      <Button
        title="Simpan Data"
        onPress={submitForm}
        buttonStyle={styles.submitButton}
        titleStyle={styles.submitTitle}
        loading={isSaving}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 30,
  },
  container: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  inputContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#fff',
    paddingLeft: 10,
  },
  inputText: {
    color: '#000',
  },
  pickerContainer: {
    marginBottom: 20,
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
  },
  submitTitle: {
    color: '#fff', //warna text tombol
  },
  dateContainer: {
    marginBottom: 20,
    marginHorizontal: 10,
  },
  dateButton: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
  },
  dateDisplay: {
    fontSize: 16,
    marginTop: 10,
    color: 'black',
  },
});

export default FormTambah;
