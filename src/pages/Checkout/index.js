import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import {getData} from '../../utils/localStorage';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyButton, MyInput, MyGap, MyPicker} from '../../components';
import {colors} from '../../utils/colors';
import {TouchableOpacity, Swipeable} from 'react-native-gesture-handler';
import {fonts} from '../../utils/fonts';
import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {showMessage} from 'react-native-flash-message';

export default function Checkout({navigation, route}) {
  const item = route.params;

  const [kirim, setKirim] = useState({
    id_user: item.id_pelanggan,
    total: item.total,
    nama_lengkap: null,
    nohp: null,
    email: null,
    alamat: null,
    jasakirim: 'JNE',
  });

  const simpan = () => {
    console.log(kirim);

    navigation.navigate('Bayar', kirim);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {/* data penerima */}

          <View style={{padding: 10}}>
            <MyInput
              label="Nama Penerima"
              iconname="person"
              placeholder="Masukan nama penerima"
              value={kirim.nama_lengkap}
              onChangeText={val =>
                setKirim({
                  ...kirim,
                  nama_lengkap: val,
                })
              }
            />
            <MyGap jarak={5} />
            <MyInput
              label="Nomor Handphone"
              iconname="call"
              keyboardType="number-pad"
              placeholder="Masukan nomor telepon"
              value={kirim.nohp}
              onChangeText={val =>
                setKirim({
                  ...kirim,
                  nohp: val,
                })
              }
            />
            <MyGap jarak={5} />
            <MyInput
              label="E-Mail"
              iconname="mail"
              placeholder="Masukan alamat email"
              value={kirim.email}
              onChangeText={val =>
                setKirim({
                  ...kirim,
                  email: val,
                })
              }
            />
            <MyGap jarak={5} />
            <MyInput
              label="Alamat lengkap"
              iconname="map"
              placeholder="Alamat Lengkap"
              value={kirim.alamat}
              onChangeText={val =>
                setKirim({
                  ...kirim,
                  alamat: val,
                })
              }
            />
            <MyGap jarak={5} />
            <MyPicker
              value={kirim.jasakirim}
              onValueChange={val =>
                setKirim({
                  ...kirim,
                  jasakirim: val,
                })
              }
              label="Jasa Kirim"
              data={[
                {
                  value: 'JNE',
                  label: 'JNE',
                },
                {
                  value: 'J&T',
                  label: 'J&T',
                },
              ]}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{padding: 10}}>
        <MyButton
          onPress={simpan}
          title="KONFIRMASI PEMBAYARAN"
          warna={colors.secondary}
          style={{
            justifyContent: 'flex-end',
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
