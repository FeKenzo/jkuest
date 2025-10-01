import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../db';

export default function Perguntas() {
  const [temas, setTemas] = useState([]);
  const [temaId, setTemaId] = useState(null);
  const [enunciado, setEnunciado] = useState('');
  const [alts, setAlts] = useState(['', '', '', '']);
  const [correta, setCorreta] = useState(1);
  const [perguntas, setPerguntas] = useState([]);
  const [editandoId, setEditandoId] = useState(null); // para saber se está editando

  const carregarTemas = async () => {
    try {
      const rows = await db.getAllAsync('SELECT * FROM temas;');
      setTemas(rows);
    } catch (err) {
      console.error("Erro ao carregar temas:", err);
    }
  };

  const carregarPerguntas = async () => {
    try {
      const rows = await db.getAllAsync('SELECT * FROM perguntas;');
      setPerguntas(rows);
    } catch (err) {
      console.error("Erro ao carregar perguntas:", err);
    }
  };

  useEffect(() => {
    carregarTemas();
    carregarPerguntas();
  }, []);

  const adicionarOuEditarPergunta = async () => {
    try {
      if (!temaId || !enunciado.trim() || alts.some((a) => !a.trim())) {
        Alert.alert('Erro', 'Preencha todos os campos.');
        return;
      }

      if (editandoId) {
        // Atualiza pergunta existente
        await db.runAsync(
          'UPDATE perguntas SET tema_id = ?, enunciado = ?, alt1 = ?, alt2 = ?, alt3 = ?, alt4 = ?, correta = ? WHERE id = ?;',
          [temaId, enunciado, ...alts, correta, editandoId]
        );
        Alert.alert('Sucesso', 'Pergunta atualizada!');
        setEditandoId(null);
      } else {
        // Insere nova pergunta
        await db.runAsync(
          'INSERT INTO perguntas (tema_id, enunciado, alt1, alt2, alt3, alt4, correta) VALUES (?,?,?,?,?,?,?);',
          [temaId, enunciado, ...alts, correta]
        );
        Alert.alert('Sucesso', 'Pergunta adicionada!');
      }

      // Limpa formulário
      setEnunciado('');
      setAlts(['', '', '', '']);
      setCorreta(1);

      carregarPerguntas();
    } catch (err) {
      console.error("Erro ao salvar pergunta:", err);
      Alert.alert('Erro', 'Não foi possível salvar a pergunta.');
    }
  };

  const editarPergunta = (pergunta) => {
    setEditandoId(pergunta.id);
    setTemaId(pergunta.tema_id);
    setEnunciado(pergunta.enunciado);
    setAlts([pergunta.alt1, pergunta.alt2, pergunta.alt3, pergunta.alt4]);
    setCorreta(pergunta.correta);
  };

  const removerPergunta = async (id) => {
    try {
      await db.runAsync('DELETE FROM perguntas WHERE id = ?;', [id]);
      carregarPerguntas();
      Alert.alert('Sucesso', 'Pergunta excluída!');
    } catch (err) {
      console.error("Erro ao excluir pergunta:", err);
      Alert.alert('Erro', 'Não foi possível excluir a pergunta.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciar Perguntas</Text>

      <Text>Tema:</Text>
      <Picker selectedValue={temaId} onValueChange={(val) => setTemaId(val)} style={styles.picker}>
        <Picker.Item label="Selecione um tema" value={null} />
        {temas.map((t) => (
          <Picker.Item key={t.id} label={t.nome} value={t.id} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Enunciado da pergunta"
        value={enunciado}
        onChangeText={setEnunciado}
      />

      {alts.map((alt, i) => (
        <TextInput
          key={i}
          style={styles.input}
          placeholder={`Alternativa ${i + 1}`}
          value={alt}
          onChangeText={(val) => {
            const novas = [...alts];
            novas[i] = val;
            setAlts(novas);
          }}
        />
      ))}

      <Text>Alternativa correta:</Text>
      <Picker selectedValue={correta} onValueChange={(val) => setCorreta(val)} style={styles.picker}>
        <Picker.Item label="1" value={1} />
        <Picker.Item label="2" value={2} />
        <Picker.Item label="3" value={3} />
        <Picker.Item label="4" value={4} />
      </Picker>

      <TouchableOpacity style={styles.botao} onPress={adicionarOuEditarPergunta}>
        <Text style={styles.textoBotao}>
          {editandoId ? "Salvar Alterações" : "Adicionar Pergunta"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={perguntas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTexto}>{item.enunciado}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => editarPergunta(item)}>
                <Text style={styles.editar}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removerPergunta(item.id)}>
                <Text style={styles.remover}>Excluir</Text>
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
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  botao: { backgroundColor: '#4caf50', padding: 10, borderRadius: 5, marginBottom: 20 },
  textoBotao: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  picker: { borderWidth: 1, marginBottom: 10 },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1 },
  itemTexto: { fontSize: 16, flex: 1 },
  editar: { color: 'blue', marginRight: 15 },
  remover: { color: 'red' },
});
