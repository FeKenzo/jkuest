import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { db } from '../../db';

export default function Temas() {
  const [nome, setNome] = useState('');
  const [temas, setTemas] = useState([]);

  const carregarTemas = () => {
    db.runAsync((tx) => {
      tx.executeSql('SELECT * FROM temas;', [], (_, { rows }) => {
        setTemas(rows._array);
      });
    });
  };

  useEffect(() => {
    carregarTemas();
  }, []);

  const adicionarTema = () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Digite um nome para o tema.');
      return;
    }
    db.runAsync((tx) => {
      tx.executeSql(
        'INSERT INTO temas (nome) VALUES (?);',
        [nome],
        () => {
          setNome('');
          carregarTemas();
        },
        (_, error) => {
          Alert.alert('Erro', 'Esse tema já existe.');
          return true;
        }
      );
    });
  };

  const removerTema = (id) => {
    db.runAsync((tx) => {
      tx.executeSql('DELETE FROM temas WHERE id = ?;', [id], () => {
        carregarTemas();
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciar Temas</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome do tema"
          value={nome}
          onChangeText={setNome}
        />
        <TouchableOpacity style={styles.botao} onPress={adicionarTema}>
          <Text style={styles.textoBotao}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={temas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTexto}>{item.nome}</Text>
            <TouchableOpacity onPress={() => removerTema(item.id)}>
              <Text style={styles.remover}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  inputContainer: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, padding: 10, marginRight: 10, borderRadius: 5 },
  botao: { backgroundColor: '#4caf50', padding: 10, borderRadius: 5 },
  textoBotao: { color: '#fff', fontWeight: 'bold' },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1 },
  itemTexto: { fontSize: 18 },
  remover: { color: 'red', fontWeight: 'bold' },
});
