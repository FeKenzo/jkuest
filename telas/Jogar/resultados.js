import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";

export default function Resultados({ route, navigation }) {
    const { resultados = [], acertos = 0, erros = 0 } = route.params || {};
    const total = acertos + erros;
    const porcentagem = total > 0 ? Math.round((acertos / total) * 100) : 0;
    console.log(route.params);
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Resultados do Quiz</Text>

            <Text style={styles.resumo}>
                ✅ Acertos: {acertos}   ❌ Erros: {erros}   🎯 Acertos: {porcentagem}%
            </Text>


            <FlatList
                data={resultados}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.item}>
                        <Text style={styles.pergunta}>
                            {index + 1}. {item.enunciado}
                        </Text>

                        <Text style={[styles.resposta, item.correta ? styles.correta : styles.errada]}>
                            Sua resposta: {item.respostaUsuarioLetra}. {item.textoRespostaUsuario}
                        </Text>

                        {!item.correta && (
                            <Text style={styles.corretaTxt}>
                                Resposta correta: {item.respostaCorretaLetra}. {item.textoRespostaCorreta}
                            </Text>
                        )}
                    </View>
                )}
            />

            <TouchableOpacity
                style={styles.botao}
                onPress={() => navigation.navigate("Home")}
            >
                <Text style={styles.textoBotao}>Voltar ao Início</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f0fff0" },
    titulo: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#2e7d32" },
    resumo: { fontSize: 18, textAlign: "center", marginBottom: 20, color: "#388e3c" },
    item: { marginBottom: 15, padding: 10, borderWidth: 1, borderRadius: 8, backgroundColor: "#fff" },
    pergunta: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
    resposta: { fontSize: 14 },
    correta: { color: "green" },
    errada: { color: "red" },
    corretaTxt: { fontSize: 14, color: "green", marginTop: 4 },
    botao: { marginTop: 20, backgroundColor: "#81c784", padding: 15, borderRadius: 10 },
    textoBotao: { color: "#fff", fontWeight: "bold", textAlign: "center", fontSize: 16 },
});
