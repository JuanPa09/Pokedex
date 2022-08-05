import React from "react";
import Details from "../components/Details";
import FightList from "../components/FightList";
import { Provider } from "react-redux";
import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

const Detail = () => {
  let persistor = persistStore(store);

  return (
    <div className="row">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Details className="container details col-6" />
          <FightList className="container col-4 fighting" />
        </PersistGate>
      </Provider>
    </div>
  );
};

export default Detail;
