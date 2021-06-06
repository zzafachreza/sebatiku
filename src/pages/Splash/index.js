import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  Animated,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {color} from 'react-native-reanimated';
import {getData} from '../../utils/localStorage';
import {PermissionsAndroid} from 'react-native';

export default function Splash({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    const unsubscribe = getData('user').then(res => {
      // console.log(res);
      if (!res) {
        // console.log('beum login');

        setTimeout(() => {
          navigation.replace('GetStarted');
        }, 2000);
      } else {
        console.log('sudah login logon');

        setTimeout(() => {
          navigation.replace('MainApp');
        }, 2000);
      }
    });
  }, []);
  return (
    <SafeAreaView style={styles.page}>
      <Image style={styles.image} source={require('../../assets/logo.png')} />
      <Text
        style={{
          fontFamily: fonts.secondary[800],
          fontSize: windowWidth / 10,
          color: 'red',
        }}>
        PEMBANTUKU
      </Text>
      <Text
        style={{
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 27,
          color: '#0a3e93',
        }}>
        By PT Feny Jaya Mandiri (Outsourcing)
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    aspectRatio: 1,
    width: 200,
    height: 200,
  },
});
