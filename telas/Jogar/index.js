import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Picker, TextInput } from "react-native";
import { db, salvarResultado } from "../../db";

export default function Jogar({ route, navigation }) {
  const { temaId: temaParam, quantidade: qtdParam } = route.params;
  const [temas, setTemas] = useState([]);
  const [temaId, setTemaId] = useState(temaParam || null);
  const [quantidade, setQuantidade] = useState(qtdParam || 5);

  const [perguntas, setPerguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState([]);

  // carregar temas do banco
  useEffect(() => {
    db.getAllAsync("SELECT * FROM temas;", []).then((rows) => setTemas(rows));
  }, []);

  // carregar perguntas somente se params existirem
  useEffect(() => {
    if (!temaId || !quantidade) return;
    db.getAllAsync(
      "SELECT * FROM perguntas WHERE tema_id = ? ORDER BY RANDOM() LIMIT ?",
      [temaId, quantidade]
    ).then((rows) => setPerguntas(rows));
  }, [temaId, quantidade]);

  // lógica do jogo
  const responder = (resposta) => {
    const perguntaAtual = perguntas[indice];
    const acertou = resposta === perguntaAtual.correta;

    const novasRespostas = [
      ...respostas,
      { pergunta: perguntaAtual, resposta, acertou },
    ];

    setRespostas(novasRespostas);

    if (indice + 1 < perguntas.length) {
      setIndice(indice + 1);
    } else {
      const corretas = novasRespostas.filter((r) => r.acertou).length;
      salvarResultado(temaId, perguntas.length, corretas);
      navigation.replace("Resumo", { respostas: novasRespostas });
    }
  };

  // se não tiver temaId/quantidade => mostrar seleção
  if (!temaId || !quantidade || perguntas.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Escolha o Tema</Text>

        <Picker
          selectedValue={temaId}
          style={styles.picker}
          onValueChange={(val) => setTemaId(val)}
        >
          <Picker.Item label="Selecione um tema" value={null} />
          {temas.map((t) => (
            <Picker.Item key={t.id} label={t.nome} value={t.id} />
          ))}
        </Picker>

        <Text style={styles.titulo}>Quantidade de perguntas</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(quantidade)}
          onChangeText={(val) => setQuantidade(parseInt(val) || 1)}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={() => {
            if (!temaId) return alert("Escolha um tema");
            navigation.replace("Jogar", { temaId, quantidade });
          }}
        >
          <Text style={styles.textoBotao}>Iniciar Jogo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // jogo rodando
  const atual = perguntas[indice];

  return (
    <View style={styles.container}>
      <Text style={styles.enunciado}>
        {indice + 1}. {atual.enunciado}
      </Text>
      {[1, 2, 3, 4].map((num) => (
        <TouchableOpacity
          key={num}
          style={styles.botao}
          onPress={() => responder(num)}
        >
          <Text style={styles.texto}>{atual[`alt${num}`]}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  titulo: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  picker: { borderWidth: 1, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 20 },
  enunciado: { fontSize: 18, marginBottom: 20 },
  botao: { backgroundColor: "#3498db", padding: 15, borderRadius: 8, marginVertical: 8 },
  texto: { color: "#fff", fontSize: 16, textAlign: "center" },
  textoBotao: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
});
