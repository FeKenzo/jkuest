import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';

export default function Home({ navigation }) {
  useEffect(() => {
    return () => {
      console.log('Finalizando tela: Home');
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sistema de Quiz</Text>
      <Text style={styles.subtitulo}>Escolha uma opção abaixo</Text>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Temas')}>
        <Text style={styles.textoBotao}>Gerenciar Temas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Perguntas')}>
        <Text style={styles.textoBotao}>Gerenciar Perguntas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('EscolherTema')}>
        <Text style={styles.textoBotao}>Jogar Quiz</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fff0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2e7d32',
  },
  subtitulo: {
    fontSize: 18,
    marginBottom: 30,
    color: '#388e3c',
  },
  botao: {
    width: '90%',
    height: 70,
    backgroundColor: '#81c784',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  textoBotao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
