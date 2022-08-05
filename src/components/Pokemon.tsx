import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useDispatch, useSelector } from "react-redux";
import { updateDetail } from "../store/slices/pokemonDetail";
import { addRemovePokemon, checkPokemon } from "../store/slices/pokemonFight";

import "../index.css";

function Pokemon(props: any) {
  const dispatch = useDispatch();

  //State data
  const { list: FightList } = useSelector((state: any) => state.pokemonFight);

  // Adds zeros depending on number to fit standards
  function correctIndex(index: number) {
    var c = index.toString().length;
    switch (c) {
      case 1:
        return "00" + index;
      case 2:
        return "0" + index;
      default:
        return index;
    }
  }

  // Adds or removes item from ready to fight list
  async function addRemoveItem(e: any) {
    e.preventDefault();
    e.stopPropagation();
    dispatch<any>(
      addRemovePokemon(props.index, props.image, props.name, FightList)
    );
  }

  return (
    <a
      className={props.class}
      onClick={() => dispatch<any>(updateDetail(props.index, props.name))}
    >
      <div className="card">
        <div className="card-body poke-card-header">
          <div className="poke-index">{correctIndex(props.index)}</div>
          {/* If finds pokemon in fightlist set 'remove' style to button else set 'add' style */}
          {checkPokemon(props.index, FightList) === -1 ? (
            <button
              type="button"
              className="btn  btn-success"
              style={{ float: "right" }}
              onClick={(e) => addRemoveItem(e)}
            >
              <FontAwesomeIcon size="xs" icon={solid("plus")} />
            </button>
          ) : (
            <button
              type="button"
              className="btn  btn-danger"
              style={{ float: "right" }}
              onClick={(e) => addRemoveItem(e)}
            >
              <FontAwesomeIcon size="xs" icon={solid("trash")} />
            </button>
          )}
        </div>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.index}.png`}
          alt="pokemon"
        />
        <div className="card-body pokeCard-body">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#000"
              fillOpacity="1"
              d="M0,320L18.5,304C36.9,288,74,256,111,213.3C147.7,171,185,117,222,117.3C258.5,117,295,171,332,170.7C369.2,171,406,117,443,96C480,75,517,85,554,90.7C590.8,96,628,96,665,90.7C701.5,85,738,75,775,74.7C812.3,75,849,85,886,112C923.1,139,960,181,997,208C1033.8,235,1071,245,1108,224C1144.6,203,1182,149,1218,138.7C1255.4,128,1292,160,1329,181.3C1366.2,203,1403,213,1422,218.7L1440,224L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z"
            ></path>
          </svg>
          <h6>{props.name} </h6>
        </div>
      </div>
    </a>
  );
}

export default Pokemon;
