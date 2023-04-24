import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData(page);
  }, []);

  const fetchData = async (pageNumber) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(pageNumber - 1) * 100}`);
      const data = await response.json();
      const newPokemons = data.results.map(pokemon => ({
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`
      }));
      setPokemons(prevPokemons => [...prevPokemons, ...newPokemons]);
    } catch (error) {
      console.log(error);
    }
  }

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  }

  const handleDelete = (index) => {
    setPokemons(prevPokemons => {
      const newPokemons = [...prevPokemons];
      newPokemons.splice(index, 1);
      return newPokemons;
    });
  }

  const renderPokemon = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleDelete(index)} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={pokemons}
        renderItem={renderPokemon}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    elevation: 4,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  image: {
    width: 200,
    height: 170,
    resizeMode: 'contain',
  },
  name: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
    color: '#fff'
  },
  buttonContainer: {
    backgroundColor: 'red',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {
    flexGrow: 1,
  },
});

export default PokemonList;
