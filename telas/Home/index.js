import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';


export default function Home({ navigation }) {

    useEffect(() => {
        return () => { // código abaixo será processado quando esta tela for finalizada e retirada da memória.
            // o link abaixo explica bem o conceito do return dentro do useEffect
            // useEffect cleanup function
            // https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/
            console.log('finalizando tela: home');
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Você está na Home</Text>
            <Text></Text><Text></Text>
            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Tela1')}>
                <Text style={styles.texto}>Tela 1</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Tela2')}>
                <Text style={styles.texto}>Tela 2</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Tela3')}>
                <Text style={styles.texto}>Tela 3</Text>
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
    botao: {
        width: "90%",
        height: 70,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    }
});