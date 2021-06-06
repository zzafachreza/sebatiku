import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../utils/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const IconCategory = ({img, title, onPress, iconname}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        // flex: 1,
        width: 80,
        height: 90,
        // backgroundColor: '#F8781D',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,

        elevation: 2,
      }}>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
        }}>
        <Icon
          type="ionicon"
          name={iconname}
          color={colors.secondary}
          size={windowWidth / 13}
        />
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            // color: '#F8781D',
            color: colors.secondary,
            fontSize: windowWidth / 45,
            textAlign: 'center',
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function MyKategori() {
  const navigation = useNavigation();

  const dataKategori = [
    {
      label: 'Pembantu',
      value: 'Pembantu',
      icon: 'woman',
    },
    {
      label: 'Baby Sister',
      value: 'Baby Sister',
      icon: 'people',
    },
    {
      label: 'Tukang Masak',
      value: 'Tukang Masak',
      icon: 'restaurant',
    },
    {
      label: 'Sopir/Driver',
      value: 'Sopir/Driver',
      icon: 'car',
    },
    {
      label: 'Tukang Kebun',
      value: 'Tukang Kebun',
      icon: 'rose',
    },
    {
      label: 'Tukang Pijat',
      value: 'Tukang Pijat',
      icon: 'hand-right',
    },
    {
      label: 'Office Boy',
      value: 'Office Boy',
      icon: 'trash',
    },
    {
      label: 'Perawat Lansia',
      value: 'Perawat Lansia',
      icon: 'walk',
    },
    {
      label: 'Cleaning Service',
      value: 'Cleaning Service',
      icon: 'water',
    },
    {
      label: 'Pet Care',
      value: 'Pet Care',
      icon: 'paw',
    },
    {
      label: 'Penjaga Toko',
      value: 'Penjaga Toko',
      icon: 'body',
    },
  ];

  return (
    <View
      style={{
        justifyContent: 'center',
        padding: 10,
        backgroundColor: colors.primary,
        // backgroundColor: '#FFF',
        paddingBottom: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 5,
        }}>
        <Icon type="ionicon" name="grid" color="#FFF" size={16} />
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            color: '#FFF',
            left: 10,
            fontSize: 16,
          }}>
          KATEGORI
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            // backgroundColor: '#16A858',
          }}>
          {dataKategori.map(item => {
            return (
              <IconCategory
                title={item.value}
                iconname={item.icon}
                onPress={() =>
                  navigation.navigate('Kategori', {
                    kategori: item.value,
                    menu: item.value,
                  })
                }
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
