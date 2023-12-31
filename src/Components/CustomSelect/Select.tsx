import {
  useState,
  FC,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  useRef,
} from 'react';

import { IChoosenPokemons } from '../../App';
import { PokemonData, fetchAllPokemons } from '../../Services/Api';

interface IProps {
  setChoosenPokemons: Dispatch<SetStateAction<IChoosenPokemons>>;
  choosenPokemons: string[];
}

const Select: FC<IProps> = ({ choosenPokemons, setChoosenPokemons }) => {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [openDropDonw, setOpenDropDown] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAllPokemons().then((data) => {
      setPokemons(data.res);
    });
  }, []);

  const getVisiblePokemons = (
    pokemons: PokemonData[],
    filter: string
  ): PokemonData[] => {
    const normalizeFilter: string = filter.toLocaleLowerCase();
    if (filter === '') {
      return pokemons;
    }
    return pokemons.filter((pokemon: PokemonData) =>
      pokemon.name.toLocaleLowerCase().includes(normalizeFilter)
    );
  };

  const handleChildClick = () => {
    setOpenDropDown(!openDropDonw);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenDropDown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const onSelectPokemon = (name: string) => {
    if (choosenPokemons.length >= 4 && !choosenPokemons.includes(name)) {
      return;
    }

    const updatedNames = choosenPokemons.includes(name)
      ? choosenPokemons.filter((pokemonName) => pokemonName !== name)
      : [...choosenPokemons, name];

    setChoosenPokemons((prevState) => ({
      ...prevState,
      pokemonsNames: updatedNames,
    }));
  };

  const visiblePokemons = getVisiblePokemons(pokemons, filter);

  console.log(choosenPokemons);
  return (
    <div
      className="text-center w-[400px] m-auto relative cursor-pointer pt-[15px]"
      ref={ref}
    >
      <h3 className="text-left text-stone-800 text-base pb-[8px]">
        Choose four Pokemons:
      </h3>
      <div
        className={`bg-white px-[5px] pr-[30px] pl-[10px] w-[400px] h-[34px] py-[3px] m-auto border border-gray-400 hover:border-gray-600 hover:bg-stone-100 ${
          openDropDonw && 'border-gray-600'
        } rounded-[12px] flex justify-center items-center relative`}
        onClick={handleChildClick}
        id="input"
      >
        <div className="w-full flex items-center">
          <div className="w-full flex items-center gap-[5px]">
            {choosenPokemons.length > 0 ? (
              choosenPokemons.map((name, index) => {
                return (
                  <div
                    key={index}
                    className="w-[80px] flex items-center justify-center border gap-[5px] rounded-[6px] px-[3px] hover:border-gray-600"
                    title={name}
                  >
                    <p className="text-ellipsis whitespace-nowrap overflow-hidden">
                      {name}
                    </p>
                    <button
                      type="button"
                      className="w-[18px] h-[18px] flex justify-center items-center ml-auto hover:bg-stone-200 rounded-full"
                      onClick={() => onSelectPokemon(name)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-[12px] h-[12px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="text-stone-400">Choose your pokemon team</p>
            )}
          </div>
          {choosenPokemons.length > 0 && (
            <button
              type="button"
              className=""
              onClick={() =>
                setChoosenPokemons((prevState) => ({
                  ...prevState,
                  pokemonsNames: [],
                }))
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[16px] h-[16px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        <div
          className={`absolute block w-6 h-6 bg-transparent flex justify-center items-center top-1/2 right-[5px] transform -translate-y-1/2 transition-all duration-300 ${
            openDropDonw && 'rotate-[-180deg]'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-[16px] h-[16px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
      <div
        className={`${
          openDropDonw ? 'h-auto opacity-1' : 'h-[0px] opacity-0 hidden'
        } w-[400px] m-auto border border-gray-400 border-t-0 rounded-[12px] py-[10px] absolute bg-white `}
      >
        <label className="w-full px-[10px] flex">
          <input
            placeholder="Search Pokemon..."
            onChange={handleSearch}
            className="w-full py-[3px] px-[6px] bg-stone-100 outline-none rounded-[6px]"
          />
        </label>
        <ul className="h-[200px] overflow-hidden overflow-y-visible mt-[5px]">
          {visiblePokemons.length > 0 ? (
            visiblePokemons.map((pokemon: PokemonData, index: number) => {
              return (
                <li
                  key={index}
                  className={`py=[3px] px-[10px] text-left w-full hover:bg-stone-100 cursor-pointer ${
                    choosenPokemons.includes(pokemon.name) && 'bg-stone-100'
                  }`}
                  onClick={(e) => onSelectPokemon(pokemon.name)}
                >
                  <p>{pokemon.name}</p>
                </li>
              );
            })
          ) : (
            <li>
              <p>Pokemon with this name was not found</p>
            </li>
          )}
        </ul>
      </div>
      <p className="text-left text-stone-400 text-sm pl-[5px] pt-[4px]">
        Pokemon selected {choosenPokemons.length}/4
      </p>
    </div>
  );
};

export default Select;
