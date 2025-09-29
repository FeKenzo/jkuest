import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Picker } from 'react-native';
import { db } from '../../db';

export default function Perguntas() {
  const [temas, setTemas] = useState([]);
  const [temaId, setTemaId] = useState(null);
  const [enunciado, setEnunciado] = useState('');
  const [alts, setAlts] = useState(['', '', '', '']);
  const [correta, setCorreta] = useState(1);
  const [perguntas, setPerguntas] = useState([]);

  const carregarTemas = () => {
    db.getAllAsync((tx) => {
      tx.executeSql('SELECT * FROM temas;', [], (_, { rows }) => setTemas(rows._array));
    });
  };

  const carregarPerguntas = () => {
    db.getAllAsync((tx) => {
      tx.executeSql('SELECT * FROM perguntas;', [], (_, { rows }) => setPerguntas(rows._array));
    });
  };

  useEffect(() => {
    carregarTemas();
    carregarPerguntas();
  }, []);

  const adicionarPergunta = () => {
    if (!temaId || !enunciado.trim() || alts.some((a) => !a.trim())) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    db.runAsync((tx) => {
      tx.executeSql(
        'INSERT INTO perguntas (tema_id, enunciado, alt1, alt2, alt3, alt4, correta) VALUES (?,?,?,?,?,?,?);',
        [temaId, enunciado, ...alts, correta],
        () => {
          setEnunciado('');
          setAlts(['', '', '', '']);
          setCorreta(1);
          carregarPerguntas();
        }
      );
    });
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

      <TextInput style={styles.input} placeholder="Enunciado da pergunta" value={enunciado} onChangeText={setEnunciado} />

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

      <TouchableOpacity style={styles.botao} onPress={adicionarPergunta}>
        <Text style={styles.textoBotao}>Adicionar Pergunta</Text>
      </TouchableOpacity>

      <FlatList
        data={perguntas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTexto}>{item.enunciado}</Text>
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
  textoBotao: { color: '#fff', fontWeight: 'bold' },
  picker: { borderWidth: 1, marginBottom: 10 },
  item: { padding: 10, borderBottomWidth: 1 },
  itemTexto: { fontSize: 16 },
});
