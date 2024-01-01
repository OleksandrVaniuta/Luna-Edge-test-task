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
  options: [{ name: 'value', url: 'url' }],
  title: 'Title',
};
