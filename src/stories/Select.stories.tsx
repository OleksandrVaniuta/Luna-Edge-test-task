import React, { useState } from 'react';
import { IChoosenPokemons } from '../App';
import Select, { IProps } from '../Components/CustomSelect/Select';
import '../index.css';

export default {
  title: 'Component/Select',
  omponent: Select,
  argTypes: {},
};

export const defaultSelect = (args: IProps) => {
  const [choosenPokemons, setChoosenPokemons] = useState<IChoosenPokemons>({
    firstName: '',
    lastName: '',
    pokemonsNames: [],
  });
  return (
    <Select
      {...args}
      setChoosenVelues={setChoosenPokemons}
      choosenValues={choosenPokemons.pokemonsNames}
    />
  );
};

defaultSelect.args = {
  options: [
    { name: 'value1', url: 'url1' },
    { name: 'value2', url: 'url2' },
    { name: 'value3', url: 'url3' },
    { name: 'value4', url: 'url4' },
    { name: 'value5', url: 'url5' },
    { name: 'value6', url: 'url6' },
    { name: 'value7', url: 'url7' },
    { name: 'value8', url: 'url8' },
    { name: 'value9', url: 'url9' },
    { name: 'value10', url: 'url10' },
  ],
  title: 'Title',
};
