import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, BackHandler, Alert } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function Tela3({ navigation, route }) {

    const [textoTela3, setTextoTela3] = useState('Texto enviado da tela 3!');

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                Alert.alert('Não é permitido usar o botão de "VOLTAR" do celular..');
                return true; // impede a saída. Return false permite a saída.
            };

            const subscription = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );

            return () =>
                {
                    console.log('saindo da tela 3...');
                    subscription.remove();
                } 
        }, [])
    );


    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Você está na Tela 3!</Text>
            <Text></Text><Text></Text>


            <Text style={styles.textoPequeno}>Digite algo para enviar para a Home </Text>
            <TextInput
                onChangeText={(valor) => setTextoTela3(valor)}
                style={styles.caixaTexto}
                value={textoTela3}
            />

            <Text></Text><Text></Text>

            <TouchableOpacity style={styles.botao}
                onPress={() => {
                    navigation.navigate({
                        name: 'Home',
                        params: { parametroTextoTela3: textoTela3 },                        
                    });
                }}>
                <Text style={styles.texto}>Voltar para a Home</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        fontSize: 30,
    },
    textoPequeno: {
        fontSize: 24,
    },
    botao: {
        width: "90%",
        height: 70,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    caixaTexto: {
        width: "80%",
        height: 50,
        borderColor: '#0AF',
        borderWidth: 2,
        borderRadius: 20,
        marginBottom: 30,
        paddingHorizontal: 10,
        fontSize: 24,

    }
});
