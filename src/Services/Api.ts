import axios, { AxiosResponse } from 'axios';

const baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';

export type PokemonData = {
  name: string;
  url: string;
};

interface Response {
  res: PokemonData[];
}

interface PokemonSprite {
  sprites: {
    front_default: string;
  };
}

export const fetchAllPokemons = async (): Promise<Response> => {
  try {
    const response: AxiosResponse<{ results: PokemonData[] }> = await axios.get(
      `${baseUrl}?limit=1302`
    );
    return { res: response.data.results };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchPokemonURL = async (name: string) => {
  try {
    const response = await axios.get<PokemonSprite>(`${baseUrl}${name}`);
    const imageUrl = response.data.sprites.front_default;
    console.log(imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
};
