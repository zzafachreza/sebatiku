import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyButton, MyGap} from '../../components';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {color} from 'react-native-reanimated';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Modalize} from 'react-native-modalize';
import {showMessage} from 'react-native-flash-message';
import {getData} from '../../utils/localStorage';
import axios from 'axios';

export default function Barang({navigation, route}) {
  const item = route.params;
  // console.log('detail pembantu', item);
  navigation.setOptions({title: item.nama_lengkap});

  const [jumlah, setJumlah] = useState(1);
  const [ukuran, setUkuran] = useState('S');
  const [user, setUser] = useState({});

  useEffect(() => {
    getData('user').then(res => {
      console.log('data user', res);
      setUser(res);
    });
  }, []);

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

  const modalizeRef = useRef();

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const addToCart = () => {
    const kirim = {
      id_pelanggan: user.id,
      id_barang: item.id,
      nama_barang: item.nama_barang,
      qty: jumlah,
      harga: item.harga,
      total: jumlah * item.harga,
      gambar: item.foto,
      ukuran: ukuran,
    };
    console.log('kirim tok server', kirim);
    axios
      .post('https://zavalabs.com/sebatiku/api/barang_add.php', kirim)
      .then(res => {
        console.log(res);
        // navigation.navigate('Success2', {
        //   message: 'Berhasil Tambah Keranjang',
        // });
        showMessage({
          type: 'success',
          message: 'Berhasil Masuk Keranjang',
        });
        modalizeRef.current.close();
      });
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
        <View style={{backgroundColor: colors.white, padding: 10, flex: 1}}>
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
          <View style={{marginTop: 10}}>
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
        onPress={onOpen}
      />

      <Modalize
        withHandle={false}
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        snapPoint={350}
        HeaderComponent={
          <View style={{padding: 10}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  resizeMode="contain"
                  style={{
                    width: 100,
                    borderRadius: 20,
                    aspectRatio: 1,
                  }}
                  source={{uri: item.foto}}
                />
              </View>
              <View style={{flex: 1, padding: 10, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,
                    color: colors.primary,
                  }}>
                  {' '}
                  Rp. {new Intl.NumberFormat().format(item.harga)}
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.secondary,
                  }}>
                  {' '}
                  Sisa {new Intl.NumberFormat().format(item.stok)}
                </Text>
              </View>
              <TouchableOpacity onPress={() => modalizeRef.current.close()}>
                <Icon type="ionicon" name="close-outline" size={35} />
              </TouchableOpacity>
            </View>
          </View>
        }
        withHandle={false}
        ref={modalizeRef}>
        <View style={{flex: 1, height: 230}}>
          <View style={{padding: 10, flex: 1}}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.primary,
              }}>
              Ukuran
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => setUkuran('S')}
                style={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor:
                    ukuran === 'S' ? colors.primary : colors.secondary,
                  height: 40,
                  width: '20%',
                  marginRight: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {ukuran === 'S' && (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: colors.primary,
                      width: 20,
                      borderBottomRightRadius: 10,
                      top: 0,
                      left: 0,
                    }}>
                    <Icon
                      type="ionicon"
                      name="checkmark"
                      size={15}
                      color={colors.white}
                    />
                  </View>
                )}
                <Text
                  style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 14,
                    color: ukuran === 'S' ? colors.primary : colors.secondary,
                  }}>
                  S
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setUkuran('M')}
                style={{
                  borderRadius: 5,
                  borderWidth: 1,
                  width: '20%',
                  borderColor:
                    ukuran === 'M' ? colors.primary : colors.secondary,
                  marginRight: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {ukuran === 'M' && (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: colors.primary,
                      width: 20,
                      borderBottomRightRadius: 10,
                      top: 0,
                      left: 0,
                    }}>
                    <Icon
                      type="ionicon"
                      name="checkmark"
                      size={15}
                      color={colors.white}
                    />
                  </View>
                )}
                <Text
                  style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 14,
                    color: ukuran === 'M' ? colors.primary : colors.secondary,
                  }}>
                  M
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setUkuran('L')}
                style={{
                  borderRadius: 5,
                  borderWidth: 1,
                  width: '20%',
                  marginRight: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor:
                    ukuran === 'L' ? colors.primary : colors.secondary,
                }}>
                {ukuran === 'L' && (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: colors.primary,
                      width: 20,
                      borderBottomRightRadius: 10,
                      top: 0,
                      left: 0,
                    }}>
                    <Icon
                      type="ionicon"
                      name="checkmark"
                      size={15}
                      color={colors.white}
                    />
                  </View>
                )}
                <Text
                  style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 14,
                    color: ukuran === 'L' ? colors.primary : colors.secondary,
                  }}>
                  L
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setUkuran('XL')}
                style={{
                  borderRadius: 5,

                  borderWidth: 1,
                  width: '20%',
                  marginRight: 10,
                  borderColor:
                    ukuran === 'XL' ? colors.primary : colors.secondary,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {ukuran === 'XL' && (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: colors.primary,
                      width: 20,
                      borderBottomRightRadius: 10,
                      top: 0,
                      left: 0,
                    }}>
                    <Icon
                      type="ionicon"
                      name="checkmark"
                      size={15}
                      color={colors.white}
                    />
                  </View>
                )}
                <Text
                  style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 14,
                    color: ukuran === 'XL' ? colors.primary : colors.secondary,
                  }}>
                  XL
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', marginTop: 20}}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.primary,
                  }}>
                  Jumlah
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',

                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    jumlah == 1
                      ? showMessage({
                          type: 'danger',
                          message: 'Minimal pembelian 1 Pcs',
                        })
                      : setJumlah(jumlah - 1);
                  }}
                  style={{
                    backgroundColor: colors.secondary,
                    width: '30%',
                    borderRadius: 5,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  <Icon type="ionicon" name="remove" color={colors.white} />
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 16, fontFamily: fonts.secondary[600]}}>
                    {jumlah}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    jumlah >= item.stok
                      ? showMessage({
                          type: 'danger',
                          message: 'Pembelian melebihi batas !',
                        })
                      : setJumlah(jumlah + 1);
                  }}
                  style={{
                    backgroundColor: colors.secondary,
                    width: '30%',
                    borderRadius: 5,
                    marginLeft: 10,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon type="ionicon" name="add" color={colors.white} />
                </TouchableOpacity>
              </View>
            </View>
            <MyGap jarak={10} />
            <MyButton
              fontWeight="bold"
              radius={0}
              title="TAMBAH KERANJANG"
              warna={colors.primary}
              onPress={addToCart}
            />
          </View>
        </View>
      </Modalize>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
