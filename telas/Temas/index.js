import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Image } from 'react-native';
import { db } from '../../db';

export default function Temas() {
  const [nome, setNome] = useState('');
  const [temas, setTemas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [novoNome, setNovoNome] = useState('');

  const carregarTemas = async () => {
    try {
      const rows = await db.getAllAsync('SELECT * FROM temas;');
      setTemas(rows);
    } catch (err) {
      console.error("Erro ao carregar temas:", err);
    }
  };

  useEffect(() => {
    carregarTemas();
  }, []);

  const adicionarTema = async () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Digite um nome para o tema.');
      return;
    }
    try {
      await db.runAsync('INSERT INTO temas (nome) VALUES (?);', [nome])
      setNome('');
      carregarTemas();
    } catch (err) {
      Alert.alert('Erro', 'Esse tema já existe.');
    }
  };

  const removerTema = async (id) => {
    try {
      await db.runAsync('DELETE FROM temas WHERE id = ?;', [id]);
      carregarTemas();
    } catch (err) {
      console.error("Erro ao remover tema:", err);
    }
  };

  const editarTema = async (id, nomeEditado) => {
    try {
      if (!nomeEditado.trim()) {
        Alert.alert('Erro', 'O nome do tema não pode ser vazio.');
        return;
      }
      await db.runAsync('UPDATE temas SET nome = ? WHERE id = ?;', [nomeEditado, id]);
      setEditandoId(null);
      setNovoNome('');
      carregarTemas();
    } catch (err) {
      console.error("Erro ao editar tema:", err);
      Alert.alert('Erro', 'Não foi possível editar o tema.');
    }
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
            {editandoId === item.id ? (
              <TextInput
                style={styles.input}
                value={novoNome}
                onChangeText={setNovoNome}
                placeholder="Novo nome"
              />
            ) : (
              <Text style={styles.itemTexto}>{item.nome}</Text>
            )}

            <View style={styles.acoes}>
              {editandoId === item.id ? (
                <TouchableOpacity
                  style={styles.botaoSalvar}
                  onPress={() => editarTema(item.id, novoNome)}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Salvar</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setEditandoId(item.id);
                    setNovoNome(item.nome);
                  }}
                >
                  <Image source={require('../../assets/editar.png')} style={styles.icone} />
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={() => removerTema(item.id)}>
                <Image source={require('../../assets/trash.png')} style={styles.icone} />
              </TouchableOpacity>
            </View>
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
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  itemTexto: { fontSize: 18, flex: 1 },
  remover: { color: 'red', fontWeight: 'bold', marginLeft: 10 },
  icone: { width: 24, height: 24, marginHorizontal: 10 },
  acoes: { flexDirection: 'row', alignItems: 'center' },
  botaoSalvar: {
    backgroundColor: '#2196f3',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
