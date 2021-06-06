import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyButton} from '../../components';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {color} from 'react-native-reanimated';
import {Icon} from 'react-native-elements/dist/icons/Icon';

export default function Pembantu({navigation, route}) {
  const item = route.params;
  // console.log('detail pembantu', item);
  navigation.setOptions({title: item.nama_lengkap});

  const MyListData = ({label, value}) => {
    return (
      <View
        style={{
          marginTop: 5,
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          paddingBottom: 5,
          borderBottomColor: colors.primary,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 12,
              color: colors.secondary,
            }}>
            {label}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: fonts.secondary[400],
            fontSize: 12,
            color: colors.black,
          }}>
          {value}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
        }}>
        <Image
          resizeMode="contain"
          style={{
            width: '100%',
            aspectRatio: 1,
          }}
          source={{
            uri: item.foto,
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          // borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: colors.primary,
          // padding: 20,
          paddingTop: 10,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 20,
              color: colors.white,
            }}>
            {' '}
            {item.nama_kategori}
          </Text>
        </View>
        <View style={{backgroundColor: colors.white, padding: 20, flex: 1}}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 20,
              color: colors.secondary,
            }}>
            {item.nama_barang}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 20,
              color: colors.primary,
            }}>
            Rp. {new Intl.NumberFormat().format(item.harga)}
          </Text>
          <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="server" type="ionicon" size={14} />
              <Text
                style={{
                  left: 5,
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                }}>
                Ukuran
              </Text>
            </View>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                fontSize: 20,
                color: colors.secondary,
              }}>
              {item.ukuran}
            </Text>
          </View>
          <View style={{marginVertical: 5}}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="bookmark" type="ionicon" size={14} />
              <Text
                style={{
                  left: 5,
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                }}>
                Deskripsi Produk
              </Text>
            </View>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                fontSize: 20,
                color: colors.secondary,
              }}>
              {item.deskripsi}
            </Text>
          </View>
          <View style={{marginVertical: 5}}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="grid" type="ionicon" size={14} />
              <Text
                style={{
                  left: 5,
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                }}>
                Material
              </Text>
            </View>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                fontSize: 20,
                color: colors.secondary,
              }}>
              {item.material}
            </Text>
          </View>
          <View style={{marginVertical: 5}}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="cube" type="ionicon" size={14} />
              <Text
                style={{
                  left: 5,
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                }}>
                Stok
              </Text>
            </View>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                fontSize: 20,
                left: 5,
                color: colors.secondary,
              }}>
              {item.stok}
            </Text>
          </View>
        </View>
      </View>
      <MyButton
        fontWeight="bold"
        radius={0}
        title="TAMBAH KERANJANG"
        warna={colors.secondary}
        onPress={() => {
          navigation.navigate('PembantuKonfirmasi', item);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
