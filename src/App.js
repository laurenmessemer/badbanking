import React from "react";
import { HashRouter, Route } from "react-router-dom";
import TopNaV from "./components/TopNav";
import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import AllData from "./components/AllData";
import UserContextProvider from "./components/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";



function App() {
  return (
    <div className="bg-* vh-100">
        <HashRouter>
          <TopNaV />
          <UserContextProvider>
            <div className="container" style={{ padding: "50px"}}>
              <Route path="/" exact component={Home} />
              <Route path="/CreateAccount/" exact component={CreateAccount} />
              <Route path="/Deposit/" exact component={Deposit} />
              <Route path="/Withdraw/" exact component={Withdraw} />
              <Route path="/AllData/" exact component={AllData} />
            </div>
          </UserContextProvider>
        </HashRouter>
    </div>
  );
}




export default App;
