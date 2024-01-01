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
import { PokemonData } from '../../Services/Api';

export interface IProps {
  setChoosenVelues: Dispatch<SetStateAction<IChoosenPokemons>>;
  choosenValues: string[];
  options: PokemonData[];
  title: string;
}

const Select: FC<IProps> = ({
  choosenValues,
  setChoosenVelues,
  options,
  title,
}) => {
  const [filter, setFilter] = useState<string>('');
  const [openDropDonw, setOpenDropDown] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const getVisiblePokemons = (
    options: PokemonData[],
    filter: string
  ): PokemonData[] => {
    const normalizeFilter: string = filter.toLocaleLowerCase();
    if (filter === '') {
      return options;
    }
    return options.filter((option: PokemonData) =>
      option.name.toLocaleLowerCase().includes(normalizeFilter)
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
    if (choosenValues.length >= 4 && !choosenValues.includes(name)) {
      return;
    }

    const updatedNames = choosenValues.includes(name)
      ? choosenValues.filter((valueName) => valueName !== name)
      : [...choosenValues, name];

    setChoosenVelues((prevState) => ({
      ...prevState,
      pokemonsNames: updatedNames,
    }));
  };

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  }, []);

  const visiblePokemons = getVisiblePokemons(options, filter);

  return (
    <div
      className="text-center w-[400px] m-auto relative cursor-pointer pt-[15px]"
      ref={ref}
    >
      <h3 className="text-left text-stone-800 text-base pb-[8px]">{title}</h3>
      <div
        className={`bg-white px-[5px] pr-[30px] pl-[10px] w-[400px] h-[34px] py-[3px] m-auto border border-gray-400 hover:border-gray-600  focus:outline-none focus:border-gray-600 hover:bg-stone-100 focus:bg-stone-100 ${
          openDropDonw && 'border-gray-600'
        } rounded-[12px] flex justify-center items-center relative`}
        onClick={handleChildClick}
        id="input"
        ref={selectRef}
        tabIndex={0}
      >
        <div className="w-full flex items-center">
          <div className="w-full flex items-center gap-[5px]">
            {choosenValues.length > 0 ? (
              choosenValues.map((name, index) => {
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
          {choosenValues.length > 0 && (
            <button
              type="button"
              className=""
              onClick={() =>
                setChoosenVelues((prevState) => ({
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
                    choosenValues.includes(pokemon.name) && 'bg-stone-100'
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
        selected {choosenValues.length}/4
      </p>
    </div>
  );
};

export default Select;
