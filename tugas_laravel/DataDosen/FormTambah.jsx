import React, {useState} from 'react';
import {ScrollView, StyleSheet, Alert, View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {apiUrl} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormTambah = () => {
  const [nidn, setnidn] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('L,P');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [alamat, setAlamat] = useState('');
  const [noTelp, setNoTelp] = useState('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const navigation = useNavigation();
  const [validationErrors, setValidationErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const submitForm = async () => {
    let token = await AsyncStorage.getItem('userToken');
    setIsSaving(true);
    setValidationErrors({});
    const formData = {
      nidn2010041: nidn,
      namalengkap2010041: namaLengkap,
      jenkel2010041: jenisKelamin,
      tmp_lahir2010041: tempatLahir,
      tgl_lahir2010041: tanggalLahir.toISOString().split('T')[0],
      alamat2010041: alamat,
      notelp2010041: noTelp,
    };

    fetch(`${apiUrl}dosen`, {
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
        Alert.alert('Success', 'Data dosen berhasil ditambahkan', [
          {
            text: 'ok',
            onPress: () => navigation.navigate('DataDosen', {dataAdded: true}),
          },
        ]);
      })
      .catch(error => {
        //handle failure
        setIsSaving(false);
        Alert.alert('Error', error.toString());
      });
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || tanggalLahir;
    setDatePickerVisible(Platform.OS === 'ios');
    setTanggalLahir(currentDate);
  };

  const formatDate = date => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Input
        placeholder="NIDN"
        value={nidn}
        onChangeText={setnidn}
        placeholderTextColor="#ccc"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        leftIcon={<Icon name="user-circle" size={24} color="#007BFF" />}
        errorMessage={validationErrors.nidn2010041}
      />

      <Input
        placeholder="Nama Lengkap"
        value={namaLengkap}
        onChangeText={setNamaLengkap}
        placeholderTextColor="#ccc"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        leftIcon={<Icon name="user" size={24} color="#007BFF" />}
        errorMessage={validationErrors.namalengkap2010041}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={jenisKelamin}
          onValueChange={(itemValue, itemIndex) => setJenisKelamin(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Pilih Jenis Kelamin" value="" />
          <Picker.Item label="Laki-laki" value="L" />
          <Picker.Item label="Perempuan" value="P" />
        </Picker>
      </View>

      <Input
        placeholder="Tempat Lahir"
        value={tempatLahir}
        onChangeText={setTempatLahir}
        leftIcon={<Icon name="home" size={24} color="#007BFF" />}
        placeholderTextColor="#ccc"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        errorMessage={validationErrors.tmp_lahir2010041}
      />

      <View style={styles.dateContainer}>
        <Button
          title=" Date"
          onPress={() => setDatePickerVisible(true)}
          icon={<Icon name="calendar" size={15} color="white" />}
          buttonStyle={styles.dateButton}
        />
        {datePickerVisible && (
          <DateTimePicker
            value={tanggalLahir}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <Text style={styles.dateDisplay}>
          Tanggal Lahir: {formatDate(tanggalLahir)}
        </Text>
      </View>

      <Input
        placeholder="Alamat"
        value={alamat}
        onChangeText={setAlamat}
        leftIcon={<Icon name="map-marker-alt" size={24} color="#007BFF" />}
        placeholderTextColor="#ccc"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        errorMessage={validationErrors.alamat2010041}
      />

      <Input
        placeholder="Nomor Telpon"
        value={noTelp}
        onChangeText={setNoTelp}
        leftIcon={<Icon name="phone" size={24} color="#007BFF" />}
        placeholderTextColor="#ccc"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        errorMessage={validationErrors.notelp2010041}
        keyboardType="number-pad"
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
