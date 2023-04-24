import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useState, useEffect } from "react"
import Constants from "expo-constants"

const DragonBallList = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://dragon-ballz-super-api.site/api');
        const data = await response.json();
        setCharacters(data.characters);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const handleDelete = (id) => {
    setCharacters(prevCards => {
      return prevCards.filter(card => card.id !== id);
    });
  }

  const renderCharacter = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
      >
        <Image source={{ uri: item.img }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.buttonContainer}>
  <Text style={styles.buttonText}>Eliminar</Text>
</TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
      <FlatList
        data={characters}
        renderItem={renderCharacter}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
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
    width: Dimensions.get('window').width - 32,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: 'black',
    elevation: 4,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '80%',
    aspectRatio: 1,
    resizeMode: 'contain',

  
  },
  name: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
    color: '#fff'
  },
  button: {
    color: 'red',
    marginTop: 10,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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
  }
});

export default DragonBallList;
