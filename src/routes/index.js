import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  View,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Splash,
  GetStarted,
  Login,
  Register,
  Home,
  Account,
  Success,
  Berita,
  Tambah,
  List,
  Success2,
  ListDetail,
  Edit,
  Pelamar,
  PelamarDetail,
  PelamarSelesai,
  Search,
  Kategori,
  PembantuSelsai,
  ListData,
  Notifikasi,
  PembantuKonfirmasi,
  Barang,
  Cart,
  Checkout,
  Bayar,
} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigator} from '../components';
import {colors} from '../utils/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Transaksi" component={ListData} />
      {/* <Tab.Screen name="Cart" component={Cart} /> */}
      {/* <Tab.Screen name="Notifikasi" component={Notifikasi} /> */}
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default function Router() {
  return (
    <Stack.Navigator initialRouteName={'Splash'}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Pelamar"
        component={Pelamar}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PelamarDetail"
        component={PelamarDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ListData"
        component={ListData}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PelamarSelesai"
        component={PelamarSelesai}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Success"
        component={Success}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Berita"
        component={Berita}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Success2"
        component={Success2}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: 'Login',
          headerShown: false,

          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerTitle: 'Register',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PembantuSelesai"
        component={PembantuSelsai}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Kategori"
        component={Kategori}
        options={({route, navigation}) => ({
          title: 'Detail Pembantu',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Cart"
        component={Cart}
        options={({route, navigation}) => ({
          title: 'Keranjang',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={({route, navigation}) => ({
          title: 'Checkout',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Bayar"
        component={Bayar}
        options={({route, navigation}) => ({
          title: 'Pembayaran',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Barang"
        component={Barang}
        options={({route, navigation}) => ({
          title: 'Detail Barang',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="PembantuKonfirmasi"
        component={PembantuKonfirmasi}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Tambah"
        component={Tambah}
        options={({route, navigation}) => ({
          title: 'TAMBAH',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="List"
        component={List}
        options={({route, navigation}) => ({
          title: 'LIST DATA',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="ListDetail"
        component={ListDetail}
        options={({route, navigation}) => ({
          title: 'LIST DETAIL',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Edit"
        component={Edit}
        options={({route, navigation}) => ({
          title: 'EDIT DATA',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
