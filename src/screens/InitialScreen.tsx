import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const InitialScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://m.media-amazon.com/images/I/81CwjScs2aL.jpg' }} style={styles.logo} />

      <Text style={styles.title}>Bienvenidos a la API de Rick & Morty</Text>
      <Text style={styles.description}>
        Explora personajes, episodios y mucho más en este universo interdimensional.
      </Text>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Comenzar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#800020', // Rojo vino
      padding: 20,
    },
    logo: {
      width: 450,
      height: 450,
      resizeMode: 'contain',
      marginBottom: 30,
      
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#fff', // Blanco para resaltar sobre fondo oscuro
      textAlign: 'center',
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      color: '#f1f1f1',
      textAlign: 'center',
      marginBottom: 40,
      paddingHorizontal: 20,
    },
    button: {
      backgroundColor: '#9B1B30', // Un tono más claro de rojo vino
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 8,
      elevation: 5, // Sombra para dar un efecto de profundidad
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
  });

export default InitialScreen
