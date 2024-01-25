import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {apiUrl} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActionButton = ({kdmatkul2010041}) => {
  const [icon_1] = useState(new Animated.Value(40));
  const [icon_2] = useState(new Animated.Value(40));
  const [pop, setPop] = useState(false);
  const navigation = useNavigation();
  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 90,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 90,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const actionDeleteData = async () => {
    let token = await AsyncStorage.getItem('userToken');
    Alert.alert(
      'konfirmasi',
      'Apakah anda yakin ingin menghapus data Matakuliah ini?',
      [
        {
          text: 'Batal',
          onPress: () => console.log('penghapusan dibatalkan'),
          style: 'cancel',
        },
        {
          text: 'ok',
          onPress: () => {
            //lakukan penghapusan data dengan permintaan delete ke api
            fetch(`${apiUrl}matakuliah/${kdmatkul2010041}`, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then(Response => {
                if (Response.status === 200) {
                  Alert.alert('', 'Data matakuliah berhasil dihapus !', [
                    {
                      text: 'Ok',
                      onPress: () =>
                        navigation.navigate('DataMatkul', {
                          dataAdded: true,
                        }),
                    },
                  ]);
                } else {
                  console.log('Gagal Menghapus data');
                }
              })
              .catch(error => {
                console.error('Terjadi kesalahan:', error);
              });
          },
        },
      ],
      {cancelable: true},
    );
  };
  const showFormEdit = () => {
    navigation.navigate('FormEditMatakuliah', {
      kdmatkul2010041: kdmatkul2010041,
    });
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Animated.View
        style={[styles.circle, {bottom: icon_1, backgroundColor: '#B31312'}]}>
        <TouchableOpacity onPress={actionDeleteData}>
          <Icon name="trash" size={20} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[styles.circle, {right: icon_2, backgroundColor: '#FFB534'}]}>
        <TouchableOpacity onPress={showFormEdit}>
          <Icon name="edit" size={20} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={[
          styles.circle,
          {
            backgroundColor: '#49108B',
          },
        ]}
        onPress={() => {
          pop === false ? popIn() : popOut();
        }}>
        <Icon name={pop === false ? 'plus' : 'close'} size={20} color="#FFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default ActionButton;
const styles = StyleSheet.create({
  circle: {
    backgroundColor: 'blue',
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 40,
    right: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
});
