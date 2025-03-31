import React from 'react'
import { Character } from '../types/character';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props{
    character:Character;
}

const CharacterCard=({character}:Props) => {
  return (
    <View style={styles.card}>
        <Image source={{uri:character.image}} style={styles.image}/>
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
