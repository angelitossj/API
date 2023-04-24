import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useState, useEffect } from "react"
import Constants from "expo-constants"

const NormalMonsterList = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Normal%20Monster');
        const data = await response.json();
        setCards(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = (id) => {
    setCards(prevCards => {
      return prevCards.filter(card => card.id !== id);
    });
  }

  const renderCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
      >
        <Image source={{ uri: item.card_images[0].image_url }} style={styles.image} />
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
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
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
    borderColor: '#ddd',
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
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default NormalMonsterList;
