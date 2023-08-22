import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import Menu from "./Menu";
import Item from "./Item";
import Add from "./Add";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        let snacksData = await SnackOrBoozeApi.getSnacks();
        let drinksData = await SnackOrBoozeApi.getDrinks();

        setSnacks(snacksData);
        setDrinks(drinksData);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);


  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  /* snacks prop is passed down from getSnacks() into Home, Menu, and Snack components */
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home snacks={snacks} drinks={drinks} />
            </Route>
            <Route exact path="/snacks">
              <Menu items={snacks} title="Snacks" type="snacks" />
            </Route>
            <Route exact path="/drinks">
              <Menu items={drinks} title="Drinks" type="drinks" />
            </Route>
            <Route path="/snacks/:id">
              <Item items={snacks} cantFind="/snacks" />
            </Route>
            <Route path="/drinks/:id">
              <Item items={drinks} cantFind="/snacks" />
            </Route>
            <Route path="/add">
              <Add setSnacks={setSnacks} setDrinks={setDrinks} />
            </Route>
            <Route>
              <p>Hmmm. I can't seem to find what you are looking for.</p>
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
