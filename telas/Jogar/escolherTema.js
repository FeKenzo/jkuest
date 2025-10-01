import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { db } from "../../db";

export default function EscolherTema({ navigation }) {
  const [temas, setTemas] = useState([]);
  const [temaId, setTemaId] = useState(null);
  const [quantidade, setQuantidade] = useState(5);

  useEffect(() => {
    db.getAllAsync("SELECT * FROM temas;", [])
      .then((rows) => setTemas(rows))
      .catch((err) => console.error("Erro ao carregar temas:", err));
  }, []);

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

      <Text style={styles.subtitulo}>Quantidade de perguntas</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(quantidade)}
        onChangeText={(val) => setQuantidade(parseInt(val) || 1)}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => {
          if (!temaId) return alert("Escolha um tema antes de continuar");
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
  picker: { borderWidth: 1, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 20, backgroundColor: "#fff" },
  botao: { backgroundColor: "#81c784", padding: 15, borderRadius: 10 },
  textoBotao: { color: "#fff", fontSize: 18, textAlign: "center", fontWeight: "bold" },
});
