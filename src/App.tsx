import { useState } from 'react';
import Select from './Components/CustomSelect/Select';
import Form from './Components/Form/Form';
import Button  from './Components/SubmitButton/Button';

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

  const disabled: boolean =
    choosenPokemons.pokemonsNames.length === 4 &&
    choosenPokemons.firstName.length > 0 &&
    choosenPokemons.lastName.length > 0;

  return (
    <div>
      <p>Welcome to Luna Edge technical interview</p>
      <Form setChoosenPokemons={setChoosenPokemons} />
      <Select
        choosenPokemons={choosenPokemons.pokemonsNames}
        setChoosenPokemons={setChoosenPokemons}
      />
      <Button setModalOpen={setModalOpen} disabled={disabled} />
    </div>
  );
}

export default App;
