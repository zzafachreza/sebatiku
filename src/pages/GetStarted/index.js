import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Animated,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {MyButton, MyGap} from '../../components';
import {colors} from '../../utils/colors';
import {color} from 'react-native-reanimated';
import {fonts} from '../../utils/fonts';

export default function GetStarted({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const bottom = new Animated.Value(windowWidth);
  const opacity = new Animated.Value(0);
  const top = new Animated.Value(0);

  Animated.timing(bottom, {
    toValue: 100,
    duration: 1200,
    useNativeDriver: false,
  }).start();

  Animated.timing(opacity, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: false,
  }).start();

  Animated.timing(top, {
    toValue: 50,
    duration: 1000,
    useNativeDriver: false,
  }).start();

  return (
    <ImageBackground
      style={styles.page}
      source={require('../../assets/back.jpeg')}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/logo.png')}
          style={{
            width: 200,
            height: 200,
          }}
        />
        <Text
          style={{
            marginTop: 50,
            fontFamily: fonts.secondary[800],
            fontSize: windowWidth / 10,
            color: 'red',
          }}>
          PEMBANTUKU
        </Text>
      </View>

      <MyButton
        title="LOGIN"
        Icons="log-in"
        warna={colors.primary}
        onPress={() => navigation.navigate('Login')}
      />

      <MyGap jarak={20} />
      <MyButton
        title="REGISTER"
        Icons="book"
        warna={colors.secondary}
        onPress={() => navigation.navigate('Register')}
      />
      <MyGap jarak={20} />
      <MyButton
        title="AJUKAN LAMARAN"
        Icons="send"
        fontWeight="Bold"
        colorText={colors.white}
        warna="#ff7979"
        onPress={() => navigation.navigate('Pelamar')}
      />
      <Animated.View style={{height: top}} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    // backgroundColor: 'white',
    flex: 1,
    padding: 35,
  },
  title: {
    marginTop: 50,
    fontFamily: fonts.secondary[800],
    fontSize: 50,
    color: colors.primary,
  },
});
