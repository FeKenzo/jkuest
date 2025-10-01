import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

import { initDB } from './db';

import Home from './telas/Home/index';
import Temas from './telas/Temas/index';
import Perguntas from './telas/Perguntas/index';
import Jogar from './telas/Jogar/index';
import EscolherTema from './telas/Jogar/escolherTema';
import Resultados from "./telas/Jogar/resultados";
import Header from './Header';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    initDB();
    StatusBar.setHidden(true);
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBehaviorAsync('overlay-swipe');
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          header: () => <Header navigation={navigation} />,
        })}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Temas" component={Temas} />
        <Stack.Screen name="Perguntas" component={Perguntas} />
        <Stack.Screen name="Jogar" component={Jogar} />
        <Stack.Screen name="EscolherTema" component={EscolherTema} />
        <Stack.Screen name="Resultados" component={Resultados} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
