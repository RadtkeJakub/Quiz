import { Switch, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/app.scss";

import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const location = useLocation();
  console.log(location);
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <ProtectedRoute path="/lobby" component={Home} />
        <ProtectedRoute path="/quiz" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
