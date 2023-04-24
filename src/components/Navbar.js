import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DragonBallList from './Dragonball';
import YugiohList from './Yugioh';
import PokemonList from './Pokemon';


const Tab = createBottomTabNavigator();

const Navbar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dragonball" component={DragonBallList} />
      <Tab.Screen name="Yugioh" component={YugiohList} />
      <Tab.Screen name="Pokemones" component={PokemonList} />
    </Tab.Navigator>
  );
};

export default Navbar;
