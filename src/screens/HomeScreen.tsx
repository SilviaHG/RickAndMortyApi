import React, { useEffect, useState } from 'react'
import { Character } from '../types/character';
import api from '../api/api';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import global from '../styles/global';
import CharacterCard from '../components/CharacterCard';

const HomeScreen = () => {
    const [character, setCharacters] = useState<Character[]>([]);

    //cargamos los personajes desde la API
    useEffect(()=>{
        const fetCharacter = async()=>{
            //si la API no responde, que no se nos vaya a caer el 
            //programa, va cargar los personajes que vengan en el resultado
            const response = await api.get('/character');
            setCharacters(response.data.results);
        };
        fetCharacter();
    },[]);

   
  return (
    <ScrollView style={global.container} >
        <Text style={global.title} >Personajes de Rick and Morty</Text>

        {character.map((char)=>(
            
            //aca lo que hacemos es que identifique
            //  de manera única a cada uno de los personajes
            //con el Key={char.id}
            <CharacterCard key={char.id} character={char} />
        ))}

    </ScrollView>
  )
}

export default HomeScreen
