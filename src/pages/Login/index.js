import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {storeData, getData} from '../../utils/localStorage';
import {showMessage} from 'react-native-flash-message';

export default function Login({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [data, setData] = useState({
    username: null,
    password: null,
  });

  useEffect(() => {
    getData('token').then(res => {
      console.log('data token,', res);
      setToken(res.token);
    });
  }, []);

  // login ok
  const masuk = () => {
    setLoading(true);
    console.log(data);
    setTimeout(() => {
      axios
        .post('https://zavalabs.com/sebatiku/api/login.php', data)
        .then(res => {
          console.log(res.data);
          setLoading(false);
          if (res.data.kode == 50) {
            showMessage({
              type: 'danger',
              message: res.data.msg,
            });
          } else {
            storeData('user', res.data);
            axios
              .post('https://zavalabs.com/sebatiku/api/update_token.php', {
                id_member: res.data.id,
                token: token,
              })
              .then(res => {
                console.log('update token', res);
              });

            navigation.replace('MainApp');
          }
        });
    }, 1200);
  };
  return (
    <ImageBackground style={styles.page}>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <View style={styles.page}>
          <Image
            resizeMode="contain"
            source={require('../../assets/logo.png')}
            style={{
              height: 200,
              aspectRatio: 1,
              marginBottom: '10%',
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 20,
              color: colors.black,
              // maxWidth: 230,
            }}>
            Silahkan login untuk masuk ke aplikasi{' '}
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 20,
                color: colors.black,
                // maxWidth: 230,
              }}>
              Sebatiku
            </Text>
          </Text>

          <MyGap jarak={20} />
          <MyInput
            label="Username"
            iconname="person"
            value={data.username}
            onChangeText={value =>
              setData({
                ...data,
                username: value,
              })
            }
          />
          <MyGap jarak={20} />
          <MyInput
            label="Password"
            iconname="key"
            secureTextEntry
            onChangeText={value =>
              setData({
                ...data,
                password: value,
              })
            }
          />
          <MyGap jarak={40} />
          <MyButton
            warna={colors.primary}
            title="LOGIN"
            Icons="log-in"
            onPress={masuk}
          />
        </View>
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{backgroundColor: colors.primary}}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    // backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  image: {
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
});
