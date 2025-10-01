import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { initDB } from './db';

import Home from './telas/Home/index';
import Temas from './telas/Temas/index';
import Perguntas from './telas/Perguntas/index';
import Jogar from './telas/Jogar/index';
import EscolherTema from './telas/Jogar/escolherTema';

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
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Temas" component={Temas} />
        <Stack.Screen name="Perguntas" component={Perguntas} />
        <Stack.Screen name="Jogar" component={Jogar} />
        <Stack.Screen name="EscolherTema" component={EscolherTema} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


