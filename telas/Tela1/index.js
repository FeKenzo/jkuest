import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Tela1({ route, navigation }) {

    useEffect(() => {
        console.log('exibindo a tela 1');

        return () => {
            console.log('saindo da tela');
        }
    }, [])


    return (
        <View style={styles.container}>

            <Text style={styles.textoParametro}>
                Este texto veio via parâmetro:
                {route.params?.parametroTexto}
            </Text>


            <Text style={styles.texto}>Você está na Tela 1!</Text>
            <Text></Text><Text></Text>
            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.texto}>Voltar para a Home</Text>
            </TouchableOpacity>

            <Text></Text><Text></Text>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Tela2')}>
                <Text style={styles.texto}>Tela 2</Text>
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
    },
    textoParametro: {
        fontSize: 30,
        color: '#F0F',
        textAlign: 'center',

    }
});
