import React, { useEffect } from "react";
import Pokemon from "./Pokemon";
//redux
import { fetchAllPokemons, searchPokemon } from "../store/slices/pokemons";
import { useDispatch, useSelector } from "react-redux";

function List(props: any) {
  const dispatch = useDispatch();

  // States data
  const { list } = useSelector((state: any) => state.pokemons);
  const { search: pokemons } = useSelector((state: any) => state.pokemons);

  // Loads the list
  useEffect(() => {
    dispatch<any>(fetchAllPokemons());
  }, [dispatch]);

  // Look for the name or number of the pokemon in the initial list
  function search(input: any) {
    dispatch<any>(searchPokemon(input, list));
  }

  return (
    <div className={props.className}>
      <nav className="navbar sticky-top  justify-content-between p-2">
        <img
          className="navbar-brand"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png"
          alt="pokeball"
        />
        <span className="navbar-brand text-light">Pokemones</span>

        <div className="col">
          <input
            id="searchInput"
            className="form-control mr-sm-2"
            type="search"
            placeholder="Pikachu or 25"
            onChange={(e) => search(e.target.value)}
          />
        </div>
      </nav>
      <div className="row m-2">
        {pokemons.map((pokemon: any, index: number) => (
          <Pokemon
            key={pokemon.url.split("/")[pokemon.url.split("/").length - 2]}
            index={pokemon.url.split("/")[pokemon.url.split("/").length - 2]}
            name={pokemon.name}
            class="col-md-3 mr-2 mt-1"
          />
        ))}
      </div>
    </div>
  );
}

export default List;
