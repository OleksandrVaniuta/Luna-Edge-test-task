import { useState } from 'react';
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
  const [choosenPokemons, setChoosenPokemons] = useState<IChoosenPokemons>({
    firstName: '',
    lastName: '',
    pokemonsNames: [],
  });

  const [modalOpnen, setModalOpen] = useState<boolean>(false);

  const disabled: boolean =
    choosenPokemons.pokemonsNames.length === 4 &&
    choosenPokemons.firstName.length > 0 &&
    choosenPokemons.lastName.length > 0;

  return (
    <div>
      <Form setChoosenPokemons={setChoosenPokemons} />
      <Select
        choosenPokemons={choosenPokemons.pokemonsNames}
        setChoosenPokemons={setChoosenPokemons}
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
