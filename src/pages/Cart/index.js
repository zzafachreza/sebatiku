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
import {MyButton} from '../../components';
import {colors} from '../../utils/colors';
import {TouchableOpacity, Swipeable} from 'react-native-gesture-handler';
import {fonts} from '../../utils/fonts';
import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import 'intl';
import 'intl/locale-data/jsonp/en';

export default function Cart({navigation, route}) {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  //   useEffect(() => {

  //   }, []);

  useEffect(() => {
    if (isFocused) {
      console.log('called');
      getData('user').then(res => {
        console.log(res);
        setUser(res);
        __getDataBarang(res.id);
      });
    }
  }, [isFocused]);

  const __getDataBarang = id_member => {
    axios
      .post('https://zavalabs.com/sebatiku/api/cart.php', {
        id_pelanggan: id_member,
      })
      .then(res => {
        console.log('data barang,', res.data);
        setData(res.data);
      });
  };

  const hanldeHapus = (id, id_pelanggan) => {
    console.log(id + id_pelanggan);
    axios
      .post('https://zavalabs.com/sebatiku/api/cart_hapus.php', {
        id: id,
        id_pelanggan: id_pelanggan,
      })
      .then(res => {
        console.log('delete', res);
        __getDataBarang(id_pelanggan);
      });
  };

  var sub = 0;
  data.map(item => {
    sub += parseFloat(item.total);

    console.log(sub);
  });

  const __renderItem = ({item}) => {
    return (
      <Swipeable
        renderRightActions={() => {
          return (
            <TouchableWithoutFeedback
              onPress={() => hanldeHapus(item.id, item.id_pelanggan)}>
              <View
                style={{
                  // flex: 1,
                  width: 100,
                  //   backgroundColor: 'blue',
                  // padding: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type="ionicon"
                  name="trash"
                  size={40}
                  color={colors.danger}
                />
              </View>
            </TouchableWithoutFeedback>
          );
        }}>
        <View
          style={{
            marginVertical: 10,
            borderRadius: 10,
            borderWidth: 1,
            padding: 10,
            borderColor: colors.secondary,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              resizeMode="contain"
              style={{
                width: 70,
                borderRadius: 20,
                aspectRatio: 1,
              }}
              source={{uri: item.foto}}
            />
            <View style={{marginLeft: 10, flex: 1}}>
              <Text style={{fontFamily: fonts.secondary[600]}}>
                {item.nama_barang}
              </Text>

              <Text style={{fontFamily: fonts.secondary[400], flex: 1}}>
                {new Intl.NumberFormat().format(item.harga)} x {item.qty}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.primary,
                  fontSize: 16,
                }}>
                Ukuran : {item.ukuran}
              </Text>
            </View>
            <View style={{padding: 10}}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.secondary,
                  fontSize: 20,
                }}>
                {new Intl.NumberFormat().format(item.total)}
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}></View>
        </View>
      </Swipeable>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // padding: 10,
      }}>
      <View style={{padding: 10, flex: 1}}>
        <FlatList data={data} renderItem={__renderItem} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: fonts.secondary[600],
              left: 10,
            }}>
            Rp. {new Intl.NumberFormat().format(sub)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Checkout', {
              total: sub,
              id_pelanggan: user.id,
            })
          }
          style={{
            flex: 1,
            backgroundColor: colors.primary,
            padding: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: fonts.secondary[600],
              color: 'white',
            }}>
            CHECKOUT
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});