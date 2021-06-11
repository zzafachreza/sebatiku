import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {tan} from 'react-native-reanimated';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import axios from 'axios';
import {getData} from '../../utils/localStorage';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MyButton} from '../../components';
import {useIsFocused} from '@react-navigation/native';

export default function ListData() {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    const json = JSON.stringify(remoteMessage);
    const obj = JSON.parse(json);
    // alert(obj.notification);
    // console.log('list transaksi', obj.notification);
    getData('user').then(res => {
      setUser(res);
      // console.log(res);

      axios
        .post('https://zavalabs.com/sebatiku/api/transaksi.php', {
          id_pelanggan: res.id,
        })
        .then(res => {
          // console.log(res.data);
          setData(res.data);
        });
    });
  });

  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      // console.log(res);

      axios
        .post('https://zavalabs.com/sebatiku/api/transaksi.php', {
          id_pelanggan: res.id,
        })
        .then(res => {
          // console.log(res.data);
          setData(res.data);
        });
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{
          padding: 10,
          flex: 1,
        }}>
        {data.map(item => {
          return (
            <View
              style={{
                margin: 5,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderColor: colors.primary,
                borderWidth: 1,
                backgroundColor: colors.white,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View style={{flex: 1, padding: 10}}>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                      fontSize: 12,
                    }}>
                    Nomor Transaksi - Nama Pelanggan :
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: 20,
                    }}>
                    {item.kode}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: 16,
                      color: colors.primary,
                    }}>
                    {item.nama_lengkap}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                    }}>
                    {item.tgl_pesanan}
                  </Text>
                </View>
                <View></View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View style={{flex: 1, padding: 10}}>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: 18,
                    }}>
                    {item.jasakirim}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      // borderBottomRightRadius: 10,
                      // backgroundColor: colors.border,
                      fontFamily: fonts.secondary[600],
                      fontSize: 25,
                      color: colors.black,
                      padding: 10,
                    }}>
                    Rp. {item.total}
                  </Text>
                </View>
              </View>

              {item.status === 'menunggu' && (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      backgroundColor: colors.warning,
                      color: colors.black,
                      padding: 10,
                      fontFamily: fonts.secondary[600],
                    }}>
                    Sedang Dikemas
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      axios
                        .post(
                          'https://zavalabs.com/sebatiku/api/transaksi_hapus.php',
                          {
                            id_pelanggan: item.id_pelanggan,
                            notransaksi: item.kode,
                          },
                        )
                        .then(res => {
                          axios
                            .post(
                              'https://zavalabs.com/sebatiku/api/transaksi.php',
                              {
                                id_pelanggan: item.id_pelanggan,
                              },
                            )
                            .then(res => {
                              console.log(res.data);
                              setData(res.data);
                            });
                        });
                    }}
                    style={{
                      padding: 10,
                      backgroundColor: colors.danger,
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                      }}>
                      Batalkan Transaksi
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {item.status === 'dikirim' && (
                <>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        flex: 1,
                        backgroundColor: colors.border,
                        color: colors.black,
                        padding: 10,
                        fontFamily: fonts.secondary[600],
                      }}>
                      Sedang Dikirim
                    </Text>

                    <Text
                      style={{
                        flex: 2,
                        backgroundColor: colors.primary,
                        color: colors.black,

                        padding: 10,
                        fontFamily: fonts.secondary[600],
                      }}>
                      No.Resi : {item.noresi}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        axios
                          .post(
                            'https://zavalabs.com/sebatiku/api/transaksi_terima.php',
                            {
                              id_pelanggan: item.id_pelanggan,
                              notransaksi: item.kode,
                            },
                          )
                          .then(res => {
                            axios
                              .post(
                                'https://zavalabs.com/sebatiku/api/transaksi.php',
                                {
                                  id_pelanggan: item.id_pelanggan,
                                },
                              )
                              .then(res => {
                                console.log(res.data);
                                setData(res.data);
                              });
                          });
                      }}
                      style={{
                        padding: 20,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.secondary,
                      }}>
                      <Text
                        style={{
                          fontFamily: fonts.secondary[600],
                          color: colors.white,
                        }}>
                        Terima Pesanan
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {item.status === 'selesai' && (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      backgroundColor: colors.primary,
                      color: colors.white,
                      padding: 10,
                      fontFamily: fonts.secondary[600],
                      textAlign: 'center',
                    }}>
                    Selesai
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
