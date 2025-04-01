import React from 'react'
import { Character } from '../types/character';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Props{
    character:Character;
}

const CharacterCard=({character}:Props) => {
  
    const navigation = useNavigation(); // Obtiene la navegación

  return (
    <View style={styles.card}>
        <Pressable onPress={() => navigation.navigate("DetailsScreen", { character: character.id })}>
        <Image source={{ uri: character.image }} style={styles.image} />
      </Pressable>     
        <Text style={styles.name}>{character.name}</Text>
        <Text>{character.species}-{character.status}</Text>
       
    </View>
  )
}

 

const styles = StyleSheet.create({
    card:{
        marginBottom:10,
        padding:10,
        backgroundColor:'#eee',
        borderRadius:10,
    },
    image:{
        width:'100%',
        height:200,
        borderRadius:10,
    },
    name:{
        fontSize:18,
        fontWeight:'bold',
        marginTop:5,
    }
});

export default CharacterCard
