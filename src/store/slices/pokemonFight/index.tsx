import { createSlice } from "@reduxjs/toolkit";

export const pokemonFightSlice = createSlice({
  name: "pokemonFight",
  initialState: {
    list: [],
  },
  reducers: {
    setPokemonFightList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setPokemonFightList } = pokemonFightSlice.actions;
export default pokemonFightSlice.reducer;

// If finds pokemon in ready to fight list it removes the pokemon from the list.
// Otherwise it adds the pokemon to the list.
export const addRemovePokemon =
  (index: any, image: any, name: any, lista: any) => (dispatch: any) => {
    let list = Object.assign([], lista);

    for (let i = 0; i < lista.length; i++) {
      if (lista[i].index === index) {
        console.log(`${lista[i].index} ${index}`);
        list.splice(i, 1);
        dispatch(setPokemonFightList(list) as any);
        return;
      }
    }

    // Check if list contains maximum amount of elements
    if (lista.length >= 6) {
      alert("Ya se ha alcanzado el numero máximo de pokemones en la lista");
      return;
    }

    list.push({ index: index, image: image, name: name });
    dispatch(setPokemonFightList(list) as any);
  };

// Checks if index param is in ready to fight list and return index
// If return is different from -1 the list contains the given index
export const checkPokemon = (index: number, lista: any) => {
  const idx = (element: any) => element.index === index;

  return lista.findIndex(idx);
};
