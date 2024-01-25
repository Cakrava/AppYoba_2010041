import {
  Alert,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultAvatar from '../img/avatar11.png';
import {apiImage, apiUrl} from '../config';

export default function FormUpload({route, navigation}) {
  const {nim_2010041} = route.params;
  const {foto} = route.params;

  const [Pic, setPic] = useState(null);
  const [uriImage, setUriImage] = useState();
  const [typeImage, setTypeImage] = useState();
  const [fileNameImage, setFileNameImage] = useState();

  const [isUploadButtonDisable, setIsUploadButtonDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //  let token = await AsyncStorage.getItem('userToken');
    if (foto) {
      setPic(`${apiImage}${foto}`);
    }
  }, [foto]);

  const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: true,
      includeExtra: true,
    },
  };

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const searchImage = async () => {
    setIsUploadButtonDisable(true);

    const result = await launchImageLibrary(options, response => {
      if (response.didCancel) {
        setToastMsg('Canceled Selection Image');
        setIsUploadButtonDisable(true);
      } else if (response.errorCode == 'permission') {
        setToastMsg('Not Permission');
        setIsUploadButtonDisable(true);
      } else if (response.errorCode == 'others') {
        setToastMsg(response.errorMessage);
        setIsUploadButtonDisable(true);
      } else if (response.assets[0].fileSize > 5000000) {
        Alert.alert('Maximum File 5MB', 'Please choose another', [
          {text: 'OK'},
        ]);
      } else {
        setPic(response.assets[0].uri);
        setUriImage(response.assets[0].uri);
        setTypeImage(response.assets[0].type);
        setFileNameImage(response.assets[0].fileName);
        setIsUploadButtonDisable(false);
      }
    });
  };

  const takePicture = async () => {
    setIsUploadButtonDisable(true);
    const result = await launchCamera(options, response => {
      if (response.didCancel) {
        setToastMsg('Canceled Selection Image');
        setIsUploadButtonDisable(true);
      } else if (response.errorCode == 'permission') {
        setToastMsg('Not Permission');
        setIsUploadButtonDisable(true);
      } else if (response.errorCode == 'others') {
        setToastMsg(response.errorMessage);
        setIsUploadButtonDisable(true);
      } else if (
        response.assets &&
        response.assets.length > 0 &&
        response.assets[0].fileSize <= 4194304
      ) {
        const uri = response.assets[0].uri;
        setPic(uri);
        setUriImage(uri);
        setTypeImage(response.assets[0].type);
        setFileNameImage(response.assets[0].fileName);

        setIsUploadButtonDisable(false);
      } else {
        Alert.alert('Maximum File 4MB', 'Please choose another', [
          {text: 'OK'},
        ]);
        setIsUploadButtonDisable(true);
      }
    });
  };

  const doRemovePicture = () => {
    if (foto) {
      setPic(`${apiImage}${foto}`);
    } else {
      setPic('');
    }
    setIsUploadButtonDisable(true);
  };

  const doUploadImage = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('foto', {
      uri: uriImage,
      type: typeImage,
      name: fileNameImage,
    });

    let token = await AsyncStorage.getItem('userToken');
    let response = await fetch(
      `${apiUrl}mahasiswa/uploadImage/${nim_2010041}`,
      {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data; ',

          Authorization: `Bearer ${token}`,
        },
      },
    );

    let responseJson = await response.json();
    setToastMsg(responseJson.message);
    setLoading(false);
    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
      }}>
      <TouchableOpacity onPress={searchImage} underlayColor="rgba(0,0,0,0)">
        <Avatar
          size="xlarge"
          rounded
          source={Pic ? {uri: Pic} : defaultAvatar}
          containerStyle={{
            alignSelf: 'center',
            marginBottom: 10,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: isUploadButtonDisable ? '#aaa' : '#65B741',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
            elevation: 3,
            marginHorizontal: 5,
          }}
          onPress={doUploadImage}
          disabled={isUploadButtonDisable}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 14,
            }}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              'Upload Foto'
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#19376D',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
            elevation: 3,
            marginHorizontal: 5,
          }}
          onPress={takePicture}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 14,
            }}>
            Take Camera
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#D21312',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
            elevation: 3,
            marginHorizontal: 5,
          }}
          onPress={doRemovePicture}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 14,
            }}>
            Remove Picture
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
