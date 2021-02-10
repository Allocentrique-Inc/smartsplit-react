import Admin from "./components/admin/admin";
import Dashboard from "./components/dashboard/dashboard";
import { useEffect, useState } from "react";
import check from "./api/auth/check";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/index.scss";
import Login from "./components/logIn/logIn";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/">
          <LoadingManager />
        </Route>
      </Switch>
    </Router>
  );
}

const LoadingManager = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const resetLogginCheck = async () => {
    const checkResult = await check();
    const isLogged = checkResult === true;
    setIsLoaded(true);
    setIsLogged(isLogged);
  };
  useEffect(() => {
    resetLogginCheck();
  });
  return (
    <>
      {!isLoaded && "LOADING"}
      {isLoaded && isLogged && (
        <Dashboard resetLogginCheck={resetLogginCheck} />
      )}
      {isLoaded && !isLogged && <Login resetLogginCheck={resetLogginCheck} />}
    </>
  );
};

export default App;
