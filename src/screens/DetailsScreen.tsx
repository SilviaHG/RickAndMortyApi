import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Acceder a los parámetros de la navegación
import { Character } from '../types/character';

const DetailsScreen = () => {
  const route = useRoute<any>();
  const { character } = route.params; // Obtiene el ID del personaje pasado como parámetro

   const navigation = useNavigation(); // Obtiene la navegación

  const [characterDetails, setCharacterDetails] = useState<Character|null>(null);
  const [loading, setLoading] = useState(true);
  
  const [isPressed, setIsPressed] = useState(false); // Estado para controlar si el botón está presionado

  useEffect(() => {
    // Fetch para obtener los detalles del personaje
    const fetchCharacterDetails = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${character}`);
        const data = await response.json();
        setCharacterDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los detalles:', error);
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [character]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!characterDetails) {
    return <Text>No se encontraron detalles del personaje.</Text>;
  }


  return (
    <View style={styles.container}>

        {/* Boton para volver a la pantalla anterior */}
      <View style={styles.button}>
      <TouchableOpacity
          style={[styles.button, isPressed && styles.buttonPressed]} // Aplicamos estilo condicional
          onPress={() => navigation.goBack()}
          onPressIn={() => setIsPressed(true)} // Cuando el botón es presionado
          onPressOut={() => setIsPressed(false)} // Cuando se deja de presionar
        >

<Button title={'Volver'} onPress={()=> navigation.goBack()}></Button>
      </TouchableOpacity>
     
      </View>
   

      <Text style={styles.title}>Detalles del personaje</Text>
      <Image source={{ uri: characterDetails.image }} style={styles.image} />
      <Text style={styles.name}>{characterDetails.name}</Text>
      
      {/* -------------- */}

    <View style={styles.card}>
      <Text style={styles.detailLabel} >Especie:</Text>
      <Text style={styles.detailsValue} >{characterDetails.species}</Text>
      {/* -------------- */}
      <View style={styles.line} ></View>

      <Text style={styles.detailLabel} >Género:</Text>
      <Text style={styles.detailsValue} >{characterDetails.gender}</Text>
      {/* -------------- */}
      <View style={styles.line} ></View>

      <Text style={styles.detailLabel} >Estado:</Text>
      <Text style={styles.detailsValue} >{characterDetails.status}</Text>
      {/* -------------- */}
      <View style={styles.line} ></View>

      <Text style={styles.detailLabel} >Origen:</Text>
      <Text style={styles.detailsValue} >{characterDetails.origin.name}</Text>
      {/* -------------- */}
      <View style={styles.line} ></View>

      <Text style={styles.detailLabel} >Ubicación:</Text>
      <Text style={styles.detailsValue} >{characterDetails.location.name}</Text>
    </View>

  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign:'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    alignSelf: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  detailLabel:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555'
  },
  detailsValue:{
    fontSize: 18,
    color: '#333'
  },
  card:{
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {width:0, height:3},
    elevation:3,
  },
  line:{
    height:1,
    backgroundColor: '#ddd',
    marginVertical:10,
  },
  button:{
    borderRadius: 25,
    marginTop: 3,
    marginBottom:7,
    marginHorizontal: 20,
    overflow: 'hidden'
  },
  buttonPressed:{
    backgroundColor: '#0056b3'
  }
});

export default DetailsScreen;