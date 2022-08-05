import { createSlice } from "@reduxjs/toolkit";
//axios
import axios from "axios";

export const pokemonSlice = createSlice({
  name: "pokemons",
  initialState: {
    list: [],
    search: [],
  },
  reducers: {
    setPokemonsList: (state, action) => {
      state.list = action.payload;
    },
    setPokemonSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setPokemonsList, setPokemonSearch } = pokemonSlice.actions;
export default pokemonSlice.reducer;

// Fills the list from the pokeapi data with a get request
export const fetchAllPokemons = () => (dispatch: any) => {
  axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0")
    .then((response: any) => {
      dispatch(setPokemonsList(response.data.results) as any);
      dispatch(setPokemonSearch(response.data.results) as any);
    })
    .catch((error) => console.log(error));
};

// Find the pokemon by index and name and return the matching values
export const searchPokemon = (name: any, list: any) => (dispatch: any) => {
  let query = name.toLowerCase();
  let results: any;
  if (isNaN(name)) {
    results = list.filter(
      (item: any) => item.name.toLowerCase().indexOf(query) >= 0
    );
  } else {
    results = list.filter(
      (item: any) =>
        item.url.split("/")[item.url.split("/").length - 2].indexOf(query) >= 0
    );
  }
  dispatch(setPokemonSearch(results) as any);
};
