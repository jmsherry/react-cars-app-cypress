// import logo from "./logo.svg";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  // Redirect,
  Switch,
} from "react-router-dom";

import { ToastProvider } from "react-toast-notifications";
import { CarsProvider } from "./contexts/CarsContext";

import Home from "./pages/Home/Home";
import AddCar from "./pages/AddCar/AddCar";
import UpdateCar from "./pages/UpdateCar/UpdateCar";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Router>
      <ToastProvider autoDismiss={true}>
        <CarsProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path={`/cars/add`} component={AddCar} />
            <Route path={`/cars/update/:id`} component={UpdateCar} />
            <Route path="*" component={NotFound} />
          </Switch>
        </CarsProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
