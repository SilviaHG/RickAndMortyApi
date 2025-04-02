import React, { useEffect, useState } from 'react'
import { Character } from '../types/character';
import api from '../api/api';
import { ActivityIndicator, Button, ScrollView, Text, View, StyleSheet } from 'react-native';
import global from '../styles/global';
import CharacterCard from '../components/CharacterCard';


const HomeScreen = () => {

    const [character, setCharacters] = useState<Character[]>([]);
    const [page, setPage] = useState(1); // página actual
    const [loading, setLoading] = useState(false); // estado de carga
    const [hasMore, setHasMore] = useState(true); // acá es para saber si hay más personajes para cargar
    const [totalPages, setTotalPages] = useState(1); // Total de páginas disponibles

    //cargamos los personajes desde la API

    const fetchCharacters = async (pageNumber: number) => {
        setLoading(true);
        try {
            const response = await api.get(`/character?page=${pageNumber}`);
            setCharacters((prev) => [...prev, ...response.data.results]); //añade los personajes
            setHasMore(response.data.info.next != null) // sila siguiente página existe, actualizamos el estado
            setTotalPages(response.data.info.pages); // Guardamos el número total de páginas
        } catch (error) {
            console.error('Error al obtener los personajes:', error);

        } finally {
            setLoading(false);
        }

    }
    //carga los personajes a la pantalla
    useEffect(() => {
        //fetch de personajes desde API
        fetchCharacters(page);
    }, [page]);

    //maneja el evento scrolling
    const handleScroll = (event: any) => {
        const contentHeight = event.nativeEvent.contentSize.height; // Altura total del contenido
        const contentOffsetY = event.nativeEvent.contentOffset.y; // Desplazamiento vertical actual
        const viewportHeight = event.nativeEvent.layoutMeasurement.height; // Altura de la pantalla visible

        // Si estamos cerca del final y no estamos cargando más, cargamos más datos
        if (contentHeight - contentOffsetY <= viewportHeight * 1.5 && !loading && hasMore) {
            setPage(page + 1); // Aumentar el número de página para cargar más personajes
        }
    };

    // Función para ir a la última página
    const goToLastPage = () => {
        setPage(totalPages); // Establecer la página al total de páginas
    };


    return (
        <View style={styles.container}>
            <ScrollView style={global.container}
                onScroll={handleScroll}
                scrollEventThrottle={400}
            >
                <Text style={global.title} >Personajes de Rick and Morty</Text>

                {character.map((char) => (

                    //aca lo que hacemos es que identifique
                    //  de manera única a cada uno de los personajes
                    //con el Key={char.id}
                    <CharacterCard key={char.id} character={char} />
                ))}

                {loading && (
                    <View>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )}

                {!hasMore && !loading && (
                    <Text style={{ textAlign: 'center', marginTop: 10, marginBottom:35 }} >
                        No hay más personajes para cargar
                    </Text>
                )}

            </ScrollView>
            {/* Botón para ir a la última página */}
            <View style={styles.botonFlotante}>
                <Button title="Ir a la última página" onPress={goToLastPage} />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative', // Asegura que el botón se posicione en relación con este contenedor
    },
    botonFlotante: {
        position: 'absolute',
        bottom: 38,
        right: 20,
        zIndex: 1, // Asegura que esté encima de otros elementos
        width: 150, // Ajusta el tamaño del botón
        padding: 10,


    }
})

export default HomeScreen
