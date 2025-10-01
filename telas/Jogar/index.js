import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { db } from "../../db";

export default function Jogar({ route, navigation }) {
  const { temaId, quantidade } = route.params;

  const [perguntas, setPerguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState([]);

  useEffect(() => {
    db.getAllAsync(
      "SELECT * FROM perguntas WHERE tema_id = ? ORDER BY RANDOM() LIMIT ?;",
      [temaId, quantidade]
    )
      .then((rows) => setPerguntas(rows))
      .catch((err) => console.error("Erro ao carregar perguntas:", err));
  }, []);

  const responder = (opcao) => {
    const perguntaAtual = perguntas[indice];
    const acertou = opcao === perguntaAtual.correta;

    // Nova resposta
    const novaResposta = { pergunta: perguntaAtual, resposta: opcao, acertou };

    // Respostas atualizadas (incluindo a nova)
    const respostasAtualizadas = [...respostas, novaResposta];

    setRespostas(respostasAtualizadas);

    if (indice + 1 < perguntas.length) {
      setIndice(indice + 1);
    } else {
      // Agora usamos respostasAtualizadas, que já contém a última resposta
      const resultados = perguntas.map((p, i) => ({
        enunciado: p.enunciado,
        respostaUsuarioNum: respostasAtualizadas[i]?.resposta,
        respostaUsuarioLetra: numParaLetra(respostasAtualizadas[i]?.resposta),
        textoRespostaUsuario: respostasAtualizadas[i] ? p[`alt${respostasAtualizadas[i].resposta}`] : '',
        respostaCorretaNum: p.correta,
        respostaCorretaLetra: numParaLetra(p.correta),
        textoRespostaCorreta: p[`alt${p.correta}`],
        correta: respostasAtualizadas[i]?.acertou
      }));

      const acertos = resultados.filter(r => r.correta).length;
      const erros = resultados.length - acertos;

      navigation.navigate("Resultados", { resultados, acertos, erros });
    }
  };

  if (perguntas.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Carregando perguntas...</Text>
      </View>
    );
  }

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

const numParaLetra = (num) => {
  switch (num) {
    case 1: return 'a';
    case 2: return 'b';
    case 3: return 'c';
    case 4: return 'd';
    default: return '';
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#f0fff0" },
  enunciado: { fontSize: 20, marginBottom: 20, fontWeight: "bold", color: "#2e7d32" },
  botao: {
    backgroundColor: "#388e3c",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  texto: { color: "#fff", fontSize: 16, textAlign: "center", fontWeight: "bold" },
});
