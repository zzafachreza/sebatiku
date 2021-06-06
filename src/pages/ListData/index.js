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

export default function ListData() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    const json = JSON.stringify(remoteMessage);
    const obj = JSON.parse(json);
    // alert(obj.notification);
    console.log('list transaksi', obj.notification);
    getData('user').then(res => {
      setUser(res);
      console.log(res);

      axios
        .post('https://zavalabs.com/pembantuku/api/transaksi.php', {
          id_member: res.id,
        })
        .then(res => {
          console.log(res.data);
          setData(res.data);
        });
    });
  });

  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      console.log(res);

      axios
        .post('https://zavalabs.com/pembantuku/api/transaksi.php', {
          id_member: res.id,
        })
        .then(res => {
          console.log(res.data);
          setData(res.data);
        });
    });
  }, []);

  const MyList = ({
    tanggal,
    nama_pembantu,
    status,
    sebagai_apa,
    kode,
    gaji,
    paket,
    paket_harga,
  }) => {
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
              Kode Booking :
            </Text>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: 20,
              }}>
              {kode}
            </Text>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
              }}>
              {tanggal}
            </Text>
          </View>
          <View>
            {status === 'DONE' && (
              <Text
                style={{
                  borderTopRightRadius: 10,
                  backgroundColor: colors.secondary,
                  color: colors.white,
                  padding: 10,
                }}>
                {status}
              </Text>
            )}

            {status === 'BOOKED' && (
              <Text
                style={{
                  borderTopRightRadius: 10,
                  backgroundColor: colors.primary,
                  color: colors.white,
                  padding: 10,
                }}>
                {status}
              </Text>
            )}
          </View>
        </View>

        <View style={{flex: 1, padding: 10}}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 18,
            }}>
            {nama_pembantu}
            {' ( '}
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                fontSize: 18,
                color: colors.primary,
              }}>
              {sebagai_apa}
            </Text>
            {' ) '}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: 18,
            }}>
            Gaji yang diharapkan
            {' - '}
            <Text
              style={{
                textAlign: 'right',
                fontFamily: fonts.secondary[600],
                fontSize: 18,
                color: colors.primary,
              }}>
              Rp. {gaji}
            </Text>
          </Text>
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
              {paket}
            </Text>
          </View>
          <View>
            <Text
              style={{
                // borderBottomRightRadius: 10,
                backgroundColor: colors.secondary,
                fontFamily: fonts.secondary[600],
                fontSize: 18,
                color: colors.white,
                padding: 10,
              }}>
              Rp. {paket_harga}
            </Text>
          </View>
        </View>
        {status === 'BOOKED' && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                borderTopWidth: 1,
                marginTop: 5,
                borderTopColor: colors.primary,
                backgroundColor: colors.primary,
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: fonts.secondary[600],
                  padding: 10,
                }}>
                Transfer Ke :
              </Text>
              <Image
                source={require('../../assets/bca.png')}
                style={{width: 100, height: 30, margin: 10}}
              />
            </View>
            <Text
              style={{
                color: colors.black,
                fontSize: 16,
                fontFamily: fonts.secondary[600],
                padding: 10,
              }}>
              No.Acc : 8525 001 594
            </Text>
            <Text
              style={{
                // borderTopRightRadius: 10,
                // backgroundColor: colors.primary,
                color: colors.black,
                fontFamily: fonts.secondary[600],
                fontSize: 16,
                padding: 10,
              }}>
              Atn : Feny Taslim
            </Text>
          </View>
        )}
      </View>
    );
  };

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
            <MyList
              kode={item.kode}
              gaji={item.gaji}
              tanggal={item.tanggal}
              nama_pembantu={item.nama_pekerja}
              status={item.status}
              sebagai_apa={item.sebagai_apa}
              paket={item.paket}
              paket_harga={item.paket_harga}
            />
          );
        })}
      </ScrollView>
      <View
        style={{
          padding: 10,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
          }}>
          Note :{' '}
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[400],
          }}>
          Belum termasuk biaya transport ke rumah majikan dan biaya rapid
          antigen
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[400],
          }}>
          semua pekerja sudah di karantina dan rapid antigen ketika datang ke
          penampungan
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
