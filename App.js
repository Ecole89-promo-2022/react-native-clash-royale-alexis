import { StatusBar } from 'expo-status-bar';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from './components/Home';
import Profile from './components/Profile';
import CardDetails from './components/CardDetails';
import Countries from './components/Countries';
import Clans from './components/Clans';
import ClanDetails from './components/ClanDetails';
import Player from './components/Player';
import { SearchPlayer } from './components/SearchPlayer';
import { SearchClan } from './components/SearchClan';

const Stack = createNativeStackNavigator();
const logo = require('./assets/logo.png');


const CustomHeader = () => {
  const [menuVisible, setMenuVisible] = useState(false)
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Text style={styles.headerTitle}>Menu</Text>
      </TouchableOpacity>
      <Image source={logo} style={{ width: 150, height: 50, }} resizeMode='contain' />
      <Modal
        animationType='slide'
        transparent={true}
        visible={menuVisible}

      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setMenuVisible(false)}>
            <Ionicons name="close" size={24} color='#000000' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Home') }} >
            <Text style={styles.menuItem}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Profile') }} >
            <Text style={styles.menuItem}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Countries') }} >
            <Text style={styles.menuItem}>Countries</Text>
          </TouchableOpacity>
          <Text style={styles.menuItem}>Search Player</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('SearchClan') }} >
            <Text style={styles.menuItem}>Search Clan</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <CustomHeader {...props} />
        }}
      >
        <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
        <Stack.Screen name="CardDetails" component={CardDetails} options={{ title: 'Détails de la carte' }} />
        <Stack.Screen name="Countries" component={Countries} options={{ title: 'Countries' }} />
        <Stack.Screen name="Clans" component={Clans} options={{ title: 'Clans' }} />
        <Stack.Screen name="ClanDetails" component={ClanDetails} options={{ title: 'Clan Details' }} />
        <Stack.Screen name="Player" component={Player} options={{ title: 'Player' }} />
        <Stack.Screen name="SearchPlayer" component={SearchPlayer} options={{ title: 'Search Player' }} />
        <Stack.Screen name="SearchClan" component={SearchClan} options={{ title: 'Search Clan' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#6200ee',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'futura',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    maxHeight: 180,
    margin: 'auto',
    backgroundColor: 'rgba(0,0,0,0.25)'
  },
  menuItem: {
    fontSize: 24,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginRight: 10,
  }
});
