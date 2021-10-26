import "./App.css";
import {BrowserRouter as Router , Switch , Route } from "react-router-dom";
import Login from "./Login";
import Chats from "./Chats";
// import { useEffect } from "react";
// import { useStateValue } from "./StateProvider";
// import { auth } from "./firebase";
function App() {
 
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/chats">
            <Chats />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
