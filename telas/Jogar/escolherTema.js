import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { db } from "../../db";

export default function EscolherTema({ navigation }) {
  const [temas, setTemas] = useState([]);
  const [temaId, setTemaId] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [maxPerguntas, setMaxPerguntas] = useState(0);

  useEffect(() => {
    db.getAllAsync("SELECT * FROM temas;", [])
      .then((rows) => setTemas(rows))
      .catch((err) => console.error("Erro ao carregar temas:", err));
  }, []);

  // Quando o usuário escolher um tema, buscar quantas perguntas existem nele
  const carregarQtdPerguntas = async (id) => {
    try {
      const rows = await db.getAllAsync(
        "SELECT COUNT(*) as total FROM perguntas WHERE tema_id = ?;",
        [id]
      );
      const total = rows[0]?.total || 0;
      setMaxPerguntas(total);

      // Se não houver perguntas, reseta quantidade
      if (total === 0) {
        setQuantidade(0);
      } else if (quantidade > total) {
        setQuantidade(total);
      } else {
        setQuantidade(1); // valor inicial
      }
    } catch (err) {
      console.error("Erro ao contar perguntas do tema:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Escolha o Tema</Text>

      <Picker
        selectedValue={temaId}
        style={styles.picker}
        onValueChange={(val) => {
          setTemaId(val);
          if (val) carregarQtdPerguntas(val);
        }}
      >
        <Picker.Item label="Selecione um tema" value={null} />
        {temas.map((t) => (
          <Picker.Item key={t.id} label={t.nome} value={t.id} />
        ))}
      </Picker>

      {temaId && maxPerguntas > 0 && (
        <>
          <Text style={styles.subtitulo}>
            Quantidade de perguntas (máx: {maxPerguntas})
          </Text>

          <Picker
            selectedValue={quantidade}
            style={styles.picker}
            onValueChange={(val) => setQuantidade(val)}
          >
            {Array.from({ length: maxPerguntas }, (_, i) => i + 1).map((num) => (
              <Picker.Item key={num} label={String(num)} value={num} />
            ))}
          </Picker>
        </>
      )}

      <TouchableOpacity
        style={styles.botao}
        onPress={() => {
          if (!temaId) return Alert.alert("Atenção", "Escolha um tema antes de continuar");
          if (maxPerguntas === 0) return Alert.alert("Atenção", "Esse tema não possui perguntas ainda.");
          navigation.navigate("Jogar", { temaId, quantidade });
        }}
      >
        <Text style={styles.textoBotao}>Iniciar Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#f0fff0" },
  titulo: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#2e7d32" },
  subtitulo: { fontSize: 18, marginBottom: 10, color: "#388e3c" },
  picker: { borderWidth: 1, marginBottom: 20, backgroundColor: "#fff" },
  botao: { backgroundColor: "#81c784", padding: 15, borderRadius: 10 },
  textoBotao: { color: "#fff", fontSize: 18, textAlign: "center", fontWeight: "bold" },
});
