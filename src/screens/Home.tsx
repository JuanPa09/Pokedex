import React from "react";
import FightList from "../components/FightList";
import List from "../components/List";
import { Provider } from "react-redux";
import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

const Home = () => {
  let persistor = persistStore(store);

  return (
    <div className="row">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <List className="container-fluid col-6 pokemons" />
          <FightList className="container col-4 fighting" />
        </PersistGate>
      </Provider>
    </div>
  );
};

export default Home;
