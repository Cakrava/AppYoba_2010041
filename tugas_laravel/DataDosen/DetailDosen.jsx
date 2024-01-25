import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Card, Avatar} from 'react-native-elements';
import {apiUrl, apiImage} from '../config';
import defaultAvatar from '../img/avatar15.png';
import ActionButton from './ActionButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const DetailDosen = ({route}) => {
  const {nidn2010041} = route.params;
  const [dosen2010041, setDosen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const goToPageFormUpload = () => {
    navigation.navigate('FormUpload', {
      nidn2010041: nidn2010041,
      foto: dosen2010041.foto_thumb,
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const fetchData = async () => {
        try {
          let token = await AsyncStorage.getItem('userToken');
          const response = await fetch(`${apiUrl}dosen/${nidn2010041}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const json = await response.json();
          setDosen(json);
        } catch (error) {
          setError('Tidak dapat memuat data');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    });
    return unsubscribe;
  }, [navigation, nidn2010041]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }
  if (error) {
    return <Text>{error}</Text>;
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        {dosen2010041 && (
          <Card>
            <Avatar
              size="xlarge"
              rounded
              source={
                dosen2010041.foto
                  ? {uri: `${apiImage}${dosen2010041.foto_thumb}`}
                  : defaultAvatar
              }
              containerStyle={styles.avatarContainer}
              onPress={goToPageFormUpload}
            />
            <Card.Title style={styles.title}>
              {dosen2010041.nidn2010041}
            </Card.Title>
            <Card.Divider />
            <Text style={styles.detail}>Nama:</Text>
            <Text style={styles.detailData}>
              {dosen2010041.namalengkap2010041}
            </Text>
            <Text style={styles.detail}>Jenkel:</Text>
            <Text style={styles.detailData}>
              {dosen2010041.jenkel2010041 == 'L' ? 'Laki-Laki' : 'Perempuan'}
            </Text>
            <Text style={styles.detail}>Tanggal/Tgl.Lahir:</Text>
            <Text style={styles.detailData}>
              {dosen2010041.tmp_lahir2010041} / {dosen2010041.tgl_lahir2010041}
            </Text>
            <Text style={styles.detail}>Alamat:</Text>
            <Text style={styles.detailData}>{dosen2010041.alamat2010041}</Text>
            <Text style={styles.detail}>Telp/Hp:</Text>
            <Text style={styles.detailData}>{dosen2010041.notelp2010041}</Text>
          </Card>
        )}
        <ActionButton nidn2010041={dosen2010041.nidn2010041} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detail: {
    fontSize: 14,
    marginBottom: 5,
    color: '#ccd',
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailData: {
    fontSize: 18,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: 'black',
    fontWeight: 'bold',
  },
});
export default DetailDosen;
