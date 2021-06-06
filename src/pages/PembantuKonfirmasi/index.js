import React, {useState, useEffect} from 'react';
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
import {MyButton, MyInput, MyGap} from '../../components';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {color} from 'react-native-reanimated';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TouchableWithoutFeedback} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Icon} from 'react-native-elements';

export default function Pembantu({navigation, route}) {
  const item = route.params;
  const [data, setData] = useState(item);
  // console.log('detail pembantu', item);
  navigation.setOptions({title: item.nama_lengkap});

  const Today = new Date();
  const dd = String(Today.getDate()).padStart(2, '0');
  const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = Today.getFullYear();
  const jam = Today.getHours();
  const menit = Today.getMinutes();
  const detik = Today.getUTCSeconds();
  const today = `${dd}/${mm}/${yyyy}`;
  const TodayTime = `${jam}:${menit}`;

  const [tanggalAntar, setTanggalAntar] = useState(today);
  const [jamAntar, setJamAntar] = useState(TodayTime);
  const [alamatAntar, setAlamatAntar] = useState('');
  const [paket, setPaket] = useState('');
  const [paketHarga, setPaketHarga] = useState('');
  const [warna1, setWarna1] = useState(true);
  const [warna2, setWarna2] = useState(false);
  const [warna3, setWarna3] = useState(false);
  // datepicker

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [mode2, setMode2] = useState('time');
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    // alert(currentDate);

    const Today = new Date(currentDate);
    const dd = String(Today.getDate()).padStart(2, '0');
    const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = Today.getFullYear();
    const jam = Today.getHours();
    const menit = Today.getMinutes();
    const detik = Today.getUTCSeconds();
    const today = `${dd}/${mm}/${yyyy}`;

    setTanggalAntar(`${dd}/${mm}/${yyyy}`);
    setJamAntar(`${jam}:${menit}`);
    setData({
      ...data,
      tanggalAntar: `${yyyy}-${mm}-${dd}`,
    });
  };

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    // alert(currentDate);

    const Today = new Date(currentDate);
    const dd = String(Today.getDate()).padStart(2, '0');
    const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = Today.getFullYear();
    const jam = Today.getHours();
    const menit = Today.getMinutes();
    const detik = Today.getUTCSeconds();
    const today = `${dd}/${mm}/${yyyy}`;

    setTanggalAntar(`${dd}/${mm}/${yyyy}`);
    setData({
      ...data,
      tanggalAntar: `${yyyy}-${mm}-${dd}`,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode2('time');
  };
  const showMode2 = currentMode => {
    setShow2(true);
    setMode2(currentMode);
  };

  useEffect(() => {
    setData({
      ...data,
      paket: 'PAKET A',
      paketHarga: 2500000,
      tanggalAntar: `${yyyy}-${mm}-${dd}`,
      jamAntar: `${jam}:${menit}`,
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              //   padding: 10,

              flex: 1,
            }}>
            <View
              style={{
                // backgroundColor: 'red',
                overflow: 'hidden',
                width: 70,
                height: 70,
                borderRadius: 70 / 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                resizeMode="contain"
                style={{
                  width: 80,
                  height: 80,
                }}
                source={{
                  uri: item.foto2,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 4,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: 20,
              }}>
              {item.nama_lengkap} ({' '}
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  fontSize: 18,
                  color: colors.primary,
                }}>
                {item.nama_panggilan}
              </Text>{' '}
              )
            </Text>
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
                  Gaji yang diharapkan
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  fontSize: 12,
                  color: colors.black,
                }}>
                Rp. {new Intl.NumberFormat().format(item.gaji)}
              </Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: 30}} />
        <View
          style={{
            padding: 10,
          }}>
          <View
            style={{
              marginVertical: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Icon
                type="ionicon"
                name="cube"
                color={colors.primary}
                size={16}
              />
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.primary,
                  left: 10,
                  fontSize: 16,
                }}>
                Pilih Paket Administrasi
              </Text>
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                if (warna1) {
                  setWarna1(false);
                } else {
                  setWarna1(true);
                  setWarna2(false);
                  setWarna3(false);
                  setData({
                    ...data,
                    paket: 'PAKET A',
                    paketHarga: 2500000,
                  });
                }
              }}>
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  padding: 5,
                  margin: 5,
                  borderRadius: 10,
                  borderColor: colors.secondary,
                  backgroundColor: warna1 ? colors.primary : colors.white,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 16,
                    color: warna1 ? colors.white : colors.black,
                  }}>
                  PAKET A
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 14,
                    color: warna1 ? colors.white : colors.black,
                  }}>
                  Garansi 4 Bulan 2x Ganti
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 18,
                    color: warna1 ? colors.white : colors.black,
                  }}>
                  Rp. 2.500.000
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                if (warna2) {
                  setWarna2(false);
                } else {
                  setWarna1(false);
                  setWarna2(true);
                  setWarna3(false);
                  setData({
                    ...data,
                    paket: 'PAKET B',
                    paketHarga: 3500000,
                  });
                }
              }}>
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  padding: 5,
                  margin: 5,
                  borderRadius: 10,
                  borderColor: colors.secondary,
                  backgroundColor: warna2 ? colors.primary : colors.white,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 16,
                    color: warna2 ? colors.white : colors.black,
                  }}>
                  PAKET B
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 14,
                    color: warna2 ? colors.white : colors.black,
                  }}>
                  Garansi 6 Bulan 3x Ganti
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 18,
                    color: warna2 ? colors.white : colors.black,
                  }}>
                  Rp. 3.500.000
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                if (warna3) {
                  setWarna3(false);
                } else {
                  setWarna1(false);
                  setWarna2(false);
                  setWarna3(true);
                  setData({
                    ...data,
                    paket: 'PAKET C',
                    paketHarga: 5000000,
                  });
                }
              }}>
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  padding: 5,
                  margin: 5,
                  borderRadius: 10,
                  borderColor: colors.secondary,
                  backgroundColor: warna3 ? colors.primary : colors.white,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 16,
                    color: warna3 ? colors.white : colors.black,
                  }}>
                  PAKET C
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 14,
                    color: warna3 ? colors.white : colors.black,
                  }}>
                  1 Tahun Bebas Ganti
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 18,
                    color: warna3 ? colors.white : colors.black,
                  }}>
                  Rp. 5.000.000
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <MyInput
            onFocus={() => {
              showDatepicker();
            }}
            label="Tanggal Antar"
            iconname="calendar"
            value={tanggalAntar}
            onChangeText={value => setTanggalAntar(value)}
          />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              format="YYYY-MM-DD"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <MyGap jarak={10} />
          <MyInput
            onFocus={showTimepicker}
            label="Jam Antar"
            iconname="time"
            value={data.jamAntar}
            onChangeText={value =>
              setData({
                ...data,
                jamAntar: value,
              })
            }
          />
          {/* {show2 && (
            <DateTimePicker
              testID="dateTimePicker2"
              value={date}
              mode="time"
              is24Hour={true}
              display="default"
              // onChange={() => onChangeTime}
            />
          )} */}

          <MyGap jarak={10} />
          <MyInput
            value={data.alamatAntar}
            onChangeText={val =>
              setData({
                ...data,
                alamatAntar: val,
              })
            }
            iconname="home"
            label="Alamat Antar"
          />
        </View>
      </ScrollView>
      <MyButton
        fontWeight="bold"
        radius={0}
        title="BOOKING"
        warna={colors.primary}
        onPress={() => {
          console.log(data);
          navigation.navigate('PembantuSelesai', data);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
