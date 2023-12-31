import { useState } from 'react';
import Select from './Components/CustomSelect/Select';

export interface IChoosenPokemons {
  firstName: string;
  lastName: string;
  pokemonsNames: string[];
}

function App() {
  const [choosenPokemons, setChoosenPokemons] = useState<IChoosenPokemons>({
    firstName: '',
    lastName: '',
    pokemonsNames: [],
  });
  console.log(choosenPokemons.pokemonsNames);

  const [modalOpne, setModalOpen] = useState<boolean>(false);

  return (
    <div>
      <p>Welcome to Luna Edge technical interview</p>
      <Select
        choosenPokemons={choosenPokemons.pokemonsNames}
        setChoosenPokemons={setChoosenPokemons}
      />
    </div>
  );
}

export default App;
