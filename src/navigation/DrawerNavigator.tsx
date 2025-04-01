import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Drawer=createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    
    <Drawer.Navigator initialRouteName='Inicio'>
        <Drawer.Screen name='Inicio' component={HomeScreen}/>
        <Drawer.Screen name='Detalles' component={DetailsScreen}/>
    </Drawer.Navigator>
    
  )
}

export default DrawerNavigator
