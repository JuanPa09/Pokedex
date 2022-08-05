import { combineReducers, configureStore } from "@reduxjs/toolkit";
//reducers
import pokemons from "./slices/pokemons";
import pokemonDetail from "./slices/pokemonDetail";
import pokemonFight from "./slices/pokemonFight";

import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
  pokemons,
  pokemonDetail,
  pokemonFight,
});

const persistConfig = {
  timeout: 1000,
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  devTools: false,
  middleware: [thunk],
});
