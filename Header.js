import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function Header({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          source={require('./assets/JKuestLogo.png')} // ajuste o caminho conforme necessário
          style={styles.logo}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#f0fff0',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#81c784',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});
