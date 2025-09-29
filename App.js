import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { initDB } from './db';
import Home from './telas/Home';
import Perguntas from './telas/Perguntas';
import Temas from './telas/Temas';
import Jogar from './telas/Jogar';

/* Help:
https://reactnavigation.org/docs/hello-react-navigation
https://reactnavigation.org/docs/native-stack-navigator/#headerbackvisible


// pacotes para instalar: 
npx expo install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-navigation/native-stack
*/


const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    initDB(); // cria as tabelas na primeira execução
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerBackVisible: false, headerShown: false }} />
        <Stack.Screen name="Perguntas" component={Perguntas} options={{ headerBackVisible: false }} />
        <Stack.Screen name="Temas" component={Temas} options={{ headerBackVisible: true , animation: 'slide_from_bottom'}} />
        <Stack.Screen name="Jogar" component={Jogar} options={{ headerBackVisible: false, headerBackTitleVisible: false, title: 'Esta é tela 3', animation: 'fade' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


