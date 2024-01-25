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

const DetailMatakuliah = ({route}) => {
  const {kdmatkul2010041} = route.params;
  const [matakuliah_2010041, setMatakuliah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const goToPageFormUpload = () => {
    navigation.navigate('FormUpload', {
      kdmatkul2010041: kdmatkul2010041,
      foto: matakuliah_2010041.foto_thumb,
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const fetchData = async () => {
        try {
          let token = await AsyncStorage.getItem('userToken');
          const response = await fetch(
            `${apiUrl}matakuliah/${kdmatkul2010041}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const json = await response.json();
          setMatakuliah(json);
        } catch (error) {
          setError('Tidak dapat memuat data');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    });
    return unsubscribe;
  }, [navigation, kdmatkul2010041]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }
  if (error) {
    return <Text>{error}</Text>;
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        {matakuliah_2010041 && (
          <Card>
            <Avatar
              size="xlarge"
              rounded
              source={
                matakuliah_2010041.foto
                  ? {uri: `${apiImage}${matakuliah_2010041.foto_thumb}`}
                  : defaultAvatar
              }
              containerStyle={styles.avatarContainer}
              onPress={goToPageFormUpload}
            />
            <Card.Title style={styles.title}>
              {matakuliah_2010041.kdmatkul2010041}
            </Card.Title>
            <Card.Divider />
            <Text style={styles.detail}>Nama Matakuliah:</Text>
            <Text style={styles.detailData}>
              {matakuliah_2010041.namamat2010041}
            </Text>
            <Text style={styles.detail}>SKS:</Text>
            <Text style={styles.detailData}>
              {matakuliah_2010041.sks2010041}
            </Text>
          </Card>
        )}
        <ActionButton kdmatkul2010041={matakuliah_2010041.kdmatkul2010041} />
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
export default DetailMatakuliah;
