import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const pokemonDetailSlice = createSlice({
  name: "details",
  initialState: {
    details: {
      height: 0,
      base_experience: 0,
      abilities: [
        {
          ability: {
            name: "blaze",
          },
        },
        {
          ability: {
            name: "Solar-Power",
          },
        },
      ],
      stats: [
        {
          base_stat: 48,
          effort: 1,
          stat: {
            name: "hp",
          },
        },
        {
          base_stat: 56,
          effort: 1,
          stat: {
            name: "attack",
          },
        },
        {
          base_stat: 24,
          effort: 1,
          stat: {
            name: "defense",
          },
        },
        {
          base_stat: 78,
          effort: 1,
          stat: {
            name: "special-attack",
          },
        },
        {
          base_stat: 48,
          effort: 1,
          stat: {
            name: "special-deffense",
          },
        },
        {
          base_stat: 29,
          effort: 1,
          stat: {
            name: "speed",
          },
        },
      ],
      forms: [
        {
          name: "Ditto",
        },
      ],
      types: [
        {
          type: {
            name: "normal",
          },
        },
      ],
      weight: 40,
    },
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    name: "Pikachu",
    index: "25",
  },
  reducers: {
    setPokemonDetail: (state, action) => {
      state.details = action.payload;
    },
    setPokemonImage: (state, action) => {
      state.image = action.payload;
    },
    setPokemonName: (state, action) => {
      state.name = action.payload;
    },
    setPokemonIndex: (state, action) => {
      state.index = action.payload;
    },
  },
});

export const {
  setPokemonDetail,
  setPokemonImage,
  setPokemonIndex,
  setPokemonName,
} = pokemonDetailSlice.actions;
export default pokemonDetailSlice.reducer;

// Updates the details with a get request from pokeapi
export const updateDetail = (index: any, name: string) => (dispatch: any) => {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${index}`)
    .then((response: any) => {
      dispatch(setPokemonDetail(response.data) as any);
      dispatch(
        setPokemonImage(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`
        )
      );
      dispatch(setPokemonName(name));
      dispatch(setPokemonIndex(index));
    })
    .catch((error) => console.log(error))
    .then(() => {
      if (window.location.pathname !== "/Detail") {
        window.location.href = "/Detail";
      }
    });
};
