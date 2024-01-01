import { useState, useEffect } from 'react';
import { PokemonData, fetchAllPokemons } from './Services/Api';

import Select from './Components/CustomSelect/Select';
import Form from './Components/Form/Form';
import Button from './Components/SubmitButton/Button';
import PopupWindow from './Components/Modal/Modal';
import PokemonsInfo from './Components/ModalContent/ModalContent';

export interface IChoosenPokemons {
  firstName: string;
  lastName: string;
  pokemonsNames: string[];
}

function App() {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [choosenPokemons, setChoosenPokemons] = useState<IChoosenPokemons>({
    firstName: '',
    lastName: '',
    pokemonsNames: [],
  });

  const [modalOpnen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchAllPokemons().then((data) => {
      setPokemons(data.res);
    });
  }, []);

  const disabled: boolean =
    choosenPokemons.pokemonsNames.length === 4 &&
    choosenPokemons.firstName.length > 0 &&
    choosenPokemons.lastName.length > 0;

  return (
    <div className="pt-[50px]">
      <Form setChoosenPokemons={setChoosenPokemons} />
      <Select
        choosenValues={choosenPokemons.pokemonsNames}
        setChoosenVelues={setChoosenPokemons}
        options={pokemons}
        title={'Choose four Pokemons:'}
      />
      <Button setModalOpen={setModalOpen} disabled={disabled} />
      {modalOpnen && (
        <PopupWindow modalOpen={modalOpnen} setModalOpen={setModalOpen}>
          <PokemonsInfo choosenPokemons={choosenPokemons} />
        </PopupWindow>
      )}
    </div>
  );
}

export default App;
