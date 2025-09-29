import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db } from '../../db';

export default function Jogar() {
  const [temas, setTemas] = useState([]);

  useEffect(() => {
    db.runAsync((tx) => {
      tx.executeSql('SELECT t.id, t.nome, COUNT(p.id) as total FROM temas t LEFT JOIN perguntas p ON t.id=p.tema_id GROUP BY t.id;', [], (_, { rows }) => {
        setTemas(rows._array);
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogar Quiz</Text>
      {temas.map((t) => (
        <View key={t.id} style={styles.temaBox}>
          <Text style={styles.temaNome}>{t.nome}</Text>
          <Text style={styles.qtd}>{t.total} perguntas</Text>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => Alert.alert('Em desenvolvimento', `Você jogaria o quiz de ${t.nome}`)}
          >
            <Text style={styles.textoBotao}>Jogar</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  temaBox: { padding: 15, marginBottom: 15, borderWidth: 1, borderRadius: 10 },
  temaNome: { fontSize: 18, fontWeight: 'bold' },
  qtd: { color: 'gray', marginBottom: 10 },
  botao: { backgroundColor: '#2196f3', padding: 10, borderRadius: 5 },
  textoBotao: { color: '#fff', fontWeight: 'bold' },
});
