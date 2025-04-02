
import React from 'react'
import HomeScreen from './src/screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DetailsScreen from './src/screens/DetailsScreen';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import InitialScreen from './src/screens/InitialScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={()=>(      
        <Drawer.Navigator>
          <Drawer.Screen name="Inicio" component={InitialScreen} />
          <Drawer.Screen name="Personajes" component={HomeScreen} />
        </Drawer.Navigator>)
      } 
      options={	{headerShown:false}}
      />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
    </NavigationContainer>
    
    // <HomeScreen/>
    
  );
};


