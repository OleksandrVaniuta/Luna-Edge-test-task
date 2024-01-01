import { SetStateAction, Dispatch, FC, useEffect, useState } from 'react';

import { fetchPokemonURL } from '../../Services/Api';

import { IChoosenPokemons } from '../../App';

interface IProps {
  choosenPokemons: IChoosenPokemons;
}

interface IState {
  name: string;
  url: string;
}

const PokemonsInfo: FC<IProps> = ({ choosenPokemons }) => {
  const [pokenonsData, setPokemonsData] = useState<IState[]>([]);

  useEffect(() => {
    if (pokenonsData.length < 4) {
      Promise.all(
        choosenPokemons.pokemonsNames.map(async (name: string) => {
          const url = await fetchPokemonURL(name);
          if (url !== null) {
            setPokemonsData((prevState) => [
              ...prevState,
              { name: name, url: url },
            ]);
          }
        })
      );
    }
  }, []);

  console.log(pokenonsData);
  return (
    <div className="w-full m-auto text-center">
      <h2 className="text-xl mb-[20px]">Your team</h2>
      <ul className="w-full">
        {pokenonsData.length > 0 ? (
          pokenonsData.map(({ name, url }, index) => {
            return (
              <li
                key={index}
                className="flex justify-around items-center border border-stone-400 mb-[10px] rounded-[10px]"
              >
                <img alt={name} src={url} />
                <p className=" inline-block align-middle">{name}</p>
              </li>
            );
          })
        ) : (
          <p>loading...</p>
        )}
      </ul>
    </div>
  );
};

export default PokemonsInfo;
