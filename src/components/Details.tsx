import React from "react";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
// Graph
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { addRemovePokemon, checkPokemon } from "../store/slices/pokemonFight";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

function Details(props: any) {
  const dispatch = useDispatch();
  const { list: FightList } = useSelector((state: any) => state.pokemonFight);

  // States data
  const {
    details: data,
    image,
    name,
    index,
  } = useSelector((state: any) => state.pokemonDetail);

  // Graph opions
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      title: {
        display: true,
        text: "Estadísticas",
        color: "white",
        font: {
          size: 20,
        },
      },
    },
    scales: {
      yAxis: {
        display: false,
      },
      x: {
        grid: {
          color: "transparent",
        },
        ticks: {
          color: "white",
        },
      },
    },
  };

  // Graph labels
  const labels = [
    "HP",
    "Attack",
    "Defense",
    "Special-Attack",
    "Special-Deffense",
    "Speed",
  ];

  // Graph data
  const pokemonData = {
    labels,
    datasets: [
      {
        label: "Valor",
        data: [
          data.stats[0].base_stat,
          data.stats[1].base_stat,
          data.stats[2].base_stat,
          data.stats[3].base_stat,
          data.stats[4].base_stat,
          data.stats[5].base_stat,
        ],
        backgroundColor: [
          "rgba(85,183,106,0.8)",
          "rgba(185,85,85,0.8)",
          "rgba(85,102,183,0.8)",
          "rgba(183,168,85,0.8)",
          "rgba(90,85,183,0.8)",
          "rgba(85,183,182,0.8)",
        ],
      },
    ],
  };

  return (
    <div className={props.className}>
      <nav className="navbar p-2">
        <a className="btn btn-primary btn-sm" href="/home">
          <span>Regresar</span>
        </a>
        <div className="ms-auto">
          {checkPokemon(index, FightList) === -1 ? (
            <button
              type="button"
              className="btn btn-sm btn-success"
              style={{ float: "right" }}
              onClick={() =>
                dispatch<any>(addRemovePokemon(index, image, name, FightList))
              }
            >
              <span className="me-2">Agregar a la lista</span>
              <FontAwesomeIcon icon={solid("plus")} />
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-sm btn-danger"
              style={{ float: "right" }}
              onClick={() =>
                dispatch<any>(addRemovePokemon(index, image, name, FightList))
              }
            >
              <span className="me-2">Eliminar de la lista</span>
              <FontAwesomeIcon icon={solid("trash")} />
            </button>
          )}
        </div>
      </nav>
      <div className="row justify-content-center align-items-center">
        <div className="left-content col-4">
          <div className="pokemon-types">
            <div className="pokemon-types-title">Tipo</div>
            {data.types.map((d: any, index: number) => (
              <div key={index} className="pokemon-type d-flex">
                <FontAwesomeIcon
                  className="my-auto"
                  icon={solid("circle-dot")}
                />
                {/* Name of the pokemon type */}
                <span className="my-auto pokemon-type-text">{d.type.name}</span>
              </div>
            ))}
          </div>
          <div className="pokemon-forms-title">Formas</div>
          <div className="pokemon-forms row">
            {data.forms.map((d: any, index: number) => (
              <div key={index} className="pokemon-form col-5">
                {/* Name of the pokemon form */}
                <span>{d.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="image-content col-4">
          {/* Pokemon index */}
          <h3>{correctIndex(index)}</h3>
          {/* Pokemon name */}
          <h2>{name}</h2>
          <div className="image-content-img">
            <img className="w-100 img-fluid" src={image} alt="pokemon" />
          </div>
        </div>
        <div className="right-content row col-4">
          <div className="col-xl-6 col-md-12">
            <div className="poke-ability">Altura</div>
            <div className="poke-detail">
              {/* Pokemon height */}
              {(data.height * 0.1).toFixed(2) + " m"}
            </div>
          </div>
          <div className="col-xl-6 col-md-12">
            <div className="poke-ability">Peso</div>
            <div className="poke-detail">
              {/* Pokemon weight */}
              {(data.weight * 0.1).toFixed(2) + " kg"}
            </div>
          </div>
          <div className="col-xl-12 col-md-12">
            <div className="poke-ability">Experiencia Base</div>
            {/* Pokemon experience */}
            <div className="poke-detail">{data.base_experience}</div>
          </div>
        </div>
      </div>
      <div className="pokemon-stats">
        <Bar options={options} data={pokemonData} />;
      </div>
    </div>
  );
}

export default Details;
