import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Acceder a los parámetros de la navegación

const DetailsScreen = () => {
  const route = useRoute();
  const { character } = route.params; // Obtiene el ID del personaje pasado como parámetro

  const [characterDetails, setCharacterDetails] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <Text style={styles.title}>Detalles del personaje</Text>
      <Image source={{ uri: characterDetails.image }} style={styles.image} />
      <Text style={styles.name}>{characterDetails.name}</Text>
      <Text>Especie: {characterDetails.species}</Text>
      <Text>Género: {characterDetails.gender}</Text>
      <Text>Estado: {characterDetails.status}</Text>
      <Text>Origen: {characterDetails.origin.name}</Text>
      <Text>Ubicación: {characterDetails.location.name}</Text>
      <Text>Primera aparición en episodio: {characterDetails.episode[0]}</Text>
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
});

export default DetailsScreen;