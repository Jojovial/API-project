import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/Spots";
import SpotShow from "./components/SpotShow";
import CreateASpot from "./components/CreateASpot";
import EditASpot from "./components/EditASpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path="/" component={SpotsIndex}/>
        <Route exact path="/spots/new" component={CreateASpot}/>
        <Route exact path="/spots/:spotId" component={SpotShow}/>
        <Route exact path="/spots/:spotId/edit" component={EditASpot}/>
        </Switch>}
    </>
  );
}

export default App;
