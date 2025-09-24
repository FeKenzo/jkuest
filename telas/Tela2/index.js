import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';

export default function Tela2({ navigation }) {

    useEffect(() => {
        console.log("a tela 2 foi aberta");

        return () => { // código abaixo será processado quando esta tela for finalizada e retirada da memória.
            // o link abaixo explica bem o conceito do return dentro do useEffect
            // useEffect cleanup function
            // https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/
            console.log('finalizando tela: tela 2');
        };
    }, []);




    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Você está na Tela 2!</Text>

            <Text></Text><Text></Text>
            <Text style={styles.texto}>Observe que no topo desta tela tem uma seta para voltar para a tela anterior!</Text>
            <Text></Text><Text></Text>
            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Home')}>
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
        textAlign: 'center'
    },
    botao: {
        width: "90%",
        height: 70,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',

    }
});
