import React from "react";
import { useSelector } from "react-redux";
import Pokemon from "./Pokemon";

function FightList(props: any) {
  // States data
  const { list: FightList } = useSelector((state: any) => state.pokemonFight);

  return (
    <div className={props.className}>
      <nav className="navbar p-2">
        <img
          className="navbar-brand"
          src="https://cutewallpaper.org/24/ultra-ball-png/ultra-ball-monster-wiki-fandom.png"
          alt="pokeball"
        />
        <span className="navbar-brand text-light">Listos Para El Combate</span>
      </nav>
      <div className="row p-5">
        {/* Show list only if there are pokemon on it,  otherwise show message*/}
        {FightList.length > 0 ? (
          FightList.map((pokemon: any, index: number) => (
            <Pokemon
              key={pokemon.index}
              index={pokemon.index}
              name={pokemon.name}
              class="col-md-6 mt-2"
            />
          ))
        ) : (
          <div className="empty-list">
            Lista vacía, no hay ningún pokemon listo
          </div>
        )}
      </div>
    </div>
  );
}

export default FightList;
